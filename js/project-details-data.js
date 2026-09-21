window.PROJECT_CASES = {
  vi: {
    labels: {
      back: "Quay lại danh sách dự án",
      role: "Vai trò",
      result: "Kết quả",
      scope: "Phạm vi",
      academic: "Dự án học thuật",
      professional: "Dự án thực tế",
      map: "Bản đồ case study",
      challenge: "Bài toán",
      roleSection: "Vai trò & trách nhiệm",
      process: "Quy trình thực hiện",
      technology: "Công nghệ & cách sử dụng",
      outcome: "Kết quả & bài học",
      learning: "Điều tôi rút ra",
      imageCaption: "Hình ảnh đại diện dự án",
      previous: "Dự án trước",
      next: "Dự án tiếp theo",
      contactEyebrow: "TRAO ĐỔI VỀ DỰ ÁN",
      contactTitle: "Muốn biết tôi sẽ áp dụng cách làm này vào bài toán của bạn?",
      contactButton: "Liên hệ với tôi",
      sourceFallback: "Case study công khai đã lược bỏ dữ liệu nội bộ.",
      viewAll: "Tất cả",
      nextSection: "Phần tiếp theo",
      prevSection: "Phần trước",
      notFoundTitle: "Không tìm thấy dự án",
      notFoundText: "Đường dẫn này không khớp với case study nào trong portfolio.",
      notFoundButton: "Quay lại portfolio"
    },
    items: {
      "computer-vision-inspection": {
        role: "Phát triển pipeline Computer Vision và ứng dụng demo",
        challenge:
          "Bài toán không chỉ yêu cầu phát hiện vật thể trên băng chuyền, mà còn phải giữ đúng định danh khi vật thể di chuyển qua nhiều khung hình và ước lượng kích thước ổn định từ dữ liệu camera.",
        responsibilities: [
          "Chuẩn bị dữ liệu, cấu hình thí nghiệm và đánh giá chất lượng phát hiện.",
          "Huấn luyện YOLOv8 để nhận biết vật thể trong từng khung hình.",
          "Kết nối SORT để theo dõi và hạn chế đếm lặp khi vật thể di chuyển.",
          "Xây dựng logic đo lường bằng OpenCV, hoàn thiện demo và tài liệu đồ án."
        ],
        process: [
          {
            title: "Định nghĩa đầu vào và chuẩn đo",
            description:
              "Xác định góc camera, vùng quan sát, loại vật thể và cách quy đổi kích thước ảnh sang giá trị đo có ý nghĩa."
          },
          {
            title: "Huấn luyện bộ phát hiện",
            description:
              "Chuẩn hóa dữ liệu, huấn luyện YOLOv8 và kiểm tra các trường hợp dễ nhầm trước khi đưa vào video."
          },
          {
            title: "Theo dõi và đo lường",
            description:
              "Dùng SORT để duy trì ID; kết hợp bounding box, hình học ảnh và vùng đo để tính kích thước theo từng vật thể."
          },
          {
            title: "Kiểm thử và đóng gói demo",
            description:
              "Chạy thử trên nhiều đoạn video, kiểm tra đếm trùng, độ ổn định phép đo và trình bày kết quả trong ứng dụng demo."
          }
        ],
        technologies: [
          { name: "Python", purpose: "Điều phối toàn bộ pipeline xử lý video và logic ứng dụng." },
          { name: "YOLOv8", purpose: "Phát hiện vị trí và lớp của vật thể theo từng khung hình." },
          { name: "SORT", purpose: "Duy trì ID vật thể xuyên suốt chuỗi khung hình." },
          { name: "OpenCV", purpose: "Đọc video, xử lý hình học ảnh, hiệu chỉnh và hiển thị kết quả đo." }
        ],
        outcome:
          "Hoàn thiện một pipeline từ phát hiện → theo dõi → đo lường và ứng dụng demo có thể trình bày toàn bộ luồng xử lý. Đồ án tốt nghiệp được đánh giá 9.5/10.",
        evidence: [
          "Mã nguồn công khai trên GitHub.",
          "Video demo mô tả luồng phát hiện, theo dõi và đo.",
          "Kết quả đồ án tốt nghiệp: 9.5/10."
        ],
        learning:
          "Độ chính xác mô hình chỉ là một phần; độ ổn định thực tế còn phụ thuộc camera, hiệu chỉnh, tracking và quy tắc xử lý ngoại lệ."
      },
      "multi-task-learning": {
        role: "Nghiên cứu, thiết kế thí nghiệm và xây dựng notebook",
        challenge:
          "Mục tiêu là khảo sát cách một hệ thống thị giác có thể học đồng thời Object Detection, Segmentation và Depth Estimation thay vì vận hành ba mô hình tách rời.",
        responsibilities: [
          "Khảo sát dữ liệu BDD100K và KITTI cho các tác vụ nhận thức đường phố.",
          "Thiết kế pipeline dữ liệu và kiến trúc có biểu diễn dùng chung.",
          "Tổ chức các đầu ra, hàm loss và thí nghiệm so sánh.",
          "Ghi lại giả thuyết, kết quả và giới hạn trong notebook có thể tái hiện."
        ],
        process: [
          {
            title: "Chuẩn hóa bài toán",
            description:
              "Xác định dữ liệu, nhãn và tiêu chí của ba tác vụ để tránh so sánh các đầu ra không đồng nhất."
          },
          {
            title: "Thiết kế biểu diễn dùng chung",
            description:
              "Tổ chức backbone chung và các nhánh đầu ra riêng cho detection, segmentation và depth."
          },
          {
            title: "Cân bằng quá trình học",
            description:
              "Theo dõi ảnh hưởng của từng loss và điều chỉnh cách tổng hợp để một tác vụ không lấn át các tác vụ còn lại."
          },
          {
            title: "Phân tích kết quả",
            description:
              "Quan sát output, ghi nhận lỗi, giới hạn dữ liệu và các hướng cải thiện trong notebook nghiên cứu."
          }
        ],
        technologies: [
          { name: "PyTorch", purpose: "Xây mô hình, vòng lặp huấn luyện và hệ thống loss đa tác vụ." },
          { name: "BDD100K", purpose: "Dữ liệu bối cảnh giao thông cho detection và segmentation." },
          { name: "KITTI", purpose: "Nguồn dữ liệu hỗ trợ thí nghiệm nhận thức chiều sâu." },
          { name: "Jupyter / Kaggle", purpose: "Tổ chức thí nghiệm, trực quan hóa và chia sẻ notebook." }
        ],
        outcome:
          "Tạo notebook nghiên cứu hoàn chỉnh thể hiện tư duy từ dữ liệu, kiến trúc, loss đến phân tích output. Đây là nghiên cứu học thuật, chưa phải hệ thống triển khai production.",
        evidence: ["Notebook nghiên cứu được công khai trên Kaggle.", "Pipeline thí nghiệm có thể tái chạy và mở rộng."],
        learning:
          "Multi-task Learning không tự động tốt hơn; chất lượng phụ thuộc mạnh vào mức độ tương thích dữ liệu, cách chia sẻ biểu diễn và chiến lược cân bằng loss."
      },
      "finger-counting": {
        role: "Phát triển mô hình thử nghiệm và ứng dụng web real-time",
        challenge:
          "Nhận biết số ngón tay từ hình ảnh thực tế chịu ảnh hưởng lớn bởi ánh sáng, nền, góc tay và sự khác nhau giữa bài toán phân loại với phân đoạn ảnh.",
        responsibilities: [
          "Chuẩn bị dữ liệu và các biến thể tiền xử lý cho ảnh bàn tay.",
          "Thử nghiệm CNN, VGG16 và ResNet50 cho nhận dạng.",
          "Khảo sát U-Net để phân đoạn vùng bàn tay.",
          "Tích hợp suy luận vào giao diện Streamlit và quay video demo."
        ],
        process: [
          {
            title: "Chuẩn bị dữ liệu",
            description:
              "Làm sạch, thay đổi kích thước và tổ chức tập dữ liệu theo đầu ra của từng hướng tiếp cận."
          },
          {
            title: "So sánh mô hình",
            description:
              "Xây baseline CNN và thử transfer learning với VGG16, ResNet50 để đánh giá trade-off."
          },
          {
            title: "Khảo sát segmentation",
            description:
              "Dùng U-Net để tách vùng bàn tay, từ đó hiểu thêm khi nào segmentation hỗ trợ nhận dạng."
          },
          {
            title: "Đưa vào web demo",
            description:
              "Đóng gói pipeline inference trong Streamlit để kiểm tra trực tiếp và trình bày kết quả."
          }
        ],
        technologies: [
          { name: "Streamlit", purpose: "Xây giao diện web thử nghiệm và luồng inference." },
          { name: "CNN", purpose: "Baseline để kiểm chứng pipeline dữ liệu và phân loại." },
          { name: "VGG16 / ResNet50", purpose: "Transfer learning và so sánh chất lượng biểu diễn." },
          { name: "U-Net", purpose: "Phân đoạn vùng bàn tay trong nhánh thử nghiệm segmentation." }
        ],
        outcome:
          "Hoàn thiện prototype web có thể chạy inference và trình bày nhiều hướng mô hình trong cùng một bài toán nhận dạng bàn tay.",
        evidence: ["Mã nguồn công khai trên GitHub.", "Video demo ứng dụng web real-time."],
        learning:
          "Mô hình phù hợp phải được chọn theo dữ liệu, độ trễ và môi trường sử dụng; kiến trúc lớn hơn không luôn tạo trải nghiệm tốt hơn."
      },
      "recruitment-chatbot": {
        role: "Hỗ trợ website và triển khai workflow AI Chatbot đa kênh",
        challenge:
          "Doanh nghiệp cần trả lời hai nhóm nhu cầu khác nhau—khách hàng trên website và ứng viên trên Fanpage—trong khi nội dung, ngữ cảnh và nguồn dữ liệu không giống nhau.",
        responsibilities: [
          "Thu thập nhóm câu hỏi thường gặp và phân loại ý định theo từng kênh.",
          "Thiết kế workflow n8n kết nối AI, dữ liệu và logic phản hồi.",
          "Tích hợp GPT/Gemini và Supabase vào luồng chatbot.",
          "Kiểm thử câu hỏi ngoài phạm vi, fallback và tình huống cần chuyển cho con người."
        ],
        process: [
          {
            title: "Lập bản đồ hội thoại",
            description:
              "Tách use case khách hàng và tuyển dụng, xác định intent, dữ liệu cần truy xuất và giới hạn trả lời."
          },
          {
            title: "Tổ chức nguồn tri thức",
            description:
              "Chuẩn hóa nội dung FAQ và dữ liệu tham chiếu để chatbot lấy đúng ngữ cảnh."
          },
          {
            title: "Điều phối workflow",
            description:
              "Dùng n8n để nhận sự kiện, gọi mô hình, truy xuất dữ liệu, kiểm tra điều kiện và trả kết quả về đúng kênh."
          },
          {
            title: "Kiểm thử và cải thiện",
            description:
              "Thử câu hỏi thật, rà soát câu trả lời không chắc chắn và điều chỉnh rule chuyển tiếp cho nhân viên."
          }
        ],
        technologies: [
          { name: "n8n", purpose: "Điều phối sự kiện, AI, nguồn dữ liệu và phản hồi đa kênh." },
          { name: "GPT / Gemini", purpose: "Hiểu câu hỏi, tạo phản hồi và hỗ trợ xử lý ngôn ngữ." },
          { name: "Supabase", purpose: "Lưu trữ hoặc truy xuất dữ liệu phục vụ workflow." },
          { name: "Website / Facebook", purpose: "Hai điểm tiếp xúc dành cho khách hàng và ứng viên." }
        ],
        outcome:
          "Hình thành hai luồng hỗ trợ tự động cho website và tuyển dụng, giúp nhóm vận hành có một nền tảng phản hồi nhất quán hơn.",
        evidence: ["Website Bông Trà đang hoạt động.", "Fanpage tuyển dụng được liên kết trong portfolio."],
        learning:
          "Chatbot doanh nghiệp cần kiến trúc ngữ cảnh, fallback và quyền kiểm soát của con người—không thể chỉ dựa vào một prompt dài.",
        privacyNote:
          "Case study chỉ mô tả kiến trúc và cách tiếp cận; prompt hệ thống, dữ liệu nội bộ và thông tin người dùng không được công khai."
      },
      "internal-automation": {
        role: "Phân tích và xây dựng bộ công cụ tự động hóa nội bộ",
        challenge:
          "Các công việc như đặt phòng họp, gửi bảng lương, trả lời chính sách nhân sự và thu thập đánh giá lặp lại thường xuyên, dễ sai sót và tiêu tốn thời gian vận hành.",
        responsibilities: [
          "Tách từng nghiệp vụ thành dữ liệu đầu vào, rule, hành động và trạng thái lỗi.",
          "Xây script kết nối Google Sheets, Calendar và email.",
          "Thiết lập trigger, kiểm tra quyền truy cập và log vận hành.",
          "Soạn hướng dẫn để nhân viên có thể sử dụng và xử lý tình huống cơ bản."
        ],
        process: [
          {
            title: "Khảo sát thao tác thủ công",
            description:
              "Quan sát luồng hiện tại, xác định bước lặp lại và những điểm cần con người phê duyệt."
          },
          {
            title: "Chuẩn hóa dữ liệu và rule",
            description:
              "Tổ chức biểu mẫu, sheet và điều kiện nghiệp vụ trước khi viết automation."
          },
          {
            title: "Kết nối dịch vụ Google",
            description:
              "Dùng Apps Script và API để tạo lịch, gửi email, đọc dữ liệu và cập nhật trạng thái."
          },
          {
            title: "Vận hành và bàn giao",
            description:
              "Bổ sung kiểm tra lỗi, quyền truy cập, hướng dẫn sử dụng và kịch bản xử lý khi workflow gián đoạn."
          }
        ],
        technologies: [
          { name: "Google Apps Script", purpose: "Logic automation và kết nối các dịch vụ Google Workspace." },
          { name: "Sheets API", purpose: "Nguồn dữ liệu nghiệp vụ, cấu hình và trạng thái xử lý." },
          { name: "Calendar API", purpose: "Kiểm tra và tạo lịch đặt phòng họp." },
          { name: "Email Automation", purpose: "Gửi bảng lương và thông báo theo dữ liệu có cấu trúc." }
        ],
        outcome:
          "Bộ công cụ bao phủ bốn nhóm workflow nội bộ và cùng chương trình automation góp phần giảm khoảng 80% khối lượng xử lý thủ công.",
        evidence: ["Đặt phòng họp tự động.", "Gửi email bảng lương hàng loạt.", "FAQ HR và luồng thu thập đánh giá."],
        learning:
          "Automation hiệu quả nhất khi rule đơn giản, quyền rõ ràng và tài liệu đủ để người dùng tự vận hành.",
        privacyNote:
          "Không công khai dữ liệu nhân sự, bảng lương, tài khoản tích hợp hoặc cấu hình workflow nội bộ."
      },
      "preorder-workshop-web": {
        role: "Thiết lập landing page và luồng đăng ký / đặt hàng",
        challenge:
          "Các chiến dịch Workshop và Pre-order cần một luồng rõ từ nội dung Marketing đến đăng ký, thanh toán và tiếp nhận thông tin, thay cho nhiều bước xử lý rời rạc.",
        responsibilities: [
          "Phân tích hành trình người dùng và thông tin Marketing cần truyền tải.",
          "Thiết kế cấu trúc landing page, CTA và biểu mẫu đăng ký.",
          "Kết nối thanh toán trực tuyến vào luồng chuyển đổi.",
          "Kiểm thử trên mobile và bàn giao hướng dẫn cập nhật nội dung."
        ],
        process: [
          {
            title: "Vẽ hành trình chuyển đổi",
            description:
              "Xác định người dùng đi từ chiến dịch đến lựa chọn chương trình, nhập thông tin và hoàn tất thanh toán."
          },
          {
            title: "Xây cấu trúc landing page",
            description:
              "Ưu tiên thông tin chương trình, lợi ích, thời gian, CTA và các trường đăng ký cần thiết."
          },
          {
            title: "Kết nối thanh toán",
            description:
              "Đưa bước thanh toán trực tuyến vào đúng vị trí để giảm trao đổi thủ công sau đăng ký."
          },
          {
            title: "QA và bàn giao",
            description:
              "Kiểm tra hiển thị, form, CTA, thanh toán trên nhiều kích thước và hướng dẫn đội Marketing vận hành."
          }
        ],
        technologies: [
          { name: "Landing Page", purpose: "Trình bày chiến dịch và tập trung người dùng vào một hành động chính." },
          { name: "Online Payment", purpose: "Rút ngắn bước xác nhận và thanh toán thủ công." },
          { name: "Registration Form", purpose: "Thu thập dữ liệu đăng ký / đặt hàng có cấu trúc." },
          { name: "Responsive Web", purpose: "Bảo đảm luồng chuyển đổi sử dụng tốt trên thiết bị di động." }
        ],
        outcome:
          "Tạo luồng số hóa gọn hơn cho đăng ký Workshop và đặt hàng Pre-order, hỗ trợ Marketing triển khai chiến dịch nhanh và giảm bước tiếp nhận thủ công.",
        evidence: ["Hai nhóm landing page: Workshop và Pre-order.", "Luồng thanh toán trực tuyến được tích hợp."],
        learning:
          "Một landing page tốt phải nối đúng Marketing với vận hành phía sau; giao diện đẹp nhưng dữ liệu đầu ra khó xử lý vẫn tạo thêm việc."
      },
      "hrm-application": {
        role: "Trực tiếp xây dựng ứng dụng HRM theo định hướng ERP",
        challenge:
          "Bài toán nhân sự cần số hóa quy trình, tập trung dữ liệu, phân quyền theo vai trò và tạo giao diện quản trị nhất quán mà không biến hệ thống thành tập hợp form rời rạc.",
        responsibilities: [
          "Khảo sát quy trình và xác định dữ liệu cốt lõi của từng luồng nhân sự.",
          "Thiết kế cấu trúc module, trạng thái và mối quan hệ dữ liệu.",
          "Xây giao diện quản trị và cơ chế phân quyền theo vai trò.",
          "Kết nối workflow, kiểm thử, tài liệu hóa và hỗ trợ đưa vào vận hành."
        ],
        process: [
          {
            title: "Khảo sát quy trình thật",
            description:
              "Bắt đầu từ người dùng, biểu mẫu hiện có, điểm bàn giao và các vấn đề dữ liệu thay vì bắt đầu từ màn hình."
          },
          {
            title: "Mô hình hóa dữ liệu và module",
            description:
              "Xác định thực thể, trạng thái, quan hệ và luồng phê duyệt theo tư duy hệ thống ERP."
          },
          {
            title: "Xây ứng dụng và phân quyền",
            description:
              "Phát triển giao diện web quản trị, kiểm soát truy cập theo vai trò và kết nối các bước workflow."
          },
          {
            title: "Kiểm thử và chuyển giao",
            description:
              "Kiểm tra quyền, dữ liệu, tình huống ngoại lệ; sau đó tài liệu hóa và hỗ trợ người dùng làm quen."
          }
        ],
        technologies: [
          { name: "JavaScript / Web App", purpose: "Xây giao diện và trải nghiệm quản trị trên web." },
          { name: "ERP / HRM Model", purpose: "Tổ chức module, dữ liệu tập trung và luồng nghiệp vụ." },
          { name: "RBAC", purpose: "Kiểm soát quyền xem và thao tác theo vai trò người dùng." },
          { name: "Workflow / API", purpose: "Kết nối trạng thái, hành động và các bước vận hành liên quan." }
        ],
        outcome:
          "Tạo nền tảng HRM phục vụ số hóa quy trình nhân sự và quản trị vận hành theo hướng ERP; đồng thời tích lũy kinh nghiệm từ khảo sát đến bàn giao hệ thống.",
        evidence: ["Ứng dụng HRM có giao diện quản trị và RBAC.", "Hệ thống eOffice Sun Media được liên kết công khai."],
        learning:
          "Chuyển đổi số phải chuẩn hóa quy trình và quyền trước khi số hóa giao diện; nếu không, phần mềm chỉ làm quy trình cũ chạy nhanh hơn.",
        privacyNote:
          "Để bảo vệ doanh nghiệp và người dùng, case study không công khai tên module nhạy cảm, cấu trúc dữ liệu, tài khoản, ảnh màn hình nội bộ hoặc logic phân quyền chi tiết."
      },
      "ai-creative-production": {
        role: "R&D công cụ AI và thiết kế workflow hỗ trợ sản xuất video",
        challenge:
          "Các công cụ GenAI tạo ra nhiều loại đầu ra nhưng dễ rời rạc. Bài toán là tổ chức chúng thành workflow có brief, kiểm soát chất lượng, version và bàn giao rõ ràng cho quy trình sản xuất video.",
        responsibilities: [
          "Nghiên cứu và đánh giá công cụ AI theo từng khâu sản xuất.",
          "Ứng dụng AI vào research, script, storyboard, visual, voice và animation.",
          "Thiết kế cách tracking asset, version và trạng thái công việc.",
          "Duy trì human-in-the-loop để kiểm tra nội dung, hình ảnh và tính nhất quán."
        ],
        process: [
          {
            title: "Brief và research",
            description:
              "Chuyển yêu cầu thành mục tiêu, đối tượng, thông điệp và nguồn tham chiếu trước khi tạo nội dung."
          },
          {
            title: "Script và storyboard",
            description:
              "Dùng AI hỗ trợ cấu trúc kịch bản, shot list và storyboard, sau đó biên tập lại theo định hướng sáng tạo."
          },
          {
            title: "Tạo và quản lý asset",
            description:
              "Sản xuất visual, voice, animation; đặt quy tắc tên, version và trạng thái để tránh mất kiểm soát."
          },
          {
            title: "QA và publishing",
            description:
              "Rà soát factuality, hình ảnh, giọng điệu, continuity và checklist đầu ra trước khi xuất bản."
          }
        ],
        technologies: [
          { name: "ChatGPT / Claude", purpose: "Research, cấu trúc nội dung, script và phản biện đầu ra." },
          { name: "Gemini / NotebookLM", purpose: "Tổng hợp nguồn, đọc tài liệu và hỗ trợ kiểm chứng ngữ cảnh." },
          { name: "Antigravity", purpose: "Thử nghiệm công cụ và hướng tạo asset trong hoạt động R&D." },
          { name: "AI Visual / Voice", purpose: "Tạo hình ảnh, giọng đọc và asset cho các bước sản xuất." }
        ],
        outcome:
          "Hình thành cách tiếp cận có hệ thống cho AI Video Production, kết nối research → script → asset → QA → publishing thay vì sử dụng từng công cụ riêng lẻ.",
        evidence: ["Workflow bao phủ nhiều khâu sản xuất video.", "Bộ công cụ được đánh giá theo nhiệm vụ thay vì theo xu hướng."],
        learning:
          "AI tăng tốc sản xuất nhưng không thay thế art direction, fact-checking và quản lý phiên bản; chất lượng cuối cùng vẫn cần người chịu trách nhiệm.",
        privacyNote:
          "Không công khai tài sản khách hàng, nội dung chưa phát hành hoặc cấu hình workflow sản xuất nội bộ."
      }
    }
  },
  en: {
    labels: {
      back: "Back to selected projects",
      role: "Role",
      result: "Outcome",
      scope: "Scope",
      academic: "Academic project",
      professional: "Professional project",
      map: "Case study map",
      challenge: "The challenge",
      roleSection: "Role & responsibilities",
      process: "How I approached it",
      technology: "Technology & how it was used",
      outcome: "Outcome & learning",
      learning: "What I learned",
      imageCaption: "Representative project visual",
      previous: "Previous project",
      next: "Next project",
      contactEyebrow: "DISCUSS A PROJECT",
      contactTitle: "Want to see how I would apply this approach to your problem?",
      contactButton: "Contact me",
      sourceFallback: "This public case study excludes internal data.",
      viewAll: "All",
      nextSection: "Next section",
      prevSection: "Previous section",
      notFoundTitle: "Project not found",
      notFoundText: "This URL does not match a case study in the portfolio.",
      notFoundButton: "Back to portfolio"
    },
    items: {
      "computer-vision-inspection": {
        role: "Computer Vision pipeline and demo application development",
        challenge:
          "The task required more than detecting objects on a conveyor: the system also had to preserve identity across frames and estimate dimensions consistently from camera data.",
        responsibilities: [
          "Prepared data, configured experiments and evaluated detection quality.",
          "Trained YOLOv8 to localize and classify objects frame by frame.",
          "Connected SORT to preserve identities and reduce duplicate counting.",
          "Built OpenCV measurement logic, the demo application and project documentation."
        ],
        process: [
          { title: "Define input and calibration", description: "Specified camera angle, observation area, object types and the conversion from image coordinates to useful measurements." },
          { title: "Train the detector", description: "Standardized the dataset, trained YOLOv8 and reviewed common failure cases before video integration." },
          { title: "Track and measure", description: "Used SORT for persistent IDs, then combined boxes, image geometry and a measurement zone to estimate dimensions." },
          { title: "Validate and package", description: "Tested multiple videos, checked duplicate counts and measurement stability, then presented the complete pipeline in a demo." }
        ],
        technologies: [
          { name: "Python", purpose: "Orchestrated video processing and application logic." },
          { name: "YOLOv8", purpose: "Detected object location and class in each frame." },
          { name: "SORT", purpose: "Maintained object identity throughout the sequence." },
          { name: "OpenCV", purpose: "Handled video, geometry, calibration and measurement visualization." }
        ],
        outcome:
          "Delivered an end-to-end detect → track → measure pipeline and a demonstrable application. The graduation project received a score of 9.5/10.",
        evidence: ["Public GitHub repository.", "Video demonstration of the full workflow.", "Graduation-project score: 9.5/10."],
        learning:
          "Model accuracy is only one layer; production stability also depends on camera setup, calibration, tracking and exception rules."
      },
      "multi-task-learning": {
        role: "Research, experiment design and notebook development",
        challenge:
          "The research explored whether one perception system could learn Object Detection, Segmentation and Depth Estimation together instead of running three isolated models.",
        responsibilities: [
          "Reviewed BDD100K and KITTI data for road-scene perception.",
          "Designed a data pipeline and shared-representation architecture.",
          "Organized task heads, losses and comparison experiments.",
          "Documented hypotheses, results and limitations in a reproducible notebook."
        ],
        process: [
          { title: "Normalize the problem", description: "Aligned datasets, labels and evaluation needs across the three perception tasks." },
          { title: "Design shared representations", description: "Structured a shared backbone with separate heads for detection, segmentation and depth." },
          { title: "Balance training", description: "Observed task-loss behavior and adjusted aggregation so one objective would not dominate the others." },
          { title: "Analyze outputs", description: "Inspected predictions, recorded failure patterns and captured improvement directions in the research notebook." }
        ],
        technologies: [
          { name: "PyTorch", purpose: "Built the model, training loop and multi-task loss system." },
          { name: "BDD100K", purpose: "Provided road-scene data for detection and segmentation." },
          { name: "KITTI", purpose: "Supported depth-perception experiments." },
          { name: "Jupyter / Kaggle", purpose: "Organized, visualized and shared the experiments." }
        ],
        outcome:
          "Produced a complete research notebook showing the path from data and architecture to losses and output analysis. This was an academic experiment, not a production deployment.",
        evidence: ["Public Kaggle research notebook.", "An experiment pipeline designed for extension and reruns."],
        learning:
          "Multi-task Learning is not automatically better; results depend on data compatibility, representation sharing and loss-balancing strategy."
      },
      "finger-counting": {
        role: "Model experimentation and real-time web prototype development",
        challenge:
          "Finger recognition in real images is affected by lighting, background, hand angle and the distinction between classification and image segmentation.",
        responsibilities: [
          "Prepared hand-image data and preprocessing variants.",
          "Experimented with CNN, VGG16 and ResNet50 for recognition.",
          "Explored U-Net for hand-region segmentation.",
          "Integrated inference into Streamlit and recorded a demo."
        ],
        process: [
          { title: "Prepare the data", description: "Cleaned, resized and organized the dataset for each modeling approach." },
          { title: "Compare models", description: "Built a CNN baseline and tested transfer learning with VGG16 and ResNet50." },
          { title: "Explore segmentation", description: "Used U-Net to isolate the hand region and assess when segmentation helps recognition." },
          { title: "Deliver a web demo", description: "Packaged inference in Streamlit for direct testing and presentation." }
        ],
        technologies: [
          { name: "Streamlit", purpose: "Provided the web interface and inference flow." },
          { name: "CNN", purpose: "Established a baseline for the data and classification pipeline." },
          { name: "VGG16 / ResNet50", purpose: "Enabled transfer-learning comparison." },
          { name: "U-Net", purpose: "Segmented the hand region in a separate experimental path." }
        ],
        outcome:
          "Delivered a web prototype capable of running inference and presenting multiple modeling approaches for the same hand-recognition problem.",
        evidence: ["Public GitHub repository.", "Real-time web application video demo."],
        learning:
          "The right model depends on data, latency and usage context; a larger architecture does not always produce a better experience."
      },
      "recruitment-chatbot": {
        role: "Website support and multi-channel AI Chatbot workflow implementation",
        challenge:
          "The business needed to serve two distinct audiences—website customers and Facebook candidates—whose content, context and data sources were different.",
        responsibilities: [
          "Collected frequently asked questions and grouped intents by channel.",
          "Designed n8n workflows connecting AI, data and response logic.",
          "Integrated GPT/Gemini and Supabase into the chatbot flow.",
          "Tested out-of-scope questions, fallbacks and human handoff cases."
        ],
        process: [
          { title: "Map conversations", description: "Separated customer and recruitment use cases, then defined intents, data needs and response limits." },
          { title: "Structure knowledge", description: "Normalized FAQ content and reference data so the assistant could retrieve relevant context." },
          { title: "Orchestrate workflows", description: "Used n8n to receive events, call models, query data, evaluate rules and return results to the correct channel." },
          { title: "Test and improve", description: "Ran realistic questions, reviewed uncertainty and adjusted handoff rules for staff." }
        ],
        technologies: [
          { name: "n8n", purpose: "Orchestrated events, AI, data sources and multi-channel responses." },
          { name: "GPT / Gemini", purpose: "Understood questions and generated language responses." },
          { name: "Supabase", purpose: "Stored or retrieved workflow data." },
          { name: "Website / Facebook", purpose: "Served customers and recruitment candidates." }
        ],
        outcome:
          "Established two automated support flows for website and recruitment use cases, giving operations a more consistent response foundation.",
        evidence: ["Live Bong Tra website.", "Recruitment Facebook page linked from the portfolio."],
        learning:
          "Business chatbots need context architecture, fallbacks and human control—not simply a long prompt.",
        privacyNote:
          "The case study covers architecture and approach only; system prompts, internal data and user information are not disclosed."
      },
      "internal-automation": {
        role: "Internal-process analysis and automation tool development",
        challenge:
          "Meeting-room booking, payroll delivery, HR-policy questions and review collection were repetitive, error-prone and costly in operational time.",
        responsibilities: [
          "Decomposed each process into inputs, rules, actions and failure states.",
          "Built scripts connecting Google Sheets, Calendar and email.",
          "Configured triggers, access control and operational logging.",
          "Wrote guidance so employees could use and troubleshoot the tools."
        ],
        process: [
          { title: "Audit manual work", description: "Observed current flows and identified repetitive steps plus points that still needed human approval." },
          { title: "Normalize data and rules", description: "Structured forms, sheets and business conditions before implementing automation." },
          { title: "Connect Google services", description: "Used Apps Script and APIs to create calendar events, send email, read data and update status." },
          { title: "Operate and hand over", description: "Added error checks, permissions, guidance and recovery steps for interrupted workflows." }
        ],
        technologies: [
          { name: "Google Apps Script", purpose: "Implemented automation logic across Google Workspace." },
          { name: "Sheets API", purpose: "Held operational data, configuration and processing status." },
          { name: "Calendar API", purpose: "Checked availability and created meeting-room bookings." },
          { name: "Email Automation", purpose: "Delivered payroll and notifications from structured data." }
        ],
        outcome:
          "The toolset covered four internal workflow groups and, as part of the automation program, contributed to an approximately 80% reduction in manual processing.",
        evidence: ["Automated meeting-room booking.", "Bulk payroll-email delivery.", "HR FAQ and review-collection flows."],
        learning:
          "Automation works best when rules are simple, permissions are explicit and documentation lets users operate independently.",
        privacyNote:
          "Employee data, payroll records, integration accounts and internal workflow configuration are not disclosed."
      },
      "preorder-workshop-web": {
        role: "Landing-page and registration / ordering flow setup",
        challenge:
          "Workshop and Pre-order campaigns needed a clear path from Marketing content to registration, payment and information capture instead of disconnected manual steps.",
        responsibilities: [
          "Mapped the user journey and campaign information hierarchy.",
          "Designed landing-page structure, CTAs and registration forms.",
          "Connected online payment to the conversion flow.",
          "Tested mobile behavior and handed over content-update guidance."
        ],
        process: [
          { title: "Map conversion", description: "Defined the path from campaign entry to program choice, information entry and payment." },
          { title: "Build page structure", description: "Prioritized program details, benefits, timing, CTA and required registration fields." },
          { title: "Connect payment", description: "Placed online payment in the right stage to reduce post-registration coordination." },
          { title: "QA and handoff", description: "Tested layout, forms, CTA and payment across sizes, then documented operation for Marketing." }
        ],
        technologies: [
          { name: "Landing Page", purpose: "Presented the campaign around one primary action." },
          { name: "Online Payment", purpose: "Reduced manual payment confirmation." },
          { name: "Registration Form", purpose: "Captured structured registration and order data." },
          { name: "Responsive Web", purpose: "Kept the conversion path usable on mobile." }
        ],
        outcome:
          "Delivered a more compact digital flow for Workshop registration and Pre-order campaigns, helping Marketing launch faster and reducing manual intake steps.",
        evidence: ["Landing-page flows for Workshop and Pre-order.", "Online-payment integration."],
        learning:
          "A landing page must connect Marketing with downstream operations; a beautiful page that produces difficult data still creates more work."
      },
      "hrm-application": {
        role: "Direct development of an ERP-oriented HRM application",
        challenge:
          "HR operations needed digitized workflows, centralized data, role-based access and a consistent administration experience—not a collection of disconnected forms.",
        responsibilities: [
          "Reviewed processes and identified the core data for each HR flow.",
          "Designed module structure, states and data relationships.",
          "Built administration interfaces and role-based access.",
          "Connected workflows, tested behavior, documented the system and supported adoption."
        ],
        process: [
          { title: "Study real processes", description: "Started with users, existing forms, handoff points and data issues rather than screens." },
          { title: "Model data and modules", description: "Defined entities, states, relationships and approvals with an ERP-oriented mindset." },
          { title: "Build the app and access model", description: "Developed web administration, RBAC controls and connected workflow steps." },
          { title: "Test and hand over", description: "Validated permissions, data and edge cases, then documented and supported user onboarding." }
        ],
        technologies: [
          { name: "JavaScript / Web App", purpose: "Built the web administration experience." },
          { name: "ERP / HRM Model", purpose: "Structured modules, centralized data and business flows." },
          { name: "RBAC", purpose: "Controlled visibility and actions by user role." },
          { name: "Workflow / API", purpose: "Connected states, actions and related operational steps." }
        ],
        outcome:
          "Created an HRM foundation for digitized HR and ERP-oriented operations while gaining implementation experience from discovery through handover.",
        evidence: ["HRM application with administration and RBAC.", "Public link to the Sun Media eOffice system."],
        learning:
          "Digital transformation should standardize process and access rules before digitizing screens; otherwise software only accelerates the old process.",
        privacyNote:
          "To protect the business and its users, sensitive module names, data structures, accounts, internal screenshots and detailed access logic are not disclosed."
      },
      "ai-creative-production": {
        role: "AI-tool R&D and video-production workflow design",
        challenge:
          "GenAI tools produce many output types but easily become fragmented. The challenge was organizing them into a workflow with a clear brief, quality control, versioning and handoff.",
        responsibilities: [
          "Researched and evaluated AI tools by production stage.",
          "Applied AI to research, scripts, storyboards, visuals, voice and animation.",
          "Designed asset, version and work-status tracking.",
          "Kept a human in the loop for factual, visual and consistency review."
        ],
        process: [
          { title: "Brief and research", description: "Translated requests into objectives, audience, message and references before generation." },
          { title: "Script and storyboard", description: "Used AI for structure, shot lists and storyboards, then edited against the creative direction." },
          { title: "Create and manage assets", description: "Produced visual, voice and animation assets with naming, version and status rules." },
          { title: "QA and publishing", description: "Reviewed factuality, visuals, tone, continuity and final-output checklists before publishing." }
        ],
        technologies: [
          { name: "ChatGPT / Claude", purpose: "Research, content structure, scripts and critical review." },
          { name: "Gemini / NotebookLM", purpose: "Source synthesis, document reading and contextual verification." },
          { name: "Antigravity", purpose: "Tool and asset-direction experimentation during R&D." },
          { name: "AI Visual / Voice", purpose: "Created imagery, narration and production assets." }
        ],
        outcome:
          "Established a systems approach to AI Video Production that connects research → script → assets → QA → publishing instead of treating tools in isolation.",
        evidence: ["Workflow coverage across multiple video-production stages.", "Tools evaluated by task fit rather than trend."],
        learning:
          "AI accelerates production but does not replace art direction, fact-checking or version control; a human must remain accountable for the final output.",
        privacyNote:
          "Client assets, unreleased content and internal production-workflow configuration are not disclosed."
      }
    }
  }
};
