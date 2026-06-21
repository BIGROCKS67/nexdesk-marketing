export const websitePackages = [
  {
    id: "starter",
    name: "Starter Website",
    price: "AED 2,995",
    hosting: "AED 36/month",
    highlighted: false,
    features: [
      "Up to 5 Pages",
      "2GB Media Storage",
      "Custom Website Design & Build",
      "Mobile Responsive Design",
      "SSL Certificate",
      "Domain Connection",
      "Basic SEO Optimisation",
      "Standard Support",
    ],
  },
  {
    id: "pro",
    name: "Pro Website",
    price: "AED 4,995",
    hosting: "AED 72/month",
    highlighted: true,
    features: [
      "Up to 15 Pages",
      "10GB Media Storage",
      "Custom Website Design & Build",
      "Mobile Responsive Design",
      "SSL Certificate",
      "Domain Connection",
      "Basic SEO Optimisation",
      "Performance Tracking",
      "Blog / News Section",
      "24/7 Priority Support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Website",
    price: "AED 11,995+",
    hosting: "AED 147/month",
    highlighted: false,
    features: [
      "Unlimited Pages",
      "50GB+ Media Storage",
      "Custom Website Design & Build",
      "Mobile Responsive Design",
      "SSL Certificate",
      "Domain Connection",
      "Enhanced SEO Optimisation",
      "User Portal / Login Area",
      "CRM Integration Included",
      "Appointment Booking Included",
      "Online Store Included",
      "24/7 Priority Support",
    ],
  },
] as const;

export type ComparisonCell = "yes" | "no" | string;

export const comparisonRows: {
  feature: string;
  starter: ComparisonCell;
  pro: ComparisonCell;
  enterprise: ComparisonCell;
}[] = [
  { feature: "Website Pages", starter: "Up to 5", pro: "Up to 15", enterprise: "Unlimited" },
  { feature: "Media Storage", starter: "2GB", pro: "10GB", enterprise: "50GB+" },
  {
    feature: "Custom Website Design & Build",
    starter: "yes",
    pro: "yes",
    enterprise: "yes",
  },
  {
    feature: "Mobile Responsive Design",
    starter: "yes",
    pro: "yes",
    enterprise: "yes",
  },
  { feature: "SSL Certificate", starter: "yes", pro: "yes", enterprise: "yes" },
  { feature: "Domain Connection", starter: "yes", pro: "yes", enterprise: "yes" },
  {
    feature: "SEO Optimisation",
    starter: "Basic",
    pro: "Basic",
    enterprise: "Enhanced",
  },
  {
    feature: "Performance Tracking",
    starter: "no",
    pro: "yes",
    enterprise: "yes",
  },
  { feature: "Blog / News Section", starter: "no", pro: "yes", enterprise: "yes" },
  {
    feature: "CRM Integration",
    starter: "no",
    pro: "Optional Extra",
    enterprise: "Included",
  },
  {
    feature: "Appointment Booking",
    starter: "no",
    pro: "Optional Extra",
    enterprise: "Included",
  },
  {
    feature: "Online Store",
    starter: "no",
    pro: "Optional Extra",
    enterprise: "Included",
  },
  {
    feature: "User Portal / Login Area",
    starter: "no",
    pro: "no",
    enterprise: "Included",
  },
  {
    feature: "Support Level",
    starter: "Standard",
    pro: "24/7 Priority",
    enterprise: "24/7 Priority",
  },
  {
    feature: "Monthly Hosting",
    starter: "AED 36",
    pro: "AED 72",
    enterprise: "AED 147",
  },
];

export const includedWithEveryWebsite = [
  "Custom Website Design & Development",
  "Mobile Responsive Layout",
  "SSL Certificate (HTTPS)",
  "Domain Connection Assistance",
  "Fast Loading Performance",
  "Cross Browser Compatibility",
  "Modern UI/UX Design",
  "24/7 Support Availability",
] as const;

export const optionalAddons = [
  { name: "Additional Page", price: "AED 250" },
  { name: "CRM Integration", price: "From AED 1,500" },
  { name: "Appointment Booking", price: "From AED 1,500" },
  { name: "AI Chat Assistant", price: "From AED 1,000" },
  { name: "E-Commerce Store", price: "From AED 3,000" },
  { name: "Membership Area / Client Portal", price: "From AED 3,000" },
] as const;
