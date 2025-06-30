# 🧱 Miner Simulation Game - Overview

## 🏗️ Project Summary
A **browser-based mining simulation game** using a **hexagonal grid system**, focused on:
- **Embedding via iframe**
- **Token-based API integration**
- **Multilingual support**
- **Customizable admin controls**

---

## 🎯 Key Goals
- **High Accessibility**: Lightweight, embeddable in partner websites
- **User Engagement**: Risk-reward gameplay and round-based progression
- **Scalability**: Configurable assets, real-time admin control, analytics

---

## 👥 Core User Stories
- **Casual Player**: Quick start, easy rules
- **Strategic Player**: Analyze hex patterns, max rewards
- **Website Owner**: Easy iframe integration with token
- **Admin**: Live control over rewards and minerals
- **International User**: Localized content

---

# ⚙️ Game Requirements

## ✅ P0 - Must Have
**Core Gameplay**:
- Hex grid (≥19 cells)
- Click to purchase hex
- Randomized minerals (oil/gold/diamond/rock/dust)
- Reward = multiplier × cost
- Round system with resets
- Player balance

**Tech Infra**:
- Works on all major browsers
- Iframe + token support
- REST API
- Responsive design

**Security**:
- Token validation
- Rate limits, input sanitization

## ⚠️ P1 - Should Have
- Multilingual (5+)
- Admin panel (real-time config)
- Player stats & analytics
- Custom mineral/reward configs
- Smooth animations, onboarding UX

## ✨ P2 - Nice to Have
- SFX, background music
- Leaderboards, achievements
- Social sharing
- PWA support & A/B tests

---

# 🧰 Admin Panel Highlights
- Real-time mineral & multiplier adjustment
- Config:
  - Hex per map
  - Moves per round
  - Starting balance
- Live revenue + player tracking

---

# 🔒 Security & Embedding

## JWT-based Iframe Embedding
- Validates:
  - Origin
  - Token permissions
- Custom claims:
  - Can customize assets?
  - Can access analytics?
  - Can modify configs?

## CORS + Rate Limiting + Input Validation

---

# 🧱 Architecture Overview

## 🔧 Services:
- **Game / Player / Admin / Analytics / Assets**

## 📦 Data:
- PostgreSQL + Redis + S3 + Log Storage

## 🌐 Layers:
- CDN (CloudFlare) → API Gateway → Services

## Frontend:
- React (Vite, TypeScript)
- Zustand state
- Component-driven (GameBoard, HexGrid, AdminPanel)

## Backend:
- Node.js (Express + Prisma + JWT)
- Game logic (mineral calc, round logic)
- Authentication middleware

## DevOps:
- Docker + GitHub Actions
- Monitored with Prometheus/Grafana
- Logs with Winston + ELK + Sentry

---

# 📁 Code Standards (Tech Style Guide)

## 💻 Stack
- **Frontend**: React, Shadcn, Zustand, Tailwind
- **Backend**: Node.js, Express, Prisma
- **Testing**: Jest, Supertest
- **Validation**: Zod
- **Infra**: Docker, GitHub Actions, CloudFlare, AWS/GCP

## 🔤 Naming
- **Components**: PascalCase
- **Hooks/Utils**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types**: PascalCase (with `I` prefix for interfaces)

## 📦 Project Structure
```
frontend/src/
├── components/game/HexagonGrid.tsx
├── hooks/useGameState.ts
├── utils/gameLogic.ts
└── types/Game.ts

backend/src/
├── controllers/gameController.ts
├── middleware/auth.ts
├── services/gameService.ts
└── routes/api.ts
```

## 🌍 API Design
- RESTful, versioned (`/api/v1/`)
- Standard response wrapper `{ success, data, error, meta }`

## 🧪 Testing
- Component tests (React Testing Library)
- API tests (Supertest)

## ⚙️ CI/CD & Performance
- GitHub Actions build/test pipeline
- FCP < 1.5s, LCP < 2.5s
- Backend API: < 200ms 95th percentile

---

# 🛡️ Database Schema

- **Partners** → **Embed Tokens**
- **Game Configs** → **Game Sessions** → **Game Actions** + **Analytics Events**

Tables follow:
- `snake_case`
- Indexed foreign keys
- JSONB for config fields

---

# 📊 Monitoring & Metrics
- Prometheus (metrics) + Grafana (dashboards)
- Sentry (errors)
- Key metrics:
  - Active games
  - Reward distribution
  - Conversion rate

---

# ☁️ Deployment & Recovery
- Docker + Kubernetes
- Auto-scaling + health checks
- Backups (PostgreSQL, Redis, S3)
- Disaster recovery: AOF, snapshots, git-based IaC

---