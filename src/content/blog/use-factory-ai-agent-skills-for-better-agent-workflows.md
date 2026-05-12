---
title: "Use Factory AI Agent Skills to Improve Agent Workflows"
description: "A first-run guide to Factory's open-source agent skills marketplace, with install commands, what the skills do, and where to keep human approval in the loop."
pubDate: 2026-05-12
author: "ClawMama Team"
tags: ["agent-skills", "factory-ai", "ai-agents", "workflow", "openclaw"]
draft: false
---

Reader persona: a founder, operator, product lead, engineering manager, or solo builder who already uses an AI coding or operating agent and wants more repeatable workflows than one-off prompts.

Job to be done: inspect Factory's open-source skill collection, install one small skill safely, understand what it changes, and decide which workflows deserve human approval before the agent acts.

Agent skills are useful when they turn a vague request into a repeatable operating procedure.

That is the practical value of the Factory plugin repository.

It is not just a bag of prompts. It is a collection of skill files for recurring agent jobs: code review, PR follow-up, browser automation, security review, human writing, TypeScript cleanup, and more.

If you run a small team, this matters because most agent failures are not model failures.

They are workflow failures.

The agent was never told how to review a PR. Or how to preserve evidence. Or when to ask before touching production. A skill gives the agent a house style.

## Why this topic

During the May 12 heartbeat scan, BrowserMan's X top-mode search surfaced a recent Factory-related result pointing to `factory-ai/factory-plugins` on skills.sh.

I validated the repository locally before writing this guide.

The useful part is that you can discover and install individual skills with `npx skills`, then review the actual `SKILL.md` before relying on it.

## What Factory plugins include

A local first-run check found 31 skills in the repository, including:

- `review` for high-confidence code review findings;
- `simplify` for reuse, quality, and efficiency cleanup;
- `create-pr` and `follow-up-on-pr` for PR lifecycle work;
- `security-review`, `threat-model-generation`, and related security skills;
- `human-writing` for editing text that sounds too synthetic;
- `frontend-design`, `visual-design`, and `browser-navigation`;
- `no-use-effect`, `ban-type-assertions`, and `fix-knip-unused-exports` for TypeScript and React hygiene.

For a non-technical operator, the interesting skills are not only the coding ones.

`human-writing`, `browser-navigation`, `visual-design`, and `review` are good examples of skills that define repeatable behavior around common work.

## First run: list available skills

Create a temporary workspace first:

```bash
mkdir -p /tmp/factory-skills-test
cd /tmp/factory-skills-test
```

Then ask the skills CLI to inspect the repository:

```bash
npx -y skills add factory-ai/factory-plugins --list
```

Expected result:

```text
Source: https://github.com/factory-ai/factory-plugins.git
Repository cloned
Found 31 skills
Available Skills
  autoresearch
  create-pr
  follow-up-on-pr
  init
  review
  session-navigation
  simplify
  http-toolkit-intercept
  browser-navigation
  frontend-design
  human-writing
  skill-creation
  visual-design
  wiki
  commit-security-scan
  security-review
  threat-model-generation
  vulnerability-validation
  ban-type-assertions
  fix-knip-unused-exports
  no-use-effect
```

The exact list may change as the repository evolves, but the shape is clear: this is a practical skill library, not a single-purpose demo.

## Install one low-risk skill first

Start with a skill that affects text, not production infrastructure.

For example:

```bash
npx -y skills add factory-ai/factory-plugins --skill human-writing --yes
```

In my validation run, the installer completed and reported:

```text
Installed 1 skill
./.agents/skills/human-writing
Review skills before use; they run with full agent permissions.
```

That last sentence is the important one.

Skills are instructions for an agent. Some skills may also reference tools, scripts, or workflows. Treat them like operational playbooks, not decorative templates.

## Review the skill before using it

After installation, open the skill file:

```bash
sed -n '1,120p' .agents/skills/human-writing/SKILL.md
```

For `human-writing`, the skill explains that it should remove common signs of AI-generated writing: promotional language, vague attributions, repeated sentence structure, inflated importance, and other patterns.

That is a good skill because the behavior is inspectable.

You can read the criteria before asking an agent to apply it.

## A practical operator workflow

Here is a simple workflow for a small company using agent skills without turning the agent loose on everything:

```text
1. Pick one recurring job.
2. Install one relevant skill into a test workspace.
3. Read SKILL.md.
4. Give the agent a small sample task.
5. Compare output against the original.
6. Decide which steps need approval.
7. Only then add it to the real workspace.
```

Example request:

```text
Use the human-writing skill to edit this customer email.
Keep the meaning intact.
Do not add claims.
Return a short change note explaining what you changed.
```

That gives the agent a narrow job and makes the review easy.

## Where to require human approval

Use human approval for anything that is external, expensive, or hard to undo.

That includes:

- publishing blog posts;
- sending customer emails;
- posting on X, LinkedIn, Dev.to, or communities;
- changing production configuration;
- modifying billing, credits, refunds, or account status;
- merging pull requests;
- deleting files or database records;
- running browser actions in a logged-in account.

For lower-risk jobs, the agent can move faster:

- drafting a support reply;
- summarizing meeting notes;
- preparing a PR review checklist;
- rewriting a paragraph;
- creating a local test plan;
- assembling a first draft of a weekly update.

The point is not to slow the agent down.

The point is to put the brakes where the cost of being wrong is real.

## What to ask the agent after installing a skill

Try prompts like these:

```text
Inspect the installed skills and tell me which one fits this job:
turn a rough internal update into a concise customer-facing changelog.
Do not edit files yet.
```

```text
Use the review skill to inspect this diff.
Only report high-confidence bugs.
Do not rewrite the code unless I approve.
```

```text
Use the human-writing skill on this launch note.
Remove synthetic phrasing, keep the same facts, and flag any unsupported claim.
```

These prompts are boring on purpose.

Boring prompts are easier to audit.

## How this fits ClawMama

If you want this kind of workflow but do not want to maintain a server, SSH keys, browser sessions, and model routing yourself, ClawMama is the ready-to-use path.

You can run an OpenClaw/Hermes-style agent from Telegram, keep human approval for visible actions, and start with the latest ChatGPT model plus $2 new-user credits.

A good first ClawMama workflow would be:

```text
Daily: collect notes, support questions, and marketing ideas.
Agent: draft replies, article outlines, and review checklists.
Human: approve anything that gets published, sent, or merged.
```

That is where skills become more than prompt tricks.

They become operating procedures.

## Bottom line

Factory's agent skills are worth trying because they show a useful direction for agent work: explicit workflows, readable instructions, and narrow jobs.

Start with one skill.

Read it.

Test it locally.

Then decide where it belongs in your real operating system.
