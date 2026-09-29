"use client";

import { useEffect } from "react";

/** Client-side hop for moved pages; the meta refresh covers visitors without JS. */
export function LegacyRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to + window.location.hash);
  }, [to]);
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <meta httpEquiv="refresh" content={`0;url=${to}`} />
      <a href={to} className="text-signal underline underline-offset-4">
        {to}
      </a>
    </main>
  );
}
