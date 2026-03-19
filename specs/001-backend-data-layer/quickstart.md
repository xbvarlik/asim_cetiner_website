# Quickstart: Backend Data Layer

**Feature**: `001-backend-data-layer`
**Date**: 2026-03-19

## Prerequisites

- Node.js 18+ (LTS)
- PostgreSQL database (local or Supabase)
- `DATABASE_URL` environment variable set in `.env`

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template and set DATABASE_URL
cp .env.example .env
# Edit .env with your PostgreSQL connection string:
# DATABASE_URL="postgresql://user:password@localhost:5432/kenan_kubuc?schema=public"

# 3. Generate Prisma client
npx prisma generate

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. Seed the database
npx prisma db seed
```

## Verify Setup

```bash
# Open Prisma Studio to inspect the database
npx prisma studio
```

After seeding, you should see:
- **Status table**: 5 records (New, Contacted, In Progress, Completed, Cancelled)
- **Office table**: 2 records (placeholder offices)
- **Lead table**: Empty
- **BlogPost table**: Empty

## File Structure

```text
kenan_kubuc_website/
├── prisma/
│   ├── schema.prisma          # Database schema (4 models)
│   └── seed.ts                # Seed script (Status + Office data)
├── lib/
│   ├── prisma.ts              # Singleton Prisma client
│   └── validations/
│       ├── lead-validation.ts
│       ├── office-validation.ts
│       ├── blog-validation.ts
│       └── status-validation.ts
├── server/
│   └── services/
│       ├── lead-service.ts
│       ├── office-service.ts
│       ├── blog-service.ts
│       └── status-service.ts
├── types/
│   └── index.ts               # Type aliases + utility types
└── .env                       # DATABASE_URL
```

## Usage Examples

### Create a lead

```typescript
import { create } from "@/server/services/lead-service";

const result = await create({
  name: "Jane Doe",
  phoneNumber: "+1-555-0100",
  email: "jane@example.com",
  message: "Interested in therapy sessions",
  officeId: 1,
  statusId: 1,
});

if (result.success) {
  console.log("Lead created:", result.data.id);
} else {
  console.error("Failed:", result.error);
}
```

### List leads (paginated)

```typescript
import { getAll } from "@/server/services/lead-service";

const result = await getAll({ page: 1, pageSize: 10 });

if (result.success) {
  console.log(`Page 1 of ${result.data.pagination.totalPages}`);
  console.log(`${result.data.pagination.total} total leads`);
}
```

### Soft-delete a lead

```typescript
import { remove } from "@/server/services/lead-service";

const result = await remove("uuid-of-lead");
// Lead is not removed — deletedAt is set; subsequent reads exclude it.
```

## Common Commands

| Command                        | Purpose                          |
|--------------------------------|----------------------------------|
| `npx prisma generate`         | Regenerate Prisma client         |
| `npx prisma migrate dev`      | Create and apply migrations      |
| `npx prisma db seed`          | Run seed script                  |
| `npx prisma studio`           | Visual database browser          |
| `npx prisma migrate reset`    | Reset DB + re-seed (destructive) |
