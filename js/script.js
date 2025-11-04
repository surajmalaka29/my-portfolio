// Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");
  const contactForm = document.getElementById("contactForm");
  let cursor = document.querySelector(".cursor");
  const typingElement = document.querySelector(".typing");
  const preloader = document.querySelector(".preloader");

  // Check if cursor element exists (will be null if not found)
  if (!cursor) {
    console.error("Custom cursor element not found. Creating one.");
    // Create cursor element if it doesn't exist
    const newCursor = document.createElement("div");
    newCursor.className = "cursor";
    document.body.appendChild(newCursor);
    // Reassign cursor variable to the newly created element
    cursor = document.querySelector(".cursor");
  }

  // Create scroll indicator
  const scrollIndicator = document.createElement("div");
  scrollIndicator.className = "scroll-indicator";
  document.body.appendChild(scrollIndicator);

  // Update scroll indicator width based on scroll position
  window.addEventListener("scroll", () => {
    if (!scrollIndicator) return;

    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = scrolled + "%";
  });

  // Smooth wheel scrolling
  const wheelOpt = { passive: false };
  const wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  function smoothScroll(event) {
    // Only apply custom scrolling on desktop devices
    if (window.innerWidth > 768) {
      event.preventDefault();

      const delta = event.deltaY || -event.wheelDelta || event.detail;
      const isScrollingDown = delta > 0;
      const speed = 0.5; // Lower value = slower scrolling

      const scrollAmount = isScrollingDown ? 60 * speed : -60 * speed;

      window.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  }

  // Uncomment the following line to enable smooth wheel scrolling
  // Caution: This can make the site feel less responsive for some users
  // window.addEventListener(wheelEvent, smoothScroll, wheelOpt);

  // Hide preloader when page is loaded
  window.addEventListener("load", function () {
    // Shorter delay - just enough for animation to complete
    setTimeout(() => {
      preloader.classList.add("hidden");
      // Enable body scrolling
      document.body.style.overflow = "auto";
    }, 1200); // Reduced to 1.2 seconds for faster page load
  });

  // Disable scrolling while preloader is active
  document.body.style.overflow = "hidden";

  // Create a more accurate SVG mask for your logo if needed
  function updateLogoMask() {
    // Try to get dimensions from the actual logo
    const logoRef = document.querySelector(".preloader-logo-reference");
    if (logoRef && logoRef.complete) {
      const logoContainer = document.querySelector(".logo-container");
      if (logoContainer) {
        logoContainer.style.width = logoRef.width + "px";
        logoContainer.style.height = logoRef.height + "px";
      }
    }
  }

  // Run this after images have loaded
  window.addEventListener("load", updateLogoMask);

  // Typing animation for job title
  const jobTitles = [
    "Full-Stack Developer",
    "Web Designer",
    "UI/UX Designer",
    "Software Engineer",
    "Mobile App Developer",
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100; // Delay between each character typed

  function typeJobTitle() {
    // Only run typing animation if the element exists (on home page)
    if (!typingElement) return;

    const currentTitle = jobTitles[titleIndex];

    // Set typing speed based on whether we're typing or deleting
    if (isDeleting) {
      typingDelay = 50; // Faster when deleting
    } else {
      typingDelay = 150; // Slower when typing
    }

    // Type or delete characters
    if (!isDeleting && charIndex < currentTitle.length) {
      // Typing forward
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else if (charIndex === 0 && isDeleting) {
      // Finished deleting, move to next title
      isDeleting = false;
      titleIndex = (titleIndex + 1) % jobTitles.length;
    } else {
      // Finished typing, pause then start deleting
      isDeleting = true;
      typingDelay = 1500; // Pause at the end of the word
    }

    // Schedule next update
    setTimeout(typeJobTitle, typingDelay);
  }

  // Start the typing animation
  typeJobTitle();

  // Custom cursor
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Add hover effect for clickable elements
    document
      .querySelectorAll("a, button, .btn, .hamburger, .social-icon")
      .forEach((item) => {
        item.addEventListener("mouseenter", () => {
          cursor.style.width = "25px";
          cursor.style.height = "25px";
          cursor.style.backgroundColor = "var(--primary-color)";
          cursor.style.mixBlendMode = "difference";
        });

        item.addEventListener("mouseleave", () => {
          cursor.style.width = "15px";
          cursor.style.height = "15px";
          cursor.style.backgroundColor = "var(--primary-color)";
          cursor.style.mixBlendMode = "normal";
        });
      });
  } else {
    console.error("Cursor element is still not available after initialization");
  }

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking on a nav link
  navLinksItems.forEach((item) => {
    item.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Active link state on scroll
  window.addEventListener("scroll", function () {
    // Skip this logic on the about page
    if (window.location.pathname.includes("about.html")) {
      return;
    }

    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinksItems.forEach((item) => {
      item.classList.remove("active");
      // Check if it's a page link or a section link
      const href = item.getAttribute("href");
      if (href && !href.includes(".html") && href.substring(1) === current) {
        item.classList.add("active");
      }
    });
  });

  // Initialize EmailJS
  (function () {
    // Check if EMAIL_CONFIG is available and has required values
    if (
      typeof EMAIL_CONFIG !== "undefined" &&
      EMAIL_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE"
    ) {
      emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
      console.log(
        "EmailJS initialized successfully with key:",
        EMAIL_CONFIG.PUBLIC_KEY
      );
    } else {
      console.warn(
        "EmailJS not configured. Please set up email-config.js with your EmailJS credentials."
      );
    }
  })();

  // Form submission with validation and email sending
  if (contactForm) {
    // Add real-time validation
    const formInputs = contactForm.querySelectorAll("input, textarea");

    formInputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        // Remove error state when user starts typing
        const formGroup = this.closest(".form-group");
        formGroup.classList.remove("error");
      });
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validate all fields
      let isValid = true;

      if (!validateField(document.getElementById("name"))) isValid = false;
      if (!validateField(document.getElementById("email"))) isValid = false;
      if (!validateField(document.getElementById("mobile"))) isValid = false;
      if (!validateField(document.getElementById("subject"))) isValid = false;
      if (!validateField(document.getElementById("message"))) isValid = false;

      if (!isValid) {
        showNotification("Please fix the errors above", "error");
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector(".btn-submit");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Prepare email parameters
      const templateParams = {
        from_name: name,
        from_email: email,
        mobile: mobile || "Not provided",
        subject: subject,
        message: message,
        to_name: "Malaka Perera",
        reply_to: email,
        timestamp: new Date().toISOString(),
      };

      // Send email using EmailJS
      // Check if EmailJS is properly configured
      if (
        typeof EMAIL_CONFIG === "undefined" ||
        EMAIL_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY_HERE" ||
        EMAIL_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID_HERE" ||
        EMAIL_CONFIG.TEMPLATE_ID === "YOUR_TEMPLATE_ID_HERE"
      ) {
        console.warn("EmailJS not fully configured, falling back to mailto");
        // Fallback to mailto if EmailJS is not configured
        const mailtoBody = `From: ${name} (${email})${
          mobile ? `\nMobile: ${mobile}` : ""
        }\n\n${message}`;
        const mailtoLink = `mailto:info@malakaperera.live?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(mailtoBody)}`;

        window.location.href = mailtoLink;
        showNotification("Opening your email client...", "success");

        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
      }

      console.log("Sending email via EmailJS with config:", {
        service: EMAIL_CONFIG.SERVICE_ID,
        template: EMAIL_CONFIG.TEMPLATE_ID,
        params: templateParams,
      });

      emailjs
        .send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, templateParams)
        .then(
          function (response) {
            console.log(
              "Email sent successfully!",
              response.status,
              response.text
            );
            showNotification(
              "Thank you! Your message has been sent successfully. I'll get back to you soon!",
              "success"
            );
            contactForm.reset();

            // Remove any validation states
            formInputs.forEach((input) => {
              const formGroup = input.closest(".form-group");
              formGroup.classList.remove("error", "success");
            });

            // Track successful form submission (optional analytics)
            if (typeof gtag !== "undefined") {
              gtag("event", "form_submit", {
                event_category: "Contact",
                event_label: "Contact Form",
              });
            }
          },
          function (error) {
            console.error("Failed to send email:", error);

            // Fallback: Try to open email client
            const mailtoLink = `mailto:info@malakaperera.live?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(
              `From: ${name} (${email})\n\n${message}`
            )}`;

            if (
              confirm(
                "Email service temporarily unavailable. Would you like to open your email client instead?"
              )
            ) {
              window.location.href = mailtoLink;
              showNotification("Opening your email client...", "success");
            } else {
              showNotification(
                "Failed to send message. Please try again or contact us directly at info@malakaperera.live",
                "error"
              );
            }
          }
        )
        .finally(function () {
          // Reset button state
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // Field validation function
  function validateField(field) {
    const formGroup = field.closest(".form-group");
    const value = field.value.trim();
    let isValid = true;

    // Remove previous states
    formGroup.classList.remove("error", "success");

    if (value === "") {
      // Mobile field is optional, so don't mark as error if empty
      if (field.id === "mobile") {
        return true;
      }
      formGroup.classList.add("error");
      isValid = false;
    } else if (field.type === "email" && !isValidEmail(value)) {
      formGroup.classList.add("error");
      isValid = false;
    } else if (field.type === "tel" && !isValidMobile(value)) {
      formGroup.classList.add("error");
      isValid = false;
    } else {
      formGroup.classList.add("success");
    }

    return isValid;
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Helper function to validate mobile number
  function isValidMobile(mobile) {
    // Remove all non-digit characters
    const cleanMobile = mobile.replace(/\D/g, "");

    // Sri Lankan local format: must start with 0 and be exactly 10 digits
    const sriLankaPattern = /^0\d{9}$/;

    // International format: 8–15 digits (e.g., +94772658446)
    const internationalPattern = /^\+?[1-9]\d{7,14}$/;

    // Check both cases
    return (
      sriLankaPattern.test(cleanMobile) || internationalPattern.test(mobile)
    );
  }

  // Notification function
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Append to body
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Handle CV download buttons
  const downloadButtons = document.querySelectorAll("a[download]");
  downloadButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Don't show notification if it's not a CV download
      if (!this.getAttribute("href").includes("CV/")) {
        return;
      }

      // Add animation class
      this.style.animation = "pulse-download 1s";

      // Show notification
      setTimeout(() => {
        showNotification("CV download started!", "success");
        // Remove animation class after it completes
        setTimeout(() => {
          this.style.animation = "";
        }, 1000);
      }, 300);
    });
  });

  // Add animation on scroll
  const scrollElements = document.querySelectorAll(".scroll-animation");
  const progressBars = document.querySelectorAll(".progress");

  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) *
        (percentageScroll / 100)
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };

  // Function to animate progress bars
  const animateProgressBars = () => {
    const skillSection = document.getElementById("skills");
    if (!skillSection) return;

    const skillSectionRect = skillSection.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Check if skills section is in view
    if (
      skillSectionRect.top < windowHeight * 0.75 &&
      skillSectionRect.bottom > 0
    ) {
      progressBars.forEach((progress, index) => {
        // Get width from the data-width attribute
        const width = progress.getAttribute("data-width") || "0%";

        // Set the width to trigger animation with a staggered delay
        setTimeout(() => {
          progress.style.width = width;
        }, 300 * index); // Staggered delay for sequential animation
      });
    } else if (skillSectionRect.top > windowHeight) {
      // Reset when out of view for replay on next scroll
      progressBars.forEach((progress) => {
        progress.style.width = "0";
      });
    }
  };

  const handleScrollAnimation = () => {
    // Re-query scroll elements each time to include dynamically added ones
    const currentScrollElements =
      document.querySelectorAll(".scroll-animation");

    currentScrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });

    // Call progress bar animation
    animateProgressBars();
  };

  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });

  // Make handleScrollAnimation globally accessible for other scripts
  window.handleScrollAnimation = handleScrollAnimation;

  // Initialize animations on load
  handleScrollAnimation();

  // Function to re-initialize scroll animations for dynamically added elements
  function initScrollAnimations() {
    // Re-query scroll elements to include new ones
    const newScrollElements = document.querySelectorAll(".scroll-animation");

    newScrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  }

  // Make sure to trigger animations if the page loads directly on the skills section
  setTimeout(() => {
    animateProgressBars();
  }, 500);

  // Portfolio page filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Get the filter category
        const filterCategory = this.textContent.trim().toLowerCase();

        // For now, we'll just log the filter category
        // In a real implementation, you would filter the projects based on this category
        console.log(`Filtering projects by: ${filterCategory}`);

        // Animation for filtered items (optional)
        const projectCards = document.querySelectorAll(".project-card");
        projectCards.forEach((card) => {
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 300);
        });
      });
    });
  }

  // Add back to top button
  const body = document.querySelector("body");

  // Create back to top button
  const backToTopBtn = document.createElement("div");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  body.appendChild(backToTopBtn);

  // Show/hide back to top button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", () => {
    // Custom smooth scroll to top with slower animation
    const startPosition = window.pageYOffset;
    const duration = 1500; // Longer duration for slower scrolling
    let start = null;

    // Using requestAnimationFrame for smoother animation
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      // Cubic easing function for smoother motion
      const easing = (percentage) => {
        return percentage < 0.5
          ? 4 * percentage * percentage * percentage
          : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
      };

      window.scrollTo(0, startPosition * (1 - easing(percentage)));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  });

  // Enhanced smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Skip empty links or just "#" links
      if (!this.getAttribute("href") || this.getAttribute("href") === "#") {
        return;
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate header height for offset
        const headerOffset =
          document.querySelector(".navbar").offsetHeight + 20;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Custom smooth scroll with slower animation
        const startPosition = window.pageYOffset;
        const distance = offsetPosition - startPosition;
        const duration = 1500; // Longer duration for slower scrolling
        let start = null;

        // Using requestAnimationFrame for smoother animation
        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percentage = Math.min(progress / duration, 1);

          // Cubic easing function for smoother motion
          const easing = (percentage) => {
            return percentage < 0.5
              ? 4 * percentage * percentage * percentage
              : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
          };

          window.scrollTo(0, startPosition + distance * easing(percentage));

          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        }

        window.requestAnimationFrame(step);

        // Update active state in navigation
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });

  // Load portfolio items from data.js
  function loadPortfolioItems() {
    if (typeof projectData === "undefined") {
      console.error("Project data not loaded. Make sure data.js is included.");
      return;
    }

    const portfolioGrid = document.getElementById("portfolio-grid");
    if (!portfolioGrid) return;

    // Get first 3 projects for homepage
    const projectKeys = Object.keys(projectData);
    const featuredProjects = projectKeys.slice(0, 3);

    portfolioGrid.innerHTML = "";

    featuredProjects.forEach((projectKey) => {
      const project = projectData[projectKey];

      // Create short description (first 150 characters + "...")
      const shortDescription =
        project.description.length > 150
          ? project.description.substring(0, 150) + "..."
          : project.description;

      const portfolioItem = document.createElement("div");
      portfolioItem.className = "portfolio-item scroll-animation";

      portfolioItem.innerHTML = `
        <div class="portfolio-image">
          <img src="${project.screenshots[0]}" alt="${project.name}" />
        </div>
        <div class="portfolio-info">
          <h3>${project.name}</h3>
          <p>${shortDescription}</p>
          <div class="portfolio-links">
            <a href="project-details.html?project=${projectKey}" class="portfolio-link">
              <i class="fa-solid fa-chevron-right"></i>
            </a>
          </div>
        </div>
      `;

      portfolioGrid.appendChild(portfolioItem);
    });

    // Re-initialize scroll animations for new elements
    initScrollAnimations();
  }

  // Load portfolio items on page load
  loadPortfolioItems();

  // Magic Lighting Effect on Hero Section
  function initMagicLightingEffect() {
    const heroSection = document.getElementById("home");
    const magicEffect = document.querySelector(".magic-lighting-effect");

    if (!heroSection || !magicEffect) return;

    // Create magic sparkle on mouse move
    heroSection.addEventListener("mousemove", function (e) {
      // Throttle the effect to prevent too many sparkles
      if (Math.random() > 0.2) return;

      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create sparkle element
      const sparkle = document.createElement("div");
      sparkle.className = "magic-sparkle";

      // Random size and color variation
      const size = Math.random() * 8 + 3; // 3px to 11px
      const colors = [
        "var(--primary-color)",
        "rgba(255, 119, 0, 0.8)",
        "rgba(172, 172, 172, 0.9)",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // Position the sparkle
      sparkle.style.left = x + "px";
      sparkle.style.top = y + "px";
      sparkle.style.width = size + "px";
      sparkle.style.height = size + "px";
      sparkle.style.background = randomColor;
      sparkle.style.position = "absolute";
      sparkle.style.borderRadius = "50%";
      sparkle.style.pointerEvents = "none";
      sparkle.style.boxShadow = `0 0 ${size * 2}px ${randomColor}`;
      sparkle.style.animation = "sparkleEffect 1s ease-out forwards";

      // Add sparkle to magic effect container
      magicEffect.appendChild(sparkle);

      // Remove sparkle after animation completes
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 1000);
    });

    // Enhanced magic effect on click
    heroSection.addEventListener("click", function (e) {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create magical burst on click
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const burst = document.createElement("div");
          burst.className = "magic-burst";

          const angle = i * 45 * (Math.PI / 180); // 45 degrees apart
          const distance = 50 + Math.random() * 30;
          const finalX = x + Math.cos(angle) * distance;
          const finalY = y + Math.sin(angle) * distance;

          burst.style.left = x + "px";
          burst.style.top = y + "px";
          burst.style.width = "6px";
          burst.style.height = "6px";
          burst.style.background = "var(--primary-color)";
          burst.style.position = "absolute";
          burst.style.borderRadius = "50%";
          burst.style.pointerEvents = "none";
          burst.style.boxShadow = "0 0 15px var(--primary-color)";
          burst.style.animation = `magicBurst 1.2s ease-out forwards`;
          burst.style.setProperty("--final-x", finalX + "px");
          burst.style.setProperty("--final-y", finalY + "px");

          magicEffect.appendChild(burst);

          setTimeout(() => {
            if (burst.parentNode) {
              burst.parentNode.removeChild(burst);
            }
          }, 1200);
        }, i * 50);
      }
    });

    // Add CSS animations dynamically
    const style = document.createElement("style");
    style.textContent = `
      @keyframes sparkleEffect {
        0% {
          transform: scale(0) rotate(0deg);
          opacity: 1;
        }
        50% {
          transform: scale(1.5) rotate(180deg);
          opacity: 0.8;
        }
        100% {
          transform: scale(0) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes magicBurst {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(calc(var(--final-x) - 50%), calc(var(--final-y) - 50%)) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize magic lighting effect
  initMagicLightingEffect();
});
