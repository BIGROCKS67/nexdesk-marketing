"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { NexDeskLogo } from "@/components/brand/NexDeskLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClientPortal } from "@/contexts/ClientPortalContext";
import { DEMO_CLIENT_EMAIL, DEMO_CLIENT_PASSWORD } from "@/data/client-portal-demo";

export function ClientPortalLoginForm() {
  const { login } = useClientPortal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      router.push("/client-portal/app/dashboard");
    } else {
      setError("Invalid email or password. Use the demo credentials below.");
    }
  }

  function fillDemoCredentials() {
    setEmail(DEMO_CLIENT_EMAIL);
    setPassword(DEMO_CLIENT_PASSWORD);
    setError("");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <NexDeskLogo size={40} />
          </Link>
          <h1 className="mt-6 font-display text-2xl font-bold text-white">Client Portal</h1>
          <p className="mt-2 text-sm text-nx-grey">
            One login for all your businesses. Use a personal email to manage websites, systems, and subscriptions across every company you run with NexDesk.
          </p>
        </div>

        <div className="glass mb-4 rounded-2xl border border-nx-cyan/20 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-nx-cyan/10">
              <KeyRound className="h-4 w-4 text-nx-cyan" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-nx-cyan">
                Demo Login
              </p>
              <p className="mt-2 text-sm text-nx-grey">
                Live-synced with the staff portal — progress updates appear here automatically.
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-nx-grey">Email:</dt>
                  <dd className="font-mono text-white">{DEMO_CLIENT_EMAIL}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-nx-grey">Password:</dt>
                  <dd className="font-mono text-white">{DEMO_CLIENT_PASSWORD}</dd>
                </div>
              </dl>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fillDemoCredentials}
                className="mt-4 w-full border-nx-cyan/30 text-nx-cyan hover:bg-nx-cyan/10"
              >
                Fill Demo Credentials
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-6 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={DEMO_CLIENT_EMAIL}
              autoComplete="username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua font-semibold"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-nx-grey">
          Need access?{" "}
          <Link href="/contact" className="text-nx-cyan hover:underline">
            Book a consultation
          </Link>
        </p>
      </div>
    </div>
  );
}
