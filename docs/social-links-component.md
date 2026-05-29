# Social Links Component

## Config JSON

Edit account links here:

```text
assets/data/social-links.json
```

```json
{
  "facebook": "https://www.facebook.com/RongwinTools",
  "instagram": "https://www.instagram.com/rongwinmachinery/",
  "linkedin": "https://www.linkedin.com/company/rongwinmachinery/"
}
```

## Static HTML usage

```html
<link rel="stylesheet" href="/assets/css/social-links.css">
<div data-social-links></div>
<script src="/assets/js/social-links.js"></script>
```

## React / Next.js component

```jsx
const socialLinks = {
  facebook: "https://www.facebook.com/RongwinTools",
  instagram: "https://www.instagram.com/rongwinmachinery/",
  linkedin: "https://www.linkedin.com/company/rongwinmachinery/",
};

export default function SocialLinks() {
  return (
    <div className="social-links">
      <span className="social-links__label">Follow RONGWIN</span>
      <a href={socialLinks.facebook} target="_blank" rel="noopener" aria-label="Facebook">Facebook</a>
      <a href={socialLinks.instagram} target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
      <a href={socialLinks.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>
    </div>
  );
}
```
