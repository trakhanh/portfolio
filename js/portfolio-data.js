window.PORTFOLIO_DATA = {
  roles: [
    "AI Video Producer",
    "Creative Automation Builder",
    "HRM App Developer",
    "AI Solutions Developer"
  ],

  heroFlow: [
    "Idea",
    "Research",
    "Script",
    "AI Visual",
    "AI Voice",
    "Animation",
    "Editing",
    "Publishing"
  ],

  videoCapabilities: [
    {
      id: "series",
      number: "01",
      label: "YouTube Series",
      title: "Hệ thống nội dung có thể mở rộng theo mùa và tập",
      description:
        "Phát triển concept, format, visual bible và dây chuyền sản xuất để mỗi tập giữ được cùng một ngôn ngữ hình ảnh.",
      items: [
        "Concept & format cho series",
        "Nghiên cứu chủ đề, outline và kịch bản nhiều tập",
        "Thiết kế nhân vật, bối cảnh và visual style nhất quán",
        "AI voice, animation, editing và template",
        "Thumbnail, metadata và lịch xuất bản",
        "Chuẩn hoá để sản xuất hàng loạt"
      ]
    },
    {
      id: "advertising",
      number: "02",
      label: "AI Advertising",
      title: "Video quảng cáo được thiết kế cho từng nền tảng",
      description:
        "Kết hợp AI visual, nhân vật ảo, product visualization và hậu kỳ để tạo các phiên bản nội dung linh hoạt.",
      items: [
        "Product introduction & social media ads",
        "Brand storytelling và short-form video",
        "AI spokesperson hoặc nhân vật ảo",
        "Product visualization",
        "Biến thể theo nhóm khách hàng",
        "Bản địa hoá ngôn ngữ, giọng nói và tỷ lệ khung hình"
      ]
    }
  ],

  videoGallery: [
    {
      id: "youtube-series",
      category: "Series",
      eyebrow: "Format development",
      title: "AI YouTube Series System",
      description:
        "Khung sản xuất từ research đến publishing, tập trung vào tính nhất quán giữa nhiều tập.",
      role: "Concept · Workflow · Production",
      tools: "LLM · AI Visual · AI Voice · Editing",
      delivery: "Theo mùa / theo tập",
      platform: "YouTube",
      image: "./img/Notebooklm.png",
      cta: "View Production Process",
      target: "#pipeline"
    },
    {
      id: "ai-advertising",
      category: "Advertisement",
      eyebrow: "Cinematic campaign",
      title: "AI Advertising Production",
      description:
        "Dây chuyền video quảng cáo đa phiên bản cho social, short-form và product storytelling.",
      role: "Creative Direction · Production",
      tools: "Generative AI · Voice · Motion",
      delivery: "Theo chiến dịch",
      platform: "Multi-platform",
      image: "./img/appsscripts.jpg",
      cta: "Explore Workflow",
      target: "#pipeline"
    },
    {
      id: "short-form",
      category: "Short-form",
      eyebrow: "Platform-native",
      title: "Short-form Content Engine",
      description:
        "Cấu trúc nội dung ngắn có thể đổi hook, voice, subtitle và định dạng theo nền tảng.",
      role: "Format · Automation · Editing",
      tools: "Prompt System · TTS · Subtitle",
      delivery: "Theo batch",
      platform: "TikTok · Reels · Shorts",
      image: "./img/N8N.jpg",
      cta: "See the Toolset",
      target: "#tools"
    },
    {
      id: "experiments",
      category: "Experimental",
      eyebrow: "R&D",
      title: "Creative AI Experiments",
      description:
        "Không gian thử nghiệm nhân vật, visual language và các cách kể chuyện mới bằng AI.",
      role: "Research · Prototyping",
      tools: "Computer Vision · Generative AI",
      delivery: "Prototype",
      platform: "Lab",
      image: "./img/multi_task.png",
      cta: "View Research",
      target: "#projects"
    }
  ],

  productionPipeline: [
    {
      step: "01",
      name: "Research",
      note: "Tổng hợp chủ đề và tín hiệu nội dung"
    },
    {
      step: "02",
      name: "Script",
      note: "Outline, hook và cấu trúc kể chuyện"
    },
    {
      step: "03",
      name: "Scene Breakdown",
      note: "Chia cảnh, shot và yêu cầu asset"
    },
    {
      step: "04",
      name: "Asset Generation",
      note: "Visual, nhân vật và bối cảnh nhất quán"
    },
    {
      step: "05",
      name: "Voice",
      note: "Voice-over và bản địa hoá"
    },
    {
      step: "06",
      name: "Animation",
      note: "Chuyển động, camera và nhịp cảnh"
    },
    {
      step: "07",
      name: "Editing",
      note: "Dựng, âm thanh, subtitle và QC"
    },
    {
      step: "08",
      name: "Review",
      note: "Feedback, version và approval"
    },
    {
      step: "09",
      name: "Publishing",
      note: "Metadata, lịch và phân phối"
    }
  ],

  productionTools: [
    {
      icon: "⌁",
      title: "Research & Ideation",
      description:
        "Tổng hợp chủ đề, gom tín hiệu và tạo outline theo cấu trúc."
    },
    {
      icon: "✦",
      title: "Script Intelligence",
      description:
        "Chia kịch bản thành scene, shot và prompt có kiểm soát."
    },
    {
      icon: "◫",
      title: "Visual Consistency",
      description:
        "Quản lý nhân vật, bối cảnh, style và asset tham chiếu."
    },
    {
      icon: "◉",
      title: "Voice at Scale",
      description:
        "Tạo voice-over hàng loạt, chuẩn hoá tên file và version."
    },
    {
      icon: "↗",
      title: "Production Tracking",
      description:
        "Theo dõi trạng thái từng tập từ idea đến publishing."
    },
    {
      icon: "⌘",
      title: "Workflow Automation",
      description:
        "Kết nối n8n, API và Google Apps Script thành dây chuyền."
    }
  ],

  hrmModules: {
    verificationNote:
      "Phạm vi module bên dưới là cấu trúc sản phẩm đề xuất. Trạng thái triển khai thực tế cần được xác nhận trước khi công bố.",
    current: [
      "Hồ sơ nhân viên & phòng ban",
      "Phân quyền người dùng",
      "Chấm công & nghỉ phép",
      "Quy trình phê duyệt",
      "Phân công công việc",
      "Thông báo & tài liệu nội bộ"
    ],
    roadmap: [
      "Theo dõi hiệu suất và báo cáo",
      "Lịch xuất bản cho đội nội dung",
      "Quản lý writer, editor & reviewer",
      "Workload theo thành viên",
      "Feedback loop & approval",
      "Production capacity planning"
    ]
  },

  ecosystem: [
    {
      code: "PEOPLE",
      title: "HRM Application",
      description: "Quản lý con người và công việc",
      icon: "◎"
    },
    {
      code: "PROCESS",
      title: "Production Automation",
      description: "Quản lý quy trình và dữ liệu",
      icon: "⌘"
    },
    {
      code: "OUTPUT",
      title: "AI Video Production",
      description: "Tạo ra sản phẩm nội dung cuối cùng",
      icon: "▶"
    }
  ],

  projects: [
    {
      id: "ai-video-series",
      order: "01",
      category: "AI Video",
      title: "AI Video Production — YouTube Series",
      summary:
        "Thiết kế hệ thống nội dung nhiều tập từ concept, visual bible đến lịch xuất bản.",
      image: "./img/Notebooklm.png",
      context: "Xây dựng một format video có thể duy trì tính nhất quán qua nhiều tập.",
      problem:
        "Nhiều công đoạn sáng tạo rời rạc khiến chất lượng và nhịp sản xuất khó ổn định.",
      role: "Creative system design, production workflow và automation planning.",
      workflow:
        "Research → Script → Scene → Visual → Voice → Animation → Edit → Publish.",
      solution:
        "Một pipeline module hoá với template, asset library và checkpoint review.",
      technology: ["LLM", "AI Visual", "AI Voice", "Editing", "Automation"],
      output:
        "Format series, visual direction, production pipeline và bộ template.",
      result:
        "Kết quả định lượng và media sẽ được bổ sung khi dữ liệu xuất bản được xác nhận.",
      learning:
        "Tính nhất quán cần được thiết kế từ dữ liệu, prompt và review — không chỉ ở hậu kỳ.",
      links: []
    },
    {
      id: "ai-advertising",
      order: "02",
      category: "AI Video",
      title: "AI Advertising Production",
      summary:
        "Quy trình tạo video quảng cáo đa phiên bản cho social và product storytelling.",
      image: "./img/appsscripts.jpg",
      context: "Nội dung quảng cáo cần linh hoạt theo đối tượng và nền tảng.",
      problem:
        "Tạo nhiều biến thể theo tỷ lệ khung hình, voice và thông điệp thường tốn nhiều thao tác lặp.",
      role: "Creative direction, AI production và versioning workflow.",
      workflow:
        "Brief → Storyboard → Asset → Voice → Edit → Platform variants.",
      solution:
        "Bộ khung sản xuất dùng chung asset lõi nhưng thay đổi hook, voice và cấu trúc đầu ra.",
      technology: ["Generative AI", "TTS", "Motion", "Video Editing"],
      output: "Campaign master và cấu trúc biến thể đa nền tảng.",
      result:
        "Không công bố chỉ số hiệu quả khi chưa có dữ liệu chiến dịch đã xác nhận.",
      learning:
        "Automation hiệu quả nhất khi giữ được quyền kiểm soát sáng tạo ở các checkpoint quan trọng.",
      links: []
    },
    {
      id: "production-toolkit",
      order: "03",
      category: "Automation",
      title: "Video Production Automation Toolkit",
      summary:
        "Bộ công cụ nối research, script, asset, voice và publishing thành một luồng dữ liệu.",
      image: "./img/N8N.jpg",
      context: "Một dây chuyền video có nhiều asset, phiên bản và trạng thái cần được đồng bộ.",
      problem:
        "Tên file, folder, prompt, feedback và tiến độ dễ bị phân mảnh giữa nhiều công cụ.",
      role: "Workflow architecture và automation development.",
      workflow:
        "Input chuẩn hoá → automation nodes → asset registry → review → output.",
      solution:
        "Các tool nhỏ theo nhiệm vụ, kết nối qua n8n, API và Google Apps Script.",
      technology: ["n8n", "API", "Google Apps Script", "JavaScript"],
      output: "Pipeline theo dõi từ idea đến publishing.",
      result:
        "Phạm vi tự động hoá được mở rộng theo từng điểm nghẽn đã xác định.",
      learning:
        "Tự động hoá tốt bắt đầu bằng dữ liệu rõ ràng và trạng thái có thể quan sát.",
      links: []
    },
    {
      id: "hrm-app",
      order: "04",
      category: "HR Tech",
      title: "HRM Application",
      summary:
        "Sản phẩm quản trị con người và vận hành, định hướng kết nối với đội ngũ sản xuất nội dung.",
      image: "./img/project5.png",
      context: "Thông tin con người, công việc và phê duyệt cần nằm trong một hệ thống thống nhất.",
      problem:
        "Dữ liệu vận hành phân tán làm giảm khả năng theo dõi và phối hợp.",
      role: "Product thinking, application development và system design.",
      workflow:
        "People data → Work assignment → Approval → Reporting.",
      solution:
        "Kiến trúc module theo hồ sơ, phân quyền, quy trình và báo cáo.",
      technology: ["Web App", "Database", "Role-based Access", "Automation"],
      output: "Cấu trúc ứng dụng HRM có thể mở rộng theo nghiệp vụ.",
      result:
        "Trạng thái từng module cần được xác nhận trước khi công bố.",
      learning:
        "Sản phẩm nội bộ cần ưu tiên tính rõ ràng, quyền truy cập và khả năng thay đổi quy trình.",
      links: []
    },
    {
      id: "recruitment-chatbot",
      order: "05",
      category: "AI Solution",
      title: "AI Recruitment Chatbot",
      summary:
        "Chatbot đa kênh hỗ trợ ứng viên trên website và fanpage.",
      image: "./img/N8N.jpg",
      context: "Các câu hỏi lặp lại từ ứng viên cần được phản hồi nhất quán trên nhiều kênh.",
      problem: "Đội ngũ tuyển dụng phải xử lý thủ công nhiều nội dung tương tự.",
      role: "Workflow automation và AI integration.",
      workflow: "Message → Intent → Knowledge → Response → Handoff.",
      solution: "Luồng n8n kết nối mô hình AI, nguồn dữ liệu và các kênh giao tiếp.",
      technology: ["n8n", "GPT", "Gemini", "Supabase", "Webhook"],
      output: "Chatbot website và fanpage.",
      result: "Demo công khai hiện có trên website và fanpage tuyển dụng.",
      learning:
        "AI assistant cần cơ chế chuyển tiếp cho con người và nguồn tri thức được kiểm soát.",
      links: [
        { label: "Website Demo", url: "https://bongtra.vn" },
        {
          label: "Fanpage Demo",
          url: "https://www.facebook.com/bongtratuyendung"
        }
      ]
    },
    {
      id: "internal-automation",
      order: "06",
      category: "Automation",
      title: "Internal Automation Tools",
      summary:
        "Các công cụ nội bộ cho email hàng loạt, lịch phòng họp và quy trình dữ liệu.",
      image: "./img/appsscripts.jpg",
      context: "Các tác vụ vận hành lặp lại cần được xử lý an toàn và có cấu trúc.",
      problem: "Thao tác thủ công dễ tạo xung đột lịch và sai sót dữ liệu.",
      role: "Automation development.",
      workflow: "Form / Sheet → Validation → Business rule → Notification.",
      solution: "Apps Script kết nối Sheets, Calendar và email theo quy tắc.",
      technology: ["Google Apps Script", "Sheets API", "Calendar API"],
      output: "Tool gửi email và quản lý lịch nội bộ.",
      result: "Công cụ nội bộ; dữ liệu vận hành không được công khai.",
      learning:
        "Validation và khả năng truy vết quan trọng hơn việc tự động hoá thật nhiều bước.",
      links: []
    },
    {
      id: "computer-vision",
      order: "07",
      category: "Computer Vision",
      title: "Computer Vision Inspection System",
      summary:
        "Hệ thống phát hiện, theo dõi và đo kích thước vật thể trên băng chuyền.",
      image: "./img/doantotnghiep.png",
      context: "Đồ án tốt nghiệp về bài toán kiểm tra vật thể trong môi trường công nghiệp.",
      problem: "Cần nhận dạng và đo vật thể theo thời gian thực từ luồng camera.",
      role: "Research, model development và application integration.",
      workflow: "Camera → Detection → Tracking → Measurement → Interface.",
      solution: "Kết hợp YOLOv8, SORT và OpenCV trong một ứng dụng hoàn chỉnh.",
      technology: ["Python", "YOLOv8", "SORT", "OpenCV", "PyTorch"],
      output: "Ứng dụng kiểm tra vật thể và video demo.",
      result: "Đồ án tốt nghiệp đạt 9.5/10.",
      learning:
        "Một mô hình tốt vẫn cần calibration, tracking và giao diện vận hành đáng tin cậy.",
      links: [
        {
          label: "Source Code",
          url: "https://github.com/trakhanh/AppDetectAndMeasureObject.git"
        },
        { label: "Video Demo", url: "https://youtu.be/L07IJW2GpZo" }
      ]
    },
    {
      id: "ai-research",
      order: "08",
      category: "AI Research",
      title: "Data Science & AI Research",
      summary:
        "Nghiên cứu Multi-Task Learning cho detection, segmentation và depth estimation.",
      image: "./img/multi_task.png",
      context: "Khảo sát khả năng chia sẻ biểu diễn giữa nhiều bài toán thị giác.",
      problem: "Tối ưu đồng thời nhiều task với dữ liệu và mục tiêu khác nhau.",
      role: "Research, experimentation và evaluation.",
      workflow: "Dataset → Training → Multi-task heads → Evaluation.",
      solution: "Thử nghiệm trên BDD100K và KITTI bằng PyTorch.",
      technology: ["PyTorch", "BDD100K", "KITTI", "Deep Learning"],
      output: "Notebook nghiên cứu và kết quả thực nghiệm.",
      result: "Tài liệu nghiên cứu được công khai trên Kaggle.",
      learning:
        "Cân bằng loss và chất lượng dữ liệu quyết định hiệu quả chia sẻ đặc trưng.",
      links: [
        {
          label: "View Research",
          url: "https://www.kaggle.com/code/khanhtraa/multi-task-bdd100k"
        }
      ]
    }
  ],

  skills: [
    "AI Video Production",
    "Creative Automation",
    "Workflow Architecture",
    "Generative AI",
    "Computer Vision",
    "Python",
    "JavaScript",
    "n8n",
    "Google Apps Script",
    "API Integration",
    "HRM Product Thinking",
    "Data Science"
  ],

  experience: [
    {
      year: "NOW",
      title: "Creative Systems",
      description:
        "Kết hợp AI video, automation và product thinking để xây dựng hệ thống sáng tạo có thể vận hành."
    },
    {
      year: "BUILD",
      title: "Internal Tools",
      description:
        "Phát triển chatbot, Apps Script workflow và các công cụ tối ưu công việc."
    },
    {
      year: "RESEARCH",
      title: "AI & Computer Vision",
      description:
        "Nghiên cứu deep learning, multi-task learning và ứng dụng kiểm tra công nghiệp."
    }
  ]
};
