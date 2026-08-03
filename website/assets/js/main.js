/* ============================================================================
   INDIA SOURCE CO. — RENDERER
   Reads SITE_CONTENT (site-content.js) and builds the page. Do not put
   copy/content in this file — edit site-content.js instead.
   ============================================================================ */

(function () {
  "use strict";

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
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'
  };

  function icon(name, cls) {
    const inner = ICON_PATHS[name] || ICON_PATHS.compass;
    return `<svg class="icon ${cls || ""}" viewBox="0 0 24 24">${inner}</svg>`;
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function set(id, html) {
    const node = document.getElementById(id);
    if (node) node.innerHTML = html;
  }

  // --------------------------------------------------------------------
  // Header / footer
  // --------------------------------------------------------------------
  function renderChrome(content) {
    set("brand-name", escapeHtml(content.company.shortName));
    document.title = `${content.company.name} — ${content.hero.headline}`;

    const year = new Date().getFullYear();
    set("footer-copyright", `&copy; ${year} ${escapeHtml(content.footer.copyrightName)}. All rights reserved.`);
  }

  // --------------------------------------------------------------------
  // Hero
  // --------------------------------------------------------------------
  function renderHero(content) {
    const h = content.hero;
    set("hero-inner", `
      <span class="eyebrow">${escapeHtml(h.eyebrow)}</span>
      <h1>${escapeHtml(h.headline)}</h1>
      <p class="hero-sub">${escapeHtml(h.subheadline)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="${h.primaryCta.href}">${escapeHtml(h.primaryCta.label)}</a>
        <a class="btn btn-secondary btn-on-dark" href="${h.secondaryCta.href}">${escapeHtml(h.secondaryCta.label)}</a>
      </div>
    `);
  }

  // --------------------------------------------------------------------
  // Our Difference
  // --------------------------------------------------------------------
  function renderDifference(content) {
    const d = content.difference;
    const cards = d.points.map(p => `
      <div class="difference-card">
        <div class="icon-badge">${icon(p.icon)}</div>
        <h3>${escapeHtml(p.label)}</h3>
        <p>${escapeHtml(p.description)}</p>
      </div>
    `).join("");

    set("difference-inner", `
      <div class="difference-top">
        <span class="eyebrow">Our Difference</span>
        <h2>${escapeHtml(d.heading)}</h2>
        <p class="section-intro">${escapeHtml(d.intro)}</p>
        <p class="difference-statement">${escapeHtml(d.statement)}</p>
      </div>
      <div class="difference-grid">${cards}</div>
    `);
  }

  // --------------------------------------------------------------------
  // Who We Serve
  // --------------------------------------------------------------------
  function renderWhoWeServe(content) {
    const w = content.whoWeServe;
    const cards = w.audiences.map(a => `
      <div class="audience-card">
        <div class="icon-badge">${icon(a.icon)}</div>
        <h3>${escapeHtml(a.title)}</h3>
        <p class="audience-desc">${escapeHtml(a.description)}</p>
        <ul>${a.examples.map(e => `<li>${escapeHtml(e)}</li>`).join("")}</ul>
      </div>
    `).join("");

    set("who-we-serve-inner", `
      <div class="section-head">
        <span class="eyebrow">Who We Serve</span>
        <h2>${escapeHtml(w.heading)}</h2>
        <p class="section-intro">${escapeHtml(w.intro)}</p>
      </div>
      <div class="audience-grid">${cards}</div>
    `);
  }

  // --------------------------------------------------------------------
  // Gallery / Featured Collections
  // --------------------------------------------------------------------
  function renderGallery(content) {
    const g = content.gallery;
    const cards = g.collections.map(c => {
      const media = c.image
        ? `<img src="${c.image}" alt="${escapeHtml(c.title)}" loading="lazy" />`
        : `<span class="placeholder-mark">${escapeHtml(c.title.charAt(0))}</span>`;
      return `
        <a class="collection-card" href="#custom-requests">
          <div class="collection-media">${media}</div>
          <div class="collection-body">
            <h3>${escapeHtml(c.title)}</h3>
            <p>${escapeHtml(c.description)}</p>
          </div>
        </a>
      `;
    }).join("");

    set("gallery-inner", `
      <div class="section-head">
        <span class="eyebrow">Gallery</span>
        <h2>${escapeHtml(g.heading)}</h2>
        <p class="section-intro">${escapeHtml(g.intro)}</p>
      </div>
      <div class="gallery-grid">${cards}</div>
      <p class="gallery-footnote">${escapeHtml(g.footnote)}</p>
    `);
  }

  // --------------------------------------------------------------------
  // Custom Requests (form)
  // --------------------------------------------------------------------
  function fieldHtml(f) {
    const req = f.required ? '<span class="required-mark"> *</span>' : "";
    const reqAttr = f.required ? "required" : "";
    const placeholder = f.placeholder ? ` placeholder="${escapeHtml(f.placeholder)}"` : "";

    let control;
    if (f.type === "textarea") {
      control = `<textarea id="field-${f.name}" name="${f.name}" ${reqAttr}${placeholder}></textarea>`;
    } else if (f.type === "file") {
      control = `<input type="file" id="field-${f.name}" name="${f.name}" ${reqAttr} accept="image/*" multiple />
        <div class="field-hint">You can attach one or more photos.</div>`;
    } else {
      control = `<input type="${f.type}" id="field-${f.name}" name="${f.name}" ${reqAttr}${placeholder} />`;
    }

    return `
      <div class="field">
        <label for="field-${f.name}">${escapeHtml(f.label)}${req}</label>
        ${control}
      </div>
    `;
  }

  function renderCustomRequests(content) {
    const c = content.customRequests;
    const bodyParas = c.body.map(p => `<p>${escapeHtml(p)}</p>`).join("");
    const fields = c.fields.map(fieldHtml).join("");

    set("custom-requests-inner", `
      <div class="request-grid">
        <div class="request-intro">
          <span class="eyebrow">Custom Requests</span>
          <h2>${escapeHtml(c.heading)}</h2>
          ${bodyParas}
        </div>
        <div class="request-form-card">
          <h3>${escapeHtml(c.formHeading)}</h3>
          <form id="custom-request-form" novalidate>
            <input type="hidden" name="access_key" value="${escapeHtml(content.company.web3formsAccessKey)}" />
            <input type="hidden" name="subject" value="New Custom Request — India Source Co." />
            <input type="hidden" name="from_name" value="India Source Co. Website" />
            <input type="text" name="_honeypot" style="display:none" tabindex="-1" autocomplete="off" />
            ${fields}
            <button type="submit" class="btn btn-primary btn-block">Submit Request</button>
            <div class="form-status" id="custom-request-status"></div>
          </form>
        </div>
      </div>
    `);

    attachFormHandler({
      formId: "custom-request-form",
      statusId: "custom-request-status",
      successMessage: c.formSuccessMessage,
      errorMessage: c.formErrorMessage,
      contactEmail: content.company.email,
      accessKeyPlaceholder: content.company.web3formsAccessKey
    });
  }

  // --------------------------------------------------------------------
  // How It Works
  // --------------------------------------------------------------------
  function renderHowItWorks(content) {
    const h = content.howItWorks;
    const steps = h.steps.map(s => `
      <div class="step-card">
        <div class="step-number">${escapeHtml(s.number)}</div>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.description)}</p>
      </div>
    `).join("");

    set("how-it-works-inner", `
      <div class="section-head">
        <span class="eyebrow">Process</span>
        <h2>${escapeHtml(h.heading)}</h2>
        <p class="section-intro">${escapeHtml(h.intro)}</p>
      </div>
      <div class="steps-grid">${steps}</div>
    `);
  }

  // --------------------------------------------------------------------
  // Trust strip
  // --------------------------------------------------------------------
  function renderTrust(content) {
    const t = content.trust;
    const items = t.points.map(p => `
      <div class="trust-item">
        ${icon(p.icon)}
        <span>${escapeHtml(p.label)}</span>
      </div>
    `).join("");

    set("trust-inner", `
      <div class="section-head center" style="margin-left:auto;margin-right:auto;text-align:center;">
        <h2>${escapeHtml(t.heading)}</h2>
      </div>
      <div class="trust-grid">${items}</div>
    `);
  }

  // --------------------------------------------------------------------
  // About
  // --------------------------------------------------------------------
  function renderAbout(content) {
    const a = content.about;
    const paras = a.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join("");
    const tags = a.expansion.items.map(i => `<span>${escapeHtml(i)}</span>`).join("");

    set("about-inner", `
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
    `);
  }

  // --------------------------------------------------------------------
  // Contact
  // --------------------------------------------------------------------
  function renderContact(content) {
    const c = content.contact;
    const fields = c.fields.map(fieldHtml).join("");

    set("contact-inner", `
      <div class="section-head center">
        <h2>${escapeHtml(c.heading)}</h2>
        <p class="section-intro" style="margin-left:auto;margin-right:auto;">${escapeHtml(c.intro)}</p>
      </div>
      <div class="contact-card">
        <form id="contact-form" novalidate>
          <input type="hidden" name="access_key" value="${escapeHtml(content.company.web3formsAccessKey)}" />
          <input type="hidden" name="subject" value="New Contact Message — India Source Co." />
          <input type="hidden" name="from_name" value="India Source Co. Website" />
          <input type="text" name="_honeypot" style="display:none" tabindex="-1" autocomplete="off" />
          ${fields}
          <button type="submit" class="btn btn-primary btn-block">Send Message</button>
          <div class="form-status" id="contact-form-status"></div>
        </form>
      </div>
      <div class="contact-direct">
        <a href="mailto:${escapeHtml(content.company.email)}">${icon("mail")} ${escapeHtml(content.company.email)}</a>
      </div>
    `);

    attachFormHandler({
      formId: "contact-form",
      statusId: "contact-form-status",
      successMessage: c.formSuccessMessage,
      errorMessage: c.formErrorMessage,
      contactEmail: content.company.email,
      accessKeyPlaceholder: content.company.web3formsAccessKey
    });
  }

  // --------------------------------------------------------------------
  // Web3Forms submission handler — shared by both forms
  // --------------------------------------------------------------------
  function attachFormHandler(opts) {
    const form = document.getElementById(opts.formId);
    const statusEl = document.getElementById(opts.statusId);
    if (!form || !statusEl) return;

    function showStatus(kind, message) {
      statusEl.className = `form-status is-visible is-${kind}`;
      statusEl.textContent = message;
    }

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (form.access_key.value === "YOUR-WEB3FORMS-ACCESS-KEY-HERE") {
        showStatus("error", `This form isn't connected yet — the site owner needs to add a Web3Forms access key. In the meantime, email ${opts.contactEmail}.`);
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      statusEl.className = "form-status";

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        });
        const result = await response.json();

        if (result.success) {
          showStatus("success", opts.successMessage);
          form.reset();
        } else {
          showStatus("error", `${opts.errorMessage} ${opts.contactEmail}.`);
        }
      } catch (err) {
        showStatus("error", `${opts.errorMessage} ${opts.contactEmail}.`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }

  // --------------------------------------------------------------------
  // Mobile nav toggle
  // --------------------------------------------------------------------
  function initNavToggle() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --------------------------------------------------------------------
  // Init
  // --------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    const content = typeof SITE_CONTENT !== "undefined" ? SITE_CONTENT : null;
    if (!content) return;

    renderChrome(content);
    renderHero(content);
    renderDifference(content);
    renderWhoWeServe(content);
    renderGallery(content);
    renderCustomRequests(content);
    renderHowItWorks(content);
    renderTrust(content);
    renderAbout(content);
    renderContact(content);
    initNavToggle();
  });
})();
