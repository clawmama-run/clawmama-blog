---
title: "Build Confidential Solana Apps with the Arcium Agent Skill"
description: "A step-by-step first-run guide for installing arcium-hq/agent-skills, using it with an AI coding agent, and safely planning encrypted Solana application work."
pubDate: 2026-05-03
author: "ClawMama Team"
tags: ["agent-skills", "solana", "arcium", "openclaw", "hermes"]
draft: false
---

Reader persona: a Solana developer, crypto product engineer, or technical founder exploring confidential applications with Arcium.

Job to be done: install the Arcium Agent Skill, understand what it gives your AI agent, and use it to plan or debug encrypted Solana application work without pretending the agent can safely deploy production code on its own.

Arcium published an Agent Skill for building encrypted applications on Solana.

The skill lives here:

```text
https://github.com/arcium-hq/agent-skills
```

Install command:

```bash
npx skills add arcium-hq/agent-skills
```

The useful part is not that an agent can now write random Solana code faster.

The useful part is narrower:

> Your coding agent gets Arcium-specific context for circuits, Anchor integration, client encryption, curated patterns, and common debugging traps.

That matters because confidential Solana apps have several moving parts that must match exactly.

## What the Arcium skill covers

From the public repository, the `arcium` skill is designed for building and debugging encrypted Solana applications with Arcium.

It covers:

- Arcis circuit development;
- `#[encrypted]` and `#[instruction]` patterns;
- Anchor integration;
- `queue_computation` and callback flows;
- client-side encryption with `@arcium-hq/client`;
- RescueCipher and x25519 details;
- Shared vs Mxe encrypted state;
- curated patterns for stateless, stateful, multi-party, randomness, packing, and other use cases;
- troubleshooting for silent failures;
- a verification checklist before deploy.

This is exactly the kind of domain-specific context Agent Skills are good at.

## Step 1: Install the skill

Install with NPX Skills:

```bash
npx skills add arcium-hq/agent-skills
```

For a non-interactive install, you can use:

```bash
npx skills add arcium-hq/agent-skills --yes --global
```

In a clean test environment, this installed one skill:

```text
~/.agents/skills/arcium
```

The installer reported compatibility across many agents, including Claude Code, Codex, OpenClaw, and others.

The repository also documents a manual path:

```bash
git clone https://github.com/arcium-hq/agent-skills.git
cp -r agent-skills/skills/arcium <your-skills-directory>/
```

Use the NPX command first unless you have a reason to manage skill files manually.

## Step 2: Confirm what was installed

After installation, your skills directory should include files like:

```text
arcium/
  SKILL.md
  mcp.json
  examples/
    minimal-circuit.md
    patterns.md
  references/
    troubleshooting.md
```

The important files are:

- `SKILL.md`: the agent-facing instructions;
- `examples/minimal-circuit.md`: a first-app reference;
- `examples/patterns.md`: curated Arcium patterns;
- `references/troubleshooting.md`: common failure modes;
- `mcp.json`: MCP configuration for Arcium docs.

Before using the skill on production work, ask your agent to summarize the installed skill first.

Example:

```text
Read the installed Arcium skill.
Summarize:
1. what tasks it is useful for;
2. what files it installed;
3. what risks or gotchas it warns about;
4. what you should ask me before changing code.
```

This gives you a sanity check before the agent starts editing.

## Step 3: Use it for a first Arcium app plan

Start with planning, not deployment.

Ask:

```text
I want to build my first confidential Solana app with Arcium.

Use the installed arcium skill.
Create a first-run plan for a minimal app.
Include:
1. what the circuit should do;
2. what the Anchor program needs;
3. what the TypeScript client needs;
4. what local commands I should run;
5. what files you expect to create or modify;
6. what parts need human review before deployment.

Do not deploy anything.
Do not use real funds.
Do not change production keys or configs.
```

A good first app is simple.

For example:

```text
A minimal confidential comparison or encrypted vote count demo.
```

Avoid starting with a production dark pool, trading workflow, or high-value DeFi system.

## Step 4: Ask the agent to explain Arcium’s three surfaces

Arcium apps combine several surfaces:

```text
circuit → Anchor program → TypeScript client
```

Ask the agent:

```text
Explain the three surfaces of an Arcium app:
1. Arcis/Rust circuit;
2. Anchor/Rust program;
3. TypeScript client.

For each surface, explain:
- what it owns;
- what can go wrong;
- what files I should inspect first;
- what should be tested before deployment.
```

This is a good use of the skill because many Arcium bugs are boundary bugs.

For example:

- circuit names not matching callback macros;
- wrong `ArgBuilder` order;
- missing x25519 public key for shared encrypted inputs;
- nonce reuse;
- callback accounts not writable;
- cluster offset mismatch.

These are not generic coding issues. They are domain-specific failure modes.

## Step 5: Use the skill for debugging

If an Arcium computation fails, do not ask the agent to “fix it” blindly.

Ask for a triage pass:

```text
Use the arcium skill to debug this failing computation.

First, produce a triage checklist.
Then inspect the relevant code.
Check in this order:
1. instruction and callback names match exactly;
2. computation definition is initialized;
3. ArgBuilder order matches the circuit parameters;
4. Shared encrypted params include x25519 public key;
5. nonce is unique per encryption;
6. callback accounts are writable where required;
7. cluster and deployment settings match.

Do not edit code until you explain the likely cause and proposed patch.
```

This keeps the agent from making random changes.

## Step 6: Use examples before inventing patterns

The Arcium skill includes curated examples and patterns.

Ask:

```text
Before writing new code, find the closest Arcium pattern from the installed skill examples.
Explain why it matches this use case.
If no pattern matches, explain the gap.
```

Good agent behavior here is conservative.

It should adapt a known pattern before inventing a new one.

## Step 7: Add a human approval gate

Encrypted app development is high-context work.

Use a rule like this:

```text
You may read code, explain patterns, and draft patches.

You must ask for approval before:
- editing program logic;
- changing encryption or nonce handling;
- changing deployment config;
- running deploy commands;
- using keys, wallets, or real funds;
- pushing commits;
- opening PRs;
- sending messages externally.
```

That makes the workflow safer.

## Step 8: Run it in OpenClaw or Hermes

If you already run OpenClaw or Hermes, install the skill in that agent environment.

If you want a ready-to-use agent, create one with ClawMama:

```text
https://t.me/clawmamarun_bot
```

ClawMama gives you a managed OpenClaw or Hermes agent. New users get $2 of AI credits and access to the latest ChatGPT model, so you can test the Arcium skill workflow before maintaining your own runtime.

A good first message is:

```text
Help me set up an Arcium Agent Skill workflow.

Use this repo as the skill source:
https://github.com/arcium-hq/agent-skills

I want to:
1. install the skill;
2. summarize what it teaches the agent;
3. create a minimal confidential Solana app plan;
4. define approval rules before code edits or deploys.

Do not deploy anything.
Do not touch wallets, keys, or real funds.
```

That is a safe first run.

## Minimal usage examples

After installation, try prompts like:

```text
Use the Arcium skill. Explain how I should structure a minimal encrypted voting demo.
```

```text
Use the Arcium skill. Show the queue_computation and callback pattern at a high level before writing code.
```

```text
Use the Arcium skill. Review this Arcium client code for nonce reuse, ArgBuilder order, and missing x25519 pubkey.
```

```text
Use the Arcium skill. Create a pre-deploy checklist for this confidential Solana app.
```

These are better than asking for a full production app in one shot.

## Expected output

A useful agent response should include:

- a short architecture summary;
- which Arcium pattern it is using;
- files it wants to read or edit;
- test commands to run;
- risk notes;
- approval checkpoints;
- deployment caveats.

For debugging, useful output looks like:

```markdown
Likely issue:
ArgBuilder order does not match circuit parameter order.

Evidence:
Circuit expects shared key, nonce, ciphertext A, ciphertext B.
Client passes nonce before x25519 pubkey.

Suggested fix:
Reorder the ArgBuilder calls.

Risk:
Changing argument order can break existing tests. Run local Arcium tests before deploy.

Approval needed:
Yes — patch client code.
```

That is practical agent work.

## API keys, wallets, and permission notes

Treat this as development infrastructure.

Do not give an agent unrestricted access to:

- production wallets;
- private keys;
- deploy keys;
- mainnet funds;
- privileged RPC credentials;
- customer data;
- production deployment config.

Prefer:

- local test projects;
- devnet or test environments;
- read-only repo access at first;
- scoped credentials;
- explicit approval before deploy;
- code review before merge.

The skill can make your agent more useful.

It does not remove the need for engineering review.

## Final takeaway

The Arcium Agent Skill is a strong fit for a real agent workflow because it is not a generic prompt pack.

It gives the agent domain-specific context for a hard development surface:

```text
encrypted Solana circuit + Anchor integration + client encryption + troubleshooting
```

Install it with:

```bash
npx skills add arcium-hq/agent-skills
```

Then use it for planning, pattern selection, code review, and debugging before you trust it with edits or deployment.

That is the right shape for Agent Skills: not magic, but safer context for specialized work.
