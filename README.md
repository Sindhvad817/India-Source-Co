# India Source Co. — Website

A modern, premium static website for India Source Co. — a sourcing and
custom-manufacturing partner connecting customers to India's designers,
artisans, and manufacturers.

Plain HTML/CSS/JS, no build step, no framework, deploys straight to Vercel.

## How to Update This Website

**Almost everything you'll ever want to change lives in one file:**

```
website/site-content.js
```

Open it in any text editor. Every headline, paragraph, list, and form field
on the site is defined there in plain English, labeled with comments
explaining what each section controls. Save the file and refresh the page
to see your changes — you do not need to touch `index.html`, `styles.css`,
or `main.js` for routine content edits.

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

From this folder, run:

```bash
python dev-server.py
```

Then open **http://127.0.0.1:4322** in your browser. This local server
disables caching so you always see your latest saved changes — it is not
used in production.

You can also just open `website/index.html` directly in a browser, though
some browsers restrict local file access in ways a real server avoids.

## Deploying

This is a static site — it can be deployed to Vercel, Netlify, GitHub
Pages, or any static host by pointing the host at the `website/` folder.
No build command is required.

## Project Structure

```
India Source Co/
├── website/
│   ├── index.html            Page structure (rarely needs editing)
│   ├── site-content.js       ALL editable content — start here
│   └── assets/
│       ├── css/styles.css    Visual design
│       ├── js/main.js        Renders site-content.js onto the page
│       ├── img/               Photos (add your own here)
│       └── files/             Downloadable files, if any
├── dev-server.py             Local preview server
└── README.md                 This file
```
