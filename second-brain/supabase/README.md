# Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Copy `.env.example` to `.env.local` and fill in your Supabase URL and anon key
3. Run migrations:
   - Option A: Supabase Dashboard → SQL Editor → paste and run each migration file in order
   - Option B: `npx supabase link` then `npx supabase db push`
4. Enable Email auth in Authentication → Providers if needed
5. Create a Storage bucket named `references` (private) for file uploads
