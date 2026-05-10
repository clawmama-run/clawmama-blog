---
title: "Use the gh-cli Agent Skill to Review GitHub Work From Chat"
description: "A first-run guide to the GitHub gh-cli Agent Skill from github/awesome-copilot, with install commands, safe read-only examples, permissions, and a ClawMama path."
pubDate: 2026-05-10
author: "ClawMama Team"
tags: ["agent-skills", "github", "gh-cli", "ai-agents", "openclaw"]
draft: false
---

Reader persona: a founder, product operator, engineering manager, or technical marketer who lives around GitHub issues and pull requests but does not want to click through the web UI for every status check.

Job to be done: install or evaluate the `gh-cli` Agent Skill, then use an AI agent to produce reviewable GitHub summaries from command-line facts without giving it permission to make risky changes by default.

GitHub work is full of small status questions:

- Which PRs are waiting on review?
- Which checks failed?
- What changed in this pull request?
- Which issues are assigned to me?
- Did the release workflow run?
- What should I look at before standup?

The GitHub CLI already answers many of these.

The `gh-cli` Agent Skill gives an agent a structured reference for using `gh` across repositories, issues, pull requests, Actions, releases, gists, projects, codespaces, and more.

That makes it a good practical skill topic: it has concrete commands, real permissions, and obvious human approval boundaries.

## Why this skill

During the May 10 heartbeat scan, BrowserMan's X connection was not online, so X top-mode discovery could not be completed through the real logged-in browser. As a fallback, we checked `skills.sh` discovery through `npx skills find` and selected a high-signal concrete workflow: `github/awesome-copilot@gh-cli`.

The discovery output showed:

```text
github/awesome-copilot@gh-cli
https://skills.sh/github/awesome-copilot/gh-cli
```

The local validation also confirmed:

```text
gh version 2.89.0 (2026-03-26)
```

And `npx skills add github/awesome-copilot --list` found the `gh-cli` skill inside the `github/awesome-copilot` repository.

## What the skill does

The skill is a comprehensive reference for GitHub CLI operations.

It covers common `gh` areas such as:

```text
gh auth
gh repo
gh issue
gh pr
gh run
gh workflow
gh release
gh gist
gh codespace
gh project
```

That means an agent can look up the right command pattern instead of guessing.

For operators, the best first use is read-only reporting.

Do not start with “let the agent merge PRs.”

Start with:

```text
Ask the agent to inspect GitHub state and prepare a brief.
Human decides what changes.
```

## Install command

To list available skills from the repository:

```bash
npx -y skills add github/awesome-copilot --list
```

To install only the `gh-cli` skill into a compatible project setup:

```bash
npx -y skills add github/awesome-copilot --skill gh-cli
```

If you want to install it globally for supported agents:

```bash
npx -y skills add github/awesome-copilot --skill gh-cli --global
```

If your environment supports selecting target agents, use:

```bash
npx -y skills add github/awesome-copilot --skill gh-cli --agent claude-code
```

Adjust the agent name for your local setup.

## Prerequisite: GitHub CLI auth

The skill references `gh`, so your machine or hosted agent environment needs the GitHub CLI.

Check it:

```bash
gh --version
```

Authenticate:

```bash
gh auth login
```

Check status:

```bash
gh auth status
```

For a low-risk first run, use an account or token with the minimum scope needed for reading the repositories you care about.

## Minimal read-only usage example

From inside a GitHub repository, ask the agent:

```text
Use the gh-cli skill.
Prepare a read-only GitHub work brief for this repo.
Include:
- open pull requests;
- failing or pending checks;
- issues assigned to me;
- releases or workflow runs that need attention.
Do not comment, close, merge, edit, or create anything.
Show the gh commands you used.
```

The agent can then use commands like:

```bash
gh pr list --state open
gh issue list --assignee @me --state open
gh run list --limit 10
gh repo view --json name,owner,defaultBranchRef,url
```

For a specific PR:

```bash
gh pr view 123 --json title,state,author,reviewDecision,statusCheckRollup,url
gh pr diff 123 --stat
gh pr checks 123
```

Expected output from the agent should be a short brief, not a dump of terminal output.

Example:

```markdown
# GitHub Work Brief

## Needs attention
- PR #123 has failing checks in `build` and no approving review.
- Issue #88 is assigned to you and has not been updated in 9 days.

## Safe next actions
- Review the build failure log for PR #123.
- Ask the PR author whether #88 is still planned for this milestone.

## Commands used
- gh pr list --state open
- gh pr checks 123
- gh issue list --assignee @me --state open
```

## Permission and risk notes

`gh` can do both harmless reads and visible writes.

Read-only examples:

```bash
gh pr list
gh pr view
gh issue list
gh issue view
gh run list
gh run view
gh release list
```

Externally visible or risky examples:

```bash
gh pr merge
gh pr review --approve
gh pr comment
gh issue close
gh issue comment
gh release create
gh workflow run
gh repo delete
```

A good operating rule:

```text
The agent may inspect and summarize by default.
The agent must ask before creating comments, reviews, issues, releases, workflow dispatches, merges, deletes, or settings changes.
```

This matches how most teams actually want AI assistance: fast preparation, human-controlled action.

## A practical weekly workflow

Create a recurring prompt:

```text
Use the gh-cli skill to prepare my Monday GitHub brief.
Scope: this repo only.
Read-only commands only.
Find:
1. PRs waiting on me;
2. PRs with failed checks;
3. stale issues assigned to me;
4. recent workflow failures;
5. one recommended focus for today.
```

If you manage multiple repos, give the agent an explicit list:

```markdown
# Repos to review
- owner/app
- owner/docs
- owner/website
```

Then ask it to produce one page:

```text
Review these repositories with gh.
Return a cross-repo brief grouped by urgency.
Do not perform write actions.
```

## Where ClawMama fits

This is a natural ClawMama workflow for technical operators.

You can run a hosted OpenClaw agent on Telegram, connect it to a workspace with the `gh-cli` skill, and ask for GitHub briefs from chat.

The soft path looks like this:

```text
Telegram message → hosted OpenClaw/Hermes agent → gh read-only commands → concise brief → human approval for any write action
```

ClawMama gives new users $2 in starting credits and access to current ChatGPT-class models through the hosted runtime path, so you can test this as a lightweight GitHub operations assistant before trusting it with higher-impact work.

Start with read-only summaries. Add write approvals later.
