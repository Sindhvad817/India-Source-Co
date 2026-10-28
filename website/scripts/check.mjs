// Post-build quality checks for _site/. Runs as part of `npm run build`, so a
// page with broken SEO basics fails the Vercel build instead of going live
// (the previous deployment stays online).
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import meta from "../_data/meta.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = path.join(ROOT, "_site");
const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

// "/a/b" -> served file, mirroring Vercel cleanUrls
function resolveUrl(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (clean === "/" || clean === "") return path.join(SITE, "index.html");
  const candidates = [clean, `${clean}.html`, `${clean}/index.html`];
  return candidates.map((c) => path.join(SITE, c)).find((p) => existsSync(p) && statSync(p).isFile());
}

const pagePath = (file) => {
  const rel = "/" + path.relative(SITE, file).split(path.sep).join("/");
  return rel.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
};

const attr = (tag, name) => (new RegExp(`\\s${name}="([^"]*)"`).exec(tag) || [])[1];
const decode = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const metaContent = (html, key) => {
  const tag = (html.match(new RegExp(`<meta[^>]+(?:name|property)="${key}"[^>]*>`)) || [])[0];
  return tag ? attr(tag, "content") : undefined;
};

if (!existsSync(SITE)) {
  console.error("check: _site/ not found — run eleventy first");
  process.exit(1);
}

const files = walk(SITE);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const indexable = new Map(); // canonical URL -> file

for (const file of htmlFiles) {
  const rel = path.relative(SITE, file);
  const html = readFileSync(file, "utf8");
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);

  // Title and description
  const title = decode((/<title>([^<]*)<\/title>/.exec(html) || [])[1] || "");
  if (!title) fail(rel, "missing <title>");
  else if (title.length > 70) fail(rel, `title is ${title.length} characters (max 70)`);
  const description = decode(metaContent(html, "description") || "");
  if (!description) fail(rel, "missing meta description");
  else if (description.length < 50 || description.length > 180) fail(rel, `meta description is ${description.length} characters (50–180)`);

  // One H1 per page
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(rel, `has ${h1s} <h1> elements (expected 1)`);

  // Canonical / Open Graph
  const canonicalTag = (html.match(/<link rel="canonical"[^>]*>/) || [])[0];
  if (!noindex) {
    const expected = meta.url + pagePath(file);
    const canonical = canonicalTag && attr(canonicalTag, "href");
    if (canonical !== expected) fail(rel, `canonical is ${canonical}, expected ${expected}`);
    if (metaContent(html, "og:url") !== expected) fail(rel, "og:url does not match canonical");
    indexable.set(expected, rel);
  }
  const ogImage = metaContent(html, "og:image");
  if (!ogImage || !ogImage.startsWith(meta.url) || !resolveUrl(ogImage.slice(meta.url.length))) fail(rel, `og:image missing or not found: ${ogImage}`);

  // Structured data must be valid JSON
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (err) { fail(rel, `invalid JSON-LD: ${err.message}`); }
  }

  // Internal links and assets resolve; images have alt text
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(url)) continue;
    const target = url.startsWith("/") ? url : "/" + path.posix.join(path.posix.dirname(pagePath(file)), url);
    if (!resolveUrl(target)) fail(rel, `broken internal link or asset: ${url}`);
  }
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!attr(img, "alt")) fail(rel, `image without alt text: ${attr(img, "src")}`);
  }

  // Every form carries lead-source fields
  for (const form of html.match(/<form\b[\s\S]*?<\/form>/g) || []) {
    for (const name of ["access_key", "landing_page", "inquiry_category", "first_landing_page", "first_referrer", "utm_source", "botcheck"]) {
      if (!form.includes(`name="${name}"`)) fail(rel, `form is missing the ${name} field`);
    }
  }
}

// Sitemap lists exactly the indexable pages
const sitemap = readFileSync(path.join(SITE, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of locs) if (!indexable.has(loc)) fail("sitemap.xml", `lists ${loc}, which is not an indexable page`);
for (const url of indexable.keys()) if (!locs.includes(url)) fail("sitemap.xml", `is missing ${url}`);

// robots.txt points at the sitemap and does not block the site for everyone
const robots = readFileSync(path.join(SITE, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${meta.url}/sitemap.xml`)) fail("robots.txt", "missing Sitemap line");
if (/User-agent: \*\s*\nDisallow: \/\s*$/m.test(robots)) fail("robots.txt", "blocks all crawlers");

// The two Vercel configs (one per Vercel project) must route identically
const routing = (file) => {
  const { installCommand, buildCommand, outputDirectory, ...rest } = JSON.parse(readFileSync(file, "utf8"));
  return JSON.stringify(rest);
};
const repoConfig = path.join(ROOT, "..", "vercel.json");
if (existsSync(repoConfig) && routing(path.join(ROOT, "vercel.json")) !== routing(repoConfig)) {
  fail("vercel.json", "website/vercel.json and the repository-root vercel.json have different routing settings");
}

if (errors.length) {
  console.error(`check: ${errors.length} problem(s) found\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`check: OK — ${htmlFiles.length} HTML page(s), ${locs.length} sitemap URL(s)`);
