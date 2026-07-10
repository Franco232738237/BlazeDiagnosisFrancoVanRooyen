# Student Starter Tasks

These tasks are suitable for first- and second-year interns. Tasks should be assigned through GitHub Issues and reviewed through pull requests.

## Training and Setup Tasks

### Task 1: Confirm Local Setup

- Install Git.
- Install Node.js and npm.
- Install Visual Studio Code.
- Clone the repository when access is provided.
- Run `npm install` in the appropriate workspace when instructed.
- Document any setup blockers.

### Task 2: Learn the GitHub Workflow

- Create a branch.
- Make a small documentation change.
- Commit with a clear message.
- Push the branch.
- Open a pull request.

### Task 3: Map the Repository Structure

- Identify main frontend folders.
- Identify main backend folders.
- Identify where API contracts are documented.
- Identify where database schema is stored.
- Submit notes for review.

## Frontend Starter Tasks

### Task 4: Create a Basic Status Card Component

Create a reusable status card for dashboard summaries.

Acceptance criteria:

- Component accepts title, value, and helper text.
- Component uses Tailwind CSS classes.
- Component is easy to reuse.

### Task 5: Create Customer List UI Draft

Create or improve a customer list view.

Acceptance criteria:

- Shows customer name.
- Shows contact number.
- Shows email if available.
- Includes empty state.
- Includes loading/error placeholder notes if not yet connected to API.

### Task 6: Create Job Card Detail UI Draft

Create a draft job card detail interface.

Acceptance criteria:

- Shows job reference number.
- Shows customer and vehicle details.
- Shows current job status.
- Shows quote status.
- Shows parts status.
- Shows notes/timeline placeholder.

## Backend Starter Tasks

### Task 7: Review Customer Module Pattern

Review the customer module and document the controller, service, repository, validator, and DTO responsibilities.

### Task 8: Add Validation Notes to a DTO

Review one DTO and document validation rules that should apply.

### Task 9: Document Job Status Transitions

Document which statuses can move to which next statuses and which roles should be allowed to update them.

## Database Starter Tasks

### Task 10: Database Entity Relationship Notes

Document relationships between:

- Tenant
- User
- Customer
- Vehicle
- Job
- Quote
- Part Request
- Invoice
- Notification

### Task 11: Prisma vs Drizzle Review

Read `docs/technical/ORM_DECISION_NOTE.md` and summarise what would need to change if the project migrates to Drizzle.

## Cyber Security Starter Tasks

### Task 12: Repository Secret Safety Review

Check:

- `.gitignore`
- `.env.example`
- `backend/.env.example`
- `frontend/.env.example`

Document whether any sensitive information appears to be committed.

### Task 13: Customer Tracking Access Risk Review

Document risks for public customer tracking or quote approval links.

Questions to answer:

- Can one customer see another customer's job?
- Should links expire?
- Should quote approval require a token?
- What information should never appear publicly?

### Task 14: API Access Control Review

Review API contracts and list which endpoints should require authentication and which roles should access them.

## Documentation Starter Tasks

### Task 15: Create Domain Glossary Additions

Add missing workshop terms to `docs/product/DOMAIN_GLOSSARY.md`.

### Task 16: Document Vehicle Booking to Collection Flow

Create a clear flow from job creation to vehicle collection.

### Task 17: Create Manual Test Checklist for Quote Approval

Document manual steps to test quote creation, customer approval, customer rejection, and workshop review.
