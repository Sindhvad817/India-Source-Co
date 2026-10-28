// Defaults for every landing page in pages/. A page at
// pages/indian-wedding/kids-wedding-outfits.md is served at
// /indian-wedding/kids-wedding-outfits.
import meta from "../_data/meta.js";
import { organization } from "../_lib/render.js";

const cleanUrl = (url) => String(url).replace(/\.html$/, "");

export default {
  layout: "layouts/landing.njk",
  tags: ["landing"],
  explore: true,
  permalink: (data) => `${data.page.filePathStem.replace(/^\/pages/, "")}.html`,
  eleventyComputed: {
    ogImage: (data) => data.image,
    ogImageAlt: (data) => data.imageAlt,
    // Structured data built only from what the page itself shows
    schema: (data) => {
      const url = meta.url + cleanUrl(data.page.url);
      const crumbs = [{ name: "Home", item: `${meta.url}/` }];
      if (data.cluster && data.cluster.url) crumbs.push({ name: data.cluster.label, item: meta.url + data.cluster.url });
      crumbs.push({ name: data.breadcrumb, item: url });
      return {
        "@context": "https://schema.org",
        "@graph": [
          organization(data.site, meta.url),
          {
            "@type": "Service",
            "@id": `${url}#service`,
            name: data.service.name,
            serviceType: data.service.type,
            description: data.description,
            url,
            image: meta.url + data.image,
            provider: { "@id": `${meta.url}/#organization` }
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item }))
          },
          {
            "@type": "FAQPage",
            mainEntity: data.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a }
            }))
          }
        ]
      };
    }
  }
};
