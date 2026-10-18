const CONTACT_EMAIL = "info@dallaviaweb.it";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.classList.toggle("active", !isOpen);
  navigation.classList.toggle("open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.classList.remove("active");
    navigation.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelector("#contact-button").addEventListener("click", () => {
  const panel = document.querySelector("#contact-panel");
  panel.hidden = !panel.hidden;
  if (!panel.hidden) document.querySelector("#project-message").focus();
});

document.querySelector("#email-button").addEventListener("click", () => {
  const message = document.querySelector("#project-message").value.trim();
  const subject = encodeURIComponent("Nuovo progetto — richiesta informazioni");
  const body = encodeURIComponent(message || "Ciao, vorrei parlarti di un progetto.");
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
