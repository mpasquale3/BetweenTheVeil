/* ============================================================
   BETWEEN THE VEIL — entrance ritual + shop reveal
   ------------------------------------------------------------
   Flow:
     1. Scatter floating golden "motes" across the threshold.
     2. "lift the knocker" -> fade the prompt, bloom the glow,
        swing both door halves open, invite the reader through.
     3. Stepping through fades the threshold and reveals the shop.
   Everything degrades gracefully with reduced-motion.
   ============================================================ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. FLOATING MOTES ---------------------------------------- */
  function scatterMotes() {
    var host = document.getElementById('motes');
    if (!host || reduceMotion) return;

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

      var keyframes = document.createElement('style');
      keyframes.textContent =
        '@keyframes moteFloat' + i + '{0%,100%{transform:translateY(0)}50%{transform:translateY(-' + rise.toFixed(0) + 'px)}}';
      document.head.appendChild(keyframes);

      host.appendChild(mote);
    }
  }

  /* 2. THE KNOCK + THE DOOR ---------------------------------- */
  function bindEntrance() {
    var wishBtn = document.getElementById('wishBtn');
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
        door.classList.add('is-opening');       /* bloom the glow */
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

      var shop = document.getElementById('shop');

      threshold.style.transition = 'opacity 0.6s ease';
      threshold.style.opacity = '0';

      window.setTimeout(function () {
        threshold.style.display = 'none';
        shop.hidden = false;
        shop.classList.add('fade-in');
        requestAnimationFrame(function () { shop.classList.add('is-in'); });
      }, reduceMotion ? 0 : 560);
    }

    if (wishBtn) wishBtn.addEventListener('click', knock);
  }

  /* 3. SAGEWAVE HOOK ----------------------------------------- */
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
    scatterMotes();
    bindEntrance();
    bindHook();
  });
})();