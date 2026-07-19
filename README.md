# Between the Veil

A concept site for an imaginary romantasy bookshop — the bookstore-daydream
that "only appears when you wish for it." Built as a portfolio / inspiration
piece by Sagewave Web Design, structured so it can seed a real client build.

## The entrance
A photographic gothic door (with a vampiric bat knocker) fills the screen.
"Lift the knocker" swings both door halves open in 3D, a warm candlelight glow
blooms through the gap, and you step through into the shop.

## Run it
Plain HTML/CSS/JS — no build step. Open `index.html` in a browser, or host the
folder on any static host (GitHub Pages, Netlify).

For GitHub Pages: push this folder to a repo, then Settings -> Pages -> deploy
from the main branch root. Open the link on a phone and "Add to Home Screen"
for a full-screen, app-like view to screen-record.

## Structure
- index.html      — semantic markup; edit copy here
- css/style.css   — design tokens at top (faerie-twilight palette), then sections
- js/veil.js      — motes, the door-swing entrance, and shop reveal
- img/            — the door art, pre-split for the animation:
                    door.png (original), door-full.jpg (fallback),
                    door-left.jpg / door-right.jpg (the two swinging halves)

## The door image
door-left.jpg and door-right.jpg are the original door sliced down its centre
seam so each half can swing on its own hinge. To swap in a different door:
drop a new straight-on, centered, closed door image in img/, split it down the
middle into left/right halves at the same names, and you're done — no code
changes needed.

## Fonts
Cinzel (carved display) + Quicksand (soft rounded body), from Google Fonts.

## Making it a real site
Notes are inline in the CSS. In short: lift the max-width caps on
.threshold / .shop, switch the card grids to auto-fit, and wire the Sagewave
CTA (#ctaBtn in js/veil.js) to a real contact form or mailto.