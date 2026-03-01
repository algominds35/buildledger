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
