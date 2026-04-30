import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "ClawMama Marketing",
    description: "Campaign updates and content strategy notes from ClawMama.",
    site: context.site?.toString() ?? process.env.SITE_URL ?? "https://clawmama.github.io/clawmama-blog",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}`,
    })),
  });
};
