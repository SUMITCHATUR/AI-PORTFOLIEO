# AI Futuristic Portfolio

A modern, animated personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- Animated landing hero with profile reveal, glow sweep, and typing effect
- Fully responsive futuristic dashboard-style UI
- Project cards with modal details and nested sub-project structure
- Public/private visibility handling
- Admin login and dashboard for managing projects, certificates, and resources
- File uploads backed by IndexedDB for local persistence
- Search, category filters, download actions, dark/light toggle, and visitor counter

## Folder Structure

```text
BUILD PORT/
├─ public/
│  └─ profile.jpeg
├─ src/
│  ├─ components/
│  ├─ data/
│  ├─ lib/
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## Setup

1. `npm install`
2. `npm run dev`
3. Open the local Vite URL in your browser

## Demo Login

- Email: `admin@portfolio.dev`
- Password: `admin123`

## Customize

- Edit seeded content in `src/data/defaultContent.js`
- Replace `public/profile.jpeg` with your preferred image
- Update GitHub, LinkedIn, mail, and demo URLs
- Add your real notes, certificates, and files from the dashboard after login

## Deployment

### Vercel

1. Push the project to GitHub
2. Import the repository into Vercel
3. Framework preset: `Vite`
4. Build command: `npm run build`
5. Output directory: `dist`

### Netlify

1. Create a new site from your Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`

## Notes

- Uploaded files are stored in the browser with IndexedDB, so they persist on the same browser/device.
- For production cloud storage and real multi-user auth, the clean next upgrade is Firebase Authentication + Firestore + Firebase Storage.
- If `public/profile.jpeg` is missing, add your image there and the hero animation will use it automatically.
