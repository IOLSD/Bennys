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
})();
