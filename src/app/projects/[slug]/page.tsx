import { ProjectDetailClient } from "./ProjectDetailClient";
import { Metadata } from "next";

const PROJECT_SLUGS = [
  "kt-ai-video-studio",
  "kt-voice-studio",
  "kt-epub-studio",
  "computer-vision-inspection",
  "multi-task-learning",
  "finger-counting",
  "recruitment-chatbot",
  "internal-automation",
  "preorder-workshop-web",
  "hrm-application",
  "ai-creative-production",
];

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({
    slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Case Study: ${slug} — Trà Nguyễn Gia Khánh`,
    description: `Chi tiết dự án, bài toán, quy trình và kết quả triển khai case study ${slug}.`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
