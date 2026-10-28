/* ============================================================================
   INDIA SOURCE CO. — BUILD-TIME RENDERER
   Turns SITE_CONTENT (site-content.js) into the homepage HTML when the site
   is built, so visitors and search engines receive a fully rendered page.
   Do not put copy/content in this file — edit site-content.js instead.
   ============================================================================ */

// --------------------------------------------------------------------
// Icon library — small inline SVGs, referenced by name from site-content.js
// --------------------------------------------------------------------
const ICON_PATHS = {
  handshake: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  factory: '<path d="M2 20h20"/><path d="M4 20V10l5 3V10l5 3V10l5 3v7"/><path d="M6 20v-3"/><path d="M12 20v-3"/><path d="M18 20v-3"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  "shield-check": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  "edit-3": '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  package: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  "message-circle": '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'
};

export function icon(name, cls) {
  const inner = ICON_PATHS[name] || ICON_PATHS.compass;
  return `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" aria-hidden="true">${inner}</svg>`;
}

export function escapeHtml(str) {
  return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

// Site-relative paths in site-content.js ("assets/...") become root-relative
// ("/assets/...") so they also work on pages deeper than the homepage.
export function assetUrl(p) {
  if (!p || /^([a-z]+:|\/|#)/i.test(p)) return p;
  return "/" + p;
}

// Miraaya Designs social icons — used in the Miraaya section and the footer
export function socialLinks(content, cls) {
  const links = (content.miraaya && content.miraaya.social) || [];
  if (!links.length) return "";
  const items = links.map((s) => `
      <li><a class="social-link" href="${escapeHtml(s.href)}" target="_blank" rel="noopener noreferrer" aria-label="Miraaya Designs on ${escapeHtml(s.label)} (opens in a new tab)" title="Miraaya Designs on ${escapeHtml(s.label)}">${icon(s.icon)}</a></li>
    `).join("");
  return `<ul class="social-links ${cls || ""}" aria-label="Miraaya Designs on social media">${items}</ul>`;
}

// --------------------------------------------------------------------
// Footer — "explore" is a list of { url, label } for landing pages that exist
// --------------------------------------------------------------------
export function footer(content, explore) {
  const year = new Date().getFullYear();
  // Avoid "Co.." when the name already ends with a period
  const copyrightName = escapeHtml(content.footer.copyrightName).replace(/\.$/, "");
  const links = (explore || []).map((e) => `<a href="${escapeHtml(e.url)}">${escapeHtml(e.label)}</a>`).join("");
  const exploreNav = links
    ? `<nav class="footer-explore" aria-label="Explore"><span class="footer-explore-label">Explore</span>${links}</nav>`
    : "";
  return `
  <div style="text-align: center; line-height: 1.8;">
    <strong>${escapeHtml(content.footer.copyrightName)}</strong>
    <div>Operated by ${escapeHtml(content.footer.legalEntity)}</div>
    <div>${escapeHtml(content.footer.businessAddress)}</div>
    ${socialLinks(content, "social-links-footer")}
    ${exploreNav}
    <div>&copy; ${year} ${copyrightName}. All rights reserved.</div>
  </div>
`;
}

// --------------------------------------------------------------------
// Hero
// --------------------------------------------------------------------
export function hero(content) {
  const h = content.hero;
  return `
      <span class="eyebrow">${escapeHtml(h.eyebrow)}</span>
      <h1>${escapeHtml(h.headline)}</h1>
      <p class="hero-sub">${escapeHtml(h.subheadline)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="${escapeHtml(h.primaryCta.href)}">${escapeHtml(h.primaryCta.label)}</a>
        <a class="btn btn-secondary btn-on-dark" href="${escapeHtml(h.secondaryCta.href)}">${escapeHtml(h.secondaryCta.label)}</a>
      </div>
    `;
}

// --------------------------------------------------------------------
// Our Difference
// --------------------------------------------------------------------
export function difference(content) {
  const d = content.difference;
  const cards = d.points.map(p => `
      <div class="difference-card">
        <div class="icon-badge">${icon(p.icon)}</div>
        <h3>${escapeHtml(p.label)}</h3>
        <p>${escapeHtml(p.description)}</p>
      </div>
    `).join("");

  return `
      <div class="difference-top">
        <span class="eyebrow">Our Difference</span>
        <h2>${escapeHtml(d.heading)}</h2>
        <p class="section-intro">${escapeHtml(d.intro)}</p>
        <p class="difference-statement">${escapeHtml(d.statement)}</p>
      </div>
      <div class="difference-grid">${cards}</div>
    `;
}

// --------------------------------------------------------------------
// Who We Serve
// --------------------------------------------------------------------
export function whoWeServe(content) {
  const w = content.whoWeServe;
  const cards = w.audiences.map(a => `
      <div class="audience-card">
        <div class="icon-badge">${icon(a.icon)}</div>
        <h3>${escapeHtml(a.title)}</h3>
        <p class="audience-desc">${escapeHtml(a.description)}</p>
        <ul>${a.examples.map(e => `<li>${escapeHtml(e)}</li>`).join("")}</ul>
      </div>
    `).join("");

  return `
      <div class="section-head">
        <span class="eyebrow">Who We Serve</span>
        <h2>${escapeHtml(w.heading)}</h2>
        <p class="section-intro">${escapeHtml(w.intro)}</p>
      </div>
      <div class="audience-grid">${cards}</div>
    `;
}

// --------------------------------------------------------------------
// Gallery / Featured Collections — a card links to its category page when
// "href" is set in site-content.js, otherwise to the Custom Request form.
// --------------------------------------------------------------------
export function gallery(content) {
  const g = content.gallery;
  const cards = g.collections.map(c => {
    const media = c.image
      ? `<img src="${escapeHtml(assetUrl(c.image))}" alt="${escapeHtml(c.imageAlt || c.title)}" width="800" height="1000" loading="lazy" decoding="async" />`
      : `<span class="placeholder-mark">${escapeHtml(c.title.charAt(0))}</span>`;
    return `
        <a class="collection-card" href="${escapeHtml(c.href || "#custom-requests")}">
          <div class="collection-media">${media}</div>
          <div class="collection-body">
            <h3>${escapeHtml(c.title)}</h3>
            <p>${escapeHtml(c.description)}</p>
          </div>
        </a>
      `;
  }).join("");

  return `
      <div class="section-head">
        <span class="eyebrow">Gallery</span>
        <h2>${escapeHtml(g.heading)}</h2>
        <p class="section-intro">${escapeHtml(g.intro)}</p>
      </div>
      <div class="gallery-grid">${cards}</div>
      <p class="gallery-footnote">${escapeHtml(g.footnote)}</p>
    `;
}

// --------------------------------------------------------------------
// Miraaya Designs (Etsy promo band)
// --------------------------------------------------------------------
export function miraaya(content) {
  const m = content.miraaya;
  if (!m) return "";

  const eyebrow = m.eyebrow ? `<span class="eyebrow">${escapeHtml(m.eyebrow)}</span>` : "";
  const media = m.image
    ? `<div class="miraaya-media"><img src="${escapeHtml(assetUrl(m.image))}" alt="${escapeHtml(m.imageAlt || m.heading)}" loading="lazy" /></div>`
    : "";
  const note = m.note ? `<p class="miraaya-note">${escapeHtml(m.note)}</p>` : "";
  const state = m.image ? "miraaya-has-image" : "miraaya-no-image";

  return `
      <div class="miraaya-wrap ${state}">
        <div class="miraaya-grid">
          <div class="miraaya-copy">
            ${eyebrow}
            <h2>${escapeHtml(m.heading)}</h2>
            <p class="miraaya-intro">${escapeHtml(m.intro)}</p>
            <a class="btn btn-primary" href="${escapeHtml(m.button.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(m.button.label)} (opens in a new tab)">${escapeHtml(m.button.label)}</a>
            ${socialLinks(content, "social-links-miraaya")}
            ${note}
          </div>
          ${media}
        </div>
      </div>
    `;
}

// --------------------------------------------------------------------
// Forms — shared by the Custom Request and Contact forms on every page
// --------------------------------------------------------------------
function fieldHtml(f, idPrefix) {
  const id = `${idPrefix}${f.name}`;
  const req = f.required ? '<span class="required-mark"> *</span>' : "";
  const reqAttr = f.required ? "required" : "";
  const placeholder = f.placeholder ? ` placeholder="${escapeHtml(f.placeholder)}"` : "";

  let control;
  if (f.type === "textarea") {
    control = `<textarea id="${id}" name="${f.name}" ${reqAttr}${placeholder}></textarea>`;
  } else if (f.type === "file") {
    control = `<input type="file" id="${id}" name="${f.name}" ${reqAttr} accept="image/*" multiple />
        <div class="field-hint">You can attach one or more photos.</div>`;
  } else {
    control = `<input type="${f.type}" id="${id}" name="${f.name}" ${reqAttr}${placeholder} />`;
  }

  return `
      <div class="field">
        <label for="${id}">${escapeHtml(f.label)}${req}</label>
        ${control}
      </div>
    `;
}

// Lead-source fields. The build fills in the page and category; main.js
// refreshes them and adds first-visit source details just before sending.
const ATTRIBUTION_FIELDS = [
  "first_landing_page", "first_referrer",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"
];

function formHtml(content, opts) {
  const fields = opts.fields.map(f => fieldHtml(f, opts.fieldIdPrefix)).join("");
  const attribution = ATTRIBUTION_FIELDS.map(n => `<input type="hidden" name="${n}" value="" />`).join("\n            ");
  return `
          <form id="${opts.id}" action="https://api.web3forms.com/submit" method="POST" enctype="multipart/form-data" novalidate
            data-subject="${escapeHtml(opts.subject)}"
            data-category="${escapeHtml(opts.category)}"
            data-success="${escapeHtml(opts.successMessage)}"
            data-error="${escapeHtml(opts.errorMessage)}"
            data-email="${escapeHtml(content.company.email)}">
            <input type="hidden" name="access_key" value="${escapeHtml(content.company.web3formsAccessKey)}" />
            <input type="hidden" name="subject" value="${escapeHtml(`${opts.subject} — ${opts.category} (${opts.pagePath})`)}" />
            <input type="hidden" name="from_name" value="India Source Co. Website" />
            <input type="hidden" name="landing_page" value="${escapeHtml(opts.pagePath)}" />
            <input type="hidden" name="inquiry_category" value="${escapeHtml(opts.category)}" />
            ${attribution}
            <input type="text" name="_honeypot" style="display:none" tabindex="-1" autocomplete="off" />
            <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off" />
            ${fields}
            <button type="submit" class="btn btn-primary btn-block">${escapeHtml(opts.submitLabel)}</button>
            <div class="form-status" id="${opts.statusId}" role="status" aria-live="polite"></div>
          </form>`;
}

// --------------------------------------------------------------------
// Custom Requests (form). "page" is { path, category, heading?, body? } so
// landing pages can reuse the form with their own intro and category.
// --------------------------------------------------------------------
export function customRequests(content, page) {
  const c = content.customRequests;
  const p = page || {};
  const heading = p.heading || c.heading;
  const body = p.body || c.body;
  const bodyParas = body.map(t => `<p>${escapeHtml(t)}</p>`).join("");

  const form = formHtml(content, {
    id: "custom-request-form",
    statusId: "custom-request-status",
    fieldIdPrefix: "field-",
    fields: c.fields,
    subject: "New Custom Request — India Source Co.",
    category: p.category || "Homepage",
    pagePath: p.path || "/",
    successMessage: c.formSuccessMessage,
    errorMessage: c.formErrorMessage,
    submitLabel: "Submit Request"
  });

  return `
      <div class="request-grid">
        <div class="request-intro">
          <span class="eyebrow">Custom Requests</span>
          <h2>${escapeHtml(heading)}</h2>
          ${bodyParas}
        </div>
        <div class="request-form-card">
          <h3>${escapeHtml(c.formHeading)}</h3>
          ${form}
        </div>
      </div>
    `;
}

// --------------------------------------------------------------------
// How It Works
// --------------------------------------------------------------------
export function howItWorks(content) {
  const h = content.howItWorks;
  const steps = h.steps.map(s => `
      <div class="step-card">
        <div class="step-number">${escapeHtml(s.number)}</div>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.description)}</p>
      </div>
    `).join("");

  return `
      <div class="section-head">
        <span class="eyebrow">Process</span>
        <h2>${escapeHtml(h.heading)}</h2>
        <p class="section-intro">${escapeHtml(h.intro)}</p>
      </div>
      <div class="steps-grid">${steps}</div>
    `;
}

// --------------------------------------------------------------------
// Trust strip
// --------------------------------------------------------------------
export function trust(content) {
  const t = content.trust;
  const items = t.points.map(p => `
      <div class="trust-item">
        ${icon(p.icon)}
        <span>${escapeHtml(p.label)}</span>
      </div>
    `).join("");

  return `
      <div class="section-head center" style="margin-left:auto;margin-right:auto;text-align:center;">
        <h2>${escapeHtml(t.heading)}</h2>
      </div>
      <div class="trust-grid">${items}</div>
    `;
}

// --------------------------------------------------------------------
// About
// --------------------------------------------------------------------
export function about(content) {
  const a = content.about;
  const paras = a.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join("");
  const tags = a.expansion.items.map(i => `<span>${escapeHtml(i)}</span>`).join("");

  return `
      <div class="about-grid">
        <div class="about-copy">
          <span class="eyebrow">About</span>
          <h2>${escapeHtml(a.heading)}</h2>
          ${paras}
        </div>
        <div class="about-expansion">
          <h3>${escapeHtml(a.expansion.heading)}</h3>
          <p class="section-intro">${escapeHtml(a.expansion.intro)}</p>
          <div class="tag-list">${tags}</div>
        </div>
      </div>
    `;
}

// --------------------------------------------------------------------
// Contact
// --------------------------------------------------------------------
export function contact(content, page) {
  const c = content.contact;
  const p = page || {};
  const form = formHtml(content, {
    id: "contact-form",
    statusId: "contact-form-status",
    fieldIdPrefix: "contact-field-",
    fields: c.fields,
    subject: "New Contact Message — India Source Co.",
    category: p.category ? `${p.category} — Contact` : "Contact",
    pagePath: p.path || "/",
    successMessage: c.formSuccessMessage,
    errorMessage: c.formErrorMessage,
    submitLabel: "Send Message"
  });

  return `
      <div class="section-head center">
        <h2>${escapeHtml(c.heading)}</h2>
        <p class="section-intro" style="margin-left:auto;margin-right:auto;">${escapeHtml(c.intro)}</p>
      </div>
      <div class="contact-card">
        ${form}
      </div>
      <div class="contact-direct">
        <a href="mailto:${escapeHtml(content.company.email)}">${icon("mail")} ${escapeHtml(content.company.email)}</a>
      </div>
    `;
}

// --------------------------------------------------------------------
// Structured data (JSON-LD). Only facts already shown on the site.
// --------------------------------------------------------------------
function postalAddress(text) {
  // "213 Longstone Drive, Cherry Hill, NJ 08003, USA"
  const m = /^\s*(.+?),\s*([^,]+?),\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)\s*,\s*(USA|US|United States)\s*$/.exec(text || "");
  if (!m) return undefined;
  return {
    "@type": "PostalAddress",
    streetAddress: m[1],
    addressLocality: m[2],
    addressRegion: m[3],
    postalCode: m[4],
    addressCountry: "US"
  };
}

export function organization(content, siteUrl) {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: content.company.name,
    url: `${siteUrl}/`,
    email: content.company.email,
    address: postalAddress(content.footer.businessAddress)
  };
}

export function homeSchema(content, siteUrl, description) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...organization(content, siteUrl), description },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: content.company.name,
        url: `${siteUrl}/`,
        publisher: { "@id": `${siteUrl}/#organization` }
      }
    ]
  };
}

// Safe for embedding inside <script type="application/ld+json">
export function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
