(function () {
  if (document.querySelector(".whatsapp-float")) return;

  const phone = "8615156147667";
  const message = "Hello, I am interested in your products. Please send me more details.";
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  if (document.querySelector(".sticky-cta")) {
    document.body.classList.add("has-bottom-sticky");
  }

  const link = document.createElement("a");
  link.className = "whatsapp-float";
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener";
  link.setAttribute("aria-label", "Contact RONGWIN on WhatsApp");
  link.setAttribute("data-track", "whatsapp_click");
  link.innerHTML = `
    <span class="whatsapp-float__label">Chat on WhatsApp</span>
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16.03 3.2c-6.98 0-12.66 5.59-12.66 12.47 0 2.19.59 4.34 1.72 6.21L3.2 28.8l7.13-1.85a12.9 12.9 0 0 0 5.7 1.34c6.98 0 12.66-5.59 12.66-12.46S23.01 3.2 16.03 3.2Zm0 22.98c-1.88 0-3.72-.5-5.32-1.45l-.38-.23-4.23 1.1 1.13-4.04-.25-.41a10.18 10.18 0 0 1-1.5-5.32c0-5.72 4.73-10.37 10.55-10.37s10.55 4.65 10.55 10.37-4.73 10.35-10.55 10.35Zm5.78-7.75c-.32-.16-1.87-.91-2.16-1.01-.29-.11-.5-.16-.71.16-.21.31-.81 1-.99 1.2-.18.21-.36.23-.68.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.58-1.86-1.76-2.17-.18-.31-.02-.48.14-.64.14-.14.32-.36.47-.54.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.69-.97-2.31-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.06-1.1 2.59s1.13 3.01 1.29 3.22c.16.21 2.23 3.36 5.4 4.71.75.32 1.34.51 1.8.65.76.24 1.45.21 1.99.13.61-.09 1.87-.75 2.14-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.61-.36Z"/>
    </svg>
  `;

  document.body.appendChild(link);
})();
