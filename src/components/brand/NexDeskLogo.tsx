import { cn } from "@/lib/utils";

interface NexDeskLogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function NexDeskLogo({ className, size = 36, showWordmark = true }: NexDeskLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect width="40" height="40" rx="10" fill="#08111F" />
        <path
          d="M8 32 L8 8 L18 8 L28 22 L28 8 L32 8 L32 32 L28 32 L18 18 L18 32 Z"
          fill="#00E5FF"
        />
        <path
          d="M22 28 Q26 28 28 24 Q30 20 28 16 Q26 12 22 12 Q28 14 30 20 Q28 28 22 30 Z"
          fill="#2FE7E0"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-base font-bold tracking-tight sm:text-lg">
          <span className="text-white">Nex</span>
          <span className="text-nx-cyan">Desk</span>
        </span>
      )}
    </div>
  );
}
