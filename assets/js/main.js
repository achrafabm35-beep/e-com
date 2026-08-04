/* ============================================================
   THE EYES CHICO — UI
   ============================================================ */
(function () {
  "use strict";

  /* ---- loader ---- */
  var loader = document.querySelector(".loader");
  window.addEventListener("load", function () {
    setTimeout(function () { if (loader) loader.classList.add("is-done"); }, 350);
  });
  // safety: never trap the page
  setTimeout(function () { if (loader) loader.classList.add("is-done"); }, 2200);

  /* ---- sticky nav ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-solid", window.scrollY > Math.min(window.innerHeight * 0.7, 500)); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- reveal on view ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add("in"); }); }

  /* ---- the gaze: pupils follow the cursor ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    var pupils = document.querySelectorAll(".eye .pupil");
    if (pupils.length) {
      window.addEventListener("pointermove", function (e) {
        var mx = e.clientX / window.innerWidth - 0.5;
        var my = e.clientY / window.innerHeight - 0.5;
        pupils.forEach(function (p) {
          // amount in SVG user units (small, refined)
          var amt = 5;
          p.setAttribute("transform", "translate(" + (mx * amt).toFixed(2) + "," + (my * amt).toFixed(2) + ")");
        });
      }, { passive: true });
    }
  }

  /* ---- cart drawer ---- */
  var drawer = document.querySelector(".drawer");
  var backdrop = document.querySelector(".drawer-backdrop");
  function openCart() { if (drawer) { drawer.classList.add("open"); backdrop.classList.add("open"); } }
  function closeCart() { if (drawer) { drawer.classList.remove("open"); backdrop.classList.remove("open"); } }
  document.querySelectorAll("[data-open-cart]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openCart(); }); });
  document.querySelectorAll("[data-close-cart]").forEach(function (b) { b.addEventListener("click", closeCart); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });

  /* ---- mobile menu ---- */
  var burger = document.querySelector(".nav__burger");
  var links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.style.display === "flex";
      if (open) { links.style.display = ""; return; }
      links.style.display = "flex";
      links.style.position = "absolute"; links.style.top = "100%"; links.style.left = "0"; links.style.right = "0";
      links.style.flexDirection = "column"; links.style.gap = "1.2rem"; links.style.padding = "1.6rem var(--pad-x)";
      links.style.background = "color-mix(in srgb, var(--ivoire) 97%, transparent)";
      links.style.backdropFilter = "blur(14px)";
      nav.classList.add("is-solid");
    });
  }

  /* ---- newsletter ---- */
  var form = document.querySelector(".cercle form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.parentNode.querySelector(".note");
      if (note) note.textContent = "Bien reçu. Votre regard fait désormais partie du Cercle.";
      form.reset();
    });
  }

  /* ---- year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
