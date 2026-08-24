/* ============================================================
   BETWEEN THE VEIL — entrance ritual + home reveal
   ------------------------------------------------------------
   index.html holds two states: the threshold, and home. This
   decides which one you land on.

   Flow:
     1. If you've already stepped through this session, skip
        straight to home — no flash of door.
     2. Otherwise: scatter motes, wait for the knock, swing the
        door, invite you through.
     3. Stepping through remembers you and reveals home.

   The key is sessionStorage, not localStorage, on purpose: a new
   tab tomorrow should get the ritual again. It's the best part.
   Everything degrades gracefully with reduced-motion.
   ============================================================ */

(function () {
  'use strict';

  var KEY = 'veil-entered';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Private browsing can throw on storage access — the door is
     decorative, so a failure here should never block entry. */
  function hasEntered() {
    try { return sessionStorage.getItem(KEY) === '1'; }
    catch (e) { return false; }
  }

  function remember() {
    try { sessionStorage.setItem(KEY, '1'); }
    catch (e) { /* no-op: they'll just see the door again */ }
  }

  /* 1. FLOATING MOTES ---------------------------------------- */
  function scatterMotes() {
    var host = document.getElementById('motes');
    if (!host || reduceMotion) return;

    /* one shared stylesheet rather than one per mote */
    var sheet = document.createElement('style');
    var rules = '';

    for (var i = 0; i < 14; i++) {
      var size = 2 + Math.random() * 3;
      var dur = 3 + Math.random() * 4;
      var rise = 8 + Math.random() * 14;

      var mote = document.createElement('div');
      mote.className = 'mote';
      mote.style.width = size + 'px';
      mote.style.height = size + 'px';
      mote.style.left = (Math.random() * 100) + '%';
      mote.style.top = (Math.random() * 100) + '%';
      mote.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
      mote.style.animation = 'moteFloat' + i + ' ' + dur.toFixed(2) + 's ease-in-out infinite';

      rules += '@keyframes moteFloat' + i +
        '{0%,100%{transform:translateY(0)}50%{transform:translateY(-' + rise.toFixed(0) + 'px)}}';

      host.appendChild(mote);
    }

    sheet.textContent = rules;
    document.head.appendChild(sheet);
  }

  /* 2. THE KNOCK + THE DOOR ---------------------------------- */
  function bindEntrance() {
    var wishBtn = document.getElementById('wishBtn');
    var skipBtn = document.getElementById('skipBtn');
    var wish = document.getElementById('wish');
    var parted = document.getElementById('parted');
    var door = document.getElementById('door');
    var doorLeft = document.getElementById('doorLeft');
    var doorRight = document.getElementById('doorRight');
    var threshold = document.getElementById('threshold');

    var hasKnocked = false;
    var entered = false;

    function knock() {
      if (hasKnocked) { enterShop(); return; }
      hasKnocked = true;

      /* fade the title + prompt so the open doors take the stage */
      wish.style.transition = 'opacity 0.5s ease';
      wish.style.opacity = '0';
      var center = document.querySelector('.threshold__center');
      if (center) { center.style.transition = 'opacity 0.8s ease'; center.style.opacity = '0'; }

      window.setTimeout(function () {
        wish.style.display = 'none';
        door.classList.add('is-opening');        /* bloom the glow */
        doorLeft.classList.add('is-open');       /* swing left half  */
        doorRight.classList.add('is-open');      /* swing right half */
      }, reduceMotion ? 0 : 400);

      /* once the doors are open, let a tap anywhere carry you in */
      window.setTimeout(function () {
        parted.classList.add('is-visible');
        parted.addEventListener('click', enterShop);
        threshold.addEventListener('click', enterShop);
      }, reduceMotion ? 100 : 1800);
    }

    function enterShop() {
      if (entered) return;
      entered = true;
      remember();

      threshold.style.transition = 'opacity 0.6s ease';
      threshold.style.opacity = '0';

      window.setTimeout(function () {
        threshold.hidden = true;
        revealHome();
        /* land at the top of home, not wherever the door left us */
        window.scrollTo(0, 0);
      }, reduceMotion ? 0 : 560);
    }

    if (wishBtn) wishBtn.addEventListener('click', knock);
    /* the escape hatch: straight through, no ritual */
    if (skipBtn) skipBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      enterShop();
    });
  }

  /* 3. HOME -------------------------------------------------- */
  /* Nav, home and footer are hidden by html.is-gated in CSS, so
     dropping that one class reveals all three at once. */
  function revealHome(instant) {
    var root = document.documentElement;
    var shop = document.getElementById('shop');

    root.classList.remove('is-gated');
    root.classList.add('has-entered');

    if (!shop || instant) return;
    shop.classList.add('fade-in');
    requestAnimationFrame(function () { shop.classList.add('is-in'); });
  }

  /* 4. Sagewave hook ----------------------------------------- */
  function bindHook() {
    var cta = document.getElementById('ctaBtn');
    if (!cta) return;
    cta.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'mailto:hello@sagewave.example?subject=Between%20the%20Veil%20%E2%80%94%20author%20website';
    });
  }

  /* INIT ----------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (hasEntered()) {
      /* returning this session: the inline head script already
         stamped has-entered, so there's nothing to reveal */
      revealHome(true);
    } else {
      scatterMotes();
      bindEntrance();
    }

    bindHook();
  });
})();
