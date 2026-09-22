# Traceability — use cases → stories → criteria

One row per use case. All six rows stay, even the ones with nothing behind them: an empty cell is a
finding you report, not a failure you hide. Use real IDs, comma-separated; write `none` where there
is nothing.

| Use case | Stories (US-nn) | Criteria (AC-nn) | Gap? |
| --- | --- | --- | --- |
| UC-01 View availability | US-01 | none | Yes — no acceptance criteria were written for US-01. |
| UC-02 Book room | US-02 | AC-01, AC-02, AC-03, AC-04, AC-05 | No |
| UC-03 Cancel booking | US-03 | none | Yes — no acceptance criteria were written specifically for US-03. |
| UC-04 Block or unblock room | US-04 | AC-06, AC-07, AC-08 | No |
| UC-05 Review usage | US-05 | none | Yes — no acceptance criteria were written for US-05. |
| UC-06 Send confirmation | US-06 | AC-09, AC-10, AC-11 | No |

**Stories that belong to no use case:** none

**What the gaps tell you:** All six use cases have a corresponding user story, but only the three selected stories have detailed acceptance criteria. UC-01, UC-03 and UC-05 therefore have story coverage but no criterion-level verification.