---
title: "Test Agent Skills with agent-skills-eval"
description: "A first-run guide for darkrishabh/agent-skills-eval: create a small Skill, add evals, run the CLI, and understand what evidence you get before trusting an Agent Skill."
pubDate: 2026-05-08
author: "ClawMama Team"
tags: ["agent-skills", "evals", "developer-tools", "openclaw", "hermes"]
draft: false
---

Reader persona: a developer, technical founder, AI-agent operator, or internal-tools owner who is starting to use Agent Skills and wants proof that a skill actually improves agent behavior.

Job to be done: create a tiny Agent Skill with an eval case, run `agent-skills-eval`, understand the required API settings, and review the artifacts before trusting the skill in real workflows.

Agent Skills are easy to write.

That is both good and dangerous.

A `SKILL.md` can make an agent more consistent, safer, and more useful.

It can also do nothing.

Or worse, it can make the agent confidently follow bad process.

That is why `agent-skills-eval` is a useful project to try.

Repository:

```text
https://github.com/darkrishabh/agent-skills-eval
```

NPM package:

```bash
npx agent-skills-eval --help
```

The project describes itself as a test runner for Agent Skills. The basic idea is simple:

```text
same task prompt → run with the skill → run without the skill → judge both outputs → compare evidence
```

That is the right question.

Not "did we write a nice skill?"

But "does this skill measurably improve the agent's answer?"

## Why this is a strong first-run topic

This workflow has clear external actions:

```bash
npx agent-skills-eval ./skills \
  --target gpt-4o-mini \
  --judge gpt-4o-mini \
  --baseline \
  --strict
```

It also has a practical safety angle.

Skills are instructions that change agent behavior. If you are going to use them for customer research, code review, data analysis, compliance workflows, or browser operations, you should be able to test whether they help.

`agent-skills-eval` gives you a lightweight way to do that.

## What I validated

I created a minimal local skill folder under `/tmp/agent-skills-eval-validate` with this structure:

```text
skills/
└── csv-summary/
    ├── SKILL.md
    └── evals/
        ├── evals.json
        └── files/
            └── input.csv
```

Then I ran:

```bash
npx -y agent-skills-eval --help
```

The CLI installed and printed the expected options, including:

```text
--workspace <path>      Workspace directory for artifacts
--baseline              Run both with_skill and without_skill modes
--target <model>        Target model name
--judge <model>         Judge model name; defaults to --target
--base-url <url>        OpenAI-compatible API base URL
--api-key-env <name>    Environment variable containing the API key
--strict                Validate SKILL.md against agentskills.io before running
--report                Generate the static HTML report
```

I also confirmed that a real evaluation run needs an OpenAI-compatible API base URL:

```text
error: provide --base-url or set OPENAI_BASE_URL
```

That is a useful first-run note. The tool is not just a static linter. It needs a target model and judge model provider to actually grade outputs.

## Step 1: Create a tiny skill

Make a test folder:

```bash
mkdir -p agent-skills-eval-demo/skills/csv-summary/evals/files
cd agent-skills-eval-demo
```

Create `skills/csv-summary/SKILL.md`:

```markdown
---
name: csv-summary
description: Summarize small CSV files by identifying the highest revenue month and citing the exact row values.
license: MIT
compatibility: Works with text-capable chat models.
---

When given a CSV file, identify the most important revenue trend. Always cite the highest revenue month and the exact revenue value from the source rows.
```

This is intentionally small.

A first eval should test one behavior, not your whole operating philosophy.

## Step 2: Add an input file

Create `skills/csv-summary/evals/files/input.csv`:

```csv
month,revenue
January,1200
February,2100
March,1700
```

The expected behavior is obvious: February has the highest revenue.

That makes it a good first smoke test.

## Step 3: Add the eval definition

Create `skills/csv-summary/evals/evals.json`:

```json
{
  "skill_name": "csv-summary",
  "evals": [
    {
      "id": "basic-revenue",
      "name": "find highest revenue month",
      "prompt": "Use the attached CSV to summarize revenue and identify the highest revenue month.",
      "files": ["evals/files/input.csv"],
      "expected_output": "The response identifies February as the highest revenue month with revenue 2100.",
      "assertions": [
        "The output identifies February as the highest revenue month.",
        "The output cites the revenue value 2100."
      ]
    }
  ]
}
```

The key fields are:

- `prompt`: the task the agent receives;
- `files`: supporting files for the eval;
- `expected_output`: what good looks like;
- `assertions`: what the judge should check.

This is where you turn a vague skill into a testable claim.

## Step 4: Check the CLI

Run:

```bash
npx -y agent-skills-eval --help
```

You should see usage like:

```text
Usage: agent-skills-eval [options] [root]

Evaluate agentskills.io-style skills and write portable benchmark artifacts
```

If this works, the CLI is available.

## Step 5: Run the eval with a model provider

The README shows this shape:

```bash
npx agent-skills-eval ./skills \
  --target gpt-4o-mini \
  --judge gpt-4o-mini \
  --baseline \
  --strict
```

In practice, you also need provider settings. For an OpenAI-compatible endpoint, use either environment variables or flags.

Example with environment variables:

```bash
export OPENAI_BASE_URL="https://api.openai.com/v1"
export OPENAI_API_KEY="sk-..."

npx -y agent-skills-eval ./skills \
  --target gpt-4o-mini \
  --judge gpt-4o-mini \
  --baseline \
  --strict \
  --workspace ./agent-skills-workspace
```

Example with explicit flags:

```bash
OPENAI_API_KEY="sk-..." npx -y agent-skills-eval ./skills \
  --target gpt-4o-mini \
  --judge gpt-4o-mini \
  --base-url https://api.openai.com/v1 \
  --api-key-env OPENAI_API_KEY \
  --baseline \
  --strict \
  --workspace ./agent-skills-workspace
```

Use a cheap model for first-run checks.

Do not start with a large expensive eval suite.

## Step 6: Understand the expected output

A successful run creates a workspace similar to:

```text
agent-skills-workspace/
└── iteration-1/
    ├── meta.json
    ├── benchmark.json
    ├── eval-basic/
    │   ├── with_skill/
    │   └── without_skill/
    └── report/
        └── index.html
```

The useful part is not only pass or fail.

The useful part is the comparison:

```text
with_skill vs without_skill
```

If both versions pass, your skill may not be adding much.

If only `with_skill` passes, the skill probably helped.

If `with_skill` fails, the skill is unclear, incomplete, or the eval does not match the skill's intended behavior.

## Step 7: Use strict validation early

Keep `--strict` on while developing skills:

```bash
npx -y agent-skills-eval ./skills \
  --target gpt-4o-mini \
  --judge gpt-4o-mini \
  --baseline \
  --strict
```

Strict mode validates the `SKILL.md` against the Agent Skills expectations.

That catches boring issues early:

- missing frontmatter;
- invalid name format;
- missing description;
- mismatched skill folder layout;
- incomplete eval shape.

Boring checks are good.

They stop you from wasting model calls on broken test files.

## API key and permission notes

Before running this on real data:

```text
[ ] Confirm which model provider you are sending prompts to.
[ ] Do not include private customer data in first-run tests.
[ ] Use synthetic fixtures until the eval harness is working.
[ ] Set spending limits if your provider supports them.
[ ] Keep eval artifacts out of public repos if they may contain sensitive outputs.
[ ] Review judge prompts and outputs before using scores as proof.
```

Remember: an eval runner can create a lot of useful artifacts, but those artifacts may contain prompts, inputs, outputs, and model judgments.

Treat them like test logs with potentially sensitive content.

## What to test first

Good first evals are narrow.

Examples:

```text
Skill: customer-interview-analysis
Eval: given three interview notes, extract objections without inventing quotes.

Skill: invoice-review
Eval: given an invoice text, flag missing payment terms and cite the exact line.

Skill: browser-research
Eval: given copied page text, produce a source-cited summary without unsupported claims.

Skill: sales-follow-up
Eval: draft a follow-up email that includes next step, customer concern, and no fake urgency.
```

Bad first evals are too broad:

```text
Make the agent better at marketing.
Make the agent code better.
Make the agent reason well.
```

Those are goals, not evals.

Turn them into observable behaviors.

## How this fits OpenClaw and Hermes agents

OpenClaw and Hermes agents become more useful when they have reusable operating knowledge:

- how to run a customer research workflow;
- how to review a landing page;
- how to prepare a weekly sales summary;
- how to use a browser safely;
- how to handle human approval before external actions.

Those are good candidates for Agent Skills.

But if you are going to rely on them, especially in a hosted agent, you want a way to test them before giving them real work.

A practical loop is:

```text
write SKILL.md → add evals → run agent-skills-eval → inspect report → revise skill → ship to agent
```

That loop is much healthier than:

```text
write SKILL.md → hope the agent behaves better
```

## Soft ClawMama path

If you want to use tested skills inside a ready-to-use agent, ClawMama gives you a hosted path:

1. open the ClawMama Telegram bot;
2. create an OpenClaw or Hermes agent;
3. start with the $2 new-user credits;
4. use the latest ChatGPT model through the managed runtime;
5. add only the skills you have reviewed or tested;
6. keep human approval around external actions such as publishing, messaging, deleting, or buying.

That last point matters.

Skill evals can increase confidence.

They do not remove the need for human judgment.

## Final checklist

Before you trust a skill, ask:

```text
[ ] Does the skill have a clear job?
[ ] Does each eval test one observable behavior?
[ ] Are expected outputs and assertions specific?
[ ] Did you run with `--baseline`?
[ ] Did `with_skill` actually improve over `without_skill`?
[ ] Did you inspect the report, not just the final score?
[ ] Are artifacts safe to store or share?
[ ] Do you know which provider received the prompts?
```

Agent Skills should not be judged by how polished the markdown looks.

They should be judged by whether the agent does better work with them.

`agent-skills-eval` gives you a way to check.
