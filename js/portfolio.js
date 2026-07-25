(() => {
  "use strict";

  const content = window.PORTFOLIO_CONTENT;
  if (!content) {
    console.error("Portfolio content is unavailable.");
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const savedLanguage = localStorage.getItem("portfolio-language");

  let language = savedLanguage === "en" ? "en" : "vi";
  let projectFilter = "all";
  const carouselConfig = {
    projects: {
      track: "#projectGrid",
      previous: "#projectPrevious",
      next: "#projectNext",
      progress: "#projectProgress",
      status: "#projectSlideStatus"
    },
    certificates: {
      track: "#certificateGrid",
      previous: "#certificatePrevious",
      next: "#certificateNext",
      progress: "#certificateProgress",
      status: "#certificateSlideStatus"
    }
  };

  const setText = (selector, value) => {
    const element = $(selector);
    if (element) element.textContent = value;
  };

  const technologyVisuals = {
    Python: { icon: "python", fallback: "PY" },
    PyTorch: { icon: "pytorch", fallback: "PT" },
    OpenCV: { icon: "opencv", fallback: "CV" },
    Jupyter: { icon: "jupyter", fallback: "JUP" },
    ChatGPT: { icon: "openai", fallback: "OAI" },
    Claude: { icon: "anthropic", fallback: "CL" },
    Gemini: { icon: "googlegemini", fallback: "GM" },
    Antigravity: { icon: "google", fallback: "AG" },
    NotebookLM: { icon: "notebooklm", fallback: "NLM" },
    JavaScript: { icon: "javascript", fallback: "JS" },
    n8n: { icon: "n8n", fallback: "n8n" },
    "Google Apps Script": { icon: "googleappsscript", fallback: "GAS" },
    Supabase: { icon: "supabase", fallback: "SB" },
    ERP: { fallback: "ERP" },
    HRM: { fallback: "HRM" },
    "Data Analysis": { fallback: "DATA" },
    "Machine Learning": { fallback: "ML" },
    "Deep Learning": { fallback: "DL" },
    "Computer Vision": { fallback: "CV" },
    "Business Process": { fallback: "BPM" },
    "Centralized Data": { fallback: "DATA" },
    "Web App": { fallback: "WEB" },
    API: { fallback: "API" },
    RBAC: { fallback: "RBAC" },
    "AI Video": { fallback: "VIDEO" },
    "AI Visual": { fallback: "VISUAL" },
    "AI Voice": { fallback: "VOICE" }
  };

  function renderTechnologyLogo(name) {
    const visual = technologyVisuals[name] || {
      fallback: name.replace(/[^A-Za-z0-9]/g, "").slice(0, 4).toUpperCase()
    };

    return `
      <span class="tool-logo${visual.icon ? "" : " is-fallback"}" aria-hidden="true">
        ${
          visual.icon
            ? `<img src="./img/tool-icons/${visual.icon}.svg" alt="" width="22" height="22" loading="lazy" decoding="async" />`
            : ""
        }
        <b>${visual.fallback}</b>
      </span>
    `;
  }

  function setupTechnologyLogoFallbacks(root) {
    $$(".tool-logo img", root).forEach((image) => {
      image.addEventListener(
        "error",
        () => {
          image.closest(".tool-logo")?.classList.add("is-fallback");
          image.remove();
        },
        { once: true }
      );
    });
  }

  function renderNavigation(copy) {
    Object.entries(copy.nav).forEach(([key, value]) => {
      setText(`[data-nav="${key}"]`, value);
    });
  }

  function renderDisclosures(copy) {
    setText("#profileDisclosureEyebrow", copy.disclosure.profileEyebrow);
    setText("#profileDisclosureTitle", copy.disclosure.profileTitle);

    const profile = $("#profileDisclosure");
    setText(
      "#profileDisclosureAction",
      profile?.open
        ? copy.disclosure.profileClose
        : copy.disclosure.profileOpen
    );

    const capability = $("#capabilityDisclosure");
    setText(
      "#capabilityDisclosureAction",
      capability?.open
        ? copy.disclosure.capabilityClose
        : copy.disclosure.capabilityOpen
    );
  }

  function renderHero(copy) {
    setText("#heroEyebrow", copy.hero.eyebrow);
    setText("#heroStatus", copy.hero.status);
    const nameParts = copy.hero.name.split(" ");
    const heroName = $("#heroName");
    if (heroName) {
      heroName.setAttribute("aria-label", copy.hero.name);
      setText('[data-hero-name-line="1"]', nameParts.slice(0, 2).join(" "));
      setText('[data-hero-name-line="2"]', nameParts.slice(2).join(" "));
    }
    setText("#heroTitle", copy.hero.title);
    setText("#heroIntro", copy.hero.intro);
    setText("#heroPrimary", copy.hero.primary);
    setText("#heroSecondary", copy.hero.secondary);
    setText("#heroFootnote", copy.hero.footnote);
    setText("#profilePanelLabel", copy.hero.profileLabel);
    setText("#profileDirection", copy.hero.profileDirection);
    setText("#profilePanelTitle", copy.hero.profileTitle);
    setText("#profileRouteLabel", copy.hero.profileRouteLabel);
    copy.hero.profileAreas.forEach((item, index) => {
      setText(`#profileArea${index + 1}Title`, item.title);
      setText(`#profileArea${index + 1}Meta`, item.meta);
    });
    $$("[data-profile-route]").forEach((element) => {
      element.textContent = copy.hero.profileRoute[Number(element.dataset.profileRoute)];
    });
    setText("#profileMetricExperience", copy.hero.profileMetrics[0]);
    setText("#profileMetricProjects", copy.hero.profileMetrics[1]);
    setText("#profileMetricImpact", copy.hero.profileMetrics[2]);
  }

  function renderSystem(copy) {
    setText("#systemEyebrow", copy.system.eyebrow);
    setText("#systemStatus", copy.system.status);
    setText("#systemTitle", copy.system.title);
    setText("#systemIntro", copy.system.intro);
    setText("#systemProofNote", copy.system.proofNote);

    const workflow = $("#systemWorkflow");
    if (workflow) {
      workflow.innerHTML = copy.system.stages
        .map(
          (stage, index) => `
            <article class="system-stage" data-system-stage="${index + 1}">
              <header>
                <span>${stage.number}</span>
                <i aria-hidden="true"></i>
              </header>
              <p>${stage.label}</p>
              <h3>${stage.title}</h3>
              <div class="system-stage-copy">${stage.description}</div>
              <footer>
                ${stage.tags.map((tag) => `<span>${tag}</span>`).join("")}
              </footer>
            </article>
          `
        )
        .join("");
    }

    setText("#toolEcosystemEyebrow", copy.system.tools.eyebrow);
    setText("#toolEcosystemTitle", copy.system.tools.title);
    setText("#toolEcosystemIntro", copy.system.tools.intro);

    const toolEcosystem = $("#toolEcosystemGrid");
    if (toolEcosystem) {
      toolEcosystem.innerHTML = copy.system.tools.groups
        .map(
          (group) => `
            <article class="tool-ecosystem-group">
              <header>
                <span>${group.index}</span>
                <h4>${group.title}</h4>
              </header>
              <div class="tool-ecosystem-list">
                ${group.items
                  .map(
                    (item) => `
                      <div class="tool-chip">
                        ${renderTechnologyLogo(item)}
                        <span>${item}</span>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </article>
          `
        )
        .join("");
      setupTechnologyLogoFallbacks(toolEcosystem);
    }

    const metrics = $("#systemMetrics");
    if (metrics) {
      metrics.innerHTML = copy.system.metrics
        .map(
          (metric) => `
            <span>
              <strong>${metric.value}</strong>
              <small>${metric.label}</small>
            </span>
          `
        )
        .join("");
    }
  }

  function renderJourney(copy) {
    setText("#journeyEyebrow", copy.journey.eyebrow);
    setText("#journeyTitle", copy.journey.title);
    setText("#journeyIntro", copy.journey.intro);

    const grid = $("#journeyGrid");
    if (!grid) return;

    grid.innerHTML = copy.journey.items
      .map(
        (item, index) => `
          <article class="journey-card ${index === 0 ? "is-foundation" : ""}">
            <div class="journey-top">
              <span class="journey-number">${item.number}</span>
              <span class="journey-label">${item.label}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <footer>${item.meta}</footer>
          </article>
        `
      )
      .join("");
  }

  function renderWork(copy) {
    setText("#workEyebrow", copy.work.eyebrow);
    setText("#workTitle", copy.work.title);
    setText("#workIntro", copy.work.intro);

    const education = $("#educationCard");
    if (education) {
      education.innerHTML = `
        <div class="education-identity">
          <span class="education-label">${copy.work.education.label}</span>
          <p>${copy.work.education.status}</p>
        </div>
        <div class="education-detail">
          <p class="education-school">${copy.work.education.school}</p>
          <h3>${copy.work.education.degree}</h3>
          <p class="education-description">${copy.work.education.description}</p>
        </div>
        <div class="education-focus">
          <span>${copy.work.education.focusLabel}</span>
          <div>
            ${copy.work.education.focus
              .map((item) => `<small>${item}</small>`)
              .join("")}
          </div>
        </div>
      `;
    }

    const grid = $("#workGrid");
    if (!grid) return;

    grid.innerHTML = copy.work.areas
      .map(
        (area) => `
          <article class="work-card ${area.index === "A" ? "is-ai" : "is-erp"}">
            <span class="work-index">${area.index}</span>
            <h3>${area.title}</h3>
            <p>${area.description}</p>
            <ul class="capability-list">
              ${area.capabilities.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            <footer>${area.note}</footer>
          </article>
        `
      )
      .join("");
  }

  function renderExperience(copy) {
    setText("#experienceEyebrow", copy.experience.eyebrow);
    setText("#experienceTitle", copy.experience.title);
    setText("#experienceIntro", copy.experience.intro);

    const list = $("#experienceList");
    if (!list) return;

    list.innerHTML = copy.experience.items
      .map((item, index) => {
        const visibleHighlights = item.highlights.slice(0, 3);
        const remainingHighlights = item.highlights.slice(3);
        const moreLabel =
          language === "vi"
            ? `Xem thêm ${remainingHighlights.length} nội dung`
            : `View ${remainingHighlights.length} more`;

        return `
          <article class="experience-card ${item.current ? "is-current" : ""}" data-experience-index="${String(index + 1).padStart(2, "0")}">
            <div class="experience-date">
              <i aria-hidden="true"></i>
              <span>${item.date}</span>
            </div>
            <div class="experience-position">
              <p>${item.company}</p>
              <h3>${item.role}</h3>
            </div>
            <ul class="experience-highlights">
              ${visibleHighlights.map((highlight) => `<li>${highlight}</li>`).join("")}
            </ul>
            ${
              remainingHighlights.length
                ? `
                  <details class="experience-more">
                    <summary>${moreLabel}</summary>
                    <ul class="experience-highlights experience-highlights-more">
                      ${remainingHighlights.map((highlight) => `<li>${highlight}</li>`).join("")}
                    </ul>
                  </details>
                `
                : ""
            }
          </article>
        `;
      })
      .join("");

    const letter = copy.experience.recommendation;
    const recommendation = $("#recommendationCard");
    if (recommendation) {
      recommendation.innerHTML = `
        <button
          class="recommendation-preview"
          type="button"
          data-recommendation-open
          aria-label="${letter.view}"
        >
          <img src="${letter.preview}" alt="${letter.previewAlt}" loading="lazy" />
          <span>PDF · 02</span>
        </button>
        <div class="recommendation-content">
          <p class="eyebrow">${letter.eyebrow}</p>
          <h3>${letter.title}</h3>
          <p class="recommendation-description">${letter.description}</p>
          <div class="recommendation-highlights">
            ${letter.highlights.map((item) => `<span>${item}</span>`).join("")}
          </div>
          <div class="recommendation-signature">
            <div>
              <strong>${letter.issuer}</strong>
              <small>${letter.issuerRole}</small>
            </div>
            <span>${letter.date}</span>
          </div>
          <div class="recommendation-actions">
            <button class="button button-primary" type="button" data-recommendation-open>${letter.view} ↗</button>
            <a class="button button-quiet" href="${letter.file}" download>${letter.download} ↓</a>
          </div>
        </div>
      `;
    }

    const modal = $("#recommendationModal");
    if (modal) {
      modal.innerHTML = `
        <div class="recommendation-modal-backdrop" data-recommendation-close></div>
        <section
          class="recommendation-modal-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="recommendationModalTitle"
        >
          <header class="recommendation-modal-header">
            <div>
              <p class="eyebrow">${letter.eyebrow}</p>
              <h2 id="recommendationModalTitle">${letter.modalTitle}</h2>
              <p>${letter.issuer} · ${letter.date}</p>
            </div>
            <div class="recommendation-modal-actions">
              <a class="button button-quiet" href="${letter.file}" download>${letter.download} ↓</a>
              <button
                class="recommendation-modal-close"
                type="button"
                data-recommendation-close
                aria-label="${letter.close}"
              >×</button>
            </div>
          </header>
          <div class="recommendation-modal-pages">
            ${letter.pages
              .map(
                (page, index) => `
                  <figure>
                    <figcaption>${letter.pageLabel} ${String(index + 1).padStart(2, "0")} / ${String(letter.pages.length).padStart(2, "0")}</figcaption>
                    <img
                      src="${page}"
                      alt="${letter.pageLabel} ${index + 1} · ${letter.modalTitle}"
                      loading="${index === 0 ? "eager" : "lazy"}"
                    />
                  </figure>
                `
              )
              .join("")}
          </div>
        </section>
      `;
    }
  }

  function renderProjectFilters(copy) {
    const filters = $("#projectFilters");
    if (!filters) return;

    filters.setAttribute(
      "aria-label",
      language === "vi" ? "Lọc dự án" : "Filter projects"
    );
    filters.innerHTML = Object.entries(copy.projects.filters)
      .map(
        ([key, label]) => `
          <button
            class="filter-button ${key === projectFilter ? "is-active" : ""}"
            type="button"
            data-project-filter="${key}"
          >${label}</button>
        `
      )
      .join("");
  }

  function renderProjects(copy) {
    setText("#projectsEyebrow", copy.projects.eyebrow);
    setText("#projectsTitle", copy.projects.title);
    setText("#projectsIntro", copy.projects.intro);
    renderProjectFilters(copy);

    const projects =
      projectFilter === "all"
        ? copy.projects.items
        : copy.projects.items.filter((item) => item.phase === projectFilter);
    const grid = $("#projectGrid");
    if (!grid) return;

    grid.innerHTML = projects
      .map(
        (project) => `
          <article class="project-card is-${project.phase}">
            <div class="project-casebar">
              <span>CASE / ${project.id.toUpperCase().replaceAll("-", "_")}</span>
              <i aria-hidden="true"></i>
            </div>
            <div class="project-image">
              <img src="${project.image}" alt="${project.title}" loading="lazy" />
              <span class="project-phase">${project.phaseLabel}</span>
            </div>
            <div class="project-content">
              <p class="project-result">${project.result}</p>
              <h3>${project.title}</h3>
              <p class="project-description">${project.description}</p>
              <div class="project-tags">
                ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
              </div>
              <div class="project-links">
                <a class="project-detail-link" href="/projects/${project.id}/">
                  ${language === "vi" ? "Xem chi tiết" : "View case study"} →
                </a>
                ${
                  project.links.length
                    ? project.links
                        .map(
                          (link) =>
                            `<a href="${link.url}" target="_blank" rel="noopener">${link.label} ↗</a>`
                        )
                        .join("")
                    : `<span class="project-private">${
                        language === "vi"
                          ? "Thông tin chi tiết không công khai"
                          : "Detailed information is private"
                      }</span>`
                }
              </div>
            </div>
          </article>
        `
      )
      .join("");

    setText(
      "#projectCount",
      language === "vi"
        ? `${projects.length} dự án`
        : `${projects.length} selected projects`
    );

    grid.scrollLeft = 0;
    requestAnimationFrame(() => updateCarousel("projects"));
  }

  function renderAbout(copy) {
    setText("#aboutEyebrow", copy.about.eyebrow);
    setText("#aboutTitle", copy.about.title);
    setText("#aboutIntro", copy.about.intro);

    const cvLink = $("#cvLink");
    if (cvLink) {
      cvLink.textContent = `${copy.about.cv} ↗`;
      cvLink.href = copy.about.cvUrl;
    }

    const skillGroups = $("#skillGroups");
    if (!skillGroups) return;

    skillGroups.innerHTML = copy.about.groups
      .map(
        (group) => `
          <article class="skill-group">
            <h3>${group.title}</h3>
            <div class="skill-list">
              ${group.items
                .map(
                  (item) => `
                    <span class="skill-tool">
                      ${renderTechnologyLogo(item)}
                      <small>${item}</small>
                    </span>
                  `
                )
                .join("")}
            </div>
          </article>
        `
      )
      .join("");
    setupTechnologyLogoFallbacks(skillGroups);
  }

  function renderCertificates(copy) {
    setText("#certificatesEyebrow", copy.certificates.eyebrow);
    setText("#certificatesTitle", copy.certificates.title);
    setText("#certificatesIntro", copy.certificates.intro);

    const more = $("#certificateMore");
    if (more) {
      more.innerHTML = `
        <span class="certificate-more-label">${copy.certificates.moreLabel}</span>
        <div class="certificate-more-list">
          ${copy.certificates.moreItems
            .map(
              (item) => `
                <article class="certificate-mini">
                  <span class="certificate-mini-code" aria-hidden="true">${item.code}</span>
                  <span class="certificate-mini-copy">
                    <strong>${item.title}</strong>
                    <small>${item.issuer} · ${item.status}</small>
                  </span>
                </article>
              `
            )
            .join("")}
        </div>
      `;
    }

    const grid = $("#certificateGrid");
    if (!grid) return;

    grid.innerHTML = copy.certificates.items
      .map(
        (certificate) => `
          <article class="certificate-card">
            <div class="certificate-image">
              <img
                src="${certificate.image}"
                alt="${certificate.title}"
                loading="lazy"
              />
            </div>
            <div class="certificate-content">
              <div class="certificate-meta">
                <span>${certificate.issuer}</span>
                <span>${certificate.date}</span>
              </div>
              <h3>${certificate.title}</h3>
              <p class="certificate-description">${certificate.description}</p>
              <div class="certificate-tags">
                ${certificate.tags.map((tag) => `<span>${tag}</span>`).join("")}
              </div>
              <div class="certificate-links">
                ${
                  certificate.verifyUrl
                    ? `<a href="${certificate.verifyUrl}" target="_blank" rel="noopener">${copy.certificates.verify} ↗</a>`
                    : ""
                }
                <a href="${certificate.courseUrl}" target="_blank" rel="noopener">${copy.certificates.course} ↗</a>
              </div>
            </div>
          </article>
        `
      )
      .join("");

    grid.scrollLeft = 0;
    requestAnimationFrame(() => updateCarousel("certificates"));
  }

  function getCarouselMetrics(name) {
    const config = carouselConfig[name];
    const track = config ? $(config.track) : null;
    const firstCard = track?.firstElementChild;
    if (!track || !firstCard) return null;

    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const visibleCount = Math.max(
      1,
      Math.round((track.clientWidth + gap) / (cardWidth + gap))
    );
    const itemCount = track.children.length;
    const pageCount = Math.max(1, Math.ceil(itemCount / visibleCount));
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);

    return {
      track,
      gap,
      cardWidth,
      visibleCount,
      itemCount,
      pageCount,
      maxScroll
    };
  }

  function updateCarousel(name) {
    const config = carouselConfig[name];
    const metrics = getCarouselMetrics(name);
    if (!config || !metrics) return;

    const currentPage =
      metrics.maxScroll <= 1
        ? 1
        : Math.min(
            metrics.pageCount,
            Math.max(
              1,
              Math.round(
                (metrics.track.scrollLeft / metrics.maxScroll) *
                  (metrics.pageCount - 1)
              ) + 1
            )
          );

    const previous = $(config.previous);
    const next = $(config.next);
    if (previous) previous.disabled = metrics.track.scrollLeft <= 2;
    if (next) {
      next.disabled = metrics.track.scrollLeft >= metrics.maxScroll - 2;
    }

    const progress = $(config.progress);
    if (progress) {
      progress.style.width = `${(currentPage / metrics.pageCount) * 100}%`;
    }
    setText(
      config.status,
      `${String(currentPage).padStart(2, "0")} / ${String(
        metrics.pageCount
      ).padStart(2, "0")}`
    );
  }

  function moveCarousel(name, direction) {
    const metrics = getCarouselMetrics(name);
    if (!metrics) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const distance =
      (metrics.cardWidth + metrics.gap) * metrics.visibleCount * direction;
    metrics.track.scrollBy({
      left: distance,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  }

  function setupCarousels() {
    Object.entries(carouselConfig).forEach(([name, config]) => {
      const track = $(config.track);
      if (!track) return;

      $(config.previous)?.addEventListener("click", () =>
        moveCarousel(name, -1)
      );
      $(config.next)?.addEventListener("click", () => moveCarousel(name, 1));

      let frame = 0;
      track.addEventListener(
        "scroll",
        () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => updateCarousel(name));
        },
        { passive: true }
      );

      track.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        moveCarousel(name, event.key === "ArrowLeft" ? -1 : 1);
      });

      if ("ResizeObserver" in window) {
        new ResizeObserver(() => updateCarousel(name)).observe(track);
      }
      updateCarousel(name);
    });
  }

  function renderContact(copy) {
    setText("#contactEyebrow", copy.contact.eyebrow);
    setText("#contactTitle", copy.contact.title);
    setText("#contactIntro", copy.contact.intro);
    setText("#emailLink", `${copy.contact.emailLabel} ↗`);
    setText("#phoneLink", copy.contact.phoneLabel);
    setText("#socialLabel", copy.contact.socialLabel);
    setText("#footerText", copy.footer);
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

  function updateLanguageControl() {
    $$("[data-lang-option]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.langOption === language);
    });

    const toggle = $("#languageToggle");
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        language === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"
      );
    }

    const backToTop = $("#backToTop");
    if (backToTop) {
      const label = language === "vi" ? "Về đầu trang" : "Back to top";
      backToTop.setAttribute("aria-label", label);
      backToTop.setAttribute("title", label);
    }

    updateMenuControl();
    setText(".skip-link", language === "vi" ? "Bỏ qua để đến nội dung" : "Skip to content");
    setText(".hero-footer span:last-child", language === "vi" ? "Cuộn xuống ↓" : "Scroll ↓");
    $(".hero-flow")?.setAttribute(
      "aria-label",
      language === "vi"
        ? "Quy trình từ dữ liệu đến tác động"
        : "Data to impact workflow"
    );
    $(".profile-metrics")?.setAttribute(
      "aria-label",
      language === "vi" ? "Chỉ số hồ sơ năng lực" : "Portfolio metrics"
    );

    const labels =
      language === "vi"
        ? {
            projectTrack: "Danh sách dự án",
            projectPrevious: "Dự án trước",
            projectNext: "Dự án tiếp theo",
            certificateTrack: "Danh sách chứng chỉ",
            certificatePrevious: "Chứng chỉ trước",
            certificateNext: "Chứng chỉ tiếp theo"
          }
        : {
            projectTrack: "Project carousel",
            projectPrevious: "Previous projects",
            projectNext: "Next projects",
            certificateTrack: "Certificate carousel",
            certificatePrevious: "Previous certificates",
            certificateNext: "Next certificates"
          };

    $("#projectGrid")?.setAttribute("aria-label", labels.projectTrack);
    $("#projectPrevious")?.setAttribute(
      "aria-label",
      labels.projectPrevious
    );
    $("#projectNext")?.setAttribute("aria-label", labels.projectNext);
    $("#certificateGrid")?.setAttribute(
      "aria-label",
      labels.certificateTrack
    );
    $("#certificatePrevious")?.setAttribute(
      "aria-label",
      labels.certificatePrevious
    );
    $("#certificateNext")?.setAttribute(
      "aria-label",
      labels.certificateNext
    );
  }

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

    const color = theme === "dark" ? "#0d0f0e" : "#ecece6";
    $('meta[name="theme-color"]')?.setAttribute("content", color);
  }

  function renderLanguage() {
    const copy = content[language];
    document.documentElement.lang = language;
    document.title = copy.meta.title;
    $('meta[name="description"]')?.setAttribute(
      "content",
      copy.meta.description
    );

    renderNavigation(copy);
    renderHero(copy);
    renderSystem(copy);
    renderJourney(copy);
    renderWork(copy);
    renderExperience(copy);
    renderProjects(copy);
    renderCertificates(copy);
    renderAbout(copy);
    renderDisclosures(copy);
    renderContact(copy);
    updateLanguageControl();
    updateThemeControl();
  }

  function setupControls() {
    $("#languageToggle")?.addEventListener("click", () => {
      language = language === "vi" ? "en" : "vi";
      localStorage.setItem("portfolio-language", language);
      renderLanguage();
    });

    $("#themeToggle")?.addEventListener("click", () => {
      const next =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("portfolio-theme", next);
      updateThemeControl();
    });

    ["#profileDisclosure", "#capabilityDisclosure"].forEach((selector) => {
      $(selector)?.addEventListener("toggle", () => {
        renderDisclosures(content[language]);
      });
    });

    $("#projectFilters")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-project-filter]");
      if (!button) return;
      projectFilter = button.dataset.projectFilter;
      renderProjects(content[language]);
    });
  }

  function setupNavigation() {
    const header = $("#siteHeader");
    const menu = $("#menuToggle");
    const links = $("#navLinks");

    const updateHeader = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    menu?.addEventListener("click", () => {
      const open = !links?.classList.contains("is-open");
      links?.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-expanded", String(open));
      updateMenuControl(open);
    });

    $$(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        links?.classList.remove("is-open");
        menu?.classList.remove("is-open");
        menu?.setAttribute("aria-expanded", "false");
        updateMenuControl(false);
      });
    });

    if (!("IntersectionObserver" in window)) return;

    const navLinks = $$(".nav-links a");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    $$("main section[id]").forEach((section) => observer.observe(section));
  }

  function setupSplash() {
    const splash = $("#splash");
    if (!splash) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const displayTime = reducedMotion ? 220 : 1350;
    const exitTime = reducedMotion ? 20 : 500;

    window.setTimeout(() => {
      splash.classList.add("is-leaving");
      document.body.classList.remove("is-splashing");
      document.body.classList.add("is-ready");
      window.setTimeout(() => splash.remove(), exitTime);
    }, displayTime);
  }

  function setupBackToTop() {
    const button = $("#backToTop");
    if (!button) return;

    const updateVisibility = () => {
      button.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.75);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    button.addEventListener("click", () => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? "auto"
        : "smooth";
      window.scrollTo({ top: 0, behavior });
    });
    updateVisibility();
  }

  function setupRecommendationModal() {
    const modal = $("#recommendationModal");
    if (!modal) return;

    let lastFocused = null;

    const openModal = (trigger) => {
      lastFocused = trigger || document.activeElement;
      modal.hidden = false;
      document.body.classList.add("has-modal");
      requestAnimationFrame(() => {
        modal.classList.add("is-open");
        modal.querySelector(".recommendation-modal-close")?.focus();
      });
    };

    const closeModal = () => {
      if (modal.hidden) return;
      modal.classList.remove("is-open");
      document.body.classList.remove("has-modal");
      window.setTimeout(() => {
        modal.hidden = true;
        lastFocused?.focus?.();
      }, 180);
    };

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-recommendation-open]");
      if (trigger) {
        openModal(trigger);
        return;
      }

      if (event.target.closest("[data-recommendation-close]")) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (modal.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = $$(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        modal
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function initialize() {
    renderLanguage();
    setupControls();
    setupCarousels();
    setupNavigation();
    setupSplash();
    setupBackToTop();
    setupRecommendationModal();
    setText("#currentYear", String(new Date().getFullYear()));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
