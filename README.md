# Between the Veil

A concept site for an imaginary romantasy bookshop — the bookstore-daydream
that "only appears when you wish for it." Built by Sagewave Web Design as a
portfolio piece and a sales surface: it shows indie authors and bookish small
businesses what their own site could be, instead of describing it in a
proposal.

## What's real and what isn't

This matters more than it sounds, because getting it wrong makes promises the
site can't keep.

- **The shop is invented.** Stated in the footer of every page, in the link
  preview text, and on the spotlight page itself.
- **The books on `shelves.html` are real.** Real titles, real authors, no
  cover images. Titles and names aren't copyrightable, so listing them is what
  any bookshop or review blog does. Cover *art* is copyrighted — that's why
  the cards are text-only, and it's the single decision keeping this page
  clean. Don't add cover images without a license or an affiliate program
  that grants image rights.
- **The spotlight authors are invented.** Wren Alcott, Idris Vane and Tova
  Marchetti do not exist. Featuring a *real* author would need their written
  consent covering their name, book, quotes, and any photo — and confirmation
  they hold rights to that photo, since headshots are usually the
  photographer's copyright.
- **There is no submission queue.** An earlier draft invited authors to send
  their books in. Since the site isn't maintained, that was a promise it
  couldn't keep, so the block now says what's true and points at Sagewave.
- **If affiliate links are ever added**, the FTC requires visible disclosure.

## The entrance
A photographic gothic door (with a vampiric bat knocker) fills the screen.
"Lift the knocker" swings both door halves open in 3D, a warm candlelight glow
blooms through the gap, and you step through into the shop.

The door is a **one-time gate**. Stepping through writes `veil-entered` to
sessionStorage; every page after that loads without it, and a returning
visitor lands straight on home. A new tab tomorrow gets the ritual again —
sessionStorage rather than localStorage, on purpose.

Every page except `/` loads ungated, so a spotlight link posted to social
opens on the author rather than on a door someone has to solve first. The
threshold also carries a keyboard-reachable "skip".

## Run it
Plain HTML/CSS/JS — no build step, no dependencies. Open `index.html` in a
browser, or host the folder on any static host (GitHub Pages, Netlify).

For GitHub Pages: push this folder to a repo, then Settings -> Pages -> deploy
from the main branch root.

## Pages
- `index.html`   — the threshold *and* home; the gate decides which you land on
- `shelves.html` — browse by feeling, not genre; mood filter over a book grid
- `spotlight.html` — the indie author series: current feature, archive, submissions
- `spotlight/`   — one file per featured author (`sample-feature.html` shows the shape)
- `portfolio.html` — case study, in plain voice, for clients and hiring managers

## Structure
- `css/style.css` — design tokens at top (faerie-twilight palette), then numbered sections
- `js/nav.js`     — the nav veil + current-page marking; loaded by every page
- `js/veil.js`    — motes, the door swing, the gate; `index.html` only
- `js/shelves.js` — the book array and the mood filter; `shelves.html` only
- `js/wishes.js`  — the wishing table; `index.html` only
- `img/`          — the door art, pre-split for the animation

## Home, in order
1. **Hero** — the only `<h1>`. Carries the one plain sentence a cold
   visitor must be able to read in five seconds.
2. **The spines** — five moods as books on a rail. Placed second because
   they demonstrate "browse by feeling" faster than a sentence can.
3. **The directory** — the page's single set of doors.
4. **The spotlight** — promoted here because it's the point of the site.
5. **Reading this moon** — three books, dated so it reads as alive
   rather than as a duplicate of `shelves.html`.
6. **What's on** — the events board.
7. **The wishing table** — interactive.
8. **The CTA.**

## Browser storage
Three keys, all client-side, nothing sent anywhere:

| Key | Store | Purpose |
|---|---|---|
| `veil-entered` | session | you're through the door; skip it on other pages |
| `veil-wishes` | local | which trinkets you wished for |
| `veil-wishes-own` | local | trinkets you typed yourself |

The door uses **session** storage so a new tab tomorrow gets the ritual
again. The wishing table uses **local** storage because a wish shouldn't
be forgotten when the tab closes.

All three degrade to "works, forgets you" if storage throws — which it
does in some private-browsing modes.

## The wishing table
A working demonstration of a product-request feature with no backend.
Your picks really persist; the crowd tallies beside each item (`seed` in
`js/wishes.js`) are **invented**, and the panel says so in `.wishtable__fine`.
Don't remove that line without removing the tallies — a fabricated
number that looks like other people is the same mistake as the fake
submission queue that used to sit on the spotlight page.

Visitor-typed wishes are built with `createElement`/`textContent`, never
string-interpolated into HTML, so typed markup is inert by construction.

## Responsive
Mobile-first, three breakpoints:

| Width | Container | Grids | Nav |
|---|---|---|---|
| ≤ 560px | full width | 1 column | veil overlay |
| ≥ 561px | 720px | 2 columns | veil overlay |
| ≥ 1024px | 1140px | 3–4 columns | horizontal bar |

The door caps at 620px and centres on wide screens rather than stretching —
a door stretched across a 1920px monitor stops reading as a door.

## The door image
`door-left.jpg` and `door-right.jpg` are the original door sliced down its
centre seam so each half can swing on its own hinge. To swap in a different
door: drop a new straight-on, centered, closed door image in `img/`, split it
down the middle into left/right halves at the same names, and you're done —
no code changes needed.

## Fonts
Cinzel (carved display) + Quicksand (soft rounded body), from Google Fonts.

## Adding a spotlight
Only `spotlight/wren-alcott.html` is built out — the other two archive cards
point at it, showing how the grid fills across a year without three near-
identical files to maintain.

To add a real one:
1. Copy `spotlight/wren-alcott.html` to `spotlight/<author-name>.html`.
2. Replace the copy, and update the `og:title` / `og:description` / `og:image`
   tags — without them the link preview on Instagram or Threads falls back to
   the door, and that preview is most of the click-through.
3. Update the `.sample-note` honesty line at the foot of the page, or remove
   it if the author is real and has consented in writing.
4. Add a `.candle` card to the archive in `spotlight.html` and point the
   current-feature blocks on `spotlight.html` and `index.html` at it.

## Adding a book
Append to the `BOOKS` array in `js/shelves.js` — `title`, `author`, `line`,
`mood`, plus optional `badge` and `series`. Moods are defined in `MOODS`
directly above it; the `id` doubles as the deep-link anchor from home
(`shelves.html#fae`) and the filter value. Currently 50 books, 10 per mood.

- `line` — keep it vibe-level rather than plot-specific. A wrong plot summary
  on a live site is embarrassing in a way "unwell about it" never is.
- `series` — **only for sequels.** It renders as a gold "don't start here"
  warning, so putting it on every book turns a useful signal into noise.
- `badge` — used sparingly (14 of 50). Also carries content warnings on the
  two genuinely dark entries.

All 50 author attributions were verified against Goodreads, publisher pages
and author sites. If you add more, verify them — this shelf is aimed at
readers who will notice a wrong author immediately.

Two shelving judgements worth knowing, in case a reader argues:

- *Six of Crows* is heist fantasy with a subordinate romance. It stays because
  "morally grey" is its whole brand and it's ubiquitous in these circles.
- Books with **no** central romance were cut for exactly that reason
  (*Vicious*, *The Atlas Six*, *The Bear and the Nightingale*). Subordinate
  romance is fine on a romantasy shelf; no romance isn't.

## Still to wire
Two `mailto:` links point at the placeholder `hello@sagewave.example` — one in
`portfolio.html` (the contact CTA), one in `js/veil.js` (the home CTA button).
Swap both for the real address before this goes anywhere public.
