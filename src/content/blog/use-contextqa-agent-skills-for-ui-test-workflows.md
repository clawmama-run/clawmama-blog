---
title: "Use ContextQA Agent Skills for UI Test Workflows"
description: "A first-run guide for indivatools/contextqa-skills: list the skills, understand the MCP requirement, and plan a safe ContextQA workflow before running UI tests."
pubDate: 2026-05-09
author: "ClawMama Team"
tags: ["agent-skills", "testing", "mcp", "developer-tools", "openclaw"]
draft: false
---

Reader persona: a developer, QA lead, founder, or automation operator who wants an AI agent to help with UI test authoring, regression runs, impact analysis, and bug triage without turning the agent loose blindly.

Job to be done: inspect `indivatools/contextqa-skills`, verify what skills it provides, understand the required ContextQA MCP setup, and decide where a human confirmation gate belongs before tests are created or executed.

Agent Skills are most useful when they do more than add writing style.

The stronger pattern is:

```text
agent instruction + external tool + confirmation gate + repeatable workflow
```

That is why `indivatools/contextqa-skills` is worth a first look.

Repository:

```text
https://github.com/indivatools/contextqa-skills
```

Install command:

```bash
npx skills add indivatools/contextqa-skills
```

The package provides six skills for driving ContextQA through MCP:

- `cqa-init`
- `cqa-impact`
- `cqa-author`
- `cqa-debug`
- `cqa-regression`
- `cqa-bug-hunter`

This is not a generic prompt pack.

It is a workflow layer around a real testing system.

## What I validated

I used a temporary home directory so the test would not write into my normal agent setup:

```bash
mkdir -p /tmp/contextqa-skills-validate/home /tmp/contextqa-skills-validate/work
cd /tmp/contextqa-skills-validate/work
export HOME=/tmp/contextqa-skills-validate/home
```

Then I checked the skills CLI:

```bash
npx -y skills --help
```

The CLI exposed the expected commands:

```text
skills add <package>
skills remove [skills]
skills list
skills find [query]
skills update [skills...]
```

Then I listed the ContextQA skills without installing them:

```bash
npx -y skills add indivatools/contextqa-skills --list
```

Expected result:

```text
Found 6 skills

cqa-author
cqa-bug-hunter
cqa-debug
cqa-impact
cqa-init
cqa-regression
```

That is the safest first command.

It confirms the package shape before you let it modify any agent skill directory.

## What the skills do

The six skills map to a useful testing lifecycle:

```text
cqa-init → cqa-impact → cqa-author → cqa-regression → cqa-debug → cqa-bug-hunter
```

Use them like this:

| Skill | Use when |
|---|---|
| `cqa-init` | You need to verify that ContextQA MCP is configured and authenticated. |
| `cqa-impact` | A ticket, PR, or branch may affect existing tests. |
| `cqa-author` | You want to create tests from a ticket, spec, Figma file, video, spreadsheet, code diff, or requirements doc. |
| `cqa-regression` | You want to run a test plan and triage failures. |
| `cqa-debug` | A test result failed and needs diagnosis. |
| `cqa-bug-hunter` | You want broad adversarial coverage against a deployed UI. |

The important point is that these skills call ContextQA tools.

They do not replace ContextQA.

They help an agent operate it more consistently.

## Prerequisites

Before installation, confirm three things:

```text
[ ] You have a ContextQA account.
[ ] Your agent can use MCP tools.
[ ] The ContextQA MCP server is configured for that agent.
```

The README points to the hosted MCP server:

```text
https://mcp.contextqa.com/mcp
```

The first tool call may require browser OAuth.

That means this is not a good candidate for fully unattended setup.

A human should be present for the first connection.

## First-run install commands

List before installing:

```bash
npx -y skills add indivatools/contextqa-skills --list
```

Install all six skills into the default detected skill location:

```bash
npx skills add indivatools/contextqa-skills
```

Install just the setup skill first:

```bash
npx skills add indivatools/contextqa-skills --skill cqa-init
```

Install a specific workflow skill:

```bash
npx skills add indivatools/contextqa-skills --skill cqa-impact
npx skills add indivatools/contextqa-skills --skill cqa-regression
```

Install for a specific agent:

```bash
npx skills add indivatools/contextqa-skills -a claude-code
npx skills add indivatools/contextqa-skills -a codex
npx skills add indivatools/contextqa-skills -a cursor
```

If you are testing in a shared repo, avoid global install until you understand what changed.

## Minimal usage examples

After install and MCP setup, start with:

```text
/cqa-init
```

Expected behavior:

```text
The agent checks whether ContextQA MCP is connected, authenticated, and ready.
It reports ready/not-ready and gives the next step if something is missing.
```

For a PR impact check:

```text
/cqa-impact PR #142
```

Expected behavior:

```text
The agent identifies likely affected tests and coverage gaps, then proposes what should be updated or created.
```

For regression:

```text
/cqa-regression run the smoke plan
```

Expected behavior:

```text
The agent starts or plans a ContextQA regression run, waits for results when allowed, clusters failures, and prepares triage.
```

For exploratory bug finding:

```text
/cqa-bug-hunter https://staging.example.com
```

Expected behavior:

```text
The agent performs reconnaissance, proposes adversarial cases, executes or prepares them through ContextQA, and summarizes confirmed issues.
```

Use a staging URL, not production, for first tests.

## Where the confirmation gate belongs

The strongest design detail in the README is this principle:

```text
Investigate → plan → confirm gate → execute
```

Keep that.

A good agent-assisted testing workflow should pause before:

- creating many new test cases;
- running a large regression suite;
- using credentials;
- testing production;
- filing bug reports externally;
- changing application code based on a test failure.

A useful prompt:

```text
Use cqa-impact on this PR, but stop after the plan.
Do not create or update ContextQA test cases until I approve the proposed changes.
```

Another useful prompt:

```text
Use cqa-bug-hunter on this staging URL.
First produce the surfaces and adversarial test ideas.
Wait for confirmation before executing tests.
```

The agent should increase coverage, not surprise the team.

## Risk notes

This workflow can touch real systems.

Before using it, check:

```text
[ ] Are you pointing at staging or production?
[ ] Are test credentials safe to use?
[ ] Could generated tests create records, payments, messages, or emails?
[ ] Does the agent have permission to run the suite now?
[ ] Are failures going to a private report or a public issue tracker?
[ ] Is a human reviewing confirmed bugs before external posting?
```

For UI test generation, the riskiest mistake is not a bad assertion.

It is letting the agent run broad tests against the wrong environment.

## Where ClawMama fits

ClawMama is useful when you want this kind of workflow inside a ready-to-use OpenClaw or Hermes agent without maintaining your own server.

A practical path:

```text
Telegram request → hosted OpenClaw/Hermes agent → ContextQA skill → MCP-backed testing workflow → human approval → execution/report
```

New ClawMama users get $2 credits and can use the latest ChatGPT model through the managed agent runtime.

That is enough to prototype the operating loop:

1. create a hosted agent;
2. add reviewed skills;
3. connect the required MCP tools;
4. test on a staging app;
5. keep human approval before side effects.

Do not treat this as fully autonomous QA on day one.

Treat it as a structured assistant for test planning, test authoring, regression triage, and bug investigation.

## Final checklist

Before you run the first real ContextQA workflow:

```text
[ ] Did you run `--list` before installing?
[ ] Did you install only the skills you need?
[ ] Did `/cqa-init` report ready?
[ ] Are you using staging for first tests?
[ ] Did the agent stop at the plan before execution?
[ ] Did a human approve any test creation or regression run?
[ ] Are reports private by default?
```

The best use of Agent Skills is not to make the agent sound smarter.

It is to make the agent follow a safer workflow.

`contextqa-skills` is a good example because it joins instructions, MCP tools, and confirmation gates into one repeatable testing loop.
