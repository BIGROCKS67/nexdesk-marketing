"use client";

import { useState } from "react";
import { Camera, CreditCard, UserPlus } from "lucide-react";
import { useClientPortal } from "@/contexts/ClientPortalContext";
import { PortalPageHeader } from "@/components/portal/PortalUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_CLIENT_ID, demoClient, getClientData } from "@/data/portal/mock-data";

export default function SettingsPage() {
  const { session } = useClientPortal();
  const profile = getClientData(session?.clientId ?? DEMO_CLIENT_ID).profile ?? demoClient;

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [inviteEmail, setInviteEmail] = useState("");
  const [team, setTeam] = useState(getClientData(session?.clientId ?? DEMO_CLIENT_ID).teamMembers);
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function inviteUser(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setTeam((t) => [
      ...t,
      { id: `tm-${Date.now()}`, email: inviteEmail.trim(), role: "viewer", status: "pending" },
    ]);
    setInviteEmail("");
  }

  return (
    <div className="space-y-8">
      <PortalPageHeader
        title="Settings"
        description="Manage your personal account. Use a personal email to access all your businesses from one login."
      />

      {/* Profile photo */}
      <div className="glass max-w-2xl rounded-xl p-5 sm:p-6">
        <h2 className="font-display text-base font-bold text-white">Profile Photo</h2>
        <div className="mt-4 flex items-center gap-5">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-nx-cyan/30 bg-nx-navy">
            <span className="font-display text-2xl font-bold text-nx-cyan">
              {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </span>
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center bg-nx-black/60 opacity-0 transition hover:opacity-100"
              aria-label="Upload photo"
            >
              <Camera className="h-5 w-5 text-white" />
            </button>
          </div>
          <div>
            <p className="text-sm text-nx-grey">Upload a profile photo or company logo.</p>
            <Button variant="outline" size="sm" className="mt-2" disabled>
              Upload image (coming soon)
            </Button>
          </div>
        </div>
      </div>

      {/* Personal details */}
      <form onSubmit={handleSave} className="glass max-w-2xl rounded-xl p-5 sm:p-6">
        <h2 className="font-display text-base font-bold text-white">Personal Details</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={2} />
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-white/5 bg-nx-black/30 px-4 py-3">
          <p className="text-xs text-nx-grey">Customer ID</p>
          <p className="font-mono text-sm text-white">{profile.customerId}</p>
        </div>
        <Button type="submit" className="mt-5 bg-nx-cyan text-nx-black hover:bg-nx-aqua">
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </form>

      {/* Payment method */}
      <div className="glass max-w-2xl rounded-xl p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-nx-cyan" />
          <h2 className="font-display text-base font-bold text-white">Payment Method</h2>
        </div>
        <p className="mt-2 text-sm text-nx-grey">
          When Stripe is connected, you&apos;ll be able to update card details securely via the Stripe Customer Portal.
        </p>
        <div className="mt-4 rounded-lg border border-white/5 bg-nx-black/30 px-4 py-3">
          <p className="text-xs text-nx-grey">Stripe Customer ID</p>
          <p className="font-mono text-sm text-white">{profile.stripeCustomerId}</p>
        </div>
        <Button variant="outline" className="mt-4" disabled>
          Update payment details (Stripe — coming soon)
        </Button>
      </div>

      {/* Team access */}
      <div className="glass max-w-2xl rounded-xl p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-nx-cyan" />
          <h2 className="font-display text-base font-bold text-white">Team Access</h2>
        </div>
        <p className="mt-2 text-sm text-nx-grey">
          Invite colleagues to view subscriptions, payments, and support — without sharing your login.
        </p>
        <ul className="mt-4 space-y-2">
          {team.map((member) => (
            <li key={member.id} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2 text-sm">
              <span className="text-white">{member.email}</span>
              <span className="text-xs capitalize text-nx-grey">{member.role} · {member.status}</span>
            </li>
          ))}
        </ul>
        <form onSubmit={inviteUser} className="mt-4 flex gap-2">
          <Input
            type="email"
            placeholder="colleague@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="outline">Invite</Button>
        </form>
      </div>
    </div>
  );
}
