#!/usr/bin/env bash
set -euo pipefail
prisma generate
if [ -n "${DATABASE_URL:-}" ] || [ -n "${POSTGRES_URL:-}" ]; then
  export DATABASE_URL="${DATABASE_URL:-$POSTGRES_URL}"
  prisma db push --skip-generate
  npx tsx prisma/seed.ts || true
fi
next build
