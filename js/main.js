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

    window.setTimeout(
      revealSite,
      reduceMotion ? 50 : 1900
    );
  }


  if (enterButton) {
    enterButton.addEventListener("click", openDoor);
  }


  if (skipEntrance) {
    skipEntrance.addEventListener("click", revealSite);
  }


  /* ==========================================================
     2. BOOK DATA
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


  const moodLabels = {
    enemies: "enemies-to-lovers",
    grey: "morally-grey",
    touch: "touch-her-and-die",
    onebed: "only-one-bed",
    fae: "fae-and-bad-decisions"
  };


  const bookGrid = document.getElementById("bookGrid");
  const moodTabs = document.getElementById("moodTabs");
  const shelfNote = document.getElementById("shelfNote");


  function renderBooks(mood) {

    if (!bookGrid || !books[mood]) {
      return;
    }

    bookGrid.innerHTML = "";


    books[mood].forEach(function (book, index) {

      const card = document.createElement("article");

      card.className =
        "book-card book-card--" + book.tone;


      const number = document.createElement("span");

      number.className = "book-card__number";

      number.textContent =
        String(index + 1).padStart(2, "0");


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

      card.appendChild(number);
      card.appendChild(middle);
      card.appendChild(comment);

      bookGrid.appendChild(card);

    });


    if (shelfNote) {
      shelfNote.textContent =
        "currently pulling from the " +
        moodLabels[mood] +
        " shelf";
    }

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
     3. INDIE AUTHOR FEATURE
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

      tone: "tone-plum"
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

      tone: "tone-wine"
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

      tone: "tone-moss"
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


    authorArt.classList.remove(
      "tone-plum",
      "tone-wine",
      "tone-moss"
    );

    authorArt.classList.add(
      author.tone
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
     4. WISHING TABLE
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


  let selectedWish = "";


  function selectWish(button) {

    const all =
      wishOptions.querySelectorAll(".wish-card");


    all.forEach(function (card) {
      card.classList.remove("is-selected");
    });


    button.classList.add("is-selected");

    selectedWish =
      button.dataset.wish || "";


    if (wishInput) {
      wishInput.value = "";
    }

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


  if (wishOptions) {

    wishOptions.addEventListener(
      "click",
      function (event) {

        const button =
          event.target.closest(".wish-card");

        if (!button) {
          return;
        }

        selectWish(button);

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


        const finalWish =
          customWish || selectedWish;


        if (!finalWish) {

          wishInput.focus();

          return;

        }


        showWish(finalWish);


        wishInput.value = "";
        selectedWish = "";


        wishOptions
          .querySelectorAll(".wish-card")
          .forEach(function (card) {

            card.classList.remove(
              "is-selected"
            );

          });

      }
    );

  }


  /* ==========================================================
     5. SCROLL REVEALS
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