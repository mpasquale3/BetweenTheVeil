/* ============================================================
   BETWEEN THE VEIL — site navigation
   ------------------------------------------------------------
   Loaded by every page. On phone and tablet the menu is a veil
   that draws across the screen; from 1024px up the same markup
   is already a horizontal bar and this script has nothing to do
   beyond marking the current page.
   ============================================================ */

(function () {
  'use strict';

  var DESKTOP = '(min-width: 1024px)';

  /* 1. THE VEIL MENU ----------------------------------------- */
  function bindMenu() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      /* the page behind the veil must not scroll */
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    /* tapping a link closes the veil before the next page loads */
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    /* if the viewport grows past the breakpoint while the veil is
       open, the menu becomes the desktop bar — drop the open state
       so body scroll isn't left locked. */
    window.matchMedia(DESKTOP).addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* 2. CURRENT PAGE ------------------------------------------ */
  /* Marks the nav link matching this file, so the gold underline
     never has to be hand-maintained per page. */
  function markCurrent() {
    var here = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('#navMenu a[href]');

    for (var i = 0; i < links.length; i++) {
      var target = links[i].getAttribute('href').split('/').pop();
      if (target === here) links[i].setAttribute('aria-current', 'page');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindMenu();
    markCurrent();
  });
})();
