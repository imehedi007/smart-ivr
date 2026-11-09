# IFIC Bank Smart IVR (Visual IVR Frontend)

A modern, interactive, mobile-first **Visual IVR (VIVR)** web application engineered for **IFIC Bank PLC**. Built to bridge traditional telephony IVR (hotline `16255`) and digital self-service banking.

---

## 🌟 Key Features

1. **Faithful Visual IVR Reproduction**:
   - Accurately captures the brand visual identity and flows from the official IFIC Bank Visual IVR system (`ivr.ificbankbd.com`), including crimson red & emerald green brand accents, curved header badges, and structured service grids.
   - Preserves and advances patterns from previous prototype work, including mobile chassis framing, bilingual English & Bengali (বাংলা) support, dark mode toggling, search, and live connection diagnostics.

2. **Full Dynamic IVR Hierarchy**:
   - **Main Menu**: 8 primary IVR options (Customer Zone, Account Features, Loan Products, Interest Rates, Schedule of Charges, Feedback & Complaints, Financial Calculators, Branch & ATM Locator).
   - **IFIC Customer Zone (Secure)**: Protected with 6-digit OTP verification, real-time balance breakdown with hide/reveal toggle, card lock/unlock switch, and mini-statement transaction history.
   - **Account Features**: Deep dive into *IFIC Aamar Account* (daily balance profit calculation), *IFIC Shohoj Account*, and interactive side-by-side comparison table.
   - **Loan Products**: Showcase of *IFIC Aamar Bari* (Home Loan), *IFIC Shohoj Rin* (Personal Loan), *IFIC Aamar Rin* (SME), and *IFIC Aamar Suborno Gram* (Agri) with direct EMI calculator shortcuts.
   - **Interest & Currency Rates**: FDR deposit rates (1M to 36M), SMART lending benchmarks, live foreign currency rates (USD, EUR, GBP, SAR, AED, MYR, SGD) with interactive remittance estimator.
   - **Schedule of Charges**: Comprehensive fee directory for General Banking, Cards & Electronic Banking, Loans & Advances, and Remittance with VAT transparency.
   - **Feedback & Complaints**: Interactive feedback rating, formal complaint ticket generation (`IFIC-XXXXXX`), and Callback Request form.
   - **Financial Calculators**: Real-time slider-based calculators for FDR Maturity Value & Net Monthly Profit, and Loan Equal Monthly Installment (EMI).
   - **Branch & ATM Locator**: Regional breakdown (Dhaka, Chattogram, Sylhet, etc.), "Find My Nearest Branch" distance simulation, ATM/CDM filters, and click-to-call.

3. **Auditory & Telephony Integration**:
   - **Web Speech API Speech Synthesis**: Bilingual voice prompt readout for each screen in English and Bengali.
   - **Interactive DTMF Dialpad**: Dual-Tone Multi-Frequency (DTMF) Web Audio synthesis on keypad presses with direct IVR number key routing (Press 1 for Customer Zone, Press 2 for Account Features, etc.).
   - **Live Call Bar**: Active session duration counter (`03:14`), encrypted connection indicator, and disconnect confirmation dialog.

4. **Live Chat Assistant**:
   - Matches official IFIC Bank Live Chat interface with intake credentials form, quick FAQ prompts, and instant agent response simulation.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router)
- **Styling**: Tailwind CSS v4 with custom IFIC design tokens
- **Component Primitives**: shadcn/ui aesthetic principles
- **Animations**: GSAP (GreenSock) for card entrances and micro-interactions
- **Icons**: Lucide React
- **Audio**: Web Audio API (DTMF audio tone synthesis) & Web Speech API
- **Data Architecture**: Structured, typed JSON models in `src/data/ivr-data.ts`
- **Deployment**: Zero-config, production-ready for Vercel

---

## 📂 Project Structure

```text
smart-ivr/
├── src/
│   ├── app/
│   │   ├── globals.css              # IFIC brand tokens, animations, dark mode
│   │   ├── layout.tsx               # Root layout, viewport & SEO metadata
│   │   └── page.tsx                 # Master state & route coordinator
│   ├── components/
│   │   ├── common/
│   │   │   ├── IficLogo.tsx         # Official dual-diamond SVG vector logo
│   │   │   ├── MobileFrame.tsx      # Smartphone chassis & dynamic status bar
│   │   │   ├── IvrHeader.tsx        # Top call info, search, theme, lang toggles
│   │   │   ├── IvrBottomNav.tsx     # Keypad, back, audio speaker, home, power
│   │   │   ├── DialpadModal.tsx     # DTMF interactive telephone dialpad
│   │   │   ├── LiveChatModal.tsx    # Live chat intake form & assistant
│   │   │   ├── SearchModal.tsx      # Instant client-side banking search
│   │   │   ├── ConnectionStatusModal.tsx # System diagnostics & API health
│   │   │   └── EndCallModal.tsx     # Disconnect confirmation dialog
│   │   └── views/
│   │       ├── LandingView.tsx      # Initial welcome & language selector
│   │       ├── MainMenuView.tsx     # Grid & list IVR options with banner
│   │       ├── CustomerZoneView.tsx # OTP login, balance card & mini-statement
│   │       ├── AccountFeaturesView.tsx # Aamar vs Shohoj comparison
│   │       ├── LoanProductsView.tsx # Loan catalog & eligibility
│   │       ├── InterestRatesView.tsx# Deposit, exchange & lending rates
│   │       ├── ScheduleOfChargesView.tsx # Bank fee directory & VAT
│   │       ├── FeedbackComplaintsView.tsx # Feedback, complaint & callback
│   │       ├── CalculatorView.tsx   # FDR & Loan EMI calculators
│   │       └── BranchLocatorView.tsx# Nearest branch & division directory
│   ├── data/
│   │   └── ivr-data.ts              # Structured dynamic JSON data
│   ├── lib/
│   │   ├── audio.ts                 # DTMF generator & Web Speech synthesis
│   │   └── utils.ts                 # Formatting & class merging
│   └── types/
│       └── ivr.ts                   # TypeScript interfaces
├── package.json
└── README.md
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle (tested for Vercel)
npm run build
```

---

## 🎨 Asset Requirements for Production

All assets currently use scalable vector SVGs and CSS shapes to avoid missing image broken links. For production integration, the following real assets can be linked:
1. **Official High-Res Logos**: IFIC Bank PNG/SVG (`/public/brand/ific-logo.svg`)
2. **Recorded Audio Prompts**: Studio-recorded IVR prompts (`.mp3` / `.wav`) in Bengali & English for custom IVR audio streaming.
3. **Branch Photos**: Actual exterior photos for flagship branches and uposhakhas.
