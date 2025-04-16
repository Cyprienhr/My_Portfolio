// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation functionality
  initNavigation();

  // Initialize progress bars for skills
  initSkillProgressBars();

  // Initialize smooth scrolling for navigation links
  initSmoothScrolling();

  // Initialize form handling
  initContactForm();

  // Initialize scroll to top button
  initScrollToTop();

  // Add resize handler for responsive adjustments
  handleResponsiveAdjustments();

  // Initialize EmailJS
  initEmailJS();

  // Initialize section animations
  initSectionAnimations();

  // Initialize footer back to top button
  initBackToTop();

  // Add typing effect to hero section
  addTypingEffect();
});

// Initialize EmailJS
function initEmailJS() {
  // Initialize EmailJS with your public key
  emailjs.init("EO0SwMYtvl6uz3Xz2");
}

// Mobile navigation toggle
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("#navbar ul");
  const navLinks = document.querySelectorAll("#navbar ul li a");
  const body = document.querySelector("body");

  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Prevent body scrolling when menu is open
      if (navMenu.classList.contains("active")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }

      // Hamburger animation
      const bars = document.querySelectorAll(".bar");
      if (hamburger.classList.contains("active")) {
        bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";

      // Reset hamburger animation
      const bars = document.querySelectorAll(".bar");
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";

      // Update active link
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";

      // Reset hamburger animation
      const bars = document.querySelectorAll(".bar");
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }
  });

  // Active link on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Initialize skill progress bars with animation
function initSkillProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  // Function to animate progress bars when they come into view
  const animateProgressBars = () => {
    progressBars.forEach((bar) => {
      const percent = bar.getAttribute("data-percent");
      const parentPosition = bar.parentElement.getBoundingClientRect();

      if (parentPosition.top < window.innerHeight) {
        bar.style.width = `${percent}%`;
      }
    });
  };

  // Initial animation check
  animateProgressBars();

  // Animate on scroll
  window.addEventListener("scroll", animateProgressBars);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = window.innerWidth <= 768 ? 70 : 80; // Smaller offset for mobile
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Contact form handling
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (!name || !email || !subject || !message) {
        showFormStatus("Please fill in all fields", "error");
        return;
      }

      // Email validation
      if (!validateEmail(email)) {
        showFormStatus("Please enter a valid email address", "error");
        return;
      }

      // Show sending status
      showFormStatus("Sending your message...", "sending");

      // Prepare template parameters
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: "Cyprien",
      };

      // Send the email using EmailJS
      emailjs.send("service_om5olwc", "template_jeyi0sv", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          showFormStatus(
            "Thank you! Your message has been sent successfully.",
            "success"
          );
          contactForm.reset();
        },
        function (error) {
          console.log("FAILED...", error);
          showFormStatus(
            "Oops! Something went wrong. Please try again later.",
            "error"
          );
        }
      );
    });
  }
}

// Show form status message
function showFormStatus(message, type) {
  const formStatus = document.getElementById("form-status");

  if (formStatus) {
    formStatus.textContent = message;

    // Remove all classes
    formStatus.classList.remove("success", "error", "sending");

    // Add appropriate class
    if (type) {
      formStatus.classList.add(type);
    }

    // Scroll to form status
    formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // If success, hide message after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    }
  }
}

// Validate email format
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Add scroll to top button
function initScrollToTop() {
  // Create the button element
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.style.position = "fixed";
  scrollTopBtn.style.bottom = "20px";
  scrollTopBtn.style.right = "20px";
  scrollTopBtn.style.zIndex = "99";
  scrollTopBtn.style.display = "none";
  scrollTopBtn.style.width = "40px";
  scrollTopBtn.style.height = "40px";
  scrollTopBtn.style.borderRadius = "50%";
  scrollTopBtn.style.backgroundColor = "var(--primary-color)";
  scrollTopBtn.style.color = "white";
  scrollTopBtn.style.border = "none";
  scrollTopBtn.style.cursor = "pointer";
  scrollTopBtn.style.boxShadow = "var(--box-shadow)";
  scrollTopBtn.style.transition = "var(--transition)";

  // Add to the document
  document.body.appendChild(scrollTopBtn);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = "block";
      scrollTopBtn.style.opacity = "1";
    } else {
      scrollTopBtn.style.opacity = "0";
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          scrollTopBtn.style.display = "none";
        }
      }, 300);
    }
  });

  // Scroll to top when clicked
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Handle responsive adjustments
function handleResponsiveAdjustments() {
  // Adjust timeline for very small screens
  function adjustTimeline() {
    const timeline = document.querySelector(".timeline");
    if (timeline) {
      if (window.innerWidth <= 575) {
        timeline.querySelectorAll(".timeline-content").forEach((content) => {
          content.style.width = "calc(100% - 40px)";
        });
      } else if (window.innerWidth <= 991) {
        timeline.querySelectorAll(".timeline-content").forEach((content) => {
          content.style.width = "calc(100% - 60px)";
        });
      } else {
        timeline.querySelectorAll(".timeline-content").forEach((content) => {
          content.style.width = "calc(50% - 40px)";
        });
      }
    }
  }

  // Handle image loading and sizing
  function handleImages() {
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("load", function () {
        // Add fade-in effect for images
        this.style.opacity = "1";
      });

      img.addEventListener("error", function () {
        // Replace broken images with a placeholder
        this.src = "https://via.placeholder.com/300";
      });
    });
  }

  // Initial adjustments
  adjustTimeline();
  handleImages();

  // Adjust on resize
  window.addEventListener("resize", function () {
    adjustTimeline();
  });
}

// Typing effect for hero section (optional feature)
function typeEffect() {
  const text = "Web Developer & Designer";
  const typingElement = document.querySelector(".typing");
  let i = 0;

  if (typingElement) {
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
  }
}

// Initialize animations for sections
function initSectionAnimations() {
  // Animate elements when they come into view
  const animateSections = () => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionTitle = section.querySelector(".section-title");

      if (sectionTop < window.innerHeight * 0.8) {
        section.classList.add("animate");

        // Add special animation to section title
        if (sectionTitle) {
          sectionTitle.style.opacity = "1";
          sectionTitle.style.transform = "translateY(0)";
        }

        // Animate project cards
        if (section.id === "projects") {
          const projectCards = section.querySelectorAll(".project-card");
          projectCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 200 * index);
          });
        }

        // Animate skill items with delay
        if (section.id === "skills") {
          const skillItems = section.querySelectorAll(".skill-item");
          skillItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, 100 * index);
          });
        }

        // Animate certificates with delay
        if (section.id === "skills") {
          const certificateItems =
            section.querySelectorAll(".certificate-item");
          certificateItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, 100 * index);
          });
        }
      }
    });
  };

  // Initial check
  animateSections();

  // Check on scroll
  window.addEventListener("scroll", animateSections);

  // Add hover effects to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Initialize footer back to top functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Add ripple effect on click
    backToTopBtn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      this.appendChild(ripple);

      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });
}

// Add animated typing effect to hero section
function addTypingEffect() {
  const heroTitle = document.querySelector(".hero-content h2");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
  }
}

// Helper function to add parallax effect to sections
function addParallaxEffect() {
  window.addEventListener("scroll", function () {
    const scrollY = window.pageYOffset;

    // Parallax for hero section
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.style.backgroundPositionY = `${scrollY * 0.5}px`;
    }

    // Parallax for section titles
    document.querySelectorAll(".section-title").forEach((title) => {
      const speed = 0.2;
      const yPos = -(scrollY * speed);
      title.style.transform = `translateY(${yPos}px)`;
    });
  });
}
