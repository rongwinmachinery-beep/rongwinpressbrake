window.dataLayer = window.dataLayer || [];

const RONGWIN_INQUIRY_ENDPOINT = "https://formsubmit.co/ajax/rongwinmachinery@gmail.com";

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

async function sendRongwinInquiry(data, formName) {
  const payload = {
    ...data,
    _subject: `New RONGWIN Website Inquiry - ${formName}`,
    _template: "table",
    _captcha: "false",
    _url: location.href,
    source_page: document.title,
  };

  const response = await fetch(RONGWIN_INQUIRY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === "false" || result.success === false) {
    throw new Error(result.message || "Inquiry submission failed");
  }

  return result;
}

window.RONGWIN_INQUIRY = {
  endpoint: RONGWIN_INQUIRY_ENDPOINT,
  submit: sendRongwinInquiry,
};

document.querySelectorAll("[data-form='rfq']").forEach((form) => {
  const honey = document.createElement("input");
  honey.type = "text";
  honey.name = "_honey";
  honey.tabIndex = -1;
  honey.autocomplete = "off";
  honey.setAttribute("aria-hidden", "true");
  honey.style.display = "none";
  form.append(honey);

  const status = document.createElement("p");
  status.className = "note wide";
  status.hidden = true;
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  form.append(status);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (data._honey) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    track("form_submit", {
      product_interest: data.product_interest || "",
      country: data.country || "",
    });

    const submitButton = form.querySelector("button[type='submit']");
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    status.hidden = false;
    status.style.borderLeftColor = "var(--blue)";
    status.textContent = "Sending your inquiry...";

    try {
      await sendRongwinInquiry(data, "Quick RFQ");
      form.reset();
      status.style.borderLeftColor = "var(--green)";
      status.textContent = "Thank you. Your inquiry has been sent to the RONGWIN sales team.";
    } catch (error) {
      status.style.borderLeftColor = "#c62828";
      status.textContent = "We could not send your inquiry. Please try again or contact us on WhatsApp.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
});
