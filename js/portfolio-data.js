window.PORTFOLIO_CONTENT = {
  vi: {
    meta: {
      title: "Trà Nguyễn Gia Khánh — Data Science, AI & Digital Transformation",
      description:
        "Portfolio của Trà Nguyễn Gia Khánh: nền tảng Data Science; kinh nghiệm ứng dụng AI trong chuyển đổi số, xây dựng HRM và quy trình sản xuất video bằng AI."
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
      title: "Từ Data Science đến AI và chuyển đổi số.",
      intro:
        "Tôi học Data Science, xây nền tảng về AI, Machine Learning và Computer Vision. Trong công việc, tôi phát triển kinh nghiệm ứng dụng AI vào chuyển đổi số: thiết kế ERD, xây dựng ứng dụng HRM và hỗ trợ toàn bộ quy trình sản xuất video bằng AI.",
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
          title: "AI Video Production",
          description:
            "Ứng dụng ChatGPT, Claude, Gemini, Antigravity và các công cụ AI vào research, kịch bản, hình ảnh, voice, animation và quy trình sản xuất video.",
          meta: "Professional direction 01"
        },
        {
          number: "03",
          label: "HƯỚNG PHÁT TRIỂN KHI ĐI LÀM",
          title: "Digital Transformation & HRM",
          description:
            "Phân tích nghiệp vụ, thiết kế ERD và mô hình dữ liệu, sau đó triển khai thành ứng dụng HRM cùng các workflow số hóa phục vụ nhân sự và vận hành.",
          meta: "Professional direction 02"
        }
      ]
    },
    work: {
      eyebrow: "02 · WHAT I DO NOW",
      title: "Hai mảng tôi phát triển thêm trong công việc.",
      intro:
        "Nền tảng Data Science giúp tôi tiếp cận chuyển đổi số theo hướng có hệ thống: hiểu dữ liệu, mô hình hóa nghiệp vụ, thiết kế quy trình và đưa AI vào sản phẩm thực tế.",
      areas: [
        {
          index: "A",
          title: "AI Video Production",
          description:
            "Tôi có kinh nghiệm ứng dụng AI để hỗ trợ quy trình sản xuất series YouTube, video quảng cáo và nội dung short-form, từ nghiên cứu ý tưởng đến xuất bản.",
          capabilities: [
            "ChatGPT · Claude · Gemini",
            "Antigravity · NotebookLM",
            "Research · script · storyboard",
            "AI visual · voice · animation",
            "Editing · production tracking",
            "Workflow automation · publishing"
          ],
          note: "AI tools + end-to-end video workflow"
        },
        {
          index: "B",
          title: "Digital Transformation & HRM",
          description:
            "Tôi từng trực tiếp xây dựng một ứng dụng HRM theo hướng chuyển đổi số: từ phân tích quy trình, thiết kế ERD và cấu trúc dữ liệu đến giao diện, phân quyền và tự động hóa vận hành.",
          capabilities: [
            "Business process analysis",
            "ERD · relational data modeling",
            "JavaScript · Web App · API",
            "Role-based access control",
            "n8n · Google Apps Script",
            "Supabase · workflow automation"
          ],
          note: "Process → ERD → product → operations"
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
          phaseLabel: "CÔNG VIỆC · CHUYỂN ĐỔI SỐ",
          title: "Thiết kế ERD & xây dựng ứng dụng HRM",
          description:
            "Trực tiếp xây dựng ứng dụng HRM từ phân tích nghiệp vụ, thiết kế ERD và mô hình dữ liệu đến phân quyền, giao diện quản trị và số hóa quy trình nhân sự. Chi tiết module được giới hạn theo phạm vi có thể công khai.",
          result: "Digital transformation · HRM product",
          image: "./img/project5.png",
          tags: ["ERD", "Data Modeling", "Web App", "Role-based Access"],
          links: []
        },
        {
          id: "ai-creative-production",
          phase: "professional",
          phaseLabel: "CÔNG VIỆC · AI CREATIVE",
          title: "AI Video Production & Tooling",
          description:
            "Ứng dụng ChatGPT, Claude, Gemini, Antigravity và NotebookLM để hỗ trợ research, script, storyboard, asset, voice, tracking và publishing trong quy trình sản xuất video.",
          result: "Current professional focus",
          image: "./img/Notebooklm.png",
          tags: ["ChatGPT", "Claude", "Antigravity", "AI Video"],
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
      title: "Tôi kết nối dữ liệu, AI và chuyển đổi số.",
      intro:
        "Tôi có thể đi từ bài toán nghiệp vụ và dữ liệu đến ERD, workflow, giao diện và sản phẩm thực tế; đồng thời biết cách chọn công cụ AI phù hợp để tăng tốc sáng tạo và vận hành.",
      groups: [
        {
          title: "Data & AI",
          items: ["Python", "Data Analysis", "Machine Learning", "Deep Learning", "Computer Vision"]
        },
        {
          title: "AI Platforms & Creative",
          items: ["ChatGPT", "Claude", "Gemini", "Antigravity", "NotebookLM", "AI Video", "AI Visual", "AI Voice"]
        },
        {
          title: "Digital Products & Automation",
          items: ["ERD", "Data Modeling", "JavaScript", "Web App", "n8n", "Google Apps Script", "API", "Supabase", "HRM", "RBAC"]
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
        "Tôi quan tâm đến các cơ hội kết hợp Data Science, AI ứng dụng, chuyển đổi số, sản phẩm HRM và quy trình sản xuất video bằng AI.",
      emailLabel: "Gửi email",
      socialLabel: "Kết nối"
    },
    footer: "Trà Nguyễn Gia Khánh · Data Science → AI → Digital Transformation"
  },

  en: {
    meta: {
      title: "Tra Nguyen Gia Khanh — Data Science, AI & Digital Transformation",
      description:
        "Portfolio of Tra Nguyen Gia Khanh: a Data Science foundation applied to digital transformation, HRM systems and AI-powered video production."
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
      title: "From Data Science to AI-driven transformation.",
      intro:
        "I studied Data Science and built a foundation in AI, Machine Learning and Computer Vision. At work, I expanded into AI-enabled digital transformation: designing ERDs, building an HRM application and supporting end-to-end AI video production.",
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
          title: "AI Video Production",
          description:
            "Using ChatGPT, Claude, Gemini, Antigravity and other AI tools for research, scripts, visuals, voice, animation and end-to-end video production.",
          meta: "Professional direction 01"
        },
        {
          number: "03",
          label: "PROFESSIONAL GROWTH",
          title: "Digital Transformation & HRM",
          description:
            "Analyzing business processes, designing ERDs and data models, then turning them into an HRM application and digitized operational workflows.",
          meta: "Professional direction 02"
        }
      ]
    },
    work: {
      eyebrow: "02 · WHAT I DO NOW",
      title: "Two areas I developed through professional work.",
      intro:
        "My Data Science foundation helps me approach digital transformation systematically: understanding data, modeling business processes and turning AI into useful products.",
      areas: [
        {
          index: "A",
          title: "AI Video Production",
          description:
            "I apply AI across YouTube series, advertising videos and short-form content, supporting the production pipeline from initial research to publishing.",
          capabilities: [
            "ChatGPT · Claude · Gemini",
            "Antigravity · NotebookLM",
            "Research · script · storyboard",
            "AI visual · voice · animation",
            "Editing · production tracking",
            "Workflow automation · publishing"
          ],
          note: "AI tools + end-to-end video workflow"
        },
        {
          index: "B",
          title: "Digital Transformation & HRM",
          description:
            "I built an HRM application as a digital-transformation product, moving from process analysis and ERD design to data structure, interface, access control and workflow automation.",
          capabilities: [
            "Business process analysis",
            "ERD · relational data modeling",
            "JavaScript · Web App · API",
            "Role-based access control",
            "n8n · Google Apps Script",
            "Supabase · workflow automation"
          ],
          note: "Process → ERD → product → operations"
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
          phaseLabel: "PROFESSIONAL · DIGITAL TRANSFORMATION",
          title: "ERD design & HRM application",
          description:
            "Built an HRM application from business-process analysis, ERD and data modeling through role-based access, administration interfaces and digitized HR workflows. Module details remain limited to publicly shareable information.",
          result: "Digital transformation · HRM product",
          image: "./img/project5.png",
          tags: ["ERD", "Data Modeling", "Web App", "Role-based Access"],
          links: []
        },
        {
          id: "ai-creative-production",
          phase: "professional",
          phaseLabel: "PROFESSIONAL · AI CREATIVE",
          title: "AI Video Production & Tooling",
          description:
            "Using ChatGPT, Claude, Gemini, Antigravity and NotebookLM to support research, scripts, storyboards, assets, voice, tracking and publishing across the video-production workflow.",
          result: "Current professional focus",
          image: "./img/Notebooklm.png",
          tags: ["ChatGPT", "Claude", "Antigravity", "AI Video"],
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
      title: "I connect data, AI and digital transformation.",
      intro:
        "I move from business problems and data to ERDs, workflows, interfaces and working products, while choosing the right AI tools to accelerate creative and operational work.",
      groups: [
        {
          title: "Data & AI",
          items: ["Python", "Data Analysis", "Machine Learning", "Deep Learning", "Computer Vision"]
        },
        {
          title: "AI Platforms & Creative",
          items: ["ChatGPT", "Claude", "Gemini", "Antigravity", "NotebookLM", "AI Video", "AI Visual", "AI Voice"]
        },
        {
          title: "Digital Products & Automation",
          items: ["ERD", "Data Modeling", "JavaScript", "Web App", "n8n", "Google Apps Script", "API", "Supabase", "HRM", "RBAC"]
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
        "I am interested in opportunities connecting Data Science, applied AI, digital transformation, HRM products and AI-powered video production.",
      emailLabel: "Send an email",
      socialLabel: "Connect"
    },
    footer: "Tra Nguyen Gia Khanh · Data Science → AI → Digital Transformation"
  }
};
