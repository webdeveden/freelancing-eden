// Carousel
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
let current = 0;
let autoplay;

function goTo(index) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = (index + slides.length) % slides.length;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

document.getElementById("prevBtn").addEventListener("click", () => {
  goTo(current - 1);
  resetAutoplay();
});
document.getElementById("nextBtn").addEventListener("click", () => {
  goTo(current + 1);
  resetAutoplay();
});
dots.forEach((dot) =>
  dot.addEventListener("click", () => {
    goTo(+dot.dataset.index);
    resetAutoplay();
  }),
);

function startAutoplay() {
  autoplay = setInterval(() => goTo(current + 1), 4000);
}
function resetAutoplay() {
  clearInterval(autoplay);
  startAutoplay();
}
startAutoplay();

// securing the email address from bots
const user = "example";
const domain = "google.com";
const email = `${user}@${domain}`;

document.getElementById("email").innerHTML =
  `<a href="mailto:${email}">${email}</a>`;

// Call modal
const callModalBackdrop = document.getElementById("callModalBackdrop");
const callModalClose = document.getElementById("callModalClose");

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      if (link.classList.contains("contact-trigger")) {
        e.preventDefault();
        callModalBackdrop.classList.add("open");
      }
    });
  });
}

// Desktop contact triggers (skip mobile menu — handled above)
document.querySelectorAll(".contact-trigger").forEach((btn) => {
  if (btn.closest("#mobileMenu")) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    callModalBackdrop.classList.add("open");
  });
});

callModalClose.addEventListener("click", () => {
  callModalBackdrop.classList.remove("open");
});

callModalBackdrop.addEventListener("click", (e) => {
  if (e.target === callModalBackdrop) {
    callModalBackdrop.classList.remove("open");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") callModalBackdrop.classList.remove("open");
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((el) => {
    if (el.isIntersecting) {
      el.target.classList.add("visible");
    }
  });
});

// Observe elements with animations
document
  .querySelectorAll(".feature-card, .community-image, .community-content")
  .forEach((el) => {
    observer.observe(el);
  });
