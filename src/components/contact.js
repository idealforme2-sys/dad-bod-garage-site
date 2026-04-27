import { shop } from "../data/site.js";
import { icon, pageHero } from "./shared.js";

export function ContactPage() {
  return `
    <main>
      ${pageHero("Find The Shop", "Call, message, or stop by Dad Bod Garage for a straight answer and the right next step.")}
      <section class="section">
        <div class="container contact-grid contact-shell">
          <div class="contact-stack" data-animate data-animate-immediate>
            <div class="contact-intro">
              <span class="eyebrow">Location & Hours</span>
              <h2 class="split-target">Visit Dad Bod Garage</h2>
              <p class="text-muted">We keep the process simple: call first, send a note, or pull up and let us know what the vehicle is doing.</p>
            </div>
            <a class="contact-card" href="${shop.mapUrl}" target="_blank" rel="noopener">
              ${icon("fa-location-dot")}
              <span>
                <strong>Visit The Shop</strong><br>
                ${shop.addressLines.join("<br>")}
              </span>
            </a>
            <div class="contact-card-row">
              <a class="contact-card" href="${shop.phoneHref}">
                ${icon("fa-phone")}
                <span><strong>Call Us</strong><br>${shop.phone}</span>
              </a>
              <a class="contact-card" href="${shop.emailHref}">
                ${icon("fa-envelope")}
                <span><strong>Email Us</strong><br>${shop.email}</span>
              </a>
            </div>
            <article class="panel hours-card">
              <div class="hours-card-head">
                <h3>Business Hours</h3>
                <p class="highlight" data-hours-status></p>
              </div>
              <ul class="hours-list">
                ${shop.hours.map(([day, hours]) => `<li><span>${day}</span><strong>${hours}</strong></li>`).join("")}
              </ul>
            </article>
          </div>

          <form class="panel form-panel contact-form-shell" data-form="contact" autocomplete="on" data-animate data-animate-immediate style="--delay:120ms">
            <span class="eyebrow no-dot">Send A Message</span>
            <h2 class="split-target">Talk To The Shop</h2>
            <p class="text-muted">Ask a question, tell us what the vehicle is doing, or let us know when you want to stop by.</p>
            <div class="form-grid">
              <div class="field">
                <label for="contact-name">Name *</label>
                <input id="contact-name" name="name" autocomplete="name" required>
              </div>
              <div class="field">
                <label for="contact-phone">Phone Number *</label>
                <input id="contact-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required>
              </div>
              <div class="field full">
                <label for="contact-email">Email Address optional</label>
                <input id="contact-email" name="email" type="email" autocomplete="email">
              </div>
              <div class="field full">
                <label for="contact-message">Message *</label>
                <textarea id="contact-message" name="message" placeholder="How can we help?" required></textarea>
              </div>
            </div>
            <button class="btn btn-primary" type="submit">${icon("fa-paper-plane")} Send Message</button>
            <div class="status" data-status="contact" aria-live="polite"></div>
          </form>
        </div>
      </section>
    </main>
  `;
}
