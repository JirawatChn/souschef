# Sous Chef AI

An AI-powered culinary assistant that helps everyday users overcome daily meal decisions — recommending personalized menus from real ingredients and delivering accurate nutrition insights backed by trusted Thai recipe and dietary databases.

**Live:** [jirawatchn.github.io/souschef](https://jirawatchn.github.io/souschef)

---

## Problem Statement

| Problem | Description |
|---|---|
| Overchoice | Users struggle to decide what to eat daily |
| Taste-Health Tradeoff | Preferred flavors often conflict with nutritional needs |
| Nutrition Literacy | Accurate, standardized nutritional information is hard to access |

---

## Features

- **Personalized Recommendation** — suggests menus based on available ingredients and dietary requirements
- **Nutrition Analysis** — detailed nutritional breakdown per recommended dish
- **Multi-language Support** — Thai (default), English, and Chinese via i18next
- **Conversation History** — persists chat sessions locally per user
- **Personality Modes** — three AI personas: Sous Chef, Buddy, and Chef Ian

---

## Architecture

### Frontend

```
src/
├── App.tsx                  # Router + route definitions (basename: /souschef)
├── pages/                   # Home, Detail (chat), Recommendation, Random, History, Nutrition
├── components/
│   ├── mainLayout.tsx       # Global layout: sidebar + header
│   └── useHistory.tsx       # Chat history hook (localStorage)
├── contexts/
│   └── personalityContext.tsx  # AI personality mode (localStorage)
└── i18n.ts                  # Translations: th, en, cn
```

### AI Pipeline

```
User Input (ingredients / dietary needs)
  → NLP
    → FAISS vector search
      → Gemini
        → Menu Recommendation + Nutrition Summary
```

### API Contract

`POST ${VITE_API_URL}/ask`

```json
{
  "question": "string",
  "personality": "souschef | buddy | chef-ian",
  "lang": "th | en | cn"
}
```

Header: `X-Session-ID: <conversation UUID>`

---

## Data Sources

| Source | Usage |
|---|---|
| [NLOVECOOKING.COM](https://nlovecooking.com) | Authentic Thai recipes corpus |
| MAHIDOL FOOD DB 2025 | Nutritional data per ingredient/dish |
| WHO TABLE | Daily recommended nutrient intake standards |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui, Radix UI |
| Routing | React Router v7 |
| i18n | i18next (Thai default) |
| HTTP | Axios |
| Deployment | GitHub Pages |

---

## Getting Started

```bash
yarn install
yarn dev        # start dev server
yarn build      # type-check + production build
yarn preview    # preview production build locally
yarn deploy     # build + deploy to GitHub Pages
```

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_API_URL=https://your-backend-url
```

---

## Deployment

Deployed to GitHub Pages at `jirawatchn.github.io/souschef` via the `gh-pages` package.

```bash
yarn deploy
```
