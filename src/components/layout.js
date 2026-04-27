import { navItems, shop } from "../data/site.js";
import { icon } from "./shared.js";

function BrandLockup(tag = "button", attrs = "") {
  const content = `
    <span class="brand-logo-frame" aria-hidden="true">
      <img class="brand-logo" src="${shop.logo}" alt="">
    </span>
    <span class="brand-name">Dad Bod <span>Garage</span></span>
  `;

  if (tag === "button") {
    return `<button class="brand brand-lockup" type="button" data-route="home" ${attrs}>${content}</button>`;
  }

  return `<div class="brand brand-lockup" ${attrs}>${content}</div>`;
}

export function Header(route) {
  const nav = navItems.map((item) => `
    <button class="nav-link ${item.route === route ? "active" : ""}" type="button" data-route="${item.route}">
      ${item.label}
    </button>
  `).join("");
  const eventItems = [
    `${icon("fa-calendar-days")} Tri-City Business Expo`,
    `${icon("fa-clock")} April 30, 2026 @ 4:30 PM`,
    `${icon("fa-location-dot")} 778 N Main St, Florence`,
    `${icon("fa-wrench")} Meet James + Talk Shop`
  ];
  const ticker = [...eventItems, ...eventItems].map((item) => `
    <span class="event-banner-item">${item}</span>
  `).join("");

  return `
    <div class="event-banner" data-event-banner>
      <div class="event-banner-track">
        ${ticker}
      </div>
    </div>
    <header class="site-header">
      <div class="container nav">
        ${BrandLockup("button")}
        <nav class="desktop-nav" aria-label="Main navigation">
          ${nav}
          <a class="nav-phone" href="${shop.phoneHref}">${icon("fa-phone")} ${shop.phone}</a>
          <button class="btn btn-primary" type="button" data-route="quote">Get Estimate</button>
        </nav>
        <button class="mobile-menu-button" type="button" data-menu-toggle aria-label="Open navigation menu" aria-expanded="false">
          ${icon("fa-bars-staggered")}
        </button>
      </div>
      <nav class="mobile-menu" data-mobile-menu aria-label="Mobile navigation">
        ${nav}
        <a class="btn btn-secondary" href="${shop.phoneHref}">${icon("fa-phone")} Call ${shop.phone}</a>
        <button class="btn btn-primary" type="button" data-route="quote">Get Estimate</button>
      </nav>
    </header>
  `;
}

export function MapBlock() {
 const quickLinks = [
 { href: shop.phoneHref, icon: "fa-phone", label: "Call Us" },
 { href: shop.mapUrl, icon: "fa-directions", label: "Get Directions", target: "_blank" },
 { href: shop.emailHref, icon: "fa-envelope", label: "Email Us" }
 ];

 return `
 <section class="map-section" aria-label="Map and contact info">
 <div class="container">
 <div class="map-split">
 <div class="map-info" data-animate>
 <div class="map-info-header">
 ${icon("fa-map-location-dot")}
 <h3>Visit Dad Bod Garage</h3>
 </div>
 <p class="map-address">${shop.address}</p>
 <div class="map-actions">
 ${quickLinks.map(link => `
 <a class="btn btn-primary" href="${link.href}" ${link.target ? `target="${link.target}" rel="noopener"` : ""}>
 ${icon(link.icon)} ${link.label}
 </a>
 `).join("")}
 </div>
 <div class="map-hours-mini">
 <h4>${icon("fa-clock")} Business Hours</h4>
 <div class="map-hours-grid">
 ${shop.hours.map(([day, hours]) => `
 <div class="map-hours-row">
 <span class="map-hours-day">${day}</span>
 <span class="map-hours-time">${hours}</span>
 </div>
 `).join("")}
 </div>
 </div>
 </div>
 <div class="map-frame-wrapper" data-animate style="--delay: 150ms">
 <iframe
 class="map-frame"
 src="${shop.mapEmbed}"
 loading="lazy"
 referrerpolicy="no-referrer-when-downgrade"
 title="Map to Dad Bod Garage">
 </iframe>
 <div class="map-frame-overlay"></div>
 </div>
 </div>
 </div>
 </section>
 `;
 }

export function Footer() {
  const quickLinks = [
    ["home", "Home"],
    ["services", "Our Services"],
    ["about", "Meet The Owner"],
    ["quote", "Get an Estimate"],
    ["contact", "Contact"]
  ].map(([route, label]) => `<button type="button" data-route="${route}">${label}</button>`).join("");

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand-panel">
            ${BrandLockup("div")}
            <p class="text-muted">Diagnostics, not guessing. Premium auto repair for daily drivers, fleets, RVs, and classic cars in Coolidge, AZ.</p>
            <div class="actions">
              <a class="btn btn-secondary" href="${shop.phoneHref}">${icon("fa-phone")} Call</a>
              <a class="btn btn-secondary" href="${shop.emailHref}">${icon("fa-envelope")} Email</a>
              <a class="btn btn-secondary" href="${shop.mapUrl}" target="_blank" rel="noopener">${icon("fa-map-location-dot")} Directions</a>
              <a class="btn btn-secondary" href="${shop.instagramUrl}" target="_blank" rel="noopener" aria-label="Dad Bod Garage Instagram">
                <i class="fa-brands fa-instagram" aria-hidden="true"></i> Instagram
              </a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <div class="footer-links">${quickLinks}</div>
          </div>
          <div>
            <h4>We Fix It Right</h4>
            <div class="footer-links">
              <span>Check engine lights</span>
              <span>Car will not start</span>
              <span>Brake grinding</span>
              <span>Weak A/C</span>
              <span class="highlight">Stopping wasted parts money.</span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; 2026 Dad Bod Garage. All rights reserved.</span>
          <a href="https://creative-webflow.site/" target="_blank" rel="noopener" class="footer-designer-link">Made By Creative Webflow Co.</a>
          <span class="text-muted">Premium Auto Diagnostics & Precision Repair</span>
        </div>
      </div>
    </footer>
  `;
}

export function MobileCta() {
  return `
    <div class="mobile-cta">
      <a class="btn btn-secondary" href="${shop.phoneHref}">${icon("fa-phone")} Call</a>
      <button class="btn btn-primary" type="button" data-route="quote">Estimate</button>
    </div>
  `;
}
