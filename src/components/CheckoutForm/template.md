# 🧠 Feature 2 — Multi-step Registration Form (TypeScript)

## 1️⃣ Read & Clarify (what you’d say in interview)

> “I’ll build a 3-step registration form with client-side validation.
> Each step will validate its fields before moving forward.
> Final step shows a summary before submit.
> No backend integration, just mock submit.”

Assumptions:

* Validation only on **Next** click
* Linear flow (no skipping steps)
* Data stored in memory
* Accessibility basics (labels, focus)

---

## 2️⃣ High-level Design

**State lives in one place**: `useRegistrationForm`

```
RegisterPage
 └── useRegistrationForm (state + handlers)
     ├── Step1
     ├── Step2
     ├── Step3
     └── Summary
```

Why this is good:

* Single source of truth
* Easy to debug
* Easy to explain in interview

---

## 3️⃣ Plan & Timebox

**MVP (what we build now):**

* Step navigation
* Validation per step
* Summary page
* Submit handler

**Nice-to-have (later):**

* Persist to localStorage
* API submit
* Animations

---

# 🧩 Folder Structure (unchanged, now populated)

```
src/
├── pages/
│   └── RegisterPage.tsx
│
├── features/
│   └── registration/
│       ├── hooks/
│       │   └── useRegistrationForm.ts
│       │
│       ├── steps/
│       │   ├── Step1Personal.tsx
│       │   ├── Step2Address.tsx
│       │   ├── Step3Account.tsx
│       │   └── Summary.tsx
│       │
│       └── validation.ts
```

---


