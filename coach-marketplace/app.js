const selectors = {
  resort: document.querySelector("#filter-resort"),
  pass: document.querySelector("#filter-pass"),
  state: document.querySelector("#filter-state"),
  discipline: document.querySelector("#filter-discipline"),
  student: document.querySelector("#filter-student"),
};

const locale = window.SNOWLINK_LOCALE === "en" ? "en" : "zh";
const ui = {
  zh: {
    selectedState: "已选择州",
    destinations: (count) => `${count} 个目的地`,
    moreDestinations: (count) => ` 等 ${count} 个目的地`,
    viewState: "查看该州中文教练 ↗",
    mapAria: (state, count) => `${state}：${count} 个目的地`,
    officialSchool: "官方雪校",
    howToBook: (name) => `如何预约 ${name}`,
    stepOne: (resort) => `前往 ${resort} 官方网站预约 Private Lesson。`,
    stepTwo: (name) => `完成预约后联系雪校，提供订单姓名、日期和 ${name} 的姓名。`,
    copied: "已复制",
    copyTemplate: "复制模板",
    copyManually: "请手动复制",
  },
  en: {
    selectedState: "Selected state",
    destinations: (count) => `${count} destination${count === 1 ? "" : "s"}`,
    moreDestinations: (count) => ` · ${count} destinations total`,
    viewState: "View instructors in this state ↗",
    mapAria: (state, count) => `${state}: ${count} destinations`,
    officialSchool: "Official ski school",
    howToBook: (name) => `How to request ${name}`,
    stepOne: (resort) => `Book a Private Lesson through ${resort}'s official website.`,
    stepTwo: (name) => `After booking, contact the ski school with the reservation name, date, and ${name}'s name.`,
    copied: "Copied",
    copyTemplate: "Copy template",
    copyManually: "Copy manually",
  },
}[locale];

window.populateResortSelect(selectors.resort);
window.populateStateSelect(selectors.state);

const cards = [...document.querySelectorAll(".coach-card")];
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const coachGrid = document.querySelector("#coach-grid");

function matches(card, key, value) {
  return value === "all" || card.dataset[key].split(" ").includes(value);
}

function applyFilters() {
  let visible = 0;
  cards.forEach((card) => {
    const show = Object.entries(selectors).every(([key, select]) =>
      matches(card, key, select.value)
    );
    card.hidden = !show;
    if (show) visible += 1;
  });
  resultCount.textContent = visible;
  emptyState.hidden = visible !== 0;
  coachGrid.hidden = visible === 0;
}

Object.values(selectors).forEach((select) => select.addEventListener("change", applyFilters));

function refreshCoachResorts() {
  const previous = selectors.resort.value;
  window.populateResortSelect(selectors.resort, true, {
    pass: selectors.pass.value,
    state: selectors.state.value,
  });
  if (![...selectors.resort.options].some((option) => option.value === previous)) {
    selectors.resort.value = "all";
  }
  applyFilters();
}

selectors.pass.addEventListener("change", refreshCoachResorts);
selectors.state.addEventListener("change", refreshCoachResorts);

function resetFilters() {
  Object.values(selectors).forEach((select) => { select.value = "all"; });
  refreshCoachResorts();
}

document.querySelector("#reset-filters").addEventListener("click", resetFilters);
document.querySelector("#empty-reset").addEventListener("click", resetFilters);

const statePositions = {
  AK: [12, 77], WA: [13, 20], OR: [11, 33], CA: [10, 52], NV: [18, 43],
  ID: [23, 30], MT: [32, 20], WY: [34, 33], UT: [28, 44], CO: [40, 45],
  NM: [38, 59], MN: [55, 24], WI: [61, 31], MI: [68, 32], MO: [57, 50],
  IN: [66, 45], OH: [71, 42], WV: [75, 49], PA: [79, 39], NY: [83, 30],
  VT: [88, 24], NH: [90, 28], ME: [94, 20],
};

const stateStats = window.SNOWLINK_RESORTS.reduce((stats, resort) => {
  const state = resort.mapState || resort.state.split(" / ")[0];
  if (!stats[state]) stats[state] = { epic: 0, ikon: 0, resorts: [] };
  stats[state][resort.pass] += 1;
  stats[state].resorts.push(resort.name);
  return stats;
}, {});

const mapPoints = document.querySelector("#map-points");
const mapInspector = document.querySelector("#map-inspector");

function inspectorMarkup(state, stats) {
  const names = stats.resorts.slice(0, 6).join(" · ");
  const more = stats.resorts.length > 6 ? ui.moreDestinations(stats.resorts.length) : "";
  return `<p>${ui.selectedState}</p><h3>${state} <small>${ui.destinations(stats.epic + stats.ikon)}</small></h3>
    <div class="inspector-bars">
      <span><i class="epic"></i><b>${stats.epic}</b> Epic</span>
      <span><i class="ikon"></i><b>${stats.ikon}</b> Ikon</span>
    </div><p>${names}${more}</p><button data-map-filter="${state}">${ui.viewState}</button>`;
}

function bindInspectorFilter() {
  mapInspector.querySelector("[data-map-filter]")?.addEventListener("click", (event) => {
    selectors.pass.value = "all";
    selectors.state.value = event.currentTarget.dataset.mapFilter;
    refreshCoachResorts();
    document.querySelector("#discover").scrollIntoView({ behavior: "smooth" });
  });
}

Object.entries(stateStats).forEach(([state, stats]) => {
  const position = statePositions[state];
  if (!position) return;
  const total = stats.epic + stats.ikon;
  const point = document.createElement("button");
  point.className = `map-state-point ${stats.epic && stats.ikon ? "mixed" : stats.epic ? "epic" : "ikon"}`;
  point.style.left = `${position[0]}%`;
  point.style.top = `${position[1]}%`;
  point.style.setProperty("--point-size", `${Math.min(27 + total * 3.2, 65)}px`);
  point.style.setProperty("--epic-angle", `${(stats.epic / total) * 360}deg`);
  point.setAttribute("aria-label", ui.mapAria(state, total));
  point.innerHTML = `<span>${state}</span><small>${total}</small>`;
  const showState = () => { mapInspector.innerHTML = inspectorMarkup(state, stats); bindInspectorFilter(); };
  point.addEventListener("mouseenter", showState);
  point.addEventListener("focus", showState);
  point.addEventListener("click", showState);
  mapPoints.appendChild(point);
});

const coachModal = document.querySelector("#coach-modal");
let lastFocused = null;

const coachDetails = {
  jason: {
    name: "林嘉树 Jason",
    firstName: "Jason",
    resort: "Palisades Tahoe",
    discipline: "snowboard",
    tags: { zh: ["AASI Level II", "成人新手", "第一次滑雪"], en: ["AASI Level II", "Adult beginners", "First-time riders"] },
    policy: { zh: "可提出请求 · 不保证档期", en: "Requests accepted · availability not guaranteed" },
    link: "https://www.palisadestahoe.com/plan-your-visit/snowboard-ski-lessons",
  },
  michelle: {
    name: "陈俐 Michelle",
    firstName: "Michelle",
    resort: "Vail Mountain",
    discipline: "ski",
    tags: { zh: ["PSIA Level II", "亲子教学", "儿童友好"], en: ["PSIA Level II", "Family lessons", "Child-friendly"] },
    policy: { zh: "请直接联系雪校提出请求", en: "Contact the ski school to request this instructor" },
    link: "https://www.vail.com/plan-your-trip/ski-and-ride-lessons.aspx",
  },
  joe: {
    name: "周舟 Joe",
    firstName: "Joe",
    resort: "Mammoth Mountain",
    discipline: "ski",
    tags: { zh: ["PSIA Level I", "成人入门", "控速转弯"], en: ["PSIA Level I", "Adult beginners", "Speed control & turns"] },
    policy: { zh: "请向雪校确认指定安排", en: "Confirm instructor requests with the ski school" },
    link: "https://www.mammothmountain.com/plan-your-trip/lessons/snowboard-ski-school",
  },
  an: {
    name: "许安 An",
    firstName: "An",
    resort: "Breckenridge",
    discipline: "snowboard",
    tags: { zh: ["AASI Level I", "儿童教学", "游戏化教学"], en: ["AASI Level I", "Children", "Play-based lessons"] },
    policy: { zh: "请直接联系雪校提出请求", en: "Contact the ski school to request this instructor" },
    link: "https://www.breckenridge.com/plan-your-trip/ski-and-ride-lessons.aspx",
  },
};

function openModal(modal) {
  lastFocused = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal(modal) {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll(".profile-button").forEach((button) => {
  button.addEventListener("click", () => {
    const coach = coachDetails[button.dataset.coach];
    const disciplineName = coach.discipline === "ski" ? "ski" : "snowboard";
    document.querySelector("#modal-coach-name").textContent = coach.name;
    document.querySelector("#modal-resort").textContent = `${coach.resort} · ${ui.officialSchool}`;
    document.querySelector("#modal-tags").innerHTML = coach.tags[locale].map((tag) => `<span>${tag}</span>`).join("");
    document.querySelector("#modal-policy").textContent = coach.policy[locale];
    document.querySelector("#modal-how-title").textContent = ui.howToBook(coach.firstName);
    document.querySelector("#modal-step-one").textContent = ui.stepOne(coach.resort);
    document.querySelector("#modal-step-two").textContent = ui.stepTwo(coach.firstName);
    document.querySelector("#request-copy").textContent = `Hi, I have booked a private ${disciplineName} lesson and would like to request ${coach.firstName} because I need instruction in Chinese. I understand instructor requests are subject to availability.`;
    document.querySelector("#modal-official-link").href = coach.link;
    openModal(coachModal);
  });
});

document.querySelectorAll(".modal-close").forEach((button) => {
  button.addEventListener("click", () => closeModal(button.closest(".modal-backdrop")));
});

document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeModal(backdrop);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  [coachModal].forEach((modal) => {
    if (!modal.hidden) closeModal(modal);
  });
});

document.querySelector("#copy-request").addEventListener("click", async (event) => {
  const text = document.querySelector("#request-copy").textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    event.currentTarget.textContent = ui.copied;
    setTimeout(() => { event.currentTarget.textContent = ui.copyTemplate; }, 1600);
  } catch {
    event.currentTarget.textContent = ui.copyManually;
  }
});
