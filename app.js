(function () {
  const C = window.SITE_CONFIG;
  const $ = (s) => document.querySelector(s);

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => (t.hidden = true), 1800);
  }

  // ---------- تعبئة النصوص ----------
  document.querySelectorAll("[data-bind]").forEach((el) => (el.textContent = C[el.dataset.bind] || ""));
  document.querySelectorAll(".foot").forEach((f) => {
    f.innerHTML = `${C.footerNote} <b>${C.footerOwner}</b>` + (C.creditName ? `<br>${C.creditLabel || ""}: <b>${C.creditName}</b>` : "");
  });
  document.title = C.title;
  $("#topbar").textContent = C.welcomeBar;

  // ---------- القائمة ----------
  const grid = $("#menuGrid");
  C.menu.forEach((m) => {
    const b = document.createElement("button");
    b.className = "tile" + (m.wide ? " wide" : "");
    b.innerHTML = `<i class="fa-solid ${m.icon}"></i><span>${m.label}</span>`;
    b.onclick = () => (m.url ? window.open(m.url, "_blank", "noopener") : toast("قريباً..."));
    grid.appendChild(b);
  });

  // ---------- تأثيرات الماوس ----------
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduce) return;

  const card = $("#menuView");
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  // الهدف (الماوس) والموضع الحالي (يلحق الهدف بنعومة)
  let tx = innerWidth / 2, ty = innerHeight / 2;
  let gx = tx, gy = ty;
  let rx = 0, ry = 0, trx = 0, try_ = 0; // ميلان البطاقة
  let raf = 0;

  function loop() {
    gx += (tx - gx) * 0.12;
    gy += (ty - gy) * 0.12;
    rx += (trx - rx) * 0.1;
    ry += (try_ - ry) * 0.1;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
    card.style.setProperty("--rx", rx.toFixed(2) + "deg");
    card.style.setProperty("--ry", ry.toFixed(2) + "deg");
    const moving = Math.abs(tx - gx) + Math.abs(ty - gy) + Math.abs(trx - rx) + Math.abs(try_ - ry) > 0.05;
    raf = moving ? requestAnimationFrame(loop) : 0;
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

  addEventListener("pointermove", (e) => {
    tx = e.clientX; ty = e.clientY;
    // ميلان البطاقة وحركة الشعار حسب مكان الماوس بالنسبة لمنتصف الشاشة
    const nx = (e.clientX / innerWidth - 0.5) * 2;   // -1 .. 1
    const ny = (e.clientY / innerHeight - 0.5) * 2;
    try_ = nx * 5;      // دوران حول المحور Y
    trx = -ny * 5;      // دوران حول المحور X
    card.style.setProperty("--lx", (nx * 6).toFixed(1) + "px");
    card.style.setProperty("--ly", (ny * 6).toFixed(1) + "px");
    glow.classList.add("on");
    kick();
  }, { passive: true });

  document.addEventListener("pointerleave", () => {
    trx = 0; try_ = 0;
    card.style.setProperty("--lx", "0px");
    card.style.setProperty("--ly", "0px");
    glow.classList.remove("on");
    kick();
  });

  // لمعة تلحق الماوس داخل كل زر
  grid.addEventListener("pointermove", (e) => {
    const t = e.target.closest(".tile");
    if (!t) return;
    const r = t.getBoundingClientRect();
    t.style.setProperty("--mx", e.clientX - r.left + "px");
    t.style.setProperty("--my", e.clientY - r.top + "px");
  }, { passive: true });
})();
