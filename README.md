# Dad Bod Garage Website

Dynamic JavaScript/Node website converted from the original single-file HTML mockup.

## Run Locally

```powershell
npm.cmd run dev
```

The server defaults to `http://127.0.0.1:3000`. If that port is busy:

```powershell
$env:PORT="3001"; npm.cmd run dev
```

## What Works

- Multi-page hash navigation: Home, Services, About, Quote, Contact
- Dynamic service cards that prefill the estimate form
- Symptom checker that recommends a diagnostic lane and preloads the request
- Branded logo in the navbar, preloader, and footer
- Animated preloader and animated "Dad Bod System" process section
- Footer business hours and Instagram link on every page
- Quote and contact forms submit to the local Node API
- Submissions save to `data/submissions.json`
- Email draft/local browser fallback if the API is unavailable
- Live business-hours status on the contact page

## Checks

```powershell
npm.cmd run check
```
