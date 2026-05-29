# WhatsApp Floating Button

## Static HTML snippet

```html
<link rel="stylesheet" href="/assets/css/whatsapp-floating.css">
<script src="/assets/js/whatsapp-floating.js"></script>
```

The JavaScript injects this button automatically:

```html
<a
  class="whatsapp-float"
  href="https://wa.me/8615156147667?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details."
  target="_blank"
  rel="noopener"
  aria-label="Contact RONGWIN on WhatsApp">
  WhatsApp icon
</a>
```

## React / Next.js component

```jsx
export default function WhatsAppFloat() {
  const phone = "8615156147667";
  const text = encodeURIComponent(
    "Hello, I am interested in your products. Please send me more details."
  );

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener"
      aria-label="Contact RONGWIN on WhatsApp"
    >
      <span className="whatsapp-float__label">Chat on WhatsApp</span>
      {/* Use the same SVG icon from assets/js/whatsapp-floating.js */}
    </a>
  );
}
```

## Phone number

Current number:

```text
+86 15156147667
```

Official WhatsApp link format:

```text
https://wa.me/8615156147667?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details.
```
