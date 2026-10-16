# SIS #02 — AI-Assisted UML Modeling: University Course Registration

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the checker and the word counter. Delete them or leave them.
-->

## 1. Scope and assumptions

**Scope:** The system allows a signed-in student to browse course offerings for one semester and request registration for one specific offering. It rechecks duplicate enrollment and current capacity when registering, creates exactly one Enrollment on success, and rejects full or duplicate requests without changing the enrollment count. Payments, prerequisites, timetable clashes, waiting lists, and cancellation are out of scope.

**Assumptions:**

1. Available places for an offering equal its capacity minus its current enrollments, and capacity is a positive whole number.
2. The student is already signed in and identified, and the selected offering already exists, so authentication and offering setup are not modeled.
3. Each registration request concerns exactly one offering, and the duplicate check, capacity check, and Enrollment creation are performed as one atomic operation.
4. A catalog view only displays availability and does not reserve a place; availability is checked again when registration is requested.

## 2. User stories and acceptance criteria

### US-01 — Browse offerings

**US-01:** As a student, I want to view course offerings for one semester, including course information and available places, so that I can choose an offering to register for.

- **AC-01** (R1): Given student Alex is viewing the electronic course catalog for the Fall 2026 semester, When Alex opens the catalog, Then the system displays the course code, course title, scheduled offering and available places for that semester.
- **AC-02** (R1): Given offering CS101-A has a capacity of 2 and currently has 1 enrollment, When Alex views the offering in the catalog without requesting registration, Then the system displays 1 available place, creates no Enrollment, and leaves the enrollment count unchanged.

### US-02 — Register for an offering

**US-02:** As a student, I want to register for a selected course offering, so that I can receive confirmation when my registration succeeds.

- **AC-03** (R2, R3, R4): Given offering CS101-A has a capacity of 3, currently has 2 enrollments, and student Alex is not enrolled in it, When Alex requests registration for CS101-A, Then the system checks for duplicate enrollment and current availability, creates exactly one Enrollment linking Alex to CS101-A, increases the enrollment count to 3, updates available places to 0, and returns a confirmation.
- **AC-04** (R2, R4, R5): Given offering CS101-A has a capacity of 2, currently has 1 enrollment, and neither Alex nor Sam is enrolled in it, When Alex and Sam submit competing registration requests for CS101-A, Then the requests are handled atomically so exactly one request succeeds and creates one Enrollment and receives confirmation, while the other is rejected with "course full", creates no Enrollment, and the final enrollment count is 2.

### US-03 — Receive a clear rejection

**US-03:** As a student, I want to receive a clear explanation when my registration is rejected because an offering is full or I am already enrolled, so that I understand why registration did not succeed.

- **AC-05** (R2, R5): Given offering MATH201-B has a capacity of 2 and currently has 2 enrollments, and student Sam is not enrolled in it, When Sam requests registration for MATH201-B, Then the system rechecks current availability, rejects the request with "course full", creates no Enrollment, and leaves the enrollment count at 2.
- **AC-06** (R3, R5): Given student Alex already has one Enrollment in offering CS101-A, When Alex requests registration for CS101-A again, Then the system rejects the request with "already enrolled", creates no additional Enrollment, and leaves the enrollment count unchanged.

## 3. Sequence diagram

<!-- The FINAL diagram, rendered. Change .png to .svg if that is what you exported. -->

![Final sequence diagram](models/img/sequence.png)

**Participants:** (write here — each lifeline and what it stands for)

**Atomic operation:** (write here — which messages form the one atomic step: the final duplicate check, the capacity check and the creation of the Enrollment, and why a catalog view reserves nothing)

**Where the Enrollment is created:** (write here — which message, which lifeline, and which class in section 4 it produces)

**Technical lifelines:** (write here — every lifeline that is NOT a class in the class diagram, by name, and why the difference in abstraction is fine. "None" if there are none.)

## 4. Class diagram

<!-- The FINAL diagram, rendered. -->

![Final class diagram](models/img/classes.png)

<!-- One row per association in classes.puml, read in both directions. -->

| Association | Read left to right | Read right to left |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

**How an Enrollment links a student to an offering:** (write here)

**Capacity constraint:** (write here — and why multiplicity alone cannot express it)

**Uniqueness constraint:** (write here — and why multiplicity alone cannot express it)

## 5. Traceability

<!-- Every rule, including the catalog fields and availability (R1). Column 1: the rule and
     the criteria that cover it, e.g. "R2 + AC-03, AC-04". Column 2: the message, guard,
     class or constraint that shows the rule in YOUR diagrams. Column 3: the T-ID that
     exercises it, or the extra check you did instead (R1 has no T case). -->

| Rule and criterion | Model evidence | Validation case |
| --- | --- | --- |
| R1 + (write here) | (write here) | (write here) |
| R2 + (write here) | (write here) | (write here) |
| R3 + (write here) | (write here) | (write here) |
| R4 + (write here) | (write here) | (write here) |
| R5 + (write here) | (write here) | (write here) |

## 6. Walkthroughs

<!-- Walk each case through YOUR final sequence diagram, message by message. Column 2: the
     actual steps and the state change (count before → after). Column 3 starts with Pass or
     Fail, then the location: the message, guard or note where you saw it. A Fail you
     report honestly is a finding, not a penalty. -->

| Case | Observed path and state change | Judgment and evidence |
| --- | --- | --- |
| T1. Available | (write here) | (write here) |
| T2. Last place | (write here) | (write here) |
| T3. Full | (write here) | (write here) |
| T4. Duplicate | (write here) | (write here) |

## 7. Review decisions

<!-- At least three substantive decisions about Prompt C's critique or your own inspection.
     Decision: accepted / rejected / modified — and what you did. Reason: why, in a full
     sentence. Rule: R1–R5. Do not invent an error to fill the table; a justified rejection
     of advice counts. -->

| AI suggestion or model element | Decision | Reason | Rule |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

## 8. Modeling explanation

<!-- 200–300 words. Your main design choices; how the class diagram and the sequence diagram
     complement each other; why an activity diagram could also help explain the workflow. -->

(write here)

## 9. Reflection

<!-- 150–200 words. Written by you, not by the assistant: where AI helped, one decision you
     made yourself, one remaining limitation. Specific beats flattering. -->

(write here)

## 10. Appendix A — Before AI

<!-- Written BEFORE you run Prompt A, committed and pushed in your first commit, and never
     edited afterwards. This is what you paste into Prompt A as "My initial assumptions". -->

**Scope:** A signed-in student browses the course catalog for one semester, chooses one
specific offering and requests registration; the system rechecks capacity and duplicate
enrollment, then either creates exactly one Enrollment or rejects the request without
changing the enrollment count.

**Initial assumptions:**

1. Available places for an offering equal its capacity minus its current enrollments,
   and capacity is a positive whole number.
2. The student is already signed in and identified, and the chosen offering already
   exists, so authentication and offering setup are not modeled.
3. Each registration request concerns exactly one offering, and the final capacity check
   together with the creation of the Enrollment is a single atomic operation.
4. A catalog view only displays availability and does not reserve a place; availability
   is checked again at the moment of registration.
## 11. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the ~~~~ block that follows its label: AI responses contain ``` PlantUML blocks, and
     ~~~~ keeps them from breaking this file. Prompts B and C: the prompt text first, then
     the material it refers to ("below", "these two") pasted under it, in the same block.
     You may add B5, B6 … after B4 if you ran more. -->

### B1 — Requirements (Prompt A)

- **Tool:** ChatGPT
- **Model:** GPT-5.6 Sol
- **Date:** 2026-10-16
- **Purpose:** draft 3 user stories and 6 acceptance criteria

**Prompt:**

~~~~text
Act as a requirements analyst. Use only this course registration scenario and rules R1–R5: A student browses an electronic course catalog, chooses a course offering and requests registration. Each offering has a limited number of places. A Course describes a subject. A CourseOffering is one scheduled section in one semester. Registration always targets a specific offering. Assume that the student is signed in, the selected offering exists, and its capacity is a positive whole number.

R1. Catalog: Show the course code, title, offering and available places for one semester.
R2. Capacity: Recheck current availability when registering. Enrollment must never exceed the offering's capacity.
R3. Duplicates: A student may have at most one enrollment in the same offering. Reject a repeat request.
R4. Success: Create exactly one Enrollment linking the student and offering, update availability and return a confirmation.
R5. Rejection: Explain "course full" or "already enrolled". Create no enrollment and leave the enrollment count unchanged.

A catalog view does not reserve a place. Model the final checks and enrollment creation as one atomic operation, so competing requests cannot take the same last place. A note describing it is enough. Out of scope: payments, prerequisites, timetable clashes, waiting lists, cancellation. Use fictional students and courses. Treat any extra AI suggestion as a proposal you accept or reject explicitly. My initial assumptions are:

1. Available places for an offering equal its capacity minus its current enrollments, and capacity is a positive whole number.
2. The student is already signed in and identified, and the chosen offering already exists, so authentication and offering setup are not modeled.
3. Each registration request concerns exactly one offering, and the final capacity check together with the creation of the Enrollment is a single atomic operation.
4. A catalog view only displays availability and does not reserve a place; availability is checked again at the moment of registration.

Draft 3 user stories and 2 Given / When / Then acceptance criteria for each. Use IDs US-01 to US-03 and AC-01 to AC-06. Map each criterion to rule IDs.
Cover normal and rejection behavior. List uncertainty separately. Do not add excluded features or invent university policies.
~~~~

**Response:**

~~~~text
# Course Registration System — User Stories and Acceptance Criteria

## 1. Confirmed assumptions

The four initial assumptions are accepted because they are consistent with the scenario and rules R1–R5.

| ID | Assumption | Status |
|---|---|---|
| A1 | Available places = offering capacity − current enrollments. Capacity is a positive whole number. | Accepted |
| A2 | Student is signed in and identified; the selected offering exists. | Accepted |
| A3 | Each registration request targets exactly one offering. Final checks and enrollment creation are atomic. | Accepted |
| A4 | Browsing the catalog does not reserve a place. Availability is rechecked at registration. | Accepted |

## 2. User stories and acceptance criteria

### US-01 — Browse Course Catalog

**User story:** As a student, I want to view course offerings for a semester, including course information and available places, so that I can choose an offering to register for.

#### AC-01 — Display semester catalog

**Mapped rule:** R1

- **Given** student Alex is viewing the electronic course catalog for the Fall 2026 semester
- **When** Alex opens the catalog
- **Then** the system displays the course code, course title, scheduled offering and available places for that semester.

#### AC-02 — Viewing does not reserve a place

**Mapped rules:** R1, R2

- **Given** offering CS101-A has a capacity of 2 and currently has 1 enrollment
- **When** Alex views the offering in the catalog without requesting registration
- **Then** the system displays 1 available place, creates no Enrollment, and leaves the enrollment count unchanged.

### US-02 — Register for an Available Offering

**User story:** As a student, I want to register for a selected course offering so that I can receive confirmation of my enrollment when a place is available.

#### AC-03 — Successful registration

**Mapped rules:** R2, R3, R4

- **Given** offering CS101-A has a capacity of 3, currently has 2 enrollments, and student Alex is not enrolled in it
- **When** Alex requests registration for CS101-A
- **Then** the system rechecks availability, creates exactly one Enrollment linking Alex to CS101-A, increases the enrollment count to 3, updates available places to 0, and returns a confirmation.

#### AC-04 — Competing requests for the last place

**Mapped rules:** R2, R4, R5

- **Given** offering CS101-A has a capacity of 2, currently has 1 enrollment, and neither Alex nor Sam is enrolled in it
- **When** Alex and Sam submit competing registration requests for CS101-A
- **Then** exactly one request succeeds and creates one Enrollment, while the other is rejected with "course full" and creates no Enrollment. The final enrollment count is 2 and never exceeds capacity.

### US-03 — Reject Invalid Registration Requests

**User story:** As a student, I want to receive a clear explanation when my registration is rejected because an offering is full or I am already enrolled, so that I understand why registration did not succeed.

#### AC-05 — Reject registration when offering is full

**Mapped rules:** R2, R5

- **Given** offering MATH201-B has a capacity of 2 and currently has 2 enrollments, and student Sam is not enrolled in it
- **When** Sam requests registration for MATH201-B
- **Then** the system rejects the request with "course full", creates no Enrollment, and leaves the enrollment count at 2.

#### AC-06 — Reject duplicate enrollment

**Mapped rules:** R3, R5

- **Given** student Alex already has one Enrollment in offering CS101-A
- **When** Alex requests registration for CS101-A again
- **Then** the system rejects the request with "already enrolled", creates no additional Enrollment, and leaves the enrollment count unchanged.

## 3. Rule coverage matrix

| Rule | Description | Acceptance criteria |
|---|---|---|
| R1 | Catalog information | AC-01, AC-02 |
| R2 | Capacity and current availability | AC-02, AC-03, AC-04, AC-05 |
| R3 | No duplicate enrollments | AC-03, AC-06 |
| R4 | Successful registration | AC-03, AC-04 |
| R5 | Rejection without changing enrollments | AC-04, AC-05, AC-06 |

All five rules are covered by the six acceptance criteria.

## 4. Atomic operation note

The final availability check, duplicate-enrollment check and Enrollment creation must execute as one atomic operation.

For example, if CS101-A has one remaining place and Alex and Sam request registration simultaneously, only one request may succeed. The other must receive "course full". The final enrollment count must never exceed capacity.

The system must also ensure that competing repeat requests from the same student cannot create duplicate enrollments.

No specific database or locking technology is assumed.

## 5. Uncertainty and unresolved questions

| ID | Uncertainty | Treatment |
|---|---|---|
| U-01 | If an offering is full and the student is also already enrolled, which rejection message takes priority? | Unspecified. Do not assume precedence. |
| U-02 | What exact information must appear in a successful confirmation? | Unspecified beyond confirming successful registration. |
| U-03 | How should scheduled offerings be formatted or identified in the catalog? | Unspecified. The offering must be identifiable, but no display format is assumed. |

These uncertainties do not prevent drafting the six criteria.

## 6. Additional AI proposals and decisions

| Proposal | Decision | Reason |
|---|---|---|
| Add payment processing | Rejected | Explicitly out of scope |
| Add prerequisite checking | Rejected | Explicitly out of scope |
| Add timetable-clash validation | Rejected | Explicitly out of scope |
| Add waiting lists or cancellation | Rejected | Explicitly out of scope |
| Specify database transactions or locking implementation | Rejected | Atomic behavior is required, but implementation technology is not specified |
| Clarify rejection-message priority when both rejection conditions apply | Accepted as an open question, not a new requirement | Needed to eliminate ambiguity without inventing policy |

Final result: 3 user stories (US-01–US-03), 6 acceptance criteria (AC-01–AC-06), complete R1–R5 coverage, four accepted initial assumptions, and three separately identified uncertainties.
~~~~

### B2 — UML drafts (Prompt B)

- **Tool:** ChatGPT
- **Model:** GPT-5.6 Sol
- **Date:** 2026-10-16
- **Purpose:** draft the sequence and class diagrams

**Prompt:**

~~~~text
Using my approved scenario, R1–R5, stories and criteria below, return separate PlantUML code blocks for a sequence diagram and a domain class diagram.
Sequence: include catalog browsing and guarded success, full-course and duplicate outcomes. Model final checks and creation as one atomic operation.
Class: show domain concepts, useful attributes and multiplicities. State the capacity and uniqueness constraints. Explain assumptions and any technical lifelines.

### US-01 — Browse offerings

US-01: As a student, I want to view course offerings for one semester, including course information and available places, so that I can choose an offering to register for.

AC-01 (R1): Given student Alex is viewing the electronic course catalog for the Fall 2026 semester, When Alex opens the catalog, Then the system displays the course code, course title, scheduled offering and available places for that semester.

AC-02 (R1): Given offering CS101-A has a capacity of 2 and currently has 1 enrollment, When Alex views the offering in the catalog without requesting registration, Then the system displays 1 available place, creates no Enrollment, and leaves the enrollment count unchanged.

### US-02 — Register for an offering

US-02: As a student, I want to register for a selected course offering, so that I can receive confirmation when my registration succeeds.

AC-03 (R2, R3, R4): Given offering CS101-A has a capacity of 3, currently has 2 enrollments, and student Alex is not enrolled in it, When Alex requests registration for CS101-A, Then the system checks for duplicate enrollment and current availability, creates exactly one Enrollment linking Alex to CS101-A, increases the enrollment count to 3, updates available places to 0, and returns a confirmation.

AC-04 (R2, R4, R5): Given offering CS101-A has a capacity of 2, currently has 1 enrollment, and neither Alex nor Sam is enrolled in it, When Alex and Sam submit competing registration requests for CS101-A, Then the requests are handled atomically so exactly one request succeeds and creates one Enrollment and receives confirmation, while the other is rejected with "course full", creates no Enrollment, and the final enrollment count is 2.

### US-03 — Receive a clear rejection

US-03: As a student, I want to receive a clear explanation when my registration is rejected because an offering is full or I am already enrolled, so that I understand why registration did not succeed.

AC-05 (R2, R5): Given offering MATH201-B has a capacity of 2 and currently has 2 enrollments, and student Sam is not enrolled in it, When Sam requests registration for MATH201-B, Then the system rechecks current availability, rejects the request with "course full", creates no Enrollment, and leaves the enrollment count at 2.

AC-06 (R3, R5): Given student Alex already has one Enrollment in offering CS101-A, When Alex requests registration for CS101-A again, Then the system rejects the request with "already enrolled", creates no additional Enrollment, and leaves the enrollment count unchanged.
~~~~

**Response:**

~~~~text

@startuml
title Course Registration - Sequence Diagram

autonumber

actor Student
boundary "Catalog / Registration UI" as UI
control "Registration Service" as Service
database "Enrollment Store" as Store

== Browse Offerings (US-01) ==

Student -> UI : View catalog(semester)
UI -> Service : getOfferings(semester)
Service -> Store : Find offerings and enrollment counts
Store --> Service : Courses, offerings, counts, capacities
Service -> Service : Calculate available places\n= capacity - enrollment count
Service --> UI : Code, title, offering, available places
UI --> Student : Display semester catalog

note over UI, Store
AC-01, AC-02 (R1)
Catalog browsing does not reserve places
or create an Enrollment.
end note

== Request Registration (US-02 / US-03) ==

Student -> UI : Register(selectedOffering)
UI -> Service : register(studentId, offeringId)

group Atomic registration operation
    note over Service, Store
    AC-03 to AC-06 (R2-R5)
    Final checks and Enrollment creation
    are one atomic operation.
    Competing requests cannot take
    the same last place.
    end note

    Service -> Store : Begin atomic operation
    Service -> Store : Check existing Enrollment\n(studentId, offeringId)
    Store --> Service : Duplicate exists?

    alt Already enrolled (AC-06)
        Service -> Store : Complete without changes
        Service --> UI : Reject "already enrolled"
        UI --> Student : Show "already enrolled"

    else Not already enrolled
        Service -> Store : Check current enrollment count\nand offering capacity
        Store --> Service : Current count and capacity

        alt Course full (AC-05)
            Service -> Store : Complete without changes
            Service --> UI : Reject "course full"
            UI --> Student : Show "course full"

        else Place available (AC-03)
            Service -> Store : Create exactly one Enrollment\n(studentId, offeringId)
            Store -> Store : Increase enrollment count by 1
            Store --> Service : Enrollment created
            Service -> Store : Commit atomic operation
            Service --> UI : Registration confirmation\nand updated availability
            UI --> Student : Display confirmation
        end
    end
end

note over Service, Store
AC-04 (R2, R4, R5):
If two students compete for one last place,
the atomic operation allows exactly
one successful Enrollment.
The other receives "course full".
Final enrollment count never exceeds capacity.
end note

@enduml

@startuml
title Course Registration - Domain Class Diagram

skinparam classAttributeIconSize 0
hide empty methods

class Student {
  +studentId: String
  +name: String
}

class Course {
  +courseCode: String
  +title: String
}

class CourseOffering {
  +offeringId: String
  +semester: String
  +capacity: Integer
  +/enrollmentCount: Integer
  +/availablePlaces: Integer
}

class Enrollment {
  +enrollmentId: String
}

Course "1" -- "0..*" CourseOffering : has >
Student "1" -- "0..*" Enrollment : holds >
CourseOffering "1" -- "0..*" Enrollment : receives >

note right of CourseOffering
R1, R2:
capacity > 0
capacity is a whole number

/enrollmentCount =
number of linked Enrollments

/availablePlaces =
capacity - enrollmentCount

0 <= enrollmentCount <= capacity
end note

note bottom of Enrollment
R3:
Unique (Student, CourseOffering)

Each Enrollment links exactly
one Student to exactly
one CourseOffering.
end note

note bottom of Student
Student is already signed in.
Authentication is out of scope.
end note

note bottom of Course
Course describes a subject.

CourseOffering represents
one scheduled section
in one semester.
end note

@enduml

~~~~

### B3 — Model critique (Prompt C)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** review both models against R1–R5 and T1–T4

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B4 — Focused revision (Prompt D)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** apply my accepted review decisions

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

## 12. Appendix C — Original diagrams

<!-- The AI's first output from Prompt B, rendered unedited from models/original/. -->

![Original sequence diagram](models/img/original-sequence.png)

![Original class diagram](models/img/original-classes.png)

## 13. Appendix D — References and source checks

### References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the source checks must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 5. -->

- (write here)

### Source checks

<!-- At least two modeling decisions you verified. Source and locator: title + slide, page,
     section, chapter or figure — or title + URL + access date (YYYY-MM-DD). Slide numbers
     refer to the decks posted in our Teams. -->

| Modeling decision | Source and locator | What the source says | How it supports or changed your model |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
