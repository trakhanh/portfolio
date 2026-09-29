import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

/** Old eOffice URL, kept so links shared before the rename still work. */
export const metadata: Metadata = { robots: { index: false, follow: true }, alternates: { canonical: "/projects/eoffice/" } };

export default function LegacyEofficePage() {
  return <LegacyRedirect to="/projects/eoffice/" />;
}
