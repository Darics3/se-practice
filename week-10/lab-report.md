# Week 10 — Lab report

**Name:**
**Group:**
**Date:**

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I reviewed with (tool) | |
| Exact model (with its version, or `not displayed`) | |
| Where the assistant read the project (Bolt.new / Claude Code / Cursor / Copilot / chat with pasted files) | |
| Starting point (`week-08` or `week-07`) | |
| Baseline commit — the checkpoint of Part 0 | |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | |
| Vitest version (the `RUN  v…` line of a run) | |

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

<!-- Write below this line -->

What you sent, exactly (the deck's prompt):

```text
(paste here)
```

The assistant's answer, pasted unedited:

```text
(paste here)
```

### 3.2 Challenging the AI's claims

At least **five** claims from the answer, across at least **three** categories. **What I
inspected** is what you opened or ran yourself. **Label:** `confirmed`, `plausible` or
`unsupported`.

| # | The AI's claim (short) | Category | What I inspected | Label | Why |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

---

## 4. Task 4 — the risk register

### 4.1 The register

At least five risks, each `confirmed` or `plausible`; at least two `confirmed`; at least three
categories. **Score = L × I.** **Component** is a path inside `app/` or `missing: <check>`.

| ID | Category | Cause → event → consequence | Component | Evidence | Status | L | I | Score | Mitigation | Owner | Verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | | | | | | | | | | | |
| R2 | | | | | | | | | | | |
| R3 | | | | | | | | | | | |
| R4 | | | | | | | | | | | |
| R5 | | | | | | | | | | | |

### 4.2 The top two for action

Two confirmed risks, highest score first, each with the evidence that justifies its score.

1. **R?** —
2. **R?** —

---

## 5. Task 5 — the agent-readiness audit

### 5.1 The rows

`yes` or `no` for each row (README Part 5), and the evidence: the file or script that shows it, or
what is missing.

| Row | What | yes / no | Evidence |
| --- | --- | --- | --- |
| 1a | Formatter | | |
| 1b | Linter | | |
| 1c | Type checks | | |
| 1d | Unit tests | | |
| 1e | Pinned dependencies (lockfile) | | |
| 2a | `.env.example` | | |
| 2b | Architecture notes | | |
| 2c | `AGENTS.md` | | |
| 3a | CI | | |
| 3b | Pre-commit hooks | | |
| 3c | Integration checks | | |
| 3d | Reviewable evidence | | |

### 5.2 The level and the gaps

**Level:** (0, 1, 2 or 3 — by the 80% rule)

**Missing evidence for the next level:**

<!-- Name the rows and what would have to exist. Then one or two lines on the README's accuracy
     and the folder layout. -->
-

---

## 6. Task 6 — the agent playbook

### 6.1 The playbook prompt and the answer

What you sent, exactly (the deck's prompt):

```text
(paste here)
```

The assistant's answer, pasted unedited:

```text
(paste here)
```

### 6.2 Findings and my decisions

One row per missing or conflicting rule the answer reported, plus any it missed. **Decision:**
`approve`, `reject` or `modify`.

| # | Rule or line in AGENTS.md | Missing / conflicting | Decision | Why |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |

### 6.3 The approved patch

`git diff app/AGENTS.md`, after you applied only what you approved:

```text
(paste here)
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
