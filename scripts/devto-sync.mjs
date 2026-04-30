#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";

const contentDir = resolve(process.cwd(), "src", "content", "blog");
const dryRun = process.env.DRY_RUN ? process.env.DRY_RUN.toLowerCase() !== "false" : true;
const apiKey = process.env.DEVTO_API_KEY;

function parseFrontmatter(rawContent) {
  const frontMatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) {
    return {};
  }

  const lines = frontMatterMatch[1].split("\n");
  const parsed = {};

  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) {
      continue;
    }

    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();

    if (!key) {
      continue;
    }

    parsed[key] = value.replace(/^"|"$/g, "");
  }

  return parsed;
}

function stripFrontmatter(rawContent) {
  return rawContent.replace(/^---\n[\s\S]*?\n---\n?/, "");
}

async function run() {
  const files = (await readdir(contentDir)).filter((name) => {
    const extension = extname(name).toLowerCase();
    return extension === ".md" || extension === ".mdx";
  });

  if (files.length === 0) {
    console.log("No markdown posts found to sync.");
    return;
  }

  if (!dryRun && !apiKey) {
    console.error("DEVTO_API_KEY is required unless DRY_RUN is enabled.");
    process.exitCode = 1;
    return;
  }

  for (const fileName of files) {
    const rawContent = await readFile(resolve(contentDir, fileName), "utf8");
    const frontMatter = parseFrontmatter(rawContent);
    const body = stripFrontmatter(rawContent).trim();

    const article = {
      title: frontMatter.title || fileName,
      published: true,
      body_markdown: body,
    };

    if (dryRun) {
      console.log("DRY RUN:", { fileName, title: article.title, published: article.published });
      continue;
    }

    console.log("READY TO PUBLISH:", { fileName, title: article.title, apiKeyPreview: `${apiKey.slice(0, 4)}...` });
  }

  if (dryRun) {
    console.log("Dry run complete. Set DRY_RUN=false and DEVTO_API_KEY to publish.");
  } else {
    console.log("Sync placeholder complete. Add API call implementation when ready.");
  }
}

run();
