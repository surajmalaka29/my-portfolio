/**
 * Project Details JavaScript
 * Handles the screenshot slider and other interactions on the project details page
 */

document.addEventListener("DOMContentLoaded", function () {
  // Screenshots slider functionality
  const screenshots = document.querySelectorAll(".screenshot");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.getElementById("prev-screenshot");
  const nextBtn = document.getElementById("next-screenshot");
  let currentIndex = 0;

  // Function to show a specific screenshot
  function showScreenshot(index) {
    // Remove active class from all screenshots and indicators
    screenshots.forEach((screenshot) => screenshot.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Add active class to the current screenshot and indicator
    screenshots[index].classList.add("active");
    indicators[index].classList.add("active");

    // Update current index
    currentIndex = index;
  }

  // Previous button click
  prevBtn.addEventListener("click", () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = screenshots.length - 1; // Loop back to the end
    }
    showScreenshot(newIndex);
  });

  // Next button click
  nextBtn.addEventListener("click", () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= screenshots.length) {
      newIndex = 0; // Loop back to the beginning
    }
    showScreenshot(newIndex);
  });

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showScreenshot(index);
    });
  });

  // Auto-advance the slider every 5 seconds (optional)
  const autoAdvance = setInterval(() => {
    let newIndex = currentIndex + 1;
    if (newIndex >= screenshots.length) {
      newIndex = 0;
    }
    showScreenshot(newIndex);
  }, 5000);

  // Stop auto-advance when user interacts with the slider
  const sliderElements = [prevBtn, nextBtn, ...indicators];
  sliderElements.forEach((element) => {
    element.addEventListener("click", () => {
      clearInterval(autoAdvance);
    });
  });

  // Get URL parameters to load specific project
  function getProjectFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("project");
  }

  // Load project data
  const projectId = getProjectFromUrl() || "flexin"; // Default to flexin project if none specified
  loadProjectData(projectId);

  // Function to load project data
  function loadProjectData(projectId) {
    // Use the projectData from data.js
    if (typeof projectData === "undefined") {
      console.error(
        "Project data not loaded. Make sure data.js is included before this script."
      );
      return;
    }

    // Get the selected project data or use default
    const project = projectData[projectId] || projectData.flexin;

    // Update page elements with project data
    document.getElementById("project-name").textContent =
      project.name.toUpperCase();
    document.getElementById("project-heading").textContent = project.heading;
    document.getElementById("project-description-text").textContent =
      project.description;
    document.getElementById("client-name").textContent = ": " + project.client;
    document.getElementById("role-description").textContent =
      ": " + project.role;
    document.getElementById("technologies-used").textContent =
      ": " + project.technologies;
    document.getElementById("project-type").textContent = ": " + project.type;
    document.getElementById("project-duration").textContent =
      ": " + project.duration;

    // Update navigation links
    document.querySelector(
      ".prev-project"
    ).href = `project-details.html?project=${project.prevProject}`;
    document.querySelector(
      ".next-project"
    ).href = `project-details.html?project=${project.nextProject}`;

    // Update screenshots if different from default
    updateScreenshots(project.screenshots);

    // Update related projects
    updateRelatedProjects(projectId);
  }

  // Function to update screenshots
  function updateScreenshots(screenshots) {
    if (screenshots && screenshots.length > 0) {
      const screenshotElements = document.querySelectorAll(".screenshot img");
      const indicatorsContainer = document.querySelector(
        ".screenshot-indicators"
      );

      // Update existing screenshots
      screenshotElements.forEach((img, index) => {
        if (screenshots[index]) {
          img.src = screenshots[index];
          img.alt = `Project Screenshot ${index + 1}`;
        }
      });

      // Update indicators if needed
      const indicators = document.querySelectorAll(".indicator");
      indicators.forEach((indicator, index) => {
        if (index < screenshots.length) {
          indicator.style.display = "inline-block";
        } else {
          indicator.style.display = "none";
        }
      });
    }
  }

  // Function to update related projects
  function updateRelatedProjects(currentProjectId) {
    const relatedProjectsGrid = document.querySelector(
      ".related-projects-grid"
    );
    if (!relatedProjectsGrid) return;

    // Get all projects except the current one
    const allProjects = Object.keys(projectData).filter(
      (id) => id !== currentProjectId
    );

    // Select 3 random projects for related projects
    const relatedProjects = allProjects.slice(0, 3);

    // Clear existing related projects
    relatedProjectsGrid.innerHTML = "";

    // Create related project cards
    relatedProjects.forEach((projectId) => {
      const project = projectData[projectId];
      const cardHtml = `
        <div class="related-project-card">
          <div class="related-project-image">
            <img src="${project.screenshots[0]}" alt="Related Project" />
            <div class="project-overlay">
              <a href="project-details.html?project=${projectId}">View Details</a>
            </div>
          </div>
          <h4>${project.name}</h4>
        </div>
      `;
      relatedProjectsGrid.innerHTML += cardHtml;
    });
  }
});
