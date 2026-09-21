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
    Antigravity: { icon: "antigravity", fallback: "AG" },
    NotebookLM: { icon: "notebooklm", fallback: "NLM" },
    JavaScript: { icon: "javascript", fallback: "JS" },
    n8n: { icon: "n8n", fallback: "n8n" },
    "Google Apps Script": { icon: "googleappsscript", fallback: "GAS" },
    Supabase: { icon: "supabase", fallback: "SB" },
    ERP: { icon: "erp", fallback: "ERP" },
    HRM: { icon: "hrm", fallback: "HRM" },
    "Data Analysis": { icon: "data", fallback: "DA" },
    "Machine Learning": { icon: "ml", fallback: "ML" },
    "Deep Learning": { icon: "dl", fallback: "DL" },
    "Computer Vision": { icon: "vision", fallback: "CV" },
    "Business Process": { icon: "process", fallback: "BPM" },
    "Centralized Data": { icon: "data", fallback: "CD" },
    "Web App": { icon: "webapp", fallback: "WEB" },
    API: { icon: "api", fallback: "API" },
    RBAC: { icon: "rbac", fallback: "SEC" },
    "AI Video": { icon: "video", fallback: "VID" },
    "AI Visual": { icon: "visual", fallback: "VIS" },
    "AI Voice": { icon: "voice", fallback: "VOX" }
  };

  function renderTechnologyLogo(name) {
    const visual = technologyVisuals[name] || {
      fallback: name.replace(/[^A-Za-z0-9]/g, "").slice(0, 3).toUpperCase()
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
      const line1 = nameParts.slice(0, 2).join(" ");
      const line2 = nameParts.slice(2).join(" ");
      heroName.setAttribute("aria-label", copy.hero.name);
      heroName.setAttribute("data-text", copy.hero.name);
      const line1El = $('[data-hero-name-line="1"]');
      const line2El = $('[data-hero-name-line="2"]');
      if (line1El) {
        line1El.textContent = line1;
        line1El.setAttribute("data-text", line1);
      }
      if (line2El) {
        line2El.textContent = line2;
        line2El.setAttribute("data-text", line2);
      }
    }
    const heroTitle = $("#heroTitle");
    if (heroTitle) {
      heroTitle.textContent = copy.hero.title;
    }
    setText("#heroIntro", copy.hero.intro);
    setText("#heroPrimary", copy.hero.primary);
    setText("#heroSecondary", copy.hero.secondary);
    const heroCv = $("#heroCv");
    if (heroCv) {
      heroCv.textContent = copy.hero.cv || `${copy.about.cv} ↗`;
      heroCv.href = copy.hero.cvUrl || copy.about.cvUrl;
    }
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
    const toolDisclosure = $("#toolEcosystemDisclosure");
    setText(
      "#toolEcosystemAction",
      language === "vi"
        ? toolDisclosure?.open
          ? "Thu gọn"
          : "Xem bộ công cụ"
        : toolDisclosure?.open
          ? "Collapse"
          : "View tool stack"
    );

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

  function formatHighlightText(text) {
    return text.replace(
      /\(https?:\/\/([^\s)]+)\)/g,
      '(<a href="https://$1" target="_blank" rel="noopener" class="exp-inline-link">$1 ↗</a>)'
    );
  }

  function renderExperience(copy) {
    setText("#experienceEyebrow", copy.experience.eyebrow);
    setText("#experienceTitle", copy.experience.title);
    setText("#experienceIntro", copy.experience.intro);

    const list = $("#experienceList");
    if (!list) return;

    list.innerHTML = copy.experience.items
      .map((item, index) => {
        const visibleHighlights = item.highlights.slice(0, 2);
        const remainingHighlights = item.highlights.slice(2);
        const moreLabel =
          language === "vi"
            ? `Xem thêm ${remainingHighlights.length} nội dung`
            : `View ${remainingHighlights.length} more`;
        const isBongTra =
          item.company.includes("BÔNG TRÀ") || item.company.includes("BONG TRA");

        return `
          <article class="experience-card ${item.current ? "is-current" : ""} exp-node-${index + 1}" data-experience-index="${String(index + 1).padStart(2, "0")}">
            <div class="exp-card-telemetry">
              <div class="exp-status-pill ${item.current ? "is-active" : ""}">
                <i class="exp-status-dot" aria-hidden="true"></i>
                <span>${
                  item.current
                    ? language === "vi"
                      ? "ĐANG ĐẢM NHIỆM // ACTIVE RUNTIME"
                      : "ACTIVE RUNTIME // CURRENT"
                    : language === "vi"
                      ? "ĐÃ HOÀN THÀNH // VERIFIED"
                      : "COMPLETED // VERIFIED"
                }</span>
              </div>
              <div class="exp-index-badge">
                <span class="exp-node-label">DISPATCH // 0${index + 1}</span>
                <span class="exp-date-chip"><svg class="exp-date-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> ${item.date}</span>
              </div>
            </div>

            <div class="exp-header-core">
              <div class="exp-company-row">
                <span class="exp-company-badge" aria-hidden="true">CORP_NODE</span>
                <h4 class="exp-company-name">${item.company}</h4>
              </div>
              <h3 class="exp-role-title">${item.role}</h3>
            </div>

            <div class="exp-body">
              <ul class="experience-highlights">
                ${visibleHighlights.map((h) => `<li>${formatHighlightText(h)}</li>`).join("")}
              </ul>
              ${
                remainingHighlights.length
                  ? `
                    <details class="experience-more">
                      <summary class="exp-more-summary">
                        <span>${moreLabel}</span>
                        <span class="exp-more-arrow" aria-hidden="true">+</span>
                      </summary>
                      <ul class="experience-highlights experience-highlights-more">
                        ${remainingHighlights.map((h) => `<li>${formatHighlightText(h)}</li>`).join("")}
                      </ul>
                    </details>
                  `
                  : ""
              }
            </div>

            ${
              isBongTra
                ? `
                  <div class="exp-verification-footer">
                    <button type="button" class="exp-verified-letter-btn" data-recommendation-open>
                      <span class="exp-verified-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
                      </span>
                      <span class="exp-verified-text">
                        ${
                          language === "vi"
                            ? "Xác thực năng lực: Thư giới thiệu có chữ ký & con dấu đỏ CEO Bông Trà F&B"
                            : "Verified Credential: Signed Recommendation Letter from Bông Trà F&B"
                        }
                      </span>
                      <span class="exp-verified-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>
                      </span>
                    </button>
                  </div>
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
            <div class="recommendation-modal-heading-group">
              <h2 id="recommendationModalTitle">${letter.modalTitle}</h2>
              <p class="rec-meta-issuer">${letter.issuer} · ${letter.date}</p>
            </div>
            <div class="recommendation-modal-actions">
              <a class="button button-primary rec-action-btn" href="${letter.file}" target="_blank" rel="noopener">
                MỞ FILE PDF ↗
              </a>
              <a class="button button-quiet rec-action-btn" href="${letter.file}" download>
                ${letter.download} ↓
              </a>
            </div>
            <button
              class="recommendation-modal-close"
              type="button"
              data-recommendation-close
              aria-label="${letter.close}"
              title="${letter.close}"
            >×</button>
          </header>
          <div class="recommendation-modal-toolbar">
            <div class="recommendation-page-tabs" role="tablist">
              <button class="rec-tab-btn is-active" type="button" data-page-tab="all">${language === "vi" ? "TẤT CẢ" : "ALL"}</button>
              <button class="rec-tab-btn" type="button" data-page-tab="0">${language === "vi" ? "TRANG 1" : "PAGE 1"}</button>
              <button class="rec-tab-btn" type="button" data-page-tab="1">${language === "vi" ? "TRANG 2" : "PAGE 2"}</button>
            </div>
            <div class="rec-zoom-bar">
              <button class="rec-zoom-btn" type="button" data-zoom-action="out" aria-label="Thu nhỏ" title="Thu nhỏ">−</button>
              <button class="rec-zoom-level" type="button" data-zoom-action="reset" aria-label="Đặt lại kích thước" title="Vừa màn hình">100%</button>
              <button class="rec-zoom-btn" type="button" data-zoom-action="in" aria-label="Phóng to" title="Phóng to">+</button>
              <button class="rec-zoom-preset-pill" type="button" data-zoom-preset="1.6" title="Phóng to để đọc chữ">🔍 Phóng to</button>
            </div>
          </div>
          <div class="recommendation-modal-pages" id="recModalPages">
            ${letter.pages
              .map(
                (page, index) => `
                  <figure class="rec-doc-page" data-page-index="${index}">
                    <div class="rec-doc-page-header">
                      <span>${letter.pageLabel.toUpperCase()} ${String(index + 1).padStart(2, "0")} / ${String(letter.pages.length).padStart(2, "0")}</span>
                      <span>CÔNG TY CỔ PHẦN BÔNG TRÀ F&B</span>
                    </div>
                    <div class="rec-doc-paper" data-doc-paper>
                      <img
                        src="${page}"
                        alt="${letter.pageLabel} ${index + 1} · ${letter.modalTitle}"
                        loading="eager"
                        decoding="async"
                        draggable="false"
                      />
                    </div>
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
              <div class="project-links project-actions">
                <a class="project-detail-link" href="/projects/${project.id}/">
                  <span>${language === "vi" ? "Xem chi tiết case study" : "View case study"}</span>
                  <span class="project-detail-arrow" aria-hidden="true">→</span>
                </a>
                <div class="project-secondary-links">
                  ${
                    project.links.length
                      ? project.links
                          .map(
                            (link) => {
                              const externalMark = /[↗→]\s*$/.test(link.label)
                                ? ""
                                : " ↗";
                              return `<a href="${link.url}" target="_blank" rel="noopener">${link.label}${externalMark}</a>`;
                            }
                          )
                          .join("")
                      : `<span class="project-private">${
                          language === "vi"
                            ? "Thông tin nội bộ"
                            : "Internal information"
                        }</span>`
                  }
                </div>
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
        (certificate, index) => `
          <article
            class="certificate-card"
            data-certificate-index="${index}"
            data-certificate-open="${index}"
            tabindex="0"
            role="button"
            aria-label="${copy.certificates.viewDetails}: ${certificate.title}"
          >
            <div class="certificate-image" data-certificate-open="${index}">
              <img
                src="${certificate.image}"
                alt="${certificate.title}"
                loading="lazy"
              />
              <span class="certificate-image-inspect" aria-hidden="true">
                <span class="inspect-badge">
                  <span class="inspect-icon-scope">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="7"/>
                      <path d="m21 21-4.3-4.3"/>
                    </svg>
                    <i class="scope-pulse"></i>
                  </span>
                  <span class="inspect-text">${copy.certificates.viewDetails}</span>
                  <span class="inspect-arrow">→</span>
                </span>
              </span>
            </div>
            <div class="certificate-content">
              <div class="certificate-meta">
                <span>${certificate.issuer}</span>
                <span>${certificate.date}</span>
              </div>
              <h3 data-certificate-open="${index}">${certificate.title}</h3>
              <p class="certificate-description">${certificate.description}</p>
              <div class="certificate-tags">
                ${certificate.tags.map((tag) => `<span>${tag}</span>`).join("")}
              </div>
              <div class="certificate-actions">
                <button
                  type="button"
                  class="certificate-view-btn"
                  data-certificate-open="${index}"
                >
                  <span>${copy.certificates.viewDetails}</span>
                  <span class="certificate-view-arrow" aria-hidden="true">→</span>
                </button>
                <div class="certificate-secondary-links">
                  ${
                    certificate.verifyUrl
                      ? `<a href="${certificate.verifyUrl}" target="_blank" rel="noopener" data-certificate-external>${copy.certificates.verify} ↗</a>`
                      : ""
                  }
                  <a href="${certificate.courseUrl}" target="_blank" rel="noopener" data-certificate-external>${copy.certificates.course} ↗</a>
                </div>
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
    const emailLink = $("#emailLink");
    if (emailLink) {
      emailLink.innerHTML = `<span>${copy.contact.emailLabel}</span><svg class="btn-arrow-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>`;
    }
    const phoneLink = $("#phoneLink");
    if (phoneLink) {
      phoneLink.innerHTML = `<svg class="btn-phone-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>${copy.contact.phoneLabel}</span>`;
    }
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
    document.documentElement.dataset.theme = "dark";
    $('meta[name="theme-color"]')?.setAttribute("content", "#0a0a0f");
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
    window.refreshScrollReveal?.();
  }

  function setupControls() {
    $("#languageToggle")?.addEventListener("click", () => {
      language = language === "vi" ? "en" : "vi";
      localStorage.setItem("portfolio-language", language);
      renderLanguage();
    });

    ["#profileDisclosure", "#capabilityDisclosure"].forEach((selector) => {
      $(selector)?.addEventListener("toggle", () => {
        renderDisclosures(content[language]);
      });
    });

    $("#toolEcosystemDisclosure")?.addEventListener("toggle", () => {
      renderSystem(content[language]);
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

    if (reducedMotion) {
      splash.remove();
      document.body.classList.remove("is-splashing");
      document.body.classList.add("is-ready");
      return;
    }

    const pctEl = $("#splashPct");
    const barEl = $("#splashBarFill");
    const logLines = $$(".splash-log-line", splash);
    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      splash.classList.add("is-leaving");
      document.body.classList.remove("is-splashing");
      document.body.classList.add("is-ready");
      window.setTimeout(() => splash.remove(), 380);
    };

    // Allow user to click to skip immediately if preferred
    splash.addEventListener("click", dismiss, { once: true });

    const totalDuration = 760; // Snappy 0.76s boot sequence
    const startTime = performance.now();

    function step(currentTime) {
      if (dismissed) return;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);

      const pct = Math.floor(progress * 100);
      if (pctEl) pctEl.textContent = `${pct}%`;
      if (barEl) barEl.style.width = `${pct}%`;

      if (logLines.length) {
        const lineIndex = Math.min(
          Math.floor(progress * logLines.length),
          logLines.length - 1
        );
        for (let i = 0; i <= lineIndex; i++) {
          logLines[i].classList.add("is-active");
        }
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.setTimeout(dismiss, 80);
      }
    }

    requestAnimationFrame(step);
  }

  function setupScrollReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".cyber-reveal").forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      $$(".cyber-reveal").forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    function scanAndObserve(root = document) {
      // 1. Grid & Stream containers that stagger their children
      const staggerContainers = [
        "#projectGrid",
        ".project-grid",
        ".work-grid",
        ".experience-list",
        ".timeline-cyber-stream",
        ".timeline-stream",
        ".experience-grid",
        ".journey-grid",
        ".certificate-grid",
        ".skill-list",
        ".tool-ecosystem-list"
      ];

      staggerContainers.forEach((selector) => {
        $$(selector, root).forEach((container) => {
          container.classList.add("reveal-stagger");
          Array.from(container.children).forEach((child) => {
            if (!child.classList.contains("cyber-reveal")) {
              child.classList.add("cyber-reveal");
              revealObserver.observe(child);
            }
          });
        });
      });

      // 2. Prominent single sections and milestone cards
      const singleElements = [
        ".section-heading",
        ".system-heading",
        ".project-card",
        ".experience-card",
        ".recommendation-card",
        ".contact-card",
        ".hero-flow",
        ".system-proof",
        ".skill-group",
        ".about-copy",
        ".credentials-disclosure"
      ];

      singleElements.forEach((selector) => {
        $$(selector, root).forEach((el) => {
          if (!el.classList.contains("cyber-reveal")) {
            el.classList.add("cyber-reveal");
            revealObserver.observe(el);
          }
        });
      });

      // 3. Progressive Cyber Image Stream Tracking
      const imgContainers = [".project-image", ".recommendation-preview", ".certificate-image"];
      imgContainers.forEach((sel) => {
        $$(sel, root).forEach((container) => {
          const img = $("img", container);
          if (!img) return;
          const markReady = () => container.classList.add("is-streamed");
          if (img.complete && img.naturalHeight !== 0) {
            markReady();
          } else {
            img.addEventListener("load", markReady, { once: true });
          }
        });
      });
    }

    scanAndObserve();
    window.refreshScrollReveal = () => scanAndObserve();

    // Horizontal carousels safeguard: when scrolling or clicking next/prev, reveal cards in track
    ["#projectGrid", "#certificateGrid"].forEach((id) => {
      const track = $(id);
      if (!track) return;
      track.addEventListener(
        "scroll",
        () => {
          $$(".cyber-reveal", track).forEach((card) => {
            card.classList.add("is-revealed");
            revealObserver.unobserve(card);
          });
        },
        { passive: true, once: true }
      );
    });

    ["#projectPrevious", "#projectNext", "#certificatePrevious", "#certificateNext"].forEach((id) => {
      $(id)?.addEventListener("click", () => {
        const trackSelector = id.startsWith("#project") ? "#projectGrid" : "#certificateGrid";
        const track = $(trackSelector);
        if (track) {
          $$(".cyber-reveal", track).forEach((card) => {
            card.classList.add("is-revealed");
            revealObserver.unobserve(card);
          });
        }
      });
    });
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
    let currentZoom = 1;
    let lastTapTime = 0;

    const applyZoom = (newZoom) => {
      currentZoom = Math.min(2.5, Math.max(1, +newZoom.toFixed(2)));
      const pagesContainer = modal.querySelector("#recModalPages");
      const zoomLevelBtn = modal.querySelector(".rec-zoom-level");
      const zoomPresetBtn = modal.querySelector(".rec-zoom-preset-pill");

      if (zoomLevelBtn) {
        zoomLevelBtn.textContent = Math.round(currentZoom * 100) + "%";
      }
      if (zoomPresetBtn) {
        zoomPresetBtn.classList.toggle("is-active", currentZoom >= 1.7);
      }

      const pages = $$(".rec-doc-page", modal);
      pages.forEach((p) => {
        if (currentZoom === 1) {
          p.style.width = "";
          p.style.maxWidth = "";
        } else {
          p.style.width = currentZoom * 100 + "%";
          p.style.maxWidth = "none";
        }
      });

      if (pagesContainer) {
        pagesContainer.classList.toggle("is-zoomed", currentZoom > 1);
      }
    };

    const openModal = (trigger) => {
      lastFocused = trigger || document.activeElement;
      modal.hidden = false;
      document.body.classList.add("has-modal");

      // Reset tabs and zoom state when opened
      applyZoom(1);
      const allTabs = $$(".rec-tab-btn", modal);
      allTabs.forEach((t) =>
        t.classList.toggle("is-active", t.dataset.pageTab === "all")
      );
      const pages = $$(".rec-doc-page", modal);
      pages.forEach((p) => {
        p.classList.remove("is-hidden");
        p.style.display = "";
      });
      const pagesContainer = modal.querySelector("#recModalPages");
      if (pagesContainer) pagesContainer.scrollTop = 0;

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
      if (modal.hidden) {
        const trigger = event.target.closest("[data-recommendation-open]");
        if (trigger) {
          openModal(trigger);
        }
        return;
      }

      // Close button or backdrop
      if (event.target.closest("[data-recommendation-close]")) {
        closeModal();
        return;
      }

      // Page Tabs (All / Page 1 / Page 2)
      const tabBtn = event.target.closest("[data-page-tab]");
      if (tabBtn && modal.contains(tabBtn)) {
        event.preventDefault();
        const targetTab = tabBtn.dataset.pageTab;
        const allTabs = $$(".rec-tab-btn", modal);
        allTabs.forEach((t) => t.classList.toggle("is-active", t === tabBtn));

        const pages = $$(".rec-doc-page", modal);
        pages.forEach((page) => {
          const idx = page.dataset.pageIndex;
          const isVisible = targetTab === "all" || targetTab === idx;
          page.classList.toggle("is-hidden", !isVisible);
          if (isVisible) {
            page.style.display = "flex";
          } else {
            page.style.display = "none";
          }
        });

        const pagesContainer = modal.querySelector(".recommendation-modal-pages");
        if (pagesContainer) {
          pagesContainer.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      // Zoom Controls
      if (event.target.closest('[data-zoom-action="in"]')) {
        event.preventDefault();
        applyZoom(currentZoom + 0.35);
        return;
      }
      if (event.target.closest('[data-zoom-action="out"]')) {
        event.preventDefault();
        applyZoom(currentZoom - 0.35);
        return;
      }
      if (event.target.closest('[data-zoom-action="reset"]')) {
        event.preventDefault();
        applyZoom(1);
        return;
      }
      if (event.target.closest("[data-zoom-preset]")) {
        event.preventDefault();
        const targetVal =
          parseFloat(
            event.target.closest("[data-zoom-preset]").dataset.zoomPreset
          ) || 1.75;
        applyZoom(currentZoom >= 1.7 ? 1 : targetVal);
        return;
      }

      // Double-tap or double-click to toggle zoom on document paper
      const docPaper = event.target.closest("[data-doc-paper]");
      if (docPaper && modal.contains(docPaper)) {
        const now = Date.now();
        if (now - lastTapTime < 350) {
          event.preventDefault();
          const targetZoom = currentZoom >= 1.7 ? 1 : 1.75;
          applyZoom(targetZoom);
          lastTapTime = 0;
        } else {
          lastTapTime = now;
        }
        return;
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

    if (
      window.location.hash === "#recommendation" ||
      new URLSearchParams(window.location.search).has("recommendation")
    ) {
      window.setTimeout(() => openModal(), 350);
    }
  }

  function setupCertificateModal() {
    const modal = $("#certificateModal");
    if (!modal) return;

    let currentIndex = 0;
    let lastFocused = null;

    function renderModalContent(index) {
      const certificates = content[language]?.certificates;
      if (!certificates || !certificates.items?.length) return;
      const total = certificates.items.length;
      currentIndex = (index + total) % total;
      const cert = certificates.items[currentIndex];

      modal.innerHTML = `
        <div class="certificate-modal-backdrop" data-certificate-close></div>
        <section
          class="certificate-modal-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certModalTitle"
        >
          <header class="certificate-modal-header">
            <div class="certificate-modal-header-main">
              <div class="cert-modal-telemetry">
                <span class="cert-modal-eyebrow">${certificates.modalEyebrow}</span>
                <span class="cert-modal-badge">
                  <i class="cert-pulse-dot" aria-hidden="true"></i>
                  ${certificates.modalVerifiedBadge}
                </span>
              </div>
              <h2 id="certModalTitle">${cert.title}</h2>
              <div class="cert-modal-meta-row">
                <span class="cert-meta-item">
                  <span class="cert-meta-label">${certificates.modalIssuerLabel}:</span>
                  <strong>${cert.issuer}</strong>
                </span>
                <span class="cert-meta-item">
                  <span class="cert-meta-label">${certificates.modalDateLabel}:</span>
                  <strong>${cert.date}</strong>
                </span>
              </div>
            </div>

            <div class="certificate-modal-header-controls">
              <div class="cert-modal-stepper">
                <button
                  class="cert-stepper-btn"
                  type="button"
                  data-certificate-prev
                  aria-label="${certificates.modalPrev}"
                >←</button>
                <span class="cert-stepper-counter">
                  ${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}
                </span>
                <button
                  class="cert-stepper-btn"
                  type="button"
                  data-certificate-next
                  aria-label="${certificates.modalNext}"
                >→</button>
              </div>
              <button
                class="certificate-modal-close"
                type="button"
                data-certificate-close
                aria-label="${certificates.modalClose}"
              >×</button>
            </div>
          </header>

          <div class="certificate-modal-body">
            <div class="certificate-modal-preview">
              <div class="cert-preview-frame">
                <div class="cert-frame-hud">
                  <span>RES // HIGH-DEF DOCUMENT</span>
                  <span>ID: GK-CERT-${String(currentIndex + 1).padStart(2, "0")}</span>
                </div>
                <div class="cert-preview-image-wrap">
                  <img
                    src="${cert.image}"
                    alt="${cert.title}"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div class="cert-preview-actions">
                  <a
                    class="button button-quiet cert-btn-open-img"
                    href="${cert.image}"
                    target="_blank"
                    rel="noopener"
                  >
                    <span>${certificates.modalOpenImage}</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="certificate-modal-details">
              <div class="cert-detail-section">
                <h4>// MÔ TẢ CHƯƠNG TRÌNH ĐÀO TẠO</h4>
                <p class="cert-detail-desc">${cert.description}</p>
              </div>

              <div class="cert-detail-section">
                <h4>// ${certificates.modalSkillsLabel}</h4>
                <div class="cert-skills-list">
                  ${cert.tags.map((tag) => `<span class="cert-skill-tag">${tag}</span>`).join("")}
                </div>
              </div>

              <div class="cert-modal-action-row">
                ${
                  cert.verifyUrl
                    ? `<a class="button button-primary cert-verify-action" href="${cert.verifyUrl}" target="_blank" rel="noopener">${certificates.modalDirectVerify}</a>`
                    : ""
                }
                <a class="button button-quiet cert-course-action" href="${cert.courseUrl}" target="_blank" rel="noopener">${certificates.course} ↗</a>
              </div>

              <div class="cert-modal-footer-hint">
                <span>[ESC: ${certificates.modalClose} · ← / →: ${language === "vi" ? "Chuyển đổi chứng chỉ" : "Switch certificate"}]</span>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    const openModal = (index, trigger) => {
      lastFocused = trigger || document.activeElement;
      renderModalContent(index);
      modal.hidden = false;
      document.body.classList.add("has-modal");
      requestAnimationFrame(() => {
        modal.classList.add("is-open");
        modal.querySelector(".certificate-modal-close")?.focus();
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
      // Direct external link click inside card
      if (event.target.closest("[data-certificate-external]")) {
        return;
      }

      // Open certificate modal trigger
      const trigger = event.target.closest("[data-certificate-open]");
      if (trigger) {
        event.preventDefault();
        const index = parseInt(trigger.dataset.certificateOpen, 10);
        if (!isNaN(index)) {
          openModal(index, trigger);
        }
        return;
      }

      // Close modal trigger
      if (event.target.closest("[data-certificate-close]")) {
        closeModal();
        return;
      }

      // Prev certificate
      if (event.target.closest("[data-certificate-prev]")) {
        renderModalContent(currentIndex - 1);
        modal.querySelector("[data-certificate-prev]")?.focus();
        return;
      }

      // Next certificate
      if (event.target.closest("[data-certificate-next]")) {
        renderModalContent(currentIndex + 1);
        modal.querySelector("[data-certificate-next]")?.focus();
        return;
      }
    });

    // Keyboard navigation inside modal & cards
    document.addEventListener("keydown", (event) => {
      // Enter or Space on certificate-card
      if (!modal.classList.contains("is-open")) {
        if (event.key === "Enter" || event.key === " ") {
          const card = event.target.closest(".certificate-card");
          if (card && !event.target.closest("a, button")) {
            event.preventDefault();
            const index = parseInt(card.dataset.certificateIndex, 10);
            if (!isNaN(index)) {
              openModal(index, card);
            }
          }
        }
        return;
      }

      // When modal is open
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        renderModalContent(currentIndex - 1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        renderModalContent(currentIndex + 1);
        return;
      }

      // Focus trapping
      if (event.key === "Tab") {
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
      }
    });
  }

  function setupHeroGlitch() {
    const heroName = $("#heroName");
    if (!heroName) return;

    // Periodic subtle holographic glitch sync pulse
    setInterval(() => {
      if (document.hidden) return;
      heroName.classList.add("glitch-pulse");
      setTimeout(() => {
        heroName.classList.remove("glitch-pulse");
      }, 280);
    }, 4500);
  }

  function initialize() {
    renderLanguage();
    setupControls();
    setupCarousels();
    setupNavigation();
    setupSplash();
    setupBackToTop();
    setupRecommendationModal();
    setupCertificateModal();
    setupScrollReveal();
    setupHeroGlitch();
    setText("#currentYear", String(new Date().getFullYear()));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
