export const clientPortalNav = [
  { label: "Dashboard", href: "/client-portal/app/dashboard", icon: "LayoutDashboard" },
  { label: "Subscriptions", href: "/client-portal/app/subscriptions", icon: "CreditCard" },
  { label: "Payments", href: "/client-portal/app/payments", icon: "Wallet" },
  { label: "Support", href: "/client-portal/app/support", icon: "MessageSquare" },
  { label: "Settings", href: "/client-portal/app/settings", icon: "Settings" },
] as const;

export const adminPortalNav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Clients", href: "/admin/clients", icon: "Users" },
  { label: "Projects", href: "/admin/projects", icon: "FolderKanban" },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: "CreditCard" },
  { label: "Payments", href: "/admin/payments", icon: "Wallet" },
  { label: "Websites", href: "/admin/websites", icon: "Globe" },
  { label: "Support", href: "/admin/support", icon: "MessageSquare" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
] as const;
