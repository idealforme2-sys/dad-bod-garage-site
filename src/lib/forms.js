import { shop } from "../data/site.js";

export function formDataToObject(form) {
  const data = {};
  new FormData(form).forEach((value, key) => {
    data[key] = String(value).trim();
  });
  return data;
}

export function validateForm(form) {
  form.querySelectorAll(".field-error").forEach((field) => field.classList.remove("field-error"));

  if (form.checkValidity()) return true;

  form.querySelectorAll(":invalid").forEach((field) => field.classList.add("field-error"));
  const firstInvalid = form.querySelector(":invalid");
  if (firstInvalid) firstInvalid.focus();
  form.reportValidity();
  return false;
}

export function quoteBody(data) {
  return [
    "New estimate request from the Dad Bod Garage website.",
    "",
    "CONTACT",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "",
    `Preferred contact: ${data.preferredContact || "Call"}`,
    data.bestTime ? `Best time: ${data.bestTime}` : "",
    "",
    "VEHICLE",
    `Year: ${data.year}`,
    `Make: ${data.make}`,
    `Model: ${data.model}`,
    data.vin ? `VIN: ${data.vin}` : "",
    "",
    "SERVICE",
    `Primary service: ${data.service}`,
    `Urgency: ${data.urgency}`,
    "",
    "SYMPTOMS / NOTES",
    data.message
  ].filter(Boolean).join("\n");
}

export function contactBody(data) {
  return [
    "New message from the Dad Bod Garage website.",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "",
    "",
    "MESSAGE",
    data.message
  ].filter(Boolean).join("\n");
}

export function mailto(subject, body) {
  return `mailto:${shop.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function postSubmission(type, data) {
  const response = await fetch(`/api/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || (payload.errors || []).join(", ") || "Submission failed");
  }
  return payload;
}

export function saveLocalBackup(type, data) {
  const key = "dadbodgarage-submissions";
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  current.unshift({ type, createdAt: new Date().toISOString(), data });
  localStorage.setItem(key, JSON.stringify(current.slice(0, 20)));
}

export async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  return ok;
}
