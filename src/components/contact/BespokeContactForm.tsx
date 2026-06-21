"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bespokeSystemOptions } from "@/data/content";
import { submitEnquiry } from "@/lib/os-api-client";

export function BespokeContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [systemType, setSystemType] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    try {
      await submitEnquiry({
        name: String(form.get("name") || ""),
        company: String(form.get("company") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        details: String(form.get("details") || ""),
        system_type: systemType,
        source: "Marketing Website — Bespoke Systems",
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="font-display text-xl font-bold text-white">Thank you for your enquiry.</p>
        <p className="mt-2 text-sm text-nx-grey">
          Your requirements are now in our sales pipeline — we will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-6 sm:p-8">
      <div>
        <h2 className="font-display text-xl font-bold text-white">Discuss Your Bespoke System</h2>
        <p className="mt-1 text-sm text-nx-grey">
          Tell us what you need built — we will scope a solution around your workflows.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bespoke-name">Name</Label>
          <Input id="bespoke-name" name="name" required placeholder="Your full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bespoke-company">Company</Label>
          <Input id="bespoke-company" name="company" required placeholder="Company name" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bespoke-email">Email</Label>
          <Input id="bespoke-email" name="email" type="email" required placeholder="you@company.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bespoke-phone">Phone</Label>
          <Input id="bespoke-phone" name="phone" type="tel" placeholder="+971 00 000 0000" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>What type of system are you interested in?</Label>
        <Select value={systemType} onValueChange={(v) => setSystemType(v ?? "")} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a system type" />
          </SelectTrigger>
          <SelectContent>
            {bespokeSystemOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bespoke-details">Project Details</Label>
        <Textarea
          id="bespoke-details"
          name="details"
          rows={5}
          required
          placeholder="Describe your business, current tools, and what you want the system to do."
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button
        type="submit"
        disabled={loading || !systemType}
        className="w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua font-semibold"
      >
        {loading ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}
