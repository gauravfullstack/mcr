# MULTI-STEP FORM - PHASE 1 INTERVIEW Q&A

Based on your actual multi-step form implementation. Keep answers conversational for interviews.

---

## **EASY (Warm-up)**

### **2. What's the difference between onChange and onBlur?**

**Answer:**
**onChange:** Fires on every keystroke (real-time).
**onBlur:** Fires only when user leaves the field.

**In your code (uses onChange):**
```tsx
onChange={(e) => onChange("name", e.target.value)}
// Fires while typing: "J", "Jo", "Joh", "John"
```

**If you added onBlur:**
```tsx
onBlur={(e) => validateField("name", e.target.value)}
// Fires only when user leaves field
```

**When to use each:**
- **onChange:** Instant feedback, real-time validation
- **onBlur:** Delayed validation (less interrupting)

**Your form uses onChange:** Good for multi-step, keeps state in sync immediately.

---

### **3. Why validate on blur instead of on every keystroke?**

**Answer:**
Validation on blur is less annoying - user doesn't see errors while still typing.

**onChange (shows errors while typing):**
```
User types "Joh" → Error: "Invalid email"
User types "n@gmail.com" → Error clears
// Annoying!
```

**onBlur (shows error after leaving):**
```
User types "Joh" → No error yet
User leaves field → Error shows if invalid
// Better UX
```

**Your form:** Currently uses onChange for all fields, which is fine for simple validation like "field required".

---

### **4. How do you disable a submit button?**

**Answer:**
Check validation state, disable if invalid.

**In your code:**
```tsx
const isValid = data.name && data.email && data.phone;

<button onClick={onNext} disabled={!isValid}>
  Next
</button>
```

**Logic:**
- If all fields have values → `isValid = true` → button enabled
- If any field empty → `isValid = false` → button disabled

**Better validation (could improve):**
```tsx
const isValid = 
  data.name.trim() !== "" &&
  data.email.includes("@") &&  // Email format check
  data.phone.length === 10;     // Phone length check

<button disabled={!isValid}>Next</button>
```

Your implementation checks if fields exist, which is basic but works!

---

## **MEDIUM (Concepts)**

### **5. In your form, how many states do you have? Why each one?**

**Answer:**
**2 states:**

1. **`formData`** - Stores all form values across 3 steps
```tsx
const [formData, setFormData] = useState<FormData>({
  name: "", email: "", phone: "",
  fathername: "", fatheremail: "", fatherphone: "",
});
```
**Why:** Need to remember values when user navigates between steps

2. **`step`** - Tracks which step user is on (from useMultiStepForm hook)
```tsx
const { step, next, back } = useMultiStepForm(3);
```
**Why:** To show correct step component (Step01, Step02, or Step03)

**Data flow:**
```
formData (all form values) 
  ↓
  Passed to current step (Step01, Step02, Step03)
  ↓
  User edits → handleChange updates formData
  ↓
  Navigate to next step → step state changes
  ↓
  New step receives same formData (values preserved!)
```

---

### **6. How do you handle form submission without page reload?**

**Answer:**
Use `onClick` handler on button instead of form `onSubmit`. Call `preventDefault()` is not needed since there's no form element.

**Your code:**
```tsx
<button onClick={onSubmit}>Submit</button>

const handleSubmit = () => {
  console.log("FINAL DATA:", formData);
  alert("Form submitted!");
  // No page reload, just JavaScript execution
};
```

**Alternative with form element:**
```tsx
<form onSubmit={(e) => {
  e.preventDefault();  // Prevents page reload
  handleSubmit();
}}>
  <button type="submit">Submit</button>
</form>
```

**Your approach (✅ Better for multi-step):**
- No form element
- Direct onClick handlers
- Cleaner for step navigation

---

### **7. Why create separate validation function instead of inline validation?**

**Answer:**
Separate validation function is reusable, testable, and cleaner.

**Your current approach (inline, ✅ Works):**
```tsx
const isValid = data.name && data.email && data.phone;
```

**Better approach (separate function):**
```tsx
// utils/validation.ts
const validateStep01 = (data: FormData): boolean => {
  return (
    data.name.trim() !== "" &&
    data.email.includes("@") &&
    data.phone.match(/^\d{10}$/)
  );
};

// In Step01:
const isValid = validateStep01(data);
```

**Benefits of separate validation:**
- Can test validation logic independently
- Reuse in multiple places
- Easier to modify validation rules
- Cleaner component code

**Your code works fine:** As app grows, consider moving validation logic out.

---

### **8. What's the difference between form state and validation state?**

**Answer:**
**Form state:** Stores what user typed.
**Validation state:** Stores whether form/fields are valid.

**In your code:**

| State | What it stores | Used for |
|-------|---|---|
| `formData` | User input (name, email, phone) | Display in inputs, send to server |
| `isValid` | Boolean (true/false) | Disable button |

**Currently (✅ Simple):**
```tsx
const [formData, setFormData] = useState<FormData>(...);
// Validation calculated inline:
const isValid = data.name && data.email && data.phone;
```

**Advanced approach (separate states):**
```tsx
const [formData, setFormData] = useState<FormData>(...);
const [errors, setErrors] = useState<FormErrors>({
  name: "", email: "", phone: ""
});

// Validate and show specific errors
const validateField = (field: string, value: string) => {
  if (!value) setErrors(prev => ({ ...prev, [field]: "Required" }));
  // Show: "Name is required"
};
```

**Your form:** Keeps it simple with inline validation. Good for MVP!

---

## **HARD (Problem-solving)**

### **9. How would you reuse form validation in multiple forms?**

**Answer:**
Create validation utilities that multiple forms can import.

**Structure:**
```
utils/
  ├─ validation.ts (shared validation)
  └─ constants.ts (rules)

forms/
  ├─ CheckoutForm.tsx (imports validation)
  ├─ LoginForm.tsx (imports validation)
  └─ ProfileForm.tsx (imports validation)
```

**Example validation utility:**
```tsx
// utils/validation.ts
export const validateEmail = (email: string): boolean => {
  return email.includes("@") && email.includes(".");
};

export const validatePhone = (phone: string): boolean => {
  return phone.match(/^\d{10}$/) !== null;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

// Use in any form:
import { validateEmail, validatePhone } from "@/utils/validation";

const isValid = 
  validateName(data.name) &&
  validateEmail(data.email) &&
  validatePhone(data.phone);
```

**In your app:**
Could extract validation from Step01, Step02 to shared utils for reuse.

---

### **10. A bug: form values disappear when navigating between steps. Why? How to fix?**

**Answer:**
Values persist because `formData` state lives in parent (CheckoutForm) ✅ Your code is correct!

**If values disappeared (❌ Bug scenario):**
```tsx
// ❌ BAD: State in each step component
const Step01 = () => {
  const [name, setName] = useState("");  // Local state!
  // When step changes, component unmounts, state lost
};
```

**Why your code works (✅ Correct):**
```tsx
// ✅ GOOD: State in parent (CheckoutForm)
const [formData, setFormData] = useState<FormData>({...});

// All steps receive same formData
<Step01 data={formData} onChange={handleChange} />
<Step02 data={formData} onChange={handleChange} />
<Step03 data={formData} />
```

**Data flow:**
```
Step1 (name: "John") → Change step → Step2
  ↓
formData still has name: "John"
  ↓
Go back to Step1
  ↓
Input still shows "John" ✅
```

**Key insight:** State must live in parent that stays mounted!

---

### **11. How would you validate async (e.g., check if email exists)?**

**Answer:**
Use async/await to check with server, update validation state while checking.

**Implementation:**
```tsx
const [isChecking, setIsChecking] = useState(false);
const [emailError, setEmailError] = useState("");

const validateEmailAsync = async (email: string) => {
  setIsChecking(true);
  
  try {
    const response = await fetch(`/api/check-email?email=${email}`);
    const { exists } = await response.json();
    
    if (exists) {
      setEmailError("Email already registered");
    } else {
      setEmailError("");
    }
  } catch (error) {
    setEmailError("Error checking email");
  } finally {
    setIsChecking(false);
  }
};

// Call on blur
const handleEmailBlur = (email: string) => {
  validateEmailAsync(email);
};
```

**In your form:**
```tsx
<input
  value={data.email}
  onChange={(e) => onChange("email", e.target.value)}
  onBlur={(e) => validateEmailAsync(e.target.value)}
/>

{emailError && <span style={{ color: "red" }}>{emailError}</span>}

{isChecking && <span>Checking...</span>}
```

**Current implementation:** Uses synchronous validation. Async adds power!

---

## **REAL-WORLD**

### **14. How would you add field-level validation with error messages?**

**Answer:**
Track errors separately, show messages conditionally.

**Implementation:**
```tsx
type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
};

const [errors, setErrors] = useState<FormErrors>({});

const validateStep01 = (): boolean => {
  const newErrors: FormErrors = {};
  
  if (!data.name.trim()) {
    newErrors.name = "Name is required";
  }
  
  if (!data.email.includes("@")) {
    newErrors.email = "Valid email required";
  }
  
  if (data.phone.length !== 10) {
    newErrors.phone = "Phone must be 10 digits";
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// In Step01:
const handleNext = () => {
  if (validateStep01()) {
    onNext();
  }
};

// Show error under field:
<div>
  <input value={data.name} onChange={(e) => onChange("name", e.target.value)} />
  {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
</div>
```

**Your current form:** Doesn't show specific error messages. This adds that feature!

---

### **15. How would you prefill form from API data?**

**Answer:**
Fetch data on mount, set formData with API response.

**Implementation:**
```tsx
import { useEffect } from "react";

export default function CheckoutForm() {
  const { step, next, back } = useMultiStepForm(3);
  const [formData, setFormData] = useState<FormData>({...});

  // Fetch and prefill on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile");
        const userData = await response.json();
        
        setFormData({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          fathername: userData.fathername,
          fatheremail: userData.fatheremail,
          fatherphone: userData.fatherphone,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);  // Run only on mount

  // Rest of component...
}
```

**User experience:**
```
Page loads
  ↓
Fetch user data from server
  ↓
Inputs auto-fill with user's existing data
  ↓
User can review and edit
  ↓
Submit with changes
```

**For your app:** Could prefill father's data from saved profile.

---

### **17. How would you handle cross-step validation (e.g., father's details must be different from user)?**

**Answer:**
Validate across all fields when submitting, not just current step.

**Implementation:**
```tsx
const validateAllSteps = (): boolean => {
  const errors = [];

  // Step 1 validation
  if (!formData.name) errors.push("Name required");
  if (!formData.email) errors.push("Email required");
  if (!formData.phone) errors.push("Phone required");

  // Step 2 validation
  if (!formData.fathername) errors.push("Father's name required");
  if (!formData.fatheremail) errors.push("Father's email required");
  if (!formData.fatherphone) errors.push("Father's phone required");

  // CROSS-VALIDATION: Check they're different
  if (formData.name === formData.fathername) {
    errors.push("Father's name must be different from your name");
  }

  if (formData.email === formData.fatheremail) {
    errors.push("Father's email must be different from your email");
  }

  if (formData.phone === formData.fatherphone) {
    errors.push("Father's phone must be different from your phone");
  }

  if (errors.length > 0) {
    alert("Errors:\n" + errors.join("\n"));
    return false;
  }

  return true;
};

// In handleSubmit:
const handleSubmit = () => {
  if (validateAllSteps()) {
    console.log("FINAL DATA:", formData);
    alert("Form submitted!");
  }
};
```

**When to validate:**
- **Per-step validation:** When clicking Next (quick feedback)
- **Cross-step validation:** When clicking Submit (final check)

**Your current approach:** Validates current step only. Add cross-validation for robustness!

---
