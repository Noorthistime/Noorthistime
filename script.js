document.addEventListener("DOMContentLoaded", () => {
    // 1. Age Counter (Born: 07-02-2006)
    const birthDate = new Date("2006-02-07T00:00:00");
    const ageElement = document.getElementById("age-counter");

    function updateAge() {
        const now = new Date();
        const diffInMs = now.getTime() - birthDate.getTime();
        const ageInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.2425);
        if (ageElement) {
            ageElement.textContent = ageInYears.toFixed(9);
        }
        requestAnimationFrame(updateAge);
    }
    updateAge();

    // 2. Typing Animation
    const words = ["Computer Engineering Student", "Aspiring Software Engineer", "Problem Solver", "Full Stack Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.getElementById("typed-text");

    function typeEffect() {
        if (!typedTextElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 300;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 800);

    // 3. Header Scroll Styling
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 4. Accent Theme Swapper Logic
    const accentToggle = document.getElementById("accentToggle");
    const accentDropdown = document.getElementById("accentDropdown");
    const accentOpts = document.querySelectorAll(".accent-opt");
    let activeAccent = localStorage.getItem("nexusAccent") || "red";

    function applyAccent(acc) {
        document.documentElement.dataset.accent = acc;
        accentOpts.forEach(opt => {
            if (opt.dataset.accent === acc) {
                opt.classList.add("active");
            } else {
                opt.classList.remove("active");
            }
        });
        localStorage.setItem("nexusAccent", acc);
    }

    if (accentToggle && accentDropdown) {
        accentToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            accentDropdown.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!accentDropdown.contains(e.target) && e.target !== accentToggle) {
                accentDropdown.classList.remove("active");
            }
        });
    }

    accentOpts.forEach(opt => {
        opt.addEventListener("click", () => {
            const selectedAccent = opt.dataset.accent;
            applyAccent(selectedAccent);
            accentDropdown.classList.remove("active");
        });
    });

    // Load saved accent theme
    applyAccent(activeAccent);

    // 5. Theme Toggling (Light / Dark)
    const themeToggle = document.getElementById("themeToggle");
    let theme = localStorage.getItem("nexusTheme") || "light";

    function applyTheme(t) {
        document.documentElement.dataset.theme = t;
        const icon = themeToggle.querySelector(".theme-icon");
        if (icon) {
            icon.innerHTML = t === "dark"
                ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                       <circle cx="12" cy="12" r="5"/>
                       <line x1="12" y1="1" x2="12" y2="3"/>
                       <line x1="12" y1="21" x2="12" y2="23"/>
                       <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                       <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                       <line x1="1" y1="12" x2="3" y2="12"/>
                       <line x1="21" y1="12" x2="23" y2="12"/>
                       <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                       <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                   </svg>`
                : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                       <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                   </svg>`;
        }
        themeToggle.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
        localStorage.setItem("nexusTheme", t);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            theme = theme === "light" ? "dark" : "light";
            applyTheme(theme);
        });
    }

    // Load saved layout theme
    applyTheme(theme);

    // 6. Mobile Menu Drawer Navigation
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const mobileLinks = mobileNav ? mobileNav.querySelectorAll(".nav-link") : [];

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileNav.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (mobileNav.classList.contains("active")) {
                    icon.className = "ri-close-line";
                } else {
                    icon.className = "ri-menu-line";
                }
            }
        });

        document.addEventListener("click", (e) => {
            if (!mobileNav.contains(e.target) && e.target !== menuToggle) {
                mobileNav.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) icon.className = "ri-menu-line";
            }
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("active");
            const icon = menuToggle ? menuToggle.querySelector("i") : null;
            if (icon) icon.className = "ri-menu-line";
        });
    });

    // 7. Navigation Link Highlight on Scroll
    const navLinks = document.querySelectorAll(".desktop-nav .nav-link, .mobile-nav .nav-link");
    const sections = document.querySelectorAll("section[id]");
    const scrollObserverOptions = {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0
    };

    const scrollObserver = new IntersectionObserver((entries) => {
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
    }, scrollObserverOptions);

    sections.forEach(sec => scrollObserver.observe(sec));

    // 8. Dotted Skill Bars Intersection Observer (Scroll-to-Fill)
    const skillBars = document.querySelectorAll(".skill-bar");
    const skillObserverOptions = {
        root: null,
        threshold: 0.1
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute("data-progress");
                bar.style.width = `${progress}%`;
                observer.unobserve(bar); // Stop observing after animation triggers
            }
        });
    }, skillObserverOptions);

    skillBars.forEach(bar => skillObserver.observe(bar));

    // 9. Clipboard Copy Handler
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const emailAddressText = "noorsayyed.atwork@gmail.com";
    const toast = document.getElementById("toast");

    if (copyEmailBtn && toast) {
        copyEmailBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(emailAddressText).then(() => {
                showToast("Email copied to clipboard!");
            }).catch(err => {
                console.error("Copy failed: ", err);
                showToast("Failed to copy email. Please copy manually.");
            });
        });
    }

    function showToast(msg) {
        if (!toast) return;
        const toastText = toast.querySelector(".toast-text");
        if (toastText) toastText.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }

    // 10. Contact Form Submission via EmailJS
    // ─────────────────────────────────────────────────────────────
    // HOW TO SET UP (takes ~2 minutes):
    // 1. Go to https://www.emailjs.com/ → Sign Up (free)
    // 2. Dashboard → "Email Services" → Add Gmail → copy your SERVICE_ID
    // 3. Dashboard → "Email Templates" → Create template with variables:
    //      {{from_name}}, {{from_email}}, {{message}}
    //    Set "To Email" to noorsayyed.atwork@gmail.com → copy TEMPLATE_ID
    // 4. Dashboard → "Account" → API Keys → copy your PUBLIC_KEY
    // 5. Replace the three placeholders below with your actual values
    // ─────────────────────────────────────────────────────────────
    const EMAILJS_SERVICE_ID = "portfolioredirect";   // e.g. "service_abc123"
    const EMAILJS_TEMPLATE_ID = "template_3y0zuhd";  // e.g. "template_xyz789"
    const EMAILJS_PUBLIC_KEY = "cF3wK97L1mlSzPQhB";   // e.g. "aBcDeFgHiJ1234"

    if (typeof emailjs !== "undefined") {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalHTML = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending... <span class="accent-dot-swatch" style="display:inline-block; width:10px; height:10px; margin-left:6px; animation: pulse 1s infinite alternate;"></span>`;

            const templateParams = {
                name: contactForm.querySelector("#name").value.trim(),
                email: contactForm.querySelector("#email").value.trim(),
                message: contactForm.querySelector("#message").value.trim()
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(() => {
                    showToast("Message sent! I'll get back to you soon 🚀");
                    contactForm.reset();
                })
                .catch(err => {
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

    // 11. Shimmer Logo click scrolls to top
    const logoClick = document.getElementById("logoClick");
    if (logoClick) {
        logoClick.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
