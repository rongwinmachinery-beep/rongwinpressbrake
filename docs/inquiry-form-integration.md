# B2B Inquiry Form Integration

## Static HTML page

The inquiry page is available at:

```text
/inquiry/
```

Files:

```text
inquiry/index.html
assets/css/inquiry-form.css
assets/js/inquiry-form.js
```

## Backend endpoint

The form is front-end validated, but email sending or database storage must happen on a server or a trusted form service.

Set the endpoint here:

```html
<form class="inquiry-card" id="b2bInquiryForm" novalidate data-endpoint="https://your-domain.com/api/inquiry">
```

The JavaScript sends JSON:

```json
{
  "name": "Jane",
  "email": "buyer@example.com",
  "phone": "+1 555 123 4567",
  "company": "Buyer Company",
  "country": "United States",
  "product_requirement": "Press Brake",
  "message": "Material, thickness, quantity..."
}
```

## Email or database options

- Custom backend: Node.js, PHP, Python, or serverless function sends email with SMTP and stores a lead row.
- Form service: Formspree, Basin, Getform, Netlify Forms, HubSpot Forms.
- CRM integration: submit to HubSpot, Zoho, Salesforce, or your own CRM API.

Do not put SMTP passwords, database credentials, or private API keys in the front-end HTML/JS.

## Anti-spam

Current built-in mechanism:

- HTML5 validation.
- Honeypot field named `website`.
- Required field validation for name, email, and phone.

Optional upgrades:

- Google reCAPTCHA.
- Cloudflare Turnstile.
- Server-side rate limiting.
- Block disposable email domains.

## React / JSX component template

```jsx
import { useState } from "react";

export default function InquiryForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.email || !data.phone) {
      setStatus("Please complete all required fields.");
      return;
    }

    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setStatus(response.ok ? "Submitted successfully." : "Submission failed.");
  }

  return (
    <form onSubmit={handleSubmit} className="inquiry-card">
      <input name="name" required placeholder="Your full name" />
      <input name="email" required type="email" placeholder="name@company.com" />
      <input name="phone" required type="tel" placeholder="+1 555 123 4567" />
      <input name="company" placeholder="Company name" />
      <input name="country" placeholder="Country / Region" />
      <input name="product_requirement" placeholder="Product requirement" />
      <textarea name="message" placeholder="Your project details" />
      <button type="submit">Submit Inquiry</button>
      <p>{status}</p>
    </form>
  );
}
```
