(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (!data) {
    console.error("Portfolio data could not be loaded.");
    return;
  }

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

  function renderHeroWorkflow() {
    const container = qs("#heroWorkflow");
    if (!container) return;

    container.innerHTML = data.heroFlow
      .map((item, index) => {
        const angle = -90 + index * (360 / data.heroFlow.length);
        const radians = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(radians) * 42;
        const y = 50 + Math.sin(radians) * 41;
        const centerX = 50;
        const centerY = 50;
        const dx = centerX - x;
        const dy = centerY - y;
        const lineAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        const lineWidth = Math.sqrt(dx * dx + dy * dy) * 4.2;

        return `
          <div
            class="workflow-node"
            style="left:${x}%;top:${y}%;--i:${index};--line-angle:${lineAngle}deg;--line-width:${lineWidth}px"
          >
            <small>0${index + 1}</small>
            <strong>${item}</strong>
            <i aria-hidden="true"></i>
          </div>
        `;
      })
      .join("");
  }

  function renderSkills() {
    const container = qs("#skillsTicker");
    if (!container) return;
    container.innerHTML = data.skills.map((skill) => `<span>${skill}</span>`).join("");
  }

  function renderVideoDirections() {
    const container = qs("#videoDirections");
    if (!container) return;

    container.innerHTML = data.videoCapabilities
      .map(
        (item) => `
          <article class="direction-card reveal">
            <div class="direction-top">
              <span class="direction-number">${item.number}</span>
              <span class="direction-label">${item.label}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <ul>
              ${item.items.map((entry) => `<li>${entry}</li>`).join("")}
            </ul>
          </article>
        `
      )
      .join("");
  }

  function renderVideoGallery(filter = "All") {
    const container = qs("#videoGallery");
    if (!container) return;

    const items =
      filter === "All"
        ? data.videoGallery
        : data.videoGallery.filter((item) => item.category === filter);

    container.innerHTML = items
      .map(
        (item) => `
          <article class="video-card reveal">
            <img src="${item.image}" alt="" loading="lazy" />
            <div class="video-card-frame">
              <div class="video-card-top">
                <span>${item.category}</span>
                <small>${item.eyebrow}</small>
              </div>
              <div class="video-card-content">
                <p class="micro-label">${item.role}</p>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <div class="video-meta">
                  <span><small>TOOLS</small>${item.tools}</span>
                  <span><small>DELIVERY</small>${item.delivery}</span>
                  <span><small>PLATFORM</small>${item.platform}</span>
                  <span><small>MEDIA</small>Preview image</span>
                </div>
              </div>
            </div>
            <a class="video-card-link" href="${item.target}" aria-label="${item.cta}">↘</a>
          </article>
        `
      )
      .join("");

    observeReveals(container);
  }

  function renderPipeline() {
    const container = qs("#productionPipeline");
    if (!container) return;

    container.innerHTML = data.productionPipeline
      .map(
        (item, index) => `
          <article class="pipeline-node" style="--i:${index}">
            <span class="pipeline-number">${item.step}</span>
            <h4>${item.name}</h4>
            <p>${item.note}</p>
          </article>
        `
      )
      .join("");
  }

  function renderTools() {
    const container = qs("#productionTools");
    if (!container) return;

    container.innerHTML = data.productionTools
      .map(
        (item) => `
          <article class="tool-card reveal">
            <span class="tool-icon" aria-hidden="true">${item.icon}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </article>
        `
      )
      .join("");
  }

  function renderHrm() {
    const note = qs("#hrmNote");
    const current = qs("#hrmCurrent");
    const roadmap = qs("#hrmRoadmap");

    if (note) note.textContent = data.hrmModules.verificationNote;
    if (current) {
      current.innerHTML = data.hrmModules.current
        .map((item) => `<li>${item}</li>`)
        .join("");
    }
    if (roadmap) {
      roadmap.innerHTML = data.hrmModules.roadmap
        .map((item) => `<li>${item}</li>`)
        .join("");
    }
  }

  function renderEcosystem() {
    const container = qs("#ecosystemCards");
    if (!container) return;

    container.innerHTML = data.ecosystem
      .map(
        (item) => `
          <article class="ecosystem-card">
            <span class="ecosystem-icon" aria-hidden="true">${item.icon}</span>
            <small>${item.code}</small>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </article>
        `
      )
      .join("");
  }

  function renderProjects() {
    const container = qs("#projectList");
    if (!container) return;

    container.innerHTML = data.projects
      .map(
        (project) => `
          <button class="project-row reveal tilt-card" type="button" data-project="${project.id}">
            <span class="project-order">${project.order}</span>
            <span class="project-main">
              <img class="project-thumb" src="${project.image}" alt="" loading="lazy" />
              <span class="project-title-wrap">
                <small>${project.category}</small>
                <h3>${project.title}</h3>
              </span>
            </span>
            <span class="project-summary">${project.summary}</span>
            <span class="project-arrow" aria-hidden="true">↗</span>
          </button>
        `
      )
      .join("");
  }

  function renderExperience() {
    const container = qs("#experienceList");
    if (!container) return;

    container.innerHTML = data.experience
      .map(
        (item) => `
          <article class="experience-item">
            <small>${item.year}</small>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </article>
        `
      )
      .join("");
  }

  function openProject(projectId) {
    const project = data.projects.find((item) => item.id === projectId);
    const dialog = qs("#projectDialog");
    if (!project || !dialog) return;

    const fields = [
      ["Context", project.context],
      ["Problem", project.problem],
      ["My Role", project.role],
      ["Workflow", project.workflow],
      ["Solution", project.solution],
      ["Output", project.output],
      ["Result", project.result],
      ["What I Learned", project.learning]
    ];

    qs("#dialogImage").src = project.image;
    qs("#dialogImage").alt = project.title;
    qs("#dialogNumber").textContent = project.order;
    qs("#dialogCategory").textContent = project.category;
    qs("#dialogTitle").textContent = project.title;
    qs("#dialogSummary").textContent = project.summary;
    qs("#dialogCaseGrid").innerHTML = fields
      .map(
        ([label, value]) => `
          <article class="case-item">
            <small>${label.toUpperCase()}</small>
            <p>${value}</p>
          </article>
        `
      )
      .join("");
    qs("#dialogTech").innerHTML = project.technology
      .map((item) => `<span>${item}</span>`)
      .join("");
    qs("#dialogLinks").innerHTML = project.links.length
      ? project.links
          .map(
            (link) =>
              `<a href="${link.url}" target="_blank" rel="noopener">${link.label} ↗</a>`
          )
          .join("")
      : `<span class="micro-label">DEMO / MEDIA · TO BE ADDED</span>`;

    dialog.showModal();
    document.body.style.overflow = "hidden";
  }

  function closeProject() {
    const dialog = qs("#projectDialog");
    if (!dialog?.open) return;
    dialog.close();
    document.body.style.overflow = "";
  }

  let revealObserver;

  function observeReveals(root = document) {
    const elements = qsa(".reveal:not([data-observed]), .line-reveal:not([data-observed])", root);
    elements.forEach((element) => {
      element.dataset.observed = "true";
      if (reduceMotion.matches || !revealObserver) {
        element.classList.add("is-visible");
      } else {
        revealObserver.observe(element);
      }
    });
  }

  function setupRevealObserver() {
    if ("IntersectionObserver" in window && !reduceMotion.matches) {
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.13, rootMargin: "0px 0px -7% 0px" }
      );
    }

    observeReveals();
  }

  function setupPipelineSignal() {
    const wrapper = qs("#pipeline");
    const nodes = qsa(".pipeline-node");
    if (!wrapper || !nodes.length) return;

    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      nodes.forEach((node) => node.classList.add("is-active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          nodes.forEach((node) => node.classList.add("is-active"));
          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(wrapper);
  }

  function setupRoleRotation() {
    const role = qs("#roleValue");
    if (!role || reduceMotion.matches) return;

    let index = 0;
    window.setInterval(() => {
      role.classList.add("is-switching");
      window.setTimeout(() => {
        index = (index + 1) % data.roles.length;
        role.textContent = data.roles[index];
        role.classList.remove("is-switching");
      }, 280);
    }, 3000);
  }

  function setupNavigation() {
    const header = qs("#siteHeader");
    const toggle = qs("#menuToggle");
    const nav = qs("#navLinks");
    const navLinks = qsa(".nav-links a");
    const sections = qsa("main section[id]");

    const updateHeader = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    toggle?.addEventListener("click", () => {
      const open = !nav?.classList.contains("is-open");
      nav?.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav?.classList.remove("is-open");
        toggle?.classList.remove("is-open");
        toggle?.setAttribute("aria-expanded", "false");
      });
    });

    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
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
        { rootMargin: "-35% 0px -55% 0px" }
      );
      sections.forEach((section) => sectionObserver.observe(section));
    }
  }

  function setupFilters() {
    const controls = qsa(".filter-button");
    controls.forEach((button) => {
      button.addEventListener("click", () => {
        controls.forEach((control) => control.classList.remove("is-active"));
        button.classList.add("is-active");
        renderVideoGallery(button.dataset.filter);
      });
    });
  }

  function setupProjectDialog() {
    const dialog = qs("#projectDialog");
    qs("#projectList")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-project]");
      if (button) openProject(button.dataset.project);
    });

    qs(".dialog-close")?.addEventListener("click", closeProject);
    dialog?.addEventListener("click", (event) => {
      if (event.target === dialog) closeProject();
    });
    dialog?.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeProject();
    });
  }

  function setupShowreel() {
    const button = qs("#showreelButton");
    const state = qs("#mediaState");
    if (!button || !state) return;

    button.addEventListener("click", () => {
      state.textContent = "SHOWREEL ĐANG HOÀN THIỆN · CONTACT FOR PRIVATE PREVIEW";
      state.style.color = "#a9ffcb";
      state.style.borderColor = "rgba(169,255,203,.25)";
      button.setAttribute("aria-label", "Showreel đang hoàn thiện");
    });
  }

  function setupPointerEffects() {
    if (!canHover.matches || reduceMotion.matches) return;

    document.body.classList.add("has-pointer");
    let cursorX = -500;
    let cursorY = -500;
    let raf = 0;

    window.addEventListener(
      "pointermove",
      (event) => {
        cursorX = event.clientX;
        cursorY = event.clientY;
        if (raf) return;
        raf = window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--cursor-x", `${cursorX}px`);
          document.documentElement.style.setProperty("--cursor-y", `${cursorY}px`);
          raf = 0;
        });
      },
      { passive: true }
    );

    qsa(".magnetic").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.13;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.13;
        const base =
          element.classList.contains("play-button") ? "translate(-50%, -50%) " : "";
        element.style.transform = `${base}translate(${x}px, ${y}px)`;
      });
      element.addEventListener("pointerleave", () => {
        element.style.transform = "";
      });
    });

    qsa(".tilt-card").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.transform = `perspective(900px) rotateX(${-y * 1.2}deg) rotateY(${x * 1.4}deg)`;
      });
      element.addEventListener("pointerleave", () => {
        element.style.transform = "";
      });
    });
  }

  function setupParallax() {
    if (reduceMotion.matches) return;
    const layers = qsa("[data-parallax]");
    if (!layers.length) return;

    let scheduled = false;
    const update = () => {
      const scroll = window.scrollY;
      layers.forEach((layer) => {
        const speed = Number(layer.dataset.parallax);
        layer.style.setProperty("--scroll-y", `${scroll * speed}px`);
        layer.style.translate = `0 ${scroll * speed}px`;
      });
      scheduled = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );
  }

  function setupLoader() {
    const loader = qs(".page-loader");
    document.body.classList.add("is-loading");

    const finish = () => {
      window.setTimeout(() => {
        loader?.classList.add("is-hidden");
        document.body.classList.remove("is-loading");
      }, reduceMotion.matches ? 0 : 420);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
  }

  function initialize() {
    setupLoader();
    renderHeroWorkflow();
    renderSkills();
    renderVideoDirections();
    renderVideoGallery();
    renderPipeline();
    renderTools();
    renderHrm();
    renderEcosystem();
    renderProjects();
    renderExperience();

    setupRevealObserver();
    setupPipelineSignal();
    setupRoleRotation();
    setupNavigation();
    setupFilters();
    setupProjectDialog();
    setupShowreel();
    setupPointerEffects();
    setupParallax();

    const year = qs("#currentYear");
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
