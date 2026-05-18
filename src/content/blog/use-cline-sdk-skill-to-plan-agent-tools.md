---
title: "Use the Cline SDK Skill to Plan Agent Tools"
description: "A first-run guide to Cline's SDK Agent Skill: install it, inspect the tool-building rules, and create a safe plan before writing production agent code."
pubDate: 2026-05-18
author: "ClawMama Team"
tags: ["agent-skills", "cline", "sdk", "ai-agents", "openclaw"]
draft: false
---

Reader persona: a developer-operator, technical founder, or automation lead who wants to build an AI agent with custom tools but needs a safer planning step before production code.

Job to be done: install Cline's SDK skill, inspect its critical rules, and use it to produce a human-reviewable tool plan with permissions, completion rules, and failure handling.

Building an agent is easy to start and easy to make dangerous.

The risky part is usually not the model.

It is the tools:

- shell access
- file edits
- API writes
- scheduled jobs
- browser actions
- deployment commands
- messages sent to customers

A high-signal X post from Cline pointed to a new SDK workflow and the install command:

```bash
npx skills add cline/sdk-skill
```

Local validation confirmed that the command installs one skill:

```text
cline-sdk
```

The installed skill describes Cline SDK usage for the Agent runtime, ClineCore sessions, custom tools, plugins, events, LLM providers, scheduling, multi-agent teams, and production deployment.

This guide focuses on the operator-safe first step: plan the tools before writing the agent.

## First-run install

Create a clean test folder:

```bash
mkdir cline-sdk-skill-test
cd cline-sdk-skill-test
```

Install the skill:

```bash
npx -y skills add cline/sdk-skill --yes
```

Expected result:

```text
Found 1 skill
Skill: cline-sdk
Installing to: Claude Code, OpenClaw, Codex
./.agents/skills/cline-sdk
```

Review the installed file:

```bash
sed -n '1,180p' .agents/skills/cline-sdk/SKILL.md
```

The important rules from local validation were:

- install with `npm install @cline/sdk`
- Node.js 22 or later is required
- define tools with `createTool()`
- tool names must use `snake_case`
- return structured errors from tool `execute` functions
- use `lifecycle: { completesRun: true }` for tools that end the loop
- call `dispose()` when done with `ClineCore`
- do not invent event names; use the documented Agent or ClineCore event systems

Those rules are useful because they prevent a common failure mode: the agent looks like it works in a demo but cannot be debugged, stopped, or safely deployed.

## Start with a tool plan, not code

Before asking an agent to write SDK code, create a file called `agent-tool-plan.md`:

```md
# Agent tool plan

Agent goal:
Create a weekly customer feedback brief from approved input files.

Allowed inputs:
- ./feedback/*.md
- ./support-notes/*.md
- ./sales-notes/*.md

Allowed outputs:
- ./weekly-brief.md
- ./risk-notes.md

Allowed actions:
- read local approved files
- summarize themes
- identify unresolved customer questions
- write draft markdown files

Not allowed:
- send emails
- post to Slack
- edit CRM records
- delete files
- call production APIs
- deploy code

Human approval required before:
- sharing the brief externally
- changing source data
- creating a recurring schedule
```

This is not busywork.

It gives the agent a boundary before tool creation begins.

## Prompt the agent to design the tools

Use this prompt:

```text
Use the installed cline-sdk skill to create a tool design from agent-tool-plan.md.

Rules:
- Do not write production code yet.
- Do not run npm install yet.
- Do not create scheduled jobs.
- Do not add tools that perform external writes.
- Follow the Cline SDK skill rules for tool names, structured errors, and completion tools.

Return:
1. Recommended API surface: Agent or ClineCore, with reason
2. Tool list with snake_case names
3. Input schema for each tool
4. Permission level for each tool
5. Failure cases and structured error shape
6. Which tool, if any, should use lifecycle.completesRun
7. Events to observe for logging
8. Human approval gates
9. Files that would be created in the implementation step
```

This prompt forces the agent to decide before it codes.

That is where many bad automations can be stopped cheaply.

## Example tool list

A reasonable output might include:

| Tool | Purpose | Permission |
| --- | --- | --- |
| `read_feedback_files` | Read approved local markdown files | local read only |
| `extract_feedback_themes` | Group recurring customer themes | in-memory analysis |
| `draft_weekly_brief` | Write `weekly-brief.md` | local write |
| `draft_risk_notes` | Write `risk-notes.md` | local write |
| `submit_brief_for_review` | End the run and return review package | completion tool |

The final tool is the important one.

For an agent loop, you need a clear ending.

The Cline SDK skill calls out `lifecycle: { completesRun: true }` for tools that should end the run. That is a small implementation detail, but it matters for real work. Without a completion path, agents can keep trying, re-reading, or rewriting when they should stop and ask for review.

## Add structured errors

Ask the agent to define errors as data, not surprises.

Example:

```json
{
  "ok": false,
  "error_code": "NO_APPROVED_INPUT_FILES",
  "message": "No markdown files were found in approved input folders.",
  "recoverable": true,
  "next_step": "Add files to ./feedback or ./support-notes and rerun."
}
```

This is better than throwing a generic exception because the agent can explain what happened and stop cleanly.

For operator workflows, structured errors are also easier to audit later.

## Permission checklist

Before code generation, check each proposed tool against this list:

```text
Does this tool read private data?
Does this tool write to disk?
Does this tool call an external API?
Does this tool send a message?
Does this tool change production state?
Does this tool need human approval?
Can this tool end the agent loop?
What happens if it fails halfway?
```

If the answer is fuzzy, the tool is not ready.

## What to avoid in the first version

Do not start with:

- CRM writes
- email sending
- Slack posting
- database mutations
- deployment actions
- autonomous scheduling
- broad filesystem access
- production API keys

Start with a local read-and-draft agent.

Once that works, add one permission at a time.

## When to choose Agent vs ClineCore

The installed skill's decision tree is useful:

- choose `Agent` for simple, stateless agents with custom tools
- choose `ClineCore` for session persistence, built-in tools, scheduling, or multi-client runtime needs

For a first customer feedback brief, `Agent` is probably enough.

For recurring operations with persistent sessions and scheduled jobs, `ClineCore` may be the better fit — but do not add scheduling until the manual run is safe.

## Where ClawMama fits

ClawMama is useful when this planning pattern becomes an operating habit.

A ready-to-use OpenClaw/Hermes agent can:

- install and inspect the SDK skill
- draft the tool plan
- flag unsafe permissions
- keep API keys out of prompts
- require approval before external writes
- preserve the run history
- help non-specialists review what the agent is allowed to do

New users can start with $2 credits and the latest ChatGPT model, which is enough to test a tool-planning loop before building a production agent.

## The practical takeaway

The safe order is:

```text
skill install -> rules inspection -> tool plan -> human review -> code -> local test -> approval -> production
```

Do not skip the tool plan.

That is where you turn an exciting agent idea into something a team can trust.
