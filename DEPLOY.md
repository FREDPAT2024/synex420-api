# Synex420 v3 — Deployment Guide (Tonight)

## Architecture
```
Browser (React/Vite) ──→ Vercel (frontend)
                              │
                              ↓ /api/*
                     Railway/Render (Express API)
                              │
                              ↓
                     MongoDB Atlas (synex420)
```

---

## Step 1 — Fill in your NEW MongoDB Password

Open `.env` and replace `YOUR_NEW_PASSWORD_HERE` with the password you just set in Atlas:

```
MONGODB_URI=mongodb+srv://fredrickmumo3_db_user:NEW_PASSWORD@synex420.je8rvdj.mongodb.net/synex420?...
```

---

## Step 2 — Deploy the API to Railway (Free, 5 minutes)

1. Go to **https://railway.app** → New Project → Deploy from GitHub
2. Select your `Synex420-phase-1` repo
3. Set **Root Directory** to `/` (leave blank)
4. Set **Start Command**: `node dist-server/index.js`
5. Add these **Environment Variables** in Railway dashboard:

```
MONGODB_URI        = (your full Atlas URI with new password)
MONGODB_DB         = synex420
JWT_SECRET         = S4x420!vr$K9mNpQzLwBdHuYcJeRtFgAn2026ProdKey#XyZ
NODE_ENV           = production
PORT               = 4000
CLIENT_URL         = https://YOUR-APP.vercel.app
```

6. Deploy. Railway gives you a URL like `https://synex420-api-production.up.railway.app`
7. Test: open `https://YOUR-API-URL/api/health` — should return `{"status":"ok"}`

---

## Step 3 — Deploy Frontend to Vercel (Free, 3 minutes)

1. Go to **https://vercel.com** → New Project → Import your GitHub repo
2. Framework: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add this **Environment Variable** in Vercel:

```
VITE_API_URL = https://YOUR-API-URL.up.railway.app
```

6. Deploy. Vercel gives you `https://synex420.vercel.app`
7. Go back to Railway → update `CLIENT_URL` = `https://synex420.vercel.app`

---

## Step 4 — Create Your First Admin Account

Once the API is live, create your account via curl or Postman:

```bash
curl -X POST https://YOUR-API-URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"fredrik@synex420.co.ke","password":"YourStrongPassword","name":"Fredrik Mumo","role":"admin"}'
```

Or open the app → Login page → use the credentials you just created.

---

## Step 5 — Verify 3 Active Modules

| Module | URL | What to test |
|--------|-----|-------------|
| NHIF Claims | `/insurance` | Submit a test claim |
| RPM Vitals | `/vitals` | Record vitals, trigger an alert |
| Care Gaps | `/population` | Add a diabetic patient, check gaps appear |

---

## Alternative: Run Locally First

```bash
npm install
cp .env.example .env
# Fill in .env with your credentials

# Terminal 1 - API
npm run dev:server

# Terminal 2 - Frontend  
npm run dev:client

# Open http://localhost:3000
```

---

## MongoDB Indexes (run once for performance)

In MongoDB Atlas → Browse Collections → Shell:

```js
db.patients.createIndex({ patientId: 1 }, { unique: true })
db.patients.createIndex({ "conditions": 1 })
db.nhif_claims.createIndex({ claimId: 1 }, { unique: true })
db.nhif_claims.createIndex({ status: 1 })
db.nhif_claims.createIndex({ patientId: 1 })
db.rpm_vitals.createIndex({ patientId: 1, recordedAt: -1 })
db.rpm_vitals.createIndex({ alertResolved: 1 })
db.care_records.createIndex({ patientId: 1, measureCode: 1 })
```

---

## Troubleshooting

**"MongoServerError: bad auth"** → Wrong password in MONGODB_URI. Rotate again in Atlas → Database Access.

**CORS error in browser** → Set `CLIENT_URL` in Railway to your exact Vercel URL (no trailing slash).

**Blank page on Vercel** → Check Vercel logs. Usually means `VITE_API_URL` not set or wrong.

**"Session expired" on refresh** → Normal — JWT stored in sessionStorage. Log in again.
