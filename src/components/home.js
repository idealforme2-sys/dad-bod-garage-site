import { offers, processSteps, services, shop, symptoms, testimonials, trustCards, faqs, specialties, metrics } from "../data/site.js";
import { checkList, icon, sectionHead, serviceButton, stars } from "./shared.js";

function marqueeSection() {
 const items = [
 "NO BS",
 "HONEST MECHANIC",
 "ZERO UPSELLS",
 "DIAGNOSTICS FIRST",
 "FIX IT RIGHT"
 ];
 const itemMarkup = items.map((label) => `
 <span>${label}</span>
 `).join("");

 return `
 <section class="specialty-marquee" aria-label="Dad Bod Garage promises">
 <div class="marquee-track">
 <div class="marquee-group">${itemMarkup}</div>
 <div class="marquee-group" aria-hidden="true">${itemMarkup}</div>
 </div>
 </section>
 `;
 }

  function metricStrip() {
  return `
  <div class="metric-strip">
  <div class="container">
  <div class="metric-grid">
  ${metrics.map((m, i) => `
  <div class="metric" data-animate data-counter data-target="${m.value}" data-delay="${i * 100}" style="--delay:${i * 120}ms">
  <strong data-counter-value>${m.value}</strong>
  <span>${m.label}</span>
  </div>
  `).join("")}
  </div>
  </div>
  </div>
  `;
  }

 function heroScrollIndicator() {
 return `
 <div class="hero-scroll-indicator" aria-hidden="true">
 <div class="scroll-mouse">
 <div class="scroll-wheel"></div>
 </div>
 <span>Scroll to explore</span>
 </div>
 `;
 }

function trustSection() {
  return `
    <section class="section trust-section">
      <div class="container">
        <div class="section-head trust-head" data-animate>
          <h2>
            <span class="trust-word" style="--delay:0ms">Precision</span>
            <span class="trust-word trust-plus" style="--delay:180ms"><span class="highlight">+</span></span>
            <span class="trust-word" style="--delay:360ms">Honesty</span>
          </h2>
          <p class="text-muted">Most mechanics rely on trial and error at your expense. We use advanced diagnostics to pinpoint the exact issue. No upsells. No shortcuts. No wasted money.</p>
        </div>
        <div class="grid-3 trust-cards">
          ${trustCards.map((card, index) => `
            <article class="card trust-card featured" data-animate style="--delay:${index * 200}ms">
              <div class="card-icon">${icon(card.icon)}</div>
              <h3>${card.title}</h3>
              <p class="text-muted">${card.body}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function processSection() {
  return `
    <section class="section process-section">
      <div class="process-bg-icon">${icon("fa-gears")}</div>
      <div class="container process-content">
        <div class="section-head process-head" data-animate>
          <span class="eyebrow no-dot">How We Work</span>
          <h2>The Dad Bod System</h2>
        </div>
        <div class="process-grid">
          ${processSteps.map(([number, title, body], index) => `
            <article class="process-step" data-animate style="--delay:${index * 120}ms">
              <div class="step-number">${number === "flag" ? icon("fa-flag-checkered") : number}</div>
              <h3>${title}</h3>
              <p class="text-muted">${body}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function ctaSection() {
  return `
    <section class="section cta-section">
      <div class="container cta-content" data-animate>
        <span class="eyebrow no-dot">Don't Wait Until It Breaks Down</span>
        <h2>Ready To Stop Guessing?</h2>
        <p class="text-muted">Send us your vehicle's symptoms or call us directly. We'll outline the exact diagnostic process and get you scheduled.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" type="button" data-route="quote">${icon("fa-bolt")} Get An Estimate</button>
          <a class="btn btn-secondary" href="${shop.phoneHref}">${icon("fa-phone")} ${shop.phone}</a>
        </div>
      </div>
    </section>
  `;
}

function offersSection() {
  return `
    <section class="section offers-section">
      <div class="container split">
        <div data-animate>
          <span class="eyebrow">Current Offers</span>
          <h2>Premium Care, Neighborhood Prices.</h2>
          <p class="text-muted">Top-tier repair should not feel mysterious. These offers help customers start with the right inspection instead of wasting money guessing.</p>
          <div class="offer-list">
            ${offers.map((offer) => `
              <article class="offer">
                <div class="card-icon">${icon(offer.icon)}</div>
                <div>
                  <h3>${offer.title}</h3>
                  <p class="text-muted">${offer.body}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
        <div class="image-grid offer-visual" data-animate>
          <img src="/images to use/noguesswork.jpg" alt="Dad Bod Garage diagnostic work">
        </div>
      </div>
    </section>
  `;
}

function servicesPreview() {
 return `
 <section class="section section-alt">
 <div class="container">
 ${sectionHead("Service Lanes", "What We Can Help With", "Tap a service to start an estimate request with that work type already selected.")}
 <div class="grid-4">
 ${services.map(serviceButton).join("")}
 </div>
 </div>
 </section>
 `;
 }

 function specialtiesSection() {
 return `
 <section class="section specialties-section">
 <div class="container">
 ${sectionHead("Specialty Lanes", "We Handle More Than Daily Drivers", "From school buses to classic muscle cars, we have the expertise and equipment for specialty vehicles.")}
 <div class="specialty-grid">
 ${specialties.map((spec, index) => `
 <article class="specialty-card" data-animate style="--delay:${index * 120}ms">
 <div class="specialty-image">
 <img src="${spec.image}" alt="${spec.title}" loading="lazy">
 <div class="specialty-image-overlay"></div>
 </div>
 <div class="specialty-content">
 <div class="specialty-icon">${icon(spec.icon)}</div>
 <h3>${spec.title}</h3>
 <p class="text-muted">${spec.body}</p>
 <ul class="specialty-bullets">
 ${spec.bullets.map(b => `<li>${icon("fa-check")} ${b}</li>`).join("")}
 </ul>
 <button class="btn btn-secondary" type="button" data-route="quote" data-service="${spec.service}">
 ${icon("fa-file-invoice-dollar")} Request Estimate
 </button>
 </div>
 </article>
 `).join("")}
 </div>
 </div>
 </section>
 `;
 }

function symptomChecker() {
  const symptomButtons = Object.entries(symptoms).map(([key, symptom], index) => `
    <button class="symptom-chip ${index === 0 ? "active" : ""}" type="button" data-symptom="${key}">
      ${symptom.label}
    </button>
  `).join("");

  return `
    <section class="section symptom-shell">
      <div class="container">
        <div class="section-head symptom-head" data-animate>
          <span class="eyebrow">Not Sure What To Book?</span>
          <h2>Start With The Symptom.</h2>
          <p class="text-muted">Pick what your vehicle is doing and the site will point you toward the right diagnostic lane, then prefill the estimate request for you.</p>
        </div>
        <div class="symptom-workbench" data-animate>
          <div class="symptom-flow" aria-label="Estimate workflow">
            <span><strong>1</strong> Choose symptom</span>
            <span><strong>2</strong> Review next steps</span>
            <span><strong>3</strong> Send request</span>
          </div>
          <div class="symptom-grid">
            <div class="symptom-picker">
              <h3>What is the vehicle doing?</h3>
              <div class="chip-grid">${symptomButtons}</div>
            </div>
            <div class="symptom-result" data-symptom-result></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function reviewsSection() {
 return `
 <section class="section reviews-section">
 <div class="container">
 ${sectionHead("Word on the Street", "Trusted By Local Drivers")}
 <div class="grid-3">
 ${testimonials.map((item, index) => `
 <article class="card review" data-animate style="--delay:${index * 120}ms">
 ${stars()}
 <p>"${item.quote}"</p>
 <strong>- ${item.name}</strong>
 </article>
 `).join("")}
 </div>
 </div>
 </section>
 `;
 }

 function faqSection() {
 return `
 <section class="section section-alt faq-section">
 <div class="container">
 ${sectionHead("Questions?", "Frequently Asked")}
 <div class="faq-list" data-faq-list>
 ${faqs.map((faq, index) => `
 <div class="faq-item" data-animate style="--delay:${index * 80}ms">
 <button class="faq-toggle" type="button" data-faq-toggle aria-expanded="false">
 <span>${faq.question}</span>
 ${icon("fa-chevron-down")}
 </button>
 <div class="faq-answer">
 <p>${faq.answer}</p>
 </div>
 </div>
 `).join("")}
 </div>
 </div>
 </section>
 `;
 }

export function HomePage() {
 return `
 <main>
 <section class="hero">
 <div class="container hero-container">
 <div class="hero-content">
 <span class="eyebrow">The Dad Bod Guarantee</span>
 <h1 class="split-target">
 We Don't Guess.<br>
 We <span class="vertical-word-frame" aria-label="diagnose, repair, verify, protect">
 <span class="vertical-word-track">
 <span>Diagnose.</span>
 <span>Repair.</span>
 <span>Verify.</span>
 <span>Protect.</span>
 </span>
 </span>
 </h1>
 <p class="hero-copy">Stop throwing parts at your car. Experience honest, no-BS service in Coolidge, AZ. We fix it right the first time, saving you time, money, and frustration.</p>
 <div class="hero-actions">
 <button class="btn btn-primary" type="button" data-route="quote">${icon("fa-file-invoice-dollar")} Get An Estimate</button>
 <a class="btn btn-secondary" href="${shop.phoneHref}">${icon("fa-phone")} Call ${shop.phone}</a>
 </div>
 </div>
 </div>
 ${heroScrollIndicator()}
 </section>
 ${metricStrip()}
 ${marqueeSection()}
 ${trustSection()}
 ${processSection()}
 ${ctaSection()}
 ${specialtiesSection()}
 ${offersSection()}
 ${servicesPreview()}
 ${symptomChecker()}
 ${reviewsSection()}
 ${faqSection()}
 </main>
 `;
 }
