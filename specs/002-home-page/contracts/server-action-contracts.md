# Server Action Contracts: Home Page

**Feature**: 002-home-page | **Date**: 2026-03-19

## Contact Form Server Action

### `createLeadAction`

**Location**: `server/actions/lead-actions.ts`
**Directive**: `'use server'` at file top

**Signature**:

```
async function createLeadAction(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState>
```

**Input (FormData keys)**:

| Key         | Type   | Required | Notes                           |
|-------------|--------|----------|---------------------------------|
| name        | string | Yes      | Min 1, max 255 chars            |
| phoneNumber | string | Yes      | Min 1, max 50 chars             |
| email       | string | Yes      | Valid email, max 255 chars      |
| message     | string | No       | Max 2000 chars                  |
| officeId    | string | Yes      | Parsed to int, must be positive |
| honeypot    | string | No       | Hidden field — must be empty    |

**Output (ContactFormState)**:

```
// Success
{ success: true }

// Validation failure (field-level errors)
{
  success: false,
  fieldErrors: {
    name?: string[],
    phoneNumber?: string[],
    email?: string[],
    message?: string[],
    officeId?: string[]
  }
}

// Server/service failure (general error)
{ success: false, error: "Bir hata oluştu. Lütfen tekrar deneyin." }
```

**Processing flow**:

1. Extract `honeypot` from FormData. If non-empty → return `{ success: true }`
   (silent rejection, fake success).
2. Extract remaining fields from FormData into a plain object.
3. Parse with `createLeadSchema.safeParse(data)`.
4. If validation fails → return `{ success: false, fieldErrors: parsed.error.flatten().fieldErrors }`.
5. Call `leadService.create({ ...parsed.data, statusId: 1 })` (default "New"
   status).
6. If service returns `{ success: false }` → return
   `{ success: false, error: "Bir hata oluştu. Lütfen tekrar deneyin." }`.
7. Call `revalidatePath('/')`.
8. Return `{ success: true }`.

**Error messages**: All user-facing error messages in Turkish.

---

## Component Props Contracts

### Header

```
type HeaderProps = {} // No props — reads ROUTES internally
```

### Hero

```
type HeroProps = {} // No props — static content
```

### About

```
type AboutProps = {} // No props — static content
```

### AreasOfWork

```
type AreasOfWorkProps = {} // No props — static content
```

### ServicesList

```
type ServicesListProps = {} // No props — static content
```

### ContactForm

```
type ContactFormProps = {
  offices: Array<{ id: number; name: string }>
}
```

### MapView

```
type MapViewProps = {} // No props — placeholder
```

### Footer

```
type FooterProps = {} // No props — reads ROUTES internally
```
