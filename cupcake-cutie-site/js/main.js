/**
 * HUSTLE HUB SITES — core interactions only
 * - Mobile nav toggle
 * - Smooth scroll for in-page anchors
 * - FAQ accordion (one open at a time)
 * - Back-to-top visibility
 * - Centralized link wiring for CTA + socials
 */

const CONFIG = {
  // REPLACE THESE with the real client URLs
  bakesyOrderUrl: "https://REPLACE-WITH-BAKESY-LINK",
  googleReviewsUrl: "https://REPLACE-WITH-GOOGLE-REVIEWS-LINK",
  instagramUrl: "https://instagram.com/REPLACE-HANDLE"
};

// ---- Wire primary links (one source of truth)
document.querySelectorAll("[data-order-link]").forEach(el => {
  el.setAttribute("href", CONFIG.bakesyOrderUrl);
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

const reviews = document.querySelector("[data-google-reviews]");
if (reviews) {
  reviews.setAttribute("href", CONFIG.googleReviewsUrl);
}

const ig = document.querySelector("[data-instagram]");
if (ig) {
  ig.setAttribute("href", CONFIG.instagramUrl);
}

// ---- Mobile nav toggle
const toggle = document.querySelector("[data-nav-toggle]");
if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Close nav on link click (mobile)
document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) {
      document.body.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  });
});

// ---- Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ---- FAQ accordion (one open at a time)
const faqButtons = Array.from(document.querySelectorAll(".faq-item__button"));
faqButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const panelId = btn.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);
    if (!panel) return;

    const isExpanded = btn.getAttribute("aria-expanded") === "true";

    // close all
    faqButtons.forEach(b => {
      const pid = b.getAttribute("aria-controls");
      const p = document.getElementById(pid);
      if (p) p.hidden = true;
      b.setAttribute("aria-expanded", "false");
      const icon = b.querySelector(".faq-item__icon");
      if (icon) icon.textContent = "+";
    });

    // open selected (toggle behavior)
    if (!isExpanded) {
      panel.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      const icon = btn.querySelector(".faq-item__icon");
      if (icon) icon.textContent = "–";
    }
  });
});

// ---- Back to top visibility
const backToTop = document.querySelector("[data-back-to-top]");
const setYear = document.querySelector("[data-year]");
if (setYear) setYear.textContent = new Date().getFullYear();

function onScroll() {
  if (!backToTop) return;
  if (window.scrollY > 650) backToTop.classList.add("is-visible");
  else backToTop.classList.remove("is-visible");
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  });
}
