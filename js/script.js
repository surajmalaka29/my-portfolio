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
    // Add a delay to ensure the logo fill animation completes
    setTimeout(() => {
      preloader.classList.add("hidden");
      // Enable body scrolling
      document.body.style.overflow = "auto";
    }, 3000); // Increased to 3 seconds to accommodate the full animation sequence
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

  // Form submission with validation
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Simple validation
      if (name === "" || email === "" || subject === "" || message === "") {
        showNotification("Please fill in all fields", "error");
        return;
      }

      // Email validation
      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulating form submission
      // In a real application, you would send this data to a server
      showNotification("Thank you! Your message has been sent.", "success");
      contactForm.reset();
    });
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
    scrollElements.forEach((el) => {
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

  // Initialize animations on load
  handleScrollAnimation();

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
});
