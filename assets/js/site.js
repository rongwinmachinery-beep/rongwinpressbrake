window.dataLayer = window.dataLayer || [];

function track(event, extra = {}) {
  window.dataLayer.push({
    event,
    page_path: location.pathname,
    language: document.documentElement.lang || "en",
    ...extra,
  });
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-track]");
  if (!target) return;
  track(target.dataset.track, {
    link_url: target.href || "",
    link_text: target.textContent.trim(),
  });
});

document.querySelectorAll("[data-form='rfq']").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    track("form_submit", {
      product_interest: data.product_interest || "",
      country: data.country || "",
    });
    form.innerHTML = "<div class='panel'><h2>Thank you.</h2><p>Your RFQ details are ready for the RONGWIN sales team. Please also contact us on WhatsApp for the fastest response.</p><a class='button' href='https://wa.me/8615156147667'>Continue on WhatsApp</a></div>";
  });
});
