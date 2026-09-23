/*
 * Custom "Add to Home Screen" prompt for Vouken Technology.
 *
 * Loaded from index.html as a classic (non-module) script. Styling lives in
 * src/styles/main.css under the .pwa-prompt* rules so the prompt follows the
 * same design tokens as the rest of the site.
 *
 * Behaviour:
 * - Chromium browsers: the browser only fires `beforeinstallprompt` when the
 *   app is genuinely installable, so the banner is shown on that signal and the
 *   Install button replays the deferred native prompt.
 * - iOS Safari: the native prompt cannot be triggered from script, so the
 *   banner explains the Share > Add to Home Screen route instead.
 * - The banner never appears when the app already runs standalone, when the
 *   visitor dismissed it earlier, or on browsers that cannot install the app.
 */
(function () {
  var DISMISS_KEY = "vouken-install-prompt-dismissed";
  var PROMPT_DELAY_MS = 2000;

  var deferredEvent = null;
  var currentBanner = null;

  function isStandalone() {
    var displayMode = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    return Boolean(displayMode) || window.navigator.standalone === true;
  }

  function isIosDevice() {
    var userAgent = window.navigator.userAgent;
    var touchMac = userAgent.indexOf("Macintosh") > -1 && "ontouchend" in document;
    return /iPad|iPhone|iPod/.test(userAgent) || touchMac;
  }

  function canInstallOnIos() {
    // iOS Chrome, Firefox and Edge are WebKit shells that cannot install the app.
    return isIosDevice() && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(window.navigator.userAgent);
  }

  function wasDismissed() {
    try {
      return window.localStorage.getItem(DISMISS_KEY) === "true";
    } catch (error) {
      return false;
    }
  }

  function rememberDismissal() {
    try {
      window.localStorage.setItem(DISMISS_KEY, "true");
    } catch (error) {
      /* Storage can be blocked; the prompt simply appears again next visit. */
    }
  }

  function removeBanner() {
    if (currentBanner && currentBanner.parentNode) {
      currentBanner.parentNode.removeChild(currentBanner);
    }
    currentBanner = null;
  }

  function showBanner(options) {
    if (currentBanner || !document.body) return;

    var banner = document.createElement("div");
    banner.className = "pwa-prompt";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Install the Vouken Technology app");

    var copy = document.createElement("div");
    copy.className = "pwa-prompt-copy";

    var title = document.createElement("p");
    title.className = "pwa-prompt-title";
    title.textContent = "Install Vouken Technology";

    var detail = document.createElement("p");
    detail.className = "pwa-prompt-detail";
    detail.textContent = options.detail;

    copy.appendChild(title);
    copy.appendChild(detail);

    var actions = document.createElement("div");
    actions.className = "pwa-prompt-actions";

    var confirm = document.createElement("button");
    confirm.type = "button";
    confirm.className = "pwa-prompt-button";
    confirm.textContent = options.confirmLabel;
    confirm.addEventListener("click", function () {
      if (options.onConfirm) {
        options.onConfirm();
        return;
      }
      rememberDismissal();
      removeBanner();
    });
    actions.appendChild(confirm);

    if (options.onConfirm) {
      var dismiss = document.createElement("button");
      dismiss.type = "button";
      dismiss.className = "pwa-prompt-dismiss";
      dismiss.textContent = "Not now";
      dismiss.addEventListener("click", function () {
        rememberDismissal();
        removeBanner();
      });
      actions.appendChild(dismiss);
    }

    banner.appendChild(copy);
    banner.appendChild(actions);
    document.body.appendChild(banner);
    currentBanner = banner;
  }

  function showInstallBanner() {
    showBanner({
      detail: "Install Vouken Technology for faster access and offline reading.",
      confirmLabel: "Install",
      onConfirm: function () {
        if (!deferredEvent) return;
        var event = deferredEvent;
        deferredEvent = null;
        event.prompt();
        if (event.userChoice && typeof event.userChoice.then === "function") {
          event.userChoice
            .then(function (choice) {
              if (choice && choice.outcome === "accepted") rememberDismissal();
            })
            .catch(function () {
              /* The native prompt was dismissed; the site stays fully usable. */
            });
        }
        removeBanner();
      },
    });
  }

  function showIosGuidance() {
    showBanner({
      detail: 'Tap the Share button, then choose "Add to Home Screen" to install Vouken Technology.',
      confirmLabel: "Got it",
    });
  }

  function init() {
    if (!document.body || isStandalone() || wasDismissed()) return;

    window.addEventListener("beforeinstallprompt", function (event) {
      event.preventDefault();
      deferredEvent = event;
      window.setTimeout(showInstallBanner, PROMPT_DELAY_MS);
    });

    window.addEventListener("appinstalled", function () {
      rememberDismissal();
      removeBanner();
    });

    if (canInstallOnIos()) {
      window.setTimeout(showIosGuidance, PROMPT_DELAY_MS);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
