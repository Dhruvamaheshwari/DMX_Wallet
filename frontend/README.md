<!-- @format -->

# DMX Wallet 🔐

A minimalist Solana wallet generator built with React and Node.js. Generate secure HD wallets with BIP39 mnemonic phrases.

![Black Theme](https://img.shields.io/badge/Theme-Dark-000000)
![Solana](https://img.shields.io/badge/Blockchain-Solana-9945FF)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB)

## ✨ Features

- **Generate HD Wallets** - Create Solana wallets using BIP39 mnemonic phrases
- **Multiple Wallets** - Generate multiple wallets from a single seed phrase
- **Secure Storage** - Keys stored locally in browser localStorage
- **Copy Mnemonic** - One-click copy of recovery phrase
- **Show/Hide Private Keys** - Toggle visibility of private keys
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Smooth Animations** - Clean UI with fade-in effects

## 🛠️ Tech Stack

**Frontend:**

- React 19
- Vite
- Tailwind CSS 4
- React Router DOM
- Axios
- React Icons

**Backend:**

- Node.js + Express
- @solana/web3.js
- bip39 (mnemonic generation)
- tweetnacl (cryptography)
- ed25519-hd-key (HD key derivation)
- bs58 (Base58 encoding)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/dmx-wallet.git
   cd dmx-wallet
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start the Backend Server**

   ```bash
   cd backend
   npm start
   ```

   Server runs on `http://localhost:4000`

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   App runs on `http://localhost:5173`

## 📁 Project Structure

```
web3/
├── backend/
│   ├── index.js          # Express server & wallet generation
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── Component/
│   │   │   ├── Home.jsx      # Landing page
│   │   │   ├── Solana.jsx    # Wallet generator
│   │   │   ├── Navbar.jsx    # Navigation bar
│   │   │   └── Ethereum.jsx  # (Coming soon)
│   │   ├── App.jsx           # Router setup
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles & animations
│   └── package.json
└── README.md
```

## 🔑 How It Works

1. **Generate Mnemonic** - Creates a 12-word BIP39 recovery phrase
2. **Derive Seed** - Converts mnemonic to cryptographic seed
3. **HD Derivation** - Uses path `m/44'/501'/{index}'/0'` for Solana
4. **Key Generation** - Creates Ed25519 keypair using tweetnacl
5. **Encode Keys** - Public key in Base58, private key in Base58

## ⚠️ Security Notice

> **This is a development/educational project.**
>
> - Never use generated wallets for real funds
> - Private keys are stored in localStorage (not secure for production)
> - Always use hardware wallets or audited software for real assets

## 🎨 Screenshots

- **Home Page** - Choose blockchain
- **Wallet Generator** - Generate and manage wallets
- **Dark Theme** - Minimal black UI

## 📝 License

MIT License

## 👤 Author

**Dhruva Maheshwari**

---

⭐ Star this repo if you found it helpful!
