---
title: "Use an AI Agent to Keep a Decision Log"
description: "A practical workflow for turning scattered founder, product, sales, and operations decisions into a searchable decision log with context and review."
pubDate: 2026-05-06
author: "ClawMama Team"
tags: ["operations", "ai-agents", "openclaw", "hermes", "knowledge-management"]
draft: false
---

Reader persona: a founder, operator, product lead, consultant, or small team manager who keeps making decisions in chats, calls, and documents but later struggles to remember why they were made.

Job to be done: use an AI agent to maintain a decision log that captures what was decided, why, who approved it, what evidence supported it, and when to revisit it.

Small teams move fast.

That is good.

But fast teams often lose the reason behind decisions.

Three weeks later someone asks:

```text
Why did we choose Telegram as the first interface?
```

Or:

```text
Why did we delay the pricing page?
```

Or:

```text
Who approved this workflow touching customer data?
```

If the answer lives only in memory, the team pays a tax every time the question returns.

A decision log fixes that.

An AI agent can help maintain it.

Not by making the decisions.

By capturing and organizing them before they disappear.

## The workflow

Use this shape:

```text
raw notes → candidate decisions → human confirmation → decision entry → revisit reminders
```

The agent should treat decisions as records, not opinions.

The human still owns judgment and approval.

## Step 1: Create a decision log folder

Ask the agent to create:

```text
decisions/
  README.md
  decision-log.md
  pending-decisions.md
  superseded-decisions.md
  weekly-review.md
```

Use one simple format at first.

`decision-log.md` can look like this:

```markdown
# Decision Log

## DEC-0001 — Short title

- Date:
- Status: Active / Superseded / Revisit / Rejected
- Decision owner:
- Approved by:
- Context:
- Decision:
- Alternatives considered:
- Evidence:
- Risks:
- Follow-up actions:
- Revisit date:
- Source links or notes:
```

The exact fields matter less than consistency.

## Step 2: Teach the agent what counts as a decision

Not every note is a decision.

Give the agent rules:

```text
A decision is something that changes what we will do, not just something someone said.

Examples:
- choose a launch channel;
- change pricing;
- approve an integration;
- reject a customer segment;
- delay a feature;
- change an onboarding flow;
- approve an external action;
- choose a vendor;
- set a security boundary;
- define a product claim we are allowed to make.
```

Ask the agent to separate:

```text
confirmed decisions
candidate decisions
open questions
background context
```

That prevents the log from turning into a messy meeting transcript.

## Step 3: Feed the agent raw notes

Useful sources include:

- meeting notes;
- founder notes;
- customer call summaries;
- Slack or Telegram excerpts you are allowed to use;
- GitHub issue comments;
- product planning docs;
- sales objections;
- support themes;
- marketing campaign notes.

Prompt:

```text
Extract candidate decisions from these notes.

For each candidate, include:
- what appears to have been decided;
- who seems to own it;
- evidence from the notes;
- what is missing;
- whether this needs human confirmation.

Do not add it to the final decision log until I confirm.
```

This review step is important.

The agent may misread discussion as approval.

## Step 4: Confirm before logging

The agent should write candidates to `pending-decisions.md` first.

Example:

```markdown
## Candidate — Use Telegram as primary onboarding path

Possible decision:
Use Telegram as the first customer onboarding and agent-management interface.

Evidence:
- Product notes mention Telegram `/start`, `/create`, `/balance`, and `/topup`.
- Website CTA points to Telegram bot.

Needs confirmation:
- Is this a permanent strategy or current launch wedge?
- Who approved it?
- When should we revisit it?
```

Then the human replies:

```text
Confirm this decision. Owner: JQ. Status: Active. Revisit in 60 days.
```

Only then should it become a final log entry.

## Step 5: Capture why, not just what

A weak decision log says:

```text
We chose Telegram.
```

A useful decision log says:

```text
We chose Telegram as the first interface because the product already depends on Telegram bot workflows, it reduces onboarding friction for non-technical users, and it lets users manage agents without a local server. We will revisit when web onboarding demand becomes clear.
```

The `why` is the asset.

Ask the agent:

```text
For every decision, write the reasoning in plain language.
If the reasoning is not available, mark it as missing.
Do not invent motivation.
```

## Step 6: Track superseded decisions

Decisions change.

Do not delete old ones.

Mark them as superseded.

Example:

```markdown
## DEC-0007 — Publish every article to Dev.to

Status: Superseded
Superseded by: DEC-0014
Reason: The team decided Dev.to should be selective distribution only, not a mirror for every post.
```

This helps future teammates understand why the policy changed.

It also avoids repeating old debates.

## Step 7: Run a weekly review

Ask the agent once a week:

```text
Review the decision log.

Return:
1. decisions with revisit dates due soon;
2. decisions missing owner or evidence;
3. decisions that may be superseded by recent notes;
4. decisions that created follow-up actions;
5. questions a human should answer.

Do not change final statuses without approval.
```

The weekly review keeps the log alive.

Without review, it becomes another forgotten document.

## A practical OpenClaw or Hermes prompt

Use this prompt with your agent:

```text
You are helping me maintain a decision log.

Create:
- decisions/decision-log.md
- decisions/pending-decisions.md
- decisions/superseded-decisions.md
- decisions/weekly-review.md

Rules:
- extract candidate decisions from notes;
- do not treat discussion as approval;
- every final decision needs human confirmation;
- include owner, context, evidence, alternatives, risks, follow-ups, and revisit date when available;
- mark missing information clearly;
- never invent why a decision was made;
- do not send, publish, or change external systems without approval.
```

This turns the agent into a memory and structure layer.

Not a decision-maker.

## Where ClawMama fits

You can run this workflow in any capable AI agent environment.

ClawMama is useful if you want an OpenClaw or Hermes agent available from Telegram without maintaining your own server.

Start here:

```text
https://t.me/clawmamarun_bot
```

Create a managed bot, upload or paste notes, and ask it to maintain a decision log.

New users get $2 of AI credits and access to the latest ChatGPT model, enough to test a small decision-log workflow.

A good first instruction:

```text
You may organize notes and draft candidate decision entries.
You may not approve decisions, message people, publish anything, change files outside the decision-log folder, or expose private data without my approval.
```

That boundary keeps the workflow safe.

## What to avoid

Do not ask the agent to decide what the team should do.

Ask it to record what humans decided.

Do not let it rewrite history to make decisions sound cleaner than they were.

Do not include private customer details unless the log is private and access-controlled.

Do not skip the pending step.

The agent should help you remember, not create official policy from ambiguous notes.

## Final takeaway

A decision log is leverage.

It turns scattered conversations into organizational memory:

```text
what we chose → why we chose it → who approved it → when to revisit it
```

An AI agent can keep the structure updated.

Humans still own the decisions.
