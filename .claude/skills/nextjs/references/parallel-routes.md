# Parallel & Intercepting Routes

Parallel routes render multiple pages in the same layout. Intercepting routes show a different UI when navigating from within your app vs direct URL access. Together they enable modal patterns.

## File Structure

```
app/
├── @modal/                    # Parallel route slot
│   ├── default.tsx            # Required! Returns null
│   ├── (.)photos/             # Intercepts /photos/*
│   │   └── [id]/
│   │       └── page.tsx       # Modal content
│   └── [...]catchall/         # Optional: catch unmatched
│       └── page.tsx
├── photos/
│   └── [id]/
│       └── page.tsx           # Full page (direct access)
├── layout.tsx                 # Renders both children and @modal
└── page.tsx
```

## Step 1: Root Layout with Slot

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
```

## Step 2: Default File (Critical!)

**Every parallel route slot MUST have a `default.tsx`** to prevent 404s on hard navigation.

```tsx
// app/@modal/default.tsx
export default function Default() {
  return null;
}
```

Without this file, refreshing any page will 404 because Next.js can't determine what to render in the `@modal` slot.

## Step 3: Intercepting Route (Modal)

The `(.)` prefix intercepts routes at the same level.

```tsx
// app/@modal/(.)photos/[id]/page.tsx
import { Modal } from '@/components/modal';

export default async function PhotoModal({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return (
    <Modal>
      <img src={photo.url} alt={photo.title} />
    </Modal>
  );
}
```

## Step 4: Full Page (Direct Access)

```tsx
// app/photos/[id]/page.tsx
export default async function PhotoPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return (
    <div className="full-page">
      <img src={photo.url} alt={photo.title} />
      <h1>{photo.title}</h1>
    </div>
  );
}
```

## Step 5: Modal Component with Correct Closing

**Critical: Use `router.back()` to close modals, NOT `router.push()` or `<Link>`.**

```tsx
// components/modal.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        router.back(); // Correct
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [router]);

  // Close on overlay click
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      router.back(); // Correct
    }
  }, [router]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <button
          onClick={() => router.back()} // Correct!
          className="absolute top-4 right-4"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
```

## Route Matcher Reference

Matchers match **route segments**, not filesystem paths:

| Matcher | Matches | Example |
|---------|---------|---------|
| `(.)` | Same level | `@modal/(.)photos` intercepts `/photos` |
| `(..)` | One level up | `@modal/(..)settings` from `/dashboard/@modal` intercepts `/settings` |
| `(..)(..)` | Two levels up | Rarely used |
| `(...)` | From root | `@modal/(...)photos` intercepts `/photos` from anywhere |

## Common Gotchas

### 1. Missing `default.tsx` → 404 on Refresh

Every `@slot` folder needs a `default.tsx` that returns `null` (or appropriate content).

### 2. Modal Persists After Navigation

You're using `router.push()` instead of `router.back()`.

### 3. Nested Parallel Routes Need Defaults Too

If you have `@modal` inside a route group, each level needs its own `default.tsx`:

```
app/
├── (marketing)/
│   ├── @modal/
│   │   └── default.tsx     # Needed!
│   └── layout.tsx
└── layout.tsx
```
