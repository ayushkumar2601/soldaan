SolDaan – Solana Devnet Faucet

SolDaan is a minimal, modern, glass-UI Solana Devnet Faucet that allows users to instantly request test SOL to their wallet.
Built with Next.js, Solana Wallet Adapter, and TailwindCSS, SolDaan is designed for builders, testers, and developers who want a fast and reliable way to get devnet SOL.

Live Demo → https://soldaan.vercel.app

✨ Features

Instant Devnet SOL Airdrops

Beautiful glass-morphism UI

Phantom + Solflare wallet support

Cooldown timer (anti-spam protection)

Custom Alchemy RPC for stability

Dedicated airdrop RPC to avoid 429 rate limits

Responsive layout with no scrolling design

Toast notifications for success/error

Wallet connect + disconnect UI

🛠️ Tech Stack

Next.js 14 (App Router)

React

Tailwind CSS

Solana Wallet Adapter

Web3.js

Lucide Icons

Vercel Deployment

📦 Installation
git clone https://github.com/<your-username>/soldaan.git
cd soldaan
npm install
npm run dev

⚙️ Environment Setup

No environment variables are required unless you want to add custom RPCs.

Default RPC used for airdrops:

https://api.devnet.solana.com


Default wallet provider RPC (Alchemy devnet):

https://solana-devnet.g.alchemy.com/v2/<your-key>

🚀 Running Locally

Start the development server:

npm run dev


App runs at:

http://localhost:3000

📁 Project Structure
/app
  page.tsx              # Main UI layout
/components
  solana-wallet-provider.tsx
  navbar.tsx
  hero.tsx
  faucet-form.tsx       # Core faucet logic + UI
  ui/*                  # Custom UI components (input, button, toast)

🏗️ How It Works

User connects Phantom/Solflare wallet

Enters amount (0.1–2 SOL)

Backend triggers Solana devnet airdrop using a dedicated RPC

Transaction is confirmed using latest blockhash

Cooldown begins

Toast message displays explorer link

This ensures smooth airdrops even when public RPCs are rate-limited.


🌐 Deployment

Easily deploy to Vercel:

vercel deploy


Live URL example:

https://soldaan.vercel.app

🤝 Contributing

Contributions are welcome!
Feel free to submit issues or pull requests.

📜 License

MIT License © 2025
Built with passion in India 🇮🇳
