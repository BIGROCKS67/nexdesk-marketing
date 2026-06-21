export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Custom Systems", href: "/solutions" },
  { label: "Websites", href: "/websites" },
  { label: "Prebuilt Systems", href: "/off-the-shelf" },
  { label: "Portfolio", href: "/our-work" },
  { label: "Contact", href: "/contact" },
] as const;

export const CLIENT_LOGIN_URL = "/client-portal/login";
export const BOOK_CONSULTATION_URL = "/contact";

export const footerLegalLinks = [
  { label: "Client Login", href: CLIENT_LOGIN_URL },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
] as const;
