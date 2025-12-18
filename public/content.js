// keyword-based mapping
const FIELD_KEYWORDS = {
  email: ["email"],
  prn: ["prn", "university prn"],
  fullName: [
    "full name",
    "candidate name",
    "student name",
    "name of the student",
    "name of the candidate",
  ],
  mobile: ["mobile", "phone", "contact number", "10 digits"],
  dob: ["date of birth", "dob", "birth"],
  gender: ["gender"],

  degree: ["degree", "course"],
  branch: ["specialization", "branch", "stream"],
  college: ["college", "college name", "institute"],

  tenthPercent: ["10th", "ssc", "class 10", "10th %"],
  twelfthPercent: ["12th", "hsc", "12th %"],
  diplomaPercent: ["diploma %", "diploma"],
  degreePercent: ["be%", "btech%", "degree %", "be b tech"],

  passYear: ["year of graduation", "passing year", "passout"],

  cocubesScore: ["cocubes"],

  codechefRating: ["codechef rating"],
  codechefLink: ["codechef profile"],

  hackerrankRating: ["hackerrank rating", "hackerrank star"],
  hackerrankLink: ["hackerrank profile"],

  leetcodeScore: ["leetcode score", "problem solved"],
  leetcodeLink: ["leetcode profile"],

  hackerearthRating: ["hackerearth rating"],
  hackerearthLink: ["hackerearth profile"],

  githubLink: ["github"],
  linkedinLink: ["linkedin"],

  hasTechnicalCourse: [
    "technical courses",
    "technical course",
    "certifications",
    "course certification",
  ],

  technicalCoursePlatform: [
    "from which agency",
    "platform you have done",
    "course platform",
    "certification platform",
    "udemy",
    "coursera",
  ],

  technicalCourseDuration: [
    "duration of the course",
    "course duration",
    "duration in hours",
    "hours",
  ],

  cgpa: ["cgpa", "current cgpa", "aggregate cgpa", "c g p a"],

  activeBacklogs: [
    "active backlogs",
    "current backlogs",
    "number of backlogs",
    "backlogs",
    "live backlogs",
  ],

  yearDown: ["year down", "gap year"],

  techAchievements: ["technical achievements"],
  personalAchievements: ["personal achievements"],
  projects: ["project"],
};

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getProfileKey(label) {
  const text = normalize(label);

  const entries = Object.entries(FIELD_KEYWORDS).sort(
    (a, b) =>
      Math.max(...b[1].map((k) => k.length)) -
      Math.max(...a[1].map((k) => k.length))
  );

  for (const [key, keywords] of entries) {
    if (keywords.some((k) => text.includes(k))) {
      return key;
    }
  }
  return null;
}

function fillDropdown(question, value) {
  const listbox = question.querySelector('[role="listbox"]');
  if (!listbox) return false;

  listbox.click();

  const target = normalize(value);
  const options = Array.from(question.querySelectorAll('[role="option"]'));

  for (const opt of options) {
    const text = normalize(opt.innerText || "");
    if (text === target || target.includes(text)) {
      opt.click();
      return true;
    }
  }
  return false;
}

function fillQuestion(question, value, key) {
  if (!value) return;

  if (key === "mobile") {
    value = String(value).replace(/\D/g, "").slice(-10);
  }

  if (key === "gender") {
    const g = normalize(value);
    if (g.startsWith("m")) value = "male";
    if (g.startsWith("f")) value = "female";
  }

  const date = question.querySelector("input[type='date']");
  if (date) {
    date.value = value;
    date.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }

  if (fillDropdown(question, value)) return;

  const radios = question.querySelectorAll('[role="radio"]');
  if (radios.length) {
    const target = normalize(value);
    for (const radio of radios) {
      const text = normalize(
        radio.getAttribute("aria-label") || radio.textContent
      );
      if (text === target || target.includes(text)) {
        radio.click();
        return;
      }
    }
  }

  const textarea = question.querySelector("textarea");
  if (textarea) {
    textarea.value = value;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }

  const input = question.querySelector("input:not([type='file']), textarea");

  if (input) {
    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

function autofill(profile, customFields = []) {
  document.querySelectorAll(".Qr7Oae").forEach((question) => {
    const labelEl = question.querySelector(".M7eMe");
    if (!labelEl) return;

    const label = labelEl.innerText;
    const key = getProfileKey(label);

    if (key && profile[key]) {
      fillQuestion(question, profile[key], key);
      return;
    }

    for (const field of customFields) {
      if (!field.value) continue;

      const q = normalize(label);
      const f = normalize(field.labelKeyword);

      if (q.includes(f) || f.includes(q)) {
        fillQuestion(question, field.value);
        break;
      }
    }
  });
}

function resetGoogleForm() {
  document.querySelectorAll("input, textarea").forEach((el) => {
    if (el.type === "file") return;
    el.value = "";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });

  document
    .querySelectorAll('[role="radio"][aria-checked="true"]')
    .forEach((r) => r.click());

  document
    .querySelectorAll('[role="checkbox"][aria-checked="true"]')
    .forEach((c) => c.click());
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "FILL_FORM") {
    chrome.storage.sync.get(["profile", "customFields"], (result) => {
      try {
        autofill(result.profile || {}, result.customFields || []);
        sendResponse({ success: true });
      } catch (e) {
        console.error(e);
        sendResponse({ success: false });
      }
    });
    return true;
  }

  if (request.action === "RESET_FORM") {
    try {
      resetGoogleForm();
      sendResponse({ success: true });
    } catch (e) {
      sendResponse({ success: false });
    }
    return true;
  }
});
