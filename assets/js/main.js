/* ============================================================
   HOUSE OF AS — global UI
   ============================================================ */
(function () {
  "use strict";

  /* ---- sticky nav state ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var solidAt = function () {
      var hero = document.querySelector(".hero");
      // become solid once we've scrolled roughly past first viewport
      return hero ? Math.min(window.innerHeight * 0.85, hero.offsetHeight) : 40;
    };
    var onScroll = function () {
      nav.classList.toggle("is-solid", window.scrollY > solidAt());
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- reveal on view ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- cart drawer ---- */
  var drawer = document.querySelector(".drawer");
  var backdrop = document.querySelector(".drawer-backdrop");
  var openers = document.querySelectorAll("[data-open-cart]");
  var closers = document.querySelectorAll("[data-close-cart]");
  function openCart() { if (drawer) { drawer.classList.add("open"); backdrop.classList.add("open"); } }
  function closeCart() { if (drawer) { drawer.classList.remove("open"); backdrop.classList.remove("open"); } }
  openers.forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openCart(); }); });
  closers.forEach(function (b) { b.addEventListener("click", closeCart); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });

  /* ---- mobile menu ---- */
  var burger = document.querySelector(".nav__burger");
  var links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.style.display === "flex";
      links.style.display = open ? "" : "flex";
      links.style.position = "absolute";
      links.style.top = "100%"; links.style.left = "0"; links.style.right = "0";
      links.style.flexDirection = "column";
      links.style.gap = "1.2rem";
      links.style.padding = "1.6rem var(--pad-x)";
      links.style.background = "color-mix(in oklch, var(--stone-100) 96%, transparent)";
      links.style.backdropFilter = "blur(14px)";
    });
  }

  /* ---- newsletter (no backend; gentle confirm) ---- */
  var form = document.querySelector(".cercle form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.parentNode.querySelector(".note");
      if (note) note.textContent = "Merci. Vous faites désormais partie du Cercle.";
      form.reset();
    });
  }

  /* ---- year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
