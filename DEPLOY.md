# Synex420 v3 — Deploy via GitHub + Vercel (No Railway)

## Architecture
```
GitHub repo ──→ Vercel (auto-deploys on every push)
                  ├── /dist          (React frontend, built by Vite)
                  └── /api/**/*.ts   (MongoDB API, runs as serverless functions)
                           │
                           ↓
                  MongoDB Atlas (synex420 database)
```
Everything runs on Vercel. No separate backend server needed.

---

## OPTION A — GitHub + Vercel (recommended, auto-deploy on push)

### 1. Push to GitHub
```bash
# In your project folder:
git init
git add .
git commit -m "Synex420 v3 - MongoDB + Vercel"
git branch -M main
git remote add origin https://github.com/FREDPAT2024/Synex420-phase-1.git
git push -u origin main --force
```

### 2. Connect Vercel to GitHub
1. Go to **https://vercel.com** → Add New Project
2. Import your GitHub repo `FREDPAT2024/Synex420-phase-1`
3. Framework: **Vite** (auto-detected)
4. Build command: `vite build` (auto-detected)
5. Output directory: `dist` (auto-detected)
6. Click **Environment Variables** → add these 4:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://fredrickmumo3_db_user:YOUR_NEW_PASSWORD@synex420.je8rvdj.mongodb.net/synex420?retryWrites=true&w=majority&appName=Synex420` |
| `MONGODB_DB` | `synex420` |
| `JWT_SECRET` | `S4x420!vr$K9mNpQzLwBdHuYcJeRtFgAn2026ProdKey#XyZ` |
| `CLIENT_URL` | `https://YOUR-APP.vercel.app` *(update after first deploy)* |

7. Click **Deploy** → Done ✅

From now on: every `git push` → Vercel auto-deploys in ~60 seconds.

---

## OPTION B — Drag & Drop (no GitHub, no CLI)

1. Zip the project folder (excluding `node_modules/`)
2. Go to **https://vercel.com** → New Project → **drag and drop the zip**
3. Add the same 4 environment variables above
4. Click Deploy → Done ✅

---

## Step 3 — Create Your Admin Account (one time)

After deploy, open your Vercel URL and you'll see the login screen.  
Register via the API (copy this into your browser console or use Postman):

```js
fetch('https://YOUR-APP.vercel.app/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'fredrik@synex420.co.ke',
    password: 'YourStrongPassword123!',
    name: 'Fredrik Mumo',
    role: 'admin'
  })
}).then(r => r.json()).then(console.log)
```

Then log in at the app with those credentials.

---

## Step 4 — Verify the 3 Active Modules

| Module | Path | Test |
|--------|------|------|
| NHIF Claims | `/insurance` | Submit a test claim → check MongoDB |
| RPM Vitals | `/vitals` | Enter BP 180/110 → should trigger HIGH alert |
| Care Gaps | `/population` | Register patient with condition "Diabetes" → check gaps |

---

## MongoDB Atlas Indexes (run once — speeds up queries)

In Atlas → Browse Collections → Open Shell:
```js
db.patients.createIndex({ patientId: 1 }, { unique: true })
db.nhif_claims.createIndex({ claimId: 1 }, { unique: true })
db.nhif_claims.createIndex({ status: 1, patientId: 1 })
db.rpm_vitals.createIndex({ patientId: 1, recordedAt: -1 })
db.rpm_vitals.createIndex({ alertResolved: 1 })
db.care_records.createIndex({ patientId: 1, measureCode: 1 })
db.users.createIndex({ email: 1 }, { unique: true })
```

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `MongoServerError: bad auth` | Wrong password in MONGODB_URI → rotate in Atlas → Database Access |
| API returns 500 | Check Vercel → Functions → Logs for the exact error |
| Blank white page | Check Vercel → Deployments → Build logs |
| CORS error | Set `CLIENT_URL` in Vercel env vars to your exact Vercel URL |
| "Session expired" on refresh | Normal — JWT in sessionStorage. Log in again. |
