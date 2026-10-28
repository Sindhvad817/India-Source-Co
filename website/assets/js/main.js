/* ============================================================================
   INDIA SOURCE CO. — PAGE BEHAVIOR
   The page HTML is rendered when the site is built (see _lib/render.js).
   This script only adds behavior: the mobile menu, sending the forms, and
   recording which page an inquiry came from. Do not put copy/content in
   this file — edit site-content.js instead.
   ============================================================================ */

(function () {
  "use strict";

  // --------------------------------------------------------------------
  // Lead source — remembers how a visitor first arrived (page, referring
  // site, UTM tags) for 90 days in their own browser, and sends it only
  // with a form they choose to submit.
  // --------------------------------------------------------------------
  const ATTRIBUTION_KEY = "isc_first_touch_v1";
  const ATTRIBUTION_MAX_AGE = 90 * 24 * 60 * 60 * 1000;
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

  function clip(value) {
    return String(value || "").slice(0, 300);
  }

  function externalReferrer() {
    try {
      if (!document.referrer) return "";
      const ref = new URL(document.referrer);
      return ref.host === location.host ? "" : clip(ref.origin + ref.pathname);
    } catch (err) {
      return "";
    }
  }

  function readFirstTouch() {
    try {
      const stored = JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || "null");
      if (stored && Date.now() - stored.ts < ATTRIBUTION_MAX_AGE) return stored;
    } catch (err) { /* storage unavailable or corrupt */ }
    return null;
  }

  function currentTouch() {
    const params = new URLSearchParams(location.search);
    const touch = { ts: Date.now(), page: location.pathname, referrer: externalReferrer() };
    UTM_KEYS.forEach(k => { touch[k] = clip(params.get(k)); });
    return touch;
  }

  function recordFirstTouch() {
    const existing = readFirstTouch();
    if (existing) return existing;
    const touch = currentTouch();
    try { localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(touch)); } catch (err) { /* ignore */ }
    return touch;
  }

  function fillAttribution(form, firstTouch) {
    const set = (name, value) => { if (form.elements[name]) form.elements[name].value = value; };
    const category = form.dataset.category || "";
    set("landing_page", location.pathname);
    set("inquiry_category", category);
    set("subject", `${form.dataset.subject} — ${category} (${location.pathname})`);
    set("first_landing_page", firstTouch.page);
    set("first_referrer", firstTouch.referrer);
    UTM_KEYS.forEach(k => set(k, firstTouch[k]));
  }

  // --------------------------------------------------------------------
  // Web3Forms submission handler — shared by every form on the site
  // --------------------------------------------------------------------
  function attachFormHandler(form, firstTouch) {
    const statusEl = form.querySelector(".form-status");
    const successMessage = form.dataset.success;
    const errorMessage = form.dataset.error;
    const contactEmail = form.dataset.email;

    function showStatus(kind, message) {
      statusEl.className = `form-status is-visible is-${kind}`;
      statusEl.textContent = message;
    }

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (form.access_key.value === "YOUR-WEB3FORMS-ACCESS-KEY-HERE") {
        showStatus("error", `This form isn't connected yet — the site owner needs to add a Web3Forms access key. In the meantime, email ${contactEmail}.`);
        return;
      }

      fillAttribution(form, firstTouch);

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
          showStatus("success", successMessage);
          form.reset();
        } else {
          showStatus("error", `${errorMessage} ${contactEmail}.`);
        }
      } catch (err) {
        showStatus("error", `${errorMessage} ${contactEmail}.`);
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
    const firstTouch = recordFirstTouch();
    document.querySelectorAll("form[data-subject]").forEach(form => attachFormHandler(form, firstTouch));
    initNavToggle();
  });
})();
