window.PORTFOLIO_CONTENT = {
  vi: {
    meta: {
      title: "Trà Nguyễn Gia Khánh — Data Science, AI & Automation",
      description:
        "Portfolio của Trà Nguyễn Gia Khánh: nền tảng Data Science, AI & Computer Vision; kinh nghiệm phát triển AI Creative Production, Automation và HRM."
    },
    nav: {
      journey: "Hành trình",
      work: "Công việc",
      projects: "Dự án",
      certificates: "Chứng chỉ",
      about: "Năng lực",
      contact: "Liên hệ"
    },
    hero: {
      eyebrow: "Data Science foundation · Applied AI at work",
      name: "TRÀ NGUYỄN GIA KHÁNH",
      title: "Từ Data Science đến các hệ thống AI ứng dụng.",
      intro:
        "Tôi học Data Science và xây nền tảng về AI, Machine Learning, Computer Vision. Khi đi làm, tôi phát triển thêm hai hướng: sản xuất nội dung bằng AI và xây dựng công cụ vận hành gồm automation, HRM.",
      primary: "Xem hành trình",
      secondary: "Khám phá dự án",
      status: "Sẵn sàng trao đổi cơ hội hợp tác",
      footnote: "Based in Ho Chi Minh City, Vietnam"
    },
    journey: {
      eyebrow: "01 · POSITIONING",
      title: "Một nền tảng. Hai hướng phát triển.",
      intro:
        "Portfolio này không tách rời ngành học và công việc. Mỗi giai đoạn bổ sung một lớp năng lực mới, từ hiểu dữ liệu đến tạo sản phẩm và vận hành hệ thống.",
      items: [
        {
          number: "01",
          label: "NỀN TẢNG HỌC THUẬT",
          title: "Data Science & AI",
          description:
            "Nền tảng từ chương trình Data Science tại HUFLIT: Python, phân tích dữ liệu, Machine Learning, Deep Learning và Computer Vision.",
          meta: "Education foundation"
        },
        {
          number: "02",
          label: "HƯỚNG PHÁT TRIỂN KHI ĐI LÀM",
          title: "AI Creative Production",
          description:
            "Ứng dụng AI vào nghiên cứu nội dung, kịch bản, hình ảnh, voice, animation và quy trình sản xuất video.",
          meta: "Professional direction 01"
        },
        {
          number: "03",
          label: "HƯỚNG PHÁT TRIỂN KHI ĐI LÀM",
          title: "Automation & HRM Systems",
          description:
            "Phát triển chatbot, workflow automation, công cụ nội bộ và ứng dụng HRM để hỗ trợ con người và vận hành.",
          meta: "Professional direction 02"
        }
      ]
    },
    work: {
      eyebrow: "02 · WHAT I DO NOW",
      title: "Hai mảng tôi phát triển thêm trong công việc.",
      intro:
        "Nền tảng Data Science giúp tôi tiếp cận hai mảng mới theo hướng có hệ thống: hiểu dữ liệu, thiết kế quy trình và biến AI thành công cụ có thể sử dụng.",
      areas: [
        {
          index: "A",
          title: "AI Creative Production",
          description:
            "Sản xuất Series YouTube, video quảng cáo và nội dung short-form bằng AI; đồng thời xây tool hỗ trợ từ research đến publishing.",
          capabilities: [
            "Research & content structure",
            "Script & scene breakdown",
            "AI visual, voice & animation",
            "Editing & production templates",
            "Production tracking",
            "Creative workflow automation"
          ],
          note: "Creative output + production system"
        },
        {
          index: "B",
          title: "Automation & HRM",
          description:
            "Xây workflow, chatbot, ứng dụng HRM và công cụ nội bộ giúp giảm thao tác lặp, tập trung dữ liệu và làm rõ trạng thái công việc.",
          capabilities: [
            "HRM application development",
            "Recruitment chatbot",
            "Internal workflow automation",
            "Google Apps Script tools",
            "n8n & API integration",
            "Operational product thinking"
          ],
          note: "People + process + internal tools"
        }
      ]
    },
    projects: {
      eyebrow: "03 · SELECTED WORK",
      title: "Dự án theo đúng hành trình phát triển.",
      intro:
        "Các dự án học thuật cho thấy nền tảng kỹ thuật. Các sản phẩm và công cụ sau đó cho thấy cách tôi áp dụng nền tảng đó vào công việc thực tế.",
      filters: {
        all: "Tất cả",
        foundation: "Nền tảng",
        professional: "Công việc"
      },
      items: [
        {
          id: "computer-vision-inspection",
          phase: "foundation",
          phaseLabel: "NỀN TẢNG · COMPUTER VISION",
          title: "Hệ thống nhận dạng và đo kích thước vật thể",
          description:
            "Đồ án tốt nghiệp ứng dụng YOLOv8, SORT và OpenCV để phát hiện, theo dõi và đo vật thể trên băng chuyền công nghiệp.",
          result: "Đồ án tốt nghiệp · 9.5/10",
          image: "./img/doantotnghiep.png",
          tags: ["Python", "YOLOv8", "SORT", "OpenCV"],
          links: [
            {
              label: "Mã nguồn",
              url: "https://github.com/trakhanh/AppDetectAndMeasureObject.git"
            },
            {
              label: "Video demo",
              url: "https://youtu.be/L07IJW2GpZo"
            }
          ]
        },
        {
          id: "multi-task-learning",
          phase: "foundation",
          phaseLabel: "NỀN TẢNG · AI RESEARCH",
          title: "Multi-Task Learning Research",
          description:
            "Nghiên cứu đồng thời Object Detection, Segmentation và Depth Estimation trên BDD100K và KITTI.",
          result: "Research notebook",
          image: "./img/multi_task.png",
          tags: ["PyTorch", "BDD100K", "KITTI", "Deep Learning"],
          links: [
            {
              label: "Xem nghiên cứu",
              url: "https://www.kaggle.com/code/khanhtraa/multi-task-bdd100k"
            }
          ]
        },
        {
          id: "finger-counting",
          phase: "foundation",
          phaseLabel: "NỀN TẢNG · DEEP LEARNING",
          title: "Ứng dụng đếm ngón tay",
          description:
            "Ứng dụng web real-time thử nghiệm CNN, VGG16, ResNet50 và U-Net cho bài toán nhận dạng và phân đoạn ảnh.",
          result: "Web application prototype",
          image: "./img/fingercount.png",
          tags: ["Streamlit", "CNN", "ResNet50", "U-Net"],
          links: [
            {
              label: "Mã nguồn",
              url: "https://github.com/trakhanh/UngDungDemNgonTay5-9.git"
            },
            {
              label: "Video demo",
              url: "https://youtu.be/NEbpUe2FScA"
            }
          ]
        },
        {
          id: "recruitment-chatbot",
          phase: "professional",
          phaseLabel: "CÔNG VIỆC · AI AUTOMATION",
          title: "Chatbot tuyển dụng đa kênh",
          description:
            "Chatbot hỗ trợ ứng viên trên website và fanpage, kết nối workflow xử lý bằng n8n với AI và nguồn dữ liệu.",
          result: "Website & fanpage integration",
          image: "./img/N8N.jpg",
          tags: ["n8n", "GPT", "Gemini", "Supabase"],
          links: [
            { label: "Website", url: "https://bongtra.vn" },
            {
              label: "Fanpage",
              url: "https://www.facebook.com/bongtratuyendung"
            }
          ]
        },
        {
          id: "internal-automation",
          phase: "professional",
          phaseLabel: "CÔNG VIỆC · INTERNAL TOOLS",
          title: "Công cụ tự động hóa nội bộ",
          description:
            "Các workflow cho email hàng loạt, đặt phòng họp, dữ liệu vận hành và tác vụ nội bộ bằng Google Apps Script.",
          result: "Internal operational tools",
          image: "./img/appsscripts.jpg",
          tags: ["Apps Script", "Sheets API", "Calendar API"],
          links: []
        },
        {
          id: "hrm-application",
          phase: "professional",
          phaseLabel: "CÔNG VIỆC · HR TECH",
          title: "Ứng dụng HRM",
          description:
            "Tham gia phát triển ứng dụng quản trị nhân sự và vận hành. Chi tiết module được giới hạn theo phạm vi có thể công khai.",
          result: "Internal business application",
          image: "./img/project5.png",
          tags: ["Web App", "Database", "Role-based Access"],
          links: []
        },
        {
          id: "ai-creative-production",
          phase: "professional",
          phaseLabel: "CÔNG VIỆC · AI CREATIVE",
          title: "AI Content Production & Tooling",
          description:
            "Phát triển quy trình sản xuất nội dung bằng AI và các công cụ hỗ trợ research, script, asset, voice, tracking và publishing.",
          result: "Current professional focus",
          image: "./img/Notebooklm.png",
          tags: ["Generative AI", "Video", "Automation", "Workflow"],
          links: []
        }
      ]
    },
    certificates: {
      eyebrow: "04 · CHỨNG CHỈ",
      title: "Chứng chỉ và quá trình học tập liên tục.",
      intro:
        "Các chứng chỉ bổ sung cho nền tảng Data Science và phản ánh quá trình tôi chủ động mở rộng kiến thức về AI, IT Support, Data Analytics và Cybersecurity.",
      verify: "Xác thực",
      course: "Thông tin khóa học",
      items: [
        {
          title: "Google IT Support Professional Certificate",
          issuer: "Google Career Certificates",
          date: "05-2025",
          description:
            "Kiến thức nền tảng về hỗ trợ kỹ thuật, hệ điều hành, mạng, quản trị hệ thống và bảo mật.",
          image: "./img/Coursera_IT Support.jpg",
          tags: ["IT Support", "System Admin", "Networking", "Security"],
          verifyUrl:
            "https://coursera.org/share/63ea0eb22d1fb2e525a023d8f36841bf",
          courseUrl:
            "https://coursera.org/professional-certificates/google-it-support"
        },
        {
          title: "Google AI Essentials Certificate",
          issuer: "Google Career Certificates",
          date: "04-2025",
          description:
            "Nền tảng về cách AI hoạt động, các công cụ AI và phương pháp ứng dụng AI có trách nhiệm trong công việc.",
          image: "./img/Coursera_AI Essentials.jpg",
          tags: ["AI Fundamentals", "AI Tools", "Best Practices"],
          verifyUrl:
            "https://coursera.org/share/ae887854314f490f27c020c8d0621665",
          courseUrl:
            "https://www.coursera.org/specializations/ai-essentials-google#courses"
        },
        {
          title: "Google Prompting Essentials Certificate",
          issuer: "Google Career Certificates",
          date: "04-2025",
          description:
            "Kỹ thuật viết, đánh giá và cải thiện prompt để làm việc hiệu quả hơn với các công cụ AI.",
          image: "./img/Coursera_Prompt AI.jpg",
          tags: ["Prompt Engineering", "AI Prompting", "AI Tools"],
          verifyUrl:
            "https://coursera.org/share/d9a2cf7bbbd45a52c5de029c5c1e0514",
          courseUrl:
            "https://www.coursera.org/learn/prompting-essentials-google"
        },
        {
          title: "Foundations of Cybersecurity Certificate",
          issuer: "Google Career Certificates",
          date: "05-2025",
          description:
            "Nền tảng về an ninh mạng, quản lý rủi ro, security framework và phân tích mối đe dọa.",
          image: "./img/Cyber.jpg",
          tags: ["Cybersecurity", "Risk", "Security Framework"],
          verifyUrl: "",
          courseUrl:
            "https://www.coursera.org/learn/foundations-of-cybersecurity"
        },
        {
          title: "Foundations: Data, Data, Everywhere",
          issuer: "Google Career Certificates",
          date: "05-2025",
          description:
            "Các khái niệm cốt lõi của Data Analytics, vòng đời dữ liệu và vai trò của dữ liệu trong quyết định.",
          image: "./img/ana.jpg",
          tags: ["Data Analytics", "Data Ethics", "Data Lifecycle"],
          verifyUrl: "",
          courseUrl: "https://www.coursera.org/learn/foundations-data"
        },
        {
          title: "Ask Questions to Make Data-Driven Decisions",
          issuer: "Google Career Certificates",
          date: "05-2025",
          description:
            "Cách đặt câu hỏi phù hợp, xác định nhu cầu kinh doanh và sử dụng dữ liệu để hỗ trợ quyết định.",
          image: "./img/ask.jpg",
          tags: ["Data-Driven Decisions", "Problem Solving", "Analysis"],
          verifyUrl: "",
          courseUrl:
            "https://www.coursera.org/learn/ask-questions-make-decisions"
        }
      ]
    },
    about: {
      eyebrow: "05 · CAPABILITIES",
      title: "Tôi kết nối dữ liệu, sản phẩm và vận hành.",
      intro:
        "Thế mạnh của tôi không nằm ở một công cụ riêng lẻ. Tôi có thể đi từ bài toán, dữ liệu và thử nghiệm kỹ thuật đến workflow, giao diện và sản phẩm phục vụ người dùng thực tế.",
      groups: [
        {
          title: "Data & AI",
          items: ["Python", "Data Analysis", "Machine Learning", "Deep Learning", "Computer Vision"]
        },
        {
          title: "Creative AI",
          items: ["AI Video", "Script Workflow", "AI Visual", "AI Voice", "Production Systems"]
        },
        {
          title: "Apps & Automation",
          items: ["JavaScript", "n8n", "Google Apps Script", "API", "HRM", "Internal Tools"]
        }
      ],
      cv: "Xem CV",
      cvUrl:
        "https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
    },
    contact: {
      eyebrow: "06 · CONTACT",
      title: "Cùng trao đổi về một bài toán thực tế.",
      intro:
        "Tôi quan tâm đến các cơ hội kết hợp Data Science, AI ứng dụng, creative production và hệ thống vận hành.",
      emailLabel: "Gửi email",
      socialLabel: "Kết nối"
    },
    footer: "Trà Nguyễn Gia Khánh · Data Science → Applied AI Systems"
  },

  en: {
    meta: {
      title: "Tra Nguyen Gia Khanh — Data Science, AI & Automation",
      description:
        "Portfolio of Tra Nguyen Gia Khanh: a Data Science, AI and Computer Vision foundation expanded through AI Creative Production, Automation and HRM."
    },
    nav: {
      journey: "Journey",
      work: "Work",
      projects: "Projects",
      certificates: "Certificates",
      about: "Capabilities",
      contact: "Contact"
    },
    hero: {
      eyebrow: "Data Science foundation · Applied AI at work",
      name: "TRA NGUYEN GIA KHANH",
      title: "From Data Science to applied AI systems.",
      intro:
        "I studied Data Science and built a foundation in AI, Machine Learning and Computer Vision. Through work, I expanded into two additional directions: AI-powered content production and operational products including automation and HRM.",
      primary: "See my journey",
      secondary: "Explore projects",
      status: "Open to relevant collaborations",
      footnote: "Based in Ho Chi Minh City, Vietnam"
    },
    journey: {
      eyebrow: "01 · POSITIONING",
      title: "One foundation. Two directions of growth.",
      intro:
        "This portfolio connects my field of study with my professional work. Each stage adds a new layer — from understanding data to creating products and operating systems.",
      items: [
        {
          number: "01",
          label: "ACADEMIC FOUNDATION",
          title: "Data Science & AI",
          description:
            "A foundation built through the Data Science program at HUFLIT: Python, data analysis, Machine Learning, Deep Learning and Computer Vision.",
          meta: "Education foundation"
        },
        {
          number: "02",
          label: "PROFESSIONAL GROWTH",
          title: "AI Creative Production",
          description:
            "Applying AI to content research, scripting, visuals, voice, animation and end-to-end video production workflows.",
          meta: "Professional direction 01"
        },
        {
          number: "03",
          label: "PROFESSIONAL GROWTH",
          title: "Automation & HRM Systems",
          description:
            "Building chatbots, workflow automation, internal tools and HRM applications that support people and operations.",
          meta: "Professional direction 02"
        }
      ]
    },
    work: {
      eyebrow: "02 · WHAT I DO NOW",
      title: "Two areas I developed through professional work.",
      intro:
        "My Data Science foundation helps me approach these new areas systematically: understanding data, designing workflows and turning AI into usable tools.",
      areas: [
        {
          index: "A",
          title: "AI Creative Production",
          description:
            "Producing YouTube series, advertising videos and short-form content with AI, while building tools that support the pipeline from research to publishing.",
          capabilities: [
            "Research & content structure",
            "Script & scene breakdown",
            "AI visual, voice & animation",
            "Editing & production templates",
            "Production tracking",
            "Creative workflow automation"
          ],
          note: "Creative output + production system"
        },
        {
          index: "B",
          title: "Automation & HRM",
          description:
            "Building workflows, chatbots, HRM applications and internal tools that reduce repetitive work, centralize data and clarify operational status.",
          capabilities: [
            "HRM application development",
            "Recruitment chatbot",
            "Internal workflow automation",
            "Google Apps Script tools",
            "n8n & API integration",
            "Operational product thinking"
          ],
          note: "People + process + internal tools"
        }
      ]
    },
    projects: {
      eyebrow: "03 · SELECTED WORK",
      title: "Projects mapped to the real journey.",
      intro:
        "Academic projects show the technical foundation. Later products and tools show how that foundation was applied in professional contexts.",
      filters: {
        all: "All",
        foundation: "Foundation",
        professional: "Professional"
      },
      items: [
        {
          id: "computer-vision-inspection",
          phase: "foundation",
          phaseLabel: "FOUNDATION · COMPUTER VISION",
          title: "Object detection and measurement system",
          description:
            "A graduation project using YOLOv8, SORT and OpenCV to detect, track and measure objects on an industrial conveyor.",
          result: "Graduation project · 9.5/10",
          image: "./img/doantotnghiep.png",
          tags: ["Python", "YOLOv8", "SORT", "OpenCV"],
          links: [
            {
              label: "Source code",
              url: "https://github.com/trakhanh/AppDetectAndMeasureObject.git"
            },
            {
              label: "Video demo",
              url: "https://youtu.be/L07IJW2GpZo"
            }
          ]
        },
        {
          id: "multi-task-learning",
          phase: "foundation",
          phaseLabel: "FOUNDATION · AI RESEARCH",
          title: "Multi-Task Learning Research",
          description:
            "Research combining Object Detection, Segmentation and Depth Estimation on BDD100K and KITTI.",
          result: "Research notebook",
          image: "./img/multi_task.png",
          tags: ["PyTorch", "BDD100K", "KITTI", "Deep Learning"],
          links: [
            {
              label: "View research",
              url: "https://www.kaggle.com/code/khanhtraa/multi-task-bdd100k"
            }
          ]
        },
        {
          id: "finger-counting",
          phase: "foundation",
          phaseLabel: "FOUNDATION · DEEP LEARNING",
          title: "Finger counting application",
          description:
            "A real-time web application exploring CNN, VGG16, ResNet50 and U-Net for recognition and image segmentation.",
          result: "Web application prototype",
          image: "./img/fingercount.png",
          tags: ["Streamlit", "CNN", "ResNet50", "U-Net"],
          links: [
            {
              label: "Source code",
              url: "https://github.com/trakhanh/UngDungDemNgonTay5-9.git"
            },
            {
              label: "Video demo",
              url: "https://youtu.be/NEbpUe2FScA"
            }
          ]
        },
        {
          id: "recruitment-chatbot",
          phase: "professional",
          phaseLabel: "PROFESSIONAL · AI AUTOMATION",
          title: "Multi-channel recruitment chatbot",
          description:
            "A chatbot supporting candidates on web and Facebook, with n8n workflows connecting AI and data sources.",
          result: "Website & fanpage integration",
          image: "./img/N8N.jpg",
          tags: ["n8n", "GPT", "Gemini", "Supabase"],
          links: [
            { label: "Website", url: "https://bongtra.vn" },
            {
              label: "Fanpage",
              url: "https://www.facebook.com/bongtratuyendung"
            }
          ]
        },
        {
          id: "internal-automation",
          phase: "professional",
          phaseLabel: "PROFESSIONAL · INTERNAL TOOLS",
          title: "Internal automation tools",
          description:
            "Workflows for bulk email, meeting-room booking, operational data and internal tasks built with Google Apps Script.",
          result: "Internal operational tools",
          image: "./img/appsscripts.jpg",
          tags: ["Apps Script", "Sheets API", "Calendar API"],
          links: []
        },
        {
          id: "hrm-application",
          phase: "professional",
          phaseLabel: "PROFESSIONAL · HR TECH",
          title: "HRM application",
          description:
            "Contributing to an application for people and operations management. Module details are limited to information that can be shared publicly.",
          result: "Internal business application",
          image: "./img/project5.png",
          tags: ["Web App", "Database", "Role-based Access"],
          links: []
        },
        {
          id: "ai-creative-production",
          phase: "professional",
          phaseLabel: "PROFESSIONAL · AI CREATIVE",
          title: "AI Content Production & Tooling",
          description:
            "Developing AI-powered content workflows and tools for research, scripts, assets, voice, tracking and publishing.",
          result: "Current professional focus",
          image: "./img/Notebooklm.png",
          tags: ["Generative AI", "Video", "Automation", "Workflow"],
          links: []
        }
      ]
    },
    certificates: {
      eyebrow: "04 · CERTIFICATES",
      title: "Certificates and continuous learning.",
      intro:
        "These certificates complement my Data Science foundation and reflect continuous learning across AI, IT Support, Data Analytics and Cybersecurity.",
      verify: "Verify",
      course: "Course information",
      items: [
        {
          title: "Google IT Support Professional Certificate",
          issuer: "Google Career Certificates",
          date: "05-2025",
          description:
            "A foundation in technical support, operating systems, networking, system administration and security.",
          image: "./img/Coursera_IT Support.jpg",
          tags: ["IT Support", "System Admin", "Networking", "Security"],
          verifyUrl:
            "https://coursera.org/share/63ea0eb22d1fb2e525a023d8f36841bf",
          courseUrl:
            "https://coursera.org/professional-certificates/google-it-support"
        },
        {
          title: "Google AI Essentials Certificate",
          issuer: "Google Career Certificates",
          date: "04-2025",
          description:
            "Core concepts covering how AI works, practical AI tools and responsible ways to apply AI at work.",
          image: "./img/Coursera_AI Essentials.jpg",
          tags: ["AI Fundamentals", "AI Tools", "Best Practices"],
          verifyUrl:
            "https://coursera.org/share/ae887854314f490f27c020c8d0621665",
          courseUrl:
            "https://www.coursera.org/specializations/ai-essentials-google#courses"
        },
        {
          title: "Google Prompting Essentials Certificate",
          issuer: "Google Career Certificates",
          date: "04-2025",
          description:
            "Techniques for writing, evaluating and improving prompts to work more effectively with AI tools.",
          image: "./img/Coursera_Prompt AI.jpg",
          tags: ["Prompt Engineering", "AI Prompting", "AI Tools"],
          verifyUrl:
            "https://coursera.org/share/d9a2cf7bbbd45a52c5de029c5c1e0514",
          courseUrl:
            "https://www.coursera.org/learn/prompting-essentials-google"
        },
        {
          title: "Foundations of Cybersecurity Certificate",
          issuer: "Google Career Certificates",
          date: "05-2025",
          description:
            "Foundations of cybersecurity, risk management, security frameworks and threat analysis.",
          image: "./img/Cyber.jpg",
          tags: ["Cybersecurity", "Risk", "Security Framework"],
          verifyUrl: "",
          courseUrl:
            "https://www.coursera.org/learn/foundations-of-cybersecurity"
        },
        {
          title: "Foundations: Data, Data, Everywhere",
          issuer: "Google Career Certificates",
          date: "05-2025",
          description:
            "Core Data Analytics concepts, the data lifecycle and the role of data in decision-making.",
          image: "./img/ana.jpg",
          tags: ["Data Analytics", "Data Ethics", "Data Lifecycle"],
          verifyUrl: "",
          courseUrl: "https://www.coursera.org/learn/foundations-data"
        },
        {
          title: "Ask Questions to Make Data-Driven Decisions",
          issuer: "Google Career Certificates",
          date: "05-2025",
          description:
            "Framing effective questions, understanding business needs and using data to support decisions.",
          image: "./img/ask.jpg",
          tags: ["Data-Driven Decisions", "Problem Solving", "Analysis"],
          verifyUrl: "",
          courseUrl:
            "https://www.coursera.org/learn/ask-questions-make-decisions"
        }
      ]
    },
    about: {
      eyebrow: "05 · CAPABILITIES",
      title: "I connect data, products and operations.",
      intro:
        "My strength is not a single tool. I can move from a problem, its data and technical experiments to workflows, interfaces and products used by real people.",
      groups: [
        {
          title: "Data & AI",
          items: ["Python", "Data Analysis", "Machine Learning", "Deep Learning", "Computer Vision"]
        },
        {
          title: "Creative AI",
          items: ["AI Video", "Script Workflow", "AI Visual", "AI Voice", "Production Systems"]
        },
        {
          title: "Apps & Automation",
          items: ["JavaScript", "n8n", "Google Apps Script", "API", "HRM", "Internal Tools"]
        }
      ],
      cv: "View CV",
      cvUrl:
        "https://drive.google.com/drive/folders/1DyqSabuMZM8SSXEn5prEhj6KoVvWKn66?usp=sharing"
    },
    contact: {
      eyebrow: "06 · CONTACT",
      title: "Let’s discuss a real problem.",
      intro:
        "I am interested in opportunities that connect Data Science, applied AI, creative production and operational systems.",
      emailLabel: "Send an email",
      socialLabel: "Connect"
    },
    footer: "Tra Nguyen Gia Khanh · Data Science → Applied AI Systems"
  }
};
