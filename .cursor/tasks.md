# 📋 Tasks

## 🎮 Game Support Expansion
- Add support for new game types:
  - 🎰 **Casino-style Wheel Game**: Configurable segments, spin animation, reward logic
  - 🎰 **Slot Machine Game**: Configurable reels, symbols, payout logic
- Ensure new games can reuse token-based iframe integration and admin features

## 🛠️ Admin Panel UI/UX
- Refine admin panel to look and feel like **Vercel** dashboard:
  - Modern UI with cards, tabs, charts
  - Live update experience (WebSockets or polling)
  - Responsive layout with theme support (light/dark)

## 🧾 Naming Convention Update
- Change game-related terminology to align with **casino-style naming**
- Refer to existing casino game documentation for:
  - “Hex” → “Tile” / “Slot” / “Spin Position”
  - “Mineral” → “Prize” / “Reward Symbol”
  - “Moves” → “Spins” / “Bets”
  - “Round” → “Game Session”
  - “Balance” → “Wallet” or “Credits”
- Update codebase, admin UI, and API responses accordingly
