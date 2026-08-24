/* ============================================================
   BETWEEN THE VEIL
   Main interactions
   ============================================================ */

(function () {
  "use strict";


  /* ==========================================================
     1. ENTRANCE
     ========================================================== */

  const threshold = document.getElementById("threshold");
  const enterButton = document.getElementById("enterButton");
  const skipEntrance = document.getElementById("skipEntrance");

  const door = document.getElementById("door");
  const doorLeft = document.getElementById("doorLeft");
  const doorRight = document.getElementById("doorRight");

  const thresholdAction =
    document.getElementById("thresholdAction");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  function rememberEntry() {
    try {
      sessionStorage.setItem("btv-entered", "true");
    } catch (error) {
      // Entrance still works even if storage is unavailable.
    }
  }


  function revealSite() {
    rememberEntry();

    document.documentElement.classList.remove("is-gated");
    document.documentElement.classList.remove("is-crossing");
    document.documentElement.classList.add("has-entered");

    window.scrollTo(0, 0);
  }


  function openDoor() {

    if (!door || !doorLeft || !doorRight) {
      revealSite();
      return;
    }

    thresholdAction.classList.add("is-hidden");

    door.classList.add("is-opening");

    doorLeft.classList.add("is-open");
    doorRight.classList.add("is-open");

    if (!reduceMotion) {
      window.setTimeout(function () {
        document.documentElement.classList.add("is-crossing");
      }, 1450);
    }

    window.setTimeout(
      revealSite,
      reduceMotion ? 50 : 2200
    );
  }


  if (enterButton) {
    enterButton.addEventListener("click", openDoor);
  }


  if (skipEntrance) {
    skipEntrance.addEventListener("click", revealSite);
  }


  /* ==========================================================
     2. TONIGHT'S RECOMMENDATION
     ========================================================== */

  const recommendations = [
    "something romantic, dangerous, and objectively a bad idea",
    "a bargain you should not make with someone beautiful",
    "a haunted castle with one deeply inconvenient bedroom",
    "a morally questionable immortal who is trying their best",
    "a heroine who has mistaken vengeance for a wellness plan",
    "a love story with swords, secrets, and terrible timing"
  ];

  const recommendationText =
    document.getElementById("recommendationText");

  const nextRecommendation =
    document.getElementById("nextRecommendation");

  let recommendationIndex = 0;

  function rotateRecommendation() {
    if (!recommendationText) return;

    recommendationIndex =
      (recommendationIndex + 1) % recommendations.length;

    recommendationText.textContent =
      recommendations[recommendationIndex];

    if (!reduceMotion) {
      recommendationText.animate(
        [
          { opacity: 0, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 420, easing: "ease-out" }
      );
    }
  }

  if (nextRecommendation) {
    nextRecommendation.addEventListener("click", rotateRecommendation);
  }

  if (recommendationText && !reduceMotion) {
    window.setInterval(rotateRecommendation, 6500);
  }


  /* ==========================================================
     3. BOOK DATA
     ========================================================== */

  const books = {

    enemies: [
      {
        title: "The Cruel Prince",
        author: "Holly Black",
        comment: "he is awful. she is worse. it works.",
        tone: "plum"
      },
      {
        title: "Divine Rivals",
        author: "Rebecca Ross",
        comment: "rival journalists and magical mail. devastating.",
        tone: "rose"
      },
      {
        title: "The Hurricane Wars",
        author: "Thea Guanzon",
        comment: "opposite sides of a war. inconvenient chemistry.",
        tone: "gold"
      },
      {
        title: "Bride",
        author: "Ali Hazelwood",
        comment: "vampire. werewolf. arranged marriage. proceed.",
        tone: "moss"
      }
    ],


    grey: [
      {
        title: "Six of Crows",
        author: "Leigh Bardugo",
        comment: "six criminals. one heist. absolutely no moral high ground.",
        tone: "plum"
      },
      {
        title: "Quicksilver",
        author: "Callie Hart",
        comment: "fae, theft, mutual irritation. deeply unwell.",
        tone: "moss"
      },
      {
        title: "Kingdom of the Wicked",
        author: "Kerri Maniscalco",
        comment: "she made a deal with a devil. intentionally.",
        tone: "gold"
      },
      {
        title: "A Dowry of Blood",
        author: "S.T. Gibson",
        comment: "romantic in the worst possible way.",
        tone: "rose"
      }
    ],


    touch: [
      {
        title: "Fourth Wing",
        author: "Rebecca Yarros",
        comment: "dragons, violence, and a man with a completely normal amount of protectiveness.",
        tone: "rose"
      },
      {
        title: "The Serpent and the Wings of Night",
        author: "Carissa Broadbent",
        comment: "vampire trials. devotion as a weapon.",
        tone: "plum"
      },
      {
        title: "A Court of Mist and Fury",
        author: "Sarah J. Maas",
        comment: "yes. that one.",
        tone: "moss"
      },
      {
        title: "Powerless",
        author: "Lauren Roberts",
        comment: "she has nothing. he has everything. naturally.",
        tone: "gold"
      }
    ],


    onebed: [
      {
        title: "The Bridge Kingdom",
        author: "Danielle L. Jensen",
        comment: "married to the enemy. what could possibly go wrong.",
        tone: "moss"
      },
      {
        title: "A Deal with the Elf King",
        author: "Elise Kova",
        comment: "taken as a bride. stayed for reasons.",
        tone: "plum"
      },
      {
        title: "Uprooted",
        author: "Naomi Novik",
        comment: "tower. wizard. terrible interpersonal skills.",
        tone: "gold"
      },
      {
        title: "Half a Soul",
        author: "Olivia Atwater",
        comment: "regency manners meet faerie nonsense.",
        tone: "rose"
      }
    ],


    fae: [
      {
        title: "A Court of Thorns and Roses",
        author: "Sarah J. Maas",
        comment: "the gateway drug.",
        tone: "rose"
      },
      {
        title: "The Cruel Prince",
        author: "Holly Black",
        comment: "elfhame remains a workplace hazard.",
        tone: "plum"
      },
      {
        title: "Emily Wilde's Encyclopaedia of Faeries",
        author: "Heather Fawcett",
        comment: "field research, footnotes, and questionable decisions.",
        tone: "moss"
      },
      {
        title: "Once Upon a Broken Heart",
        author: "Stephanie Garber",
        comment: "never make bargains with beautiful men in fantasy novels.",
        tone: "gold"
      }
    ]

  };


  const bookGrid = document.getElementById("bookGrid");
  const moodTabs = document.getElementById("moodTabs");


  function renderBooks(mood) {

    if (!bookGrid || !books[mood]) {
      return;
    }

    bookGrid.innerHTML = "";


    books[mood].forEach(function (book) {

      const card = document.createElement("article");

      card.className =
        "book-card book-card--" + book.tone;


      const middle = document.createElement("div");

      middle.className = "book-card__middle";


      const title = document.createElement("h3");

      title.textContent = book.title;


      const author = document.createElement("p");

      author.className = "book-card__author";

      author.textContent = book.author;


      const comment = document.createElement("p");

      comment.className = "book-card__comment";

      comment.textContent = book.comment;


      middle.appendChild(title);
      middle.appendChild(author);

      card.appendChild(middle);
      card.appendChild(comment);

      bookGrid.appendChild(card);

    });

  }


  function selectMood(mood, selectedButton) {

    const buttons =
      moodTabs.querySelectorAll("[data-mood]");


    buttons.forEach(function (button) {

      const active =
        button === selectedButton;

      button.classList.toggle(
        "is-active",
        active
      );

      button.setAttribute(
        "aria-pressed",
        active ? "true" : "false"
      );

    });


    renderBooks(mood);

  }


  if (moodTabs) {

    moodTabs.addEventListener(
      "click",
      function (event) {

        const button =
          event.target.closest("[data-mood]");

        if (!button) {
          return;
        }

        selectMood(
          button.dataset.mood,
          button
        );

      }
    );

  }


  renderBooks("enemies");


  /* ==========================================================
     4. INDIE AUTHOR FEATURE
     ========================================================== */

  const authors = [

    {
      name: "Wren Alcott",

      book: "The Salt-Wife's Daughter",

      description:
        "A lighthouse keeper's daughter marries the sea to settle her father's debt, then discovers the ocean has terms of its own.",

      quote:
        "“I got tired of waiting for someone to invent the shelf. So I built one.”",

      genre: "gothic romantasy",

      year: "self-published, 2025",

      tone: "tone-plum",

      month: "august",

      issue: "08",

      cameo: "cameo-wren"
    },

    {
      name: "Tova Marchetti",

      book: "Nine Days of Smoke",

      description:
        "Two women inherit a crumbling hotel where every guest arrives carrying something they intended to forget.",

      quote:
        "“I wanted the magic to feel less like a gift and more like a family problem.”",

      genre: "dark magical realism",

      year: "independent press, 2026",

      tone: "tone-wine",

      month: "july",

      issue: "07",

      cameo: "cameo-tova"
    },

    {
      name: "Idris Vane",

      book: "The Marrow Court",

      description:
        "A disgraced royal physician discovers the dead have been quietly voting in the kingdom's elections for centuries.",

      quote:
        "“Fantasy is allowed to be strange. I think we forget that sometimes.”",

      genre: "gothic fantasy",

      year: "self-published, 2026",

      tone: "tone-moss",

      month: "june",

      issue: "06",

      cameo: "cameo-idris"
    },

    {
      name: "Elowen Sable",
      book: "A Catalogue of Small Curses",
      description:
        "A village librarian begins lending out minor curses, only to discover someone has returned one with a life of its own.",
      quote:
        "“I like magic best when it behaves like a badly organized public service.”",
      genre: "cozy gothic fantasy",
      year: "self-published, 2026",
      tone: "tone-plum",
      month: "may",
      issue: "05",
      cameo: "cameo-tova"
    },

    {
      name: "Maeve Hollow",
      book: "The Briar Saint",
      description:
        "A reluctant saint wakes beneath a ruined chapel and finds the thorn-covered knight who buried her still keeping watch.",
      quote:
        "“Devotion can be holy and terrible at exactly the same time.”",
      genre: "dark romantic fantasy",
      year: "independent press, 2026",
      tone: "tone-wine",
      month: "april",
      issue: "04",
      cameo: "cameo-wren"
    },

    {
      name: "Sorrel Finch",
      book: "When the Moon Kept Her",
      description:
        "A hedge witch bargains for one more night with her vanished sister and accidentally gives the moon a reason to stay.",
      quote:
        "“Every spell in the book begins with somebody missing somebody else.”",
      genre: "folkloric fantasy",
      year: "self-published, 2026",
      tone: "tone-moss",
      month: "march",
      issue: "03",
      cameo: "cameo-tova"
    },

    {
      name: "Niko Vale",
      book: "The Cartographer of Lost Hours",
      description:
        "A royal mapmaker discovers an island where abandoned moments collect, including one hour the crown would kill to erase.",
      quote:
        "“Maps are promises about what the world is willing to admit.”",
      genre: "romantic adventure fantasy",
      year: "independent press, 2026",
      tone: "tone-plum",
      month: "february",
      issue: "02",
      cameo: "cameo-idris"
    },

    {
      name: "Cassia Rook",
      book: "The Orchard Beneath the Snow",
      description:
        "Two estranged sisters inherit a winter orchard whose fruit contains every secret their family refused to name.",
      quote:
        "“Family stories are just hauntings with better table manners.”",
      genre: "gothic magical realism",
      year: "self-published, 2026",
      tone: "tone-wine",
      month: "january",
      issue: "01",
      cameo: "cameo-wren"
    }

  ];


  let authorIndex = 0;


  const authorArt =
    document.getElementById("authorArt");

  const authorName =
    document.getElementById("authorName");

  const authorBook =
    document.getElementById("authorBook");

  const authorBookSmall =
    document.getElementById("authorBookSmall");

  const authorDescription =
    document.getElementById("authorDescription");

  const authorQuote =
    document.getElementById("authorQuote");

  const authorGenre =
    document.getElementById("authorGenre");

  const authorYear =
    document.getElementById("authorYear");

  const authorMonth =
    document.getElementById("authorMonth");

  const authorIssue =
    document.getElementById("authorIssue");

  const authorCameo =
    document.getElementById("authorCameo");

  const nextAuthor =
    document.getElementById("nextAuthor");


  function renderAuthor() {

    const author = authors[authorIndex];


    authorName.textContent =
      author.name;

    authorBook.textContent =
      author.book;

    authorBookSmall.textContent =
      author.book;

    authorDescription.textContent =
      author.description;

    authorQuote.textContent =
      author.quote;

    authorGenre.textContent =
      author.genre;

    authorYear.textContent =
      author.year;

    authorMonth.textContent =
      "this month's find · " + author.month;

    authorIssue.textContent =
      "indie shelf / " + author.issue;


    authorArt.classList.remove(
      "tone-plum",
      "tone-wine",
      "tone-moss"
    );

    authorArt.classList.add(
      author.tone
    );

    authorCameo.classList.remove(
      "cameo-wren",
      "cameo-tova",
      "cameo-idris"
    );

    authorCameo.classList.add(
      author.cameo
    );

  }


  if (nextAuthor) {

    nextAuthor.addEventListener(
      "click",
      function () {

        authorIndex =
          (authorIndex + 1) %
          authors.length;

        renderAuthor();

      }
    );

  }


  /* ==========================================================
     5. WISHING TABLE
     ========================================================== */

  const wishOptions =
    document.getElementById("wishOptions");

  const wishForm =
    document.getElementById("wishForm");

  const wishInput =
    document.getElementById("wishInput");

  const wishResult =
    document.getElementById("wishResult");

  const wishResultText =
    document.getElementById("wishResultText");

  const wishCount =
    document.getElementById("wishCount");

  const WISH_VOTES_KEY = "btv-wish-votes";
  const CUSTOM_WISHES_KEY = "btv-custom-wishes";

  const defaultWishes = [
    {
      id: "annotation-tabs",
      symbol: "≡",
      name: "annotation tabs",
      detail: "in six moods"
    },
    {
      id: "reader-candle",
      symbol: "✦",
      name: "reader candle",
      detail: "for staying up irresponsibly late"
    },
    {
      id: "fox-book-weight",
      symbol: "☾",
      name: "book weight",
      detail: "sleeping fox, obviously"
    }
  ];

  function readStoredList(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeStoredList(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // The board still works for this visit if storage is unavailable.
    }
  }

  let wishedFor = new Set(readStoredList(WISH_VOTES_KEY));
  let customWishes = readStoredList(CUSTOM_WISHES_KEY).filter(
    function (wish) {
      return wish && wish.id && wish.name;
    }
  );

  function allWishes() {
    return defaultWishes.concat(customWishes);
  }

  function updateWishCount() {
    if (!wishCount) return;

    const count = wishedFor.size;
    wishCount.textContent =
      count === 0
        ? "no wishes made yet"
        : count === 1
          ? "1 wish made"
          : count + " wishes made";
  }

  function makeWishCard(wish) {
    const card = document.createElement("article");
    const selected = wishedFor.has(wish.id);

    card.className = "wish-card";
    card.dataset.wishId = wish.id;
    card.classList.toggle("is-selected", selected);

    const choice = document.createElement("button");
    choice.className = "wish-card__choice";
    choice.type = "button";
    choice.setAttribute("aria-pressed", selected ? "true" : "false");
    choice.setAttribute(
      "aria-label",
      (selected ? "Remove your wish for " : "Wish for ") + wish.name
    );

    const symbol = document.createElement("span");
    symbol.className = "wish-card__symbol";
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = wish.symbol || "✦";

    const copy = document.createElement("span");
    copy.className = "wish-card__copy";

    const name = document.createElement("strong");
    name.textContent = wish.name;

    const detail = document.createElement("span");
    detail.textContent = wish.detail || "left at the table by a reader";

    const vote = document.createElement("span");
    vote.className = "wish-card__vote";
    vote.textContent = selected ? "wished for ✓" : "make this wish";

    copy.appendChild(name);
    copy.appendChild(detail);
    choice.appendChild(symbol);
    choice.appendChild(copy);
    choice.appendChild(vote);
    card.appendChild(choice);

    if (wish.custom) {
      const remove = document.createElement("button");
      remove.className = "wish-card__remove";
      remove.type = "button";
      remove.dataset.removeWish = wish.id;
      remove.setAttribute(
        "aria-label",
        "Remove " + wish.name + " from the table"
      );
      remove.textContent = "remove";
      card.appendChild(remove);
    }

    return card;
  }

  function renderWishes() {
    if (!wishOptions) return;

    wishOptions.innerHTML = "";
    allWishes().forEach(function (wish) {
      wishOptions.appendChild(makeWishCard(wish));
    });

    updateWishCount();
  }


  function showWish(text) {

    if (!text) {
      return;
    }


    wishResultText.textContent = text;

    wishResult.hidden = false;


    wishResult.animate(
      [
        {
          opacity: 0,
          transform: "translateY(10px)"
        },
        {
          opacity: 1,
          transform: "translateY(0)"
        }
      ],
      {
        duration: reduceMotion ? 1 : 350,
        easing: "ease-out"
      }
    );

  }

  function toggleWish(id) {
    const wish = allWishes().find(function (item) {
      return item.id === id;
    });

    if (!wish) return;

    if (wishedFor.has(id)) {
      wishedFor.delete(id);
      showWish("Your wish for “" + wish.name + "” has been lifted.");
    } else {
      wishedFor.add(id);
      showWish("You wished for “" + wish.name + ".”");
    }

    writeStoredList(WISH_VOTES_KEY, Array.from(wishedFor));
    renderWishes();
  }

  function removeCustomWish(id) {
    customWishes = customWishes.filter(function (wish) {
      return wish.id !== id;
    });

    wishedFor.delete(id);
    writeStoredList(CUSTOM_WISHES_KEY, customWishes);
    writeStoredList(WISH_VOTES_KEY, Array.from(wishedFor));
    renderWishes();
  }


  if (wishOptions) {

    wishOptions.addEventListener(
      "click",
      function (event) {

        const removeButton =
          event.target.closest("[data-remove-wish]");

        if (removeButton) {
          removeCustomWish(removeButton.dataset.removeWish);
          return;
        }

        const card = event.target.closest("[data-wish-id]");
        if (card) toggleWish(card.dataset.wishId);

      }
    );

  }


  if (wishForm) {

    wishForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const customWish =
          wishInput.value.trim();


        if (!customWish) {

          wishInput.focus();

          return;

        }


        const customId =
          "reader-wish-" + Date.now().toString(36);

        customWishes.push({
          id: customId,
          symbol: "✧",
          name: customWish,
          detail: "left at the table by you",
          custom: true
        });

        wishedFor.add(customId);
        writeStoredList(CUSTOM_WISHES_KEY, customWishes);
        writeStoredList(WISH_VOTES_KEY, Array.from(wishedFor));

        showWish("“" + customWish + "” joined the wishing table.");
        wishInput.value = "";
        renderWishes();

      }
    );

  }

  renderWishes();


  /* ==========================================================
     6. SCROLL REVEALS
     ========================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    reduceMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach(
      function (element) {
        element.classList.add(
          "is-visible"
        );
      }
    );

  } else {

    const observer =
      new IntersectionObserver(

        function (entries) {

          entries.forEach(
            function (entry) {

              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }
          );

        },

        {
          threshold: 0.12
        }

      );


    revealElements.forEach(
      function (element) {
        observer.observe(element);
      }
    );

  }

})();
