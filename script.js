/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO v2.0 — COMPLETE SCRIPT
   Author: Saiyed Noor Mohammad
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

  // ─────────────────────────────────────────────────────────────
  // 1. HEADER — Scroll-triggered styling
  // ─────────────────────────────────────────────────────────────
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });


  // ─────────────────────────────────────────────────────────────
  // 2. MOBILE DRAWER
  // ─────────────────────────────────────────────────────────────
  const menuToggle   = document.getElementById("menuToggle");
  const drawerClose  = document.getElementById("drawerClose");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawerLinks  = document.querySelectorAll(".drawer-link");

  function openDrawer() {
    mobileDrawer.classList.add("open");
    drawerOverlay.classList.add("visible");
    mobileDrawer.removeAttribute("aria-hidden");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("visible");
    mobileDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (menuToggle)    menuToggle.addEventListener("click", openDrawer);
  if (drawerClose)   drawerClose.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });


  // ─────────────────────────────────────────────────────────────
  // 3. TYPING ANIMATION
  // ─────────────────────────────────────────────────────────────
  const words = [
    "Computer Engineering Student",
    "Aspiring Software Engineer",
    "Full Stack Developer",
    "Problem Solver"
  ];
  let wordIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  const typedEl  = document.getElementById("typed-text");

  function typeEffect() {
    if (!typedEl) return;
    const word = words[wordIndex];

    if (isDeleting) {
      typedEl.textContent = word.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = word.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 38 : 75;

    if (!isDeleting && charIndex === word.length) {
      delay = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
      delay = 320;
    }

    setTimeout(typeEffect, delay);
  }

  setTimeout(typeEffect, 900);


  // ─────────────────────────────────────────────────────────────
  // 4. LIVE AGE COUNTER (DOB: 07 Feb 2006)
  // ─────────────────────────────────────────────────────────────
  const birthDate  = new Date("2006-02-07T00:00:00");
  const ageCounter = document.getElementById("age-counter");
  const heroAge    = document.getElementById("hero-age");

  function updateAge() {
    const now         = new Date();
    const diffMs      = now.getTime() - birthDate.getTime();
    const ageInYears  = diffMs / (1000 * 60 * 60 * 24 * 365.2425);

    if (ageCounter) ageCounter.textContent = ageInYears.toFixed(9);
    if (heroAge)    heroAge.textContent    = Math.floor(ageInYears);

    requestAnimationFrame(updateAge);
  }

  updateAge();


  // ─────────────────────────────────────────────────────────────
  // 5. REVEAL ON SCROLL — IntersectionObserver
  // ─────────────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right, .reveal-scale"
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);

      setTimeout(() => {
        el.classList.add("revealed");
      }, delay);

      revealObserver.unobserve(el);
    });
  }, {
    root:       null,
    rootMargin: "0px 0px -80px 0px",
    threshold:  0.1
  });

  revealEls.forEach(el => revealObserver.observe(el));


  // ─────────────────────────────────────────────────────────────
  // 6. SKILL BARS — Animate on scroll entry
  // ─────────────────────────────────────────────────────────────
  const skillBars = document.querySelectorAll(".skill-bar");
  const skillPcts = document.querySelectorAll(".skill-pct");

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const bar      = entry.target;
      const progress = parseInt(bar.dataset.progress, 10);

      // Animate width
      setTimeout(() => {
        bar.style.width = `${progress}%`;
      }, 200);

      // Animate percentage counter
      const pctEl = bar.closest(".skill-row")?.querySelector(".skill-pct");
      if (pctEl) {
        const target = parseInt(pctEl.dataset.target, 10);
        let current  = 0;
        const step   = target / 60;

        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          pctEl.textContent = `${Math.round(current)}%`;
        }, 20);
      }

      observer.unobserve(bar);
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => skillObserver.observe(bar));


  // ─────────────────────────────────────────────────────────────
  // 7. ACHIEVEMENT STATS — Count-up animation
  // ─────────────────────────────────────────────────────────────
  const statNums = document.querySelectorAll(".ach-stat-num");

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);

      if (target === 0) {
        el.textContent = "0";
        observer.unobserve(el);
        return;
      }

      let current = 0;
      const step  = target / 50;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.round(current);
      }, 30);

      observer.unobserve(el);
    });
  }, { threshold: 0.3 });

  statNums.forEach(el => statObserver.observe(el));


  // ─────────────────────────────────────────────────────────────
  // 8. ACTIVE NAV LINK on Scroll
  // ─────────────────────────────────────────────────────────────
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const sections = document.querySelectorAll("section[id]");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, {
    root:       null,
    rootMargin: "-30% 0px -55% 0px",
    threshold:  0
  });

  sections.forEach(sec => navObserver.observe(sec));


  // ─────────────────────────────────────────────────────────────
  // 9. LOGO CLICK — Smooth scroll to top
  // ─────────────────────────────────────────────────────────────
  const logoMark = document.getElementById("logoMark");
  if (logoMark) {
    logoMark.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  // ─────────────────────────────────────────────────────────────
  // 10. CLIPBOARD COPY — Email address
  // ─────────────────────────────────────────────────────────────
  const copyEmailBtn    = document.getElementById("copy-email-btn");
  const emailAddress    = "noorsayyed.atwork@gmail.com";
  const toast           = document.getElementById("toast");

  function showToast(msg) {
    if (!toast) return;
    const toastText = toast.querySelector(".toast-text");
    if (toastText) toastText.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(emailAddress)
        .then(() => showToast("Email copied to clipboard! ✓"))
        .catch(() => showToast("Please copy manually: " + emailAddress));
    });
  }


  // ─────────────────────────────────────────────────────────────
  // 11. CONTACT FORM — EmailJS Integration
  //     ─────────────────────────────────────────────────────────
  //     EmailJS credentials — DO NOT MODIFY:
  //       Service ID:  portfolioredirect
  //       Template ID: template_3y0zuhd
  //       Public Key:  cF3wK97L1mlSzPQhB
  // ─────────────────────────────────────────────────────────────
  const EMAILJS_SERVICE_ID  = "portfolioredirect";
  const EMAILJS_TEMPLATE_ID = "template_3y0zuhd";
  const EMAILJS_PUBLIC_KEY  = "cF3wK97L1mlSzPQhB";

  if (typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const contactForm = document.getElementById("contact-form");
  const submitBtn   = document.getElementById("submitBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="btn-text">Sending...</span> <i class="ri-loader-4-line" style="animation:spin 0.8s linear infinite;"></i><span class="btn-shimmer"></span>`;

      const templateParams = {
        name:    contactForm.querySelector("#name").value.trim(),
        email:   contactForm.querySelector("#email").value.trim(),
        subject: contactForm.querySelector("#subject") ? contactForm.querySelector("#subject").value.trim() : "",
        message: contactForm.querySelector("#message").value.trim()
      };

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
          showToast("Message sent! I'll get back to you soon 🚀");
          contactForm.reset();
        })
        .catch((err) => {
          console.error("EmailJS error:", err);
          showToast("Failed to send. Please email me directly!");
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
          contactForm.querySelectorAll("input, textarea").forEach(i => i.blur());
        });
    });
  }


  // ─────────────────────────────────────────────────────────────
  // 12. SOCIAL ICONS — Staggered bounce-in on page load
  // ─────────────────────────────────────────────────────────────
  const socialIcons = document.querySelectorAll(".social-icon[data-bounce]");
  socialIcons.forEach(icon => {
    const delay = parseInt(icon.dataset.bounce, 10) * 120 + 1200;
    icon.style.opacity    = "0";
    icon.style.transform  = "scale(0.5) translateY(10px)";
    icon.style.transition = "opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    setTimeout(() => {
      icon.style.opacity   = "1";
      icon.style.transform = "scale(1) translateY(0)";
    }, delay);
  });


  // ─────────────────────────────────────────────────────────────
  // 13. SUBMIT BUTTON — Subtle pulse after form renders
  // ─────────────────────────────────────────────────────────────
  if (submitBtn) {
    setTimeout(() => {
      submitBtn.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";
      submitBtn.style.transform  = "scale(1.04)";
      submitBtn.style.boxShadow  = "0 0 30px rgba(227,0,0,0.35)";
      setTimeout(() => {
        submitBtn.style.transform = "scale(1)";
        submitBtn.style.boxShadow = "";
      }, 250);
    }, 1800);
  }

});


// ─────────────────────────────────────────────────────────────
// CSS @keyframes injected via JS for spinner (tiny addition)
// ─────────────────────────────────────────────────────────────
const spinStyle = document.createElement("style");
spinStyle.textContent = "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }";
document.head.appendChild(spinStyle);
