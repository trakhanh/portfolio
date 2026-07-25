(() => {
  "use strict";

  const portfolio = window.PORTFOLIO_CONTENT;
  const cases = window.PROJECT_CASES;
  if (!portfolio || !cases) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const setText = (selector, value) => {
    const element = $(selector);
    if (element) element.textContent = value;
  };

  const savedLanguage = localStorage.getItem("portfolio-language");
  let language = savedLanguage === "en" ? "en" : "vi";

  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const projectId =
    pathParts[0] === "projects" && pathParts[1]
      ? pathParts[1]
      : new URLSearchParams(window.location.search).get("id");

  function updateThemeControl() {
    const theme = document.documentElement.dataset.theme;
    const toggle = $("#themeToggle");
    if (!toggle) return;

    toggle.setAttribute(
      "aria-label",
      theme === "dark"
        ? language === "vi"
          ? "Chuyển sang giao diện sáng"
          : "Switch to light theme"
        : language === "vi"
          ? "Chuyển sang giao diện tối"
          : "Switch to dark theme"
    );
    $('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#0d0f0e" : "#ecece6"
    );
  }

  function updateLanguageControl() {
    $$("[data-lang-option]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.langOption === language);
    });
    $("#languageToggle")?.setAttribute(
      "aria-label",
      language === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"
    );
    setText(
      ".skip-link",
      language === "vi" ? "Bỏ qua để đến nội dung" : "Skip to content"
    );
  }

  function normalizeImage(path) {
    return path.startsWith("./") ? `/${path.slice(2)}` : path;
  }

  function renderNotFound(labels) {
    document.title = `${labels.notFoundTitle} — Gia Khánh`;
    $(".case-section-nav")?.remove();
    const main = $("#caseMain");
    if (!main) return;
    main.innerHTML = `
      <section class="case-not-found">
        <div>
          <h1>404</h1>
          <p>${labels.notFoundText}</p>
          <a class="button button-primary" href="/#projects">${labels.notFoundButton}</a>
        </div>
      </section>
    `;
  }

  function renderCaseStudy() {
    const copy = portfolio[language];
    const caseCopy = cases[language];
    const labels = caseCopy.labels;
    const projects = copy.projects.items;
    const projectIndex = projects.findIndex((item) => item.id === projectId);
    const project = projects[projectIndex];
    const detail = caseCopy.items[projectId];

    document.documentElement.lang = language;
    updateLanguageControl();
    updateThemeControl();

    if (!project || !detail) {
      renderNotFound(labels);
      return;
    }

    document.title = `${project.title} — Project Case Study`;
    $('meta[name="description"]')?.setAttribute("content", project.description);
    $('meta[property="og:title"]')?.setAttribute("content", project.title);
    $('meta[property="og:description"]')?.setAttribute(
      "content",
      project.description
    );

    setText("#backToPortfolio", `← ${labels.back}`);
    $("#caseBrand")?.setAttribute("aria-label", labels.back);
    setText(
      "#caseIndex",
      `CASE ${String(projectIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`
    );
    setText("#casePhase", project.phaseLabel);
    setText("#caseTitle", project.title);
    setText("#caseSummary", project.description);
    setText("#caseRoleLabel", labels.role);
    setText("#caseRoleValue", detail.role);
    setText("#caseResultLabel", labels.result);
    setText("#caseResultValue", project.result);
    setText("#caseScopeLabel", labels.scope);
    setText(
      "#caseScopeValue",
      project.phase === "foundation" ? labels.academic : labels.professional
    );

    const image = $("#caseImage");
    if (image) {
      image.src = normalizeImage(project.image);
      image.alt = project.title;
    }
    setText(
      "#caseImageCaption",
      `${labels.imageCaption} · ${project.title}`
    );

    const navigation = [
      ["#caseNavChallenge", labels.challenge],
      ["#caseNavRole", labels.roleSection],
      ["#caseNavProcess", labels.process],
      ["#caseNavTechnology", labels.technology],
      ["#caseNavOutcome", labels.outcome]
    ];
    navigation.forEach(([selector, value]) => setText(selector, value));

    setText("#caseMapLabel", labels.map);
    const tags = $("#caseTags");
    if (tags) {
      tags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
    }

    setText("#challengeTitle", labels.challenge);
    setText("#challengeText", detail.challenge);
    setText("#roleTitle", labels.roleSection);
    setText("#roleText", detail.role);
    const responsibilities = $("#responsibilityList");
    if (responsibilities) {
      responsibilities.innerHTML = detail.responsibilities
        .map((item) => `<li>${item}</li>`)
        .join("");
    }

    setText("#processTitle", labels.process);
    const process = $("#processList");
    if (process) {
      process.innerHTML = detail.process
        .map(
          (step) => `
            <li>
              <h3>${step.title}</h3>
              <p>${step.description}</p>
            </li>
          `
        )
        .join("");
    }

    setText("#technologyTitle", labels.technology);
    const technology = $("#technologyGrid");
    if (technology) {
      technology.innerHTML = detail.technologies
        .map(
          (item, index) => `
            <article class="case-tech-card">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <h3>${item.name}</h3>
              <p>${item.purpose}</p>
            </article>
          `
        )
        .join("");
    }

    setText("#outcomeTitle", labels.outcome);
    setText("#outcomeText", detail.outcome);
    const evidence = $("#evidenceList");
    if (evidence) {
      evidence.innerHTML = detail.evidence
        .map((item) => `<li>${item}</li>`)
        .join("");
    }
    setText("#learningLabel", labels.learning);
    setText("#learningText", detail.learning);

    const privacy = $("#privacyNote");
    if (privacy) {
      privacy.hidden = !detail.privacyNote;
      privacy.textContent = detail.privacyNote || "";
    }

    const links = $("#caseLinks");
    if (links) {
      links.innerHTML = project.links
        .map(
          (link) =>
            `<a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`
        )
        .join("");
    }

    const previous = projects[(projectIndex - 1 + projects.length) % projects.length];
    const next = projects[(projectIndex + 1) % projects.length];
    const previousLink = $("#previousProject");
    const nextLink = $("#nextProject");
    if (previousLink) {
      previousLink.href = `/projects/${previous.id}/`;
      previousLink.innerHTML = `<small>${labels.previous}</small><strong>← ${previous.title}</strong>`;
    }
    if (nextLink) {
      nextLink.href = `/projects/${next.id}/`;
      nextLink.innerHTML = `<small>${labels.next}</small><strong>${next.title} →</strong>`;
    }

    setText("#caseContactEyebrow", labels.contactEyebrow);
    setText("#caseContactTitle", labels.contactTitle);
    setText("#caseContactButton", `${labels.contactButton} ↗`);
  }

  $("#languageToggle")?.addEventListener("click", () => {
    language = language === "vi" ? "en" : "vi";
    localStorage.setItem("portfolio-language", language);
    renderCaseStudy();
  });

  $("#themeToggle")?.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
    updateThemeControl();
  });

  renderCaseStudy();
})();
