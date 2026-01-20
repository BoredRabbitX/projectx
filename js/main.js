(function () {
  window.PolkadotItalia = window.PolkadotItalia || {};

  function init() {
    // Core UI
    if (window.PolkadotItalia.initNavbar) window.PolkadotItalia.initNavbar();

    // Visual background (requires three.js) - init before theme so uniforms
    // can be updated correctly if a saved light-mode exists.
    if (window.PolkadotItalia.initNoiseCanvas)
      window.PolkadotItalia.initNoiseCanvas();

    // Theme toggle (reads/scrive da localStorage e aggiorna anche il noise)
    if (window.PolkadotItalia.initThemeToggle)
      window.PolkadotItalia.initThemeToggle();

    // Fade-ins
    if (window.PolkadotItalia.observeFadeSections) {
      window.PolkadotItalia.observeFadeSections({ threshold: 0.1 });
    }

    // Home subtitle rotator
    if (window.PolkadotItalia.startSubtitleRotation) {
      window.PolkadotItalia.startSubtitleRotation({ intervalMs: 4000 });
    }

    // Footer modal (home only)
    if (window.PolkadotItalia.initFooterModal)
      window.PolkadotItalia.initFooterModal();

    // Tecnologia counters: start when stats section becomes visible
    var statsContainer = document.querySelector(".stats-container");
    if (statsContainer && "IntersectionObserver" in window) {
      var once = false;
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!once && entry.isIntersecting) {
              once = true;
              if (window.PolkadotItalia.startCountersOnce)
                window.PolkadotItalia.startCountersOnce();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      obs.observe(statsContainer);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

