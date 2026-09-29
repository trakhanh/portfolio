import type { Metadata } from "next";
import { ProjectDetailClient } from "@/app/projects/[slug]/ProjectDetailClient";
import { projectIds, projectMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projectIds().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return projectMetadata(slug, "en");
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
