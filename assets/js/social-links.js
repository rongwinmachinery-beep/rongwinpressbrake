(function () {
  const defaults = {
    facebook: "https://www.facebook.com/RongwinTools",
    instagram: "https://www.instagram.com/rongwinmachinery/",
    linkedin: "https://www.linkedin.com/company/rongwinmachinery/",
  };

  const icons = {
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.1 8.1V6.7c0-.7.5-.9.9-.9h2.2V2.1L14.1 2c-3.5 0-4.3 2.6-4.3 4.3v1.8H7v3.8h2.8V22h4.1V11.9h3.1l.5-3.8h-3.4Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm0 2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2V7.2A3.2 3.2 0 0 0 16.8 4H7.2Zm4.8 3.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 2a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5-2.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.9 8.9H3V21h3.9V8.9ZM5 3a2.3 2.3 0 1 0 0 4.6A2.3 2.3 0 0 0 5 3Zm16 11.4c0-3.7-2-5.8-5-5.8-2.3 0-3.3 1.3-3.9 2.1V8.9H8.4V21h3.9v-6.4c0-1.7.3-3.3 2.4-3.3s2.1 1.9 2.1 3.4V21H21v-6.6Z"/></svg>',
  };

  function render(links) {
    document.querySelectorAll("[data-social-links]").forEach((target) => {
      if (target.dataset.socialReady) return;
      target.dataset.socialReady = "true";
      target.classList.add("social-links");
      target.innerHTML = `
        <span class="social-links__label">Follow RONGWIN</span>
        <a href="${links.facebook}" target="_blank" rel="noopener" aria-label="RONGWIN Facebook" data-track="social_facebook">${icons.facebook}</a>
        <a href="${links.instagram}" target="_blank" rel="noopener" aria-label="RONGWIN Instagram" data-track="social_instagram">${icons.instagram}</a>
        <a href="${links.linkedin}" target="_blank" rel="noopener" aria-label="RONGWIN LinkedIn" data-track="social_linkedin">${icons.linkedin}</a>
      `;
    });
  }

  const script = document.currentScript;
  const configUrl = script ? new URL("../data/social-links.json", script.src).href : "";

  if (location.protocol === "file:" || !configUrl) {
    render(defaults);
    return;
  }

  fetch(configUrl)
    .then((response) => (response.ok ? response.json() : defaults))
    .then((links) => render({ ...defaults, ...links }))
    .catch(() => render(defaults));
})();
