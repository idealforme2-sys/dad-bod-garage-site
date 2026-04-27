export function icon(name) {
  return `<i class="fa-solid ${name}" aria-hidden="true"></i>`;
}

export function sectionHead(eyebrow, title, copy = "") {
  return `
    <div class="section-head">
      ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}
      <h2>${title}</h2>
      ${copy ? `<p class="text-muted">${copy}</p>` : ""}
    </div>
  `;
}

export function pageHero(title, copy) {
  return `
    <section class="page-hero" data-animate data-animate-immediate>
      <div class="container page-hero-grid">
        <span class="eyebrow page-hero-eyebrow">Dad Bod Garage</span>
        <h1 class="split-target">${title}</h1>
        <p class="text-muted">${copy}</p>
      </div>
    </section>
  `;
}

export function stars() {
  return `<div class="stars">${Array.from({ length: 5 }, () => icon("fa-star")).join("")}</div>`;
}

export function serviceButton(item) {
  return `
    <button class="service-card" type="button" data-service="${item.service}">
      ${icon(item.icon)}
      <span>${item.name}</span>
    </button>
  `;
}

export function checkList(items) {
  return `
    <ul class="check-list">
      ${items.map((item) => `<li>${icon("fa-check")}<span>${item}</span></li>`).join("")}
    </ul>
  `;
}
