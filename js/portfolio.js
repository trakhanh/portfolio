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

  function renderNavigation(copy) {
    Object.entries(copy.nav).forEach(([key, value]) => {
      setText(`[data-nav="${key}"]`, value);
    });
  }

  function renderHero(copy) {
    setText("#heroEyebrow", copy.hero.eyebrow);
    setText("#heroStatus", copy.hero.status);
    setText("#heroName", copy.hero.name);
    setText("#heroTitle", copy.hero.title);
    setText("#heroIntro", copy.hero.intro);
    setText("#heroPrimary", copy.hero.primary);
    setText("#heroSecondary", copy.hero.secondary);
    setText("#heroFootnote", copy.hero.footnote);
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

    const grid = $("#workGrid");
    if (!grid) return;

    grid.innerHTML = copy.work.areas
      .map(
        (area) => `
          <article class="work-card">
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
      .map(
        (item) => `
          <article class="experience-card ${item.current ? "is-current" : ""}">
            <div class="experience-date">
              <i aria-hidden="true"></i>
              <span>${item.date}</span>
            </div>
            <div class="experience-position">
              <p>${item.company}</p>
              <h3>${item.role}</h3>
            </div>
            <ul class="experience-highlights">
              ${item.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
            </ul>
          </article>
        `
      )
      .join("");
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
          <article class="project-card">
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
              ${group.items.map((item) => `<span>${item}</span>`).join("")}
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderCertificates(copy) {
    setText("#certificatesEyebrow", copy.certificates.eyebrow);
    setText("#certificatesTitle", copy.certificates.title);
    setText("#certificatesIntro", copy.certificates.intro);

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
    setText("#socialLabel", copy.contact.socialLabel);
    setText("#footerText", copy.footer);
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

    const color = theme === "dark" ? "#111311" : "#f4f4f0";
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
    renderJourney(copy);
    renderWork(copy);
    renderExperience(copy);
    renderProjects(copy);
    renderCertificates(copy);
    renderAbout(copy);
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
    });

    $$(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        links?.classList.remove("is-open");
        menu?.classList.remove("is-open");
        menu?.setAttribute("aria-expanded", "false");
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

  function initialize() {
    renderLanguage();
    setupControls();
    setupCarousels();
    setupNavigation();
    setupSplash();
    setupBackToTop();
    setText("#currentYear", String(new Date().getFullYear()));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
