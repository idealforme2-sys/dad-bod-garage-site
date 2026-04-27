import { faqs, shop } from "../data/site.js";
import { icon, pageHero } from "./shared.js";

export function AboutPage() {
  return `
    <main>
      ${pageHero("Meet The Owner", "Dad Bod Garage was built around one simple idea: tell people the truth, diagnose properly, and fix it right.")}
      <section class="section">
        <div class="container split">
          <div class="owner-portrait" data-animate data-animate-immediate>
            <img src="/images to use/meetus.jpg" alt="James, owner of Dad Bod Garage">
            <div class="owner-portrait-badge">Coolidge, AZ</div>
          </div>
          <div class="owner-story" data-animate data-animate-immediate style="--delay:120ms">
            <span class="eyebrow">Meet The Owner</span>
            <h2 class="split-target">Hi, I'm James.</h2>
            <p class="text-muted">I started Dad Bod Garage to be the neighborhood mechanic that actually tells you the truth. No upsells. No guessing. Just transparent work and clear diagnostic logic.</p>
            <p class="text-muted">Whether we are checking a school bus, preparing an RV, or fixing your daily driver, the standard is the same: safe, reliable, and explained in plain English.</p>
            <div class="card owner-quote">
              <p>"Our business is built around saving you money by diagnosing properly instead of guessing."</p>
            </div>
          </div>
        </div>
      </section>
      <section class="section section-alt">
        <div class="container">
          <div class="section-head" data-animate>
            <h2>Frequently Asked Questions</h2>
            <p class="text-muted">Straight answers before you ever hand over the keys.</p>
          </div>
          <div class="faq-list" data-faq-list>
            ${faqs.map((faq, index) => `
              <article class="panel faq-item" data-animate style="--delay:${index * 80}ms">
                <button class="faq-toggle" type="button" data-faq-toggle>
                  <span>${faq.question}</span>
                  ${icon("fa-chevron-down")}
                </button>
                <div class="faq-answer"><p>${faq.answer}</p></div>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container section-head" data-animate>
          <h2>Have More Questions?</h2>
          <p class="text-muted">Call or send a message and get a straight answer.</p>
          <div class="actions" style="justify-content:center">
            <button class="btn btn-primary" type="button" data-route="contact">Contact Us</button>
            <a class="btn btn-secondary" href="${shop.phoneHref}">${icon("fa-phone")} ${shop.phone}</a>
          </div>
        </div>
      </section>
    </main>
  `;
}
