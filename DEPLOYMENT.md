# 🚀 Production Deployment Guide — VIBECART STUDIO // ARCHIVE

This document provides complete instructions for deploying the **VIBECART STUDIO // ARCHIVE** modern e-commerce application to production environments including Vercel, Netlify, Docker, and static hosting platforms.

---

## 📋 1. Project Overview & Architecture

- **Framework**: React 18 with TypeScript 4.6
- **Styling**: Styled-Components with custom responsive theme tokens and CSS animations
- **State Management**: Modular React Context Providers with automatic `localStorage` persistence:
  - `ProductsProvider`: Catalog, filters, search, budget brackets, moods, occasions, and curated drops.
  - `CartProvider`: Shopping bag state, quantity adjustments, variants (sizes & colors), promo coupon engine.
  - `WishlistProvider`: Saved items management with quick bag migration.
  - `GamificationProvider`: VibeCoins loyalty wallet, daily spin wheel, shopping streaks, challenges, referrals.
  - `UserProvider`: Profile dashboard, simulated order history, tracking links, notifications & alerts, and toast system.
- **Data Model**: Hybrid local-first architecture. It connects to an optional headless REST API if `REACT_APP_API_URL` is set, and automatically falls back to the embedded high-resolution dataset (`src/services/mockProducts.ts`) with zero external service dependencies.

---

## ⚙️ 2. Environment Variables Configuration

Copy `.env.example` to create your environment configuration:

```bash
cp .env.example .env.production
```

| Variable Name                    | Required | Default             | Description                                                                                             |
| :------------------------------- | :------: | :------------------ | :------------------------------------------------------------------------------------------------------ |
| `REACT_APP_API_URL`              | Optional | `""`                | Headless REST API endpoint (`GET /products`). If omitted or unreachable, seamlessly uses local catalog. |
| `GENERATE_SOURCEMAP`             | Optional | `false`             | Disables sourcemap generation in production to reduce bundle size and protect source code.              |
| `REACT_APP_BRAND_NAME`           | Optional | `"VIBECART STUDIO"` | Brand title displayed across the app.                                                                   |
| `REACT_APP_ENVIRONMENT`          | Optional | `"production"`      | Runtime environment identifier.                                                                         |
| `REACT_APP_ENABLE_GAMIFICATION`  | Optional | `true`              | Enables/disables coins, spin wheel, streaks, and challenges.                                            |
| `REACT_APP_ENABLE_SPIN_WHEEL`    | Optional | `true`              | Controls daily spin wheel feature flag.                                                                 |
| `REACT_APP_ENABLE_NOTIFICATIONS` | Optional | `true`              | Controls notification center & alert badges.                                                            |

---

## 🛠️ 3. Building for Production Locally

To verify and test the production build locally:

```bash
# 1. Install dependencies
npm install

# 2. Compile optimized production build
npm run build

# 3. Serve the production build locally
npx serve -s build -l 3000
```

The optimized static assets will be output to the `build/` directory with gzip compression and cache-busting hashes.

---

## 🌐 4. Deployment Targets

### Option A: Deploy to Vercel (Recommended)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. In the Vercel dashboard, click **Add New Project** and select this repository.
3. Vercel automatically detects the Create React App configuration:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. The included `vercel.json` automatically configures:
   - Single Page Application (SPA) routing rewrites to `/index.html`.
   - 1-year immutable caching for static assets in `/static/`.
   - Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`).
5. Click **Deploy**.

---

### Option B: Deploy to Netlify

1. Link your repository in the Netlify dashboard.
2. Build settings are automatically detected via `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
3. The included `netlify.toml` handles SPA 200 rewrites and HTTP security headers.
4. Click **Deploy site**.

---

### Option C: Docker Containerization

A multi-stage `Dockerfile` and `nginx.conf` are pre-configured in the repository.

1. **Build Docker Image**:

```bash
docker build -t vibecart-studio:latest .
```

2. **Run Container**:

```bash
docker run -d -p 80:80 --name vibecart-app vibecart-studio:latest
```

3. Open `http://localhost` in your browser. The application is served by an alpine Nginx server with Gzip compression and SPA fallback.

---

## 🔒 5. Production Security & Performance Best Practices

- **Zero Secret Leakage**: No API keys, passwords, or cloud credentials exist in frontend code.
- **Client Resilience**: Protected by a top-level `<ErrorBoundary>` that prevents white-screen crashes if an unexpected client error occurs.
- **Content Security**: Static files configured with `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Strict-Transport-Security`.
- **Local Persistence**: Cart items, wishlist items, user profile changes, simulated orders, and coin balances are saved in isolated `localStorage` keys (`vibecart_*`) with safe JSON parse fallbacks.
