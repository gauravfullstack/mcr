
## **MINIMAL REACT HOOK FORM EXAMPLE**

```javascript
import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });
  
  const onSubmit = (data) => {
    console.log('Submitted:', data);
    // Send to server
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('name', { required: 'Name required' })}
        placeholder="Name"
      />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input 
        {...register('email', { 
          required: 'Email required',
          pattern: { value: /^\S+@\S+$/, message: 'Valid email required' }
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <textarea 
        {...register('message', { required: 'Message required' })}
        placeholder="Message"
      />
      {errors.message && <span>{errors.message.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
```

**That's literally all you need to know.**

---

## **HOW TO ANSWER INTERVIEW QUESTION**

**If they ask:** "Have you used form libraries?"

**You answer:**
> "Yes, I've used React Hook Form in production. It's much simpler than manual form handling. You register inputs, pass validation rules, and it handles all the state and error management. Way less boilerplate than manual useState approach."

**If they ask:** "Formik vs React Hook Form?"

**You answer:**
> "Both do the same thing. Formik is more established but has more boilerplate. React Hook Form is lighter and simpler. I prefer React Hook Form for new projects because it's smaller and cleaner."

**If they ask:** "Why use them instead of manual state?"

**You answer:**
> "Manual state works fine for simple forms. But for complex forms with validation, dynamic fields, error handling, it gets messy fast. Form libraries handle all that boilerplate, reduce bugs, and perform better with less re-renders."

---
