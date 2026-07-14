document.addEventListener("DOMContentLoaded", () => {
    // 1. Age Counter (Born: 07-02-2006)
    const birthDate = new Date("2006-02-07T00:00:00");
    const ageElement = document.getElementById("age-counter");

    function updateAge() {
        const now = new Date();
        const diffInMs = now.getTime() - birthDate.getTime();
        const ageInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.2425); // Account for leap years
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
            typeSpeed = 1500; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 300; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 1000);

    // 3. Header Scroll Effect
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 4. Mobile Menu Navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.className = "ri-close-line";
                } else {
                    icon.className = "ri-menu-line";
                }
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu) navMenu.classList.remove("active");
            const icon = menuToggle ? menuToggle.querySelector("i") : null;
            if (icon) icon.className = "ri-menu-line";
        });
    });

    // 5. Active Link Highlight on Scroll (Intersection Observer)
    const sections = document.querySelectorAll("section");
    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Focus on mid-screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
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
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 6. Copy Email to Clipboard
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const emailText = "noorsayyed.atwork@gmail.com";
    const toast = document.getElementById("toast");

    if (copyEmailBtn && toast) {
        copyEmailBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(emailText).then(() => {
                showToast("Email address copied to clipboard!");
            }).catch(err => {
                console.error("Could not copy email: ", err);
                showToast("Failed to copy. Please manually copy the email.");
            });
        });
    }

    function showToast(message) {
        if (!toast) return;
        const toastText = toast.querySelector(".toast-text");
        if (toastText) toastText.textContent = message;
        
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // 7. Form Submission Handler
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <div class="badge-pulse" style="margin-left: 0.5rem; display:inline-block;"></div>`;
            
            // Simulate API request delay
            setTimeout(() => {
                showToast("Thank you! Your message has been sent successfully.");
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Clear active labels styling
                const inputs = contactForm.querySelectorAll("input, textarea");
                inputs.forEach(input => {
                    input.blur();
                });
            }, 1800);
        });
    }
});
