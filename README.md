# UniSwap – HANU Student Marketplace

A front-end only web app where Hanoi University students can buy, sell, swap or give away used items.
No backend: data is stored in the browser (`localStorage`).

## Run
Open `index.html` in a browser (no build step). To publish: GitHub → Settings → Pages → Deploy from `main` branch.

## Project structure & team split
| Part | Files | Suggested owner |
|------|-------|-----------------|
| Layout, header, hero, footer, theme, app entry, UI helpers | `index.html`, `css/variables.css`, `css/base.css`, `js/ui.js`, `js/app.js` | Member A |
| Data, state, localStorage, filters UI | `js/data.js`, `js/state.js`, filter section in `index.html` | Member B |
| Listing cards, detail modal, favourites | `js/listings.js`, card styles in `css/components.css` | Member C |
| "Post an item" form | `js/post.js`, post modal in `index.html` | Member D |

## Git workflow
1. `git clone` the repo, then `git checkout -b feature/<your-part>`
2. Commit small, push your branch, open a Pull Request into `main`.
3. Only edit your own files to avoid merge conflicts.

## Ideas for next steps
Image upload, user login, chat with seller, real backend (Firebase / Node.js).
