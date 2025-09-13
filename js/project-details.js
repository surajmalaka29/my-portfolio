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

  // Function to load project data - in a real implementation, this would fetch from a data source
  function loadProjectData(projectId) {
    // This is a simplified example - in a real application, you would fetch this data from a server or JSON file
    const projectData = {
      flexin: {
        name: "Flex'In",
        heading: "FLEX'IN",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus dis posuere amet tincidunt commodo, velit. Ipsum, hac nibh fermentum nisi, platea condimentum cursus velit dui. Massa volutpat odio facilisis purus sit elementum. Non, sed velit dictum quam. Id risus pharetra est, at rhoncus, nec ullamcorper tincidunt.",
        client: "Campus Project",
        role: "UI / UX Design\nFrontend Development",
        technologies: "HTML5, SCSS\nTailwind CSS\nFigma",
        type: "Web Development",
        duration: "5 Months",
        screenshots: [
          "images/flex'in.jpeg",
          "images/MacBook Air - 3.png",
          "images/MacBook Air - 4.png",
        ],
        prevProject: "project5",
        nextProject: "project2",
      },
      project2: {
        name: "Mobile App",
        heading: "MOBILE APP",
        description:
          "A comprehensive mobile application built for both iOS and Android platforms using React Native. This project focused on creating a seamless user experience with robust backend integration.",
        client: "Startup Client",
        role: "Full-Stack Developer\nUI Designer",
        technologies: "React Native\nFirebase\nNode.js",
        type: "Mobile App Development",
        duration: "4 Months",
        screenshots: [
          "images/MacBook Air - 4.png",
          "images/flex'in.jpeg",
          "images/MacBook Air - 3.png",
        ],
        prevProject: "flexin",
        nextProject: "project3",
      },
      // Add more projects as needed
    };

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

    // Update screenshots (if needed)
    // This would require more complex DOM manipulation to update the screenshot sources
  }
});
