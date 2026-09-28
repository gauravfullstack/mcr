Functional Requirements:

1. User can trigger success, error and info notifications.
2. Each notification shows a message and close button.
3. Notification auto-dismisses after 3 seconds.
4. User can manually close notification using close button.
5. Multiple notifications can appear at the same time.
6. Notifications appear at bottom-right of the screen.
7. Each notification has a different color based on type.



Data Model:

1. ToastType = 'success' | 'error' | 'info'

2. Toast = {
     id: string,
     message: string,
     type: ToastType
   }



High Level Design:

app
  toast
    components
      Toast.tsx           → single toast UI
      ToastContainer.tsx  → renders all toasts via Portal
    hooks
      useToast.ts         → all logic here
    types
      index.ts
    page.tsx



Business Logic:

1. State — single `toasts` array in useToast.ts
   manages all active toasts together.

2. addToast(message, type)
   - Create new toast: { id: crypto.randomUUID(), message, type }
   - Immutable update using spread → [...toasts, newToast]
   - Start auto-dismiss: setTimeout(() => removeToast(id), 3000)

3. removeToast(id)
   - Filter out toast with matching id
   - Immutable update using .filter()

4. Auto-dismiss
   - setTimeout tied to each toast's unique id
   - Fires removeToast after 3000ms automatically

5. Manual close
   - Close button in Toast.tsx calls removeToast(id)
   - Removes toast immediately without waiting for timer

6. Portal
   - ToastContainer renders via createPortal into document.body
   - Ensures correct z-index and positioning
   - Always appears on top of all content

7. Toast type styling
   - success → green background
   - error   → red background
   - info    → blue background
   - Applied via CSS module class matching type name