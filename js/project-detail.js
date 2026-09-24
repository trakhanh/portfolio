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

  const SECTION_CONFIG = [
    { id: "challenge", indexStr: "01", labelKey: "challenge" },
    { id: "role", indexStr: "02", labelKey: "roleSection" },
    { id: "process", indexStr: "03", labelKey: "process" },
    { id: "technology", indexStr: "04", labelKey: "technology" },
    { id: "outcome", indexStr: "05", labelKey: "outcome" }
  ];
  const VALID_SECTION_IDS = ["challenge", "role", "process", "technology", "outcome"];
  const initialHash = window.location.hash.replace(/^#/, "");

  function updateThemeControl() {
    document.documentElement.dataset.theme = "dark";
    $('meta[name="theme-color"]')?.setAttribute("content", "#0a0a0f");
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
    updateMenuControl();
  }

  function renderGlobalNavigation(copy) {
    Object.entries(copy.nav).forEach(([key, value]) => {
      setText(`[data-nav="${key}"]`, value);
    });

    const mobileCv = $("#navMobileCv");
    if (mobileCv) {
      const cvText = language === "vi" ? "Xem CV" : "View CV";
      mobileCv.innerHTML = `<span>${cvText}</span> <span class="nav-hud-arrow">↗</span>`;
    }

    $(".nav-shell")?.setAttribute(
      "aria-label",
      language === "vi" ? "Điều hướng chính" : "Primary navigation"
    );
    $("#caseBrand")?.setAttribute(
      "aria-label",
      language === "vi" ? "Gia Khánh — trang chủ" : "Gia Khanh — home"
    );
  }

  function updateMenuControl(open) {
    const menu = $("#menuToggle");
    if (!menu) return;

    const isOpen =
      typeof open === "boolean"
        ? open
        : menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute(
      "aria-label",
      language === "vi"
        ? isOpen
          ? "Đóng menu"
          : "Mở menu"
        : isOpen
          ? "Close menu"
          : "Open menu"
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
    renderGlobalNavigation(copy);
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

  function setupScrollReveal() {
    const sections = $$(".case-section");
    if (!sections.length) return;

    // Immediately reveal first section so above-the-fold content is shown
    sections[0]?.classList.add("is-revealed");

    if (!("IntersectionObserver" in window)) {
      sections.forEach((s) => s.classList.add("is-revealed"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    sections.forEach((sec) => revealObserver.observe(sec));
  }

  function setupCaseNavigation() {
    const sections = $$(".case-section");
    const links = $$(".case-section-nav a");
    if (!sections.length || !links.length) return;

    const nav = $(".case-section-nav");
    const header = $("#siteHeader");

    function getNavOffset() {
      const headerH = header ? header.offsetHeight : 64;
      return headerH + 16;
    }

    let isManualScrolling = false;
    let manualScrollTimer = null;

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const href = link.getAttribute("href") || "";
        const targetId = href.replace(/^#/, "");
        const targetSection = $(`#${targetId}`);
        if (!targetSection) return;

        isManualScrolling = true;
        clearTimeout(manualScrollTimer);

        links.forEach((l) => {
          const match = l === link;
          l.classList.toggle("is-active", match);
          if (match) {
            l.setAttribute("aria-current", "location");
            l.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
          } else {
            l.removeAttribute("aria-current");
          }
        });

        if (window.location.hash !== `#${targetId}`) {
          history.pushState(null, "", `#${targetId}`);
        }

        const navOffset = getNavOffset();
        const targetY = targetSection.getBoundingClientRect().top + window.scrollY - navOffset;

        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: "smooth"
        });

        manualScrollTimer = setTimeout(() => {
          isManualScrolling = false;
        }, 850);
      });
    });

    let frame = 0;
    const updateActiveSection = () => {
      if (isManualScrolling) return;

      const navOffset = getNavOffset();
      const activationLine = navOffset + 120;
      let activeId = sections[0].id;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          activeId = section.id;
        }
      });

      // Special check: if scrolled to the very bottom of the page, activate the last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        activeId = sections[sections.length - 1].id;
      }

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

    if (initialHash && VALID_SECTION_IDS.includes(initialHash)) {
      setTimeout(() => {
        const target = $(`#${initialHash}`);
        if (target) {
          const navOffset = getNavOffset();
          const targetY = target.getBoundingClientRect().top + window.scrollY - navOffset;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        }
      }, 200);
    }
  }

  function setupGlobalNavigation() {
    const header = $("#siteHeader");
    const menu = $("#menuToggle");
    const links = $("#navLinks");

    const updateHeader = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    const toggleNav = (open) => {
      const isOpen =
        typeof open === "boolean"
          ? open
          : !links?.classList.contains("is-open");
      links?.classList.toggle("is-open", isOpen);
      menu?.classList.toggle("is-open", isOpen);
      menu?.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("has-nav-open", isOpen);
      updateMenuControl(isOpen);
    };

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    menu?.addEventListener("click", () => toggleNav());

    $$(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => toggleNav(false));
    });

    document.addEventListener("click", (event) => {
      if (
        links?.classList.contains("is-open") &&
        !links.contains(event.target) &&
        !menu?.contains(event.target)
      ) {
        toggleNav(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !links?.classList.contains("is-open")) return;
      toggleNav(false);
      menu?.focus();
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 980 && links?.classList.contains("is-open")) {
          toggleNav(false);
        }
      },
      { passive: true }
    );
  }

  $("#languageToggle")?.addEventListener("click", () => {
    language = language === "vi" ? "en" : "vi";
    localStorage.setItem("portfolio-language", language);
    renderCaseStudy();
  });

  renderCaseStudy();
  setupGlobalNavigation();
  setupCaseNavigation();
  setupScrollReveal();
})();
