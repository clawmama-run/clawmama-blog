---
title: "Use Firebase Agent Skills for AI App Prototypes"
description: "A first-run guide to Firebase's official agent skills: list the skills, install Firebase AI Logic basics, and keep AI app prototypes safe before production."
pubDate: 2026-05-16
author: "ClawMama Team"
tags: ["agent-skills", "firebase", "gemini", "ai-apps", "openclaw"]
draft: false
---

Reader persona: a founder, product operator, or technical marketer who wants to prototype an AI feature in a web or mobile app without turning the first experiment into a fragile production system.

Job to be done: install Firebase's official Agent Skills, inspect the Firebase AI Logic skill, and use it as a checklist for a safe AI app prototype with clear security and approval boundaries.

AI app prototypes usually fail in boring ways.

Not because the demo idea is bad.

They fail because the prototype skips basic setup:

- no project boundary
- no App Check
- hardcoded model names
- unclear API provider choice
- missing quota protection
- no separation between prototype and production
- no rule for when the agent is allowed to deploy

Firebase's official Agent Skills repository gives agents a more structured way to help with Firebase workflows.

The repo is:

```text
firebase/agent-skills
```

A high-signal X post about Google's official Agent Skills pointed to this new wave of product-specific skills. Local validation found 15 Firebase skills, including Firebase AI Logic, Auth, Firestore, Hosting, App Hosting, Data Connect, Remote Config, Crashlytics, and security rules auditing.

This guide focuses on:

```text
firebase-ai-logic-basics
```

That is the simplest starting point if your question is: "How do I add a Gemini-powered feature to a web or mobile app safely?"

## First-run install

Create a temporary folder:

```bash
mkdir firebase-agent-skills-test
cd firebase-agent-skills-test
```

List the available skills:

```bash
npx -y skills add firebase/agent-skills --list
```

You should see skills such as:

```text
firebase-ai-logic-basics
firebase-auth-basics
firebase-basics
firebase-firestore
firebase-hosting-basics
firebase-app-hosting-basics
firebase-data-connect
firebase-remote-config-basics
firebase-security-rules-auditor
```

Install only the AI Logic skill:

```bash
npx -y skills add firebase/agent-skills --skill firebase-ai-logic-basics --yes
```

Expected installed files:

```text
.agents/skills/firebase-ai-logic-basics/
  SKILL.md
  references/flutter_setup.md
  references/ios_setup.md
  references/usage_patterns_android.md
  references/usage_patterns_web.md
```

Before using it, inspect the skill:

```bash
sed -n '1,220p' .agents/skills/firebase-ai-logic-basics/SKILL.md
```

Do not skip this step. Skills are instructions that can cause an agent to run tools, change files, or suggest cloud setup. Read them like you would read a script before running it.

## What the skill is useful for

The Firebase AI Logic skill helps an agent reason through:

- Gemini API provider choice
- Firebase project setup
- web, iOS, Android, and Flutter usage patterns
- text generation
- multimodal input
- streaming responses
- structured JSON output
- search grounding
- App Check
- Remote Config for model names
- common provisioning mistakes

The most important production note in the skill is App Check.

If your app calls Gemini through Firebase AI Logic from a client app, you need protection against unauthorized clients using your quota. For a real product, that cannot be an afterthought.

A useful agent should not only generate code. It should remind you about the production boundary.

## A safe prototype prompt

Use this prompt when asking an agent to help with a Firebase AI prototype:

```text
Use the firebase-ai-logic-basics skill to plan a safe prototype for this AI feature.

Feature idea:
Users paste a customer note, and the app returns a structured summary with pain points, objections, and follow-up ideas.

Platform:
Web app.

Rules:
- Do not create or modify a live Firebase project without approval.
- Do not deploy.
- Do not enable billing.
- Do not commit secrets.
- Do not hardcode private API keys.
- Treat App Check as required before production.
- Prefer Gemini Developer API for prototype planning unless there is a clear reason for Vertex AI Gemini API.

Return:
1. Recommended Firebase products
2. Minimal setup checklist
3. Prototype architecture
4. Security checklist
5. Example structured output schema
6. What must be approved before production
```

This prompt keeps the first step as planning.

That matters because Firebase work can quickly become external action: project creation, service enablement, deployment, billing, or production data access.

## Minimal operator checklist

For a non-technical operator, the first useful output should look like this:

```md
Prototype goal:
Turn pasted customer notes into a structured summary.

Firebase products:
- Firebase AI Logic for Gemini access
- Firebase Hosting or App Hosting for the web app
- App Check before production
- Remote Config for model name control

Do now:
- create local prototype UI
- define JSON schema
- test with sample notes
- document token/cost assumptions

Do not do yet:
- deploy publicly
- connect production customer data
- enable billing without approval
- store private notes without a retention policy
```

This is more valuable than a huge code dump.

It gives the founder or operator a decision path.

## Example structured output schema

For the customer-note feature, ask for structured output instead of freeform text:

```json
{
  "pain_points": ["string"],
  "objections": ["string"],
  "follow_up_questions": ["string"],
  "sales_risk": "low | medium | high",
  "recommended_next_step": "string"
}
```

Why this matters:

- your UI can render fields consistently
- the result is easier to store or review
- the agent can test whether outputs match the schema
- future automation has predictable data

Freeform text is fine for a demo. Structured output is better for a product workflow.

## Approval gates

Use explicit approval gates for Firebase work.

| Action | Default rule |
| --- | --- |
| Read public Firebase docs | Allowed |
| Install a skill in a temporary folder | Allowed |
| Draft architecture | Allowed |
| Generate local sample code | Allowed with repo permission |
| Create Firebase project | Approval required |
| Run `firebase login` | Approval required |
| Enable Gemini Developer API | Approval required |
| Enable billing / Blaze plan | Approval required |
| Deploy Hosting or App Hosting | Approval required |
| Touch production Firestore/Auth data | Approval required |
| Change security rules | Approval required |

If an agent says it needs to run a command such as:

```bash
npx -y firebase-tools@latest init ailogic
```

pause and confirm the target project first.

That command can provision real cloud services. It is not the same as writing a local note.

## Common mistakes to avoid

### Mistake 1: treating the prototype as production

A local demo with sample data is not a production AI feature.

Before production, confirm:

- App Check is configured
- quota and cost assumptions are understood
- abusive clients are considered
- privacy language matches actual data flow
- users know when AI is generating output

### Mistake 2: connecting private data too early

Start with synthetic or anonymized examples.

Do not connect customer notes, support tickets, CRM data, or private documents until you have a clear retention and access policy.

### Mistake 3: hardcoding model choices

The Firebase skill calls out Remote Config as a way to update model names without redeploying. That is useful for production because model availability and cost profiles change.

For prototypes, document the model. For production, make it configurable.

### Mistake 4: skipping security rules review

If the prototype stores results in Firestore, involve `firebase-security-rules-auditor` before production.

A working demo with weak rules is not launch-ready.

## ClawMama path

If you want this workflow without manually installing skills and coordinating tools, use ClawMama as the operator layer.

A ready-to-use OpenClaw/Hermes agent can:

- inspect the Firebase skill
- create a safe prototype checklist
- draft local implementation steps
- stop before provisioning cloud services
- ask before enabling billing, deploying, or touching production data

New users get $2 credits, and the agent can use the latest ChatGPT model for planning and review.

A good first request:

```text
Plan a Firebase AI Logic prototype for this feature. Use official Firebase Agent Skills as guidance. Do not create cloud resources or deploy anything. Return the setup checklist, risks, and approval gates.
```

That is the right level for a first pass.

Use the skill to make the agent more precise. Keep approval gates around cloud actions.
