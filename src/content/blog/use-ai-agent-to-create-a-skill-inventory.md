---
title: "Use an AI Agent to Create a Skill Inventory Before Your Team Installs More Automations"
description: "A practical operator workflow for listing agent skills, owners, sources, permissions, and approval gates before a team's AI automation setup gets messy."
pubDate: 2026-05-19
author: "ClawMama Team"
tags: ["ai-operations", "agent-skills", "automation", "governance", "openclaw"]
draft: false
---

Reader persona: a founder, operations lead, engineering manager, or AI champion whose team is starting to install agent skills, browser automations, MCP servers, or reusable AI workflows.

Job to be done: create a simple skill inventory so the team knows what is installed, where it came from, who owns it, and what permissions it implies.

Agent skills spread quietly.

One teammate adds a browser skill.

Another installs a GitHub workflow skill.

Someone tries a content-publishing skill for a campaign.

A developer adds a database-analysis skill for a one-off investigation.

None of those choices are bad by themselves.

The problem starts when nobody can answer:

```text
What skills are active?
Who approved them?
What can they do?
Where did they come from?
Which ones are safe to use with customer data?
```

Before adding more automation, ask an AI agent to create a skill inventory.

## The skill inventory prompt

Paste this into your agent:

```text
Create a skill inventory for this workspace.

Do not install new skills.
Do not remove skills.
Do not run skill commands that modify agent configuration.
Do not send, publish, or sync anything.

Inspect only the files and command outputs I explicitly provide.

Return a table with:
1. Skill name
2. Source or repository
3. Installed location
4. Primary purpose
5. Read permissions implied
6. Write permissions implied
7. External actions implied
8. Human approval required?
9. Owner
10. Status: keep, review, quarantine, or remove

Also return:
- missing information
- risky patterns
- recommended next actions
```

The important line is “inspect only the files and command outputs I explicitly provide.”

That prevents the agent from turning an inventory task into an install task.

## What to collect first

Give the agent a small evidence pack.

For a local workspace, that might be:

```bash
find . -path '*/.agents/skills/*/SKILL.md' -maxdepth 6 -type f | sort
find . -path '*/.claude/skills/*/SKILL.md' -maxdepth 6 -type f | sort
find . -path '*/.cursor/*' -maxdepth 5 -type f | sort
```

If you use a skill manager, collect read-only metadata first.

Examples:

```bash
npm view skillkit name version description repository.url --json
npm view skills name version description --json
```

If a command might modify files, do not run it during inventory.

Inventory is a map, not a migration.

## A simple inventory table

Ask for output like this:

| Skill | Source | Purpose | External action risk | Approval | Status |
| --- | --- | --- | --- | --- | --- |
| browser-draft | internal | Draft browser-based replies | Medium: browser actions | Required before post/click submit | Keep |
| github-review | known repo | Review PRs and CI | Medium: comments possible | Required before comment/merge | Review |
| db-analysis | internal | Read-only SQL summaries | Low if read-only | Required before production DB access | Keep |
| social-publisher | unknown | Publish social posts | High: public posts | Required always | Quarantine |

The exact names do not matter.

The categories do.

## Classify by action type

Every skill should be classified by what it can cause.

Use these buckets:

### Read-only

The skill only reads approved input and returns analysis.

Examples:

- summarize notes
- inspect docs
- classify support tickets
- analyze exported CSV files

Default status: usually safe, but still check private data.

### Local draft

The skill can write local drafts but does not publish or send.

Examples:

- write a blog draft
- create a meeting brief
- generate a QA checklist
- prepare sales follow-up drafts

Default status: useful, usually safe if output location is controlled.

### External write

The skill can change something outside the local workspace.

Examples:

- comment on GitHub
- update CRM fields
- post to Slack
- create tickets
- publish to a CMS

Default status: approval required.

### Public action

The skill can make something public.

Examples:

- post on X
- publish Dev.to articles
- update a public website
- send customer emails

Default status: approval required every time.

### System change

The skill can affect infrastructure or configuration.

Examples:

- deploy code
- change feature flags
- modify access control
- edit scheduled jobs
- update billing settings

Default status: restricted.

## Add ownership

A skill without an owner becomes operational debt.

Add these fields:

```text
Owner:
Backup owner:
Business purpose:
Last reviewed:
Approved data sources:
Approved output locations:
Approval rule:
Removal plan:
```

This sounds boring, but it prevents the classic problem: six months later, nobody knows whether a workflow is still safe.

## Ask the agent for a risk summary

After the table, ask:

```text
Group the inventory into:
- safe to use today
- safe only in draft mode
- requires approval before every run
- should be quarantined until reviewed
- should be removed

For each risky skill, explain the specific reason in one sentence.
```

A good answer should avoid vague labels like “dangerous.”

It should say things like:

```text
Quarantine social-publisher because it can make public posts and the source repository is unknown.
```

That is actionable.

## Create a quarantine rule

Use this policy:

```text
A skill is quarantined if:
- source is unknown
- owner is missing
- it can send, publish, delete, deploy, or edit production systems
- approval behavior is unclear
- it asks for broad secrets or tokens
- it modifies agent configuration without a clear diff
```

Quarantine does not mean delete immediately.

It means “do not use until reviewed.”

## Make the inventory useful every week

Once the first inventory exists, ask the agent to maintain a weekly change log:

```text
Compare the current skill inventory to last week's inventory.

Return:
1. New skills
2. Removed skills
3. Changed skill files
4. New external action risks
5. Skills that need re-approval
6. Skills with missing owners
7. Recommended cleanup
```

This turns skill governance into a lightweight habit instead of a one-time audit.

## What not to automate yet

Do not let the first version automatically:

- remove skills
- sync skills to every agent
- publish inventory publicly
- grant permissions
- create CI jobs
- update production configs

Start with a report.

Then let a human approve changes.

## Where ClawMama fits

ClawMama is helpful when a non-technical operator needs this inventory without becoming the team's agent-platform engineer.

A ready-to-use OpenClaw/Hermes agent can:

- inspect skill files and command output
- summarize purpose and risk
- keep external actions behind approval
- produce a weekly skill change log
- remind owners to review stale skills
- preserve the audit trail in chat and files

New users can start with $2 credits and the latest ChatGPT model, enough to create the first inventory and review the riskiest skills.

## The practical takeaway

If your team is adding agent skills, create the inventory before the mess begins.

The minimum table is:

```text
Skill -> source -> owner -> purpose -> permissions -> approval rule -> status
```

That single line can prevent a lot of future confusion.
