import { services, shop, specialties } from "../data/site.js";
import { checkList, icon, pageHero, sectionHead, serviceButton } from "./shared.js";

export function ServicesPage() {
  return `
    <main>
      ${pageHero("Diagnostic-First Service Lanes", "From routine maintenance to heavy-duty work, every lane starts with the same thing: finding the real cause before parts get thrown at the problem.")}
      <section class="section">
        <div class="container">
          ${sectionHead("Core Auto Care", "Common Repair Lanes", "Select a service and the estimate form will open with the correct category selected.")}
          <div class="grid-4" data-animate>
            ${services.map(serviceButton).join("")}
          </div>
        </div>
      </section>
      <section class="section section-alt">
        <div class="container">
          ${sectionHead("Specialized Capabilities", "Built For More Than Daily Drivers")}
          <div class="grid-3">
            ${specialties.map((item, index) => `
              <article class="card" data-animate style="--delay:${index * 120}ms">
                <div class="card-icon">${icon(item.icon)}</div>
                <h3>${item.title}</h3>
                <p class="text-muted">${item.body}</p>
                ${checkList(item.bullets)}
                <button class="btn btn-primary" type="button" data-service="${item.service}">Request This Service</button>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container section-head" data-animate>
          <h2>Trust Your Vehicle With Experts</h2>
          <p class="text-muted">No matter what you drive, we treat it like our own family is riding in it.</p>
          <div class="actions" style="justify-content:center">
            <button class="btn btn-primary" type="button" data-route="quote">Get An Estimate</button>
            <a class="btn btn-secondary" href="${shop.phoneHref}">${icon("fa-phone")} ${shop.phone}</a>
          </div>
        </div>
      </section>
    </main>
  `;
}
