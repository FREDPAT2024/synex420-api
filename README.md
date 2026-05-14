# Synex420 HIMS — Phase 1

**Production-grade Hospital Information Management System** built for Kenya's healthcare ecosystem. Covers clinical, financial, administrative, and governance workflows.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- A Firebase project with Firestore & Authentication enabled

### 1. Clone & Install
```bash
git clone https://github.com/FREDPAT2024/Synex420-phase-1.git
cd Synex420-phase-1
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env and fill in your Firebase credentials
```

### 3. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a project → Add a Web App → copy the config into `.env`
3. Enable **Authentication** → Sign-in methods → Google + Email/Password
4. Enable **Firestore Database** → Start in production mode
5. Add your domain to **Authorized Domains** under Authentication → Settings

### 4. Run Locally
```bash
npm run dev        # Development server on :3000
npm run build      # Production build
npm run preview    # Preview production build
```

---

## 📁 Project Structure
```
src/
├── components/
│   ├── AuthProvider.tsx     # Firebase auth context
│   ├── Layout.tsx           # App shell, login screen, header
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── clinical/            # ICD diagnosis selector
│   ├── ui/                  # Toast, Modal, Input, Select
│   └── workspace/           # PageHeader, WorkspacePanel, StatsBar, Footer
├── lib/
│   ├── firebase.ts          # Firebase init (env-aware)
│   ├── dbService.ts         # Firestore CRUD helpers
│   ├── icd-loader.ts        # IndexedDB-based ICD-10/11 search
│   └── utils.ts             # cn() classname utility
├── pages/                   # 30+ clinical & admin modules
└── types.ts                 # TypeScript interfaces
```

---

## 🔑 Authentication
Supports two sign-in methods:
- **Email/Password** — standard Firebase auth
- **Google SSO** — one-click via Google account

---

## 🩺 Modules
| Area | Modules |
|---|---|
| Patient | Dashboard, Registration, Search, Population Health |
| Clinical | Consultations (SOAP), Nursing, Clinical Notes, Vitals |
| Acuity | Emergency (ESI Triage), Inpatient/Bed Mgmt, Surgery OT, Maternity |
| Diagnostics | Laboratory (LIS), Radiology (RIS), Pharmacy (PMS) |
| Finance | Billing, Insurance/NHIF, Accounting, Procurement |
| Governance | Quality, Analytics BI, Security & Audit |
| System | Admin, Settings, Interoperability, Mobile |

---

## 🌍 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
# Set VITE_ environment variables in Vercel dashboard
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## 🔒 Security
- Firestore rules enforce authenticated access only
- All patient record access is logged per KMPDC/HIPAA requirements
- Role-based access control ready (configured via Settings → Security & RBAC)

---

## 📞 Support
**Email:** support@synex420.co.ke  
**System:** Synex420 HIMS v1.0 — Phase 1
