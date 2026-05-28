import type { ReactNode } from "react";

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-muted/60 flex items-center justify-center p-0 md:p-8">
      <div className="w-full max-w-[420px] md:rounded-[44px] md:border-[10px] md:border-foreground/90 md:shadow-2xl bg-background overflow-hidden relative" style={{ height: "100dvh", maxHeight: "min(100dvh, 880px)" }}>
        <div className="h-full w-full flex flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}