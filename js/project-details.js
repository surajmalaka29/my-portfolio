/**
 * Project Details JavaScript
 * Handles the screenshot slider and other interactions on the project details page
 */

document.addEventListener("DOMContentLoaded", function () {
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

    // Update Project Link (GitHub or Figma based on category)
    const projectLinkContainer = document.getElementById(
      "project-link-container"
    );
    const projectLinkLabel = document.getElementById("project-link-label");
    const projectLink = document.getElementById("project-link");
    const projectLinkIcon = document.getElementById("project-link-icon");
    const projectLinkText = document.getElementById("project-link-text");

    console.log("Project link elements found:", {
      container: projectLinkContainer,
      link: projectLink,
      category: project.category,
    });

    if (projectLink) {
      // Check if this is a UI/UX Design project
      if (project.category === "UI / UX Design" && project.figmaLink) {
        console.log("Setting Figma link to:", project.figmaLink);
        projectLinkLabel.textContent = "Figma";
        projectLink.href = project.figmaLink;
        projectLink.className = "project-btn figma";
        projectLinkIcon.className = "fab fa-figma";
        projectLinkText.textContent = "View on Figma";
        projectLinkContainer.style.display = "flex";

        // Add click event listener
        projectLink.addEventListener("click", function (e) {
          console.log("Figma button clicked, opening:", project.figmaLink);
          setTimeout(() => {
            if (!document.hasFocus()) {
              return;
            }
            window.open(project.figmaLink, "_blank", "noopener,noreferrer");
          }, 100);
        });
      } else if (project.githubLink) {
        console.log("Setting GitHub link to:", project.githubLink);
        projectLinkLabel.textContent = "GitHub";
        projectLink.href = project.githubLink;
        projectLink.className = "project-btn github";
        projectLinkIcon.className = "fab fa-github";
        projectLinkText.textContent = "View on GitHub";
        projectLinkContainer.style.display = "flex";

        // Add click event listener
        projectLink.addEventListener("click", function (e) {
          console.log("GitHub button clicked, opening:", project.githubLink);
          setTimeout(() => {
            if (!document.hasFocus()) {
              return;
            }
            window.open(project.githubLink, "_blank", "noopener,noreferrer");
          }, 100);
        });
      } else {
        console.log("No GitHub or Figma link found for project:", projectId);
        projectLinkContainer.style.display = "none";
      }
    } else {
      console.error("Project link element not found in DOM");
    }

    // Update navigation links
    updateNavigationLinks(projectId, project);

    // Update screenshots if different from default
    updateScreenshots(project.screenshots);

    // Update related projects
    updateRelatedProjects(projectId);
  }

  // Function to update navigation links
  function updateNavigationLinks(currentProjectId, currentProject) {
    const prevProjectBtn = document.querySelector(".prev-project");
    const nextProjectBtn = document.querySelector(".next-project");

    // Get all project IDs in order
    const projectOrder = [
      "flexin",
      "crasauto",
      "hms",
      "codemize",
      "flexinUI",
      "crasautoUI",
      "hmsUI",
      "lsnursery",
    ];

    const currentIndex = projectOrder.indexOf(currentProjectId);

    if (currentIndex !== -1) {
      // Calculate previous and next indices with wraparound
      const prevIndex =
        currentIndex === 0 ? projectOrder.length - 1 : currentIndex - 1;
      const nextIndex =
        currentIndex === projectOrder.length - 1 ? 0 : currentIndex + 1;

      const prevProjectId = projectOrder[prevIndex];
      const nextProjectId = projectOrder[nextIndex];

      // Update navigation links
      if (prevProjectBtn) {
        prevProjectBtn.href = `project-details.html?project=${prevProjectId}`;
        console.log("Updated prev project link to:", prevProjectId);

        // Add click event listener to ensure navigation works
        prevProjectBtn.onclick = function (e) {
          e.preventDefault();
          window.location.href = `project-details.html?project=${prevProjectId}`;
        };
      }

      if (nextProjectBtn) {
        nextProjectBtn.href = `project-details.html?project=${nextProjectId}`;
        console.log("Updated next project link to:", nextProjectId);

        // Add click event listener to ensure navigation works
        nextProjectBtn.onclick = function (e) {
          e.preventDefault();
          window.location.href = `project-details.html?project=${nextProjectId}`;
        };
      }
    } else {
      // Fallback: if project not found in order, use the data from project itself
      if (currentProject.prevProject && prevProjectBtn) {
        prevProjectBtn.href = `project-details.html?project=${currentProject.prevProject}`;
        prevProjectBtn.onclick = function (e) {
          e.preventDefault();
          window.location.href = `project-details.html?project=${currentProject.prevProject}`;
        };
      }

      if (currentProject.nextProject && nextProjectBtn) {
        nextProjectBtn.href = `project-details.html?project=${currentProject.nextProject}`;
        nextProjectBtn.onclick = function (e) {
          e.preventDefault();
          window.location.href = `project-details.html?project=${currentProject.nextProject}`;
        };
      }
    }
  }

  // Function to update screenshots
  function updateScreenshots(screenshots) {
    if (screenshots && screenshots.length > 0) {
      const screenshotsContainer = document.querySelector(
        ".screenshots-container"
      );
      const indicatorsContainer = document.querySelector(
        ".screenshot-indicators"
      );

      // Clear existing screenshots and indicators
      screenshotsContainer.innerHTML = "";
      indicatorsContainer.innerHTML = "";

      // Create new screenshot elements for all images
      screenshots.forEach((imageSrc, index) => {
        // Create screenshot element
        const screenshotDiv = document.createElement("div");
        screenshotDiv.className = `screenshot ${index === 0 ? "active" : ""}`;
        screenshotDiv.id = `screenshot-${index + 1}`;

        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = `Project Screenshot ${index + 1}`;

        screenshotDiv.appendChild(img);
        screenshotsContainer.appendChild(screenshotDiv);

        // Create indicator element
        const indicator = document.createElement("span");
        indicator.className = `indicator ${index === 0 ? "active" : ""}`;
        indicator.setAttribute("data-index", index);
        indicatorsContainer.appendChild(indicator);
      });

      // Re-initialize slider functionality with new elements
      initializeSlider();

      // Initialize scroll animations for new elements
      if (typeof window.handleScrollAnimation === "function") {
        setTimeout(() => {
          window.handleScrollAnimation();
        }, 100);
      }
    }
  }

  // Function to initialize slider functionality
  function initializeSlider() {
    const screenshots = document.querySelectorAll(".screenshot");
    const indicators = document.querySelectorAll(".indicator");
    const prevBtn = document.getElementById("prev-screenshot");
    const nextBtn = document.getElementById("next-screenshot");
    let currentIndex = 0;

    // Function to show a specific screenshot
    function showScreenshot(index) {
      // Remove active class from all screenshots and indicators
      screenshots.forEach((screenshot) =>
        screenshot.classList.remove("active")
      );
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
        <div class="related-project-card scroll-animation">
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

    // Initialize scroll animations for new related project cards
    if (typeof window.handleScrollAnimation === "function") {
      setTimeout(() => {
        window.handleScrollAnimation();
      }, 100);
    }
  }
});
