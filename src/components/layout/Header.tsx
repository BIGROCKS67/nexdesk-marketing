"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NexDeskLogo } from "@/components/brand/NexDeskLogo";
import { ButtonLink } from "@/components/ui/button-link";
import { navLinks, CLIENT_LOGIN_URL } from "@/data/navigation";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  label,
  onClick,
  className,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative rounded-lg px-2.5 py-2 text-[13px] transition-colors xl:px-3 xl:text-sm",
        active ? "text-white" : "text-nx-grey hover:text-white",
        className,
      )}
    >
      {label}
      <motion.span
        className="absolute inset-x-2.5 -bottom-0.5 h-px origin-left bg-nx-cyan"
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="absolute inset-x-2.5 -bottom-0.5 h-px origin-left scale-x-0 bg-nx-cyan/60 transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-nx-black/90 backdrop-blur-xl supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)} aria-label="NexDesk home">
          <NexDeskLogo size={38} />
        </Link>

        <nav className="ml-8 hidden items-center gap-0.5 xl:ml-14 xl:gap-1 lg:flex">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <NavLink href={link.href} label={link.label} />
            </motion.div>
          ))}
        </nav>

        <div className="ml-auto hidden items-center lg:flex">
          <div className="ml-6 border-l border-white/10 pl-6 xl:ml-8 xl:pl-8">
            <ButtonLink
              href={CLIENT_LOGIN_URL}
              className="bg-nx-cyan px-4 text-nx-black hover:bg-nx-aqua font-semibold shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-shadow hover:shadow-[0_0_28px_rgba(0,229,255,0.25)]"
            >
              Login
            </ButtonLink>
          </div>
        </div>

        <button
          type="button"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-lg text-nx-grey lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-14 z-40 bg-nx-black/60 backdrop-blur-sm sm:top-16 lg:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-14 z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-white/10 bg-nx-black/98 backdrop-blur-xl sm:top-16 sm:max-h-[calc(100dvh-4rem)] lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <NavLink
                      href={link.href}
                      label={link.label}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3.5 text-base"
                    />
                  </motion.div>
                ))}
                <div className="mt-4 border-t border-white/5 pt-4">
                  <ButtonLink
                    href={CLIENT_LOGIN_URL}
                    onClick={() => setOpen(false)}
                    className="h-12 w-full justify-center bg-nx-cyan text-base text-nx-black hover:bg-nx-aqua font-semibold"
                  >
                    Login
                  </ButtonLink>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
