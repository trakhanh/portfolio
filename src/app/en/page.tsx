import { HomeClient } from "@/components/HomeClient";
import { homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata("en");

export default function HomePageEn() {
  return <HomeClient />;
}
