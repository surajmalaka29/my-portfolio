/**
 * Portfolio Dynamic Loading Script
 * Loads projects from data.js and populates the portfolio grid
 */

document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the portfolios page
  if (!document.querySelector(".portfolio-grid")) {
    return;
  }

  // Check if projectData is available
  if (typeof projectData === "undefined") {
    console.error(
      "Project data not loaded. Make sure data.js is included before this script."
    );
    return;
  }

  // Get the portfolio grid container
  const portfolioGrid = document.querySelector(".portfolio-grid");

  // Clear existing content
  portfolioGrid.innerHTML = "";

  // Convert projectData object to array for easier handling
  const projects = Object.keys(projectData).map((key) => ({
    id: key,
    ...projectData[key],
  }));

  // Create individual project cards without grouping into rows
  projects.forEach((project) => {
    const cardHtml = `
      <div class="project-card scroll-animation" data-category="${
        project.category
      }" style="display: block; opacity: 1;">
        <div class="project-image">
          <img src="${project.screenshots[0]}" alt="${project.name} Project" />
        </div>
        <div class="project-content">
          <h3>${project.name}</h3>
          <p>${project.description.substring(0, 150)}...</p>
          <div class="project-link">
            <a href="project-details.html?project=${
              project.id
            }" class="next-btn">
              <i class="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    portfolioGrid.innerHTML += cardHtml;
  });

  // Initialize filter functionality
  initializeFilters();

  // Initialize scroll animations for dynamically created elements
  initializeScrollAnimations();
});

function initializeFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get filter category
      const filterCategory = this.textContent.trim();

      // Show/hide project cards based on filter
      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (filterCategory === "All") {
          // Show all projects
          card.style.display = "block";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 100);
        } else if (
          filterCategory === "App Development" &&
          (cardCategory === "App Development" ||
            cardCategory === "Web Development")
        ) {
          // Show both App Development and Web Development for "App Development" filter
          card.style.display = "block";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 100);
        } else if (cardCategory === filterCategory) {
          card.style.display = "block";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 100);
        } else {
          card.style.display = "none";
        }
      });

      // Re-initialize scroll animations after filtering
      setTimeout(() => {
        initializeScrollAnimations();
      }, 200);
    });
  });
}

// Function to initialize scroll animations for dynamically created elements
function initializeScrollAnimations() {
  // Check if the scroll animation functions exist (from script.js)
  if (typeof window.handleScrollAnimation === "function") {
    window.handleScrollAnimation();
  } else {
    // Fallback scroll animation initialization
    const scrollElements = document.querySelectorAll(".scroll-animation");

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

    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  }
}
