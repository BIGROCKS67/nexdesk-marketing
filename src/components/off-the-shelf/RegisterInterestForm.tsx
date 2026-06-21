"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { offTheShelfProducts } from "@/data/content";

export function RegisterInterestForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="font-display text-xl font-bold text-white">You are on the list.</p>
        <p className="mt-2 text-sm text-nx-grey">
          We will contact you when your selected product launches.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-6 sm:p-8">
      <div>
        <h2 className="font-display text-xl font-bold text-white">Register Your Interest</h2>
        <p className="mt-1 text-sm text-nx-grey">
          Be first to know when our off-the-shelf products go live.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="interest-name">Name</Label>
          <Input id="interest-name" name="name" required placeholder="Your full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interest-company">Company</Label>
          <Input id="interest-company" name="company" required placeholder="Company name" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="interest-email">Email</Label>
          <Input id="interest-email" name="email" type="email" required placeholder="you@company.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interest-phone">Phone</Label>
          <Input id="interest-phone" name="phone" type="tel" placeholder="+971 00 000 0000" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Product of Interest</Label>
        <Select name="product" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {offTheShelfProducts.map((p) => (
              <SelectItem key={p.id} value={p.name}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua font-semibold">
        Register Interest
      </Button>
    </form>
  );
}
