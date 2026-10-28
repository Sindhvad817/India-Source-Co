// Eleventy build for indiasourceco.com — outputs plain static HTML to _site/.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as render from "./_lib/render.js";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  for (const p of ["scripts/**", "README.md", "**/LICENSE.md"]) eleventyConfig.ignores.add(p);

  // Section renderers, available to templates as render.hero(site) etc.
  eleventyConfig.addGlobalData("render", render);

  // Short content hash for cache-busting CSS/JS URLs: "assets/css/styles.css" | assetHash
  eleventyConfig.addFilter("assetHash", (file) =>
    createHash("sha256").update(readFileSync(path.join(ROOT, file))).digest("hex").slice(0, 10));

  // "/about.html" -> "/about", "/index.html" -> "/" (Vercel serves clean URLs)
  eleventyConfig.addFilter("cleanUrl", (url) =>
    String(url).replace(/\/index\.html$/, "/").replace(/\.html$/, ""));

  eleventyConfig.addFilter("jsonLd", render.jsonLd);

  // Pages listed in the footer Explore links (front matter: explore: true)
  eleventyConfig.addCollection("explore", (api) =>
    api.getAll()
      .filter((item) => item.data.explore)
      .sort((a, b) => (a.data.exploreOrder ?? 99) - (b.data.exploreOrder ?? 99)));

  return {
    dir: { input: ".", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
