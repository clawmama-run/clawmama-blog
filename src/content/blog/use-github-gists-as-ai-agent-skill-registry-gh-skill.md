---
title: "Use GitHub Gists as an AI Agent Skill Registry with gh skill"
description: "A step-by-step guide to using the gh skill GitHub CLI extension to publish, search, and install AI agent skills across tools like OpenClaw, Hermes, Claude Code, Codex, Cursor, and OpenCode."
pubDate: 2026-05-02
author: "ClawMama Team"
tags: ["github", "ai-agents", "openclaw", "hermes", "ai-skills"]
draft: false
---

AI agent skills are becoming a useful packaging format.

A good skill is not just a prompt. It is a small folder that usually contains:

- a `SKILL.md` instruction file;
- scripts;
- examples;
- docs;
- repeatable commands;
- tool-specific setup notes.

That makes skills useful for real agent workflows. But it also creates a distribution problem.

Where should a skill live?

How should a user install it?

How does the same skill reach OpenClaw, Hermes, Claude Code, Codex, Cursor, OpenCode, or other agent runtimes?

One interesting answer is `gh skill`, a GitHub CLI extension by Nicholas Spencer.

Repo:

```text
https://github.com/nicholasspencer/gh-skill
```

The idea is simple:

> Use GitHub Gists as a lightweight registry for AI agent skills.

A Gist already supports multiple files, version history, forks, stars, and GitHub API access. `gh skill` adds a convention on top so a Gist can behave like a skill package.

This guide shows how to understand it, install it, and use it safely with an OpenClaw or Hermes agent.

## Who this is for

This is for:

- skill authors who want a simple way to publish skills;
- agent builders who want to share skills across tools;
- OpenClaw or Hermes users who want reusable agent workflows;
- teams that want skills to be installable, inspectable, and versioned;
- operators who want their AI agent to reuse practical workflows instead of rewriting prompts every time.

The job to be done is clear:

```text
publish or install an AI agent skill in a way that is easy for both humans and agents to inspect
```

## What `gh skill` does

According to the project README, `gh skill` is a GitHub CLI extension for managing AI agent skills as GitHub Gists.

The main commands are:

```bash
gh skill add https://gist.github.com/user/abc123
gh skill publish ./my-skill
gh skill search "git automation"
```

It is designed around a simple convention:

1. a skill is a Gist with a `SKILL.md` file;
2. subdirectories are flattened when stored in Gist files;
3. install expands files back into a folder;
4. the extension links skills into detected agent tool directories;
5. unknown authors go through a trust gate before install.

That last point matters.

Skills may contain instructions and scripts. They should be reviewed before an agent uses them.

## Step 1: Install GitHub CLI

`gh skill` is a GitHub CLI extension, so you need `gh` first.

Check whether it is installed:

```bash
gh --version
```

If it is not installed, follow GitHub's official install guide:

```text
https://cli.github.com/
```

You will also need GitHub authentication for commands that access your account, create Gists, or publish skills:

```bash
gh auth login
```

For read-only exploration, you may be able to inspect the repo without publishing anything. For real publishing, assume authentication is required.

## Step 2: Install the extension

Install `gh skill`:

```bash
gh extension install nicholasspencer/gh-skill
```

Then check help:

```bash
gh skill --help
```

If the command is available, you should see help for publishing, installing, or searching skills.

If installation fails, check:

- whether `gh` is authenticated;
- whether your GitHub CLI can install extensions;
- whether your network can reach GitHub;
- whether the extension repo is accessible.

## Step 3: Understand the skill folder format

A minimal skill folder might look like this:

```text
my-skill/
  SKILL.md
  scripts/
    run.sh
  examples/
    input.md
```

The important file is `SKILL.md`.

A simple `SKILL.md` might look like:

```markdown
---
name: weekly-competitor-check
description: Check a fixed list of competitor pages and produce a cited weekly report.
---

# Weekly Competitor Check

Use this skill when the user wants a repeatable competitor monitoring workflow.

## Workflow

1. Read `competitors.md`.
2. Visit each public URL.
3. Compare with the previous report.
4. Summarize meaningful changes.
5. Cite every source.
6. Do not contact anyone or create accounts without approval.

## Output

Write a dated report with:
- executive summary;
- source list;
- changes;
- confidence labels;
- recommended follow-up.
```

That is enough to express a reusable agent workflow.

It is much better than leaving the workflow as a one-off prompt in chat history.

## Step 4: Publish a skill

From the folder that contains your skill:

```bash
gh skill publish ./my-skill
```

Expected behavior:

- the extension packages the skill folder;
- creates or updates a GitHub Gist;
- stores `SKILL.md` and related files;
- returns a Gist URL you can share.

The exact output depends on the extension version and your GitHub authentication state.

A good result should give you a URL like:

```text
https://gist.github.com/your-user/abc123
```

That URL becomes the install target.

## Step 5: Install a skill from a Gist

To install a skill:

```bash
gh skill add https://gist.github.com/user/abc123
```

Before using it, inspect what was installed.

Ask your agent:

```text
Please inspect the installed skill before using it.

Summarize:
1. what the skill does;
2. what files were installed;
3. whether it includes scripts;
4. what permissions or external services it may use;
5. whether it is safe to run as-is.

Do not execute scripts until I approve.
```

This is the right default posture.

Skills are powerful because they can include operational instructions. That also means they deserve review.

## Step 6: Use it with OpenClaw or Hermes

Once installed, the skill should be available to your agent runtime or linked into a detected skill directory.

For OpenClaw or Hermes, the practical workflow is:

```text
install skill → inspect SKILL.md → run a small first task → save output → refine workflow
```

Example user message:

```text
Use the weekly competitor check skill.

First, inspect the skill instructions.
Then create a `competitors.md` template for me.
Do not browse anything yet.
Do not contact anyone.
After I approve the competitor list, run the first report.
```

This keeps the agent staged and controllable.

## Step 7: Use ClawMama if you want a ready-to-use agent

If you already run OpenClaw or Hermes, use your existing environment.

If you want to try the workflow without maintaining an agent runtime first, create a ClawMama agent:

```text
https://t.me/clawmamarun_bot
```

ClawMama gives you a managed OpenClaw or Hermes agent. New users get $2 of AI credits and access to the latest ChatGPT model, so you can test a skill workflow before setting up infrastructure.

A good first message is:

```text
I want to try a GitHub Gist-based AI skill workflow with `gh skill`.

Please:
1. check whether GitHub CLI is available;
2. explain what `gh skill` does;
3. install the extension only after asking me;
4. inspect any installed skill before running it;
5. do not execute scripts, publish Gists, or change external accounts without approval.
```

That gives the agent a clear permission boundary.

## What to use this for

Good skill candidates are repeatable workflows, not vague prompts.

Examples:

- weekly competitor watch;
- sales call follow-up formatting;
- customer feedback tagging;
- release note drafting;
- GitHub issue triage;
- local Stripe emulator testing;
- browser QA checklist;
- support inbox routing;
- docs consistency checks.

The best skills have:

- a narrow job;
- clear inputs;
- clear outputs;
- safety rules;
- installable examples;
- minimal first-run path.

## Safety notes

Treat skills like small software packages.

Before running a skill:

- read `SKILL.md`;
- inspect scripts;
- check who authored it;
- check whether it touches external APIs;
- check whether it needs credentials;
- prefer read-only or limited-scope tokens;
- require approval before sends, purchases, deletes, deployments, or account changes;
- keep logs of what the agent did.

This is especially important when a skill can operate GitHub, Stripe, Cloudflare, email, CRM, or browser sessions.

A useful rule:

```text
The agent may inspect and draft by default.
The agent needs approval before external side effects.
```

## Why this matters

The interesting part of `gh skill` is not only the CLI command.

It is the distribution model.

If skills are just local folders, they are hard to share.

If skills are packaged as Gists, they become:

- linkable;
- inspectable;
- forkable;
- versioned;
- scriptable;
- easy for agents to install.

That helps skill authors reach users across multiple agent tools.

It also helps agent users build a library of repeatable workflows instead of relying on chat history.

## Final takeaway

`gh skill` points to a useful direction for agent tooling:

```text
skills should be small, inspectable, versioned, and easy for agents to install
```

For OpenClaw and Hermes users, that means workflows can become reusable capabilities.

For ClawMama users, it means a ready-to-use agent can test a skill quickly, with human approval around anything risky.

Start small:

```bash
gh extension install nicholasspencer/gh-skill
gh skill --help
gh skill search "git automation"
```

Then inspect before you run.
