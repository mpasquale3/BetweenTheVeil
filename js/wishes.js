/* ============================================================
   BETWEEN THE VEIL — the wishing table
   ------------------------------------------------------------
   A working demonstration of a product-request feature, with no
   backend behind it.

   The honest bit: your wishes really are saved, in localStorage,
   on this device. The crowd tallies beside each item are invented
   and the panel says so. Faking community votes would be the same
   mistake as the submission queue that used to live on the
   spotlight page — a number that looks like other people and
   isn't.

   localStorage rather than sessionStorage here, deliberately: the
   door should forget you tomorrow, but a wish shouldn't.
   ============================================================ */

(function () {
  'use strict';

  var KEY_PICKED = 'veil-wishes';
  var KEY_CUSTOM = 'veil-wishes-own';

  /* `seed` is the invented tally. It is never presented as real —
     see .wishtable__fine in index.html. */
  var WARES = [
    { id: 'tote',    glyph: '❉', name: '“I’d die for a fictional man” tote', seed: 214 },
    { id: 'tabs',    glyph: '✻', name: 'annotation tabs, in six moods',                     seed: 188 },
    { id: 'candle',  glyph: '✦', name: 'smut-o’clock candle',                          seed: 173 },
    { id: 'weight',  glyph: '❀', name: 'a sleeping-fox book weight',                        seed: 141 },
    { id: 'marks',   glyph: '⚜', name: 'ribbon marks, dyed in the shop',                    seed: 126 },
    { id: 'pins',    glyph: '✧', name: 'enamel pins for the morally grey',                  seed: 97  }
  ];

  /* Storage can throw in private browsing. The table is decorative;
     it should degrade to "works, forgets you" rather than break. */
  function read(key) {
    try {
      var raw = localStorage.getItem(key);
      var val = raw ? JSON.parse(raw) : [];
      return Object.prototype.toString.call(val) === '[object Array]' ? val : [];
    } catch (e) { return []; }
  }

  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch (e) { /* no-op: the wish just won't outlive the tab */ }
  }

  /* Custom wishes are typed by the visitor, so they are never
     interpolated into HTML — see renderCustom(). This escape is
     for the shop's own strings only. */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var picked = read(KEY_PICKED);
  var custom = read(KEY_CUSTOM);

  function isPicked(id) {
    for (var i = 0; i < picked.length; i++) { if (picked[i] === id) return true; }
    return false;
  }

  /* 1. RENDER ------------------------------------------------ */
  function wareMarkup(w) {
    var on = isPicked(w.id);
    return '<li class="trinket' + (on ? ' is-wished' : '') + '" data-wish="' + esc(w.id) + '">' +
             '<span class="trinket__glyph" aria-hidden="true">' + w.glyph + '</span>' +
             '<span class="trinket__name">' + esc(w.name) + '</span>' +
             '<button class="trinket__btn" type="button" aria-pressed="' + (on ? 'true' : 'false') + '">' +
               (on ? 'wished' : 'wish') +
             '</button>' +
             '<span class="trinket__tally">' + (w.seed + (on ? 1 : 0)) + ' wishes</span>' +
           '</li>';
  }

  function renderWares(host) {
    var html = '';
    for (var i = 0; i < WARES.length; i++) html += wareMarkup(WARES[i]);
    host.innerHTML = html;
    renderCustom(host);
  }

  /* Visitor-typed text. Built with createElement/textContent so a
     typed "<img onerror=...>" is inert by construction rather than
     by remembering to escape it. */
  function renderCustom(host) {
    var existing = host.querySelectorAll('[data-own]');
    for (var i = 0; i < existing.length; i++) existing[i].remove();

    for (var j = 0; j < custom.length; j++) {
      var li = document.createElement('li');
      li.className = 'trinket is-wished is-own';
      li.setAttribute('data-own', String(j));

      var glyph = document.createElement('span');
      glyph.className = 'trinket__glyph';
      glyph.setAttribute('aria-hidden', 'true');
      glyph.textContent = '✴';

      var name = document.createElement('span');
      name.className = 'trinket__name';
      name.textContent = custom[j];

      var btn = document.createElement('button');
      btn.className = 'trinket__btn';
      btn.type = 'button';
      btn.textContent = 'unwish';

      var tally = document.createElement('span');
      tally.className = 'trinket__tally';
      tally.textContent = 'yours alone';

      li.appendChild(glyph);
      li.appendChild(name);
      li.appendChild(btn);
      li.appendChild(tally);
      host.appendChild(li);
    }
  }

  function renderCount(el) {
    var n = picked.length + custom.length;
    if (!n) { el.textContent = 'the table is waiting.'; return; }
    el.textContent = n === 1
      ? 'one wish laid on the table.'
      : n + ' wishes laid on the table.';
  }

  /* 2. BIND -------------------------------------------------- */
  function bind(host, countEl, form, input) {
    host.addEventListener('click', function (e) {
      var btn = e.target.closest('.trinket__btn');
      if (!btn) return;

      var li = btn.closest('.trinket');
      var own = li.getAttribute('data-own');

      if (own !== null) {
        custom.splice(Number(own), 1);
        write(KEY_CUSTOM, custom);
        renderWares(host);
      } else {
        var id = li.getAttribute('data-wish');
        if (isPicked(id)) {
          picked.splice(picked.indexOf(id), 1);
        } else {
          picked.push(id);
        }
        write(KEY_PICKED, picked);
        renderWares(host);
      }
      renderCount(countEl);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;

      custom.push(text);
      write(KEY_CUSTOM, custom);
      input.value = '';
      renderCustom(host);
      renderCount(countEl);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.getElementById('wishes');
    var countEl = document.getElementById('wishCount');
    var form = document.getElementById('wishForm');
    var input = document.getElementById('wishInput');
    if (!host || !countEl || !form || !input) return;

    renderWares(host);
    renderCount(countEl);
    bind(host, countEl, form, input);
  });
})();
