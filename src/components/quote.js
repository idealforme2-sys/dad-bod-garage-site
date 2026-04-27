import { services, shop, specialties } from "../data/site.js";
import { checkList, icon, pageHero } from "./shared.js";

const serviceOptions = [
  "Diagnostic / Check Engine Light",
  "Oil Change / Maintenance",
  "Brake Repair",
  "A/C Service",
  "Electrical Repair",
  "Engine Service",
  "Fleet / School Bus",
  "RV / Large Vehicle",
  "Classic / Muscle Car",
  "Other"
];

const urgencyOptions = ["Normal scheduling", "Vehicle is down", "Safety concern", "Fleet downtime"];

function optionList(options, selected = "", includeEmpty = false) {
  return `
    ${includeEmpty ? `<option value="">Select one</option>` : ""}
    ${options.map((option) => `<option ${option === selected ? "selected" : ""}>${option}</option>`).join("")}
  `;
}

export function QuotePage(prefill = {}) {
  const selectedService = prefill.service || "";
  const selectedUrgency = prefill.urgency || "Normal scheduling";
  const message = prefill.message || "";
  const quickLanes = [...services.slice(0, 4), specialties[0], specialties[2]];

  return `
    <main>
      ${pageHero("Start A Diagnostic Request", "Tell us what the vehicle is doing and we will point you toward the right inspection lane before money gets wasted on guesswork.")}
      <section class="section">
        <div class="container estimate-layout">
          <form class="panel form-panel estimate-form" data-form="quote" autocomplete="on" data-animate data-animate-immediate>
            <h2>1. Your Contact Details</h2>
            <div class="form-grid">
              <div class="field">
                <label for="quote-name">Full Name *</label>
                <input id="quote-name" name="name" autocomplete="name" required>
              </div>
              <div class="field">
                <label for="quote-phone">Phone Number *</label>
                <input id="quote-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required>
              </div>
              <div class="field full">
                <label for="quote-email">Email Address</label>
                <input id="quote-email" name="email" type="email" autocomplete="email">
              </div>
            </div>

            <h2>2. Vehicle Information</h2>
            <div class="form-grid three">
              <div class="field">
                <label for="quote-year">Year *</label>
                <input id="quote-year" name="year" type="number" min="1900" max="2035" placeholder="2018" required>
              </div>
              <div class="field">
                <label for="quote-make">Make *</label>
                <input id="quote-make" name="make" placeholder="Ford" required>
              </div>
              <div class="field">
                <label for="quote-model">Model *</label>
                <input id="quote-model" name="model" placeholder="F-150" required>
              </div>
              <div class="field full">
                <label for="quote-vin">VIN optional</label>
                <input id="quote-vin" name="vin" minlength="11" maxlength="17">
              </div>
            </div>

            <h2>3. Service Details</h2>
            <div class="form-grid">
              <div class="field">
                <label for="quote-service">Primary Service *</label>
                <select id="quote-service" name="service" required>
                  ${optionList(serviceOptions, selectedService, true)}
                </select>
              </div>
              <div class="field">
                <label for="quote-urgency">Urgency *</label>
                <select id="quote-urgency" name="urgency" required>
                  ${optionList(urgencyOptions, selectedUrgency)}
                </select>
              </div>
              <div class="field">
                <label for="quote-contact-method">Preferred Contact *</label>
                <select id="quote-contact-method" name="preferredContact" required>
                  <option>Call</option>
                  <option>Text</option>
                  <option>Email</option>
                </select>
              </div>
              <div class="field">
                <label for="quote-window">Best Time To Reach You</label>
                <input id="quote-window" name="bestTime" placeholder="Weekday afternoons">
              </div>
              <div class="field full">
                <label for="quote-message">Describe The Issue *</label>
                <textarea id="quote-message" name="message" required placeholder="Tell us what the vehicle is doing...">${message}</textarea>
              </div>
            </div>

            <button class="btn btn-primary" type="submit">${icon("fa-paper-plane")} Submit Request</button>
            <div class="status" data-status="quote" aria-live="polite"></div>
          </form>

          <div class="estimate-rail">
            <article class="card estimate-card" data-animate data-animate-immediate>
              <div class="card-icon">${icon("fa-list-check")}</div>
              <h3>What Happens Next</h3>
              <p class="text-muted">We look at the symptoms first, contact you, and line up the right diagnostic lane before any repair recommendation gets made.</p>
              ${checkList([
                "You hear back with the best next step for that issue.",
                "Urgent or safety concerns get flagged quickly.",
                "If it is a fit, we schedule the inspection with context already in hand."
              ])}
            </article>
            <article class="card estimate-card" data-animate style="--delay:120ms">
              <div class="card-icon">${icon("fa-clipboard-question")}</div>
              <h3>Helpful Details To Include</h3>
              <p class="text-muted">A few specifics make the first conversation much faster and help us avoid sending you down the wrong path.</p>
              ${checkList([
                "When the problem happens: cold start, highway, idle, towing, or heat.",
                "Any warning lights, smells, noises, or recent repairs.",
                "Whether the vehicle is drivable, stuck, or part of a work fleet."
              ])}
            </article>
            <article class="card estimate-card estimate-contact-card" data-animate style="--delay:240ms">
              <div class="card-icon">${icon("fa-phone-volume")}</div>
              <h3>Need To Talk It Through First?</h3>
              <p class="text-muted">Call the shop now or tap a common lane below and we will keep the request focused.</p>
              <div class="actions estimate-actions">
                <a class="btn btn-secondary" href="${shop.phoneHref}">${icon("fa-phone")} ${shop.phone}</a>
              </div>
              <div class="quick-lane-grid">
                ${quickLanes.map((item) => `
                  <button class="btn btn-secondary quick-lane-button" type="button" data-service="${item.service}">
                    ${item.name || item.title}
                  </button>
                `).join("")}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  `;
}
