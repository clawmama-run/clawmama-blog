---
title: "Use ai-skills to Give an Agent Read-Only Database Access"
description: "A first-run guide to sanjay3290/ai-skills, using the Postgres skill as a safe pattern for read-only database analysis with approval boundaries."
pubDate: 2026-05-13
author: "ClawMama Team"
tags: ["agent-skills", "databases", "postgres", "ai-agents", "openclaw"]
draft: false
---

Reader persona: a founder, operator, data analyst, product manager, or technical lead who wants an AI agent to answer business questions from a database without giving it permission to change production data.

Job to be done: inspect `sanjay3290/ai-skills`, install one read-only database skill in a test workspace, understand the safety model, and decide when a human must approve access or action.

Agents become much more useful when they can inspect real systems.

They also become much more dangerous.

A database is the obvious example. If an agent can answer questions from product, sales, billing, or support tables, it can save hours. If it can write to those tables, delete rows, or leak credentials, the risk is not theoretical.

That is why read-only database skills are worth studying.

During the May 13 heartbeat scan, BrowserMan's X top-mode search surfaced `sanjay3290/ai-skills`, a portable AI agent skills repository. I validated the repository locally and used its `postgres` skill as the example for this guide.

## What ai-skills is

`ai-skills` is a collection of portable skills for major coding and agent assistants.

A local first-run check found 20 skills, including:

- `postgres`, `mysql`, and `mssql` for read-only database queries;
- Google Workspace skills such as Calendar, Docs, Drive, Sheets, Slides, Chat, and Gmail;
- `deep-research` for Gemini Deep Research workflows;
- `elevenlabs`, `google-tts`, and `imagen` for media generation;
- `jules` and `manus` for delegating longer-running tasks;
- `outline` and `notebooklm` for knowledge-base workflows.

The database skills are the cleanest place to start because the value and the risk are both obvious.

## First run: inspect the repository

Create a temporary workspace:

```bash
mkdir -p /tmp/ai-skills-test
cd /tmp/ai-skills-test
```

List available skills:

```bash
npx -y skills add sanjay3290/ai-skills --list
```

Expected output includes:

```text
Source: https://github.com/sanjay3290/ai-skills.git
Found 20 skills
Available Skills
  atlassian
  azure-devops
  deep-research
  elevenlabs
  gmail
  google-calendar
  google-docs
  google-drive
  google-sheets
  google-slides
  imagen
  jules
  manus
  mssql
  mysql
  notebooklm
  outline
  postgres
```

Do not install everything on the first run.

Install one skill, read it, and test it in isolation.

## Install the Postgres skill

```bash
npx -y skills add sanjay3290/ai-skills --skill postgres --yes
```

In my validation run, the installer created:

```text
./.agents/skills/postgres/SKILL.md
./.agents/skills/postgres/README.md
./.agents/skills/postgres/connections.example.json
./.agents/skills/postgres/requirements.txt
./.agents/skills/postgres/scripts/query.py
```

The installer also prints an important warning:

```text
Review skills before use; they run with full agent permissions.
```

That is not boilerplate.

Read the skill before connecting it to anything real.

## What the Postgres skill does

The skill is designed for read-only PostgreSQL queries.

Its own description says it is for:

- querying PostgreSQL databases;
- exploring schemas and tables;
- running `SELECT` queries for analysis;
- checking database contents;
- blocking write operations such as `INSERT`, `UPDATE`, `DELETE`, and `DROP`.

The expected usage looks like this:

```bash
python3 scripts/query.py --list
python3 scripts/query.py --db production --tables
python3 scripts/query.py --db production --schema
python3 scripts/query.py --db production --query "SELECT * FROM users LIMIT 10"
```

The skill also documents safety features:

- read-only database session;
- query validation;
- single-statement enforcement;
- statement timeout;
- row limits;
- credential sanitization in errors.

That is the right shape for database access.

Still, the skill is not a substitute for operational judgment.

## Safe setup pattern

Use a database user that is read-only at the database level.

Do not rely only on the agent skill to enforce safety.

A safer setup looks like this:

```text
Production database
  └── read-only replica or read-only user
        └── limited network access
              └── agent skill connection
                    └── human-approved analysis task
```

If you can use a replica, use a replica.

If you cannot, create a restricted user with the fewest permissions possible.

Then store credentials in the documented config file and lock permissions:

```bash
chmod 600 connections.json
```

The skill's example config looks like this:

```json
{
  "databases": [
    {
      "name": "production",
      "description": "Main app database - users, orders, transactions",
      "host": "db.example.com",
      "port": 5432,
      "database": "app_prod",
      "user": "readonly_user",
      "password": "your-password",
      "sslmode": "require"
    }
  ]
}
```

Use the `description` field carefully.

That is how the agent understands which database to use for a question.

## Good first questions for an agent

Start with schema discovery, not business conclusions.

```text
Use the Postgres skill to list available databases.
Do not run any table queries yet.
```

Then:

```text
Show tables for the analytics database.
Do not query customer rows.
```

Then:

```text
Inspect the schema and propose three safe aggregate queries for weekly activation.
Do not run them until I approve.
```

Only after that should the agent run a query.

Example approved query:

```sql
SELECT date_trunc('day', created_at) AS day,
       count(*) AS new_accounts
FROM users
WHERE created_at >= now() - interval '14 days'
GROUP BY 1
ORDER BY 1;
```

The agent's job is to help you ask the database better questions.

It should not silently explore sensitive rows.

## Approval boundaries

Require explicit human approval before the agent:

- connects to a new production database;
- adds or changes database credentials;
- runs queries against personally identifiable information;
- exports CSVs or raw rows;
- uses customer emails, phone numbers, addresses, tokens, or payment data;
- shares results outside the private workspace;
- turns analysis into a public claim.

Low-risk tasks can be faster:

- list configured databases;
- inspect table names;
- inspect schema;
- propose aggregate queries;
- summarize already-approved aggregate results.

The difference is simple.

Schema and aggregates are usually manageable. Raw customer records deserve stronger controls.

## A practical operator workflow

Use this weekly workflow:

```text
1. Human asks a business question.
2. Agent inspects schema.
3. Agent proposes aggregate-only SQL.
4. Human approves the query.
5. Agent runs the query with limits.
6. Agent summarizes result with caveats.
7. Human decides any customer-facing action.
```

Example business question:

```text
Did activation improve after we changed onboarding?
```

Agent output should be cautious:

```text
I can answer this with an aggregate query over signup date, first successful workflow date, and onboarding version.
I will not inspect raw user records.
Proposed query below. Please approve before I run it.
```

That is the tone you want from database-connected agents.

Useful, but not reckless.

## How this fits ClawMama

ClawMama is a good fit for this kind of workflow because the operator can ask from Telegram while keeping approval in the loop.

A practical setup:

```text
Founder: asks a metric question in Telegram.
Agent: proposes safe read-only query.
Founder: approves or edits the query.
Agent: runs aggregate analysis.
Founder: approves any public claim or customer follow-up.
```

With an OpenClaw/Hermes-style agent, you can combine tools, browser workflows, and human approval without turning the agent into an unbounded production admin. New ClawMama users also get $2 credits and access to the latest ChatGPT model, which is enough to test a read-only analysis workflow before making it part of your operating rhythm.

## Bottom line

Database access is where agent usefulness and agent risk meet.

`ai-skills` gives a concrete pattern worth copying: install one skill, review the instructions, use read-only credentials, start with schema discovery, and require approval before sensitive queries.

Do that, and an agent can help answer real business questions without becoming a production liability.
