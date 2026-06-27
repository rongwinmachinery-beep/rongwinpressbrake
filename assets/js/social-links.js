(function () {
  const defaults = {
    youtube: "https://www.youtube.com/rongwin",
    facebook: "https://www.facebook.com/RongwinTools",
    instagram: "https://www.instagram.com/rongwinmachinery/",
    linkedin: "https://www.linkedin.com/company/rongwinmachinery/",
  };

  const icons = {
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.1 8.1V6.7c0-.7.5-.9.9-.9h2.2V2.1L14.1 2c-3.5 0-4.3 2.6-4.3 4.3v1.8H7v3.8h2.8V22h4.1V11.9h3.1l.5-3.8h-3.4Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm0 2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2V7.2A3.2 3.2 0 0 0 16.8 4H7.2Zm4.8 3.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 2a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5-2.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.9 8.9H3V21h3.9V8.9ZM5 3a2.3 2.3 0 1 0 0 4.6A2.3 2.3 0 0 0 5 3Zm16 11.4c0-3.7-2-5.8-5-5.8-2.3 0-3.3 1.3-3.9 2.1V8.9H8.4V21h3.9v-6.4c0-1.7.3-3.3 2.4-3.3s2.1 1.9 2.1 3.4V21H21v-6.6Z"/></svg>',
  };

  const platforms = [
    ["youtube", "YouTube"],
    ["facebook", "Facebook"],
    ["instagram", "Instagram"],
    ["linkedin", "LinkedIn"],
  ];

  function render(links) {
    document.querySelectorAll("[data-social-links]").forEach((target) => {
      if (target.dataset.socialReady) return;
      target.dataset.socialReady = "true";
      target.classList.add("social-links");
      target.innerHTML = `
        <span class="social-links__label">Follow RONGWIN</span>
        ${platforms.map(([id, label]) => `<a href="${links[id]}" target="_blank" rel="noopener noreferrer" aria-label="RONGWIN ${label}" title="${label}" data-track="social_${id}">${icons[id]}</a>`).join("")}
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
