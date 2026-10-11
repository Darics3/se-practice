# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->
<!-- Exactly one of 1.1 … 1.10, e.g.  **Topic:** 1.4  -->

---

**Topic:** 1.1 — Professional software delivery

## 1. Scenario

**Question:** What does a customer need beyond working program code for professional software delivery?

**Users:** Students and laboratory staff at a university.

**Problem:** The university needs a small system for students to reserve shared laboratory equipment. A working booking feature alone is not enough because staff also need confidence that the software is tested, understandable, deployable and maintainable.

**Constraints:**  
1. The first release must be simple enough for a small university IT team to support.  
2. Existing booking data must not be lost during deployment or later updates.

**Risk:** If the system is delivered without sufficient testing or operational documentation, equipment could be double-booked or the service could become unavailable during updates.

**Assumptions:** The university, equipment list and IT team described here are fictional details created for this assignment.

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->

Professional software delivery requires more than code that appears to work. For the university equipment booking system, the customer needs evidence that the agreed requirements are satisfied, clear operational documentation, a safe deployment and recovery process, and software that a small IT team can maintain after handover. These needs are directly related to the scenario risks: double-booking equipment, losing existing reservation data, and service problems during updates.

The first engineering decision is to treat double-booking prevention as both a system rule and a testing responsibility. The system should enforce a conflict rule for the same equipment and time period, and concurrency tests should provide evidence that this rule works when requests arrive at nearly the same time. These tests do not prove that all defects are absent. ISTQB explains that testing can reveal defects but cannot prove that no defects remain, so passing tests should be treated as evidence rather than a guarantee. The exact reservation rules, such as maximum duration or cancellation, must still be confirmed with the university instead of being invented.

The second engineering decision is to protect existing booking data during deployment and recovery. Before an update, the team should create a suitable backup, test restoration, and verify that existing reservation records remain intact after the update. NIST guidance supports regularly testing backup media to confirm that data can be retrieved correctly. This is important because having a backup is not the same as proving that recovery will work when needed.

Documentation should also be specific enough for another IT team member to install, configure, deploy, troubleshoot, and recover the system without depending on the original developer. Maintainability should therefore be checked practically, for example by asking another developer to build, test, and make a small change using the handover materials.

There is also a trade-off between simplicity and operational sophistication. Because the first release must be manageable by a small IT team, unnecessary infrastructure should be avoided. However, the answer should not assume that zero-downtime deployment is always too expensive. The acceptable amount of downtime, staff roles, storage approach, recovery expectations, and acceptance criteria remain open decisions that the university must confirm before delivery.

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

(write here)

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

(write here)

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

(write here)

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->

- International Software Testing Qualifications Board (ISTQB). (2024). Certified Tester Foundation Level Syllabus v4.0.1. Section 1.3, p. 17.
- Swanson, M., Bowen, P., Phillips, A., Gallup, D., & Lynes, D. (2010). NIST SP 800-34 Rev. 1: Contingency Planning Guide for Federal Information Systems. National Institute of Standards and Technology. Section 3.4.2, p. 21.

## 7. Appendix A — Initial outline

<!-- Written BEFORE you run Prompt A. Five points, your own words, numbered. These are the
     "five points" you paste into Prompt A. -->

1. Professional delivery includes more than writing code; the software must also be tested and ready to use.
2. The customer needs clear documentation so staff can operate and support the system.
3. Deployment must protect existing booking data and avoid unnecessary service interruption.
4. Tests should cover important failures such as double booking and invalid reservation times.
5. The software should be maintainable so future changes can be made without breaking existing behaviour.

## 8. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the fenced block that follows its label. If a response itself contains ``` lines, open
     and close that block with ~~~~ instead. You may add B4, B5 … after B3 if you ran more. -->

### B1 — Draft (Prompt A)

- **Tool:** ChatGPT
- **Model:** GPT-5.6 Sol High
- **Date:** 2026-10-10
- **Purpose:** contextual draft

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.1 — Professional software delivery: What does a customer need beyond working program code for professional software delivery? for a first-year-level university assignment.

My scenario is students and laboratory staff at a university need a small system for students to reserve shared laboratory equipment. The first release must be simple enough for a small university IT team to support, and existing booking data must not be lost during deployment or later updates. The main risk is that insufficient testing or operational documentation could cause equipment to be double-booked or the service to become unavailable during updates. My initial ideas are 1) professional delivery includes more than writing code; the software must also be tested and ready to use, 2) the customer needs clear documentation so staff can operate and support the system, 3) deployment must protect existing booking data and avoid unnecessary service interruption, 4) tests should cover important failures such as double booking and invalid reservation times, and 5) the software should be maintainable so future changes can be made without breaking existing behaviour. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```text
# Here is a first-year university-level draft of approximately 470 words. It uses your five initial ideas, distinguishes the given scenario from assumptions, and includes trade-offs and points requiring verification.Topic 1.1 — Professional Software Delivery

**Question: What does a customer need beyond working program code for professional software delivery?**

### 1. Scenario Facts

The proposed project is a university laboratory equipment reservation system. Students and laboratory staff need a way to reserve shared equipment. The first release must be simple enough for a small university IT team to support. Existing booking data must also be protected during deployment and future updates.

The main identified risks are double-booking equipment and service interruptions caused by insufficient testing or operational documentation.

### 2. Assumptions

It is reasonable to assume that multiple students may try to reserve the same equipment simultaneously and that reservations will be stored in a database. However, the exact number of users, available infrastructure, and university IT policies have not been specified. These assumptions should be confirmed before implementation.

### 3. Explanation

Professional software delivery involves much more than providing working program code. A customer needs a complete solution that is reliable, understandable, maintainable, and ready for actual use.

First, **testing is essential**. The reservation system should be tested to ensure that students cannot book the same equipment for overlapping periods. Tests should also cover invalid reservation times, cancelled bookings, and simultaneous booking requests. These checks reduce the risk of incorrect reservations and help demonstrate that the software meets its requirements.

Second, **documentation is necessary**. The university IT team needs clear instructions explaining how to install, configure, operate, and troubleshoot the system. Laboratory staff may also need a simple user guide. Without documentation, even functional software can become difficult to support.

Third, **deployment must be planned carefully**. Existing booking records should remain available after installation or updates. The team should prepare backups, test database changes, and establish a recovery procedure. This reduces the possibility of data loss if an update fails.

Fourth, **maintainability matters**. Developers should use understandable code, clear project structure, and version control. Future developers should be able to fix bugs or introduce improvements without accidentally breaking existing features. Automated regression tests can help detect such problems.

Finally, the customer needs a clear handover, including information about known limitations, support responsibilities, and how the delivered system was tested.

### 4. Trade-offs

A small university team may not have the resources for complex deployment infrastructure or extensive automation. A simpler solution with reliable backups, essential automated tests, and clear documentation may be more appropriate. However, reducing development costs must not mean ignoring critical booking and data-protection risks. A short, planned maintenance period may be more practical than implementing expensive zero-downtime deployment.

### 5. Claims to Verify

Before final delivery, the team should confirm the university's backup requirements, acceptable downtime, expected number of users, and reservation rules. It should also verify through testing that simultaneous requests cannot create duplicate bookings and that existing data survives updates.

In conclusion, professional delivery means providing not only functioning code but also the evidence, documentation, deployment procedures, and support arrangements needed for dependable long-term operation.

Tutor's analysis

Your five initial ideas are all represented in the draft. The central distinction is that working code demonstrates functionality, while professional delivery demonstrates that the system can be used and supported reliably.

The important distinctions for your assignment are:

| Category | Example | Why it matters |
| --- | --- | --- |
| Given fact | Existing booking data must not be lost | Explicit scenario requirement |
| Assumption | Reservations will use a database | Plausible, but architecture is unspecified |
| Trade-off | Planned downtime versus zero-downtime updates | Balances cost and reliability |
| Claim to verify | Concurrent requests cannot double-book equipment | Requires actual testing |

One particularly strong point for your analysis is concurrent booking. A system might pass tests where students book equipment one at a time but still fail when two students submit requests simultaneously. This illustrates why professional testing goes beyond checking whether individual features appear to work.
No external references or invented quotations have been added. The draft uses the scenario as its source of facts and marks additional assumptions explicitly.
```

### B2 — Critique (Prompt B)

- **Tool:** ChatGPT
- **Model:** GPT-5.6 Sol High
- **Date:** 2026-10-11
- **Purpose:** critical review of the draft

**Prompt:**

```text
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.

For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.

Question: What does a customer need beyond working program code for professional software delivery?

Scenario: Students and laboratory staff at a university need a small system for students to reserve shared laboratory equipment. The first release must be simple enough for a small university IT team to support, and existing booking data must not be lost during deployment or later updates. The main risk is that insufficient testing or operational documentation could cause equipment to be double-booked or the service to become unavailable during updates.

Draft: # Here is a first-year university-level draft of approximately 470 words. It uses your five initial ideas, distinguishes the given scenario from assumptions, and includes trade-offs and points requiring verification.Topic 1.1 — Professional Software Delivery

**Question: What does a customer need beyond working program code for professional software delivery?**

### 1. Scenario Facts

The proposed project is a university laboratory equipment reservation system. Students and laboratory staff need a way to reserve shared equipment. The first release must be simple enough for a small university IT team to support. Existing booking data must also be protected during deployment and future updates.

The main identified risks are double-booking equipment and service interruptions caused by insufficient testing or operational documentation.

### 2. Assumptions

It is reasonable to assume that multiple students may try to reserve the same equipment simultaneously and that reservations will be stored in a database. However, the exact number of users, available infrastructure, and university IT policies have not been specified. These assumptions should be confirmed before implementation.

### 3. Explanation

Professional software delivery involves much more than providing working program code. A customer needs a complete solution that is reliable, understandable, maintainable, and ready for actual use.

First, **testing is essential**. The reservation system should be tested to ensure that students cannot book the same equipment for overlapping periods. Tests should also cover invalid reservation times, cancelled bookings, and simultaneous booking requests. These checks reduce the risk of incorrect reservations and help demonstrate that the software meets its requirements.

Second, **documentation is necessary**. The university IT team needs clear instructions explaining how to install, configure, operate, and troubleshoot the system. Laboratory staff may also need a simple user guide. Without documentation, even functional software can become difficult to support.

Third, **deployment must be planned carefully**. Existing booking records should remain available after installation or updates. The team should prepare backups, test database changes, and establish a recovery procedure. This reduces the possibility of data loss if an update fails.

Fourth, **maintainability matters**. Developers should use understandable code, clear project structure, and version control. Future developers should be able to fix bugs or introduce improvements without accidentally breaking existing features. Automated regression tests can help detect such problems.

Finally, the customer needs a clear handover, including information about known limitations, support responsibilities, and how the delivered system was tested.

### 4. Trade-offs

A small university team may not have the resources for complex deployment infrastructure or extensive automation. A simpler solution with reliable backups, essential automated tests, and clear documentation may be more appropriate. However, reducing development costs must not mean ignoring critical booking and data-protection risks. A short, planned maintenance period may be more practical than implementing expensive zero-downtime deployment.

### 5. Claims to Verify

Before final delivery, the team should confirm the university's backup requirements, acceptable downtime, expected number of users, and reservation rules. It should also verify through testing that simultaneous requests cannot create duplicate bookings and that existing data survives updates.

In conclusion, professional delivery means providing not only functioning code but also the evidence, documentation, deployment procedures, and support arrangements needed for dependable long-term operation.

Tutor's analysis

Your five initial ideas are all represented in the draft. The central distinction is that working code demonstrates functionality, while professional delivery demonstrates that the system can be used and supported reliably.

The important distinctions for your assignment are:

| Category | Example | Why it matters |
| --- | --- | --- |
| Given fact | Existing booking data must not be lost | Explicit scenario requirement |
| Assumption | Reservations will use a database | Plausible, but architecture is unspecified |
| Trade-off | Planned downtime versus zero-downtime updates | Balances cost and reliability |
| Claim to verify | Concurrent requests cannot double-book equipment | Requires actual testing |

One particularly strong point for your analysis is concurrent booking. A system might pass tests where students book equipment one at a time but still fail when two students submit requests simultaneously. This illustrates why professional testing goes beyond checking whether individual features appear to work.
No external references or invented quotations have been added. The draft uses the scenario as its source of facts and marks additional assumptions explicitly.
```

**Response:**

```text
Critical Review — Topic 1.1: Professional Software Delivery
1. Overall assessment
The draft answers the chosen question reasonably well. It correctly identifies testing, documentation, deployment, maintainability, and handover as important parts of professional software delivery.
However, the main weakness is that several recommendations are described without enough explanation of how they address the university's specific risks. Some statements also rely on assumptions that have not been confirmed.
The review below identifies 11 concerns without rewriting the original answer.
2. Identified concerns
Concern 1 — Unclear roles and responsibilities
Type: Unsupported assumption
The draft states that students and laboratory staff need a way to reserve equipment. However, the scenario only explicitly establishes that students will make reservations. Laboratory staff might instead manage equipment availability or supervise reservations.
Why it matters: Incorrect assumptions about user roles could lead to unnecessary features or missing permissions.
How to check: Ask stakeholders whether laboratory staff can create reservations, approve requests, or only manage equipment.
Alternative interpretation: Students reserve equipment, while laboratory staff only monitor and manage its availability.
Concern 2 — Database technology is assumed
Type: Unsupported assumption
The draft assumes reservations are stored in a database and recommends testing database changes. The scenario does not specify how data will be stored.
Why it matters: Deployment and backup procedures depend on the storage technology.
How to check: Confirm the storage architecture with the university IT team.
Counterexample: A small system might use file-based storage rather than a separate database server. It would still require reliable data preservation.
Concern 3 — Testing is presented too strongly
Type: Vague claim
The draft states that tests should ensure students cannot make overlapping reservations. Testing can provide evidence of correctness but cannot guarantee that every possible failure has been eliminated.
Why it matters: Professional delivery requires realistic claims about software reliability.
How to check: Define expected outcomes, run boundary and concurrency tests, and record the results.
Counterexample: The system might pass normal booking tests but fail when two students submit overlapping requests simultaneously.
Concern 4 — Double-booking prevention lacks technical reasoning
Type: Missing reasoning
The draft discusses testing simultaneous reservations but does not explain that the system must also enforce a booking-conflict rule.
Why it matters: Testing identifies problems, while correct application logic and appropriate data controls prevent conflicting bookings.
How to check: Examine whether availability checking and reservation creation are handled safely when requests occur concurrently.
Counterexample: Two students could both see equipment as available and successfully reserve it if the system does not handle concurrent requests correctly.
Concern 5 — Reservation requirements are not fully defined
Type: Missing reasoning and unsupported assumption
The draft recommends testing invalid reservation times and cancelled bookings, but it does not specify the reservation rules or establish whether cancellation is included in the first release.
Why it matters: Without clear requirements, developers cannot know which outcomes are correct.
How to check: Confirm maximum booking duration, overlapping time rules, unavailable equipment, and cancellation requirements.
Alternative interpretation: Cancellation could be excluded from the first release to keep the system simple.
Concern 6 — Data preservation is not distinguished from availability
Type: Inaccuracy in reasoning
The draft says booking records should remain available after updates. However, preserving data and maintaining uninterrupted service are different requirements.
Why it matters: The scenario explicitly forbids loss of existing booking data, while acceptable service downtime has not been defined.
How to check: Ask whether planned downtime is acceptable and determine how data integrity will be verified after updates.
Counterexample: The application could be unavailable for ten minutes during deployment but preserve every existing reservation.
Concern 7 — Backups are treated as sufficient protection
Type: Missing reasoning
The draft recommends backups and recovery procedures but does not explicitly require testing whether those backups can restore the necessary information.
Why it matters: A backup is only useful when it can be restored successfully. An outdated backup may also fail to preserve recent reservations.
How to check: Perform a test restoration and compare recovered records with the original data. Determine whether any loss of recent bookings would be acceptable.
Counterexample: A backup from yesterday could restore the application but lose all reservations created today.
Concern 8 — Documentation requirements are too general
Type: Vague claim
The draft mentions installation, configuration, operation, and troubleshooting but does not clearly identify the operational instructions needed during an unsuccessful update.
Why it matters: The main scenario specifically identifies insufficient operational documentation as a risk.
How to check: Ask whether another IT team member could deploy, update, troubleshoot, and recover the application using the supplied documentation.
Alternative interpretation: A short deployment checklist, troubleshooting guide, and recovery procedure may be more useful for a small team than extensive documentation.
Concern 9 — Maintainability is difficult to measure
Type: Vague claim
The draft recommends understandable code, clear structure, and version control. These are reasonable practices, but they do not automatically make software maintainable.
Why it matters: The first release must be manageable by a small university IT team.
How to check: Ask another developer to build, test, and make a small change to the application using the provided instructions.
Counterexample: A project might use version control and clean formatting but still be difficult to maintain because of complex dependencies or undocumented configuration.
Concern 10 — Deployment trade-offs are not fully justified
Type: Unsupported assumption and missing reasoning
The draft suggests that zero-downtime deployment is expensive and that planned maintenance may be more appropriate.
This could be reasonable, but no information about hosting infrastructure, budget, or actual deployment costs has been provided.
Why it matters: Professional engineering decisions should be based on project constraints rather than assumptions about cost or complexity.
How to check: Compare available deployment approaches against the university's resources, acceptable downtime, and data-protection requirements.
Counterexample: An existing managed hosting platform might support low-interruption updates without significant additional complexity.
Concern 11 — Customer acceptance is insufficiently explained
Type: Missing reasoning
The draft mentions handover and test results but does not clearly explain how the customer determines whether the software is ready to accept.
Why it matters: A technically working application might still fail to satisfy staff expectations or operational requirements.
How to check: Agree on acceptance criteria with a university representative and demonstrate that the delivered system satisfies them.
Counterexample: All automated tests might pass, but laboratory staff could discover that they cannot manage equipment marked unavailable.
3. Most important issues to address
Priority	Concern	Reason
High	Double-booking prevention	Directly addresses the main functional risk
High	Data preservation and recovery	Explicit requirement that existing data must not be lost
High	Deployment and operational documentation	Directly addresses service availability and support risks
Medium	Clear acceptance criteria	Establishes evidence that delivery requirements are met
Medium	Unverified assumptions	Prevents the explanation from claiming unspecified requirements
Medium	Maintainability and trade-offs	Demonstrates suitability for a small IT team
4. Additional observation about the draft's structure
The sections titled Scenario Facts, Assumptions, Trade-offs, and Claims to Verify are useful because they demonstrate critical analysis.
However, the final Tutor's analysis section is commentary about the draft rather than part of the assignment answer. If the final submission has a 400–500-word requirement, this commentary should not be treated as part of the explanation.
The introduction also makes a broad claim that professional delivery requires software to be "reliable, understandable, maintainable, and ready for actual use." These are reasonable objectives, but the answer would be stronger if each were connected to a practical customer need and a way of verifying it.
5. Final assessment
The draft is generally accurate and relevant to Topic 1.1. Its problems are mainly incomplete reasoning, vague verification criteria, and assumptions presented without sufficient qualification, rather than major factual errors.
The most important improvement would be to explain the relationship between each customer requirement, the relevant software delivery activity, and the evidence needed to demonstrate successful delivery.
For example, concurrency testing provides evidence about double-booking prevention, while backup restoration and deployment testing provide evidence about data preservation and recovery.
The draft should also avoid claiming that tests guarantee correctness, that backups automatically prevent data loss, or that zero-downtime deployment is necessarily expensive.
Overall conclusion: The answer has a solid foundation for a first-year university assignment, but it needs more precise, risk-based reasoning to demonstrate what professional software delivery means for this particular customer.
The original draft has not been rewritten.
```

### B3 — Revision (Prompt C)

- **Tool:** ChatGPT
- **Model:** GPT-5.6 Sol High
- **Date:** 2026-10-11
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions: Concern 1 — accept. The roles of laboratory staff are not defined clearly, so the final answer should avoid assuming that staff make reservations. Concern 2 — qualify. The database is an assumption, but the original draft already labelled it as an assumption. The final answer should avoid depending on a specific storage technology. Concern 3 — accept. Testing provides evidence about behaviour but cannot guarantee that every possible defect or failure has been eliminated. Concern 4 — accept. Preventing double-booking requires booking-conflict rules in the system as well as tests that check those rules. Concern 5 — accept. Cancellation and detailed reservation rules were not given in the scenario, so they should not be presented as confirmed first-release requirements. Concern 6 — accept. Preserving booking data and keeping the service continuously available are different requirements. The scenario requires data preservation, but it does not define acceptable downtime. Concern 7 — reject as stated, but accept the narrower improvement. The draft did not treat backups as sufficient protection because it also mentioned recovery procedures and testing database changes. However, the critique is useful in recommending that restoration itself should be tested. Concern 8 — accept. Operational documentation should be made more specific, especially for deployment, recovery and troubleshooting. Concern 9 — accept. Version control and clear code structure support maintainability but do not prove that the system is easy for another developer to maintain. Concern 10 — accept. The draft should not claim that zero-downtime deployment is necessarily expensive because no hosting or cost information was provided. Concern 11 — accept. The final answer should explain that agreed acceptance criteria and evidence are needed before the customer accepts the release.

Verified evidence: ISTQB Certified Tester Foundation Level Syllabus v4.0.1, Section 1.3 "Testing Principles", p. 17: testing can reveal defects but cannot prove that no defects remain or prove complete correctness. Decision: keep. NIST SP 800-34 Rev. 1, Section 3.4.2 "Backup Methods and Offsite Storage", p. 21: backup media should be tested regularly to confirm that data are stored correctly and files can be retrieved without errors or lost data. This supports restoration testing, but the wording "a backup is only useful when it can be restored successfully" is too absolute. Decision: qualify.

Draft: # Here is a first-year university-level draft of approximately 470 words. It uses your five initial ideas, distinguishes the given scenario from assumptions, and includes trade-offs and points requiring verification.Topic 1.1 — Professional Software Delivery

**Question: What does a customer need beyond working program code for professional software delivery?**

### 1. Scenario Facts

The proposed project is a university laboratory equipment reservation system. Students and laboratory staff need a way to reserve shared equipment. The first release must be simple enough for a small university IT team to support. Existing booking data must also be protected during deployment and future updates.

The main identified risks are double-booking equipment and service interruptions caused by insufficient testing or operational documentation.

### 2. Assumptions

It is reasonable to assume that multiple students may try to reserve the same equipment simultaneously and that reservations will be stored in a database. However, the exact number of users, available infrastructure, and university IT policies have not been specified. These assumptions should be confirmed before implementation.

### 3. Explanation

Professional software delivery involves much more than providing working program code. A customer needs a complete solution that is reliable, understandable, maintainable, and ready for actual use.

First, **testing is essential**. The reservation system should be tested to ensure that students cannot book the same equipment for overlapping periods. Tests should also cover invalid reservation times, cancelled bookings, and simultaneous booking requests. These checks reduce the risk of incorrect reservations and help demonstrate that the software meets its requirements.

Second, **documentation is necessary**. The university IT team needs clear instructions explaining how to install, configure, operate, and troubleshoot the system. Laboratory staff may also need a simple user guide. Without documentation, even functional software can become difficult to support.

Third, **deployment must be planned carefully**. Existing booking records should remain available after installation or updates. The team should prepare backups, test database changes, and establish a recovery procedure. This reduces the possibility of data loss if an update fails.

Fourth, **maintainability matters**. Developers should use understandable code, clear project structure, and version control. Future developers should be able to fix bugs or introduce improvements without accidentally breaking existing features. Automated regression tests can help detect such problems.

Finally, the customer needs a clear handover, including information about known limitations, support responsibilities, and how the delivered system was tested.

### 4. Trade-offs

A small university team may not have the resources for complex deployment infrastructure or extensive automation. A simpler solution with reliable backups, essential automated tests, and clear documentation may be more appropriate. However, reducing development costs must not mean ignoring critical booking and data-protection risks. A short, planned maintenance period may be more practical than implementing expensive zero-downtime deployment.

### 5. Claims to Verify

Before final delivery, the team should confirm the university's backup requirements, acceptable downtime, expected number of users, and reservation rules. It should also verify through testing that simultaneous requests cannot create duplicate bookings and that existing data survives updates.

In conclusion, professional delivery means providing not only functioning code but also the evidence, documentation, deployment procedures, and support arrangements needed for dependable long-term operation.

Tutor's analysis

Your five initial ideas are all represented in the draft. The central distinction is that working code demonstrates functionality, while professional delivery demonstrates that the system can be used and supported reliably.

The important distinctions for your assignment are:

| Category | Example | Why it matters |
| --- | --- | --- |
| Given fact | Existing booking data must not be lost | Explicit scenario requirement |
| Assumption | Reservations will use a database | Plausible, but architecture is unspecified |
| Trade-off | Planned downtime versus zero-downtime updates | Balances cost and reliability |
| Claim to verify | Concurrent requests cannot double-book equipment | Requires actual testing |

One particularly strong point for your analysis is concurrent booking. A system might pass tests where students book equipment one at a time but still fail when two students submit requests simultaneously. This illustrates why professional testing goes beyond checking whether individual features appear to work.

Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.
```

**Response:**

```text
I've revised the draft to reflect all 11 of your review decisions, including your partial rejection of Concern 7. The revised explanation is approximately 475 words, stays at a first-year university level, and uses only your two supplied source notes.
1. Revised draft — Topic 1.1
# Topic 1.1 — Professional Software Delivery

**Question: What does a customer need beyond working program code for professional software delivery?**

### 1. Scenario Facts

The customer needs a university system through which students can reserve shared laboratory equipment. Laboratory staff are stakeholders, but their exact responsibilities are unspecified. The first release must be manageable by a small IT team, and existing booking data must not be lost during deployment or later updates. The main risks are double bookings and service interruptions.

### 2. Assumptions

Students may submit booking requests at nearly the same time, but expected usage is unknown. Reservations must be stored somehow, although the scenario does not identify the storage technology. Cancellation, booking duration, and staff permissions are not confirmed requirements.

### 3. Explanation

Professional software delivery means supplying more than code that appears to work. The customer also needs evidence that requirements are met, instructions for operating the system, and a practical way to update and support it.

First, **the system needs agreed reservation rules and appropriate testing**. For example, it should reject conflicting reservations for the same equipment, including when two requests arrive almost simultaneously. Tests should also check invalid times once the university defines what “invalid” means. Testing provides evidence about behaviour, not a guarantee that no defects remain (ISTQB Certified Tester Foundation Level Syllabus, v4.0.1, Section 1.3, p. 17).

Second, **documentation should explain installation, configuration, deployment, troubleshooting, backups, and recovery**. Another IT team member should be able to follow these instructions without depending on the original developer. Staff-facing guidance may also be needed, depending on their agreed tasks.

Third, **deployment procedures must protect existing reservations**. The team should make suitable backups, verify booking records after updates, and test restoration. NIST SP 800-34 Rev. 1 (Section 3.4.2, p. 21) supports regularly testing backup media to check that files can be retrieved without errors or lost data. Data preservation and uninterrupted service are different: the scenario requires the former but does not specify acceptable downtime.

Fourth, **maintainability requires understandable code, version control, and useful regression tests**. Yet these practices do not prove that a small IT team can maintain the system. A practical check is whether another developer can install it, run tests, and make a small change using the handover materials.

### 4. Trade-offs and Acceptance

The first release should avoid unnecessary complexity without weakening essential booking or data-protection controls. Planned downtime could be acceptable, depending on university requirements and infrastructure; zero-downtime deployment should not be dismissed as inherently expensive.

Before accepting the release, the customer and developers should agree on measurable acceptance criteria and review test results, recovery checks, documentation, known limitations, and support responsibilities.

### 5. Claims to Verify

The university still needs to confirm reservation rules, staff roles, expected demand, storage arrangements, recovery expectations, and acceptable downtime. These decisions determine what successful delivery means for this customer.
## 2. What I changed and why

| Concern | Revision made | Reason |
| --- | --- | --- |
| 1. Staff roles | Removed the implication that laboratory staff make bookings. | The scenario does not define their responsibilities. |
| 2. Database | Replaced database-specific recommendations with storage-neutral language. | The storage technology is unknown, as already acknowledged in the original draft. |
| 3. Testing | Clarified that tests provide evidence, not guarantees. | Consistent with your ISTQB source note. |
| 4. Double-booking | Added the need for booking-conflict rules alongside testing. | Correct application behaviour is needed, not just tests. |
| 5. Reservation rules | Identified cancellation and booking durations as unconfirmed. | Avoids inventing first-release requirements. |
| 6. Data and downtime | Explicitly separated data preservation from uninterrupted service. | Only data preservation is an explicit requirement. |
| 7. Backups | Retained backups and recovery planning; added restoration testing. | Respects your partial rejection while incorporating the narrower NIST-supported improvement. |
| 8. Documentation | Added specific deployment, troubleshooting, and recovery instructions. | Makes documentation relevant to the service interruption risk. |
| 9. Maintainability | Added a practical check involving another developer. | Shows how maintainability could be evaluated. |
| 10. Trade-offs | Removed the unsupported claim that zero-downtime deployment is necessarily expensive. | Cost and complexity depend on infrastructure. |
| 11. Acceptance | Added agreed, measurable acceptance criteria and evidence review. | Shows how the customer could decide whether to accept the release. |

I also removed the original Tutor's analysis from the assignment draft because it is explanatory feedback, not part of the answer itself.

## 3. How your sources were used

| Source you supplied | Supported claim | Limitation |
| --- | --- | --- |
| ISTQB Certified Tester Foundation Level Syllabus v4.0.1, Section 1.3, p. 17 | Testing can reveal problems but cannot establish complete absence of defects. | Does not prove this particular reservation system is reliable. |
| NIST SP 800-34 Rev. 1, Section 3.4.2, p. 21 | Backup media should be regularly tested to check successful storage and retrieval. | Does not prescribe a specific backup method for this university or guarantee zero data loss. |

These citations use the bibliographic details and interpretations you supplied. I have not independently verified the documents, and no additional references have been introduced.

## 4. Remaining gaps to verify

The answer deliberately leaves several project decisions open.

| Missing information | How the university could verify it |
| --- | --- |
| Exact staff roles and permissions | Confirm responsibilities with laboratory staff and IT administrators. |
| Reservation rules | Agree on booking durations, overlapping intervals, invalid times, and cancellation requirements. |
| Storage architecture | Review the proposed technical design. |
| Acceptable downtime | Agree on an update and maintenance policy. |
| Recovery requirements | Define how all existing records will be preserved and verify this through update and recovery tests. |
| Acceptance criteria | Agree on observable outcomes for critical booking, data protection, and recovery checks. |

These are unresolved project details, not necessarily weaknesses in your assignment. Identifying uncertainty rather than inventing requirements is an important part of professional software engineering.

## 5. Final evaluation

The revision is stronger in three main ways: it directly connects delivery activities to the university's risks, distinguishes explicit requirements from implementation assumptions, and explains how the customer can evaluate the delivered software.

It also preserves an important distinction: professional delivery does not mean proving that software can never fail. It means providing appropriate evidence, procedures, and support arrangements to manage the risks of real-world operation.

The revised draft is suitable for a first-year assignment and remains within the requested 400–500-word range.
```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| "Testing can provide evidence of correctness but cannot guarantee that every possible failure has been eliminated." | ISTQB Certified Tester Foundation Level Syllabus v4.0.1, Section 1.3 "Testing Principles", p. 17 | The syllabus states that testing can reveal defects but cannot prove that no defects remain or prove complete correctness. Therefore, passing tests provides evidence about tested behaviour, not a guarantee that every failure is impossible. | keep |
| "A backup is only useful when it can be restored successfully." | NIST SP 800-34 Rev. 1, Section 3.4.2 "Backup Methods and Offsite Storage", p. 21, footnote 25 | NIST says backup media should be tested regularly to confirm that data are stored correctly and files can be retrieved without errors or lost data. This supports testing restoration, but the AI wording "only useful" is too absolute. | qualify |
### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| "The reservation system should be tested to ensure that students cannot book the same equipment for overlapping periods." | The system should enforce a conflict rule for the same equipment and time period, and concurrency tests should provide evidence that this rule works when requests arrive at nearly the same time. These tests do not prove that all defects are absent. | Verification row 1 (ISTQB) shows that testing provides evidence but cannot prove the absence of all defects. This change also connects testing directly to the scenario's double-booking risk. |
| "The team should prepare backups, test database changes, and establish a recovery procedure." | Before an update, the team should create a suitable backup, test restoration, and verify that existing reservation records remain intact after the update. | Verification row 2 (NIST) supports testing whether backup data can actually be retrieved. This also directly addresses the scenario constraint that existing booking data must not be lost. |