import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";


const siteUrl = process.env.SITE_URL || "https://clawmama.github.io/clawmama-blog";

export default defineConfig({
  site: siteUrl,
  output: "static",
  integrations: [mdx(), sitemap()],
});
