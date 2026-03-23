---
description: Generate or refine a feature specification from user input using the Spec Kit template.
handoffs:
  - label: Clarify Requirements
    agent: speckit.clarify
    prompt: Clarify the feature request before specification if needed.
  - label: Create Plan
    agent: speckit.plan
    prompt: Build an implementation plan from the completed feature specification.
    send: true
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

Produce a complete, implementation-ready `spec.md` for the current feature using
the Spec Kit template and the project constitution as authority.

## Execution Flow

1. **Initialize context**
   - Run `.specify/scripts/powershell/check-prerequisites.ps1 -Json` from the
     repo root.
   - Parse the returned JSON and identify the feature directory and available
     artifacts.
   - Use absolute paths in all references.

2. **Load governing documents**
   - Read `.specify/memory/constitution.md`.
   - Read the target `spec.md` if it already exists.
   - Read `.specify/templates/spec-template.md` when creating or repairing a
     spec.

3. **Synthesize the specification**
   - Convert the user request into independently testable user stories.
   - Add acceptance scenarios in Given/When/Then form.
   - Define edge cases that matter for V1 behavior.
   - Write measurable functional requirements.
   - List key entities if the feature manipulates data.
   - Define measurable success criteria.

4. **Validate against the constitution**
   - Reject or flag requirements that conflict with security, privacy,
     performance, or scope rules in the constitution.
   - Prefer V1 scope only unless the user explicitly asks for future work.
   - Replace vague wording with testable wording.

5. **Write the result**
   - Save the completed content to the feature `spec.md`.
   - Ensure there are no template placeholders left unresolved unless explicitly
     marked as `NEEDS CLARIFICATION`.

## Output Requirements

- The final spec must be concise, specific, and implementation-ready.
- User stories must be prioritized (P1, P2, P3...).
- Acceptance criteria must be testable.
- Functional requirements should use stable IDs when appropriate.
- Success criteria must be measurable and technology-agnostic.

## Completion Report

Report back with:
- The path to the generated or updated `spec.md`
- The number of user stories
- Any remaining `NEEDS CLARIFICATION` items
- Suggested next command, usually `/speckit.plan`
