# Sous Chef AI

An intelligent culinary assistant powered by AI and NLP, designed to enhance nutrition quality and food decision-making for consumers in the China-ASEAN region.

**Live:** [jirawatchn.github.io/souschef](https://jirawatchn.github.io/souschef)

---

## What it solves

- **Overchoice** — eliminates the "what should I eat today?" dilemma
- **Taste-Health Balance** — bridges preferred flavors with nutritional needs
- **Nutrition Knowledge** — surfaces accurate, standardized nutritional information

## Features

- **Personalized Recommendation** — suggests menus based on available ingredients and user requirements
- **Nutrition Analysis** — detailed nutritional facts for each recommended dish
- **Trustworthy Database** — data sourced from:
  - **NLOVECOOKING.COM** — authentic Thai recipes
  - **MAHIDOL FOOD DB 2025** — nutritional data
  - **WHO TABLE** — daily recommended nutrient intake standards

## How it works

```
Input (ingredients / dietary needs)
  → NLP → FAISS → Gemini
    → Menu + Nutrition Summary
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| UI Components | shadcn/ui, Radix UI |
| Routing | React Router v7 |
| i18n | i18next (Thai default, English, Chinese) |
| HTTP | Axios |
| Deployment | GitHub Pages |

## Getting Started

```bash
yarn install
yarn dev       # start dev server
yarn build     # type-check + production build
yarn preview   # preview production build locally
yarn deploy    # build + deploy to GitHub Pages
```

## Environment Variables

Create a `.env` file at the project root:

```
VITE_API_URL=https://your-backend-url
```

## Personality Modes

The assistant supports three AI personas selectable from the sidebar:

- **Sous Chef** — professional culinary guidance
- **Buddy** — casual, friendly food suggestions
- **Chef Ian** — creative chef with signature style

## Routes

| Path | Page |
|---|---|
| `/` | Home — ingredient input & chat |
| `/detail/:id` | Chat thread |
| `/recommendation` | Personalized menu recommendations |
| `/random` | Random dish discovery |
| `/history` | Conversation history |
| `/nutrition` | Nutrition analysis |
