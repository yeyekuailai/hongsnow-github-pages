const form = document.querySelector("#instructor-application");
const steps = [...document.querySelectorAll(".form-step")];
const progressItems = [...document.querySelectorAll("[data-progress]")];
const nextButton = document.querySelector("#next-step");
const previousButton = document.querySelector("#previous-step");
const submitButton = document.querySelector("#submit-application");
const errorBox = document.querySelector("#form-error");
const passSelect = document.querySelector("#apply-pass");
const stateSelect = document.querySelector("#apply-state");
const resortSelect = document.querySelector("#apply-resort");
const employmentProofInput = document.querySelector("#employment-proof-file");
let currentStep = 1;
const MAX_EMPLOYMENT_FILE_BYTES = 10 * 1024 * 1024;
const locale = window.SNOWLINK_LOCALE === "en" ? "en" : "zh";
const ui = {
  zh: {
    selectState: "请选择州", required: "请完成本页标有 * 的必填内容，再继续。", fileTooLarge: "在职证明文件不能超过 10MB，请压缩或更换文件。", fileReadError: "无法读取在职证明文件，请重新选择后再提交。",
    review: ["主页姓名", "雪场", "项目", "教学对象", "PSIA / AASI", "在职证明", "联系邮箱"],
    notProvided: "未填写", step: (number) => `第 ${number} 步，共 4 步`, separator: "、",
    noCertification: "无", missingEndpoint: "收件邮箱尚未连接。请先在 config.js 中填写 Google Apps Script Web App URL。",
    submitting: "正在提交…", submitError: "提交未完成。请检查网络后重试，或联系平台运营者。", submit: '提交审核 <span>↗</span>',
  },
  en: {
    selectState: "Select a state", required: "Complete every required field marked with * before continuing.", fileTooLarge: "The employment verification file must be 10MB or smaller.", fileReadError: "The employment verification file could not be read. Select it again and retry.",
    review: ["Profile name", "Resort", "Discipline", "Students", "PSIA / AASI", "Employment proof", "Contact email"],
    notProvided: "Not provided", step: (number) => `Step ${number} of 4`, separator: ", ",
    noCertification: "None", missingEndpoint: "The application inbox is not connected yet. Add the Google Apps Script Web App URL in config.js.",
    submitting: "Submitting…", submitError: "Your application was not submitted. Check your connection and try again, or contact SnowLink.", submit: 'Submit for review <span>↗</span>',
  },
}[locale];

window.populateStateSelect(stateSelect);
stateSelect.options[0].value = "";
stateSelect.options[0].textContent = ui.selectState;
window.populateResortSelect(resortSelect, false);

function refreshApplicationResorts() {
  window.populateResortSelect(resortSelect, false, {
    pass: passSelect.value,
    state: stateSelect.value,
  });
}
passSelect.addEventListener("change", refreshApplicationResorts);
stateSelect.addEventListener("change", refreshApplicationResorts);

function setCounter(name, outputId) {
  const input = form.elements[name];
  const output = document.querySelector(outputId);
  input.addEventListener("input", () => { output.textContent = input.value.length; });
}
setCounter("tagline", "#tagline-count");
setCounter("bio", "#bio-count");

function valuesFor(name) {
  return [...form.querySelectorAll(`[name="${name}"]:checked`)].map((input) => input.value);
}

function validateStep(stepNumber) {
  errorBox.hidden = true;
  const step = steps[stepNumber - 1];
  let valid = true;
  step.querySelectorAll("[required]").forEach((input) => {
    const inputValid = input.type === "checkbox" ? input.checked : input.checkValidity();
    input.classList.toggle("invalid", !inputValid);
    if (!inputValid) valid = false;
  });
  step.querySelectorAll("[data-required-group]").forEach((group) => {
    const groupValid = group.querySelectorAll("input:checked").length > 0;
    group.classList.toggle("invalid-group", !groupValid);
    if (!groupValid) valid = false;
  });
  if (stepNumber === 1 && employmentProofInput.files[0]?.size > MAX_EMPLOYMENT_FILE_BYTES) {
    employmentProofInput.classList.add("invalid");
    errorBox.textContent = ui.fileTooLarge;
    errorBox.hidden = false;
    employmentProofInput.focus();
    return false;
  }
  if (!valid) {
    errorBox.textContent = ui.required;
    errorBox.hidden = false;
    step.querySelector(".invalid, .invalid-group input")?.focus();
  }
  return valid;
}

employmentProofInput.addEventListener("change", () => {
  employmentProofInput.classList.toggle("invalid", Boolean(employmentProofInput.files[0]?.size > MAX_EMPLOYMENT_FILE_BYTES));
  if (employmentProofInput.files[0]?.size > MAX_EMPLOYMENT_FILE_BYTES) {
    errorBox.textContent = ui.fileTooLarge;
    errorBox.hidden = false;
  } else {
    errorBox.hidden = true;
  }
});

function buildReview() {
  const selectedResort = window.SNOWLINK_RESORTS.find((resort) => resort.id === resortSelect.value);
  const items = [
    [ui.review[0], form.elements.display_name.value],
    [ui.review[1], selectedResort ? `${selectedResort.name} · ${selectedResort.state}` : "—"],
    [ui.review[2], valuesFor("discipline").join(ui.separator) || "—"],
    [ui.review[3], valuesFor("students").join(ui.separator) || "—"],
    [ui.review[4], [form.elements.psia.value, form.elements.aasi.value].filter((value) => value !== ui.noCertification && value !== "无").join(" · ") || ui.notProvided],
    [ui.review[5], employmentProofInput.files[0]?.name || "—"],
    [ui.review[6], form.elements.email.value],
  ];
  document.querySelector("#review-card").innerHTML = items.map(([label, value]) => `
    <div class="review-item"><span>${escapeForReview(label)}</span><strong>${escapeForReview(value)}</strong></div>
  `).join("");
}

function escapeForReview(value) {
  return String(value || "—")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showStep(stepNumber) {
  currentStep = stepNumber;
  steps.forEach((step, index) => step.classList.toggle("active", index === stepNumber - 1));
  progressItems.forEach((item, index) => item.classList.toggle("active", index <= stepNumber - 1));
  document.querySelector("#step-label").textContent = ui.step(stepNumber);
  previousButton.hidden = stepNumber === 1;
  nextButton.hidden = stepNumber === 4;
  submitButton.hidden = stepNumber !== 4;
  errorBox.hidden = true;
  if (stepNumber === 4) buildReview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

nextButton.addEventListener("click", () => {
  if (validateStep(currentStep)) showStep(currentStep + 1);
});
previousButton.addEventListener("click", () => showStep(currentStep - 1));

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(new Error("FILE_READ_ERROR"));
    reader.readAsDataURL(file);
  });
}

async function serializeApplication() {
  const selectedResort = window.SNOWLINK_RESORTS.find((resort) => resort.id === resortSelect.value);
  const data = Object.fromEntries(new FormData(form).entries());
  delete data.employment_proof_file;
  const employmentFile = employmentProofInput.files[0];
  data.employment_proof = {
    name: employmentFile.name,
    type: employmentFile.type || "application/octet-stream",
    size: employmentFile.size,
    base64: await readFileAsBase64(employmentFile),
  };
  data.resort_name = selectedResort?.name || resortSelect.value;
  data.resort_state = selectedResort?.state || stateSelect.value;
  data.discipline = valuesFor("discipline").join(ui.separator);
  data.students = valuesFor("students").join(ui.separator);
  data.levels = valuesFor("levels").join(ui.separator);
  data.locale = locale;
  data.submitted_at = new Date().toISOString();
  return data;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateStep(4)) return;
  const endpoint = window.SNOWLINK_CONFIG?.formEndpoint;
  if (!endpoint) {
    errorBox.textContent = ui.missingEndpoint;
    errorBox.hidden = false;
    return;
  }
  submitButton.disabled = true;
  submitButton.textContent = ui.submitting;
  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(await serializeApplication()),
    });
    document.querySelector("#success-screen").hidden = false;
  } catch (error) {
    errorBox.textContent = error.message === "FILE_READ_ERROR" ? ui.fileReadError : ui.submitError;
    errorBox.hidden = false;
    submitButton.disabled = false;
    submitButton.innerHTML = ui.submit;
  }
});
