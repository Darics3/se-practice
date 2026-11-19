# Week 10 — Lab report

**Name:** Izbassarov Darkhan
**Group:** Monday 16:00-19:00
**Date:** 19-11-2026

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I reviewed with (tool) | ChatGPT (web) |
| Exact model (with its version, or `not displayed`) | GPT-5.6 Sol |
| Where the assistant read the project | chat with pasted files |
| Starting point (`week-08` or `week-07`) | `week-08` |
| Baseline commit — the checkpoint of Part 0 | `99baabc` |
| Where I ran the tests | my computer |
| Vitest version (the `RUN v...` line of a run) | `v2.1.9` |

---

## 2. Task 1 — the baseline

### 2.1 The project's commands

Run each command in `week-10/app/` before any change. **Exists:** `yes` or `no` (is there such a
script, or such a tool in `package.json`?). **Result:** `pass`, `fail`, `missing` or `not run`.

| Command | Exists | Result | Note |
| --- | --- | --- | --- |
| `npx vitest run` | yes | pass | Vitest v2.1.9; 1 test file passed; 19/19 tests passed. |
| `npm test` | yes | pass | Runs `vitest run`; 19/19 tests passed. |
| `npm run test:unit` (the test command in `AGENTS.md`) | no | missing | `npm error Missing script: "test:unit"`. |
| `npm run build` | yes | pass | Vite production build completed successfully; 1571 modules transformed. |
| `npm run lint` | yes | fail | ESLint found 1 error in `src/App.tsx`: `overlapsExisting` is defined but never used. It also warned that TypeScript 5.6.3 is newer than the officially supported range of `@typescript-eslint/typescript-estree`. |

### 2.2 The baseline test run

The **real** output of `npx vitest run` in `week-10/app/`, before any change:

```text

 RUN  v2.1.9 C:/Users/Asus/Documents/se-practice/week-10/app

 ✓ src/booking.test.ts (19)
   ✓ canBook (19)
     ✓ T01 AC4: touching after an existing booking is allowed
     ✓ BUG-A: request touching bookings on both sides is allowed
     ✓ BUG-B: available check does not mutate bookings
     ✓ T02 AC1: starting exactly at now is rejected
     ✓ T03 AC1: zero-duration interval is rejected
     ✓ T04 AC1: reversed interval is rejected
     ✓ T05 AC1: interval ending after 1440 is rejected
     ✓ T06 AC2: exactly 120 minutes is allowed
     ✓ T07 AC2: 121 minutes is rejected
     ✓ T08 AC4: touching before an existing booking is allowed
     ✓ T09 AC4: partial overlap is rejected
     ✓ T10 AC4: interval containing an existing booking is rejected
     ✓ T11 AC4: interval inside an existing booking is rejected
     ✓ T12 AC4: identical interval is rejected
     ✓ T13 AC3: blocked room is rejected
     ✓ T14 AC4: overlapping time is allowed when there are no bookings
     ✓ AC5: available check does not change existing bookings
     ✓ X1 AC1 AC4: one minute after now and touching booking is allowed
     ✓ X2 AC1: interval ending exactly at 1440 is allowed

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  21:33:11
   Duration  6.57s (transform 155ms, setup 0ms, collect 196ms, tests 20ms, environment 0ms, prepare 5.89s)
```

### 2.3 The agent reads the playbook

What you sent, exactly (the Practice #09 prompt):

```text
Read the root AGENTS.md before making changes. Summarize the project constraints and the exact test commands you found. Do not edit anything yet. If you cannot read AGENTS.md, tell me, and I will paste its content. Do not claim that AGENTS.md was automatically loaded.
```

The assistant's answer, pasted unedited:

```text
I read `week-10/app/AGENTS.md`. I did not edit any files.

The playbook says this is a React + TypeScript Vite project for checking whether a campus room is available. It identifies `src/booking.ts` and its `canBook` function as the booking-rule module, `src/App.tsx` as the page, and `src/booking.test.ts` as the test file.

The constraints and rules stated in `AGENTS.md` are:

- Use real room names and the real timetable from the KBTU portal.
- AC1: reject `start >= end` and requests in the past.
- AC2: maximum booking duration is 120 minutes.
- AC3: reject a blocked room.
- AC4: reject overlaps; the playbook says touching an existing booking at an endpoint also counts as overlap.
- AC5: return Available / Unavailable without changing booking data.
- Agents may edit any project file.
- Agents may add packages when needed.
- If persistence is needed, the playbook permits adding a Supabase table and login page.
- Before finishing, verify that the page still loads.
- After a successful build, the playbook instructs the agent to deploy a production preview with Netlify.

The exact commands listed in `AGENTS.md` are:

text
npm install
npm run dev
npm run test:unit
npm run build


The exact test command named by the playbook is:

text
npm run test:unit


I have not executed or validated these commands as part of this response, and I have not made any changes to the project.

```

Which rules in its summary are wrong for this project, and how you know:

<!-- Write below this line -->
Several rules repeated by the assistant are wrong for this project:

1. `AGENTS.md` says to use real KBTU room names and the real timetable. The Week 10 project contract requires one fictional room with fictional bookings, so real timetable data must not be introduced.

2. The AC4 rule is incorrect. `AGENTS.md` says that touching an existing booking at an endpoint counts as an overlap. The real acceptance contract says endpoint touching is allowed. This is also supported by the existing passing tests such as `T01`, `T08`, `BUG-A`, and `X1`.

3. AC6 is missing from `AGENTS.md`. The real contract requires clear UI feedback on both desktop and mobile.

4. `AGENTS.md` names `npm run test:unit` as the test command, but the baseline run showed that this script does not exist. The working test commands are `npx vitest run` and `npm test`.

5. The playbook allows adding a Supabase table and login page. This conflicts with the project scope, which explicitly requires no login and no database.

6. The playbook tells the agent to deploy with `npx netlify deploy --prod`. External production deployment is outside the allowed project scope.

7. The playbook does not explicitly prohibit secrets, credentials, API keys, passwords, tokens, or `.env` files, although the project rules require no secrets.

8. The playbook only says to make sure the page loads before finishing. It does not require the test suite to run and pass before a change is accepted.
---

## 3. Tasks 2–3 — the read-only review and the challenge

### 3.1 The review prompt and the answer

Where it ran, and how you made sure it could not edit:
The review was performed in ChatGPT using a read-only chat workflow. The assistant was given the project context and was explicitly instructed not to edit any files. Before the review, git status showed a clean working tree. After the review, I ran git status again to confirm that no project files had been modified.

<!-- Write below this line -->

What you sent, exactly (the deck's prompt):

```text
Act as a cautious software reviewer. Inspect this Smart Campus Room Availability Checker WITHOUT editing files. Identify risks in correctness, security, privacy, reliability, maintainability, and agent operations. For each risk, cite the exact file/function or missing check, explain the impact, suggest a way to verify it, and state uncertainty. Do not invent test results.
```

The assistant's answer, pasted unedited:

```text
Read-only review only. I did not edit files and I am not treating any suggestion below as proof by itself.

| # | Category | Risk / exact location | Potential impact | How to verify | Uncertainty |
|---|---|---|---|---|---|
| R1 | Correctness / agent operations | `app/AGENTS.md`, AC4 rule conflicts with `src/booking.ts::canBook()` and tests in `src/booking.test.ts`. The playbook says endpoint touching is overlap, while tests such as `T01`, `T08`, `BUG-A`, and `X1` expect touching to be allowed. | An agent following the playbook could “fix” correct code and introduce a booking regression. | Open `AGENTS.md`, inspect the overlap condition in `canBook()`, and run the touching tests. | **High confidence** because the documented rule and existing test titles directly conflict. |
| R2 | Agent operations / reliability | `app/AGENTS.md` names `npm run test:unit`, but `app/package.json` does not appear to provide that script. | A background agent may believe verification failed or may skip tests because the prescribed command is invalid. | Inspect `package.json` scripts and run `npm run test:unit`. | **High confidence**; baseline execution reported `Missing script: "test:unit"`. |
| R3 | Maintainability / correctness | Availability-related logic appears split between `src/booking.ts` and `src/bookingLogic.ts`. If both modules implement validation or overlap decisions, there are multiple decision paths. | Rules can drift: UI may report a different result from `canBook()`, especially after future edits. | Compare `canBook()` in `booking.ts` with functions in `bookingLogic.ts`; search for checks such as duration, past time, blocked status, and overlap in both files. | **Medium confidence** until the functions are compared line-by-line. This should be challenged directly in the code. |
| R4 | Maintainability | `src/App.tsx` contains an unused `overlapsExisting` reference/import according to ESLint. | The repository does not have a green lint baseline, and stale code makes ownership of availability logic less clear. | Run `npm run lint` and inspect the import/reference in `App.tsx`. | **High confidence**; the baseline lint output identified `App.tsx` and `overlapsExisting` explicitly. |
| R5 | Security / dependency reliability | `app/package-lock.json` / dependency tree. `npm install` reported 24 vulnerabilities: 2 low, 7 moderate, 13 high, and 2 critical. | Vulnerable development or runtime dependencies could create security or supply-chain exposure. The severity count alone does not prove the application is exploitable. | Run `npm audit` and inspect which packages, dependency paths, affected versions, and whether they are runtime or development-only. Do **not** assume `npm audit fix --force` is safe. | **Medium confidence** as a repository risk; exploitability is currently **unverified**. |
| R6 | Agent operations / privacy | `app/AGENTS.md` instructs use of real KBTU room names and real timetable data. | An agent could replace fictional test data with institutional data, creating unnecessary privacy/data-governance risk and violating the project scope. | Compare `AGENTS.md` with the assignment constraints and inspect `src/sampleData.ts` for whether current data is fictional. | **High confidence** that the instruction is unsafe for this assignment; whether any real data is currently present still needs inspection. |
| R7 | Security / scope control | `app/AGENTS.md` permits adding Supabase persistence/login and also suggests Netlify production deployment. | An agent could introduce authentication, credentials, network calls, a database, external deployment, or secrets that are unnecessary for this local checker. | Search the repository for `supabase`, `fetch`, `axios`, `.env`, API keys, auth code, Netlify config, and network URLs. | **High confidence** that the playbook permits these actions; **low confidence** that the current code already performs them. |
| R8 | Reliability / tooling | `npm run lint` warns that TypeScript `5.6.3` is outside the officially supported `<5.6.0` range of `@typescript-eslint/typescript-estree`. | Lint behavior may be less reliable, and future parser/type-system incompatibilities could produce misleading failures. | Inspect versions in `package.json` / lockfile and reproduce `npm run lint`. | **Medium confidence**. The warning is real, but there is no evidence yet that it causes incorrect lint results. |
| R9 | Verification / maintainability | `src/booking.test.ts` contains 19 tests focused on `canBook()`, while UI behavior in `src/App.tsx` does not appear to have an automated regression test. | A UI wiring bug could survive while the core booking suite remains green. | List all `*.test.*` files and check whether any render or integration test exercises `App.tsx`. | **Medium confidence** until the complete test-file list is checked. |
| R10 | Agent operations | `app/AGENTS.md` allows broad editing (“agents may edit any project file”) and adding packages without a narrow file boundary. | A background agent could make unrelated changes, expand dependencies, or alter evidence/configuration while solving a small problem. | Compare the playbook with the required background-agent rules; inspect future diffs for unrelated files or dependency changes. | **High confidence** as an operational-control weakness. |

The risks I would challenge first in the code are **R3** (possible duplicated availability logic), **R5** (whether the reported dependency vulnerabilities actually affect this application), **R6** (whether any real data is already present), **R7** (whether network/auth/deployment code currently exists), and **R9** (whether UI behavior truly lacks automated coverage). Those claims should not enter the risk register as confirmed until the cited files or commands are checked.
```

### 3.2 Challenging the AI's claims

At least **five** claims from the answer, across at least **three** categories. **What I
inspected** is what you opened or ran yourself. **Label:** `confirmed`, `plausible` or
`unsupported`.

| # | The AI's claim (short) | Category | What I inspected | Label | Why |
| --- | --- | --- | --- | --- | --- |
| 1 | Availability logic is duplicated between `booking.ts` and `bookingLogic.ts` | Maintainability / correctness | I opened `src/booking.ts` and `src/bookingLogic.ts` and compared `canBook()`, `checkAvailability()` and `overlapsExisting()` | `confirmed` | Both files independently implement AC1–AC4 checks. The overlap condition is also duplicated, creating two decision paths that could drift apart. |
| 2 | `AGENTS.md` gives a test command that does not exist | Agent operations / reliability | I opened `app/package.json` and also ran `npm run test:unit` | `confirmed` | `package.json` contains `test: vitest run` but no `test:unit` script. Running `npm run test:unit` returned `Missing script: "test:unit"`. |
| 3 | The playbook's real-room instruction creates a privacy/scope risk | Privacy / agent operations | I inspected `src/sampleData.ts` and compared it with the rule described in `AGENTS.md` | `confirmed` | The current application uses fictional rooms such as Athena Hall, Newton Lab and Darwin Seminar. Therefore replacing them with real KBTU rooms/timetables, as the playbook suggests, would unnecessarily introduce real institutional data and violate the intended fictional-data scope. |
| 4 | The project has no automated UI/integration test for `App.tsx` | Verification / maintainability | I listed all `*.test.ts`, `*.test.tsx`, `*.spec.ts` and `*.spec.tsx` files under `app/src` | `confirmed` | The only test file found was `src/booking.test.ts`. There is no automated test that renders or exercises `App.tsx`. |
| 5 | The playbook's AC4 rule conflicts with the actual booking behavior | Correctness / agent operations | I inspected `src/booking.ts` and the existing test names/results in `src/booking.test.ts` | `confirmed` | `canBook()` uses `start < b.end && end > b.start`, which allows endpoint touching. Existing passing tests such as `T01`, `T08`, `BUG-A` and `X1` also expect touching to be allowed, so a playbook rule saying touching is overlap would introduce a regression. |

---

## 4. Task 4 — the risk register

### 4.1 The register

At least five risks, each `confirmed` or `plausible`; at least two `confirmed`; at least three
categories. **Score = L × I.** **Component** is a path inside `app/` or `missing: <check>`.

| ID | Category | Cause → event → consequence | Component | Evidence | Status | L | I | Score | Mitigation | Owner | Verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Maintainability | Availability rules are implemented independently in two modules → one implementation can change without the other → UI and core booking decisions may drift and produce inconsistent results. | `src/bookingLogic.ts` | I inspected `canBook()` in `src/booking.ts` and `checkAvailability()` / `overlapsExisting()` in `src/bookingLogic.ts`; both independently implement AC1–AC4, including the overlap rule. | confirmed | 3 | 3 | 9 | Add a regression test and refactor the duplicated availability decision into one small pure decision path used by the existing functions. | me | The R1 regression test fails before the refactor, then the full Vitest suite passes after the refactor and the approved diff contains no unrelated changes. |
| R2 | Agent operations | The playbook contains incorrect and unsafe project instructions → an agent may follow them literally → correct booking behavior can regress or forbidden scope such as real data, login/database or deployment can be introduced. | `AGENTS.md` | I read `AGENTS.md`: it says endpoint touching is overlap, requests real KBTU timetable data, permits Supabase/login, names a missing `test:unit` command and instructs Netlify deployment. | confirmed | 3 | 3 | 9 | Apply a minimal approved patch to `AGENTS.md` so it states the six required constraints and only real project commands. | me | Review `git diff app/AGENTS.md`, keep the patch within 1–14 changed lines, run the checker and confirm every named command exists. |
| R3 | Reliability | `AGENTS.md` names a test script that is absent → an agent attempts the command and cannot perform the prescribed verification → acceptance may be delayed or verification may be skipped. | `missing: npm run test:unit` | I ran `npm run test:unit` and received `Missing script: "test:unit"`. `package.json` has `test: "vitest run"` but no `test:unit` script. | confirmed | 2 | 2 | 4 | Replace the invalid command in the approved `AGENTS.md` patch with the existing `npm test` command. | me | Run the command named in the patched playbook and confirm it executes the Vitest suite successfully. |
| R4 | Security | Installed dependencies contain reported vulnerabilities → a vulnerable dependency could be reachable in the project → security or supply-chain exposure may exist. | `package-lock.json` | `npm install` reported 24 vulnerabilities: 2 low, 7 moderate, 13 high and 2 critical. I have not yet verified which are runtime-exploitable. | plausible | 2 | 3 | 6 | Inspect `npm audit` before changing dependencies; do not apply a forced dependency upgrade without reviewing compatibility and scope. | me | Review the audit paths and determine whether affected packages are runtime or development dependencies; rerun tests/build after any approved dependency change. |
| R5 | Maintainability | There is no automated page/integration test → UI wiring can regress while `canBook()` unit tests remain green → a visible failure may not be detected automatically. | `missing: automated UI/integration test for App.tsx` | I listed all test/spec files under `app/src`; only `src/booking.test.ts` exists and there is no test that renders or integrates `App.tsx`. | confirmed | 2 | 2 | 4 | Keep the required manual desktop/mobile checks as evidence and consider adding an integration test in future work without expanding this task's scope. | me | Verify the page manually at desktop and mobile widths and save `evidence/ui-desktop.png` and `evidence/ui-mobile.png`. |

### 4.2 The top two for action

Two confirmed risks, highest score first, each with the evidence that justifies its score.

1. **R1** — Score **3 × 3 = 9**. The risk is confirmed because I opened both `src/booking.ts` and `src/bookingLogic.ts` and found that AC1–AC4 are implemented independently in both decision paths. Because availability is core application behavior, rule drift could produce a serious incorrect result.

2. **R2** — Score **3 × 3 = 9**. The risk is confirmed directly in `app/AGENTS.md`: the playbook contradicts the endpoint-touching rule, names a missing test command, requests real timetable data, permits login/database work and instructs external deployment. An agent is likely to follow this file, so the likelihood and impact are both high.
---

## 5. Task 5 — the agent-readiness audit

### 5.1 The rows

`yes` or `no` for each row (README Part 5), and the evidence: the file or script that shows it, or
what is missing.

| Row | What | yes / no | Evidence |
| --- | --- | --- | --- |
| 1a | Formatter | no | There is no Prettier configuration and `prettier` is not listed in `app/package.json`. |
| 1b | Linter | yes | `app/eslint.config.js` exists and `eslint` is listed in `package.json`; `npm run lint` also exists. |
| 1c | Type checks | yes | `app/tsconfig.json` exists and `typescript` is listed in `package.json`. The project also has a `typecheck` script. |
| 1d | Unit tests | yes | `src/booking.test.ts` exists and `vitest` is listed in `package.json`. Baseline: 19/19 tests passed. |
| 1e | Pinned dependencies (lockfile) | yes | `app/package-lock.json` is committed. |
| 2a | `.env.example` | no | There is no `.env.example` in `app/`. |
| 2b | Architecture notes | yes | `app/AGENTS.md` documents the important project modules, including `src/booking.ts`, `src/App.tsx` and `src/booking.test.ts`. |
| 2c | `AGENTS.md` | yes | `app/AGENTS.md` exists. |
| 3a | CI | no | There is no CI workflow under `app/.github/workflows/` that runs checks on every push. |
| 3b | Pre-commit hooks | no | There is no `.husky/`, `.pre-commit-config.yaml`, `lint-staged` or `simple-git-hooks` configuration in `app/`. |
| 3c | Integration checks | no | The only automated test file is `src/booking.test.ts`; there is no page or multi-module integration test. |
| 3d | Reviewable evidence | no | There is no CI log requirement or PR template in `app/` requiring test evidence for an agent's change. |

### 5.2 The level and the gaps

**Level:** 1

**Missing evidence for the next level:**

- Row `2a`: the project would need an `.env.example` file to satisfy all three Level 2 rows.
- Level 2 currently has architecture documentation and `AGENTS.md`, but without `.env.example` it reaches only 2 of 3 rows and therefore does not meet the required 80% threshold.
- The repository documentation is partly inaccurate because `AGENTS.md` names a non-existent `npm run test:unit` command and contains project rules that conflict with the actual contract.
- The folder layout is reasonably clear: source code is under `app/src/`, tests are alongside the booking module, and the agent playbook is at `app/AGENTS.md`.


---

## 6. Task 6 — the agent playbook

### 6.1 The playbook prompt and the answer

What you sent, exactly (the deck's prompt):

```text
Review AGENTS.md and project documentation only. Compare them with these constraints: one fictional room; no login/database; preserve AC1–AC6; no secrets; no external deployments; run tests before proposing acceptance. Report missing or conflicting rules. Draft a minimal patch to AGENTS.md, but wait for my approval before applying it.
```

The assistant's answer, pasted unedited:

```text
I reviewed only `AGENTS.md` and the Week 10 project documentation. I did not edit any files.

The current playbook has several conflicting or missing rules:

| Finding | Decision | Reason |
|---|---|---|
| It says to use real KBTU room names and timetable data. | **Approve change** | The project scope requires one fictional room with fictional bookings. |
| AC4 says endpoint touching counts as overlap. | **Approve change** | The real AC4 requires touching endpoints to be allowed. |
| AC6 is missing. | **Approve change** | The contract requires clear UI feedback on desktop and mobile. |
| It names `npm run test:unit`. | **Approve change** | The recorded baseline showed that this command does not exist; `npm test` is the real test command. |
| It permits Supabase persistence and a login page. | **Approve change** | The project explicitly prohibits login and databases. |
| It does not prohibit secrets. | **Approve change** | The project requires no keys, passwords, tokens, `.env` files, or personal data. |
| It tells the agent to deploy with Netlify. | **Approve change** | External production deployment is prohibited. |
| It only asks the agent to check that the page loads before finishing. | **Modify** | Tests must run and pass before proposing acceptance, while still checking that the page loads. |

### Proposed minimal patch

I would keep every existing heading and make only the following small changes:

diff id="ff8k3u"
 ## Project

 A React + TypeScript page (Vite) that tells a student whether a campus room is free for a
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.

-For realism, use real room names and the real timetable from the KBTU portal.
+Use one fictional room with fictional bookings. Do not introduce real personal or timetable data.

 ## Acceptance contract

 - AC1 Reject start ≥ end and requests in the past.
 - AC2 Enforce the maximum allowed duration (120 minutes).
 - AC3 Reject a blocked room.
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlaps; allow requests that only touch an existing booking at an endpoint.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Preserve clear UI feedback on desktop and mobile.

 ## Commands

 - Install: `npm install`
 - Dev server: `npm run dev`
-- Tests: `npm run test:unit`
+- Tests: `npm test`
 - Build: `npm run build`

 ## You may

 - Edit any file in the project.
 - Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
+- Do not add login, databases, secrets, credentials, API keys, passwords, tokens or `.env` files.

 ## Before you finish

-- Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Run the tests and require them to pass before proposing acceptance; also make sure the page still loads.
+- Do not deploy the project to any external or production service.


This patch keeps the original headings, changes only the incorrect or missing operational rules, introduces no new project feature, and remains within the required minimal-patch size. I have **not applied it** and would wait for your approval before changing `AGENTS.md`.
```

### 6.2 Findings and my decisions

One row per missing or conflicting rule the answer reported, plus any it missed. **Decision:**
`approve`, `reject` or `modify`.

| # | Rule or line in AGENTS.md | Missing / conflicting | Decision | Why |
| --- | --- | --- | --- | --- |
| 1 | Use real KBTU room names and timetable data | conflicting | approve | The project requires fictional room data and should not introduce real institutional timetable data. |
| 2 | AC4 says endpoint touching counts as overlap | conflicting | approve | The actual AC4 allows endpoint touching; existing tests confirm this behavior. |
| 3 | AC6 is missing | missing | approve | The contract requires clear responsive feedback on desktop and mobile. |
| 4 | Tests: `npm run test:unit` | conflicting | approve | The command does not exist. `npm test` is the real working test command. |
| 5 | Supabase persistence and login are allowed | conflicting | approve | Login and databases are outside the project scope. |
| 6 | No explicit rule prohibiting secrets | missing | approve | The project must not introduce credentials, API keys, passwords, tokens or `.env` secrets. |
| 7 | Deploy with Netlify after build | conflicting | approve | External deployment is outside the allowed scope. |
| 8 | Only check that the page loads before finishing | missing / incomplete | modify | Keep the page-load check, but also require the tests to pass before proposing acceptance. |

### 6.3 The approved patch

`git diff app/AGENTS.md`, after you applied only what you approved:

```text
I reviewed the proposed patch before applying it and approved only the changes that directly corrected the identified playbook risks.

The final `git diff app/AGENTS.md` changes 13 lines, which is within the required 1–14 line limit. All existing headings are preserved.

The approved patch:

- replaces the instruction to use real KBTU timetable data with fictional room data;
- corrects AC4 so endpoint touching is allowed;
- adds the missing AC6 responsive-feedback rule;
- replaces the non-existent `npm run test:unit` command with the real `npm test` command;
- removes permission to add Supabase/login and explicitly prohibits secrets;
- removes external Netlify deployment;
- requires tests to pass before proposing acceptance.

No unrelated code or project files were changed as part of this playbook patch.
```

---

## 7. Task 7 — verify safely

### 7.1 The regression test fails before the mitigation

The risk it covers: **R?**. The real run, with the new test failing:

```text
(paste here)
```

### 7.2 The manual UI check

| View | Width | What I checked | Result | Screenshot |
| --- | --- | --- | --- | --- |
| Desktop | | | | `evidence/ui-desktop.png` |
| Mobile | | | | `evidence/ui-mobile.png` |

### 7.3 Tests and checks I did not run

<!-- Name each one and why. "None" only if it is true. -->
-

---

## 8. Task 8 — mitigate two risks

### 8.1 The first mitigation

**Risk:** R?

**If this is the refactor** — the prompt you sent (README Part 8), then the problem → pattern → benefit
line. Otherwise leave both empty.

```text
(the refactor prompt, if this is the refactor)
```

**Problem → pattern → benefit:**

**What I rejected from the agent's patch, and why:**

The diff I approved (`git diff`):

```text
(paste here)
```

### 8.2 The second mitigation

**Risk:** R?

**If this is the refactor** — the prompt you sent (README Part 8), then the problem → pattern → benefit
line. Otherwise leave both empty.

```text
(the refactor prompt, if this is the refactor)
```

**Problem → pattern → benefit:**

**What I rejected from the agent's patch, and why:**

The diff I approved (`git diff`):

```text
(paste here)
```

### 8.3 The residual risk

| ID | L before | I before | Score before | L after | I after | Score after | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |
| | | | | | | | |

### 8.4 The final run

The real output of the **full** suite after both mitigations. Every test must pass.

```text
(paste here)
```

---

## 9. Task 9, and what still fails

### 9.1 A background agent on this project

Rules for an agent working asynchronously on a separate branch. Be specific to this project: name
its files and its commands.

| Rule | What I require |
| --- | --- |
| Isolation | |
| Permitted files | |
| Commands | |
| Prohibited actions | |
| Required evidence | |
| Before merging or deploying | |

### 9.2 Optional — the deck's checklist prompt (not graded)

<!-- If you sent it: the answer, and one thing it has that your rules in 9.1 do not, or the reverse. -->

### 9.3 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

---

## 10. Release decision and conclusion

**Decision:** GO / CONDITIONAL / NO-GO

<!-- Keep one word above. GO is not allowed while any confirmed risk still scores 6 or more.
     Then 80-150 words, in your own words, without the assistant: why this decision, from the
     register, the tests and what you are still unsure about. Name at least two risk IDs.
     Worthless: "The project is mostly fine, so GO."
     Worth everything: "CONDITIONAL. R2 (the deploy line in AGENTS.md, 3 x 3 = 9) is closed by the
     approved patch, now 1 x 3. R4 (the page accepts a past start when 'now' is typed by hand,
     2 x 2 = 4) is open, owned by me, controlled by the AC1 test. The UI was checked at two widths,
     but no test covers App.tsx, so a regression there would be invisible." -->

<!-- Write your conclusion below this line -->
