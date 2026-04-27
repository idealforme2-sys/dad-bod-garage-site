export const shop = {
  name: "Dad Bod Garage",
  logo: "/DadBodLogo.png",
  phone: "520-752-0453",
  phoneHref: "tel:5207520453",
  email: "DadBodGarageAZ@gmail.com",
  emailHref: "mailto:DadBodGarageAZ@gmail.com",
  instagramUrl: "https://www.instagram.com/dadbodgarageaz/",
  address: "980 S Arizona Boulevard Suite B-1, Coolidge, AZ 85128",
  addressLines: ["980 S Arizona Boulevard Suite B-1", "Coolidge, AZ 85128"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=980%20S%20Arizona%20Boulevard%20Suite%20B-1%2C%20Coolidge%2C%20AZ%2085128",
  mapEmbed: "https://maps.google.com/maps?q=980%20S%20Arizona%20Boulevard%20Suite%20B-1%2C%20Coolidge%2C%20AZ%2085128&t=&z=15&ie=UTF8&iwloc=&output=embed",
  hours: [
    ["Monday - Tuesday", "8:00 AM - 4:00 PM"],
    ["Wednesday", "Closed"],
    ["Thursday - Friday", "8:00 AM - 4:00 PM"],
    ["Saturday", "10:00 AM - 3:00 PM"],
    ["Sunday", "By Appointment"]
  ]
};

export const specialtyMarquee = [
  ["fa-check", "Diagnostic Specialists"],
  ["fa-bus", "Fleet & School Bus Maintenance"],
  ["fa-truck-monster", "RV Repair"],
  ["fa-car-side", "Classic & Muscle Cars"],
  ["fa-snowflake", "Premium A/C Services"]
];

export const navItems = [
  { route: "home", label: "Home" },
  { route: "services", label: "Services" },
  { route: "about", label: "About Us" },
  { route: "contact", label: "Contact" }
];

export const metrics = [
  { value: "$80", label: "Diagnostic Credit" },
  { value: "$74.99", label: "A/C Special" },
  { value: "4", label: "Heavy-Duty Lanes" },
  { value: "0", label: "Guesswork" }
];

export const trustCards = [
  {
    icon: "fa-microchip",
    title: "Diagnostics First",
    body: "We find the root cause before turning a wrench. Our $80 full vehicle diagnostic ensures you only pay for what actually needs fixing."
  },
  {
    icon: "fa-handshake-angle",
    title: "No-BS Approach",
    body: "Clear explanations for every repair. We provide transparent advice to keep your family safe and your daily driver running flawlessly."
  },
  {
    icon: "fa-wrench",
    title: "Fix It Right",
    body: "Avoid repeat repairs. From complex electrical work to complete engine rebuilds, we do the job correctly the very first time."
  }
];

export const processSteps = [
  ["1", "Deep Diagnostic", "We hook up state-of-the-art tools to read your car's actual data, not just guess by sound."],
  ["2", "No-BS Quote", "We explain exactly what broke, why it broke, and give you a transparent price to fix it."],
  ["3", "Precision Repair", "Our expert technicians execute the repair using high-quality parts, fixing it right the first time."],
  ["flag", "Back on the Road", "Final safety checks and a test drive ensure your vehicle is safe for you and your family."]
];

export const offers = [
  {
    icon: "fa-magnifying-glass-chart",
    title: "$80 Full Diagnostic Guarantee",
    body: "Complete vehicle diagnostic. If you do the repair with us, the $80 is credited directly back to your bill."
  },
  {
    icon: "fa-snowflake",
    title: "$74.99 Ultimate A/C Special",
    body: "Includes performance check, refrigerant level review, component inspection, and cold air verification."
  }
];

export const services = [
  { icon: "fa-laptop-medical", name: "Diagnostics", service: "Diagnostic / Check Engine Light" },
  { icon: "fa-oil-can", name: "Oil Change", service: "Oil Change / Maintenance" },
  { icon: "fa-car-battery", name: "Electrical Repair", service: "Electrical Repair" },
  { icon: "fa-compact-disc", name: "Brake Repair", service: "Brake Repair" },
  { icon: "fa-fan", name: "A/C Service", service: "A/C Service" },
  { icon: "fa-truck-monster", name: "Tires & Alignments", service: "Other" },
  { icon: "fa-gears", name: "Engine Service", service: "Engine Service" },
  { icon: "fa-car-burst", name: "Shocks & Struts", service: "Other" }
];

export const specialties = [
  {
    icon: "fa-bus",
    title: "Fleet & School Buses",
    image: "/images/bus-repair.png",
    service: "Fleet / School Bus",
    body: "Preventative maintenance and safety-focused repairs for fleets, diesel work, and school bus service.",
    bullets: ["Preventative maintenance", "Safety inspections", "Diesel repair"]
  },
  {
    icon: "fa-car-side",
    title: "Classic & Muscle Cars",
    image: "/images/muscle-car-repair.png",
    service: "Classic / Muscle Car",
    body: "Vintage vehicles get careful diagnosis, respectful handling, and practical reliability upgrades.",
    bullets: ["Restoration support", "Performance upgrades", "Custom tuning"]
  },
  {
    icon: "fa-van-shuttle",
    title: "RV & Large Vehicles",
    image: "/images/rv-repair.png",
    service: "RV / Large Vehicle",
    body: "Large vehicle diagnostics for trip prep, electrical faults, A/C concerns, and drivability problems.",
    bullets: ["Engine diagnostics", "A/C and electrical", "Chassis repair"]
  }
];

export const symptoms = {
  "check-engine": {
    label: "Check Engine",
    service: "Diagnostic / Check Engine Light",
    urgency: "Normal scheduling",
    priority: "Normal",
    title: "Diagnostic / Check Engine Light",
    copy: "A scan code is only the beginning. We verify live data, wiring, sensors, and mechanical causes before recommending parts.",
    message: "Check engine light is on. Please inspect codes, live data, wiring/sensor causes, and drivability symptoms.",
    steps: ["Do not clear the light before your visit if possible.", "Write down when it happens: cold start, idle, highway, towing, or heat.", "Tell us if the light is flashing, because that can mean stop driving."]
  },
  "no-start": {
    label: "No Start",
    service: "Electrical Repair",
    urgency: "Vehicle is down",
    priority: "Vehicle Down",
    title: "No-Start / Electrical Diagnostic",
    copy: "No-start issues can be battery, starter, fuel, ignition, immobilizer, wiring, or module related. The diagnostic path matters.",
    message: "Vehicle will not start. Please inspect battery/charging, starter circuit, fuel/ignition, immobilizer, wiring, and control modules.",
    steps: ["Note whether it cranks, clicks, or is completely silent.", "If jump-starting works, tell us how long it keeps running.", "Avoid repeated cranking if you smell fuel or hear unusual noises."]
  },
  ac: {
    label: "Weak A/C",
    service: "A/C Service",
    urgency: "Normal scheduling",
    priority: "Comfort",
    title: "A/C Performance Check",
    copy: "Weak A/C needs more than a can of refrigerant. We inspect pressure, leaks, compressor operation, blend doors, fans, and controls.",
    message: "A/C is weak or warm. Please inspect refrigerant pressures, leak points, compressor operation, cooling fans, blend doors, and controls.",
    steps: ["Notice whether it is warm at idle, highway speed, or all the time.", "Tell us if one side is colder than the other.", "Do not keep adding refrigerant without checking for leaks."]
  },
  brakes: {
    label: "Brake Noise",
    service: "Brake Repair",
    urgency: "Safety concern",
    priority: "Safety",
    title: "Brake Safety Inspection",
    copy: "Grinding, pulsing, pulling, or a soft pedal deserves immediate attention. We inspect the whole braking system, not just pads.",
    message: "Brake concern. Please inspect pads/rotors, calipers, hydraulic system, brake fluid condition, pedal feel, and road-test symptoms.",
    steps: ["Avoid driving if the pedal sinks, warning light is on, or grinding is severe.", "Tell us whether the noise changes while turning or braking.", "Bring any previous brake repair notes if you have them."]
  },
  overheat: {
    label: "Overheating",
    service: "Engine Service",
    urgency: "Safety concern",
    priority: "Stop Driving",
    title: "Cooling System / Overheat Diagnostic",
    copy: "Overheating can destroy an engine quickly. We check leaks, fans, thermostat, radiator flow, pressure, and possible head gasket symptoms.",
    message: "Vehicle is overheating. Please inspect cooling system leaks, fans, thermostat, radiator flow, pressure, and possible head gasket symptoms.",
    steps: ["Stop driving if the temperature gauge climbs into the danger zone.", "Do not remove the radiator cap while hot.", "Tell us whether coolant is disappearing or steam is visible."]
  },
  fleet: {
    label: "Fleet/RV",
    service: "Fleet / School Bus",
    urgency: "Fleet downtime",
    priority: "Downtime",
    title: "Fleet / RV Diagnostic Lane",
    copy: "Large vehicles need a practical uptime plan. We look at safety, access, scheduling, parts availability, and recurring maintenance needs.",
    message: "Fleet/RV or large vehicle request. Please review safety concerns, downtime priority, access needs, maintenance history, and diagnostic path.",
    steps: ["Include vehicle size, parking/access constraints, and whether it can be driven.", "Tell us if this is a one-off repair or recurring maintenance.", "Mention trip dates or fleet downtime deadlines."]
  }
};

export const testimonials = [
  {
    name: "Mark T.",
    quote: "Another shop quoted me $1,200 and said it was a transmission issue. James ran a proper diagnostic, found a $150 sensor issue, and saved me a grand."
  },
  {
    name: "Sarah & David L.",
    quote: "Brought in our RV before a massive road trip. They found exactly why the A/C was shorting out. Quick, honest, and zero upselling."
  },
  {
    name: "Local Courier Co.",
    quote: "Dad Bod Garage keeps our small fleet of vans running. Minimal downtime, total transparency, and James genuinely cares about our business."
  }
];

export const faqs = [
  {
    question: "Why do you charge $80 for a diagnostic?",
    answer: "Proper diagnostics take specialized tools and an experienced technician's time. If you do the repair with us, the diagnostic fee is credited back to the bill."
  },
  {
    question: "What if another shop already replaced parts and the problem is still there?",
    answer: "That happens more than it should. Bring the vehicle in with any notes or receipts you have and we will diagnose the root issue from scratch instead of stacking more guesses on top."
  },
  {
    question: "What should I tell you before I bring the vehicle in?",
    answer: "The best clues are when it happens, how long it has been happening, any warning lights, any noises or smells, and what was repaired recently."
  },
  {
    question: "How quickly will you follow up after an estimate request?",
    answer: "Estimate requests are meant to speed up the first conversation. Once your details are in, Dad Bod Garage can respond with the right diagnostic lane and next step instead of starting cold."
  },
  {
    question: "Can you inspect the vehicle before a trip or before I buy parts?",
    answer: "Yes. Pre-trip checks and symptom-based diagnostics are both smart moves when you want to avoid breakdowns or wasted money on the wrong repair."
  }
];
