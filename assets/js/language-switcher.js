document.querySelectorAll(".language-current").forEach((button) => {
  button.addEventListener("click", () => {
    const wrapper = button.closest(".language-switcher");
    const open = wrapper.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(open));
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".language-switcher")) return;
  document.querySelectorAll(".language-switcher.is-open").forEach((wrapper) => {
    wrapper.classList.remove("is-open");
    const button = wrapper.querySelector(".language-current");
    if (button) button.setAttribute("aria-expanded", "false");
  });
});
