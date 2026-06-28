/* ============================================================
   HOUSE OF AS — Scroll-driven dressing hero
   Image sequence scrubbed by scroll, synced editorial messages.
   ============================================================ */
(function () {
  "use strict";

  var TOTAL = 181;
  var BASE = "assets/media/hero-seq/frame_";
  var pad = function (n) { return ("000" + n).slice(-3); };
  var srcOf = function (i) { return BASE + pad(i) + ".jpg"; };

  var canvas = document.querySelector(".hero__canvas");
  var hero = document.querySelector(".hero");
  var loader = document.querySelector(".loader");
  var bar = document.querySelector(".loader__bar");
  var pct = document.querySelector(".loader__pct");
  if (!canvas || !hero) return;

  var ctx = canvas.getContext("2d", { alpha: true });
  var images = new Array(TOTAL + 1);
  var loaded = 0;
  var current = -1;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- preload ---------- */
  function preload(done) {
    // Load first frame immediately so we can paint ASAP.
    for (var i = 1; i <= TOTAL; i++) {
      (function (idx) {
        var img = new Image();
        img.onload = img.onerror = function () {
          loaded++;
          var p = Math.round((loaded / TOTAL) * 100);
          if (bar) bar.style.width = p + "%";
          if (pct) pct.textContent = p + " %";
          if (loaded === TOTAL) done();
        };
        img.src = srcOf(idx);
        images[idx] = img;
      })(i);
    }
  }

  /* ---------- canvas sizing ---------- */
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  function size() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ---------- draw one frame (contain, centered) ---------- */
  function paint(idx) {
    idx = Math.max(1, Math.min(TOTAL, idx));
    var img = images[idx];
    if (!img || !img.naturalWidth) return;
    current = idx;
    var cw = canvas.clientWidth, ch = canvas.clientHeight;
    var iw = img.naturalWidth, ih = img.naturalHeight;
    // contain with a slight upscale bias so the figure reads large
    var scale = Math.min(cw / iw, ch / ih) * 1.06;
    var dw = iw * scale, dh = ih * scale;
    var dx = (cw - dw) / 2, dy = (ch - dh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  /* ---------- messages ---------- */
  var msgs = Array.prototype.slice.call(document.querySelectorAll("[data-range]"));
  var cue = document.querySelector(".hero__cue");
  var finalCta = document.querySelector(".hero__cta-final");

  // smooth fade with ease-in/out inside a [start,end] window
  function windowOpacity(p, start, end) {
    if (p < start || p > end) return 0;
    var span = end - start;
    var t = (p - start) / span;           // 0..1 within window
    var fade = 0.22;                       // portion used to fade each side
    var o;
    if (t < fade) o = t / fade;
    else if (t > 1 - fade) o = (1 - t) / fade;
    else o = 1;
    return Math.max(0, Math.min(1, o));
  }

  function applyMessages(p) {
    for (var i = 0; i < msgs.length; i++) {
      var el = msgs[i];
      var r = el.getAttribute("data-range").split(",");
      var s = parseFloat(r[0]), e = parseFloat(r[1]);
      var o = windowOpacity(p, s, e);
      el.style.opacity = o.toFixed(3);
      // gentle parallax rise as it appears
      var rise = (1 - o) * 18;
      el.style.transform = "translateY(" + rise + "px)";
    }
    if (cue) cue.style.opacity = (p < 0.04 ? 1 : Math.max(0, 1 - p * 12)).toFixed(3);
    if (finalCta) {
      var fo = windowOpacity(p, 0.9, 1.0001);
      // keep CTA fully visible once revealed at the very end
      if (p >= 0.96) fo = 1;
      finalCta.style.opacity = fo.toFixed(3);
      finalCta.classList.toggle("is-live", fo > 0.6);
    }
  }

  /* ---------- render on scroll ---------- */
  function render(progress) {
    var idx = 1 + Math.round(progress * (TOTAL - 1));
    if (idx !== current) paint(idx);
    applyMessages(progress);
  }

  /* ---------- reduced motion: static hero ---------- */
  function staticHero() {
    size();
    var img = new Image();
    img.onload = function () { paint(TOTAL); };
    img.src = srcOf(TOTAL);
    images[TOTAL] = img;
    msgs.forEach(function (el) { el.style.opacity = 1; el.style.transform = "none"; });
    if (cue) cue.style.display = "none";
    if (loader) loader.classList.add("is-done");
  }

  /* ---------- boot ---------- */
  function boot() {
    size();
    paint(1);

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: function (self) { render(self.progress); },
        onRefresh: function (self) { size(); render(self.progress); }
      });
      render(0);
    } else {
      // fallback: native scroll math
      var onScroll = function () {
        var rect = hero.getBoundingClientRect();
        var total = hero.offsetHeight - window.innerHeight;
        var p = Math.max(0, Math.min(1, -rect.top / total));
        render(p);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    window.addEventListener("resize", function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size();
      paint(current > 0 ? current : 1);
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  }

  if (reduce) {
    // Only need the final frame for a static composition.
    var f = new Image();
    var n = 0;
    // still hide loader quickly
    f.onload = function () { staticHero(); };
    f.src = srcOf(TOTAL);
    return;
  }

  preload(function () {
    if (loader) loader.classList.add("is-done");
    boot();
  });
})();
