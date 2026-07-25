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

  const technologyVisuals = {
    Python: [{ icon: "python", fallback: "PY" }],
    YOLOv8: [{ icon: "ultralytics", fallback: "YOLO" }],
    SORT: [{ fallback: "SORT" }],
    OpenCV: [{ icon: "opencv", fallback: "CV" }],
    PyTorch: [{ icon: "pytorch", fallback: "PT" }],
    BDD100K: [{ fallback: "BDD" }],
    KITTI: [{ fallback: "KITTI" }],
    "Jupyter / Kaggle": [
      { icon: "jupyter", fallback: "JUP" },
      { icon: "kaggle", fallback: "KG" }
    ],
    Streamlit: [{ icon: "streamlit", fallback: "ST" }],
    CNN: [{ fallback: "CNN" }],
    "VGG16 / ResNet50": [{ fallback: "NN" }],
    "U-Net": [{ fallback: "U-NET" }],
    n8n: [{ icon: "n8n", fallback: "n8n" }],
    "GPT / Gemini": [
      { icon: "openai", fallback: "OAI" },
      { icon: "googlegemini", fallback: "GM" }
    ],
    Supabase: [{ icon: "supabase", fallback: "SB" }],
    "Website / Facebook": [
      { fallback: "WEB" },
      { icon: "facebook", fallback: "FB" }
    ],
    "Google Apps Script": [
      { icon: "googleappsscript", fallback: "GAS" }
    ],
    "Sheets API": [{ icon: "googlesheets", fallback: "GS" }],
    "Calendar API": [{ icon: "googlecalendar", fallback: "GC" }],
    "Email Automation": [{ icon: "gmail", fallback: "MAIL" }],
    "Landing Page": [{ fallback: "WEB" }],
    "Online Payment": [{ fallback: "PAY" }],
    "Registration Form": [{ fallback: "FORM" }],
    "Responsive Web": [{ fallback: "RWD" }],
    "JavaScript / Web App": [
      { icon: "javascript", fallback: "JS" },
      { fallback: "WEB" }
    ],
    "ERP / HRM Model": [{ fallback: "ERP" }],
    RBAC: [{ fallback: "RBAC" }],
    "Workflow / API": [{ fallback: "API" }],
    "ChatGPT / Claude": [
      { icon: "openai", fallback: "OAI" },
      { icon: "anthropic", fallback: "CL" }
    ],
    "Gemini / NotebookLM": [
      { icon: "googlegemini", fallback: "GM" },
      { icon: "notebooklm", fallback: "NLM" }
    ],
    Antigravity: [{ icon: "google", fallback: "AG" }],
    "AI Visual / Voice": [{ fallback: "AI" }]
  };

  function renderTechnologyVisual(name) {
    const visuals = technologyVisuals[name] || [{ fallback: name.slice(0, 4) }];
    return `
      <div class="case-tech-logos" aria-hidden="true">
        ${visuals
          .map(
            ({ icon, fallback }) => `
              <span class="case-tech-logo${icon ? "" : " is-fallback"}">
                ${
                  icon
                    ? `<img src="/img/tool-icons/${icon}.svg" alt="" width="24" height="24" loading="lazy" decoding="async" />`
                    : ""
                }
                <b>${fallback}</b>
              </span>
            `
          )
          .join("")}
      </div>
    `;
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
      const cover = image.closest(".case-cover");
      const revealImage = () => {
        cover?.classList.remove("is-loading");
        cover?.classList.add("is-loaded");
      };
      const showImageError = () => {
        cover?.classList.remove("is-loading");
        cover?.classList.add("is-error");
      };

      cover?.classList.remove("is-loaded", "is-error");
      cover?.classList.add("is-loading");
      image.addEventListener("load", revealImage, { once: true });
      image.addEventListener("error", showImageError, { once: true });
      image.src = normalizeImage(project.image);
      image.alt = project.title;

      if (image.complete && image.naturalWidth) {
        revealImage();
      }
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
              <div class="case-tech-card-head">
                ${renderTechnologyVisual(item.name)}
                <span class="case-tech-index">${String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>${item.name}</h3>
              <p>${item.purpose}</p>
            </article>
          `
        )
        .join("");

      $$(".case-tech-logo img", technology).forEach((image) => {
        image.addEventListener(
          "error",
          () => {
            image.closest(".case-tech-logo")?.classList.add("is-fallback");
            image.remove();
          },
          { once: true }
        );
      });
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
    const heroLinks = $("#caseHeroLinks");
    const renderedLinks = project.links
      .map((link) => {
        const arrow = /[↗→]$/.test(link.label.trim())
          ? ""
          : '<span aria-hidden="true">↗</span>';
        return `<a href="${link.url}" target="_blank" rel="noopener">${link.label}${arrow}</a>`;
      })
      .join("");

    if (links) {
      links.innerHTML = renderedLinks;
    }
    if (heroLinks) {
      heroLinks.hidden = !project.links.length;
      heroLinks.innerHTML = renderedLinks;
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

  function setupCaseNavigation() {
    const sections = $$(".case-section");
    const links = $$(".case-section-nav a, .case-flow a");
    if (!sections.length || !links.length) return;

    let frame = 0;
    const updateActiveSection = () => {
      const navigationBottom =
        $(".case-section-nav")?.getBoundingClientRect().bottom || 132;
      const activationLine = navigationBottom + 140;
      let activeId = sections[0].id;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          activeId = section.id;
        }
      });

      links.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateActiveSection();
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
  setupCaseNavigation();
})();
