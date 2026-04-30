---
title: "Build a Market Research Agent in Telegram with AI Skills"
description: "A step-by-step playbook for using ClawMama, OpenClaw or Hermes, and npx skills to turn a product idea into a practical market research sprint from Telegram."
pubDate: 2026-04-30
author: "ClawMama Team"
tags: ["ai-skills", "market-research", "telegram-bots", "openclaw"]
draft: false
---

Most founders and marketers do not need a complicated AI agent setup on day one.

They need to answer a simpler question:

> Can I send a product idea to a Telegram bot and get back a useful market research brief?

This guide walks through a lightweight version you can try quickly with ClawMama, OpenClaw or Hermes, and reusable skills from skills.sh.

You will create a Telegram-based AI agent, ask it to add a few market research skills, give it your product idea, and get back a structured research sprint you can use to plan interviews, review mining, and positioning tests.

The result will not be perfect market truth. It should not replace real customer conversations.

But it can help you move from “I have an idea” to “I know what to validate next.”

## What you will build

You will build a simple Telegram market research copilot.

It should help you answer:

- Who might buy this?
- What pain are they trying to solve?
- What alternatives do they use today?
- What words might they use to describe the problem?
- What objections might stop them from buying?
- What positioning angles are worth testing?
- What should I validate this week?

The useful part is not just the chatbot.

The useful part is giving the agent reusable skills so it follows a better process each time.

For this first version, we will use skills such as:

- `customer-research`
- `product-marketing-context`
- `marketing-psychology`
- `copywriting`
- `content-strategy`

These are not magic buttons. They are reusable working methods that help the agent reason like a better research and marketing assistant.

## Step 1: Start from Telegram

Open Telegram and go to ClawMama:

```text
https://t.me/clawmamarun_bot
```

Start a free trial and create a new AI bot.

For a first test, choose the simplest available OpenClaw or Hermes runtime option. You are not trying to design the perfect agent yet. You are trying to see whether this workflow is useful.

If you already have a Telegram bot token from BotFather, you can connect it. If not, follow the ClawMama onboarding flow and create one when prompted.

The important thing is simple: get to a Telegram chat where you can talk to your new AI agent.

## Step 2: Ask your agent to add market research skills

Once your Telegram AI agent is ready, send it this message:

```text
I want you to become my market research copilot.

First, add these AI skills if your environment supports npx skills:

npx skills add coreyhaines31/marketingskills --skill product-marketing-context customer-research marketing-psychology copywriting content-strategy --agent openclaw -y --copy

After adding them, read the installed skill instructions and use them to help me run customer research, positioning, copywriting, and content strategy workflows.

If you cannot run this command in your environment, tell me clearly and continue using the same research framework manually.
```

This is an important step.

You are not asking the agent to improvise from a blank prompt. You are asking it to load reusable skills that guide how it thinks about customers, jobs-to-be-done, positioning, psychology, copywriting, and content strategy.

If the command works, the agent gets a stronger working method.

If it does not work, you can still continue with the manual steps below.

## Step 3: Tell the agent what job it has

Now send this message:

```text
You are my market research copilot.

Your job is to help me turn vague business ideas into structured research briefs.

When I give you a product idea, help me identify:
- likely customer segments;
- jobs-to-be-done;
- customer pains;
- existing alternatives;
- buyer language to look for;
- objections and risks;
- positioning angles;
- next validation steps.

Rules:
- Do not pretend assumptions are facts.
- Separate facts from hypotheses.
- Label confidence as high, medium, or low.
- Ask clarifying questions if the idea is too vague.
- Keep the output practical.
- Use any installed skills such as customer-research, product-marketing-context, marketing-psychology, copywriting, and content-strategy when they are relevant.
```

This gives the bot a clear role.

You are not asking it to “do research” in a vague way. You are telling it what a useful research answer should contain.

## Step 4: Give it a simple research method

Now send this message:

```text
Use this customer research method for every market brief:

1. Start with the target customer.
2. Identify the job they are trying to get done.
3. List pains, blockers, and anxieties that make the job hard.
4. List current alternatives, including manual workarounds.
5. Identify trigger events that make the problem urgent.
6. Suggest buyer language I should look for in interviews, reviews, forums, or sales calls.
7. Suggest positioning angles based on the pain and trigger events.
8. End with a 7-day validation plan.

Use this format:

Market Research Brief

1. Summary
2. Likely customer segments
3. Jobs-to-be-done
4. Pain hypotheses
5. Existing alternatives
6. Buyer language to look for
7. Positioning angles
8. Risks and unknowns
9. 7-day validation plan
```

This is the difference between a generic chatbot and a useful research copilot.

The agent now has a repeatable process.

## Step 5: Send your first market idea

Now paste your product idea.

Here is an example you can copy and edit:

```text
Create a market research brief for this idea:

Product idea:
An AI scheduling assistant for solo therapists.

Target customer:
Independent therapists, counselors, and small private practices in the US.

Problem:
They spend too much time scheduling, rescheduling, sending reminders, handling cancellations, managing waitlists, and dealing with no-shows.

Known alternatives:
Calendly, SimplePractice, Zocdoc, Google Calendar, manual texting, email reminders.

Goal:
Help me understand the likely customer pains, trigger events, objections, buyer language, and positioning angles worth testing.

Important:
If you do not have verified sources, treat this as a hypothesis sprint. Label confidence clearly and give me a plan to validate the assumptions.

Use the installed skills if available:
- customer-research for customer pains and jobs-to-be-done;
- product-marketing-context for ICP and positioning;
- marketing-psychology for objections and triggers;
- copywriting for messaging angles;
- content-strategy for follow-up content ideas.
```

This is intentionally specific.

The more context you give the agent, the more useful the output becomes.

## Step 6: Ask for the first useful output

After the agent responds, send this:

```text
Turn this into a concise customer research sprint.

Deliver:
1. likely customer segments;
2. top pain hypotheses;
3. jobs-to-be-done;
4. trigger events;
5. likely objections;
6. buyer language to look for;
7. 10 customer interview questions;
8. where I can find real evidence;
9. 5 landing page positioning angles;
10. 5 content ideas I could write to test demand.

Use confidence labels. Do not present assumptions as proven facts.
```

Now the bot should produce something practical.

## Example result

Here is the kind of result you should expect.

```text
Customer Research Sprint
Product: AI scheduling assistant for solo therapists

Important note:
This is a hypothesis sprint, not verified market research. Confidence should improve after interviews, review mining, and customer conversations.

1. Likely customer segments

Segment A: Solo private-practice therapists
They manage clinical work and admin alone. Scheduling work may happen between sessions or after hours.
Confidence: medium as a business-logic hypothesis, low as verified research.

Segment B: Small therapy practices without full-time admin support
They may have enough clients to feel scheduling pain but not enough operational support to remove it.
Confidence: low.

Segment C: New private-practice therapists
They may be setting up systems for the first time and comparing simple tools.
Confidence: low.

2. Top pain hypotheses

- No-shows create lost revenue.
- Rescheduling causes back-and-forth messages.
- Reminder workflows are inconsistent.
- Existing tools may feel too generic or too heavy.
- Therapists may worry about privacy, tone, and client trust.
- Admin work takes energy away from client care.

3. Jobs-to-be-done

When a solo therapist manages recurring client appointments, they want scheduling and reminders handled reliably so they can protect billable hours and focus on care instead of admin coordination.

4. Trigger events

- A rise in no-shows or late cancellations.
- Starting a private practice.
- Moving from part-time to full-time caseload.
- Hiring or losing admin support.
- Switching practice-management tools.
- Feeling overwhelmed by messages between sessions.

5. Likely objections

- “Will this be HIPAA-compliant?”
- “Will clients feel uncomfortable with AI?”
- “Can it match the tone I use with clients?”
- “Does my current practice software already do this?”
- “Is setup worth the effort?”

6. Buyer language to look for

Search interviews, reviews, and forum posts for phrases like:

- “no-shows”
- “last-minute cancellations”
- “scheduling back and forth”
- “client reminders”
- “admin burden”
- “private practice scheduling”
- “I spend too much time texting clients”
- “I need something simple”

7. Customer interview questions

- Walk me through how a client books or reschedules today.
- What part of scheduling takes the most time?
- What happens when a client cancels late?
- How do you currently send reminders?
- What tools have you tried?
- What feels too heavy or too generic about those tools?
- What would make you trust an assistant with scheduling?
- What client communication should never be automated?
- How many no-shows or late cancellations happen in a typical month?
- What would make this problem urgent enough to pay for?

8. Where to find real evidence

- Reviews of SimplePractice, TherapyNotes, Jane App, Zocdoc, and Calendly.
- Therapist communities and private-practice forums.
- Reddit threads about private practice admin work.
- Blog posts by therapists about no-shows and scheduling.
- Interviews with solo therapists.

9. Positioning angles to test

Angle 1: Reduce no-shows without hiring admin help.
Best for: solo therapists with recurring clients.
Evidence needed: no-show pain and willingness to use reminders.

Angle 2: Less scheduling back-and-forth between sessions.
Best for: therapists overwhelmed by messages.
Evidence needed: how often scheduling interrupts work.

Angle 3: A client-friendly scheduling assistant for private practice.
Best for: therapists worried about tone and trust.
Evidence needed: concerns about generic automation.

Angle 4: Protect billable hours with smarter reminders.
Best for: practices focused on revenue leakage.
Evidence needed: measurable cancellation/no-show cost.

Angle 5: Lightweight scheduling support without a heavy practice platform.
Best for: therapists who find full practice software too much.
Evidence needed: dissatisfaction with current tools.

10. Content ideas to test demand

- How solo therapists can reduce no-shows without hiring admin help
- The hidden scheduling cost of running a private therapy practice
- Calendly vs practice-management software for solo therapists
- How to write client reminders that feel human, not automated
- A 7-day no-show reduction checklist for private practices
```

This is already useful.

It gives you interview questions, search terms, risks, positioning angles, and content ideas. You can use it to plan the next week instead of staring at a blank page.

## Step 7: Turn the brief into action

Now send:

```text
Turn this into a 7-day validation plan.

For each day, tell me:
- what to do;
- what evidence to collect;
- what would make the idea stronger;
- what would make the idea weaker.
```

Then send:

```text
Write a short outreach message I can send to solo therapists asking for a 15-minute research call.
Make it non-salesy and clear that I am validating a problem, not pitching a product.
```

Then send:

```text
Create 5 landing page headline options based on the strongest pain hypotheses.
For each headline, explain which customer segment it targets and what evidence I need before using it.
```

Now the agent is helping you move from idea to validation.

## Step 8: Add real evidence

The first run is only a hypothesis sprint.

To make it stronger, paste real material into the bot.

For example:

```text
Here are notes from 3 customer conversations. Analyze them using the same research framework and the customer-research skill if available.

[Paste notes here]

Extract:
- repeated pains;
- exact customer language;
- emotional triggers;
- desired outcomes;
- objections;
- buying triggers;
- messaging implications;
- homepage headline ideas using their words.
```

Or:

```text
Here are review snippets from competitor tools.

[Paste review snippets here]

Please extract:
- what customers praise;
- what customers complain about;
- switching triggers;
- words customers use repeatedly;
- gaps we might position around;
- claims we should avoid unless validated.
```

This is where the agent becomes more valuable.

It is no longer inventing from a prompt. It is helping you organize evidence.

## Why use skills instead of only prompts?

A prompt can work once.

A skill helps the agent repeat a method.

That matters because market research is not a single question. It is a workflow:

- define the customer;
- understand the job;
- identify pains;
- collect language;
- compare alternatives;
- find objections;
- turn insights into positioning;
- turn positioning into copy and content;
- validate with real evidence.

The skills from `coreyhaines31/marketingskills` help the agent reuse these methods instead of starting from scratch every time.

That is why the command matters:

```text
npx skills add coreyhaines31/marketingskills --skill product-marketing-context customer-research marketing-psychology copywriting content-strategy --agent openclaw -y --copy
```

It is not just setup.

It is how you give your agent a stronger working process.

## Why ClawMama fits this workflow

You can build this yourself if you want to manage the runtime, Telegram bot setup, server, credentials, updates, and logs.

But many users do not want an infrastructure project.

They want to know whether an AI agent can help with research, sales discovery, marketing, or business workflows.

ClawMama gives you a faster way to test that:

- start from Telegram;
- create a managed OpenClaw or Hermes bot;
- use the free trial to validate the workflow;
- ask the agent to add skills;
- keep the agent available in chat;
- add more workflows later if the first version is useful.

That is the right order.

Do not start by building the perfect agent.

Start by proving that one repeatable workflow is useful.

## Final takeaway

A market research agent does not need to be complex to be valuable.

Give it skills. Give it a clear role. Give it a research method. Give it a specific idea. Ask for a structured sprint. Then feed it real evidence and ask for next actions.

If the output helps you decide what to validate next, the agent is already doing useful work.

From there, you can add richer tools, external data sources, and more automation.

But the first win is simple:

> Open Telegram, ask your agent to add market research skills, and turn a vague market idea into a practical research plan.
