(function () {
  window.PolkadotItalia = window.PolkadotItalia || {};

  function startSubtitleRotation(opts) {
    var intervalMs = (opts && opts.intervalMs) || 4000;
    var items = document.querySelectorAll(".subtitle-item");
    if (!items || items.length <= 1) return null;

    var current = 0;
    return window.setInterval(function () {
      items[current].classList.remove("active");
      current = (current + 1) % items.length;
      items[current].classList.add("active");
    }, intervalMs);
  }

  function startCountersOnce() {
    var counters = document.querySelectorAll(".count");
    if (!counters || counters.length === 0) return;

    counters.forEach(function (counter) {
      if (counter.innerText !== "0") return;
      var target = Number(counter.getAttribute("data-target") || "0");
      var count = 0;

      function update() {
        if (count < target) {
          count += target / 50;
          counter.innerText = String(Math.ceil(count));
          window.setTimeout(update, 30);
        } else {
          counter.innerText = String(target);
        }
      }

      update();
    });
  }

  window.PolkadotItalia.startSubtitleRotation = startSubtitleRotation;
  window.PolkadotItalia.startCountersOnce = startCountersOnce;
})();

