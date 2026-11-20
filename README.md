# ReviveAI — Autonomous AI Revenue Recovery Agent

> **Recover Lost Revenue. Automatically.**  
> An autonomous AI agent designed for high-velocity modern fintech and SaaS checkout systems, analyzing transaction declines, optimizing retry channels, executing intelligent gateway reroutes, and minimizing churn.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Executive Overview

In digital commerce and subscription SaaS, **payment failures cause 9–15% of involuntary customer churn**. Generic gateways simply retry declined cards blindly or fail transactions outright.

**ReviveAI** acts as an intelligent, autonomous layer between payment failure telemetry and payment routing:
- **Telemetry Ingestion**: Ingests decline codes, issuing bank latencies, card BIN details, and previous customer transaction behaviors.
- **Dynamic Decisioning**: Determines the optimal retry strategy — smart delayed retries, redundant gateway rerouting, customized WhatsApp/SMS checkout links, or manual review escalation.
- **Risk Guardrails**: Ensures strict compliance with configurable maximum autonomous caps, minimum AI confidence thresholds, and manual authorization gates.
- **End-to-End Simulation**: Built-in 6-stage operational sandbox allowing evaluation of real-time AI decision-making without external API dependencies.

---

## ✨ Key Features & Architecture

### 1. Revenue Recovery Command Center (`/dashboard`)
- Executive KPI tracking: **Revenue at Risk**, **Revenue Recovered**, **Recovery Rate**, and **Payments Recovered**.
- Dual-metric Recharts visualizations for financial cycles (7D, 30D, 90D, 1Y).
- Live real-time autonomous event stream with severity-coded event pings.

### 2. Autonomous AI Recovery Agent (`/ai-agent`)
- **Orbital Network Visualizer**: Interactive radar and concentric neural ring animation tracking live model computing states.
- **Case Review Panel**: Evaluates decline triggers, confidence scores, and probability models with quick **Approve**, **Reject**, or **Alter Action** controls.
- **Interactive Scenario Sandbox**: 4 live scenario benchmarks (Failed Card Payment, Abandoned Checkout, Subscription Mandate, High-Value Payment) with a step-by-step terminal process console.

### 3. Recovery Queue & Audit Ledger (`/queue`)
- Real-time tabular transaction management with multi-parameter filtering (Status, Method, Amount bracket).
- Full monospaced tabular numeric formatting (`font-numeric`) aligned to institutional fintech accounting standards.
- One-click approvals for cases flagged as `Needs Review`.

### 4. Failed Payments Telemetry (`/failed-payments`)
- Decline breakdown charts categorized by reason (Bank Decline, Insufficient Funds, Checkout Drop, Timeouts, Technical Errors).
- Volume distribution analytics with AI failure insights highlighting actionable routing opportunities.

### 5. Customer Intelligence (`/customers`)
- Lifetime Value (LTV) and transaction ledger mapping per customer.
- Sliding drawer revealing historical chronological transaction timelines and profile risk scoring.

### 6. Revenue Analytics & Channel Yields (`/analytics`)
- Conversion yields comparing channels (WhatsApp, Auto-Retry, Email Sequence, SMS).
- Success probability benchmarks across payment instruments (UPI, Credit/Debit Cards, Netbanking, Wallets).

### 7. Autonomous Workflows & Guardrails (`/automations` & `/guardrails`)
- **Visual Rule Editor**: Customizable trigger-to-action automation tree with delay intervals and probability thresholds.
- **Safety Guardrails**: Strict policy toggles for auto-retries, communication channels, refund limits, and confidence boundaries.

---

## 🎨 Design System

ReviveAI is built with a **Dark Executive Fintech + AI** design language:
- **Main Canvas**: `#07111F` (Deep Navy)
- **Secondary Shell**: `#0B1728`
- **Solid Cards**: `#101D30`
- **Subtle Borders**: `#1F3047`
- **Primary Brand Accent**: Electric Blue (`#3B82F6`)
- **AI Neural Accent**: Cyan (`#22D3EE`)
- **Financial Statuses**: Emerald Green (`#10B981`), Amber (`#F59E0B`), Sophisticated Red (`#EF4444`)
- **Typography**: Inter & Outfit with tabular-numeric alignment for financial data.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)

---

## 🚀 Quick Start (Local Installation)

This is a self-contained, frontend-only application with full simulated state management — no backend, database, or API keys required.

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/revive-ai.git

# Navigate to project directory
cd revive-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at: `http://localhost:5173/`

### Production Build

```bash
# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 👤 Author

**Tanishk Kumar**  
- GitHub: [@ktanishk568](https://github.com/ktanishk568)
- Email: ktanishk568@gmail.com

---

## 📄 License

This project is licensed under the MIT License.
