# BuildLedger

Construction bookkeeping SaaS for bookkeepers who manage contractor clients in QuickBooks Online.

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Supabase** (auth + database)
- **QuickBooks Online API** (coming in Step 2)

---

## Setup

### 1. Supabase Project

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy your **Project URL** and **Anon Key** from Settings → API
3. In SQL Editor, run the contents of `supabase/schema.sql`
4. In Authentication → URL Configuration, add `http://localhost:3000/auth/callback` as a redirect URL

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Build Progress

- [x] **Step 1** — Auth (email/password login, dashboard)
- [ ] **Step 2** — QBO OAuth connection
- [ ] **Step 3** — Pull QBO projects & transactions
- [ ] **Step 4** — Job costing report
- [ ] **Step 5** — WIP report
- [ ] **Step 6** — Multi-client dashboard
- [ ] **Step 7** — PDF export
- [ ] **Step 8** — Stripe payments

---

## Deploy to Vercel (or Git push)

### Option 1: Push to Git (GitHub)

From the `construction-bookkeeper` folder:

```bash
git add .
git commit -m "Your message"
git push origin main
```

Your repo is already connected at `origin` (e.g. `https://github.com/algominds35/buildledger.git`). Push to deploy if you have Vercel connected to that repo.

### Option 2: Deploy to Vercel

**A. Connect via Vercel (Git)**

1. Go to [vercel.com](https://vercel.com) → Sign in → **Add New** → **Project**.
2. **Import** your GitHub repo (e.g. `algominds35/buildledger`).
3. Set **Root Directory** to `construction-bookkeeper` if the repo root is the parent folder; otherwise leave default.
4. Add **Environment Variables** (see list below), then **Deploy**.

**B. Or use Vercel CLI**

```bash
cd construction-bookkeeper
npx vercel
```

Follow the prompts. For production: `npx vercel --prod`. Add env vars in the Vercel dashboard (Project → Settings → Environment Variables).

**Required environment variables (Vercel / production)**

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `NEXT_PUBLIC_APP_URL` | Your app URL (e.g. `https://your-app.vercel.app`) |
| `QBO_CLIENT_ID` | QuickBooks Online app client ID |
| `QBO_CLIENT_SECRET` | QuickBooks Online app client secret |
| `QBO_ENVIRONMENT` | `sandbox` or `production` |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (for `/api/stripe/webhook`) |

After deploy, in Supabase **Authentication → URL Configuration** add your Vercel URL (e.g. `https://your-app.vercel.app/auth/callback`). In your **QuickBooks app** redirect URIs, add `https://your-app.vercel.app/api/qbo/callback`.
