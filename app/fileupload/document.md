Functional Requirements:

1. User can click to select a file from their device.
2. Validate file type — only JPG, PNG, WEBP allowed.
3. Validate file size — max 2MB allowed.
4. If validation fails → show error message.
5. If validation passes → show image preview.
6. Show file name below the preview.



Data Model:

1. ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
2. MAX_SIZE_MB = 2

3. No complex type needed — browser File object is used directly
   File = { name: string, size: number, type: string }



High Level Design:

app
  file-upload
    components
      FileUpload.tsx     → input + validation + preview UI
    constants
      index.ts           → ALLOWED_TYPES, MAX_SIZE_MB
    types
      index.ts
    page.tsx



Business Logic:

1. State
   - preview: string | null   → blob URL for image preview
   - fileName: string | null  → name of selected file
   - error: string | null     → validation error message

2. validate(file)
   - Separate function — returns error string or null
   - Check file.type → if not in ALLOWED_TYPES → return error
   - Check file.size → if > MAX_SIZE_MB * 1024 * 1024 → return error
   - If all pass → return null

3. handleFile(file)
   - Reset all state first → error, preview, fileName = null
   - Call validate(file)
   - If error → setError → return early
   - If valid → setPreview(URL.createObjectURL(file))
   - Set fileName from file.name

4. handleChange(e)
   - Get file from e.target.files?.[0]
   - If file exists → call handleFile(file)

5. URL.createObjectURL(file)
   - Converts file to temporary local blob URL
   - No server upload needed
   - Used directly in <img src={preview} />

6. Hidden input + label trick
   - input type="file" → display: none
   - Clicking label triggers hidden input
   - Allows full custom styling on label