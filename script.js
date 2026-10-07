const photoCatalog = window.PORTFOLIO_PHOTOS || { featured: {}, gallery: [] };

const themeToggle = document.querySelector("[data-theme-toggle]");
const themeToggleLabel = document.querySelector("[data-theme-label]");
const themeToggleIcon = document.querySelector("[data-theme-icon]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, persist = false) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  if (themeToggleLabel) themeToggleLabel.textContent = isDark ? "Light" : "Dark";
  if (themeToggleIcon) themeToggleIcon.textContent = isDark ? "☼" : "◐";
  themeColorMeta?.setAttribute("content", isDark ? "#171a18" : "#f2ede3");

  if (persist) {
    try { localStorage.setItem("lastpixell-theme", isDark ? "dark" : "light"); } catch (_) {}
  }
}

applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
themeToggle?.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
});

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) element.textContent = value;
}

function setPhotoMetadata(figure, photo) {
  figure.dataset.photo = "";
  figure.dataset.title = photo.title || "Untitled frame";
  figure.dataset.location = photo.location || "Location not listed";
  figure.dataset.camera = photo.camera || "Not recorded";
  figure.dataset.lens = photo.lens || "";
  figure.dataset.focalLength = photo.focalLength || "";
  figure.dataset.aperture = photo.aperture || "";
  figure.dataset.shutterSpeed = photo.shutterSpeed || "";
  figure.dataset.iso = photo.iso || "";
  figure.dataset.description = photo.description || "A photograph from the field archive.";
  figure.dataset.credit = photo.credit || "";
}

function fillFeaturedPhoto(photo) {
  const figure = document.querySelector("[data-featured-photo]");
  if (!figure || !photo) return;
  setPhotoMetadata(figure, photo);

  const image = figure.querySelector("[data-featured-image]");
  const trigger = figure.querySelector("[data-featured-trigger]");
  if (image && photo.image) image.src = photo.image;
  if (image && photo.alt) image.alt = photo.alt;
  if (trigger && photo.title) trigger.setAttribute("aria-label", `Open photograph: ${photo.title}`);

  setText("[data-featured-collection-label]", photo.collectionLabel);
  setText("[data-featured-kicker]", photo.kicker);
  setText("[data-featured-headline]", photo.headline);
  setText("[data-featured-headline-accent]", photo.headlineAccent);
  setText("[data-featured-image-label]", photo.imageLabel);
  setText("[data-featured-location]", (photo.location || "Location not listed").toUpperCase());
  setText("[data-featured-description]", photo.description);
  setText("[data-featured-credit]", photo.credit?.toUpperCase());
  setText("[data-featured-note]", photo.note);
}

function createGalleryItem(photo) {
  const figure = document.createElement("figure");
  figure.className = "gallery-item";
  if (photo.layout === "wide" || photo.layout === "offset") figure.classList.add(`gallery-${photo.layout}`);
  if (photo.category) figure.dataset.category = photo.category;
  setPhotoMetadata(figure, photo);

  const button = document.createElement("button");
  button.className = "photo-trigger image-button";
  button.type = "button";
  button.setAttribute("data-lightbox", "");
  button.setAttribute("aria-label", `Open photograph: ${photo.title || "Untitled frame"}`);

  const image = document.createElement("img");
  image.src = photo.image || "";
  image.alt = photo.alt || photo.title || "Photograph";
  image.loading = "lazy";
  image.decoding = "async";

  const openLabel = document.createElement("span");
  openLabel.className = "image-open";
  openLabel.setAttribute("aria-hidden", "true");
  openLabel.textContent = "OPEN FULL VIEW ↗";

  const locationLabel = document.createElement("span");
  locationLabel.className = "image-location";
  const locationEyebrow = document.createElement("span");
  locationEyebrow.textContent = "PHOTOGRAPHED IN";
  const locationValue = document.createElement("b");
  locationValue.textContent = (photo.location || "Location not listed").toUpperCase();
  locationLabel.append(locationEyebrow, locationValue);
  button.append(image, openLabel, locationLabel);

  const caption = document.createElement("figcaption");
  const captionTitle = document.createElement("span");
  captionTitle.textContent = photo.caption || photo.title || "Untitled frame";
  const captionMeta = document.createElement("span");
  const frameNumber = document.createElement("span");
  frameNumber.dataset.photoNumber = "";
  captionMeta.append(frameNumber, document.createTextNode(` / ${photo.categoryLabel || photo.category || "PHOTOGRAPH"}`.toUpperCase()));
  caption.append(captionTitle, captionMeta);
  figure.append(button, caption);
  return figure;
}

fillFeaturedPhoto(photoCatalog.featured);
const galleryRoot = document.querySelector("#gallery");
if (galleryRoot) {
  galleryRoot.replaceChildren(...(Array.isArray(photoCatalog.gallery) ? photoCatalog.gallery : []).map(createGalleryItem));
}

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
const lightboxLike = document.querySelector(".lightbox-like");
const lightboxLikeLabel = document.querySelector(".lightbox-like-label");
const volatileLikes = new Set();
let currentPhoto = 0;
let previousFocus;

function getLikeKey(photo) {
  try {
    return `lastpixell-liked:${new URL(photo.src, window.location.href).pathname}`;
  } catch (_) {
    return `lastpixell-liked:${photo.src}`;
  }
}

function isPhotoLiked(photo) {
  const key = getLikeKey(photo);
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) return saved === "1";
  } catch (_) {}
  return volatileLikes.has(key);
}

function updateLikeButton(photo) {
  if (!lightboxLike || !photo) return;
  const liked = isPhotoLiked(photo);
  lightboxLike.setAttribute("aria-pressed", String(liked));
  lightboxLike.setAttribute("aria-label", `${liked ? "Unlike" : "Like"} ${photo.title}`);
  lightboxLike.title = `${liked ? "Unlike" : "Like"} this photograph`;
  if (lightboxLikeLabel) lightboxLikeLabel.textContent = liked ? "Liked" : "Like";
}

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
  updateLikeButton(photo);
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
lightboxLike?.addEventListener("click", () => {
  const photo = photographs[currentPhoto];
  if (!photo) return;
  const key = getLikeKey(photo);
  const liked = !isPhotoLiked(photo);
  if (liked) volatileLikes.add(key);
  else volatileLikes.delete(key);
  try {
    if (liked) localStorage.setItem(key, "1");
    else localStorage.removeItem(key);
  } catch (_) {}
  updateLikeButton(photo);
});
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
