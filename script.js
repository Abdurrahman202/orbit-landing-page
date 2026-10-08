"use strict";

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const desktopPointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
);

/* ---------- MOBILE NAVIGATION ---------- */

const nav = document.querySelector(".nav");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
const mobileScreen = window.matchMedia("(max-width: 700px)");

if (nav && menuButton && navLinks) {
  nav.classList.add("menu-enabled");

  function setMenu(open, returnFocus = false) {
    nav.classList.toggle("menu-open", open);

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );

    if (returnFocus) {
      menuButton.focus();
    }
  }

  function updateNavigation() {
    menuButton.hidden = !mobileScreen.matches;
    setMenu(false);
  }

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    setMenu(!isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!mobileScreen.matches) return;

      // Move focus to the section before hiding its navigation link.
      const target = document.querySelector(link.hash);

      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });

        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true }
        );
      }

      setMenu(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      nav.classList.contains("menu-open")
    ) {
      setMenu(false, true);
    }
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) {
      setMenu(false);
    }
  });

  nav.addEventListener("focusout", (event) => {
    if (!nav.contains(event.relatedTarget)) {
      setMenu(false);
    }
  });

  mobileScreen.addEventListener("change", updateNavigation);

  updateNavigation();
}

/* ---------- SCROLL ENTRANCE ANIMATIONS ---------- */

const revealElements = document.querySelectorAll(".reveal");
let revealObserver;

function configureReveals() {
  revealObserver?.disconnect();

  revealElements.forEach((element) => {
    element.classList.remove("reveal-ready", "is-visible");
  });

  if (
    reducedMotion.matches ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -24px 0px",
    }
  );

  revealElements.forEach((element) => {
    const bounds = element.getBoundingClientRect();

    // Keep content already on screen visible immediately.
    if (bounds.top < window.innerHeight) return;

    element.classList.add("reveal-ready");
    revealObserver.observe(element);
  });
}

configureReveals();

/* ---------- MOUSE-CONTROLLED 3D PRODUCT ---------- */

const productStage = document.querySelector(".product-stage");
const productTilt = document.querySelector(".product-tilt");

let tiltFrame = null;
let pointerX = 0;
let pointerY = 0;

function resetProductTilt() {
  if (tiltFrame !== null) {
    cancelAnimationFrame(tiltFrame);
    tiltFrame = null;
  }

  if (productTilt) {
    // Restore the default angle from the stylesheet.
    productTilt.style.removeProperty("transform");
  }
}

if (productStage && productTilt) {
  productStage.addEventListener("pointermove", (event) => {
    if (
      reducedMotion.matches ||
      !desktopPointer.matches ||
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const bounds = productStage.getBoundingClientRect();

    pointerX = Math.max(
      -1,
      Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1)
    );

    pointerY = Math.max(
      -1,
      Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1)
    );

    if (tiltFrame !== null) return;

    tiltFrame = requestAnimationFrame(() => {
      const rotateX = -8 - pointerY * 9;
      const rotateY = -18 + pointerX * 18;

      productTilt.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      tiltFrame = null;
    });
  });

  productStage.addEventListener("pointerleave", resetProductTilt);
  productStage.addEventListener("pointercancel", resetProductTilt);

  window.addEventListener("blur", resetProductTilt);
}

desktopPointer.addEventListener("change", resetProductTilt);

reducedMotion.addEventListener("change", () => {
  resetProductTilt();
  configureReveals();
});

/* ---------- PRODUCT COLOUR SELECTION ---------- */

const colorButtons = document.querySelectorAll(".color-swatch");
const colorName = document.querySelector("#color-name");

const finishes = {
  sage: "Sage",
  sand: "Sand",
  graphite: "Graphite",
};

function applyFinish(finish, savePreference = true) {
  if (!Object.hasOwn(finishes, finish)) return;

  document.body.dataset.color = finish;

  colorButtons.forEach((button) => {
    const selected = button.dataset.color === finish;

    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  if (colorName) {
    colorName.textContent = finishes[finish];
  }

  if (productStage) {
    productStage.setAttribute(
      "aria-label",
      `ORBIT concept device in ${finishes[finish]}, ` +
        "with a circular focus timer and a softly glowing base"
    );
  }

  if (savePreference) {
    try {
      localStorage.setItem("orbit-finish", finish);
    } catch {
      // Colour selection still works when storage is unavailable.
    }
  }
}

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyFinish(button.dataset.color);
  });
});

let initialFinish = "sage";

try {
  const savedFinish = localStorage.getItem("orbit-finish");

  if (savedFinish && Object.hasOwn(finishes, savedFinish)) {
    initialFinish = savedFinish;
  }
} catch {
  // Use the default finish when storage is unavailable.
}

applyFinish(initialFinish, false);