/* ============================================================================
   SITE CONTENT — this is the file to edit to update the website.
   ============================================================================

   Everything on the page — headlines, service descriptions, collections,
   form fields, and contact details — comes from this one file.

   You should NOT need to open index.html, styles.css, or assets/js/main.js
   for routine content changes. See README.md for step-by-step instructions,
   including how to connect the forms to Web3Forms.

   A few rules to avoid breaking the page:
   - Keep the quotation marks around every piece of text.
   - Keep every comma between entries in a list ( [ ... ] ).
   - If a line ends with a comma, don't delete the comma.
   - It's fine to write long paragraphs — they'll wrap automatically.
   ============================================================================ */

const SITE_CONTENT = {

  // ==========================================================================
  // 1. COMPANY — brand name, contact details, and the Web3Forms access key
  //    that powers BOTH the Custom Request form and the Contact form.
  // ==========================================================================
  company: {
    name: "India Source Co.",
    shortName: "India Source Co.",

    email: "hello@indiasourceco.com",
    instagramUrl: "",
    instagramHandle: "@indiasourceco",

    // ------------------------------------------------------------------
    // WEB3FORMS ACCESS KEY — REQUIRED before the forms will send you email.
    //
    // 1. Go to https://web3forms.com
    // 2. Enter your email address and click "Create Access Key"
    // 3. Web3Forms emails you a key that looks like:
    //    a1b2c3d4-e5f6-7890-abcd-ef1234567890
    // 4. Paste it below, between the quotes, replacing the placeholder.
    //
    // Until you do this, the forms on the site will show an error when
    // someone tries to submit them — see README.md for details.
    // ------------------------------------------------------------------
    web3formsAccessKey: "d0895ba2-e542-4436-8a1f-e12f7b96f7e6"
  },

  // ==========================================================================
  // 2. HERO SECTION
  // ==========================================================================
  hero: {
    eyebrow: "Sourcing & Custom Manufacturing",
    headline: "Your Trusted Sourcing Partner in India",
    subheadline: "Whether you're shopping for your family, planning a wedding, sourcing products for your business, or looking for something completely custom — we connect you directly to India's incredible network of artisans, designers, and manufacturers.",
    primaryCta: { label: "Start a Custom Request", href: "#custom-requests" },
    secondaryCta: { label: "Browse Our Collections", href: "#gallery" }
  },

  // ==========================================================================
  // 3. OUR DIFFERENCE — "We don't sell products. We sell access."
  // ==========================================================================
  difference: {
    heading: "We don't sell products. We sell access.",
    intro: "We're not building another marketplace with thousands of products. We're building a relationship-driven business where you can purchase curated pieces or request virtually anything custom-made in India.",
    statement: "If it can be designed, manufactured, customized, or sourced in India, we'll help you get it.",
    points: [
      { icon: "handshake", label: "Direct relationships", description: "Real, ongoing relationships with designers, artisans, and manufacturers — not a listings platform." },
      { icon: "factory", label: "Custom manufacturing", description: "From a single sample to a full production run, built to your specification." },
      { icon: "layers", label: "Small batch production", description: "No minimums that force you to overbuy. We work in the quantities you actually need." },
      { icon: "compass", label: "Personal sourcing", description: "Tell us what you're picturing — even without a photo — and we'll help track it down." },
      { icon: "shield-check", label: "Quality control", description: "Every order is inspected before it ships, so what you approved is what arrives." },
      { icon: "sliders", label: "Customization", description: "Colors, sizes, materials, packaging, branding — made to fit your vision." },
      { icon: "globe", label: "Worldwide shipping", description: "Delivered to your door, wherever you are." }
    ]
  },

  // ==========================================================================
  // 4. WHO WE SERVE — one card per audience. "examples" becomes a bullet list.
  // ==========================================================================
  whoWeServe: {
    heading: "Who We Serve",
    intro: "However you're shopping, we tailor the process to you.",
    audiences: [
      {
        icon: "home",
        title: "Families",
        description: "Perfect for:",
        examples: ["Custom clothing", "Wedding attire", "Jewelry", "Gifts", "Home décor", "Festival decorations"]
      },
      {
        icon: "briefcase",
        title: "Businesses",
        description: "Products and services include:",
        examples: ["Corporate gifts", "Employee appreciation", "Promotional merchandise", "Uniforms", "Office décor", "Branded merchandise", "Client gifts"]
      },
      {
        icon: "book",
        title: "Schools & Cultural Organizations",
        description: "Examples:",
        examples: ["Educational materials", "Hindu curriculum", "Festival kits", "Children's books", "Classroom décor", "Bulk orders"]
      },
      {
        icon: "heart",
        title: "Weddings & Events",
        description: "Examples:",
        examples: ["Wedding attire", "Welcome bags", "Wedding favors", "Bridesmaid gifts", "Groomsmen gifts", "Guest gifts", "Decorations", "Custom packaging"]
      }
    ]
  },

  // ==========================================================================
  // 5. FEATURED COLLECTIONS (Gallery) — curated categories, not a full catalog.
  //    Leave "image" as "" to show an elegant placeholder until real
  //    photography is ready. To add a photo, drop a file in
  //    assets/img/collections/ and set image to that path.
  // ==========================================================================
  gallery: {
    heading: "Featured Collections",
    intro: "A curated look at what we source and make — not an exhaustive catalog. Every collection is a starting point for a conversation, not the limit of what's possible.",
    collections: [
      { title: "Women's Fashion", image: "", description: "Sarees, lehengas, everyday and occasion wear." },
      { title: "Men's Fashion", image: "", description: "Sherwanis, kurtas, and tailored occasion wear." },
      { title: "Kids' Fashion", image: "", description: "Festival and celebration wear for little ones." },
      { title: "Wedding Collection", image: "", description: "Attire, favors, welcome bags, and décor." },
      { title: "Educational Materials", image: "", description: "Curriculum, books, and classroom resources." },
      { title: "Home Décor", image: "", description: "Textiles, art, and accents for the home." },
      { title: "Corporate Gifts", image: "", description: "Branded and curated gifting for teams and clients." },
      { title: "Custom Branded Items", image: "", description: "Custom branded merchandise, promotional products, and packaging made to your design." }
    ],
    footnote: "Don't see what you're picturing? That's the point — tell us what you need below."
  },

  // ==========================================================================
  // 5b. MIRAAYA DESIGNS — dedicated Etsy shopping section. Sits between
  //     Featured Collections and Custom Requests, and is separate from the
  //     collection cards (which do not link to Etsy).
  //
  //     To add your promotional photograph later: save it in
  //     assets/img/miraaya/ (landscape, about 1600 x 1200 px, under 300 KB)
  //     and set image to its path, e.g. "assets/img/miraaya/promo.jpg".
  //     With image left as "", the section shows as a clean centered banner;
  //     once set, the photo appears beside the text (stacked on phones).
  //     Set eyebrow or note to "" to hide that line.
  //
  //     "social" lists Miraaya Designs' social media links. They appear as
  //     icons beneath the Etsy button AND in the site footer. "icon" can be
  //     "instagram" or "facebook". Remove an entry to hide that icon.
  // ==========================================================================
  miraaya: {
    eyebrow: "Our Sister Brand",
    heading: "Discover Miraaya Designs",
    intro: "Explore our curated collection of Indian-inspired fashion, accessories, and unique finds through Miraaya Designs, our sister brand operated by Miraaya LLC.",
    button: { label: "Shop Our Etsy Collection", href: "https://www.etsy.com/shop/MiraayaDesigns" },
    social: [
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/miraayabykrupa/" },
      { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/share/g/1daQhnW9Ej/" }
    ],
    note: "India Source Co. and Miraaya Designs are both operated by Miraaya LLC.",
    image: "",
    imageAlt: "A selection from Miraaya Designs"
  },

  // ==========================================================================
  // 6. CUSTOM REQUESTS — the heart of the business. The inquiry form fields
  //    are defined here so you can reorder or relabel them without touching
  //    any other file. "type" can be: text, email, tel, textarea, select, file.
  // ==========================================================================
  customRequests: {
    heading: "Can't Find What You're Looking For?",
    body: [
      "Looking for something unique? Need custom quantities? Want your own design? Searching for a product you've seen in India?",
      "Tell us what you're looking for. If it can be sourced or made in India, we'll help make it happen."
    ],
    formHeading: "Tell us what you need",
    formSuccessMessage: "Thank you — your request has been sent. We'll be in touch shortly to talk through options.",
    formErrorMessage: "Something went wrong sending your request. Please try again, or email us directly at",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: false },
      { name: "product", label: "Product Needed", type: "textarea", required: true, placeholder: "Describe what you're looking for" },
      { name: "quantity", label: "Quantity", type: "text", required: false, placeholder: "e.g. 1 piece, 50 units, 500+ units" },
      { name: "budget", label: "Budget", type: "text", required: false, placeholder: "e.g. $500–$1,000" },
      { name: "timeline", label: "Timeline", type: "text", required: false, placeholder: "e.g. Needed by December 2026" },
      { name: "photos", label: "Upload Inspiration Photos", type: "file", required: false }
    ]
  },

  // ==========================================================================
  // 7. HOW IT WORKS — the 5-step process.
  // ==========================================================================
  howItWorks: {
    heading: "How It Works",
    intro: "A simple, guided process from first message to delivery.",
    steps: [
      { number: "01", icon: "edit-3", title: "Submit your request", description: "Tell us what you're looking for through our Custom Request form — as much or as little detail as you have." },
      { number: "02", icon: "search", title: "We source or design options", description: "We tap our network of designers, artisans, and manufacturers to bring back real options." },
      { number: "03", icon: "file-text", title: "Receive your quote", description: "A clear, transparent quote covering product, customization, and shipping." },
      { number: "04", icon: "check-circle", title: "Approve production", description: "Once you approve, we move into sampling and production on your timeline." },
      { number: "05", icon: "package", title: "We inspect, ship, and deliver", description: "Every order is quality-checked before it ships worldwide to your door." }
    ]
  },

  // ==========================================================================
  // 8. TRUST BUILDERS — short reassurance strip, shown as a row of points.
  // ==========================================================================
  trust: {
    heading: "Why Work With Us",
    points: [
      { icon: "handshake", label: "Direct sourcing relationships" },
      { icon: "factory", label: "Custom manufacturing" },
      { icon: "layers", label: "Small and large orders" },
      { icon: "compass", label: "Personalized service" },
      { icon: "shield-check", label: "Quality inspections before shipment" },
      { icon: "globe", label: "Worldwide shipping" },
      { icon: "message-circle", label: "Transparent communication" }
    ]
  },

  // ==========================================================================
  // 9. ABOUT
  // ==========================================================================
  about: {
    heading: "We finally make it easy to buy from India.",
    paragraphs: [
      "India Source Co. was built on a simple idea: you shouldn't need years of relationships, fluency in manufacturing logistics, or a translator to get something beautiful made or sourced in India. We do that work so you don't have to.",
      "We're not a marketplace and we're not drop-shipping generic inventory. We work directly with designers, artisans, and manufacturers across India, and we personally manage sourcing, customization, quality control, and shipping for every order — from a single family gift to a large corporate or wholesale run.",
      "Our goal is simple: when you need something from India, you know exactly who to call."
    ],
    expansion: {
      heading: "What's next",
      intro: "We're continuing to grow the categories we support, including:",
      items: ["Restaurant supplies", "Boutique inventory", "Religious items", "Festival décor", "Hospitality products", "Interior design", "Wholesale sourcing"]
    }
  },

  // ==========================================================================
  // 10. CONTACT
  // ==========================================================================
  contact: {
    heading: "Let's talk about what you need.",
    intro: "Have a question before you submit a custom request? Reach out directly and we'll get back to you personally.",
    formSuccessMessage: "Thanks for reaching out — we'll reply soon.",
    formErrorMessage: "Something went wrong sending your message. Please try again, or email us directly at",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "message", label: "Message", type: "textarea", required: true }
    ]
  },

  // ==========================================================================
  // 11. FOOTER
  // ==========================================================================
  footer: {
    copyrightName: "India Source Co.",
  legalEntity: "Miraaya LLC",
  businessAddress: "213 Longstone Drive, Cherry Hill, NJ 08003, USA"
  // The year updates automatically.
}
};
