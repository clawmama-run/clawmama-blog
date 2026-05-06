---
title: "Use an AI Agent to Turn Demo Notes into Product Feedback"
description: "A practical workflow for converting sales demo notes into structured product feedback, evidence, objections, and follow-up tasks without inventing roadmap claims."
pubDate: 2026-05-06
author: "ClawMama Team"
tags: ["product", "sales", "ai-agents", "openclaw", "hermes"]
draft: false
---

Reader persona: a founder, product marketer, sales operator, customer success lead, or product manager who runs demos and wants the learning to improve the product instead of disappearing into call notes.

Job to be done: use an AI agent to turn raw demo notes into structured product feedback, objections, feature requests, evidence, and follow-up tasks with human review.

Demos are full of product signal.

A prospect hesitates at pricing.

A customer asks whether a workflow is safe.

Someone misunderstands the product category.

Someone requests a feature that three other teams already mentioned.

If those notes stay in a call doc, the team loses the learning.

An AI agent can help turn demo notes into product feedback.

Not by deciding the roadmap.

By extracting patterns and preserving evidence.

## The workflow

Use this shape:

```text
demo notes → extract signals → group themes → attach evidence → create feedback entries → human review → product follow-up
```

The agent should organize customer language.

The human should decide what matters.

## Step 1: Create a feedback folder

Ask the agent to create:

```text
product-feedback/
  README.md
  demo-notes/
  feedback-log.md
  objections.md
  feature-requests.md
  messaging-confusion.md
  follow-ups.md
```

Keep raw notes separate from interpreted feedback.

That makes it easier to audit later.

## Step 2: Define the feedback categories

Use a simple taxonomy:

```text
Feature request
Usability issue
Pricing concern
Security or approval concern
Integration request
Messaging confusion
Competitor comparison
Buying-process blocker
Success criterion
Support or onboarding need
```

Ask the agent to classify each signal.

But also ask it to preserve the original wording.

Customer language is often more valuable than the category.

## Step 3: Feed the agent raw demo notes

Example prompt:

```text
Analyze these demo notes.

Extract product feedback into these categories:
- feature request;
- usability issue;
- pricing concern;
- security or approval concern;
- integration request;
- messaging confusion;
- competitor comparison;
- buying-process blocker;
- success criterion;
- support or onboarding need.

For every item, include:
- exact customer wording if available;
- source demo/date;
- severity or importance;
- evidence;
- whether it is one-off or repeated;
- suggested follow-up question.

Do not invent product roadmap commitments.
```

This prompt keeps the agent grounded.

## Step 4: Use a structured feedback log

`feedback-log.md` can use this table:

```markdown
| ID | Date | Customer segment | Category | Signal | Evidence | Frequency | Impact | Follow-up | Status |
|---|---|---|---|---|---|---|---|---|
```

Define the fields:

```text
Signal: what the customer said or implied.
Evidence: source note, quote, call, screenshot, or transcript reference.
Frequency: first time, repeated, common, unknown.
Impact: low, medium, high, critical.
Follow-up: question to ask or action to take.
Status: new, reviewing, accepted, rejected, shipped, needs more evidence.
```

Avoid over-scoring early feedback.

One loud prospect is not the market.

## Step 5: Separate objections from product gaps

A demo objection is not always a product problem.

Example:

```text
How is this different from ChatGPT?
```

That may be a messaging problem, not a feature gap.

Example:

```text
Can the agent send messages without approval?
```

That may be a trust and safety explanation gap.

Ask the agent:

```text
For each objection, classify it as likely:
- product gap;
- messaging gap;
- onboarding gap;
- trust/safety concern;
- pricing concern;
- wrong-fit customer;
- unknown.

Explain the classification with evidence.
```

This stops the roadmap from becoming a pile of sales anxieties.

## Step 6: Detect repeated language

The agent is useful for pattern matching.

Ask:

```text
Find repeated phrases or themes across the last 10 demos.

Return:
- phrase or theme;
- example quotes;
- customer segment;
- what this may indicate;
- whether it affects product, positioning, onboarding, or sales enablement.
```

Repeated language can become:

- FAQ entries;
- landing page copy;
- onboarding checklist items;
- demo script changes;
- product requirements;
- support docs;
- sales follow-up templates.

## Step 7: Create follow-up tasks

The agent should not just summarize.

Ask it to create `follow-ups.md`:

```markdown
# Demo Follow-ups

## Product follow-ups
- Feedback ID
- Proposed next step
- Owner
- Evidence
- Deadline

## Customer follow-ups
- Customer
- Question to ask
- Draft wording
- Approval status

## Messaging follow-ups
- Confusing phrase
- Suggested clearer wording
- Where to update
```

For customer-facing follow-ups, require approval.

The agent can draft.

A human should send.

## Step 8: Keep roadmap claims out

This is critical.

The agent should never tell customers:

```text
We are building this.
```

unless a human approved that message.

Use this rule:

```text
When drafting customer follow-ups, do not promise timelines, roadmap items, pricing changes, integrations, security guarantees, or support commitments unless explicitly provided.
```

That protects trust.

## A practical OpenClaw or Hermes prompt

Use this prompt:

```text
You are helping me turn sales demo notes into product feedback.

Create and maintain:
- product-feedback/feedback-log.md
- product-feedback/objections.md
- product-feedback/feature-requests.md
- product-feedback/messaging-confusion.md
- product-feedback/follow-ups.md

Rules:
- preserve exact customer wording when available;
- cite the source demo/date for each item;
- separate product gaps from messaging gaps;
- mark one-off feedback differently from repeated feedback;
- do not invent roadmap commitments;
- draft follow-up questions but do not send them;
- ask for approval before contacting customers or changing public copy.
```

This gives the agent a clear operating role.

## Where ClawMama fits

You can run this workflow in a local or hosted agent.

ClawMama is useful if you want an OpenClaw or Hermes agent available through Telegram without maintaining server infrastructure.

Start here:

```text
https://t.me/clawmamarun_bot
```

Create a managed bot, paste sanitized demo notes, and ask it to maintain a product-feedback folder.

New users get $2 of AI credits and access to the latest ChatGPT model, enough to test the workflow on a few demo notes.

A good first instruction:

```text
You may organize demo notes and draft product-feedback entries.
You may not contact customers, publish roadmap claims, change public copy, or expose private customer details without my approval.
```

That boundary keeps the agent helpful without creating sales or roadmap risk.

## What to avoid

Do not treat every feature request as a roadmap item.

Do not merge multiple customers into one fake quote.

Do not remove the raw source notes.

Do not let the agent overgeneralize from one demo.

Do not send AI-written follow-ups without review.

Do not publish customer-sensitive language without permission.

## Final takeaway

Demo notes are not just sales records.

They are product research.

An AI agent can help turn them into structured learning:

```text
raw demo notes → feedback log → patterns → follow-ups → better product decisions
```

The agent organizes the signal.

Humans decide what to build, say, and promise.
