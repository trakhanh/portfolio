import type { Locale } from "@/types/portfolio";

export const CONTACT = {
  email: "khanhtra229@gmail.com",
  phone: "0792 661 744",
  socials: [
    { name: "LinkedIn", handle: "khanhtra229", url: "https://www.linkedin.com/in/khanhtra229/", icon: "linkedin.svg" },
    { name: "GitHub", handle: "trakhanh", url: "https://github.com/trakhanh", icon: "github.svg" },
    { name: "Facebook", handle: "kthietkek", url: "https://www.facebook.com/kthietkek/", icon: "facebook.svg" },
  ],
} as const;

/** Maps a tool name to its icon in /public/img/tool-icons. */
export const TOOL_ICONS: Record<string, string> = {
  Python: "python.svg",
  PyTorch: "pytorch.svg",
  OpenCV: "opencv.svg",
  Jupyter: "jupyter.svg",
  ChatGPT: "openai.svg",
  Claude: "anthropic.svg",
  Gemini: "googlegemini.svg",
  NotebookLM: "notebooklm.svg",
  n8n: "n8n.svg",
  "Google Apps Script": "googleappsscript.svg",
  Supabase: "supabase.svg",
  ERP: "erp.svg",
  Antigravity: "antigravity.svg",
  YOLOv8: "ultralytics.svg",
  Streamlit: "streamlit.svg",
  Kaggle: "kaggle.svg",
  HRM: "hrm.svg",
  RBAC: "rbac.svg",
  API: "api.svg",
};

const STRINGS = {
  vi: {
    navSkills: "Kỹ năng AI",
    menu: "Mở menu",
    closeMenu: "Đóng menu",
    language: "Đổi ngôn ngữ",
    scroll: "Cuộn xuống",
    skillsEyebrow: "Kỹ năng AI",
    skillsTitle: "Hai hướng ứng dụng AI, một nền tảng dữ liệu.",
    skillsIntro:
      "AI tạo sinh cho sản xuất nội dung, và AI + tự động hóa cho vận hành doanh nghiệp — cả hai đều bắt đầu từ tư duy dữ liệu.",
    stackTitle: "Công cụ tôi dùng hằng ngày",
    education: "Học vấn",
    pipelineEyebrow: "Cách tôi làm",
    current: "Hiện tại",
    showMore: "Xem thêm",
    showLess: "Thu gọn",
    result: "Kết quả",
    openCase: "Xem case study",
    viewLetter: "Xem thư giới thiệu",
    letterPage: "Trang",
    zoomIn: "Phóng to",
    zoomOut: "Thu nhỏ",
    resetZoom: "Đặt lại",
    openPdf: "Mở PDF",
    downloadPdf: "Tải PDF",
    skillsVerified: "Kỹ năng được chứng nhận",
    verify: "Xác thực chứng chỉ",
    course: "Thông tin khóa học",
    copyEmail: "Sao chép email",
    copied: "Đã sao chép email",
    backToTop: "Về đầu trang",
    evidence: "Minh chứng",
    step: "Bước",
    skip: "Nhấn để bỏ qua",
    booting: "Đang khởi động hệ thống",
    channels: "Kênh liên hệ trực tiếp",
    socials: "Mạng xã hội",
    online: "Đang hoạt động",
    call: "Gọi",
    heroRoles: "Applied AI|AI Automation|ERP & Chuyển đổi số|AI Video R&D",
    dragHint: "Kéo để xem",
    prev: "Trước",
    next: "Tiếp",
    highlights: "Điểm nổi bật",
    months: "tháng",
    present: "Hiện tại",
    openTo: "Sẵn sàng cho các vị trí",
    viewCv: "Xem CV",
    letterPages: "Các trang",
    letterFit: "Vừa khung",
    letterHint: "Nhấp đúp để phóng to · kéo để di chuyển",
    verifiedLetter: "Có chữ ký & mộc đỏ",
    featured: "Đang xem",
  },
  en: {
    navSkills: "AI Skills",
    menu: "Open menu",
    closeMenu: "Close menu",
    language: "Switch language",
    scroll: "Scroll down",
    skillsEyebrow: "AI skills",
    skillsTitle: "Two ways I apply AI, one data foundation.",
    skillsIntro:
      "Generative AI for content production, and AI + automation for business operations — both start from a data mindset.",
    stackTitle: "Tools I use every day",
    education: "Education",
    pipelineEyebrow: "How I work",
    current: "Current",
    showMore: "Show more",
    showLess: "Show less",
    result: "Outcome",
    openCase: "Open case study",
    viewLetter: "View recommendation letter",
    letterPage: "Page",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    resetZoom: "Reset",
    openPdf: "Open PDF",
    downloadPdf: "Download PDF",
    skillsVerified: "Certified skills",
    verify: "Verify credential",
    course: "Course details",
    copyEmail: "Copy email",
    copied: "Email copied",
    backToTop: "Back to top",
    evidence: "Evidence",
    step: "Step",
    skip: "Tap to skip",
    booting: "Booting the system",
    channels: "Direct channels",
    socials: "Social profiles",
    online: "Online",
    call: "Call",
    heroRoles: "Applied AI|AI Automation|ERP & Digital Transformation|AI Video R&D",
    dragHint: "Drag to explore",
    prev: "Previous",
    next: "Next",
    highlights: "Highlights",
    months: "months",
    present: "Present",
    openTo: "Open to roles",
    viewCv: "View CV",
    letterPages: "Pages",
    letterFit: "Fit",
    letterHint: "Double-click to zoom · drag to pan",
    verifiedLetter: "Signed & stamped",
    featured: "Now viewing",
  },
} as const;

export type UiStrings = Record<keyof (typeof STRINGS)["vi"], string>;

export function uiStrings(locale: Locale): UiStrings {
  return STRINGS[locale] ?? STRINGS.vi;
}

/** Certificates ship as 3300px scans; the site serves 1200px WebP copies from /img/thumbs. */
export function certImage(path: string): string {
  return asset(path).replace(/^\/img\/([^/]+)\.jpg$/, "/img/thumbs/$1.webp");
}

/** Data files store paths as "./img/..."; Next needs root-relative URLs. */
export function asset(path?: string): string {
  if (!path) return "/og.png";
  return path.startsWith("./") ? `/${path.slice(2)}` : path;
}
