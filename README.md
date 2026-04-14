# 🎵 Wonton's Sound

A fun, mobile-first soundboard web app. Each button plays a custom sound clip — tap one to play, tap again to stop. There's also a special **"Todos!"** button that fires all sounds at the same time.

## Features

- 🔊 One button per sound, with a photo and label
- ⏹️ Tap a playing button again to stop it
- 🎉 "Todos!" button plays all sounds simultaneously
- 📱 Fully responsive and optimised for mobile (safe areas, touch feedback, no tap delay)
- 🌙 Dark purple gradient UI

## Tech Stack

| | |
|---|---|
| **Framework** | [React 19](https://react.dev) |
| **Build tool** | [Vite](https://vite.dev) |
| **Language** | JavaScript (JSX) |
| **Styling** | Plain CSS with custom properties and `clamp()` for fluid sizing |
| **Audio** | Web Audio API via native `Audio` constructor |
| **Assets** | Images and audio files bundled through Vite's asset pipeline (`src/assets`) |

## Project Structure

```
soundboard/
├── public/                 # Static assets (favicon)
└── src/
    ├── assets/
    │   ├── audios/         # .m4a sound files
    │   └── images/         # Button photos
    ├── App.jsx             # Main component and all logic
    ├── App.css             # All styles
    └── main.jsx            # Entry point
```

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.
