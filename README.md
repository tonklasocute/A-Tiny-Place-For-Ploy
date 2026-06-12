# A Tiny Place For Ploy 🌷

> A small emotional interactive experience made for Ploy — someone brave enough to start again.

## Live Site

After deployment: `https://khomkrittk.github.io/A-Tiny-Place-For-Ploy/`

## What's Inside

6 interactive screens:
1. **Landing** — Pastel sky, floating clouds, sparkles
2. **Chat** — Messages from "Ploy from the Future" with typing animation
3. **Comfort Room** — Mochi the companion, interactive care actions
4. **Achievement** — Flower bloom animation, badge unlock
5. **Letter** — Handwritten-style letter with envelope open + hug button
6. **Final** — Night sky, stars, shooting stars, level-up screen

## Tech Stack

- React 18 + TypeScript
- Vite 5
- TailwindCSS 3
- Framer Motion 11
- Web Audio API (ambient ambient lo-fi chords, no files needed)

## Local Development

```bash
npm install
npm run dev
```

## Build & Deploy

### Option A — GitHub Actions (recommended)

1. Push this repo to `github.com/<your-username>/A-Tiny-Place-For-Ploy`
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` handles the rest
4. Site will be live at `https://<your-username>.github.io/A-Tiny-Place-For-Ploy/`

### Option B — Manual with gh-pages

```bash
npm install
npm run deploy
```

This runs `npm run build` then pushes `dist/` to the `gh-pages` branch.

## Folder Structure

```
src/
├── components/
│   ├── Screen1Landing.tsx    # Pastel sky intro
│   ├── Screen2Chat.tsx       # Typing chat messages
│   ├── Screen3Comfort.tsx    # Mochi + interaction buttons
│   ├── Screen4Achievement.tsx # Flower bloom + badge
│   ├── Screen5Letter.tsx     # Envelope + letter + hug
│   ├── Screen6Final.tsx      # Night sky + stars
│   ├── Cloud.tsx             # Animated cloud component
│   ├── FloatingParticles.tsx # Emoji particle system
│   ├── MochiCharacter.tsx    # SVG Mochi character
│   └── MusicButton.tsx       # Ambient music toggle
├── hooks/
│   └── useAmbientMusic.ts    # Web Audio API lo-fi generator
├── utils/
│   └── messages.ts           # Encouraging message pools
├── App.tsx
├── main.tsx
└── index.css
```

---

Made with love. 🌷
