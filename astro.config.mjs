import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const siteUrl = process.env.SITE_URL || "https://blog.clawmama.run";
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  site: siteUrl,
  base: basePath,
  output: "static",
  integrations: [mdx(), sitemap()],
});
