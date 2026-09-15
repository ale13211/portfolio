/* =====================================================================
   main.js — Lee los datos de data.js y arma la página.
   No hace falta tocar este archivo para agregar proyectos.
   ===================================================================== */

import { createKeyboard } from "./keyboard.js";

  const LANG_KEY = "portfolio-lang";
  let lang = readLang();
  let currentFilter = "all";

  /* ---------- Utilidades ---------- */

  // Devuelve el texto en el idioma actual. Acepta strings simples u objetos {es, en}.
  function t(value) {
    if (value == null) return "";
    if (typeof value === "string" || Array.isArray(value)) return value;
    return value[lang] ?? value.es;
  }

  // Crea un elemento con clase y texto de forma segura (sin innerHTML con datos).
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function readLang() {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "es" || saved === "en") return saved;
    } catch (e) { /* storage no disponible: seguimos con el default */ }
    return navigator.language && navigator.language.startsWith("es") ? "es" : "en";
  }

  function saveLang(value) {
    try { localStorage.setItem(LANG_KEY, value); } catch (e) { /* ignorar */ }
  }

  /* ---------- Render de secciones ---------- */

  function applyStaticTexts() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (UI[key]) node.textContent = t(UI[key]);
    });

    const toggle = document.getElementById("lang-toggle");
    toggle.textContent = lang === "es" ? "EN" : "ES";
    toggle.setAttribute("aria-label", lang === "es" ? "Change language to English" : "Cambiar idioma a español");

    document.getElementById("cv-link").href = t(PROFILE.cv);
    document.getElementById("hero-name").textContent = PROFILE.name;
    document.getElementById("brand-name").textContent = PROFILE.name;
    document.getElementById("contact-mail").href = "mailto:" + PROFILE.email;
    document.getElementById("link-linkedin").href = PROFILE.linkedin;
    document.getElementById("link-github").href = PROFILE.github;
    document.getElementById("footer-name").textContent =
      "© " + new Date().getFullYear() + " " + PROFILE.fullName + ". " + t(PROFILE.location);
  }

  function renderStrengths() {
    const root = document.getElementById("strengths-list");
    root.replaceChildren();
    STRENGTHS.forEach((s) => {
      const item = el("article", "strength");
      item.append(el("h3", "strength-title", t(s.title)));
      item.append(el("p", "strength-text", t(s.text)));
      item.append(el("p", "strength-example", t(s.example)));
      root.append(item);
    });
  }

  function renderSkills() {
    const root = document.getElementById("skills-list");
    root.replaceChildren();
    SKILLS.forEach((group) => {
      const row = el("div", "skill-row");
      row.append(el("h3", "skill-group", t(group.group)));
      const list = el("ul", "skill-items");
      group.items.forEach((item) => {
        const li = el("li", "chip chip-" + item.level, item.name);
        li.title = t(UI["stack.legend." + item.level]);
        list.append(li);
      });
      row.append(list);
      root.append(row);
    });
  }

  function renderExperience() {
    const root = document.getElementById("experience-list");
    root.replaceChildren();
    EXPERIENCE.forEach((job) => {
      const li = el("li", "job");
      const head = el("div", "job-head");
      head.append(el("h3", "job-role", t(job.role)));
      head.append(el("p", "job-meta", job.company + ", " + t(job.period)));
      li.append(head);
      const ul = el("ul", "job-points");
      t(job.points).forEach((point) => ul.append(el("li", null, point)));
      li.append(ul);
      root.append(li);
    });
  }

  function renderFilters() {
    const root = document.getElementById("project-filters");
    root.replaceChildren();
    CATEGORIES.forEach((cat) => {
      const exists = cat.id === "all" || PROJECTS.some((p) => p.category === cat.id);
      if (!exists) return;
      const btn = el("button", "filter", t(cat.label));
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(cat.id === currentFilter));
      btn.addEventListener("click", () => {
        currentFilter = cat.id;
        renderFilters();
        renderProjects();
      });
      root.append(btn);
    });
  }

  function projectCover(project, index) {
    const cover = el("div", "project-cover");
    if (project.image) {
      const img = document.createElement("img");
      img.src = project.image;
      img.alt = "";
      img.loading = "lazy";
      cover.append(img);
      return cover;
    }
    // Portada generada: una fila de mini teclas con el stack del proyecto.
    const palette = Object.values(KEY_COLORS);
    const row = el("div", "mini-keys");
    project.stack.slice(0, 5).forEach((tech, i) => {
      const k = el("span", "mini-key", tech);
      k.style.setProperty("--key", palette[(index * 3 + i * 2) % palette.length]);
      k.style.setProperty("--i", i);
      row.append(k);
    });
    cover.append(row);
    return cover;
  }

  function renderProjects() {
    const root = document.getElementById("projects-list");
    root.replaceChildren();
    const list = PROJECTS.filter((p) => currentFilter === "all" || p.category === currentFilter);

    if (list.length === 0) {
      root.append(el("p", "empty", t(UI["projects.empty"])));
      return;
    }

    list.forEach((project) => {
      const index = PROJECTS.indexOf(project);
      const card = el("a", "project");
      card.href = "#p/" + project.slug;
      card.setAttribute("aria-label", project.name + ": " + t(UI["projects.open"]));
      card.append(projectCover(project, index));

      const body = el("div", "project-body");
      const top = el("div", "project-top");
      top.append(el("h3", "project-name", project.name));
      top.append(el("span", "status status-" + (project.status.es === "En producción" ? "live" : "wip"), t(project.status)));
      body.append(top);
      body.append(el("p", "project-summary", t(project.summary)));
      const tags = el("ul", "tags");
      project.stack.slice(0, 4).forEach((s) => tags.append(el("li", "tag", s)));
      if (project.stack.length > 4) tags.append(el("li", "tag tag-more", "+" + (project.stack.length - 4)));
      body.append(tags);
      card.append(body);
      root.append(card);
    });
  }

  /* ---------- Detalle de proyecto (modal) ---------- */

  const dialog = document.getElementById("project-dialog");

  function openProject(slug) {
    const project = PROJECTS.find((p) => p.slug === slug);
    if (!project) return;
    const content = document.getElementById("dialog-content");
    content.replaceChildren();

    const close = el("button", "dialog-close", t(UI["project.close"]));
    close.type = "button";
    close.addEventListener("click", closeProject);
    content.append(close);

    content.append(projectCover(project, PROJECTS.indexOf(project)));

    const title = el("h2", "dialog-title", project.name);
    title.id = "dialog-title";
    content.append(title);
    content.append(el("span", "status status-" + (project.status.es === "En producción" ? "live" : "wip"), t(project.status)));
    content.append(el("p", "dialog-desc", t(project.description)));

    content.append(el("h3", "dialog-sub", t(UI["project.highlights"])));
    const ul = el("ul", "dialog-points");
    t(project.highlights).forEach((h) => ul.append(el("li", null, h)));
    content.append(ul);

    const tags = el("ul", "tags");
    project.stack.forEach((s) => tags.append(el("li", "tag", s)));
    content.append(tags);

    const actions = el("div", "dialog-actions");
    if (project.demo) {
      const demo = el("a", "btn btn-primary", t(UI["project.demo"]));
      demo.href = project.demo;
      demo.target = "_blank";
      demo.rel = "noopener";
      actions.append(demo);
    }
    if (project.repo) {
      const repo = el("a", "btn btn-ghost", t(UI["project.code"]));
      repo.href = project.repo;
      repo.target = "_blank";
      repo.rel = "noopener";
      actions.append(repo);
    }
    content.append(actions);

    const notes = [];
    if (!project.demo) notes.push(t(UI["project.nodemo"]));
    if (!project.repo) notes.push(t(UI["project.private"]));
    if (notes.length) content.append(el("p", "dialog-note", notes.join(" ")));

    if (!dialog.open) dialog.showModal();
    close.focus();
  }

  function closeProject() {
    if (dialog.open) dialog.close();
    if (location.hash.startsWith("#p/")) {
      history.replaceState(null, "", "#proyectos");
    }
  }

  dialog.addEventListener("click", (e) => { if (e.target === dialog) closeProject(); });
  dialog.addEventListener("cancel", (e) => { e.preventDefault(); closeProject(); });

  function handleHash() {
    const hash = location.hash;
    if (hash.startsWith("#p/")) openProject(decodeURIComponent(hash.slice(3)));
    else if (dialog.open) dialog.close();
  }
  window.addEventListener("hashchange", handleHash);

  /* ---------- Idioma ---------- */

  document.getElementById("lang-toggle").addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    saveLang(lang);
    renderAll();
    if (lastSkill) showSkill(lastSkill);
    if (dialog.open && location.hash.startsWith("#p/")) openProject(location.hash.slice(3));
  });

  function renderAll() {
    applyStaticTexts();
    renderStrengths();
    renderSkills();
    renderExperience();
    renderFilters();
    renderProjects();
  }


  /* ---------- Teclado 3D ---------- */

  const LEVEL_LABEL = {
    daily: { es: "Uso diario", en: "Daily use" },
    projects: { es: "Usado en proyectos", en: "Used in projects" },
    learning: { es: "Aprendiendo", en: "Learning" },
  };

  const callout = document.getElementById("skill-callout");
  let lastSkill = null;

  function showSkill(skill) {
    lastSkill = skill;
    document.getElementById("callout-name").textContent = skill.name;
    document.getElementById("callout-phrase").textContent = t(skill.phrase);
    const level = document.getElementById("callout-level");
    level.textContent = t(LEVEL_LABEL[skill.level]);
    level.className = "skill-callout-level level-" + skill.level;
    callout.style.setProperty("--key", KEY_COLORS[skill.color] || "#fff");
    callout.classList.remove("is-visible");
    void callout.offsetWidth; // reinicia la animación
    callout.classList.add("is-visible");
  }

  let keyboard = null;
  const stages = [...document.querySelectorAll("[data-stage]")];

  function currentStage() {
    const mid = window.innerHeight * 0.5;
    for (const section of stages) {
      const r = section.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) return section.dataset.stage;
    }
    return window.scrollY < 100 ? "hero" : "contact";
  }

  function onScroll() {
    const name = currentStage();
    document.body.dataset.stage = name;
    if (keyboard) {
      keyboard.setStage(name);
      keyboard.setInteractive(name === "skills");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  async function initKeyboard() {
    try { await document.fonts.ready; } catch (e) { /* seguir igual */ }
    keyboard = createKeyboard({
      canvas: document.getElementById("scene"),
      onKeyPress: showSkill,
      getLang: () => lang,
    });
    if (!keyboard) {
      document.body.classList.add("no-webgl");
      document.getElementById("skills-details").open = true;
    }
    onScroll();
  }

  /* ---------- Formulario de contacto ---------- */
  // Sin backend: abre el cliente de correo con el mensaje armado.
  // Si preferís recibirlo sin que abran su correo, podés usar Formspree (ver README).
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = (lang === "es" ? "Contacto desde tu portafolio: " : "Portfolio contact: ") + data.get("name");
    const body = data.get("message") + "\n\n" + data.get("name") + "\n" + data.get("email");
    location.href = "mailto:" + PROFILE.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });

  /* ---------- Inicio ---------- */

  renderAll();

  handleHash();
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));
  initKeyboard();

