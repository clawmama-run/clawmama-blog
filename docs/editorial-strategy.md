# ClawMama Editorial Strategy

ClawMama content is written for people who want AI tools to help them get real work done. The primary reader is not a deployment hobbyist. They may be a founder, operator, marketer, researcher, consultant, solo builder, sales person, or small team lead who wants a practical AI assistant that stays available in Telegram.

## Core audience

Write for readers who want to:

- do research faster;
- track markets, customers, competitors, and opportunities;
- find and qualify sales leads;
- draft outreach and follow-ups;
- summarize conversations, links, documents, or updates;
- coordinate small operational workflows;
- improve marketing output and consistency;
- keep an AI assistant available without managing a server.

They care about outcomes first. They may understand AI tools, but they usually do not want to spend their attention on Docker, SSL, VPS hardening, runtime versions, model keys, webhook routing, or billing glue.

## Positioning rule

Every article should answer one user-facing question:

> How does this help me get useful work done with less setup and less maintenance?

Technology is supporting evidence, not the headline.

Good framing:

- “How to keep an AI research assistant available in Telegram”
- “How a small sales team can use a Telegram AI bot to spot opportunities”
- “Why managed AI bot hosting saves time for operators”

Avoid leading with overly technical framing unless the article is specifically for a technical comparison:

- “Docker container lifecycle for OpenClaw runtime orchestration”
- “Webhook routing implementation details”
- “OpenClaw deployment flags explained”

## Reader personas

### 1. The solo operator

Wants one reliable AI assistant for daily work: research, writing, reminders, analysis, summaries, and lightweight automation.

Content value: show practical tasks and simple workflows.

### 2. The marketer or growth person

Wants help finding angles, writing posts, analyzing competitors, repurposing content, and tracking campaign ideas.

Content value: show how a persistent Telegram AI bot can become a marketing copilot.

### 3. The sales or business development person

Wants to monitor prospects, summarize leads, prepare outreach, and follow up consistently.

Content value: show opportunity discovery and lead workflow examples.

### 4. The researcher or analyst

Wants to collect information, compare sources, summarize findings, and maintain context over time.

Content value: show research workflows and always-available assistant use cases.

### 5. The technical buyer / implementer

May care about OpenClaw, Hermes, containers, and hosting options, but usually because they are choosing a tool for a team or workflow.

Content value: provide clear comparisons and risk/maintenance explanations, not jargon for its own sake.

## Article structure

Use this structure by default:

1. **Work problem** — what the reader is trying to accomplish.
2. **Current friction** — why today’s setup is annoying, slow, brittle, or too technical.
3. **Practical workflow** — how an AI bot in Telegram helps.
4. **Where ClawMama fits** — managed OpenClaw/Hermes runtime, Telegram-first control plane, isolated runtime, pay-as-you-go credits.
5. **Next action** — try the bot, read a related article, or compare options.

## Tone

- Clear, useful, and concrete.
- Avoid hype like “revolutionary” or “10x everything”.
- Prefer examples over abstractions.
- Explain technical terms only when they help the reader decide.
- Do not attack competitors; explain trade-offs.

## Claim discipline

Accurate claims ClawMama can make today:

- Telegram-first managed hosting/control plane for OpenClaw and Hermes bots.
- Users can start from Telegram and provide a BotFather token.
- ClawMama manages runtime creation, lifecycle, routing, balance, and AI usage billing.
- User bot instances run in isolated managed runtime environments, currently backed by separate containers and volumes.
- OpenClaw and Hermes are runtime options.
- Blog is the canonical content source; Dev.to is a distribution channel.

Avoid or soften:

- “physical dedicated server per user”;
- “no infrastructure exists”;
- “guaranteed revenue/sales results”;
- unsupported benchmark or uptime claims;
- implying Dev.to posts are automatically published without review.

## Dev.to selection rule

Dev.to articles should be practical and educational enough to stand alone. They should not read like product announcements.

A Dev.to candidate should pass at least one test:

- teaches a workflow;
- explains a trade-off clearly;
- helps a reader avoid setup/maintenance pain;
- gives a useful checklist;
- compares options without being spammy.

Keep the CTA light: one canonical link plus one natural ClawMama mention is enough.
