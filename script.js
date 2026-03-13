const balatroSkillInput = document.getElementById("balatroSkill");
const datingConfidenceInput = document.getElementById("datingConfidence");
const balatroSkillValue = document.getElementById("balatroSkillValue");
const datingConfidenceValue = document.getElementById("datingConfidenceValue");
const gigachadScore = document.getElementById("gigachadScore");
const coachRecommendation = document.getElementById("coachRecommendation");

const generateDrillButton = document.getElementById("generateDrill");
const drillOutput = document.getElementById("drillOutput");

const testimonialText = document.getElementById("testimonialText");
const testimonialDots = document.getElementById("testimonialDots");

const bookingForm = document.getElementById("bookingForm");
const clearLeadsButton = document.getElementById("clearLeads");
const bookingStatus = document.getElementById("bookingStatus");
const savedLeadCount = document.getElementById("savedLeadCount");

const bookingStorageKey = "jacksonGibbsBookingLeads";

const balatroDrills = [
  "Play a run where you skip your first blind and recover with economy planning.",
  "Build around one scaling joker and commit to it for 5 antes.",
  "Win a run using only two main scoring hand types.",
  "Record every shop decision for one run and review what you passed on."
];

const datingDrills = [
  "Open one conversation with a calm compliment and ask a follow-up question.",
  "Practice a 60-second intro with relaxed posture and slower speaking.",
  "Send one clear, confident message proposing a simple plan.",
  "In your next conversation, listen 70% and reflect back what they said."
];

const testimonials = [
  "“Jackson took my Balatro lines from random to surgical. Also made me way smoother in conversation.”",
  "“I came for joker strategy, stayed for confidence coaching. Massive upgrade on both.”",
  "“His vibe is pure giga-chad but the methods are practical and structured.”"
];

function getRecommendation(score, balatroSkill, datingConfidence) {
  if (score >= 80) {
    return "Elite trajectory. Jackson would push advanced mind games and high-pressure social reps.";
  }

  if (balatroSkill > datingConfidence + 15) {
    return "Cards are strong, social game lags. Focus on assertive communication and in-person reps.";
  }

  if (datingConfidence > balatroSkill + 15) {
    return "Presence is strong, deck discipline lags. Tighten Balatro economy and joker synergy planning.";
  }

  if (score >= 60) {
    return "Balanced build. Jackson would sharpen tempo: better pivots in runs and conversations.";
  }

  return "Solid start. Jackson would tune your fundamentals in both lanes.";
}

function updateScore() {
  const balatroSkill = Number(balatroSkillInput.value);
  const datingConfidence = Number(datingConfidenceInput.value);

  balatroSkillValue.textContent = String(balatroSkill);
  datingConfidenceValue.textContent = String(datingConfidence);

  const score = Math.round((balatroSkill * 0.58) + (datingConfidence * 0.42));
  gigachadScore.textContent = String(score);
  coachRecommendation.textContent = getRecommendation(score, balatroSkill, datingConfidence);
}

function generateDrill() {
  const balatro = balatroDrills[Math.floor(Math.random() * balatroDrills.length)];
  const dating = datingDrills[Math.floor(Math.random() * datingDrills.length)];

  drillOutput.innerHTML = `
    <article class="drill-column">
      <p class="drill-label">Balatro Drill</p>
      <p class="drill-text">${balatro}</p>
    </article>
    <article class="drill-column">
      <p class="drill-label">Dating Drill</p>
      <p class="drill-text">${dating}</p>
    </article>
  `;
}

let currentTestimonial = 0;

function renderDots() {
  testimonialDots.innerHTML = "";
  testimonials.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = index === currentTestimonial ? "dot active" : "dot";
    testimonialDots.appendChild(dot);
  });
}

function rotateTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonialText.textContent = testimonials[currentTestimonial];
  renderDots();
}

function getSavedLeads() {
  const raw = localStorage.getItem(bookingStorageKey);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSavedLeads(leads) {
  localStorage.setItem(bookingStorageKey, JSON.stringify(leads));
}

function updateSavedLeadCount() {
  const leads = getSavedLeads();
  savedLeadCount.textContent = String(leads.length);
}

function setBookingStatus(message) {
  bookingStatus.textContent = message;
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const lead = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    focus: String(formData.get("focus") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    createdAt: new Date().toISOString()
  };

  if (!lead.name || !lead.email || !lead.focus) {
    setBookingStatus("Add your name, email, and focus before saving.");
    return;
  }

  const leads = getSavedLeads();
  leads.push(lead);
  writeSavedLeads(leads);

  bookingForm.reset();
  updateSavedLeadCount();
  setBookingStatus("Booking request saved locally on this browser.");
}

function clearSavedLeads() {
  localStorage.removeItem(bookingStorageKey);
  updateSavedLeadCount();
  setBookingStatus("Saved requests cleared.");
}

balatroSkillInput.addEventListener("input", updateScore);
datingConfidenceInput.addEventListener("input", updateScore);
generateDrillButton.addEventListener("click", generateDrill);
bookingForm.addEventListener("submit", handleBookingSubmit);
clearLeadsButton.addEventListener("click", clearSavedLeads);

updateScore();
renderDots();
updateSavedLeadCount();

setInterval(rotateTestimonial, 3600);