(function () {
  const form = document.getElementById("b2bInquiryForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const submitButton = form.querySelector("button[type='submit']");
  const endpoint = form.dataset.endpoint || window.RONGWIN_INQUIRY?.endpoint || "";

  const validators = {
    name: (value) => value.trim().length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    phone: (value) => /^[+]?[(]?[0-9][0-9\s().-]{6,}$/.test(value.trim()),
  };

  function setFieldState(input, valid) {
    const field = input.closest(".field");
    if (!field) return;
    field.classList.toggle("is-invalid", !valid);
  }

  function validateForm() {
    let isValid = true;
    ["name", "email", "phone"].forEach((name) => {
      const input = form.elements[name];
      const valid = validators[name](input.value);
      setFieldState(input, valid);
      if (!valid) isValid = false;
    });
    return isValid;
  }

  ["name", "email", "phone"].forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => setFieldState(input, validators[name](input.value)));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("is-invalid")) {
        setFieldState(input, validators[name](input.value));
      }
    });
  });

  async function submitToEndpoint(data) {
    if (window.RONGWIN_INQUIRY?.submit) {
      await window.RONGWIN_INQUIRY.submit(data, "Detailed Inquiry");
      return { ok: true };
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return { ok: response.ok };
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.className = "form-status";

    if (form.elements.website.value) {
      status.textContent = "Submission blocked.";
      status.classList.add("error");
      return;
    }

    if (!validateForm()) {
      status.textContent = "Please complete all required fields before submitting.";
      status.classList.add("error");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    status.textContent = "Sending your inquiry...";

    try {
      const result = await submitToEndpoint(data);
      if (!result.ok) throw new Error("Submit failed");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit",
        form_name: "b2b_inquiry",
        product_interest: data.product_requirement || "",
        country: data.country || "",
      });

      status.textContent = "Thank you. Your inquiry has been submitted successfully.";
      status.classList.add("success");
      form.reset();
    } catch (error) {
      status.textContent = "Submission failed. Please try again or contact us on WhatsApp.";
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Inquiry";
    }
  });
})();
