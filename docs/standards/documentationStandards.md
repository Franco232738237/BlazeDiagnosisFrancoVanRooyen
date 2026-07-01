# Documentation Standards

## Folder rules

- Active production documentation belongs in `docs/active/`.
- Completed or superseded documentation belongs in `docs/archive/`.
- Reusable templates belong in `docs/templates/`.
- Documentation standards belong in `docs/standards/`.
- Training material that is still useful for interns can remain in `docs/training/`.

## Naming rules

- Use camelCase for ordinary source filenames.
- Use kebab-case for documentation filenames unless a numbered active doc is required.
- Use clear milestone numbers for active roadmap docs.
- Do not create filenames with spaces unless preserving an archived original.
- Do not add generated files to the repo.

## Required sections for new feature docs

Every new feature document must include:

- Objective
- User roles affected
- User flow
- Data model changes
- API changes
- UI changes
- Validation rules
- Security/tenant rules
- Acceptance criteria
- Test plan
- Documentation impact

## Completion rule

At the end of a milestone:

- Move completed planning docs to `docs/archive/`.
- Keep active docs focused on current and upcoming work.
- Update `docs/README.md`.
- Update the root `README.md` if setup or major architecture changes.
