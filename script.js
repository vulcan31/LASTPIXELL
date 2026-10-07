const filterButtons = [...document.querySelectorAll("[data-filter]")];
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const photoTriggers = [...document.querySelectorAll("[data-lightbox]")];
const photographs = photoTriggers.map((trigger) => {
  const frame = trigger.closest("[data-photo]");
  const image = trigger.querySelector("img");
  return {
    src: image?.currentSrc || image?.src || "",
    alt: image?.alt || frame?.dataset.title || "Photograph",
    title: frame?.dataset.title || "Untitled frame",
    location: frame?.dataset.location || "Location not listed",
    camera: frame?.dataset.camera || "Not recorded",
    lens: frame?.dataset.lens || "",
    focalLength: frame?.dataset.focalLength || "",
    aperture: frame?.dataset.aperture || "",
    shutterSpeed: frame?.dataset.shutterSpeed || "",
    iso: frame?.dataset.iso || "",
    description: frame?.dataset.description || "A photograph from the field archive.",
    credit: frame?.dataset.credit || "",
  };
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxReflection = document.querySelector(".lightbox-reflection img");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxDescription = document.querySelector(".lightbox-description");
const lightboxLocation = document.querySelector(".lightbox-location");
const lightboxCamera = document.querySelector(".lightbox-camera");
const lightboxLens = document.querySelector(".lightbox-lens");
const lightboxFocalLength = document.querySelector(".lightbox-focal-length");
const lightboxAperture = document.querySelector(".lightbox-aperture");
const lightboxShutterSpeed = document.querySelector(".lightbox-shutter-speed");
const lightboxIso = document.querySelector(".lightbox-iso");
const lightboxCaptureStatus = document.querySelector(".lightbox-capture-status");
const lightboxCredit = document.querySelector(".lightbox-credit");
const lightboxCounter = document.querySelector(".lightbox-counter");
const closeButton = document.querySelector(".lightbox-close");
let currentPhoto = 0;
let previousFocus;

photoTriggers.forEach((trigger, index) => {
  const number = trigger.querySelector("[data-photo-number]");
  if (number) number.textContent = String(index + 1).padStart(2, "0");

  const frame = trigger.closest("[data-photo]");
  const location = frame?.dataset.location || "Location not listed";
  const locationValue = trigger.querySelector("[data-location-value]") || trigger.querySelector(".image-location b");
  if (locationValue) locationValue.textContent = location.toUpperCase();
});

const archiveCount = document.querySelector("[data-archive-count]");
if (archiveCount) archiveCount.textContent = String(photoTriggers.length).padStart(2, "0");

filterButtons.forEach((button) => {
  const filter = button.dataset.filter;
  const count = filter === "all"
    ? galleryItems.length
    : galleryItems.filter((item) => item.dataset.category === filter).length;
  const countElement = button.querySelector("[data-filter-count]");
  if (countElement) countElement.textContent = String(count).padStart(2, "0");

  button.addEventListener("click", () => {
    filterButtons.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("is-active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    galleryItems.forEach((item) => {
      item.classList.toggle("is-hidden", filter !== "all" && item.dataset.category !== filter);
    });
  });
});

function showPhoto(index) {
  currentPhoto = (index + photographs.length) % photographs.length;
  const photo = photographs[currentPhoto];
  lightboxImage.src = photo.src;
  lightboxReflection.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxTitle.textContent = photo.title;
  lightboxDescription.textContent = photo.description;
  lightboxLocation.textContent = photo.location;
  lightboxCamera.textContent = photo.camera;
  lightboxLens.textContent = photo.lens || "—";
  lightboxFocalLength.textContent = photo.focalLength || "—";
  lightboxAperture.textContent = photo.aperture || "—";
  lightboxShutterSpeed.textContent = photo.shutterSpeed || "—";
  lightboxIso.textContent = photo.iso || "—";
  lightboxCredit.textContent = photo.credit ? `IMAGE CREDIT / ${photo.credit}` : "";
  const hasExposureData = [photo.lens, photo.focalLength, photo.aperture, photo.shutterSpeed, photo.iso].some(Boolean);
  lightboxCaptureStatus.textContent = hasExposureData ? "EXPOSURE NOTES" : "EXIF NOT RECORDED";
  lightboxCounter.textContent = `${String(currentPhoto + 1).padStart(2, "0")} / ${String(photographs.length).padStart(2, "0")}`;
}

photoTriggers.forEach((button, index) => {
  button.addEventListener("click", () => {
    previousFocus = button;
    showPhoto(index);
    lightbox.showModal();
    closeButton.focus();
  });
});

closeButton.addEventListener("click", () => lightbox.close());
document.querySelector(".lightbox-prev").addEventListener("click", () => showPhoto(currentPhoto - 1));
document.querySelector(".lightbox-next").addEventListener("click", () => showPhoto(currentPhoto + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => previousFocus?.focus());
document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowRight") {
    event.preventDefault();
    showPhoto(currentPhoto + 1);
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showPhoto(currentPhoto - 1);
  }
});

const revealTargets = document.querySelectorAll(".featured-plate, .archive-heading, .gallery-item, .art-copy, .artwork-plate, .quote-frame, .approach-note, .contact-grid");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => {
    target.classList.add("reveal-ready");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-revealed"));
}

let progressFrame = 0;
function updateScrollProgress() {
  if (progressFrame) return;
  progressFrame = window.requestAnimationFrame(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    document.documentElement.style.setProperty("--scroll-progress", String(Math.min(1, Math.max(0, progress))));
    progressFrame = 0;
  });
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress, { passive: true });
updateScrollProgress();
document.querySelector("#year").textContent = new Date().getFullYear();
