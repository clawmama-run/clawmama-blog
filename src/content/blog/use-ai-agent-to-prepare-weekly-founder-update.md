---
title: "Use an AI Agent to Prepare a Weekly Founder Update"
description: "A practical workflow for turning scattered product, sales, support, and marketing notes into a concise weekly founder update with evidence and human review."
pubDate: 2026-05-05
author: "ClawMama Team"
tags: ["founders", "ai-agents", "openclaw", "hermes", "operations"]
draft: false
---

Reader persona: a founder, solo operator, fractional executive, or small team lead who needs to keep investors, advisors, teammates, or partners updated without spending half a day writing status reports.

Job to be done: use an AI agent to turn scattered weekly notes into a clear founder update with evidence, risks, asks, and human review before sending.

A good founder update is not long.

It is clear.

It tells people:

- what changed;
- what moved the business forward;
- what is blocked;
- what help is needed;
- what the team learned.

The problem is that the raw material lives everywhere.

Product work is in GitHub.

Customer questions are in chat.

Marketing notes are in documents.

Sales leads are in spreadsheets.

Support issues are in Telegram, Slack, Discord, email, or a helpdesk.

By Friday, writing the update becomes a memory test.

That is a good job for an AI agent.

Not to invent momentum.

To collect the week, organize it, and produce a draft the founder can edit.

## The workflow

Use this shape:

```text
collect signals → group by theme → attach evidence → draft update → flag gaps → human edit → send
```

The agent prepares the update.

The human decides what is true, sensitive, and worth sending.

## Step 1: Create a weekly update folder

Ask your agent to create a simple structure:

```text
weekly-updates/
  2026-W19/
    raw-notes.md
    evidence.md
    draft.md
    final.md
    follow-ups.md
```

Keep the first version boring.

The goal is not a perfect operating system.

The goal is to avoid starting from a blank page every week.

## Step 2: Define the update format

Use a consistent template.

Example:

```markdown
# Weekly Founder Update — YYYY-MM-DD

## TL;DR
3-5 bullets.

## Wins
What meaningfully improved this week.

## Product
Shipping, fixes, demos, experiments, technical progress.

## Customers and market
User feedback, sales calls, support themes, partner signals.

## Growth and marketing
Content shipped, distribution, traffic, launches, learnings.

## Metrics
Only include numbers we can support.

## Risks and blockers
What could slow us down.

## Asks
Specific help requested from readers.

## Next week
What we plan to focus on.
```

A template makes the agent more useful.

It also makes the update easier for readers to scan.

## Step 3: Give the agent sources

The agent can collect from sources you approve.

Examples:

```text
Product:
- merged PRs
- shipped features
- release notes
- bug fixes
- internal changelog

Customer and market:
- support questions
- sales call notes
- demo notes
- social comments
- community threads

Growth:
- blog posts
- newsletters
- X/LinkedIn posts
- partner conversations
- campaign notes

Operations:
- hiring updates
- vendor issues
- billing notes
- infrastructure incidents
```

Do not give unrestricted access by default.

Start with files or exports.

Then expand only if the workflow proves useful.

## Step 4: Ask for evidence, not vibes

A founder update can easily become narrative fluff.

Tell the agent to attach evidence:

```text
For every claim, attach one source:
- file path;
- URL;
- message excerpt;
- metric source;
- PR or issue link;
- call note reference.

If there is no source, mark it as "needs confirmation".
```

This keeps the update honest.

The agent should separate:

```text
confirmed facts
reasonable interpretations
open questions
```

That distinction matters when the update goes to investors, advisors, or partners.

## Step 5: Make metrics boring and precise

Do not ask the agent to "make the numbers look good."

Ask it to make numbers traceable.

Use a small table:

```markdown
| Metric | This week | Last week | Change | Source | Notes |
|---|---:|---:|---:|---|---|
```

Good metrics for early teams may include:

- active users;
- demos booked;
- trial starts;
- support volume;
- content published;
- qualified partner leads;
- product usage events;
- revenue or balance changes;
- waitlist signups;
- deployment count.

If you do not trust a number, leave it out or label it clearly.

A small accurate update is better than a confident fake one.

## Step 6: Ask the agent to find the story

After collection, ask:

```text
What is the main story of this week?

Give me three options:
1. optimistic but accurate;
2. operationally honest;
3. conservative and investor-safe.

For each option, explain what evidence supports it and what evidence weakens it.
```

This is useful because the same week can be framed in different ways.

Example:

```text
Optimistic: distribution is compounding.
Operational: we shipped consistently but still need clearer conversion data.
Conservative: product progress is strong; market proof is still early.
```

The founder should choose the framing.

The agent can prepare the options.

## Step 7: Draft the update

Prompt:

```text
Draft this week's founder update.

Rules:
- concise;
- no hype;
- no unsupported claims;
- use bullets where possible;
- separate facts from interpretation;
- include concrete asks;
- mark sensitive items that may need removal;
- do not send anything.
```

The agent should produce `draft.md`, not send the message.

The first draft should include caveats such as:

```text
Needs confirmation: traffic number source.
Sensitive: customer name should be anonymized.
Open question: whether to mention pricing experiment.
```

Those notes are helpful.

They keep the human review focused.

## Step 8: Create follow-ups

A weekly update should create action.

Ask the agent to write `follow-ups.md`:

```markdown
# Follow-ups

## Asks to send
- Ask
- Recipient
- Why this person
- Draft wording
- Approval status

## Internal follow-ups
- Task
- Owner
- Deadline
- Source

## Missing information
- Question
- Where to get it
- Who can confirm
```

This turns the update into an operating loop.

The agent is not just summarizing.

It is helping the team notice what should happen next.

## A practical OpenClaw or Hermes prompt

Use this prompt with your agent:

```text
Help me prepare this week's founder update.

Sources I will provide:
- product notes;
- blog/content shipped;
- support questions;
- sales and partner notes;
- metrics export if available.

Create:
1. raw-notes.md
2. evidence.md
3. draft.md
4. follow-ups.md

Rules:
- do not invent metrics;
- cite every claim with a source;
- mark unsupported claims as needs confirmation;
- flag sensitive customer or revenue details;
- write in a concise founder-update style;
- do not send, post, email, or publish anything without approval.
```

This gives the agent a useful boundary.

It can organize and draft.

It cannot communicate externally on its own.

## Where ClawMama fits

You can run this workflow with any capable OpenClaw or Hermes setup.

ClawMama is useful if you want the agent available from Telegram without maintaining your own server.

Start here:

```text
https://t.me/clawmamarun_bot
```

Create a managed OpenClaw or Hermes bot, then ask it to maintain a weekly update folder.

ClawMama gives new users $2 of AI credits and access to the latest ChatGPT model, which is enough to test a small workflow before committing to a larger operating system.

A good first instruction is:

```text
You may read the files I upload and draft a weekly founder update.
You may not message investors, email anyone, post publicly, or expose private data without my approval.
```

That keeps the work useful and safe.

## What to avoid

Avoid turning the agent into a hype writer.

Bad instruction:

```text
Make this sound amazing.
```

Better instruction:

```text
Make this clear, specific, and useful. Remove hype. Keep unsupported claims out.
```

Avoid sending raw private notes to external tools unless you understand where the data goes.

Avoid letting the agent contact people directly.

Avoid overloading the update with everything that happened.

A weekly founder update is a decision-support artifact, not a diary.

## Final takeaway

The best founder updates are built from evidence.

An AI agent can make the process lighter:

```text
scattered notes → sourced draft → human judgment → clear update
```

The founder still owns the message.

The agent removes the blank page, catches missing evidence, and turns the week into a useful operating loop.
