# Kritika Sharma — Personal Blog

A minimalist personal blogging website with warm dark aesthetics, smooth animations, and AI-powered features.

**Live Site:** https://my-blog-amber-eta-71.vercel.app
**Sanity Studio (Admin):** https://my-blog-amber-eta-71.vercel.app/studio
**GitHub:** https://github.com/kritikasharma4/my-blog

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS with custom warm dark design tokens
- **CMS:** Sanity v5 (embedded Studio at `/studio`)
- **Animations:** Framer Motion
- **AI Chat:** Groq LLaMA 3.1 8B (free tier)
- **Vector Search:** Supabase pgvector (RAG)
- **Embeddings:** HuggingFace BAAI/bge-base-en-v1.5 (free)
- **Deployment:** Vercel

---

## Signature Features

### Melting Candle Reading Progress
A scroll-driven SVG candle that melts as you read — flame flickers, wax drips, smoke appears when you finish.

### Ask the Author AI Chat
A floating chat panel on every post page. Answers questions grounded in the author's own writing using RAG (Retrieval-Augmented Generation) — Groq streaming + Supabase pgvector.

---

## Local Development

### 1. Clone the repo

```bash
git clone https://github.com/kritikasharma4/my-blog.git
cd my-blog
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
SANITY_WEBHOOK_SECRET=your_webhook_secret

GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
HF_API_KEY=hf_your_huggingface_token
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Sanity Studio runs at [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Environment Variables

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | [sanity.io/manage](https://sanity.io/manage) → your project |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` (default) |
| `SANITY_API_TOKEN` | Sanity → API → Tokens → Editor role |
| `SANITY_WEBHOOK_SECRET` | Any random string you choose |
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) → API Keys |
| `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `SUPABASE_SERVICE_KEY` | Supabase → Project Settings → API → service_role key |
| `HF_API_KEY` | [huggingface.co](https://huggingface.co) → Settings → Access Tokens |

---

## Supabase Setup

Run this SQL in Supabase → SQL Editor:

```sql
create extension if not exists vector;

create table post_chunks (
  id          uuid primary key default gen_random_uuid(),
  post_slug   text not null,
  post_title  text not null,
  chunk_text  text not null,
  embedding   vector(768),
  created_at  timestamptz default now()
);

create or replace function match_chunks(
  query_embedding vector(768),
  match_count int default 4
)
returns table (
  id uuid,
  post_slug text,
  post_title text,
  chunk_text text,
  similarity float
)
language sql stable
as $$
  select
    id, post_slug, post_title, chunk_text,
    1 - (embedding <=> query_embedding) as similarity
  from post_chunks
  order by embedding <=> query_embedding
  limit match_count;
$$;
```

---

## Sanity Webhooks

Set up two webhooks in [sanity.io/manage](https://sanity.io/manage) → API → Webhooks:

**1. Revalidate pages on publish:**
- URL: `https://my-blog-amber-eta-71.vercel.app/api/revalidate?secret=YOUR_WEBHOOK_SECRET`
- Filter: `_type == "post" || _type == "category"`
- Trigger on: Create, Update, Delete

**2. Embed posts for AI chat:**
- URL: `https://my-blog-amber-eta-71.vercel.app/api/embed?secret=YOUR_WEBHOOK_SECRET`
- Filter: `_type == "post"`
- Trigger on: Create, Update, Delete

---

## Project Structure

```
my-blog/
├── app/
│   ├── [slug]/          # Individual post pages
│   ├── about/           # About page
│   ├── category/[slug]/ # Category pages
│   ├── api/
│   │   ├── ask/         # AI chat endpoint (RAG + Groq)
│   │   ├── embed/       # Post embedding endpoint
│   │   └── revalidate/  # ISR revalidation endpoint
│   └── studio/          # Embedded Sanity Studio
├── components/
│   ├── animations/      # Framer Motion components
│   ├── ask-author/      # AI chat UI
│   ├── feed/            # Homepage post grid + category filter
│   ├── layout/          # Navbar, Footer
│   ├── post/            # Post page components
│   └── ui/              # MeltingCandle, ScrollArrow, Tag
├── lib/
│   ├── sanity.ts        # Sanity client + GROQ queries
│   ├── supabase.ts      # Supabase client
│   └── embeddings.ts    # HuggingFace embedding utilities
└── sanity/
    └── schemas/         # Post, Category, Author schemas
```

---

## Writing Posts

1. Go to [/studio](https://my-blog-amber-eta-71.vercel.app/studio) on your live site
2. Create **Categories** first (Essays, Design, Thoughts, etc.)
3. Create a **Post** — add title, cover image, body, category → Publish
4. The site auto-updates via webhooks within seconds
5. The AI chat learns from your post automatically via the embed webhook
