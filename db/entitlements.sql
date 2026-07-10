-- Nederlands! premium entitlements table.
-- Apply this once in your chosen Supabase project (SQL editor, or supabase MCP apply_migration).
-- No public RLS policies: only the service_role key (used server-side in /api/*) can read/write.
-- The browser never talks to Supabase directly; it only calls /api/premium-status.

create table if not exists public.entitlements (
  device_id text primary key,
  premium boolean not null default false,
  stripe_customer_id text,
  stripe_session_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.entitlements enable row level security;
-- Intentionally no policies added: RLS with zero policies = deny-all for anon/authenticated,
-- which is correct here since access goes exclusively through the service_role key.

create index if not exists entitlements_stripe_customer_idx on public.entitlements (stripe_customer_id);
