import { symptoms } from "./data/site.js";
import { AboutPage } from "./components/about.js";
import { ContactPage } from "./components/contact.js";
import { HomePage } from "./components/home.js";
import { Footer, Header, MapBlock, MobileCta } from "./components/layout.js";
import { QuotePage } from "./components/quote.js";
import { ServicesPage } from "./components/services.js";
import { checkList, icon } from "./components/shared.js";
import {
  contactBody,
  copyText,
  formDataToObject,
  mailto,
  postSubmission,
  quoteBody,
  saveLocalBackup,
  validateForm
} from "./lib/forms.js";

const app = document.getElementById("app");
const routes = new Set(["home", "services", "quote", "about", "contact"]);
let currentRoute = "home";
let quotePrefill = {};
let selectedSymptomKey = "check-engine";
let lastDraft = null;
let observer = null;
let introReady = false;
let isRouting = false;
let pendingRoute = null;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function getRouteFromHash() {
  const route = window.location.hash.replace("#", "");
  return routes.has(route) ? route : "home";
}

function setRoute(route, options = {}) {
  navigateToRoute(route, { ...options, updateHash: true });
}

function navigateToRoute(route, options = {}) {
  const nextRoute = routes.has(route) ? route : "home";
  const shouldRenderSameRoute = Boolean(options.prefill);

  if (isRouting) return;

  if (nextRoute === currentRoute && !shouldRenderSameRoute) {
    if (options.updateHash && window.location.hash !== `#${nextRoute}`) {
      window.history.pushState(null, "", `#${nextRoute}`);
    }
    return;
  }

  const transition = document.getElementById("transition-wrapper");
  const canTransition = transition && !reducedMotion.matches;
  isRouting = true;
  pendingRoute = nextRoute;

  if (canTransition) {
    transition.classList.add("is-transitioning");
  }

  window.setTimeout(() => {
    if (options.prefill) {
      quotePrefill = options.prefill;
    }

    currentRoute = nextRoute;

    if (options.updateHash && window.location.hash !== `#${nextRoute}`) {
      window.history.pushState(null, "", `#${nextRoute}`);
    }

    render();
    window.scrollTo({ top: 0, behavior: "auto" });

    if (canTransition) {
      transition.classList.remove("is-transitioning");
      window.setTimeout(() => {
        isRouting = false;
        pendingRoute = null;
      }, 600);
      return;
    }

    isRouting = false;
    pendingRoute = null;
  }, canTransition ? 600 : 0);
}

function routeMarkup() {
  if (currentRoute === "services") return ServicesPage();
  if (currentRoute === "quote") return QuotePage(quotePrefill);
  if (currentRoute === "about") return AboutPage();
  if (currentRoute === "contact") return ContactPage();
  return HomePage();
}

function render() {
  app.innerHTML = `
    <div class="page-shell">
      ${Header(currentRoute)}
      ${routeMarkup()}
      ${MapBlock()}
      ${Footer()}
      ${MobileCta()}
    </div>
  `;

  bindPageBehavior();
  bindInteractiveEffects();
  initRevealAnimations();
  initTextReveal(app);
  updateEventBanner();
  updateHoursStatus();
  if (currentRoute !== "quote") {
    quotePrefill = {};
  }
}

function initPreloader() {
 const preloader = document.getElementById("preloader");
 const count = document.getElementById("counter") || document.querySelector("[data-loader-count]");
 const text = document.querySelector("[data-loader-text]");
 const counterWrap = document.querySelector(".counter");
 const progressBar = document.getElementById("loading-bar") || document.querySelector(".preloader-progress-bar");
 if (!preloader) {
 introReady = true;
 triggerTextReveal(app);
 return;
 }

 preloader.classList.remove("hide");
 preloader.hidden = false;
 if (count) count.textContent = "0";
 if (text) text.textContent = "Initializing...";
 if (progressBar) progressBar.style.width = "0%";
 if (counterWrap) {
 counterWrap.style.transform = "translateY(100%)";
 requestAnimationFrame(() => {
 counterWrap.style.transition = "transform 0.55s cubic-bezier(0.85, 0, 0.15, 1)";
 counterWrap.style.transform = "translateY(0)";
 });
 }

 const start = performance.now();
 const duration = 1400;
 const phases = [
 { at: 0.15, text: "Loading assets..." },
 { at: 0.4, text: "Preparing garage..." },
 { at: 0.7, text: "Warming up diagnostics..." },
 { at: 0.9, text: "Almost there..." },
 { at: 1, text: "Ready" }
 ];

 function tick(now) {
 const progress = Math.min(1, (now - start) / duration);
 const value = Math.round(progress * 100);
 if (count) count.textContent = String(value);
 if (progressBar) progressBar.style.width = `${value}%`;

 const currentPhase = phases.filter(p => progress >= p.at).pop();
 if (text && currentPhase) text.textContent = currentPhase.text;

 if (progress < 1) {
 requestAnimationFrame(tick);
 return;
 }

 window.setTimeout(() => {
 if (counterWrap) counterWrap.style.transform = "translateY(-100%)";
 window.setTimeout(() => {
 preloader.classList.add("hide");
 window.setTimeout(() => {
 preloader.hidden = true;
 introReady = true;
 triggerTextReveal(app);
 }, 800);
 }, 450);
 }, 300);
 }

 requestAnimationFrame(tick);
}

function initTextReveal(root = document) {
  splitText(root);

  if (introReady || reducedMotion.matches) {
    requestAnimationFrame(() => triggerTextReveal(root));
  }
}

function ensureMagneticLabel(element) {
  if (element.dataset.magneticPrepared === "true") return;
  if (element.querySelector(".magnetic-label")) {
    element.dataset.magneticPrepared = "true";
    return;
  }

  const label = document.createElement("span");
  label.className = "magnetic-label";

  while (element.firstChild) {
    label.appendChild(element.firstChild);
  }

  element.appendChild(label);
  element.dataset.magneticPrepared = "true";
}

function splitText(root = document) {
  root.querySelectorAll(".split-target").forEach((element) => {
    if (element.dataset.split === "true") return;

    const lines = element.innerHTML.split(/<br\s*\/?>/i);
    element.innerHTML = "";

    lines.forEach((line, index) => {
      const wrap = document.createElement("span");
      const char = document.createElement("span");

      wrap.className = "text-wrap";
      char.className = "char";
      char.style.transitionDelay = `${index * 100}ms`;
      char.innerHTML = line.trim() || "&nbsp;";

      wrap.appendChild(char);
      element.appendChild(wrap);

      if (index < lines.length - 1) {
        element.appendChild(document.createElement("br"));
      }
    });

    element.dataset.split = "true";
  });
}

function triggerTextReveal(root = document) {
  root.querySelectorAll(".split-target").forEach((element) => {
    element.classList.remove("animate-in");
    void element.offsetWidth;
    element.classList.add("animate-in");
  });
}

function initCustomCursor() {
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");

  if (!cursorDot || !cursorRing || reducedMotion.matches || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  document.body.classList.add("custom-cursor-enabled");

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    document.body.classList.add("cursor-ready");
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }

  renderCursor();
}

function bindInteractiveEffects(root = document) {
  root.querySelectorAll("a, button, .brand, .interactive").forEach((element) => {
    if (element.dataset.interactiveBound === "true") return;
    element.dataset.interactiveBound = "true";

    element.addEventListener("mouseenter", () => {
      document.body.classList.add("hovering");
    });

    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("hovering");
    });
  });

  if (reducedMotion.matches || !window.matchMedia("(pointer: fine)").matches) return;

  root.querySelectorAll(".btn, .brand, .service-card, .contact-card, .symptom-chip, .mobile-menu-button, .nav-link, .nav-phone").forEach((element) => {
    if (element.dataset.magneticBound === "true") return;
    element.dataset.magneticBound = "true";
    ensureMagneticLabel(element);

    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const label = element.querySelector(".magnetic-label") || element;
      element.style.transition = "none";
      label.style.transition = "none";
      element.style.transform = `translate(${x * 0.05}px, ${y * 0.07}px)`;
      label.style.transform = `translate(${x * 0.12}px, ${y * 0.16}px)`;
    });

    element.addEventListener("mouseleave", () => {
      const label = element.querySelector(".magnetic-label") || element;
      element.style.transition = "transform 0.45s ease";
      label.style.transition = "transform 0.45s ease";
      element.style.transform = "translate(0, 0)";
      label.style.transform = "translate(0, 0)";

      window.setTimeout(() => {
        element.style.transition = "";
        label.style.transition = "";
        element.style.transform = "";
        label.style.transform = "";
      }, 460);
    });
  });
}

function initRevealAnimations() {
  const elements = [...document.querySelectorAll("[data-animate]")];
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    document.documentElement.classList.remove("motion-ready");
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  document.documentElement.classList.add("motion-ready");

  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });

  elements.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    if (typeof element.dataset.animateImmediate !== "undefined" || top < window.innerHeight * 0.92) {
      element.classList.add("is-visible");
      return;
    }

    observer.observe(element);
  });
}

function bindPageBehavior() {
 document.querySelectorAll("[data-route]").forEach((button) => {
 button.addEventListener("click", () => {
 const route = button.dataset.route;
 closeMobileMenu();
 setRoute(route);
 });
 });

 const menuToggle = document.querySelector("[data-menu-toggle]");
 const mobileMenu = document.querySelector("[data-mobile-menu]");
 if (menuToggle && mobileMenu) {
 menuToggle.addEventListener("click", () => {
 const isOpen = mobileMenu.classList.toggle("open");
 menuToggle.setAttribute("aria-expanded", String(isOpen));
 });
 }

 document.querySelectorAll("[data-service]").forEach((button) => {
 button.addEventListener("click", () => {
 setRoute("quote", { prefill: { service: button.dataset.service } });
 });
 });

 bindSymptoms();
 bindFaqs();
 bindForms();
 initCounterAnimations();
 }

function closeMobileMenu() {
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function bindSymptoms() {
  const chips = [...document.querySelectorAll("[data-symptom]")];
  const result = document.querySelector("[data-symptom-result]");
  if (!chips.length || !result) return;

  const renderSymptom = (key) => {
    selectedSymptomKey = symptoms[key] ? key : "check-engine";
    const selected = symptoms[selectedSymptomKey];

    chips.forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.symptom === selectedSymptomKey);
    });

    result.classList.add("is-changing");

    window.setTimeout(() => {
    result.innerHTML = `
      <span class="priority">Priority: ${selected.priority}</span>
      <h3>${selected.title}</h3>
      <p class="text-muted">${selected.copy}</p>
      ${checkList(selected.steps)}
      <div class="actions">
        <button class="btn btn-primary" type="button" data-symptom-quote>
          ${icon("fa-file-lines")} Use This In My Estimate
        </button>
        <a class="btn btn-secondary" href="tel:5207520453">${icon("fa-phone")} Call First</a>
      </div>
    `;

    result.querySelector("[data-symptom-quote]").addEventListener("click", () => {
      setRoute("quote", {
        prefill: {
          service: selected.service,
          urgency: selected.urgency,
          message: selected.message
        }
      });
    });
      result.classList.remove("is-changing");
    }, result.innerHTML ? 130 : 0);
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => renderSymptom(chip.dataset.symptom));
  });

  renderSymptom(selectedSymptomKey);
}

function bindFaqs() {
 document.querySelectorAll("[data-faq-toggle]").forEach((button) => {
 button.addEventListener("click", () => {
 const item = button.closest(".faq-item");
 const isOpen = item.classList.toggle("open");
 button.setAttribute("aria-expanded", String(isOpen));
 });
 });
 }

 function initCounterAnimations() {
 const counters = document.querySelectorAll("[data-counter]");
 if (!counters.length) return;

 if (!("IntersectionObserver" in window)) {
 counters.forEach(c => {
 const value = c.querySelector("[data-counter-value]");
 if (value) value.textContent = c.dataset.target;
 });
 return;
 }

 const observer = new IntersectionObserver((entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 const el = entry.target;
 const target = el.dataset.target;
 const delay = parseInt(el.dataset.delay) || 0;
 animateCounter(el, target, delay);
 observer.unobserve(el);
 }
 });
 }, { threshold: 0.5 });

 counters.forEach((counter) => observer.observe(counter));
 }

 function animateCounter(el, target, delay) {
 const valueEl = el.querySelector("[data-counter-value]");
 if (!valueEl) return;

 setTimeout(() => {
 const isNumeric = /^\d+(\.\d+)?$/.test(target.replace(/[$,]/g, ''));
 const prefix = target.match(/^[^0-9]*/)?.[0] || '';
 const suffix = target.match(/[^0-9.]*$/)?.[0] || '';
 const endNum = parseFloat(target.replace(/[^0-9.]/g, ''));

 if (!isNumeric) {
 valueEl.textContent = target;
 return;
 }

 const duration = 1500;
 const start = performance.now();

 function tick(now) {
 const progress = Math.min(1, (now - start) / duration);
 const eased = 1 - Math.pow(1 - progress, 3);
 const current = endNum * eased;
 valueEl.textContent = `${prefix}${current.toFixed(endNum % 1 !== 0 ? 2 : 0)}${suffix}`;
 if (progress < 1) requestAnimationFrame(tick);
 else valueEl.textContent = target;
 }

 requestAnimationFrame(tick);
 }, delay);
 }

function bindForms() {
  document.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => field.classList.remove("field-error"));
    field.addEventListener("change", () => field.classList.remove("field-error"));
  });

  document.querySelectorAll("[data-form]").forEach((form) => {
    form.addEventListener("submit", handleSubmit);
  });

  bindDraftCopyButtons();
}

function bindDraftCopyButtons() {
  document.querySelectorAll("[data-copy-draft]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!lastDraft) return;
      const ok = await copyText(lastDraft.body);
      button.innerHTML = ok ? `${icon("fa-check")} Copied` : `${icon("fa-triangle-exclamation")} Copy Failed`;
    });
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const type = form.dataset.form;
  const status = document.querySelector(`[data-status="${type}"]`);

  if (!validateForm(form)) return;

  const data = formDataToObject(form);
  const body = type === "quote" ? quoteBody(data) : contactBody(data);
  const subject = type === "quote"
    ? `Estimate request - ${data.year} ${data.make} ${data.model}`
    : `Website message from ${data.name}`;

  lastDraft = { subject, body, href: mailto(subject, body) };
  showStatus(status, "Saving your request...", false);

  try {
    const response = await postSubmission(type, data);
    saveLocalBackup(type, data);
    showStatus(status, `${response.message} Confirmation: ${response.id}`, false, true);
    form.reset();
  } catch (error) {
    saveLocalBackup(type, data);
    showStatus(
      status,
      `The local API was unavailable, so your details were backed up in this browser. You can open an email draft or copy the details. ${error.message}`,
      true,
      true
    );
  }
}

function showStatus(status, message, error = false, includeDraftActions = false) {
  if (!status) return;

  status.classList.add("active");
  status.classList.toggle("error", error);
  status.innerHTML = `
    <strong>${error ? "Needs attention" : "Success"}</strong>
    <p>${message}</p>
    ${includeDraftActions && lastDraft ? `
      <div class="actions">
        <a class="btn btn-secondary" href="${lastDraft.href}">${icon("fa-envelope-open-text")} Open Email Draft</a>
        <button class="btn btn-secondary" type="button" data-copy-draft>${icon("fa-copy")} Copy Details</button>
      </div>
    ` : ""}
  `;

  bindDraftCopyButtons();
}

function updateHoursStatus() {
  const target = document.querySelector("[data-hours-status]");
  if (!target) return;

  const nowAz = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Phoenix" }));
  const day = nowAz.getDay();
  const minutes = nowAz.getHours() * 60 + nowAz.getMinutes();
  const schedule = {
    1: [480, 960],
    2: [480, 960],
    4: [480, 960],
    5: [480, 960],
    6: [600, 900]
  };
  const today = schedule[day];

  if (today && minutes >= today[0] && minutes < today[1]) {
    target.textContent = `Open now - closes at ${formatTime(today[1])} AZ time`;
    return;
  }

  if (day === 0) {
    target.textContent = "By appointment today - call or request an estimate";
    return;
  }

  target.textContent = "Closed now - request an estimate and we will follow up";
}

function formatTime(minutes) {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${hour24 >= 12 ? "PM" : "AM"}`;
}

function updateEventBanner() {
  const banner = document.querySelector("[data-event-banner]");
  if (!banner) return;
  const eventEnd = new Date("2026-05-01T00:00:00-07:00");
  banner.hidden = new Date() >= eventEnd;
}

function handleHistoryRoute() {
  const route = getRouteFromHash();
  if (route === currentRoute || route === pendingRoute) return;
  navigateToRoute(route, { updateHash: false });
}

window.addEventListener("popstate", handleHistoryRoute);
window.addEventListener("hashchange", handleHistoryRoute);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
});

currentRoute = getRouteFromHash();
if (!window.location.hash) {
  window.history.replaceState(null, "", "#home");
}
initCustomCursor();
render();
initPreloader();
