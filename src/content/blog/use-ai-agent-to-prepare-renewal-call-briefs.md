---
title: "Use an AI Agent to Prepare Renewal Call Briefs"
description: "A practical workflow for turning account notes, support history, product usage, and open risks into a short renewal-call brief a human can trust."
pubDate: 2026-05-11
author: "ClawMama Team"
tags: ["customer-success", "sales", "ai-agents", "operations", "openclaw"]
draft: false
---

Reader persona: a founder, customer success lead, account manager, sales operator, or solo B2B team that handles renewals but does not have a full RevOps stack.

Job to be done: use an AI agent to prepare a concise renewal-call brief from scattered account context, while keeping pricing, concessions, and commitments under human control.

Renewal calls are won or lost before the call starts.

The problem is not that teams lack information.

The problem is that the information is scattered:

- support tickets;
- Slack or Telegram notes;
- call summaries;
- product usage snippets;
- invoice status;
- open feature requests;
- old promises from the sales process.

An AI agent can help by preparing the brief.

It should not decide the commercial strategy alone.

## The workflow

Create a simple folder for each renewal:

```text
renewal-briefs/
  acme-co/
    account-notes.md
    support-history.md
    usage-summary.md
    open-requests.md
    pricing-and-contract.md
    renewal-brief.md
    human-review.md
```

The agent's job is to turn messy inputs into a focused pre-call document.

The human's job is to approve strategy, concessions, and any external communication.

## Step 1: Collect account context

Start with facts, not interpretation.

Example `account-notes.md`:

```markdown
# Acme Co Account Notes

- Plan: Team, annual renewal due 2026-05-22.
- Primary contact: Maya, Head of Operations.
- Original reason for buying: reduce manual weekly reporting work.
- Success metric discussed in onboarding: save 4 hours/week for ops team.
- Last QBR: customer liked automated research summaries but wanted cleaner Slack formatting.
```

Example `support-history.md`:

```markdown
# Support History

- 2026-04-03: asked about exporting reports as CSV.
- 2026-04-11: reported webhook delay; resolved same day.
- 2026-04-28: asked whether multiple teammates can approve agent actions.
```

Example `usage-summary.md`:

```markdown
# Usage Summary

- 19 weekly research reports generated in the last 90 days.
- 7 competitor scans generated in the last 90 days.
- Usage dipped for two weeks in late April.
- Usage recovered after the webhook delay was fixed.
```

Keep the raw notes plain.

Do not make the agent guess what happened.

## Step 2: Ask the agent for a fact map

Before asking for the final brief, ask for a fact map.

Prompt:

```text
Read the files for Acme Co.
Create a fact map with four sections:
1. confirmed value;
2. unresolved risks;
3. open requests;
4. missing information.
Quote the source line or file for each important point.
Do not recommend discounts, pricing changes, or commitments.
Write the result to human-review.md.
```

This step makes hidden assumptions visible.

If the agent cannot find evidence, it should say so.

## Step 3: Draft the renewal-call brief

After reviewing the fact map, ask for the actual brief.

Prompt:

```text
Use human-review.md and the source files.
Draft renewal-brief.md for a 30-minute renewal call.
Keep it to one page.
Include:
- account snapshot;
- likely value story;
- risks to address;
- questions to ask;
- suggested agenda;
- follow-up items to prepare.
Do not invent usage numbers.
Do not offer discounts or contract terms.
Flag anything that needs human confirmation.
```

A useful output looks like this:

```markdown
# Renewal Call Brief: Acme Co

## Account snapshot
- Annual renewal due 2026-05-22.
- Primary contact: Maya, Head of Operations.
- Original goal: reduce weekly reporting work.

## Value story to confirm
- The account generated 19 weekly research reports in the last 90 days.
- This connects to the original goal of reducing manual reporting work.

## Risks to address
- Customer had a webhook delay on 2026-04-11, resolved same day.
- Customer asked about teammate approval flows; confirm whether this is still blocking expansion.

## Questions for the call
1. Are the weekly research reports still saving the ops team time?
2. Who else needs approval visibility before renewal?
3. Is CSV export still important, or was it a one-off request?

## Human confirmation needed
- Contract terms.
- Any discount or credit.
- Whether teammate approvals are currently supported.
```

The brief should be short enough to read in two minutes.

If it becomes a ten-page dossier, it will not be used.

## Step 4: Prepare the follow-up before the call

The agent can also prepare a follow-up skeleton.

Prompt:

```text
Draft a post-call follow-up email skeleton.
Do not fill in commitments.
Use placeholders for anything that must come from the actual call.
```

Example:

```markdown
Subject: Follow-up from our renewal conversation

Hi Maya,

Thanks for taking the time today.

My notes:
- Value confirmed: [fill after call]
- Open concern: [fill after call]
- Next step from our side: [human-approved commitment]
- Next step from your side: [customer-owned action]

We'll send the confirmed renewal details after internal review.
```

This keeps the agent helpful without letting it promise something the company has not approved.

## What not to delegate

Do not let the agent independently decide:

- discounts;
- renewal price;
- contract term changes;
- refund or credit promises;
- legal language;
- product roadmap commitments;
- whether to threaten churn escalation.

Those are business decisions.

The agent can prepare the room.

A human should run the negotiation.

## ClawMama implementation pattern

In ClawMama, this can run as a recurring Telegram workflow:

```text
Monday 09:00 → agent asks which renewals are coming up
operator uploads notes or points to files
agent drafts fact map
operator reviews missing info
agent drafts one-page renewal brief
operator approves before using it externally
```

A good OpenClaw/Hermes prompt:

```text
You are my renewal-call prep assistant.
Your job is to summarize account facts, identify risks, and prepare call briefs.
You may read notes and draft internal documents.
You must ask before sending messages, changing CRM fields, promising discounts, or making contract recommendations.
```

ClawMama gives each hosted bot an isolated runtime environment and starts new users with `$2` in credits.

That means a small operator can keep this workflow in Telegram without maintaining a VPS.

Start here:

```text
https://t.me/clawmamarun_bot
```

## Review checklist

Before using the brief, check:

```text
[ ] Are usage numbers sourced?
[ ] Are support issues described accurately?
[ ] Are risks separated from guesses?
[ ] Are pricing and contract terms left for a human?
[ ] Are product commitments marked for confirmation?
[ ] Is the brief short enough to use before a call?
```

The point is not to automate the relationship.

The point is to make sure the human enters the renewal call prepared.
