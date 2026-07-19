/* ============================================================
   BETWEEN THE VEIL — the shelves
   ------------------------------------------------------------
   Books live in one array and the cards are rendered from it.
   Hand-writing eighteen <article> blocks is where this page
   would rot the first time a mood gets renamed.

   Filtering is a hidden attribute on cards already in the DOM —
   no fetch, no router, no re-render. Deep links from home
   (shelves.html#fae) preselect the matching mood.
   ============================================================ */

(function () {
  'use strict';

  /* The five moods, in the order they appear on home.
     `id` doubles as the deep-link anchor and the filter value. */
  var MOODS = [
    { id: 'enemies', label: 'enemies, then lovers',      tone: 'rose' },
    { id: 'grey',    label: 'morally grey & unwell',     tone: 'moss' },
    { id: 'touch',   label: 'touch her and die',         tone: 'gold' },
    { id: 'onebed',  label: 'only one bed',              tone: 'rose' },
    { id: 'fae',     label: 'fae courts, bad decisions', tone: 'moss' }
  ];

  /* Real books, real authors, no cover images.
     -----------------------------------------------------------
     Titles and author names aren't copyrightable, so listing them
     is exactly what any bookshop or review blog does. Cover ART is
     copyrighted, which is why these cards are text only — that one
     decision is what keeps this page clean.

     The `line` is the shop's own voice, kept vibe-level rather
     than plot-specific on purpose: a wrong plot summary on a live
     site is embarrassing in a way "unwell about it" never is.
     The mood tag is curation, not a claim about the text. */
  var BOOKS = [
    /* ---- enemies, then lovers ---- */
    { title: 'The Cruel Prince',            author: 'Holly Black',            line: 'he is awful. she is worse. it works.',             mood: 'enemies', badge: 'the shop’s most reread' },
    { title: 'Serpent & Dove',              author: 'Shelby Mahurin',         line: 'a witch and a witch hunter, married. good luck.',  mood: 'enemies' },
    { title: 'The Hurricane Wars',          author: 'Thea Guanzon',           line: 'opposite sides of a war, terrible timing.',        mood: 'enemies' },
    { title: 'To Kill a Kingdom',           author: 'Alexandra Christo',      line: 'siren, prince, mutual assured destruction.',       mood: 'enemies' },
    { title: 'Divine Rivals',               author: 'Rebecca Ross',           line: 'rival columnists. magic typewriters. a war.',      mood: 'enemies', badge: 'wept on the tram' },
    { title: 'These Violent Delights',      author: 'Chloe Gong',             line: 'feuding heirs, 1920s Shanghai, no good options.',  mood: 'enemies' },
    { title: 'Lightlark',                   author: 'Alex Aster',             line: 'the discourse was louder than the plot. read it anyway.', mood: 'enemies', badge: 'controversial · ask the staff' },
    { title: 'Bride',                       author: 'Ali Hazelwood',          line: 'vampire, werewolf, arranged marriage. yes, really.', mood: 'enemies' },
    { title: 'The Prison Healer',           author: 'Lynette Noni',           line: 'everyone in here is lying, including him.',        mood: 'enemies' },
    { title: 'Heartless Hunter',            author: 'Kristen Ciccarelli',     line: 'witch and witch-hunter, again. we have a type.',   mood: 'enemies' },

    /* ---- morally grey & unwell ---- */
    { title: 'From Blood and Ash',          author: 'Jennifer L. Armentrout', line: 'you will not be okay. that is the point.',         mood: 'grey',    badge: 'staff pick · wept openly' },
    { title: 'Kingdom of the Wicked',       author: 'Kerri Maniscalco',       line: 'she made a deal with a devil. on purpose.',        mood: 'grey' },
    { title: 'The Foxglove King',           author: 'Hannah Whitten',         line: 'necromancy, court politics, poor choices.',        mood: 'grey' },
    { title: 'Assistant to the Villain',    author: 'Hannah Nicole Maehrer',  line: 'evil, but with a functional HR department.',       mood: 'grey',    badge: 'funniest on the shelf' },
    { title: 'Six of Crows',                author: 'Leigh Bardugo',          line: 'six criminals, one heist, zero moral high ground.', mood: 'grey',   badge: 'gateway drug' },
    { title: 'The Shadows Between Us',      author: 'Tricia Levenseller',     line: 'she plans to seduce him, then kill him. plan A.',  mood: 'grey' },
    { title: 'A Dowry of Blood',            author: 'S.T. Gibson',            line: 'dracula’s bride, writing back. devastating.',      mood: 'grey',    badge: 'dark · read the content warnings' },
    { title: 'Gild',                        author: 'Raven Kennedy',          line: 'gold-touched and gilded in place. it gets worse.',  mood: 'grey' },
    { title: 'Quicksilver',                 author: 'Callie Hart',            line: 'fae, thief, mutual loathing, extremely unwell.',   mood: 'grey' },
    { title: 'Juniper & Thorn',             author: 'Ava Reid',               line: 'gothic and genuinely upsetting. check the notes.', mood: 'grey',    badge: 'read the content warnings' },

    /* ---- touch her and die ---- */
    { title: 'Fourth Wing',                 author: 'Rebecca Yarros',         line: 'dragons, and a war college that wants her dead.',  mood: 'touch',   badge: '✦✦✦✦✦✦ 6 stars' },
    { title: 'Iron Flame',                  author: 'Rebecca Yarros',         line: 'the sequel that ruined everyone’s february.',      mood: 'touch',   series: 'The Empyrean, Book 2 — start with Fourth Wing' },
    { title: 'Onyx Storm',                  author: 'Rebecca Yarros',         line: 'we do not discuss the ending. not yet.',           mood: 'touch',   series: 'The Empyrean, Book 3 — start with Fourth Wing' },
    { title: 'The Serpent and the Wings of Night', author: 'Carissa Broadbent', line: 'vampire trials. devotion as a weapon.',          mood: 'touch' },
    { title: 'Powerless',                   author: 'Lauren Roberts',         line: 'she has nothing. he has everything. obviously.',   mood: 'touch' },
    { title: 'House of Earth and Blood',    author: 'Sarah J. Maas',          line: 'grief, glitter, and a very protective male.',      mood: 'touch' },
    { title: 'A Court of Mist and Fury',    author: 'Sarah J. Maas',          line: 'the one everybody actually means.',                mood: 'touch',   badge: 'most reread on the shelf', series: 'A Court of Thorns and Roses, Book 2' },
    { title: 'Throne of Glass',             author: 'Sarah J. Maas',          line: 'assassin, competition, extremely long series.',    mood: 'touch' },
    { title: 'A Fate Inked in Blood',       author: 'Danielle L. Jensen',     line: 'norse shield-maiden, prophecy, bad husband.',      mood: 'touch' },
    { title: 'The Book of Azrael',          author: 'Amber V. Nicole',        line: 'gods behaving atrociously. she started it.',       mood: 'touch' },

    /* ---- only one bed ---- */
    { title: 'The Bridge Kingdom',          author: 'Danielle L. Jensen',     line: 'married to the enemy, sent to destroy him.',       mood: 'onebed' },
    { title: 'A Deal with the Elf King',    author: 'Elise Kova',             line: 'taken as a bride. stayed for the plot.',           mood: 'onebed' },
    { title: 'Uprooted',                    author: 'Naomi Novik',            line: 'one tower, one wizard, no escape route.',          mood: 'onebed',  badge: 'the fox’s own favourite' },
    { title: 'Spinning Silver',             author: 'Naomi Novik',            line: 'a winter king and a very bad bargain.',            mood: 'onebed' },
    { title: 'The Wolf and the Woodsman',   author: 'Ava Reid',               line: 'hostage to the enemy, snowbound, obviously.',      mood: 'onebed' },
    { title: 'A Marvellous Light',          author: 'Freya Marske',           line: 'edwardian bureaucracy and a cursed houseguest.',   mood: 'onebed' },
    { title: 'The Very Secret Society of Irregular Witches', author: 'Sangu Mandanna', line: 'a house full of witches and one grump.', mood: 'onebed',  badge: 'the cosy one' },
    { title: 'The Undertaking of Hart and Mercy', author: 'Megan Bannen',     line: 'letters, loathing, and an undertaker.',            mood: 'onebed' },
    { title: 'Half a Soul',                 author: 'Olivia Atwater',         line: 'regency manners, fae curse, one magician.',        mood: 'onebed' },
    { title: 'A Curse So Dark and Lonely',  author: 'Brigid Kemmerer',        line: 'cursed castle, repeating season, nowhere to go.',  mood: 'onebed' },

    /* ---- fae courts, bad decisions ---- */
    { title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas',          line: 'the one that started the whole shelf.',            mood: 'fae',     badge: 'most annotated' },
    { title: 'An Enchantment of Ravens',    author: 'Margaret Rogerson',      line: 'never show a fae prince your feelings.',           mood: 'fae' },
    { title: 'Emily Wilde’s Encyclopaedia of Faeries', author: 'Heather Fawcett', line: 'fieldwork, footnotes, and one bad idea.',      mood: 'fae',     badge: 'book club pick' },
    { title: 'The Wicked King',             author: 'Holly Black',            line: 'the betrayal. you know the one.',                  mood: 'fae',     series: 'The Folk of the Air, Book 2' },
    { title: 'The Stolen Heir',             author: 'Holly Black',            line: 'back to elfhame, worse decisions.',                mood: 'fae' },
    { title: 'Once Upon a Broken Heart',    author: 'Stephanie Garber',       line: 'never make a bargain with the prince of hearts.',  mood: 'fae',     series: 'starts here, but spoils the end of Caraval' },
    { title: 'A Dawn of Onyx',              author: 'Kate Golden',            line: 'captured by the enemy king. it escalates.',        mood: 'fae' },
    { title: 'Faebound',                    author: 'Saara El-Arifi',         line: 'two sisters, one fae kingdom, no way home.',       mood: 'fae' },
    { title: 'A Ruin of Roses',             author: 'K. F. Breene',           line: 'cursed beast, desperate bargain, feral energy.',   mood: 'fae' },
    { title: 'For the Wolf',                author: 'Hannah Whitten',         line: 'sent to the wood as a sacrifice. rude.',           mood: 'fae' }
  ];

  function moodById(id) {
    for (var i = 0; i < MOODS.length; i++) {
      if (MOODS[i].id === id) return MOODS[i];
    }
    return null;
  }

  /* 1. RENDER ------------------------------------------------ */
  /* Filters render as .tab (bookmark shape), not .shelf — .shelf is
     the book-spine treatment used for the mood row on home. */
  function renderFilters(host) {
    var html = '<button class="tab tab--gold" data-mood="all" aria-pressed="true">everything</button>';

    for (var i = 0; i < MOODS.length; i++) {
      html += '<button class="tab tab--' + MOODS[i].tone + '" data-mood="' + MOODS[i].id + '" aria-pressed="false">' +
              MOODS[i].label + '</button>';
    }
    host.innerHTML = html;
  }

  function renderBooks(host) {
    var html = '';

    for (var i = 0; i < BOOKS.length; i++) {
      var b = BOOKS[i];
      var mood = moodById(b.mood);
      var tone = mood ? mood.tone : 'rose';

      html += '<article class="book book--' + tone + '" data-mood="' + b.mood + '">';
      if (b.badge) html += '<p class="book__badge book__badge--' + tone + '">' + b.badge + '</p>';
      html += '<h3 class="book__title">' + b.title + '</h3>' +
              '<p class="book__author">' + b.author + '</p>' +
              '<p class="book__line">' + b.line + '</p>';
      /* Only sequels carry this — it's a "don't start here" warning,
         not a catalogue field, so entry points stay uncluttered. */
      if (b.series) html += '<p class="book__series">' + b.series + '</p>';
      html += '<span class="book__mood">' + (mood ? mood.label : b.mood) + '</span>' +
              '</article>';
    }
    host.innerHTML = html;
  }

  /* 2. FILTER ------------------------------------------------ */
  function bindFilter(filters, stacks, empty, count) {
    var buttons = filters.querySelectorAll('[data-mood]');
    var cards = stacks.querySelectorAll('.book');

    function apply(mood) {
      var shown = 0;

      for (var i = 0; i < cards.length; i++) {
        var match = mood === 'all' || cards[i].getAttribute('data-mood') === mood;
        cards[i].hidden = !match;
        if (match) shown++;
      }

      for (var j = 0; j < buttons.length; j++) {
        var on = buttons[j].getAttribute('data-mood') === mood;
        buttons[j].setAttribute('aria-pressed', on ? 'true' : 'false');
      }

      empty.hidden = shown > 0;

      var m = moodById(mood);
      count.textContent = shown + (shown === 1 ? ' book' : ' books') +
        (m ? ' shelved under “' + m.label + '”' : ' on the shelves tonight');
    }

    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-mood]');
      if (!btn) return;

      var mood = btn.getAttribute('data-mood');
      apply(mood);
      /* keep the URL shareable without jumping the page */
      history.replaceState(null, '', mood === 'all' ? location.pathname : '#' + mood);
    });

    /* a deep link from home lands on the right shelf */
    var fromHash = location.hash.replace('#', '');
    apply(moodById(fromHash) ? fromHash : 'all');
  }

  /* INIT ----------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var filters = document.getElementById('filters');
    var stacks = document.getElementById('stacks');
    var empty = document.getElementById('stacksEmpty');
    var count = document.getElementById('stacksCount');
    if (!filters || !stacks) return;

    renderFilters(filters);
    renderBooks(stacks);
    bindFilter(filters, stacks, empty, count);
  });
})();
