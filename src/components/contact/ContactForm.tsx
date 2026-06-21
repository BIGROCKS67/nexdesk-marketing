"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitEnquiry } from "@/lib/os-api-client";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        whatsapp: String(form.get("whatsapp") || ""),
        details: String(form.get("details") || ""),
        source: "Marketing Website — Contact",
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
        <p className="font-display text-xl font-bold text-white">Thank you for reaching out.</p>
        <p className="mt-2 text-sm text-nx-grey">
          Your enquiry is in our sales system — a NexDesk consultant will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Your full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" name="company" required placeholder="Company name" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" required placeholder="you@company.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+971 00 000 0000" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp Number</Label>
        <Input id="whatsapp" name="whatsapp" type="tel" placeholder="+971 00 000 0000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="details">Project Details</Label>
        <Textarea
          id="details"
          name="details"
          rows={5}
          required
          placeholder="Tell us about your business and what you want to build."
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua font-semibold"
      >
        {loading ? "Sending…" : "Book Consultation"}
      </Button>
    </form>
  );
}
