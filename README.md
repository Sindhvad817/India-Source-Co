# India Source Co. — Website

A modern, premium static website for India Source Co. — a sourcing and
custom-manufacturing partner connecting customers to India's designers,
artisans, and manufacturers.

Plain HTML/CSS/JS with no front-end framework. [Eleventy](https://www.11ty.dev/)
pre-renders every page to static HTML when Vercel builds the site, so
visitors and search engines receive complete pages.

## How to Update This Website

**Almost everything you'll ever want to change lives in one file:**

```
website/site-content.js
```

Open it in any text editor. Every headline, paragraph, list, and form field
on the site is defined there in plain English, labeled with comments
explaining what each section controls. Commit the change and Vercel rebuilds
the site automatically — you do not need to touch `index.html`, `styles.css`,
`main.js`, or `_lib/render.js` for routine content edits.

A few rules to avoid breaking the page:
- Keep the quotation marks (`"..."`) around every piece of text.
- Keep the commas between entries in a list (`[ ... ]`).
- If a line ends with a comma, don't delete it.

## Required Setup: Connect the Forms (Web3Forms)

The **Custom Request** and **Contact** forms are the most important part of
this site — they're wired to send you an email using a free service called
[Web3Forms](https://web3forms.com), which also supports the photo uploads
on the Custom Request form. Until you connect it, submitting either form
will show a friendly "not connected yet" message instead of sending.

**To connect it:**

1. Go to **https://web3forms.com**
2. Enter the email address where you want form submissions delivered, and
   click **Create Access Key**.
3. Web3Forms will email you an access key that looks like:
   `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
4. Open `website/site-content.js` and find the `company` section near the
   top. Replace the placeholder:
   ```js
   web3formsAccessKey: "YOUR-WEB3FORMS-ACCESS-KEY-HERE"
   ```
   with your real key, keeping the quotes:
   ```js
   web3formsAccessKey: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
   ```
5. Save the file. Both forms are now live — submissions (including any
   attached photos) will be emailed to the address you registered.

No account password, API integration, or backend server is required —
Web3Forms is built specifically for static sites like this one.

## Adding Real Photography

The Featured Collections (Gallery) cards currently show an elegant
placeholder (a soft dark gradient with the collection's initial) because
no photos have been added yet. To add real photos:

1. Drop image files into `website/assets/img/collections/`.
2. In `website/site-content.js`, find the `gallery.collections` list and
   set the `image` field for that collection, e.g.:
   ```js
   { title: "Women's Fashion", image: "assets/img/collections/womens-fashion.jpg", description: "..." }
   ```

The same pattern works for any other image on the site.

## Running the Site Locally

Requires Node.js 20 or newer. Build the site, then start the preview server:

```bash
cd website && npm install && npm run build
```

```bash
python dev-server.py
```

Then open **http://127.0.0.1:4322** in your browser. Re-run the build after
each change. The local server disables caching and mimics Vercel's clean
URLs — it is not used in production.

`npm run build` also runs `scripts/check.mjs`, which fails the build if a
page is missing its title, description, canonical URL, or H1, has a broken
internal link or image, has an image without alt text, has a form without
lead-source fields, or is missing from the sitemap. A failed build never
goes live — Vercel keeps the previous version online.

## Deploying

Vercel builds and deploys automatically on every push. Pushes to `master`
go to production; pushes to any other branch create a preview deployment.
The repository is connected to two Vercel projects with different Root
Directory settings, so there is one config file for each:

| Vercel project | Root Directory | Config file |
|---|---|---|
| `india-source-co` | repository root | `vercel.json` |
| `india-source-co-4y14` | `website` | `website/vercel.json` |

Keep their routing settings (clean URLs, redirects, cache headers)
identical — the build check fails if they differ.

## Search Engine Setup

- **Sitemap and robots.txt** are generated at build time
  (`website/sitemap.njk`, `website/robots.njk`). Every page is added to the
  sitemap automatically unless it sets `noindex: true`.
- **Crawler policy:** search engines and AI search/answer assistants
  (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot, and
  similar) are allowed. Crawlers that collect content only for AI model
  training (GPTBot, ClaudeBot, Google-Extended, CCBot, and others) are opted
  out. This is an owner decision — change `website/robots.njk` only if that
  decision changes.
- **Structured data** describes only facts already shown on the site.
- **CSS and JavaScript** links get a content fingerprint (`?v=…`)
  automatically, so there's no version number to update by hand.

## Inquiry Tracking

Every form submission includes hidden fields so each inquiry email shows
where it came from:

- `landing_page` and `inquiry_category`: the page and category the form was
  sent from (also shown in the email subject).
- `first_landing_page`, `first_referrer`, `utm_source`, `utm_medium`,
  `utm_campaign`, `utm_term`, `utm_content`: how the visitor first arrived.
  This is remembered for 90 days in the visitor's own browser and is sent
  only when they submit a form.

The privacy policy (`website/privacy.md`, served at `/privacy`) describes
exactly these forms, Web3Forms, this browser storage, and Vercel hosting.
If you add analytics, cookies, new form fields, or another service, update
the policy at the same time.

## Project Structure

```
India Source Co/
├── website/
│   ├── site-content.js       ALL editable homepage content — start here
│   ├── index.html            Homepage layout (Eleventy template)
│   ├── privacy.md            Privacy policy (/privacy)
│   ├── 404.njk               "Page not found" page
│   ├── robots.njk            Generates robots.txt
│   ├── sitemap.njk           Generates sitemap.xml
│   ├── _includes/layouts/    Shared page shell: head metadata, header, footer
│   ├── _lib/render.js        Turns site-content.js into page HTML at build time
│   ├── _data/                Build-time data (site-content loader, site URL)
│   ├── scripts/check.mjs     Post-build quality checks
│   ├── eleventy.config.js    Build configuration
│   ├── vercel.json           Vercel settings (india-source-co-4y14 project)
│   └── assets/
│       ├── css/styles.css    Visual design
│       ├── js/main.js        Mobile menu, form sending, inquiry tracking
│       ├── fonts/            Self-hosted Fraunces and Inter fonts
│       └── img/              Photos (add your own here)
├── vercel.json               Vercel settings (india-source-co project)
├── dev-server.py             Local preview server
└── README.md                 This file
```
