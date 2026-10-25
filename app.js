(function () {
  const C = window.SITE_CONFIG;
  const $ = (s) => document.querySelector(s);

  // ---------- أدوات ----------
  async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // للاستخدام من الكونسول لتوليد hash
  window.hashPassword = async (p) => { const h = await sha256(p); console.log(h); return h; };

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

  // نسخ الشعار للقائمة
  const loginLogo = $("#loginView .logo");
  $("#menuView .logo").innerHTML = loginLogo.innerHTML;

  // ---------- القائمة ----------
  const grid = $("#menuGrid");
  C.menu.forEach((m) => {
    const b = document.createElement("button");
    b.className = "tile" + (m.wide ? " wide" : "");
    b.innerHTML = `<i class="fa-solid ${m.icon}"></i><span>${m.label}</span>`;
    b.onclick = () => (m.url ? window.open(m.url, "_blank", "noopener") : toast("قريباً..."));
    grid.appendChild(b);
  });

  // ---------- العرض ----------
  function show(user) {
    const logged = !!user;
    $("#loginView").hidden = logged;
    $("#menuView").hidden = !logged;
    $("#topbar").hidden = !logged;
    const old = $("#adminTile");
    if (old) old.remove();
    if (logged) {
      $("#userName").textContent = user.name;
      $("#topbar").textContent = C.welcomeBar;
      if (user.admin) {
        const b = document.createElement("button");
        b.id = "adminTile";
        b.className = "tile wide";
        b.innerHTML = '<i class="fa-solid fa-user-gear"></i><span>لوحة التحكم</span>';
        b.onclick = () => (location.href = "admin.html");
        grid.appendChild(b);
      }
    }
  }

  // المستخدمون يُقرأون من users.json (تعدّله لوحة التحكم)، وإن لم يوجد نستخدم config.js
  let USERS = C.users || [];
  const usersReady = fetch("users.json?t=" + Date.now(), { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((list) => { if (Array.isArray(list)) USERS = list; })
    .catch(() => {});

  usersReady.then(() => {
    const saved = sessionStorage.getItem("session_user");
    show(saved ? USERS.find((u) => u.username === saved) : null);
  });

  // ---------- تسجيل الدخول ----------
  $("#togglePass").onclick = () => {
    const p = $("#password");
    const showIt = p.type === "password";
    p.type = showIt ? "text" : "password";
    $("#togglePass i").className = showIt ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
  };

  $("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await usersReady;
    const u = $("#username").value.trim();
    const pw = $("#password").value;
    const h = await sha256(pw);
    const user = USERS.find((x) => x.username === u && (x.password === pw || x.passwordHash === h));
    if (!user) { $("#loginError").hidden = false; return; }
    $("#loginError").hidden = true;
    sessionStorage.setItem("session_user", user.username);
    $("#loginForm").reset();
    show(user);
  });

  $("#logoutBtn").onclick = () => {
    sessionStorage.removeItem("session_user");
    show(null);
  };
})();
