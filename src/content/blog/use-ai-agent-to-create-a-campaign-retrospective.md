---
title: "Use an AI Agent to Create a Campaign Retrospective"
description: "A practical workflow for turning campaign notes, launch posts, traffic snapshots, and customer replies into a short decision-ready retrospective."
pubDate: 2026-05-15
author: "ClawMama Team"
tags: ["marketing", "campaigns", "ai-agents", "retrospective", "operations"]
draft: false
---

Reader persona: a founder, marketer, growth operator, or solo business owner who ships campaigns but rarely has time to turn messy launch data into useful decisions.

Job to be done: use an AI agent to collect campaign evidence, summarize what happened, and produce a clear retrospective with keep/change/stop decisions for the next campaign.

Most teams do not lose because they never run campaigns.

They lose because they do not learn from them.

A campaign goes out, everyone checks numbers for a day, a few screenshots get shared, and then the team moves on. Two weeks later, nobody remembers:

- which headline was used
- what audience the post was written for
- which channel drove the best replies
- what objections came up
- what the CTA promised
- whether signups were qualified
- what should be repeated next time

An AI agent can turn this mess into a short retrospective.

The goal is not to create a beautiful report. The goal is to create decisions.

## What to collect

Create a folder for the campaign:

```text
campaign-retro/
  brief.md
  launch-links.md
  metrics.md
  customer-replies.md
  notes.md
```

You do not need perfect data. You need enough evidence for the agent to compare intent against results.

### `brief.md`

```md
# Campaign brief

Campaign name: May workflow launch
Dates: 2026-05-10 to 2026-05-14

Goal:
Drive qualified users to start the Telegram bot.

Audience:
Non-technical operators who want AI help with research, marketing, sales discovery, or business workflows.

Primary promise:
A ready-to-use AI agent can do the repetitive research and reporting work without the user building infrastructure.

Primary CTA:
Start in Telegram

Success definition:
- useful replies or signups from operators
- people understand the use case
- at least one repeatable content angle emerges
```

This gives the agent a target.

Without the target, it can only summarize activity.

### `launch-links.md`

```md
# Launch links

Blog posts:
- https://example.com/blog/post-one
- https://example.com/blog/post-two

Social posts:
- X post: https://x.com/example/status/123
- LinkedIn post: https://www.linkedin.com/posts/example

Newsletter:
- Subject: Practical AI workflows for operators
- Sent: 2026-05-12
```

Use public links where possible. If the agent needs access to private dashboards, make that a separate approval step.

### `metrics.md`

Keep it simple:

```md
# Metrics snapshot

Period: 2026-05-10 to 2026-05-14

Website:
- Blog visits: 420
- Homepage visits: 180
- Pricing visits: 36
- Telegram CTA clicks: 28

Social:
- X impressions: 8,400
- X profile visits: 91
- X replies: 6
- LinkedIn impressions: 2,100

Conversion:
- New bot starts: 14
- Qualified conversations: 4
- Paid conversions: 1

Notes:
Analytics are directional, not perfect.
```

Do not wait for a perfect dashboard. Directional numbers are enough for a useful retrospective.

### `customer-replies.md`

Paste anonymized replies, objections, or sales notes:

```md
# Customer replies

- "Can it do competitor research every Monday?"
- "I do not want it posting without approval."
- "Does it work with my existing browser login?"
- "I need a weekly summary, not another dashboard."
- "Can it check our landing pages before we run ads?"
```

For privacy, remove names, emails, phone numbers, and anything sensitive unless the agent is explicitly approved to handle them.

## The agent prompt

Use this prompt:

```text
Create a campaign retrospective from the files in campaign-retro/.

Rules:
- Use only the provided files and public links.
- Do not log in to private dashboards.
- Do not contact anyone.
- Do not publish or edit live content.
- If data is missing, say what is missing and continue with a directional read.

Return:
1. One-paragraph executive summary
2. Goal vs actual result
3. What worked
4. What did not work
5. Best audience signal
6. Best message signal
7. Top objections
8. Conversion leaks
9. Keep / change / stop decisions
10. Next campaign recommendation
```

This keeps the output decision-ready.

The strongest section is usually `keep / change / stop`.

Example:

```md
Keep:
- Practical workflow posts with clear operator jobs-to-be-done.
- Telegram CTA when the post explains what happens after clicking.

Change:
- Add approval-boundary language earlier in the page.
- Make examples more specific: weekly competitor brief, landing page QA, renewal call prep.

Stop:
- Generic "AI assistant" headlines without a concrete workflow.
```

That is the kind of summary a busy founder can actually use.

## Add a conversion lens

Ask the agent to separate attention from conversion.

A post may get views but attract the wrong readers. A quieter post may create better conversations.

Add this instruction:

```text
Do not rank campaign assets by views alone. For each asset, estimate whether it created:
- attention
- qualified curiosity
- CTA intent
- product confusion
- objections
- no useful signal
```

This prevents the retrospective from becoming vanity analytics.

A useful table:

```md
| Asset | Attention | Qualified signal | CTA clarity | Notes |
| --- | --- | --- | --- | --- |
| Blog post A | Medium | High | Clear | Readers asked for the exact workflow |
| X post B | High | Low | Weak | Many likes, few useful replies |
| Landing page | Medium | Medium | Mixed | CTA works, but approval model unclear |
```

## Ask for evidence

The agent should quote or cite the source for each major claim.

Add this rule:

```text
For every major conclusion, include the supporting source: file name, metric, link, or quoted reply.
```

Good output:

```md
Conclusion: Approval boundaries matter.
Evidence: customer-replies.md includes "I do not want it posting without approval" and "Does it work with my existing browser login?"
Decision: Add approval language near the CTA in future campaigns.
```

Bad output:

```md
Users care about trust.
```

That may be true, but it is not actionable without evidence.

## Use it after every campaign

A retrospective should be short enough to do every time.

Use this cadence:

- same day: save links and screenshots
- next day: add metrics snapshot
- after 3-5 days: add customer replies and conversion notes
- after one week: run the retrospective
- before the next campaign: reuse the keep/change/stop decisions

If you wait a month, the evidence gets stale.

## Human approval gates

A campaign retrospective may touch private business data.

Use this approval table:

| Action | Default rule |
| --- | --- |
| Read public launch links | Allowed |
| Read local campaign notes | Allowed if provided by user |
| Read anonymized customer replies | Allowed |
| Log in to analytics | Approval required |
| Export CRM data | Approval required |
| Contact customers | Approval required |
| Publish the retrospective | Approval required |
| Change live campaign pages | Approval required |

The agent can recommend. A human should approve external or customer-visible actions.

## ClawMama path

ClawMama is a good fit for this workflow because the work spans multiple sources: notes, public pages, replies, metrics, and a final decision memo.

A ready-to-use OpenClaw/Hermes agent can:

- read your campaign folder
- inspect public launch links
- summarize customer replies
- compare metrics against the original goal
- draft the retrospective
- stop before publishing or contacting anyone

New users get $2 credits, and the agent can use the latest ChatGPT model for synthesis and decision-making.

A good first request:

```text
Create a campaign retrospective from this folder. Keep it under two pages. Focus on what to keep, change, and stop for the next campaign. Do not log in anywhere or publish anything.
```

That is enough to turn a messy campaign into learning.

## Final checklist

Before you accept the retrospective, check:

- the original campaign goal is stated
- metrics are labeled as exact or directional
- customer replies are anonymized
- conclusions include evidence
- recommendations separate attention from conversion
- the output includes keep/change/stop decisions
- external actions remain unapproved by default

Campaigns compound when the learning compounds.

Use the agent to make sure the learning actually gets written down.
