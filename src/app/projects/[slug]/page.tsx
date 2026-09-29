import { ProjectDetailClient } from "./ProjectDetailClient";
import { Metadata } from "next";

const PROJECT_SLUGS = [
  "kt-ai-video-studio",
  "kt-voice-studio",
  "kt-epub-studio",
  "waveform-edit-studio",
  "hrm-application",
  "ai-creative-production",
  "recruitment-chatbot",
  "preorder-workshop-web",
  "internal-automation",
  "odoo-erp-demo",
  "amis-misa-erp",
  "computer-vision-inspection",
  "multi-task-learning",
  "finger-counting",
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
