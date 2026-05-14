---
title: "Use Browserbase Skills for Browser Automation Workflows"
description: "A first-run guide to Browserbase's agent skills: install the browser skill, choose local or remote mode, run a minimal browser workflow, and keep approvals safe."
pubDate: 2026-05-14
author: "ClawMama Team"
tags: ["agent-skills", "browser-automation", "browserbase", "openclaw", "workflow"]
draft: false
---

Reader persona: a founder, operator, growth lead, QA lead, or customer success manager who wants an AI agent to browse websites, gather public information, test forms, or inspect pages without building a full automation stack from scratch.

Job to be done: install and safely try Browserbase's official agent skills, then decide when to use local browsing, remote Browserbase sessions, and human approval gates.

Browser automation is one of the clearest places where AI agents feel useful.

A good agent can open a page, read the visible state, click through a workflow, capture evidence, and report what happened. That is useful for competitive research, partner prospecting, landing page QA, support reproduction steps, and sales prep.

But browser automation is also easy to make messy.

You need to decide:

- Is the target page public or authenticated?
- Can the agent use a local browser?
- Do you need a remote browser session?
- Is the site protected by bot detection or CAPTCHA?
- Is the agent allowed to submit a form?
- Should it stop before sending a message, making a purchase, or changing account data?

Browserbase's official skills repository gives agents a structured way to handle this class of work.

The repo is:

```text
browserbase/skills
```

It includes skills for browser interaction, traces, Browserbase CLI workflows, functions, safe browsing, search, fetch, UI testing, and research-style workflows.

This guide focuses on the `browser` skill because it is the simplest starting point.

## What the skill provides

The Browserbase `browser` skill teaches an agent to use the `browse` CLI for browser automation.

Install command:

```bash
npx -y skills add browserbase/skills --skill browser --yes
```

The skill describes two execution modes:

- **Local mode**: use a local Chrome/Chromium browser. Good for development, localhost, trusted pages, and reproducible public browsing.
- **Remote Browserbase mode**: use Browserbase sessions. Good for bot detection, CAPTCHA, geo-specific access, session persistence, and production scraping cases.

The underlying CLI package is:

```bash
npm install -g @browserbasehq/browse-cli
```

Remote Browserbase mode requires:

```bash
BROWSERBASE_API_KEY=...
```

The practical value is not just that an agent can click things.

The value is that the workflow becomes inspectable:

```bash
browse open https://example.com
browse snapshot
browse click @0-5
browse get title
browse stop
```

The agent can use snapshots, refs, page text, titles, and screenshots when needed. That gives you a safer loop than vague browser control.

## First-run check

Create a temporary test folder:

```bash
mkdir browserbase-skill-test
cd browserbase-skill-test
```

Install the skill:

```bash
npx -y skills add browserbase/skills --skill browser --yes
```

You should see an installed skill folder similar to:

```text
.agents/skills/browser/
  SKILL.md
  EXAMPLES.md
  REFERENCE.md
  LICENSE.txt
```

Open the skill file before using it:

```bash
sed -n '1,160p' .agents/skills/browser/SKILL.md
```

Look for three things:

1. Required CLI: `browse`
2. Local vs remote environment guidance
3. Safety and troubleshooting notes

Then install or check the CLI:

```bash
which browse || npm install -g @browserbasehq/browse-cli
```

For a simple local test, use local mode:

```bash
browse env local
browse open https://example.com
browse snapshot
browse get title
browse stop
```

Expected result:

- the browser opens the page
- `snapshot` returns a structured page view with element references
- `get title` returns the page title
- `stop` closes the session

If this works, you have a minimal browser automation loop.

## When to use local mode

Use local mode for low-risk workflows:

- reading public docs
- checking your own landing page
- reproducing a UI bug on localhost
- testing a form without submitting it
- extracting visible public information from a simple page
- verifying that a CTA link opens the right destination

Typical command:

```bash
browse env local
```

If you want to reuse an already-running local browser:

```bash
browse env local --auto-connect
```

This can be useful when you need existing cookies, but be careful. Reusing a logged-in browser increases the risk that an agent sees or changes private account data.

A good rule:

> Clean local mode for most tests. Reused local browser only with explicit approval.

## When to use remote Browserbase mode

Use remote Browserbase mode when the target site makes local automation unreliable:

- CAPTCHA appears
- the page shows "checking your browser"
- you hit HTTP 403 or 429
- the site blocks datacenter IPs
- you need geo-specific browsing
- you need a persistent browser context in the cloud
- you want a production-style browser automation environment

Command:

```bash
export BROWSERBASE_API_KEY=your_key_here
browse env remote
```

Then use the same workflow:

```bash
browse open https://target-site.example
browse snapshot
browse get title
browse stop
```

The important point: local and remote mode should not change the agent's permission boundary.

Remote mode may make browsing more reliable, but it does not mean the agent should submit forms, send messages, accept terms, buy products, or change account settings without approval.

## A safe browser automation prompt

Give the agent a narrow browser task:

```text
Use the Browserbase browser skill to inspect this public landing page.

URL: https://example.com

Rules:
- Use local mode unless blocked.
- Do not log in.
- Do not submit forms.
- Do not accept purchases or change account settings.
- Capture the page title, main headline, primary CTA text, and any broken obvious links.
- If a click would send data externally, stop and ask.
- Return a short report with evidence.
```

For a QA task:

```text
Open the staging signup page and inspect the first screen only.

Rules:
- Do not submit the form.
- Fill fields only if the environment is explicitly marked as staging.
- Stop before any email, payment, invite, or production action.
- Report visual or copy issues, missing labels, confusing CTA text, and console/network errors if available.
```

For research:

```text
Research this public company website.

Rules:
- Read public pages only.
- Do not bypass login walls.
- Do not contact the company.
- Extract product category, target customer, pricing page availability, and one useful sales-research note.
- Include source URLs.
```

Good browser prompts include both the task and the stop conditions.

## Human approval gates

Add explicit approval gates before the agent does anything externally visible.

Use this table:

| Action | Default rule |
| --- | --- |
| Read public page | Allowed |
| Take snapshot/screenshot | Allowed if page is public or approved |
| Click navigation link | Allowed if it only navigates |
| Fill a form | Ask unless staging/test environment |
| Submit a form | Ask |
| Log in | Ask |
| Use existing cookies | Ask |
| Send message/comment/email | Ask |
| Purchase/subscribe/cancel | Ask |
| Scrape at scale | Ask and check terms/rate limits |

This matters for non-technical operators because the browser is not just a data source. It is also an action surface.

## A practical ClawMama workflow

Here is a useful first ClawMama-style workflow for a growth team:

```text
Every Monday, inspect the public homepage, pricing page, and signup page.
Return:
- page title
- main headline
- primary CTA
- whether CTA destination works
- one confusing phrase
- one improvement suggestion
Do not submit any forms.
```

This can catch small conversion problems without giving the agent dangerous permissions.

A second workflow:

```text
Before a sales call, inspect the prospect's public website.
Return:
- what the company sells
- likely buyer persona
- evidence of recent hiring or product launch
- one relevant opening question
Do not log in, scrape private areas, or contact anyone.
```

That is practical, repeatable, and safe.

## How this fits OpenClaw/Hermes and ClawMama

OpenClaw/Hermes agents are useful for workflows that mix browsing, files, approvals, and recurring tasks.

Browserbase skills give the agent a browser-operation layer. ClawMama gives non-technical users a place to run the workflow conversationally, usually from Telegram, with human approval before risky steps.

A good setup looks like this:

```text
User: Check the three competitor pricing pages.
Agent: Opens public pages, captures headlines and pricing signals.
Agent: Stops before login walls or contact forms.
User: Approves a follow-up check if needed.
Agent: Writes a short comparison brief.
```

New ClawMama users get $2 credits and access to the latest ChatGPT model, which is enough to test a small browser QA or prospect-research workflow before adding deeper systems.

## Bottom line

Browser automation is powerful because it lets agents work where humans already work: websites, dashboards, forms, and public pages.

Start small:

```bash
npx -y skills add browserbase/skills --skill browser --yes
browse env local
browse open https://example.com
browse snapshot
browse stop
```

Then add approvals before any action that changes the outside world.

That is the difference between a useful browser agent and a risky one.
