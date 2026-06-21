"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";
import { NexDeskLogo } from "@/components/brand/NexDeskLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminPortal } from "@/contexts/AdminPortalContext";
import { DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD } from "@/data/client-portal-demo";

export function AdminLoginForm() {
  const { login } = useAdminPortal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid admin credentials.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <NexDeskLogo size={40} />
          </Link>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-nx-cyan" />
            <h1 className="font-display text-2xl font-bold text-white">Admin Portal</h1>
          </div>
          <p className="mt-2 text-sm text-nx-grey">Internal team access only.</p>
        </div>

        <div className="glass mb-4 rounded-2xl border border-amber-500/20 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Demo Admin</p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-nx-grey">Email:</dt>
              <dd className="font-mono text-white">{DEMO_ADMIN_EMAIL}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-nx-grey">Password:</dt>
              <dd className="font-mono text-white">{DEMO_ADMIN_PASSWORD}</dd>
            </div>
          </dl>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail(DEMO_ADMIN_EMAIL);
              setPassword(DEMO_ADMIN_PASSWORD);
              setError("");
            }}
            className="mt-4 w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
          >
            Fill Demo Credentials
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-6 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua font-semibold">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-nx-grey">
          <Link href="/client-portal/login" className="text-nx-cyan hover:underline">
            Client portal login
          </Link>
        </p>
      </div>
    </div>
  );
}
