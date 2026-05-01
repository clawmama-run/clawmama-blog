---
title: "Build a Sales Discovery Agent in Telegram with AI Skills"
description: "A practical playbook for using a Telegram AI agent, reusable sales skills, and ClawMama to turn vague prospect ideas into qualified lead research and outreach angles."
pubDate: 2026-05-01
author: "ClawMama Team"
tags: ["sales-discovery", "ai-skills", "telegram-bots", "openclaw"]
draft: false
---

Most early sales work starts messy.

You notice a company that might be a fit. Someone mentions a niche. A customer describes a pain. A competitor launches a feature. You think, “There may be prospects here,” but the thought disappears before it becomes a repeatable sales motion.

A sales discovery agent helps turn those loose signals into a structured workflow.

The point is not to spam people.

The point is to build a small Telegram-based assistant that can help you:

- define a target account profile;
- qualify whether a prospect is worth researching;
- identify likely pains and trigger events;
- prepare a short account brief;
- draft a human outreach angle;
- keep the workflow repeatable.

You can ask a generic AI chat for a prospecting idea once. But sales discovery is not one question. It is a recurring workflow.

That is where a Telegram agent with reusable skills becomes more useful.

## Who this is for

This playbook is for:

- founders doing founder-led sales;
- consultants looking for qualified client opportunities;
- small sales teams that do not have a full sales ops stack;
- marketers who need better account research before campaigns;
- operators who want a lightweight lead research workflow in chat.

The goal is simple:

> Send a company, niche, or customer segment to your Telegram agent and get back a useful sales discovery brief.

## Step 1: Create your Telegram sales agent

Open Telegram and go to ClawMama:

```text
https://t.me/clawmamarun_bot
```

Start a free trial and create a new OpenClaw or Hermes bot.

For this first version, you do not need a full CRM integration. You just need a Telegram chat where the agent can receive a prospect idea and return a structured brief.

ClawMama gives you a fast managed runtime so you can test the workflow before deciding whether to build deeper automation.

## Step 2: Ask the agent to add sales and marketing skills

Send this to your new agent:

```text
I want you to become my sales discovery copilot.

First, add these AI skills if your environment supports npx skills:

npx skills add coreyhaines31/marketingskills --skill sales-enablement customer-research product-marketing-context copywriting marketing-psychology --agent openclaw -y --copy

After adding them, read the installed skill instructions and use them to help me qualify prospects, identify buyer pains, prepare account briefs, and draft outreach angles.

If you cannot run this command in your environment, tell me clearly and continue using the same sales discovery framework manually.
```

This is the difference between a prompt and a workflow.

A prompt may produce one decent answer. Skills help the agent reuse a method: customer research, product marketing context, sales enablement, psychology, and copywriting.

## Step 3: Give the agent its sales discovery role

Now send:

```text
You are my sales discovery copilot.

When I give you a company, niche, or target customer segment, help me produce a practical sales discovery brief.

For each brief, identify:
- likely buyer profile;
- likely pains;
- trigger events;
- current alternatives;
- qualification questions;
- outreach angle;
- risks or reasons this may not be a fit;
- next action.

Rules:
- Do not invent private facts about a company.
- Separate assumptions from verified evidence.
- Keep outreach respectful and specific.
- Do not write spam.
- If you need more context, ask one short follow-up question.
```

This keeps the agent focused on useful sales thinking, not generic lead generation.

## Step 4: Send your first prospecting idea

Try this example:

```text
Create a sales discovery brief for this segment:

Segment:
Small B2B SaaS teams with 5-30 employees that publish content but do not have a full-time growth team.

Product we sell:
A Telegram-first managed AI agent that helps with research, content ideas, competitor monitoring, and lightweight sales discovery.

Goal:
Find likely pains, trigger events, qualification questions, and a respectful outreach angle.

Important:
Treat this as a hypothesis sprint unless evidence is provided. Label confidence clearly.
```

The agent should return a brief you can use to decide whether the segment is worth pursuing.

## Example output

```text
Sales Discovery Brief
Segment: Small B2B SaaS teams with 5-30 employees
Product: Telegram-first managed AI agent for research, content, competitor monitoring, and sales discovery

1. Likely buyer profile

Primary buyer:
Founder, head of growth, or marketing lead who owns pipeline and content but lacks dedicated research support.
Confidence: medium.

Secondary user:
Operator, content marketer, or sales person who needs quick research briefs and follow-up drafts.
Confidence: medium.

2. Likely pains

- They need consistent content and market research but do not have enough time.
- Competitor tracking is informal and easy to forget.
- Sales discovery depends on founder memory and scattered notes.
- Research gets trapped in browser tabs, docs, and chats.
- Hiring a dedicated growth ops person may be too early.

Confidence: medium as business-logic hypotheses, low until validated with interviews.

3. Trigger events

- Launching a new product or feature.
- Entering a new niche.
- Seeing a competitor grow faster.
- Founder starts doing more outbound.
- Content cadence becomes inconsistent.
- Team wants AI help but does not want to maintain infrastructure.

4. Current alternatives

- Founder manually researches prospects and competitors.
- Marketing uses ChatGPT as a one-off assistant.
- Team keeps notes in Notion or Google Docs.
- Sales uses CRM notes without structured research.
- Growth team buys multiple tools but lacks a workflow.

5. Qualification questions

- How do you currently research new prospects or niches?
- Who owns competitor monitoring today?
- How often do research notes turn into content or outreach?
- Where does this work currently live: chat, docs, CRM, spreadsheets?
- What breaks when the founder is too busy to do research?
- Have you tried AI for this? What made it hard to keep using?

6. Outreach angle

Potential angle:
“You probably already use AI for one-off research. The harder part is making that research repeatable from the place your team already works. We help small SaaS teams turn Telegram into a lightweight AI research and sales discovery agent, without maintaining a VPS.”

7. Risks

- Some teams may prefer existing CRM or sales engagement tools.
- The pain may not be urgent until outbound or content becomes a priority.
- If the team does not use Telegram, the workflow may be less natural.
- The buyer may see this as a productivity tool, not a revenue tool.

8. Next action

Interview 5 founders or growth leads. Ask how they currently turn market signals into content, outreach, and account research. Look for repeated pain around inconsistency, context loss, and founder bottlenecks.
```

This is not a replacement for real sales work.

It is a faster way to prepare for it.

## Step 5: Turn the brief into outreach preparation

After the brief, send:

```text
Turn this into a founder-led sales prep pack.

Give me:
1. 5 signs that an account is likely a fit;
2. 5 signs that it is not a fit;
3. 10 discovery questions;
4. 3 outreach angles;
5. 2 short outreach messages that sound human and non-spammy.
```

Now the agent is not just summarizing. It is helping you prepare a sales motion.

## Step 6: Add real account context

The workflow becomes more useful when you feed the agent real inputs.

For example:

```text
Here is a company I am considering contacting:

Company: [company name]
Website: [URL]
Notes: [paste public notes, positioning, product description, or your observations]

Use the sales discovery framework and tell me:
- whether this looks like a fit;
- what pain might be relevant;
- what evidence is missing;
- what I should research before reaching out;
- one respectful outreach angle.
```

Or:

```text
Here are notes from a sales call.

[Paste notes]

Extract:
- pains;
- urgency;
- objections;
- buying trigger;
- next-step recommendation;
- follow-up email draft.
```

This is where a Telegram agent becomes more valuable than one-off AI chat.

It becomes a place where your sales discovery workflow lives.

## Why skills matter

Without skills, you are mostly relying on a prompt.

With skills, the agent can reuse a more consistent method for sales enablement, customer research, product marketing, psychology, and copywriting.

That matters because sales discovery is repetitive. You do not want to re-explain the method every time.

The command is the capability layer:

```text
npx skills add coreyhaines31/marketingskills --skill sales-enablement customer-research product-marketing-context copywriting marketing-psychology --agent openclaw -y --copy
```

You can send it to your agent as a task.

If the runtime supports it, the agent can install the skills and use them. If not, the agent can still follow the manual framework, and you can add skills later.

## Why ClawMama fits

You could self-host an OpenClaw or Hermes bot and wire this together yourself.

But if your goal is to validate a sales workflow, that may be the wrong first step.

ClawMama gives you a faster path:

- create a Telegram-first AI agent;
- try it with a free trial;
- ask it to add reusable skills;
- test a real sales discovery workflow;
- keep the agent available where you already chat;
- decide later whether to expand the automation.

The important shift is this:

> Do not start by building a sales platform. Start by proving that a repeatable agent workflow helps you qualify better opportunities.

## Final takeaway

A sales discovery agent should not spam people or invent facts.

It should help you think more clearly before you reach out.

Give it skills. Give it a target segment. Ask for a structured brief. Feed it real account notes. Let it produce qualification questions, risks, and respectful outreach angles.

If the workflow helps you find better-fit conversations, it is already useful.

From there, you can add CRM updates, scheduled research, deeper account monitoring, and more automation.

But the first win is simple:

> Open Telegram, ask your agent to add sales discovery skills, and turn a vague prospect idea into a practical account research workflow.
