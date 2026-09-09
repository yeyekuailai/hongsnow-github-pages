const form = document.querySelector(".booking-form");
const note = document.querySelector(".form-note");
const heroVideo = document.querySelector(".hero-image");
const langButtons = document.querySelectorAll(".language-toggle button");
const menuToggle = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelector(".nav-links");
const studentPlayer = document.querySelector(".student-player");
const clipTabs = document.querySelectorAll(".clip-tab");
const clipPrev = document.querySelector(".clip-prev");
const clipNext = document.querySelector(".clip-next");
const installButtons = document.querySelectorAll(".install-web-app");
const welcomeScreen = document.querySelector(".snow-welcome");
const bookingEndpoint = window.HONGSNOW_BOOKING_ENDPOINT || "";
let deferredInstallPrompt = null;
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
const isNativeApp = ["capacitor:", "ionic:"].includes(window.location.protocol);
const studentClips = [
  "./assets/student-highlight-1.mp4?v=20260909-2",
  "./assets/student-highlight-2.mp4?v=20260909-2",
  "./assets/student-highlight-3.mp4?v=20260909-2",
];
let activeClip = 0;

const translations = [
  [".brand small", "Snowboard Coach", "Snowboard Coach"],
  ['[data-nav="home"]', "首页", "Home"],
  ['[data-nav="programs"]', "课程", "Programs"],
  ['[data-nav="clips"]', "学员视频", "Student Clips"],
  ['[data-nav="about"]', "关于我", "About"],
  ['[data-nav="pricing"]', "价格", "Pricing"],
  ['[data-nav="install"]', "安装App", "Install App"],
  ['[data-nav="book"]', "预约", "Book"],
  [".nav-cta", "约体验课", "Book a Session"],
  [".kicker", "AASI Level II Riding Passed / Weekend Snowboard Coaching", "AASI Level II Riding Passed / Weekend Snowboard Coaching"],
  [
    "#hero-title",
    '<span class="hero-title-main"><span>真正的自由</span><span>来自掌控</span></span>',
    '<span class="hero-title-main"><span>Real freedom</span><span>comes from control</span></span><span class="hero-title-en">Ride with Control</span>',
    "html"
  ],
  [
    ".hero-copy",
    "从第一次落叶飘，到自信刻滑。基于 AASI 教学体系，帮助你建立稳定、可控的滑行。",
    "From your first falling leaf to confident carving, AASI-based coaching helps you build stable, controlled riding."
  ],
  [".hero-actions .primary", "约我上雪", "Ride With Me"],
  [".hero-actions .ghost", "看训练栏目", "View Training"],
  [".hero-panel div:nth-child(1) .label", "AASI Riding 已通过", "AASI Riding Passed"],
  [".hero-panel div:nth-child(2) .label", "AASI 单板认证教练", "AASI Certified Instructor"],
  [".hero-panel div:nth-child(3) .metric", "周末", "WKND"],
  [".hero-panel div:nth-child(3) .label", "雪场教学与跟拍", "On-snow coaching + filming"],
  [".intro .section-label", "Coach Profile", "Coach Profile"],
  [".intro h2", "会跟拍、会复盘，也按 AASI 标准看动作。", "Filmed runs, practical feedback, and AASI-based movement analysis."],
  [
    ".intro p",
    "训练不是堆术语。每节课都会先看站姿、重心、视线、板刃和转弯阶段，再把问题拆成可以当天练起来的小目标。你会知道为什么摔、怎么改、下一趟该盯哪一个动作。",
    "Good coaching is not a pile of jargon. Each session starts with stance, balance, vision, edge control, and turn phase, then turns the problem into one small target you can practice that day."
  ],
  [".credentials .section-label", "Verified Background", "Verified Background"],
  [".credentials h2", "真实资料做背书，教学方法不靠玄学。", "Real credentials, clear coaching."],
  [".credential-copy h3", "AASI Level II Riding Passed / Level I Certified", "AASI Level II Riding Passed / Level I Certified"],
  [
    ".credential-copy p:nth-of-type(1)",
    "资料显示 Hong Lin 于 2026 年 2 月通过 AASI Certified Level II Snowboard Riding assessment，并在 2024 年 2 月通过 AASI Certified Level I Snowboard assessment。",
    "Hong Lin passed the AASI Certified Level II Snowboard Riding assessment in February 2026, and passed the AASI Certified Level I Snowboard assessment in February 2024."
  ],
  [
    ".credential-copy p:nth-of-type(2)",
    "Level II Riding 评估覆盖高级地形中的技术基本功整合、turn shape、turn size、line、TID 调整以及 park / bumps / off-piste 等项目。主页只展示与教学可信度相关的信息。",
    "Level II Riding covers technical fundamentals across more demanding terrain, including turn shape, turn size, line choice, TID adjustments, park, bumps, and off-piste tasks."
  ],
  [".credential-images figcaption", "AASI Level 1 认证", "AASI Level 1 Certificate"],
  [".courses .section-label", "Lesson Menu", "Lesson Menu"],
  [".courses h2", "按你的身体素质、能力、进展定制最适合你的训练课程。", "Training plans tailored to your fitness, ability, and progression."],
  [".course-card:nth-child(1) .course-tag", "Beginner", "Beginner"],
  [".course-card:nth-child(1) h3", "五节课目标：稳定 S 弯", "Goal in five sessions: stable S turns"],
  [".course-card:nth-child(1) p", "从装备、站姿、推坡、落叶飘到基础换刃，重点先建立安全感和速度控制。", "From gear, stance, skating, falling leaf, and basic edge changes to confidence and speed control."],
  [".course-card:nth-child(1) li:nth-child(1)", "周末雪场教学", "Weekend on-snow coaching"],
  [".course-card:nth-child(1) li:nth-child(2)", "摔倒与起身保护", "Fall and recovery basics"],
  [".course-card:nth-child(1) li:nth-child(3)", "课后动作清单", "Post-session practice list"],
  [".course-card:nth-child(2) .course-tag", "Video Review", "Video Review"],
  [".course-card:nth-child(2) h3", "GoPro 跟拍 + 动作复盘", "GoPro follow-cam + review"],
  [".course-card:nth-child(2) p", "全天跟拍素材加课程总结，用慢镜头看你在换刃、压刃、控速时到底发生了什么。", "Follow-cam clips plus a session summary, so we can slow down edge changes, pressure, and speed control."],
  [".course-card:nth-child(2) li:nth-child(1)", "跟拍视频素材", "Follow-cam footage"],
  [".course-card:nth-child(2) li:nth-child(2)", "重点错误截图标注", "Key screenshots with notes"],
  [".course-card:nth-child(2) li:nth-child(3)", "下一次训练建议", "Next-session training cues"],
  [".course-card:nth-child(3) .course-tag", "Progression", "Progression"],
  [".course-card:nth-child(3) h3", "换刃到刻滑进阶", "From edge changes to carving"],
  [".course-card:nth-child(3) p", "用 AASI 技术基本功拆解重心、压力、板刃角和转板方式，让你知道每一趟为什么变好。", "We use AASI fundamentals to break down balance, pressure, edge angle, and board steering."],
  [".course-card:nth-child(3) li:nth-child(1)", "转弯阶段分析", "Turn-phase analysis"],
  [".course-card:nth-child(3) li:nth-child(2)", "重心与压力练习", "Balance and pressure drills"],
  [".course-card:nth-child(3) li:nth-child(3)", "板刃控制训练", "Edge-control training"],
  [".method .section-label", "AASI-based Method", "AASI-based Method"],
  [".method h2", "用六个技术基本功，稳定滑好每一个弯。", "Use six technical fundamentals to ride every turn with stability."],
  [".method-steps article:nth-child(1) h3", "纵向重心", "Fore-aft balance"],
  [".method-steps article:nth-child(1) p", "看重心和支撑面在板长方向的关系，解决前后脚压力失衡。", "Track how your center of mass relates to the board length to fix front/back pressure issues."],
  [".method-steps article:nth-child(2) h3", "横向重心", "Lateral balance"],
  [".method-steps article:nth-child(2) p", "看重心如何跨过板宽，帮助换刃更顺，不被板刃绊住。", "Track how your center of mass moves across the board width for smoother edge changes."],
  [".method-steps article:nth-child(3) h3", "压力大小", "Pressure magnitude"],
  [".method-steps article:nth-child(3) p", "判断压力建立的时机、大小和持续时间，让控速不只靠刹车。", "Adjust when, how much, and how long pressure builds so speed control is not only braking."],
  [".method-steps article:nth-child(4) h3", "板刃倾角", "Board tilt"],
  [".method-steps article:nth-child(4) p", "用 inclination 和 angulation 控制板刃，找到稳定抓雪的角度。", "Use inclination and angulation to manage edge angle and create a cleaner grip."],
  [".method-steps article:nth-child(5) h3", "转板", "Board pivot"],
  [".method-steps article:nth-child(5) p", "用屈伸和身体旋转控制板的 pivot，减少只靠上身硬拧。", "Use flexion, extension, and body rotation to control pivot without twisting from the upper body only."],
  [".method-steps article:nth-child(6) h3", "板身扭转", "Board twist"],
  [".method-steps article:nth-child(6) p", "用脚踝、膝盖和髋部控制板身 twist，让换刃更细腻。", "Use ankles, knees, and hips to manage board twist for more refined edge changes."],
  [".pricing .section-label", "Pricing Menu", "Pricing Menu"],
  [".pricing h2", "选择适合你人数、雪场和节奏的课程套餐。", "Pick the format that fits your crew, mountain day, and pace."],
  [".price-card:nth-child(1) .price-type", "一对一小时课", "Private Hourly"],
  [".price-card:nth-child(1) h3", "$90/h", "$90/h"],
  [".price-card:nth-child(1) li:nth-child(1)", "一节课 2 个小时，Big Snow 或大山", "2-hour lesson, Big Snow or mountain days"],
  [".price-card:nth-child(1) li:nth-child(2)", "课程总结视频", "Lesson recap video"],
  [".price-card:nth-child(2) .price-type", "一对二小时课", "Semi-private Hourly"],
  [".price-card:nth-child(2) h3", "$150/h", "$150/h"],
  [".price-card:nth-child(2) li:nth-child(1)", "一节课 2 个小时，大山", "2-hour lesson, mountain days"],
  [".price-card:nth-child(2) li:nth-child(2)", "课程总结视频", "Lesson recap video"],
  [".price-card:nth-child(3) .price-type", "一对一全天课", "Private Day"],
  [".price-card:nth-child(3) h3", "$400/day", "$400/day"],
  [".price-card:nth-child(3) li:nth-child(1)", "一天 5 个小时，大山", "5-hour day, mountain terrain"],
  [".price-card:nth-child(3) li:nth-child(2)", "GoPro 视频跟拍", "GoPro follow-cam"],
  [".price-card:nth-child(4) .price-type", "一对二全天课", "Semi-private Day"],
  [".price-card:nth-child(4) h3", "$680/day", "$680/day"],
  [".price-card:nth-child(4) li:nth-child(1)", "一天 5 个小时，大山", "5-hour day, mountain terrain"],
  [".price-card:nth-child(4) li:nth-child(2)", "GoPro 视频跟拍", "GoPro follow-cam"],
  [".student-lines .section-label", "Student Lines", "Student Lines"],
  [".student-lines h2", "真实学员片段，比承诺更有说服力。", "Real student clips say more than promises."],
  [".student-video-caption .episode", "学员训练片段", "Student highlight"],
  [".student-video-caption h3", "先看线路，再看动作。", "Read the line first, then the movement."],
  [".student-video-caption p:last-child", "上课时我会把学员的滑行拍下来，用真实路线、速度和地形讨论下一趟怎么改。", "During lessons, we film real runs and use line, speed, and terrain to decide what to adjust on the next lap."],
  [".coach-notes article:nth-child(1) h3", "当场调整", "Adjust on the spot"],
  [".coach-notes article:nth-child(1) p", "充分利用排队和坐缆车的时间讨论问题。能在下一趟试的动作，就当场改。", "We use lift lines and chairlift time to talk through problems. If a cue can be tested on the next run, we try it right there."],
  [".coach-notes article:nth-child(2) h3", "视频复盘", "Video review"],
  [".coach-notes article:nth-child(2) p", "跟拍视频会保留关键片段，课后用截图或文字标出最值得练的一两个点。", "Key follow-cam clips become screenshots and notes around the one or two points worth practicing next."],
  [".coach-notes article:nth-child(3) h3", "进阶路线", "Progression path"],
  [".coach-notes article:nth-child(3) p", "新手先稳住 S 弯，进阶再追求刻滑、动态平衡和更复杂地形。", "First stabilize S turns, then build toward carving, dynamic balance, and more complex terrain."],
  [".clip-prev", "上一条", "Previous"],
  [".clip-next", "下一条", "Next"],
  [".clip-tab:nth-of-type(2)", "片段 01", "Clip 01"],
  [".clip-tab:nth-of-type(3)", "片段 02", "Clip 02"],
  [".clip-tab:nth-of-type(4)", "片段 03", "Clip 03"],
  [".booking .section-label", "Book A Session", "Book A Session"],
  [".booking h2", "发来你的阶段和目标，约一个周末上雪。", "Send your level and goal. Let's book a weekend on snow."],
  [".booking > div > p:not(.section-label)", "适合想系统入门、突破换刃或开始练更稳定 S 弯的单板玩家。填写你的阶段、常去雪场和目标，我会给出课程建议。", "For riders who want a clean start, better edge changes, or more stable S turns. Share your level, mountain, and goal, and I will suggest the next step."],
  [".booking-form label:nth-of-type(1) .field-label", "你的名字", "Your name"],
  [".booking-form label:nth-of-type(2) .field-label", "当前阶段", "Current level"],
  [".booking-form label:nth-of-type(3) .field-label", "邮箱", "Email"],
  [".booking-form label:nth-of-type(4) .field-label", "电话", "Phone"],
  [".booking-form label:nth-of-type(5) .field-label", "微信号", "WeChat ID"],
  [".booking-form label:nth-of-type(6) .field-label", "训练目标", "Training goal"],
  [".booking-form option:nth-child(1)", "纯新手 beginner", "First-timer / beginner"],
  [".booking-form option:nth-child(2)", "新手入门进阶 intermediate", "Beginner progression / intermediate"],
  [".booking-form option:nth-child(3)", "高级地形动态滑行 advance", "Advanced terrain / dynamic riding"],
  [".booking-form button", "发送预约意向", "Send booking request"],
  ["footer div a:nth-child(1)", "回到顶部", "Back to top"],
  ["footer div a:nth-child(2)", "关注小红书", "Follow on RED"],
];

const placeholders = [
  [".booking-form input[name='name']", "怎么称呼你", "What should I call you?"],
  [".booking-form input[name='email']", "方便接收课程确认", "For lesson confirmation"],
  [".booking-form input[name='phone']", "可选，方便紧急联系", "Optional, for urgent contact"],
  [".booking-form input[name='wechat']", "优先用于沟通预约时间", "Best for scheduling"],
  [".booking-form textarea[name='goal']", "比如：换刃更稳、刻滑不甩尾、学 ollie", "Example: smoother edge changes, cleaner carving, ollie basics"],
];

let currentLang = localStorage.getItem("snowboard-lang-v2") || "en";

const setLanguage = (lang) => {
  currentLang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  localStorage.setItem("snowboard-lang-v2", lang);

  translations.forEach(([selector, zh, en, mode]) => {
    const element = document.querySelector(selector);
    if (element) {
      if (mode === "html") {
        element.innerHTML = lang === "zh" ? zh : en;
      } else {
        element.textContent = lang === "zh" ? zh : en;
      }
    }
  });

  placeholders.forEach(([selector, zh, en]) => {
    const element = document.querySelector(selector);
    if (element) {
      element.setAttribute("placeholder", lang === "zh" ? zh : en);
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
    button.setAttribute("aria-pressed", button.dataset.lang === lang ? "true" : "false");
  });

  menuToggle?.setAttribute("aria-label", lang === "zh" ? "打开菜单" : "Open menu");
  updateInstallBannerText();
};

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang || "zh"));
});

const closeMenu = () => {
  siteHeader?.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = siteHeader?.classList.toggle("menu-open") || false;
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement || event.target instanceof HTMLButtonElement) {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Node) || siteHeader?.contains(event.target)) {
    return;
  }
  closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const setStudentClip = (index) => {
  if (!(studentPlayer instanceof HTMLVideoElement) || studentClips.length === 0) {
    return;
  }

  activeClip = (index + studentClips.length) % studentClips.length;
  studentPlayer.pause();
  studentPlayer.src = studentClips[activeClip];
  studentPlayer.load();

  clipTabs.forEach((tab) => {
    tab.classList.toggle("active", Number(tab.dataset.clipIndex) === activeClip);
    tab.setAttribute("aria-pressed", Number(tab.dataset.clipIndex) === activeClip ? "true" : "false");
  });
};

clipTabs.forEach((tab) => {
  tab.addEventListener("click", () => setStudentClip(Number(tab.dataset.clipIndex || 0)));
});

clipPrev?.addEventListener("click", () => setStudentClip(activeClip - 1));
clipNext?.addEventListener("click", () => setStudentClip(activeClip + 1));

if (heroVideo instanceof HTMLVideoElement) {
  const start = Number(heroVideo.dataset.start || 0);
  const end = Number(heroVideo.dataset.end || 0);

  heroVideo.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(start) && start > 0) {
      heroVideo.currentTime = start;
    }
  });

  heroVideo.addEventListener("timeupdate", () => {
    if (Number.isFinite(end) && end > start && heroVideo.currentTime >= end) {
      heroVideo.currentTime = start;
      heroVideo.play();
    }
  });
}

if (form) {
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name")?.toString().trim() || "你";

  if (data.get("bot-field")) {
    return;
  }

  if (!bookingEndpoint) {
    note.textContent =
      currentLang === "zh"
        ? "Google Sheet 收集端点还没有配置。请先部署 google-apps-script.js，然后把 Web App URL 填进 google-sheets-config.js。"
        : "The Google Sheet endpoint is not configured yet. Deploy google-apps-script.js, then paste the Web App URL into google-sheets-config.js.";
    return;
  }

  data.set("submittedAt", new Date().toISOString());
  data.set("language", currentLang);
  data.set("source", window.location.href);
  data.set("userAgent", window.navigator.userAgent);

  try {
    await fetch(bookingEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    });

    note.textContent =
      currentLang === "zh"
        ? `${name}，预约意向已发送到 Google Sheet，我会尽快联系你。`
        : `${name}, your booking request was sent to Google Sheets. I will contact you soon.`;
    form.reset();
  } catch {
    note.textContent =
      currentLang === "zh"
        ? "发送失败了。可以先截图或复制内容发给我微信，我会检查 Google Sheet 配置。"
        : "Submission failed. Please screenshot or copy the details to WeChat while I check the Google Sheet setup.";
  }
});
}

if (isStandalone) {
  document.body.classList.add("is-standalone");
}

const createInstallBanner = () => {
  let banner = document.querySelector(".app-install");

  if (banner) {
    return banner;
  }

  banner = document.createElement("aside");
  banner.className = "app-install";
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML = `
    <img src="./assets/snowboard-avatar.svg?v=20260909-2" alt="" />
    <div>
      <strong></strong>
      <small></small>
    </div>
    <button type="button" class="install-action"></button>
    <button type="button" class="dismiss-install" aria-label="Close">×</button>
  `;
  document.body.appendChild(banner);

  banner.querySelector(".dismiss-install")?.addEventListener("click", () => {
    localStorage.setItem("snowboard-install-dismissed", "true");
    banner.classList.remove("show");
  });

  banner.querySelector(".install-action")?.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      localStorage.setItem("snowboard-install-dismissed", "true");
      banner.classList.remove("show");
      return;
    }

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    banner.classList.remove("show");
  });

  return banner;
};

function updateInstallBannerText() {
  const banner = document.querySelector(".app-install");

  if (!banner) {
    return;
  }

  const title = banner.querySelector("strong");
  const copy = banner.querySelector("small");
  const action = banner.querySelector(".install-action");
  const isZh = currentLang === "zh";

  if (title) {
    title.textContent = isZh ? "安装 Hong Snow App" : "Install the Hong Snow app";
  }

  if (copy) {
    copy.textContent = deferredInstallPrompt
      ? isZh
        ? "把课程、视频和预约入口放到手机桌面。"
        : "Keep booking, clips, and lesson notes on your home screen."
      : isZh
        ? "iPhone 可在 Safari 分享菜单中选择“添加到主屏幕”。"
        : "On iPhone, use Safari Share, then Add to Home Screen.";
  }

  if (action) {
    action.textContent = deferredInstallPrompt ? (isZh ? "安装" : "Install") : (isZh ? "知道了" : "Got it");
  }
}

const showInstallBanner = () => {
  if (isNativeApp || isStandalone || localStorage.getItem("snowboard-install-dismissed") === "true") {
    return;
  }

  const banner = createInstallBanner();
  updateInstallBannerText();
  banner.classList.add("show");
};

installButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      document.querySelector(".app-install")?.classList.remove("show");
      return;
    }

    showInstallBanner();
  });
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  showInstallBanner();
});

window.addEventListener("appinstalled", () => {
  localStorage.setItem("snowboard-install-dismissed", "true");
  document.querySelector(".app-install")?.classList.remove("show");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js?v=20260909-2").catch(() => {});
  });
}

window.addEventListener("load", () => {
  const isSmallTouchScreen = window.matchMedia("(max-width: 760px)").matches;
  const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);

  if (isSmallTouchScreen && isIos) {
    window.setTimeout(showInstallBanner, 1400);
  }
});

if (welcomeScreen) {
  document.body.classList.add("has-welcome");
  requestAnimationFrame(() => welcomeScreen.classList.add("play"));

  window.setTimeout(() => {
    welcomeScreen.remove();
    document.body.classList.remove("has-welcome");
  }, 4800);
}

setLanguage(currentLang);
