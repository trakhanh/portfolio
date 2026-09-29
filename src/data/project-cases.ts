export const PROJECT_CASES = {
  "vi": {
    "labels": {
      "back": "Quay lại danh sách dự án",
      "role": "Vai trò",
      "result": "Kết quả",
      "scope": "Phạm vi",
      "academic": "Dự án học thuật",
      "professional": "Dự án thực tế",
      "product": "Sản phẩm tự phát triển",
      "map": "Bản đồ case study",
      "challenge": "Bài toán",
      "roleSection": "Vai trò & trách nhiệm",
      "process": "Quy trình thực hiện",
      "technology": "Công nghệ & cách sử dụng",
      "outcome": "Kết quả & bài học",
      "learning": "Điều tôi rút ra",
      "imageCaption": "Hình ảnh đại diện dự án",
      "previous": "Dự án trước",
      "next": "Dự án tiếp theo",
      "contactEyebrow": "TRAO ĐỔI VỀ DỰ ÁN",
      "contactTitle": "Muốn biết tôi sẽ áp dụng cách làm này vào bài toán của bạn?",
      "contactButton": "Liên hệ với tôi",
      "sourceFallback": "Case study công khai đã lược bỏ dữ liệu nội bộ.",
      "viewAll": "Tất cả",
      "nextSection": "Phần tiếp theo",
      "prevSection": "Phần trước",
      "notFoundTitle": "Không tìm thấy dự án",
      "notFoundText": "Đường dẫn này không khớp với case study nào trong portfolio.",
      "notFoundButton": "Quay lại portfolio",
      "org": "Đơn vị",
      "period": "Thời gian",
      "related": "Dự án tại đây",
      "at": "Làm tại"
    },
    "items": {
      "kt-ai-video-studio": {
        "role": "Tác giả – thiết kế và xây dựng toàn bộ sản phẩm",
        "challenge": "Làm một video ngắn có giọng đọc, phụ đề và hình minh hoạ thường tốn hàng giờ thao tác tay qua nhiều công cụ. Mục tiêu là rút về một ô nhập và một nút bấm, mà video ra vẫn đúng nhịp giọng đọc, phụ đề đúng chữ, hình đúng chủ đề và dựng lại lúc nào cũng cho cùng một kết quả.",
        "responsibilities": [
          "Thiết kế dây chuyền 9 bước: khởi tạo, viết kịch bản, tìm hình, thu giọng, bóc phụ đề, sửa phụ đề, lắp spec, kết xuất và tự kiểm.",
          "Xây 75 mẫu thuộc 20 họ bằng Remotion (React), mỗi mẫu có bản dọc 9:16 và ngang 16:9 cùng một tài liệu luật viết riêng cho AI.",
          "Xây giao diện web cục bộ với Bàn dựng, Kho băng, Hướng dẫn và Cài đặt (thử khoá API trực tiếp).",
          "Viết bộ tự kiểm năm phép đo trên khung hình và bộ kiểm thử cho pipeline, chuẩn hoá kế hoạch và gióng phụ đề."
        ],
        "process": [
          {
            "title": "Kịch bản theo luật từng mẫu",
            "description": "Gemini đọc đúng tài liệu luật của mẫu đang chọn rồi viết plan.json, xoay tua nhiều key và model; key hết hạn mức (429) bị bỏ qua, model bận (503) thì thử lại rồi nhảy sang model dự phòng."
          },
          {
            "title": "Giọng đọc và phụ đề bám từng từ",
            "description": "Gemini TTS đọc từng đoạn ≤ 60 từ để giọng không trôi; Groq Whisper cho mốc thời gian, chữ hiện lên là chữ kịch bản được gióng bằng dãy con chung dài nhất."
          },
          {
            "title": "Hình đúng chủ đề",
            "description": "Tìm theo thứ tự ảnh bài báo → Wikimedia Commons → web (DuckDuckGo, Bing) → Pexels → hình vẽ; Gemini nhìn lại ảnh sản phẩm trước khi dùng."
          },
          {
            "title": "Dựng và tự kiểm",
            "description": "Độ dài cảnh lấy từ mốc giọng đọc thật; Remotion kết xuất một tab để chữ không rung, sau đó năm phép đo kiểm độ phủ khung, chữ rung, chữ nhảy, tương phản phụ đề và khung ảnh."
          }
        ],
        "technologies": [
          {
            "name": "Remotion / React",
            "purpose": "Dựng mọi khung hình bằng mã nguồn: sửa được, đo được và dựng lại luôn ra đúng như cũ."
          },
          {
            "name": "Node.js / FFmpeg",
            "purpose": "Điều phối pipeline, máy chủ giao diện chỉ lắng nghe 127.0.0.1, xử lý âm thanh và video."
          },
          {
            "name": "Gemini",
            "purpose": "Viết kịch bản, đọc giọng tiếng Việt (TTS) và kiểm tra lại ảnh sản phẩm."
          },
          {
            "name": "Groq Whisper",
            "purpose": "Bóc mốc thời gian từng từ để phụ đề và nhịp cảnh khớp giọng đọc."
          }
        ],
        "outcome": "Từ một chủ đề, dàn ý hay link bài báo ra thẳng MP4 hoàn chỉnh, ở cả khổ dọc cho TikTok/Reels/Shorts lẫn khổ ngang cho YouTube/Facebook. Mỗi video được tự kiểm sau khi dựng và ghi cảnh báo vào nhật ký.",
        "evidence": [
          "75 mẫu thuộc 20 họ, mọi mẫu có bố cục dọc và ngang riêng.",
          "Dây chuyền 9 bước tự động từ nội dung đến MP4.",
          "Đo trên mẫu bản tin: dựng 8 tab rung chữ 3/7 cảnh, dựng 1 tab 0/7 cảnh.",
          "Tự kiểm năm phép đo trên khung hình sau mỗi lượt dựng."
        ],
        "learning": "Với video tự động, độ ổn định quan trọng hơn tốc độ: đo từng lỗi trên khung hình rồi mới quyết định (ví dụ dựng một tab) giúp chất lượng lặp lại được ở mọi lượt dựng.",
        "privacyNote": "Mã nguồn đang để private trên GitHub; có thể demo trực tiếp khi trao đổi."
      },
      "kt-voice-studio": {
        "role": "Tác giả – thiết kế và xây dựng toàn bộ ứng dụng",
        "challenge": "Lồng tiếng một video cần nghe chép, dịch, đọc lại và trộn âm sao cho giữ nguyên nhạc nền, câu nào đúng mốc câu đó, không bị méo tiếng. Làm thủ công rất lâu, còn dịch vụ miễn phí thì bị chặn hạn mức giữa chừng.",
        "responsibilities": [
          "Xây ứng dụng desktop PyQt6 với hai chế độ: lồng tiếng đầy đủ và bóc băng phụ đề SRT.",
          "Tích hợp faster-whisper, Demucs và NLLB-200 chạy trên GPU (CUDA), tự lùi về CPU khi cần.",
          "Viết bộ trộn âm NumPy: chuẩn hoá -18 dBFS, ducking, limiter theo khối, neo từng câu vào mốc thời gian.",
          "Xây hàng chờ nhiều video, nhiều giọng, nhiều người nói; đóng gói .exe kèm bộ tự kiểm sau mỗi lần build."
        ],
        "process": [
          {
            "title": "Nghe chép và tách nhạc",
            "description": "faster-whisper có lọc khoảng lặng VAD; Demucs tách giọng và nhạc nền, cắt đoạn 10 phút để không tràn VRAM."
          },
          {
            "title": "Dịch đúng ngữ cảnh",
            "description": "Gộp mảnh thoại thành câu trước khi dịch; dịch offline bằng NLLB-200 hoặc qua Google/MyMemory, gộp 20 câu mỗi lượt gọi để tránh bị chặn."
          },
          {
            "title": "Đọc và khớp thời lượng",
            "description": "5 dịch vụ giọng đọc; câu dài được đọc lại nhanh hơn thay vì kéo giãn file để không méo tiếng; tự cắt khoảng lặng thừa của Edge-TTS."
          },
          {
            "title": "Trộn, xuất và báo cáo",
            "description": "Trộn một lượt bằng NumPy, xuất video, SRT hai thứ tiếng, giọng đọc và nhạc nền tách riêng kèm báo cáo đồng bộ từng câu."
          }
        ],
        "technologies": [
          {
            "name": "Python / PyQt6",
            "purpose": "Giao diện desktop tự co theo ba mốc bề ngang, hàng chờ và cài đặt."
          },
          {
            "name": "faster-whisper / CTranslate2",
            "purpose": "Nghe chép trên GPU (int8_float16), cache model giữa các lần chạy."
          },
          {
            "name": "Demucs / NLLB-200",
            "purpose": "Tách nhạc nền và dịch offline 74 ngôn ngữ, không hạn mức, không cần mạng."
          },
          {
            "name": "Edge-TTS / Gemini TTS",
            "purpose": "318 giọng đọc miễn phí và 30 giọng Gemini chỉnh sắc thái bằng câu lệnh."
          }
        ],
        "outcome": "Thả một video vào là nhận lại video đã lồng tiếng, phụ đề hai thứ tiếng, giọng đọc và nhạc nền tách riêng. Nội dung được xử lý hoàn toàn trên máy, không gửi đi đâu.",
        "evidence": [
          "Chỉ xuất SRT: 13,1 giây thay vì 168,7 giây cho cả quy trình (nhanh hơn 92%).",
          "Nhiều giọng cho cùng video dùng chung Demucs và Whisper: bản giọng thứ hai chỉ còn khoảng 29 giây.",
          "Tách người nói: 100% với 4 người (2 nam, 2 nữ) trên giọng dựng sẵn.",
          "Dịch offline 489 câu trong 82 giây, không sót câu nào."
        ],
        "learning": "Đo trước rồi mới tối ưu: số liệu thật (thời gian từng khâu, độ lệch từng câu) cho biết phải bỏ khâu nào và giữ chất lượng ở đâu, thay vì đoán.",
        "privacyNote": "Mã nguồn đang để private trên GitHub; có thể demo trực tiếp khi trao đổi."
      },
      "kt-epub-studio": {
        "role": "Tác giả – thiết kế và xây dựng toàn bộ ứng dụng",
        "challenge": "Dịch cả một cuốn sách bằng AI thường vấp ba vấn đề: bị chặn hạn mức giữa chừng, tên riêng và xưng hô không nhất quán giữa các chương, và mất định dạng (hình, mục lục, chú thích, drop cap).",
        "responsibilities": [
          "Xây bộ đọc EPUB/PDF trên trình duyệt: mục lục, hình ảnh, 4 giao diện, lưu tiến trình vào file cục bộ.",
          "Viết engine dịch với Gemini xoay tua nhiều key, structured output theo JSON Schema và kiểm tra chất lượng từng đoạn.",
          "Tự lập sổ tay nhân vật, giới tính, xưng hô và thuật ngữ trước khi dịch để thống nhất cả cuốn.",
          "Đóng gói chạy 1-click trên Windows: tự dò hoặc cài Python, cài thư viện và mở trình duyệt."
        ],
        "process": [
          {
            "title": "Đọc lướt và lập sổ tay",
            "description": "AI đọc khắp cuốn sách để lập danh sách nhân vật, xưng hô và thuật ngữ; sổ tay được đưa vào mọi lô dịch."
          },
          {
            "title": "Dịch song song có ngữ cảnh",
            "description": "Dịch nhiều chương song song, mỗi chương gửi kèm vài đoạn đã dịch làm ngữ cảnh; xoay key và cooldown khi gặp 429."
          },
          {
            "title": "Kiểm tra và dịch lại",
            "description": "Phát hiện đoạn chưa dịch, sai ngôn ngữ, bỏ sót hay mất liên kết để tự dịch lại; đoạn khó chuyển sang model dự phòng trước khi dùng Google NMT."
          },
          {
            "title": "Giữ nguyên cấu trúc",
            "description": "Bảo toàn ảnh, anchor mục lục, <br>, <code> bằng ký hiệu giữ chỗ; dịch cả nav.xhtml và toc.ncx; lưu cache để dừng rồi dịch tiếp không tốn quota."
          }
        ],
        "technologies": [
          {
            "name": "Python / FastAPI",
            "purpose": "Máy chủ cục bộ cho bộ đọc, xưởng dịch, thư viện và cài đặt."
          },
          {
            "name": "Gemini",
            "purpose": "Dịch văn học với nhiều key xoay tua, structured output và sổ tay dịch."
          },
          {
            "name": "EPUB / BeautifulSoup",
            "purpose": "Bóc tách chương, mục lục và dựng lại sách giữ nguyên định dạng."
          },
          {
            "name": "JavaScript / Web App",
            "purpose": "Giao diện đọc và dịch trên trình duyệt với log trực tiếp."
          }
        ],
        "outcome": "Một bộ công cụ chạy cục bộ để đọc và dịch trọn cuốn sách sang tiếng Việt, giữ nguyên hình ảnh và mục lục; sao chép thư mục sang máy khác và nhấp đúp là chạy.",
        "evidence": [
          "Dịch cả nav.xhtml, toc.ncx, danh sách và bảng; không làm mất ảnh hay anchor mục lục.",
          "Dừng rồi dịch tiếp từ cache, không tốn lại quota.",
          "Kiểm tra sức khoẻ từng API key: độ trễ và hạn mức khả dụng.",
          "Khởi chạy 1-click trên Windows, tự cài Python và thư viện khi thiếu."
        ],
        "learning": "Chất lượng dịch dài hơi đến từ quy trình hơn là từ model: sổ tay nhất quán, ngữ cảnh chương và vòng kiểm tra – dịch lại quan trọng không kém prompt.",
        "privacyNote": "Mã nguồn đang để private trên GitHub; có thể demo trực tiếp khi trao đổi."
      },
      "computer-vision-inspection": {
        "role": "Phát triển pipeline Computer Vision và ứng dụng demo",
        "challenge": "Bài toán không chỉ yêu cầu phát hiện vật thể trên băng chuyền, mà còn phải giữ đúng định danh khi vật thể di chuyển qua nhiều khung hình và ước lượng kích thước ổn định từ dữ liệu camera.",
        "responsibilities": [
          "Chuẩn bị dữ liệu, cấu hình thí nghiệm và đánh giá chất lượng phát hiện.",
          "Huấn luyện YOLOv8 để nhận biết vật thể trong từng khung hình.",
          "Kết nối SORT để theo dõi và hạn chế đếm lặp khi vật thể di chuyển.",
          "Xây dựng logic đo lường bằng OpenCV, hoàn thiện demo và tài liệu đồ án."
        ],
        "process": [
          {
            "title": "Định nghĩa đầu vào và chuẩn đo",
            "description": "Xác định góc camera, vùng quan sát, loại vật thể và cách quy đổi kích thước ảnh sang giá trị đo có ý nghĩa."
          },
          {
            "title": "Huấn luyện bộ phát hiện",
            "description": "Chuẩn hóa dữ liệu, huấn luyện YOLOv8 và kiểm tra các trường hợp dễ nhầm trước khi đưa vào video."
          },
          {
            "title": "Theo dõi và đo lường",
            "description": "Dùng SORT để duy trì ID; kết hợp bounding box, hình học ảnh và vùng đo để tính kích thước theo từng vật thể."
          },
          {
            "title": "Kiểm thử và đóng gói demo",
            "description": "Chạy thử trên nhiều đoạn video, kiểm tra đếm trùng, độ ổn định phép đo và trình bày kết quả trong ứng dụng demo."
          }
        ],
        "technologies": [
          {
            "name": "Python",
            "purpose": "Điều phối toàn bộ pipeline xử lý video và logic ứng dụng."
          },
          {
            "name": "YOLOv8",
            "purpose": "Phát hiện vị trí và lớp của vật thể theo từng khung hình."
          },
          {
            "name": "SORT",
            "purpose": "Duy trì ID vật thể xuyên suốt chuỗi khung hình."
          },
          {
            "name": "OpenCV",
            "purpose": "Đọc video, xử lý hình học ảnh, hiệu chỉnh và hiển thị kết quả đo."
          }
        ],
        "outcome": "Hoàn thiện một pipeline từ phát hiện → theo dõi → đo lường và ứng dụng demo có thể trình bày toàn bộ luồng xử lý. Đồ án tốt nghiệp được đánh giá 9.5/10.",
        "evidence": [
          "Mã nguồn công khai trên GitHub.",
          "Video demo mô tả luồng phát hiện, theo dõi và đo.",
          "Kết quả đồ án tốt nghiệp: 9.5/10."
        ],
        "learning": "Độ chính xác mô hình chỉ là một phần; độ ổn định thực tế còn phụ thuộc camera, hiệu chỉnh, tracking và quy tắc xử lý ngoại lệ."
      },
      "multi-task-learning": {
        "role": "Nghiên cứu, thiết kế thí nghiệm và xây dựng notebook",
        "challenge": "Mục tiêu là khảo sát cách một hệ thống thị giác có thể học đồng thời Object Detection, Segmentation và Depth Estimation thay vì vận hành ba mô hình tách rời.",
        "responsibilities": [
          "Khảo sát dữ liệu BDD100K và KITTI cho các tác vụ nhận thức đường phố.",
          "Thiết kế pipeline dữ liệu và kiến trúc có biểu diễn dùng chung.",
          "Tổ chức các đầu ra, hàm loss và thí nghiệm so sánh.",
          "Ghi lại giả thuyết, kết quả và giới hạn trong notebook có thể tái hiện."
        ],
        "process": [
          {
            "title": "Chuẩn hóa bài toán",
            "description": "Xác định dữ liệu, nhãn và tiêu chí của ba tác vụ để tránh so sánh các đầu ra không đồng nhất."
          },
          {
            "title": "Thiết kế biểu diễn dùng chung",
            "description": "Tổ chức backbone chung và các nhánh đầu ra riêng cho detection, segmentation và depth."
          },
          {
            "title": "Cân bằng quá trình học",
            "description": "Theo dõi ảnh hưởng của từng loss và điều chỉnh cách tổng hợp để một tác vụ không lấn át các tác vụ còn lại."
          },
          {
            "title": "Phân tích kết quả",
            "description": "Quan sát output, ghi nhận lỗi, giới hạn dữ liệu và các hướng cải thiện trong notebook nghiên cứu."
          }
        ],
        "technologies": [
          {
            "name": "PyTorch",
            "purpose": "Xây mô hình, vòng lặp huấn luyện và hệ thống loss đa tác vụ."
          },
          {
            "name": "BDD100K",
            "purpose": "Dữ liệu bối cảnh giao thông cho detection và segmentation."
          },
          {
            "name": "KITTI",
            "purpose": "Nguồn dữ liệu hỗ trợ thí nghiệm nhận thức chiều sâu."
          },
          {
            "name": "Jupyter / Kaggle",
            "purpose": "Tổ chức thí nghiệm, trực quan hóa và chia sẻ notebook."
          }
        ],
        "outcome": "Tạo notebook nghiên cứu hoàn chỉnh thể hiện tư duy từ dữ liệu, kiến trúc, loss đến phân tích output. Đây là nghiên cứu học thuật, chưa phải hệ thống triển khai production.",
        "evidence": [
          "Notebook nghiên cứu được công khai trên Kaggle.",
          "Pipeline thí nghiệm có thể tái chạy và mở rộng."
        ],
        "learning": "Multi-task Learning không tự động tốt hơn; chất lượng phụ thuộc mạnh vào mức độ tương thích dữ liệu, cách chia sẻ biểu diễn và chiến lược cân bằng loss."
      },
      "finger-counting": {
        "role": "Phát triển mô hình thử nghiệm và ứng dụng web real-time",
        "challenge": "Nhận biết số ngón tay từ hình ảnh thực tế chịu ảnh hưởng lớn bởi ánh sáng, nền, góc tay và sự khác nhau giữa bài toán phân loại với phân đoạn ảnh.",
        "responsibilities": [
          "Chuẩn bị dữ liệu và các biến thể tiền xử lý cho ảnh bàn tay.",
          "Thử nghiệm CNN, VGG16 và ResNet50 cho nhận dạng.",
          "Khảo sát U-Net để phân đoạn vùng bàn tay.",
          "Tích hợp suy luận vào giao diện Streamlit và quay video demo."
        ],
        "process": [
          {
            "title": "Chuẩn bị dữ liệu",
            "description": "Làm sạch, thay đổi kích thước và tổ chức tập dữ liệu theo đầu ra của từng hướng tiếp cận."
          },
          {
            "title": "So sánh mô hình",
            "description": "Xây baseline CNN và thử transfer learning với VGG16, ResNet50 để đánh giá trade-off."
          },
          {
            "title": "Khảo sát segmentation",
            "description": "Dùng U-Net để tách vùng bàn tay, từ đó hiểu thêm khi nào segmentation hỗ trợ nhận dạng."
          },
          {
            "title": "Đưa vào web demo",
            "description": "Đóng gói pipeline inference trong Streamlit để kiểm tra trực tiếp và trình bày kết quả."
          }
        ],
        "technologies": [
          {
            "name": "Streamlit",
            "purpose": "Xây giao diện web thử nghiệm và luồng inference."
          },
          {
            "name": "CNN",
            "purpose": "Baseline để kiểm chứng pipeline dữ liệu và phân loại."
          },
          {
            "name": "VGG16 / ResNet50",
            "purpose": "Transfer learning và so sánh chất lượng biểu diễn."
          },
          {
            "name": "U-Net",
            "purpose": "Phân đoạn vùng bàn tay trong nhánh thử nghiệm segmentation."
          }
        ],
        "outcome": "Hoàn thiện prototype web có thể chạy inference và trình bày nhiều hướng mô hình trong cùng một bài toán nhận dạng bàn tay.",
        "evidence": [
          "Mã nguồn công khai trên GitHub.",
          "Video demo ứng dụng web real-time."
        ],
        "learning": "Mô hình phù hợp phải được chọn theo dữ liệu, độ trễ và môi trường sử dụng; kiến trúc lớn hơn không luôn tạo trải nghiệm tốt hơn."
      },
      "recruitment-chatbot": {
        "role": "Làm chatbot AI đa kênh và hỗ trợ thiết kế website",
        "challenge": "Doanh nghiệp cần trả lời hai nhóm nhu cầu khác nhau—khách hàng trên website và ứng viên trên Fanpage—trong khi nội dung, ngữ cảnh và nguồn dữ liệu không giống nhau.",
        "responsibilities": [
          "Thu thập nhóm câu hỏi thường gặp và phân loại ý định theo từng kênh.",
          "Thiết kế workflow n8n kết nối AI, dữ liệu và logic phản hồi.",
          "Tích hợp GPT/Gemini và Supabase vào luồng chatbot.",
          "Kiểm thử câu hỏi ngoài phạm vi, fallback và tình huống cần chuyển cho con người."
        ],
        "process": [
          {
            "title": "Lập bản đồ hội thoại",
            "description": "Tách use case khách hàng và tuyển dụng, xác định intent, dữ liệu cần truy xuất và giới hạn trả lời."
          },
          {
            "title": "Tổ chức nguồn tri thức",
            "description": "Chuẩn hóa nội dung FAQ và dữ liệu tham chiếu để chatbot lấy đúng ngữ cảnh."
          },
          {
            "title": "Điều phối workflow",
            "description": "Dùng n8n để nhận sự kiện, gọi mô hình, truy xuất dữ liệu, kiểm tra điều kiện và trả kết quả về đúng kênh."
          },
          {
            "title": "Kiểm thử và cải thiện",
            "description": "Thử câu hỏi thật, rà soát câu trả lời không chắc chắn và điều chỉnh rule chuyển tiếp cho nhân viên."
          }
        ],
        "technologies": [
          {
            "name": "n8n",
            "purpose": "Điều phối sự kiện, AI, nguồn dữ liệu và phản hồi đa kênh."
          },
          {
            "name": "GPT / Gemini",
            "purpose": "Hiểu câu hỏi, tạo phản hồi và hỗ trợ xử lý ngôn ngữ."
          },
          {
            "name": "Supabase",
            "purpose": "Lưu trữ hoặc truy xuất dữ liệu phục vụ workflow."
          },
          {
            "name": "Website / Facebook",
            "purpose": "Hai điểm tiếp xúc dành cho khách hàng và ứng viên."
          }
        ],
        "outcome": "Hình thành hai luồng hỗ trợ tự động cho website và tuyển dụng, giúp nhóm vận hành có một nền tảng phản hồi nhất quán hơn.",
        "evidence": [
          "Website bongtra.vn đang hoạt động, có chatbot AI hỗ trợ khách hàng.",
          "Chatbot tích hợp trên Fanpage Bông Trà Tuyển Dụng cho ứng viên.",
          "Workflow n8n kết nối AI (GPT/Gemini) với dữ liệu trên Supabase.",
          "Được ghi nhận trong thư giới thiệu của Bông Trà F&B."
        ],
        "learning": "Chatbot doanh nghiệp cần kiến trúc ngữ cảnh, fallback và quyền kiểm soát của con người—không thể chỉ dựa vào một prompt dài.",
        "privacyNote": "Case study chỉ mô tả kiến trúc và cách tiếp cận; prompt hệ thống, dữ liệu nội bộ và thông tin người dùng không được công khai."
      },
      "internal-automation": {
        "role": "Phân tích và xây dựng bộ công cụ tự động hóa nội bộ",
        "challenge": "Các công việc như đặt phòng họp, gửi bảng lương, trả lời chính sách nhân sự và thu thập đánh giá lặp lại thường xuyên, dễ sai sót và tiêu tốn thời gian vận hành.",
        "responsibilities": [
          "Tách từng nghiệp vụ thành dữ liệu đầu vào, rule, hành động và trạng thái lỗi.",
          "Xây script kết nối Google Sheets, Calendar và email.",
          "Thiết lập trigger, kiểm tra quyền truy cập và log vận hành.",
          "Soạn hướng dẫn để nhân viên có thể sử dụng và xử lý tình huống cơ bản."
        ],
        "process": [
          {
            "title": "Khảo sát thao tác thủ công",
            "description": "Quan sát luồng hiện tại, xác định bước lặp lại và những điểm cần con người phê duyệt."
          },
          {
            "title": "Chuẩn hóa dữ liệu và rule",
            "description": "Tổ chức biểu mẫu, sheet và điều kiện nghiệp vụ trước khi viết automation."
          },
          {
            "title": "Kết nối dịch vụ Google",
            "description": "Dùng Apps Script và API để tạo lịch, gửi email, đọc dữ liệu và cập nhật trạng thái."
          },
          {
            "title": "Vận hành và bàn giao",
            "description": "Bổ sung kiểm tra lỗi, quyền truy cập, hướng dẫn sử dụng và kịch bản xử lý khi workflow gián đoạn."
          }
        ],
        "technologies": [
          {
            "name": "Google Apps Script",
            "purpose": "Logic automation và kết nối các dịch vụ Google Workspace."
          },
          {
            "name": "Sheets API",
            "purpose": "Nguồn dữ liệu nghiệp vụ, cấu hình và trạng thái xử lý."
          },
          {
            "name": "Calendar API",
            "purpose": "Kiểm tra và tạo lịch đặt phòng họp."
          },
          {
            "name": "Email Automation",
            "purpose": "Gửi bảng lương và thông báo theo dữ liệu có cấu trúc."
          }
        ],
        "outcome": "Bộ công cụ bao phủ bốn nhóm workflow nội bộ và cùng chương trình automation góp phần giảm khoảng 80% khối lượng xử lý thủ công.",
        "evidence": [
          "Đặt phòng họp tự động.",
          "Gửi email bảng lương hàng loạt.",
          "FAQ HR và luồng thu thập đánh giá."
        ],
        "learning": "Automation hiệu quả nhất khi rule đơn giản, quyền rõ ràng và tài liệu đủ để người dùng tự vận hành.",
        "privacyNote": "Không công khai dữ liệu nhân sự, bảng lương, tài khoản tích hợp hoặc cấu hình workflow nội bộ."
      },
      "preorder-workshop-web": {
        "role": "Hỗ trợ xây dựng giao diện web landing page và luồng đăng ký / đặt hàng",
        "challenge": "Các chiến dịch Workshop và Pre-order cần một luồng rõ từ nội dung Marketing đến đăng ký, thanh toán và tiếp nhận thông tin, thay cho nhiều bước xử lý rời rạc.",
        "responsibilities": [
          "Phân tích hành trình người dùng và thông tin Marketing cần truyền tải.",
          "Thiết kế cấu trúc landing page, CTA và biểu mẫu đăng ký.",
          "Kết nối thanh toán trực tuyến vào luồng chuyển đổi.",
          "Kiểm thử trên mobile và bàn giao hướng dẫn cập nhật nội dung."
        ],
        "process": [
          {
            "title": "Vẽ hành trình chuyển đổi",
            "description": "Xác định người dùng đi từ chiến dịch đến lựa chọn chương trình, nhập thông tin và hoàn tất thanh toán."
          },
          {
            "title": "Xây cấu trúc landing page",
            "description": "Ưu tiên thông tin chương trình, lợi ích, thời gian, CTA và các trường đăng ký cần thiết."
          },
          {
            "title": "Kết nối thanh toán",
            "description": "Đưa bước thanh toán trực tuyến vào đúng vị trí để giảm trao đổi thủ công sau đăng ký."
          },
          {
            "title": "QA và bàn giao",
            "description": "Kiểm tra hiển thị, form, CTA, thanh toán trên nhiều kích thước và hướng dẫn đội Marketing vận hành."
          }
        ],
        "technologies": [
          {
            "name": "Landing Page",
            "purpose": "Trình bày chiến dịch và tập trung người dùng vào một hành động chính."
          },
          {
            "name": "Online Payment",
            "purpose": "Rút ngắn bước xác nhận và thanh toán thủ công."
          },
          {
            "name": "Registration Form",
            "purpose": "Thu thập dữ liệu đăng ký / đặt hàng có cấu trúc."
          },
          {
            "name": "Responsive Web",
            "purpose": "Bảo đảm luồng chuyển đổi sử dụng tốt trên thiết bị di động."
          }
        ],
        "outcome": "Tạo luồng số hóa gọn hơn cho đăng ký Workshop và đặt hàng Pre-order, hỗ trợ Marketing triển khai chiến dịch nhanh và giảm bước tiếp nhận thủ công.",
        "evidence": [
          "Landing page preorder.bongtra.vn đang hoạt động.",
          "Hai nhóm landing page: Workshop và Pre-order.",
          "Tích hợp thanh toán trực tuyến vào luồng đăng ký / đặt hàng."
        ],
        "learning": "Một landing page tốt phải nối đúng Marketing với vận hành phía sau; giao diện đẹp nhưng dữ liệu đầu ra khó xử lý vẫn tạo thêm việc."
      },
      "waveform-edit-studio": {
        "role": "Tác giả – thiết kế và xây dựng toàn bộ ứng dụng",
        "challenge": "Video sóng âm cho podcast, nhạc hay truyện đọc thường phải dựng tay trong phần mềm edit: căn sóng âm theo nhạc, gõ phụ đề, bo ảnh, thêm khung. Mỗi video lặp lại cùng một chuỗi thao tác, và bố cục rất dễ lệch khi chuyển giữa khung ngang 16:9 và khung dọc 9:16.",
        "responsibilities": [
          "Xây giao diện Next.js theo đúng luồng biên tập: 8 tab từ tệp nguồn, nền, ảnh phủ, sóng âm, phụ đề, khung máy quay, xoá nền đến cấu hình render, cạnh một khung xem trước trực tiếp.",
          "Viết Python worker chạy ngầm cho phần xử lý nặng: phân tích dải tần âm thanh, tạo mặt nạ bo ảnh bằng Pillow và dựng chuỗi filter FFmpeg để ghép video.",
          "Tích hợp Whisper (Base, Small, Medium) tạo phụ đề có mốc thời gian, báo tiến trình theo thời gian thực và cho phép huỷ giữa chừng.",
          "Thiết kế hệ toạ độ theo tỷ lệ để phụ đề, ảnh phủ và khung máy quay tự co giãn đúng khi đổi giữa 1920×1080 và 1080×1920."
        ],
        "process": [
          {
            "title": "Nguyên liệu vào một chỗ",
            "description": "Video nền, giọng đọc hoặc nhạc, phụ đề .srt có sẵn và danh sách ảnh phủ được chọn ở tab đầu tiên; các tab sau chỉ còn là cấu hình."
          },
          {
            "title": "Xem trước rồi mới render",
            "description": "Mọi thay đổi về nền, sóng âm, ảnh phủ và phụ đề hiện ngay trên khung xem trước, nên chỉ cần render khi bố cục đã đúng."
          },
          {
            "title": "Phụ đề bằng AI",
            "description": "Whisper nghe giọng đọc và tạo phụ đề có mốc thời gian. Thuật toán ngắt dòng giữ mỗi câu tối đa 2 dòng, kèm các hiệu ứng Word Reveal, Karaoke, Pop, Fade và chế độ chữ đơn RSVP."
          },
          {
            "title": "Ghép bằng FFmpeg",
            "description": "Worker dựng một chuỗi filter FFmpeg: làm mờ nền nhiều tầng, vẽ sóng âm, chồng ảnh phủ và khung, đốt phụ đề vào video. Bitrate mặc định 12 Mbps, có thanh tiến trình và nhật ký."
          }
        ],
        "technologies": [
          {
            "name": "Next.js / React",
            "purpose": "Giao diện glassmorphism theo 8 tab biên tập, khung xem trước trực tiếp và bảng nhật ký render."
          },
          {
            "name": "Python worker",
            "purpose": "Tiến trình chạy ngầm nhận cấu hình từ Node.js, kiểm dữ liệu bằng pydantic và điều phối các bước xử lý nặng."
          },
          {
            "name": "FFmpeg",
            "purpose": "Giải mã âm thanh, vẽ 7 kiểu sóng âm, làm mờ nền bằng boxblur, chồng lớp và ghép phụ đề vào video."
          },
          {
            "name": "Whisper / PyTorch",
            "purpose": "Chuyển giọng đọc thành phụ đề có mốc thời gian; torch và torchaudio tăng tốc bằng phần cứng."
          },
          {
            "name": "Pillow",
            "purpose": "Tạo mặt nạ tròn, lục giác, vuông, chữ nhật và viền mềm cho ảnh phủ."
          },
          {
            "name": "AI xoá nền",
            "purpose": "Tách chân dung khỏi nền, xuất PNG trong suốt để chèn thẳng làm ảnh phủ."
          }
        ],
        "outcome": "Một studio dựng video sóng âm chạy trên máy cá nhân: từ một file âm thanh và vài tấm ảnh ra video hoàn chỉnh có sóng âm, phụ đề AI, ảnh phủ nhún theo nhạc và khung máy quay, ở cả khung ngang lẫn khung dọc cho TikTok và Shorts.",
        "evidence": [
          "Mã nguồn công khai trên GitHub: trakhanh/WaveForm-Edit-Studio.",
          "7 kiểu sóng âm: Linear, Circle, Vertical, Rectangle, Triangle, Hexagon, Custom; có dải màu gradient và đối xứng gương.",
          "Phụ đề Whisper với 4 hiệu ứng (Word Reveal, Karaoke, Pop, Fade), chữ đơn RSVP và giới hạn 2 dòng.",
          "4 kiểu khung máy quay: Classic REC, Modern Cinema, Vlogger DSLR, Retro VHS.",
          "Xuất 1920×1080 (16:9) hoặc 1080×1920 (9:16), toạ độ tự co giãn theo khung."
        ],
        "learning": "Với công cụ dựng video, xem trước nhanh quan trọng hơn render nhanh: khi mọi chỉnh sửa hiện ngay trên khung xem trước, người dùng chỉ phải render một lần. Tách giao diện (Node.js) và phần xử lý nặng (Python và FFmpeg) thành hai tiến trình giúp giao diện không bị treo khi Whisper hay FFmpeg đang chạy."
      },
      "hrm-application": {
        "role": "Xây dựng từ đầu và vận hành toàn bộ hệ thống: dữ liệu, API, giao diện, kiểm thử và triển khai",
        "challenge": "Sun Media cần một nơi thay cho bảng tính, biểu mẫu và email rời rạc: đơn từ phải đi đúng tuyến duyệt, dữ liệu nhân sự, chấm công, lương và dự án phải khớp nhau, và mỗi người chỉ thấy đúng phần việc của mình.",
        "responsibilities": [
          "Mô hình hoá nghiệp vụ thành 146 bảng dữ liệu PostgreSQL (qua Prisma 7) và 51 nhóm API Node.js/Express viết bằng TypeScript.",
          "Xây gần 150 màn hình React 19 cho nhân sự, nghỉ phép và chấm công, tài chính dự án, KPI, tuyển dụng, hành chính và truyền thông nội bộ.",
          "Thiết kế luồng duyệt nhiều bước theo tuyến quản lý, Hộp chờ duyệt gom mọi loại đơn, thông báo trực tiếp và lịch nhắc tự động.",
          "Làm ma trận phân quyền với vai trò tuỳ biến, nhật ký thao tác có che nội dung nhạy cảm, tài khoản quan sát viên và bật/tắt từng module.",
          "Bảo mật: đăng nhập bằng Google, phiên cookie có ký, Helmet và CSP, giới hạn tần suất gọi API, Zod kiểm dữ liệu đầu vào, sanitize-html lọc HTML.",
          "Viết khoảng 4.800 ca test tự động và triển khai bằng Docker Compose trên VPS Debian sau Cloudflare."
        ],
        "process": [
          {
            "title": "Bắt đầu từ quy trình thật",
            "description": "Đi từ các việc đang làm tay: đơn nghỉ phép, bảng công, đề xuất mua sắm, đề xuất tuyển dụng. Với mỗi việc, xác định ai tạo, ai duyệt, dữ liệu nào cần giữ lại."
          },
          {
            "title": "Một mô hình dữ liệu chung",
            "description": "Nhân sự, phòng ban và tuyến quản lý là gốc. Nghỉ phép, chấm công, chi phí nhân công, KPI và lương đều tham chiếu về đó, nên số liệu cộng dồn được lên từng cấp quản lý."
          },
          {
            "title": "Phân quyền và kiểm soát từ đầu",
            "description": "Mỗi module gắn với quyền trong ma trận vai trò; mọi thao tác được ghi nhật ký. Nhờ vậy có thể mở thêm module mới mà không phải làm lại phần kiểm soát."
          },
          {
            "title": "Kiểm thử tự động, triển khai liên tục",
            "description": "API được test trên CSDL test riêng bằng Vitest và Supertest, giao diện bằng Playwright. Hệ thống đóng gói bằng Docker Compose và cập nhật liên tục trên VPS."
          }
        ],
        "technologies": [
          {
            "name": "React 19 / TypeScript",
            "purpose": "Giao diện gần 150 màn hình, build bằng Vite 6, Tailwind CSS; Tiptap để soạn thảo, Recharts cho biểu đồ, Lucide và Motion."
          },
          {
            "name": "Node.js / Express",
            "purpose": "Một máy chủ TypeScript chạy chung một cổng, vừa phục vụ API vừa phục vụ giao diện."
          },
          {
            "name": "PostgreSQL / Prisma 7",
            "purpose": "146 bảng dữ liệu, truy cập có kiểu dữ liệu chặt qua Prisma."
          },
          {
            "name": "Google Login / RBAC",
            "purpose": "Đăng nhập bằng Gmail, phiên lưu bằng cookie có ký, mật khẩu băm bcrypt; ma trận quyền theo vai trò tuỳ biến."
          },
          {
            "name": "Helmet / Zod / sanitize-html",
            "purpose": "Header bảo mật và CSP, giới hạn tần suất gọi API, kiểm dữ liệu đầu vào, lọc HTML người dùng nhập."
          },
          {
            "name": "Gemini / Nodemailer",
            "purpose": "Chatbot hỏi đáp nội quy dựa trên Sổ tay nhân viên; email đơn từ, thư mời phỏng vấn và bản tin qua SMTP."
          },
          {
            "name": "xlsx / sharp",
            "purpose": "Nhập và xuất Excel (dữ liệu máy chấm công, bảng lương), xử lý ảnh, đóng gói tệp bằng jszip."
          },
          {
            "name": "Vitest / Playwright",
            "purpose": "Khoảng 4.800 ca test: API chạy trên CSDL test riêng qua Supertest, luồng giao diện qua Playwright."
          },
          {
            "name": "Docker Compose / Cloudflare",
            "purpose": "Triển khai trên VPS Debian, đứng sau Cloudflare, tại eoffice.sunmedia.net.vn."
          }
        ],
        "outcome": "eOffice đang chạy thật tại eoffice.sunmedia.net.vn, gom nhân sự, nghỉ phép và chấm công, tài chính dự án, KPI, tuyển dụng, hành chính và truyền thông nội bộ vào một hệ thống có phân quyền và nhật ký. Sau khoảng ba tháng kể từ ngày khởi tạo (25/06/2026), hệ thống có khoảng 1.130 commit.",
        "evidence": [
          "Đang vận hành tại eoffice.sunmedia.net.vn.",
          "Khoảng 1.130 commit · 146 bảng dữ liệu · 51 nhóm API · gần 150 màn hình.",
          "Khoảng 4.800 ca test tự động (Vitest, Supertest, Playwright).",
          "Hộp chờ duyệt gom mọi loại đơn; duyệt nhiều bước theo tuyến quản lý.",
          "Chatbot nội quy dùng Google Gemini, trả lời dựa trên Sổ tay và nội quy công ty."
        ],
        "learning": "Với hệ thống nội bộ, điều quyết định không phải số màn hình mà là dữ liệu có khớp nhau hay không. Khi nhân sự, tuyến quản lý và quyền được dựng đúng từ đầu, các module sau như chấm công, lương hay tài chính dự án chỉ việc tham chiếu và cộng dồn. Test tự động là thứ cho phép thêm module mới mỗi tuần mà không sợ làm hỏng module cũ.",
        "privacyNote": "Case study chỉ nêu phạm vi chức năng và công nghệ; không công khai dữ liệu, tài khoản, ảnh chụp màn hình nội bộ hay cấu hình phân quyền cụ thể."
      },
      "ai-creative-production": {
        "role": "R&D công cụ AI và thiết kế workflow hỗ trợ sản xuất video",
        "challenge": "Các công cụ GenAI tạo ra nhiều loại đầu ra nhưng dễ rời rạc. Bài toán là tổ chức chúng thành workflow có brief, kiểm soát chất lượng, version và bàn giao rõ ràng cho quy trình sản xuất video.",
        "responsibilities": [
          "Nghiên cứu và đánh giá công cụ AI theo từng khâu sản xuất.",
          "Ứng dụng AI vào research, script, storyboard, visual, voice và animation.",
          "Thiết kế cách tracking asset, version và trạng thái công việc.",
          "Duy trì human-in-the-loop để kiểm tra nội dung, hình ảnh và tính nhất quán."
        ],
        "process": [
          {
            "title": "Brief và research",
            "description": "Chuyển yêu cầu thành mục tiêu, đối tượng, thông điệp và nguồn tham chiếu trước khi tạo nội dung."
          },
          {
            "title": "Script và storyboard",
            "description": "Dùng AI hỗ trợ cấu trúc kịch bản, shot list và storyboard, sau đó biên tập lại theo định hướng sáng tạo."
          },
          {
            "title": "Tạo và quản lý asset",
            "description": "Sản xuất visual, voice, animation; đặt quy tắc tên, version và trạng thái để tránh mất kiểm soát."
          },
          {
            "title": "QA và publishing",
            "description": "Rà soát factuality, hình ảnh, giọng điệu, continuity và checklist đầu ra trước khi xuất bản."
          }
        ],
        "technologies": [
          {
            "name": "ChatGPT / Claude",
            "purpose": "Research, cấu trúc nội dung, script và phản biện đầu ra."
          },
          {
            "name": "Gemini / NotebookLM",
            "purpose": "Tổng hợp nguồn, đọc tài liệu và hỗ trợ kiểm chứng ngữ cảnh."
          },
          {
            "name": "Antigravity",
            "purpose": "Thử nghiệm công cụ và hướng tạo asset trong hoạt động R&D."
          },
          {
            "name": "AI Visual / Voice",
            "purpose": "Tạo hình ảnh, giọng đọc và asset cho các bước sản xuất."
          }
        ],
        "outcome": "Hình thành cách tiếp cận có hệ thống cho AI Video Production, kết nối research → script → asset → QA → publishing thay vì sử dụng từng công cụ riêng lẻ.",
        "evidence": [
          "Workflow bao phủ nhiều khâu sản xuất video.",
          "Bộ công cụ được đánh giá theo nhiệm vụ thay vì theo xu hướng."
        ],
        "learning": "AI tăng tốc sản xuất nhưng không thay thế art direction, fact-checking và quản lý phiên bản; chất lượng cuối cùng vẫn cần người chịu trách nhiệm.",
        "privacyNote": "Không công khai tài sản khách hàng, nội dung chưa phát hành hoặc cấu hình workflow sản xuất nội bộ."
      },
      "odoo-erp-demo": {
        "role": "Đề xuất giải pháp và dựng bản demo ERP",
        "challenge": "Dữ liệu và quy trình vận hành của một doanh nghiệp F&B đang phát triển nằm rải rác ở nhiều công cụ. Trước khi đầu tư ERP, công ty cần thấy cụ thể một hệ thống tập trung sẽ trông như thế nào với chính quy trình của mình.",
        "responsibilities": [
          "Tìm hiểu quy trình hiện tại và xác định các luồng nên đưa vào ERP trước.",
          "Đề xuất Odoo Online như một lựa chọn khởi đầu gọn, không cần hạ tầng riêng.",
          "Cấu hình bản demo thử nghiệm với các module phù hợp.",
          "Trình bày demo để làm cơ sở cho quyết định áp dụng toàn công ty."
        ],
        "process": [
          {
            "title": "Khảo sát quy trình",
            "description": "Ghi lại cách các bộ phận đang làm và điểm dữ liệu bị nhập lặp hoặc rời rạc."
          },
          {
            "title": "Chọn phạm vi demo",
            "description": "Ưu tiên những luồng thể hiện rõ lợi ích của dữ liệu tập trung, thay vì cố dựng mọi module."
          },
          {
            "title": "Dựng demo trên Odoo Online",
            "description": "Cấu hình module và dữ liệu mẫu để người dùng thấy được luồng làm việc thật."
          },
          {
            "title": "Trình bày và tiếp nhận góp ý",
            "description": "Demo cho các bên liên quan và ghi lại câu hỏi, yêu cầu làm đầu vào cho bước quyết định."
          }
        ],
        "technologies": [
          {
            "name": "Odoo Online",
            "purpose": "Nền tảng ERP SaaS để dựng demo nhanh, không cần máy chủ riêng."
          },
          {
            "name": "ERP / HRM Model",
            "purpose": "Tư duy module, dữ liệu tập trung và luồng phê duyệt."
          },
          {
            "name": "Workflow / API",
            "purpose": "Mô hình hoá luồng nghiệp vụ trước khi cấu hình."
          }
        ],
        "outcome": "Bản demo Odoo Online giúp ban lãnh đạo thấy cụ thể hệ thống ERP vận hành ra sao với quy trình của công ty, tạo cơ sở cho quyết định áp dụng trên toàn công ty.",
        "evidence": [
          "Đề xuất ý tưởng ERP bằng Odoo Online.",
          "Bản demo thử nghiệm được triển khai và trình bày.",
          "Nội dung được xác nhận trong thư giới thiệu của Bông Trà F&B."
        ],
        "learning": "Một bản demo chạy được thuyết phục hơn nhiều trang đề xuất: người dùng góp ý đúng hơn khi nhìn thấy quy trình của chính họ trên hệ thống.",
        "privacyNote": "Không công khai dữ liệu, cấu hình hay ảnh màn hình nội bộ của doanh nghiệp."
      },
      "amis-misa-erp": {
        "role": "Thực tập sinh IT – hỗ trợ triển khai ERP và đào tạo người dùng",
        "challenge": "Chuyển đội Sales sang một hệ thống ERP/CRM mới luôn gặp lực cản: người dùng cần hiểu cách làm mới, dữ liệu khách hàng tiềm năng phải được theo dõi đúng cách, và công việc hằng ngày không được gián đoạn.",
        "responsibilities": [
          "Tham gia triển khai ERP AMIS MISA, tập trung module AI Marketing.",
          "Soạn tài liệu hướng dẫn sử dụng CRM cho đội Sales.",
          "Hỗ trợ đào tạo và giải đáp trong giai đoạn chuyển đổi.",
          "Hỗ trợ vận hành và xử lý sự cố CNTT trong hệ thống nội bộ."
        ],
        "process": [
          {
            "title": "Nắm module và nhu cầu",
            "description": "Tìm hiểu module AI Marketing và cách đội Sales đang theo dõi khách hàng tiềm năng."
          },
          {
            "title": "Hỗ trợ cấu hình và triển khai",
            "description": "Tham gia các bước đưa module vào sử dụng cùng đội triển khai."
          },
          {
            "title": "Tài liệu hoá",
            "description": "Viết hướng dẫn theo đúng thao tác hằng ngày của Sales để tự tra cứu được."
          },
          {
            "title": "Đào tạo và hỗ trợ",
            "description": "Hướng dẫn trực tiếp, giải đáp và xử lý vướng mắc trong giai đoạn đầu dùng hệ thống."
          }
        ],
        "technologies": [
          {
            "name": "AMIS MISA",
            "purpose": "Hệ thống ERP/CRM được triển khai cho doanh nghiệp."
          },
          {
            "name": "ERP / HRM Model",
            "purpose": "Hiểu luồng dữ liệu khách hàng và phân quyền trong ERP."
          },
          {
            "name": "AI Marketing",
            "purpose": "Module hỗ trợ Sales theo dõi và chăm sóc khách hàng tiềm năng."
          }
        ],
        "outcome": "Đội Sales có tài liệu và được hỗ trợ đào tạo để chuyển sang CRM mới, dùng module AI Marketing theo dõi khách hàng tiềm năng hiệu quả hơn.",
        "evidence": [
          "Tham gia triển khai ERP AMIS MISA, module AI Marketing.",
          "Tài liệu hướng dẫn CRM cho đội Sales.",
          "Hỗ trợ đào tạo trong quá trình chuyển đổi hệ thống."
        ],
        "learning": "Triển khai ERP thành công phụ thuộc vào người dùng nhiều như vào phần mềm: tài liệu sát thao tác thật và hỗ trợ tận nơi giúp hệ thống được dùng thật.",
        "privacyNote": "Không công khai dữ liệu khách hàng hay cấu hình hệ thống của doanh nghiệp."
      }
    }
  },
  "en": {
    "labels": {
      "back": "Back to selected projects",
      "role": "Role",
      "result": "Outcome",
      "scope": "Scope",
      "academic": "Academic project",
      "professional": "Professional project",
      "product": "Self-built product",
      "map": "Case study map",
      "challenge": "The challenge",
      "roleSection": "Role & responsibilities",
      "process": "How I approached it",
      "technology": "Technology & how it was used",
      "outcome": "Outcome & learning",
      "learning": "What I learned",
      "imageCaption": "Representative project visual",
      "previous": "Previous project",
      "next": "Next project",
      "contactEyebrow": "DISCUSS A PROJECT",
      "contactTitle": "Want to see how I would apply this approach to your problem?",
      "contactButton": "Contact me",
      "sourceFallback": "This public case study excludes internal data.",
      "viewAll": "All",
      "nextSection": "Next section",
      "prevSection": "Previous section",
      "notFoundTitle": "Project not found",
      "notFoundText": "This URL does not match a case study in the portfolio.",
      "notFoundButton": "Back to portfolio",
      "org": "Organisation",
      "period": "Period",
      "related": "Projects here",
      "at": "Built at"
    },
    "items": {
      "kt-ai-video-studio": {
        "role": "Author – designed and built the whole product",
        "challenge": "A short video with narration, subtitles and illustrations usually takes hours of manual work across several tools. The goal was one input box and one button, while keeping the pacing tied to the voice, the subtitles word-accurate, the visuals on topic and every re-render identical.",
        "responsibilities": [
          "Designed a 9-stage pipeline: setup, script, visuals, voice, transcription, subtitle alignment, spec assembly, render and self-check.",
          "Built 75 templates in 20 families with Remotion (React), each with 9:16 and 16:9 layouts and its own writing rules for the AI.",
          "Built a local web UI with a render desk, video library, guide and settings (live API-key testing).",
          "Wrote a five-metric frame audit plus tests for the pipeline, plan normalisation and subtitle alignment."
        ],
        "process": [
          {
            "title": "Scripts that follow each template",
            "description": "Gemini reads the selected template's rule document and writes plan.json, rotating keys and models; exhausted keys (429) are skipped, busy models (503) retry then fall back."
          },
          {
            "title": "Voice and word-level subtitles",
            "description": "Gemini TTS reads chunks of ≤ 60 words so the voice doesn't drift; Groq Whisper supplies timings and the on-screen text is the script, aligned with a longest-common-subsequence match."
          },
          {
            "title": "On-topic visuals",
            "description": "Article images → Wikimedia Commons → web (DuckDuckGo, Bing) → Pexels → drawn art; Gemini double-checks product photos before use."
          },
          {
            "title": "Render and self-check",
            "description": "Scene lengths come from the real narration timings; Remotion renders in one tab to avoid text jitter, then five frame metrics check coverage, jitter, jumps, subtitle contrast and image edges."
          }
        ],
        "technologies": [
          {
            "name": "Remotion / React",
            "purpose": "Every frame is source code: editable, measurable and identical on every re-render."
          },
          {
            "name": "Node.js / FFmpeg",
            "purpose": "Pipeline orchestration, a UI server bound to 127.0.0.1, audio and video processing."
          },
          {
            "name": "Gemini",
            "purpose": "Script writing, Vietnamese TTS and a second look at product images."
          },
          {
            "name": "Groq Whisper",
            "purpose": "Word-level timings so subtitles and scene cuts follow the voice."
          }
        ],
        "outcome": "A topic, outline or news link goes straight to a finished MP4, in vertical for TikTok/Reels/Shorts or landscape for YouTube/Facebook. Each video is audited after rendering and warnings go to the log.",
        "evidence": [
          "75 templates in 20 families, each with dedicated vertical and landscape layouts.",
          "A 9-stage automated pipeline from content to MP4.",
          "Measured on a news template: 8-tab renders jittered in 3/7 scenes, single-tab renders in 0/7.",
          "Five frame metrics checked after every render."
        ],
        "learning": "For automated video, consistency matters more than speed: measuring each defect on the frames before deciding (such as single-tab rendering) makes quality repeatable on every run.",
        "privacyNote": "The source code is private on GitHub; a live demo is available on request."
      },
      "kt-voice-studio": {
        "role": "Author – designed and built the whole application",
        "challenge": "Dubbing a video means transcribing, translating, re-voicing and remixing while keeping the music, pinning every line to its timestamp and avoiding distortion. Done by hand it is slow, and free services get rate-limited halfway through.",
        "responsibilities": [
          "Built a PyQt6 desktop app with two modes: full dubbing and SRT transcription.",
          "Integrated faster-whisper, Demucs and NLLB-200 on the GPU (CUDA) with automatic CPU fallback.",
          "Wrote a NumPy mixer: -18 dBFS normalisation, ducking, block limiter, every line anchored to its timestamp.",
          "Built a multi-video, multi-voice, multi-speaker queue; packaged an .exe with a self-test after every build."
        ],
        "process": [
          {
            "title": "Transcribe and separate",
            "description": "faster-whisper with VAD silence filtering; Demucs splits voice from music, chunked into 10-minute pieces to stay within VRAM."
          },
          {
            "title": "Translate in context",
            "description": "Fragments are merged into sentences before translation; offline NLLB-200 or Google/MyMemory, batching 20 lines per call to avoid rate limits."
          },
          {
            "title": "Voice and fit",
            "description": "Five voice services; long lines are re-read faster instead of time-stretching the file, and Edge-TTS padding silence is trimmed."
          },
          {
            "title": "Mix, export, report",
            "description": "Single-pass NumPy mix, exporting the video, bilingual SRT, separate voice and music stems, plus a per-line sync report."
          }
        ],
        "technologies": [
          {
            "name": "Python / PyQt6",
            "purpose": "A desktop UI that adapts to three widths, with the queue and settings."
          },
          {
            "name": "faster-whisper / CTranslate2",
            "purpose": "GPU transcription (int8_float16) with the model cached between runs."
          },
          {
            "name": "Demucs / NLLB-200",
            "purpose": "Music separation and offline translation for 74 languages, no quotas, no network."
          },
          {
            "name": "Edge-TTS / Gemini TTS",
            "purpose": "318 free voices plus 30 Gemini voices steered by natural-language prompts."
          }
        ],
        "outcome": "Drop in a video and get back the dubbed video, bilingual subtitles, and separate voice and music tracks. Everything is processed on the machine; nothing is uploaded.",
        "evidence": [
          "SRT only: 13.1 s instead of 168.7 s for the full pipeline (92% faster).",
          "Multiple voices for one video share Demucs and Whisper: the second voice takes about 29 s.",
          "Speaker separation: 100% with 4 speakers (2 male, 2 female) on synthetic voices.",
          "Offline translation of 489 lines in 82 s with none missed."
        ],
        "learning": "Measure before optimising: real numbers (time per stage, offset per line) show which stage to drop and where to protect quality, instead of guessing.",
        "privacyNote": "The source code is private on GitHub; a live demo is available on request."
      },
      "kt-epub-studio": {
        "role": "Author – designed and built the whole application",
        "challenge": "Translating an entire book with AI hits three walls: rate limits halfway through, names and forms of address drifting between chapters, and lost formatting (images, table of contents, footnotes, drop caps).",
        "responsibilities": [
          "Built an in-browser EPUB/PDF reader: TOC, images, four themes, progress saved to a local file.",
          "Wrote a translation engine with multi-key Gemini rotation, JSON-Schema structured output and per-paragraph quality checks.",
          "Generated a character, gender, address and terminology bible before translating to keep the whole book consistent.",
          "Packaged a 1-click Windows launcher that finds or installs Python, installs libraries and opens the browser."
        ],
        "process": [
          {
            "title": "Skim and build the bible",
            "description": "The AI skims the whole book to list characters, forms of address and terms; the bible is sent with every batch."
          },
          {
            "title": "Parallel, context-aware translation",
            "description": "Chapters run in parallel, each with a few already-translated paragraphs as context; keys rotate and cool down on 429."
          },
          {
            "title": "Check and retranslate",
            "description": "Untranslated, wrong-language, truncated or link-broken paragraphs are retried; hard ones go to a fallback model before Google NMT."
          },
          {
            "title": "Keep the structure",
            "description": "Images, TOC anchors, <br> and <code> are protected with placeholders; nav.xhtml and toc.ncx are translated too; a cache lets you stop and resume without spending quota."
          }
        ],
        "technologies": [
          {
            "name": "Python / FastAPI",
            "purpose": "A local server for the reader, translation studio, library and settings."
          },
          {
            "name": "Gemini",
            "purpose": "Literary translation with key rotation, structured output and a translation bible."
          },
          {
            "name": "EPUB / BeautifulSoup",
            "purpose": "Parsing chapters and TOC, rebuilding the book with its formatting intact."
          },
          {
            "name": "JavaScript / Web App",
            "purpose": "The browser reading and translation UI with a live log."
          }
        ],
        "outcome": "A local toolkit to read and translate whole books into Vietnamese with images and TOC intact; copy the folder to another PC and double-click to run.",
        "evidence": [
          "Translates nav.xhtml, toc.ncx, lists and tables without losing images or TOC anchors.",
          "Stop and resume from cache without spending quota again.",
          "Per-key health checks: latency and remaining quota.",
          "1-click launch on Windows, installing Python and libraries when missing."
        ],
        "learning": "Long-form translation quality comes from process more than the model: a consistent bible, chapter context and a check-and-retry loop matter as much as the prompt.",
        "privacyNote": "The source code is private on GitHub; a live demo is available on request."
      },
      "computer-vision-inspection": {
        "role": "Computer Vision pipeline and demo application development",
        "challenge": "The task required more than detecting objects on a conveyor: the system also had to preserve identity across frames and estimate dimensions consistently from camera data.",
        "responsibilities": [
          "Prepared data, configured experiments and evaluated detection quality.",
          "Trained YOLOv8 to localize and classify objects frame by frame.",
          "Connected SORT to preserve identities and reduce duplicate counting.",
          "Built OpenCV measurement logic, the demo application and project documentation."
        ],
        "process": [
          {
            "title": "Define input and calibration",
            "description": "Specified camera angle, observation area, object types and the conversion from image coordinates to useful measurements."
          },
          {
            "title": "Train the detector",
            "description": "Standardized the dataset, trained YOLOv8 and reviewed common failure cases before video integration."
          },
          {
            "title": "Track and measure",
            "description": "Used SORT for persistent IDs, then combined boxes, image geometry and a measurement zone to estimate dimensions."
          },
          {
            "title": "Validate and package",
            "description": "Tested multiple videos, checked duplicate counts and measurement stability, then presented the complete pipeline in a demo."
          }
        ],
        "technologies": [
          {
            "name": "Python",
            "purpose": "Orchestrated video processing and application logic."
          },
          {
            "name": "YOLOv8",
            "purpose": "Detected object location and class in each frame."
          },
          {
            "name": "SORT",
            "purpose": "Maintained object identity throughout the sequence."
          },
          {
            "name": "OpenCV",
            "purpose": "Handled video, geometry, calibration and measurement visualization."
          }
        ],
        "outcome": "Delivered an end-to-end detect → track → measure pipeline and a demonstrable application. The graduation project received a score of 9.5/10.",
        "evidence": [
          "Public GitHub repository.",
          "Video demonstration of the full workflow.",
          "Graduation-project score: 9.5/10."
        ],
        "learning": "Model accuracy is only one layer; production stability also depends on camera setup, calibration, tracking and exception rules."
      },
      "multi-task-learning": {
        "role": "Research, experiment design and notebook development",
        "challenge": "The research explored whether one perception system could learn Object Detection, Segmentation and Depth Estimation together instead of running three isolated models.",
        "responsibilities": [
          "Reviewed BDD100K and KITTI data for road-scene perception.",
          "Designed a data pipeline and shared-representation architecture.",
          "Organized task heads, losses and comparison experiments.",
          "Documented hypotheses, results and limitations in a reproducible notebook."
        ],
        "process": [
          {
            "title": "Normalize the problem",
            "description": "Aligned datasets, labels and evaluation needs across the three perception tasks."
          },
          {
            "title": "Design shared representations",
            "description": "Structured a shared backbone with separate heads for detection, segmentation and depth."
          },
          {
            "title": "Balance training",
            "description": "Observed task-loss behavior and adjusted aggregation so one objective would not dominate the others."
          },
          {
            "title": "Analyze outputs",
            "description": "Inspected predictions, recorded failure patterns and captured improvement directions in the research notebook."
          }
        ],
        "technologies": [
          {
            "name": "PyTorch",
            "purpose": "Built the model, training loop and multi-task loss system."
          },
          {
            "name": "BDD100K",
            "purpose": "Provided road-scene data for detection and segmentation."
          },
          {
            "name": "KITTI",
            "purpose": "Supported depth-perception experiments."
          },
          {
            "name": "Jupyter / Kaggle",
            "purpose": "Organized, visualized and shared the experiments."
          }
        ],
        "outcome": "Produced a complete research notebook showing the path from data and architecture to losses and output analysis. This was an academic experiment, not a production deployment.",
        "evidence": [
          "Public Kaggle research notebook.",
          "An experiment pipeline designed for extension and reruns."
        ],
        "learning": "Multi-task Learning is not automatically better; results depend on data compatibility, representation sharing and loss-balancing strategy."
      },
      "finger-counting": {
        "role": "Model experimentation and real-time web prototype development",
        "challenge": "Finger recognition in real images is affected by lighting, background, hand angle and the distinction between classification and image segmentation.",
        "responsibilities": [
          "Prepared hand-image data and preprocessing variants.",
          "Experimented with CNN, VGG16 and ResNet50 for recognition.",
          "Explored U-Net for hand-region segmentation.",
          "Integrated inference into Streamlit and recorded a demo."
        ],
        "process": [
          {
            "title": "Prepare the data",
            "description": "Cleaned, resized and organized the dataset for each modeling approach."
          },
          {
            "title": "Compare models",
            "description": "Built a CNN baseline and tested transfer learning with VGG16 and ResNet50."
          },
          {
            "title": "Explore segmentation",
            "description": "Used U-Net to isolate the hand region and assess when segmentation helps recognition."
          },
          {
            "title": "Deliver a web demo",
            "description": "Packaged inference in Streamlit for direct testing and presentation."
          }
        ],
        "technologies": [
          {
            "name": "Streamlit",
            "purpose": "Provided the web interface and inference flow."
          },
          {
            "name": "CNN",
            "purpose": "Established a baseline for the data and classification pipeline."
          },
          {
            "name": "VGG16 / ResNet50",
            "purpose": "Enabled transfer-learning comparison."
          },
          {
            "name": "U-Net",
            "purpose": "Segmented the hand region in a separate experimental path."
          }
        ],
        "outcome": "Delivered a web prototype capable of running inference and presenting multiple modeling approaches for the same hand-recognition problem.",
        "evidence": [
          "Public GitHub repository.",
          "Real-time web application video demo."
        ],
        "learning": "The right model depends on data, latency and usage context; a larger architecture does not always produce a better experience."
      },
      "recruitment-chatbot": {
        "role": "Built the multi-channel AI chatbot and supported the website design",
        "challenge": "The business needed to serve two distinct audiences—website customers and Facebook candidates—whose content, context and data sources were different.",
        "responsibilities": [
          "Collected frequently asked questions and grouped intents by channel.",
          "Designed n8n workflows connecting AI, data and response logic.",
          "Integrated GPT/Gemini and Supabase into the chatbot flow.",
          "Tested out-of-scope questions, fallbacks and human handoff cases."
        ],
        "process": [
          {
            "title": "Map conversations",
            "description": "Separated customer and recruitment use cases, then defined intents, data needs and response limits."
          },
          {
            "title": "Structure knowledge",
            "description": "Normalized FAQ content and reference data so the assistant could retrieve relevant context."
          },
          {
            "title": "Orchestrate workflows",
            "description": "Used n8n to receive events, call models, query data, evaluate rules and return results to the correct channel."
          },
          {
            "title": "Test and improve",
            "description": "Ran realistic questions, reviewed uncertainty and adjusted handoff rules for staff."
          }
        ],
        "technologies": [
          {
            "name": "n8n",
            "purpose": "Orchestrated events, AI, data sources and multi-channel responses."
          },
          {
            "name": "GPT / Gemini",
            "purpose": "Understood questions and generated language responses."
          },
          {
            "name": "Supabase",
            "purpose": "Stored or retrieved workflow data."
          },
          {
            "name": "Website / Facebook",
            "purpose": "Served customers and recruitment candidates."
          }
        ],
        "outcome": "Established two automated support flows for website and recruitment use cases, giving operations a more consistent response foundation.",
        "evidence": [
          "bongtra.vn is live with an AI chatbot for customers.",
          "Chatbot integrated on the Bong Tra Recruitment Facebook page for candidates.",
          "n8n workflows connect AI (GPT/Gemini) with data on Supabase.",
          "Recognised in the Bong Tra F&B recommendation letter."
        ],
        "learning": "Business chatbots need context architecture, fallbacks and human control—not simply a long prompt.",
        "privacyNote": "The case study covers architecture and approach only; system prompts, internal data and user information are not disclosed."
      },
      "internal-automation": {
        "role": "Internal-process analysis and automation tool development",
        "challenge": "Meeting-room booking, payroll delivery, HR-policy questions and review collection were repetitive, error-prone and costly in operational time.",
        "responsibilities": [
          "Decomposed each process into inputs, rules, actions and failure states.",
          "Built scripts connecting Google Sheets, Calendar and email.",
          "Configured triggers, access control and operational logging.",
          "Wrote guidance so employees could use and troubleshoot the tools."
        ],
        "process": [
          {
            "title": "Audit manual work",
            "description": "Observed current flows and identified repetitive steps plus points that still needed human approval."
          },
          {
            "title": "Normalize data and rules",
            "description": "Structured forms, sheets and business conditions before implementing automation."
          },
          {
            "title": "Connect Google services",
            "description": "Used Apps Script and APIs to create calendar events, send email, read data and update status."
          },
          {
            "title": "Operate and hand over",
            "description": "Added error checks, permissions, guidance and recovery steps for interrupted workflows."
          }
        ],
        "technologies": [
          {
            "name": "Google Apps Script",
            "purpose": "Implemented automation logic across Google Workspace."
          },
          {
            "name": "Sheets API",
            "purpose": "Held operational data, configuration and processing status."
          },
          {
            "name": "Calendar API",
            "purpose": "Checked availability and created meeting-room bookings."
          },
          {
            "name": "Email Automation",
            "purpose": "Delivered payroll and notifications from structured data."
          }
        ],
        "outcome": "The toolset covered four internal workflow groups and, as part of the automation program, contributed to an approximately 80% reduction in manual processing.",
        "evidence": [
          "Automated meeting-room booking.",
          "Bulk payroll-email delivery.",
          "HR FAQ and review-collection flows."
        ],
        "learning": "Automation works best when rules are simple, permissions are explicit and documentation lets users operate independently.",
        "privacyNote": "Employee data, payroll records, integration accounts and internal workflow configuration are not disclosed."
      },
      "preorder-workshop-web": {
        "role": "Supported building the landing-page UI and the registration / ordering flow",
        "challenge": "Workshop and Pre-order campaigns needed a clear path from Marketing content to registration, payment and information capture instead of disconnected manual steps.",
        "responsibilities": [
          "Mapped the user journey and campaign information hierarchy.",
          "Designed landing-page structure, CTAs and registration forms.",
          "Connected online payment to the conversion flow.",
          "Tested mobile behavior and handed over content-update guidance."
        ],
        "process": [
          {
            "title": "Map conversion",
            "description": "Defined the path from campaign entry to program choice, information entry and payment."
          },
          {
            "title": "Build page structure",
            "description": "Prioritized program details, benefits, timing, CTA and required registration fields."
          },
          {
            "title": "Connect payment",
            "description": "Placed online payment in the right stage to reduce post-registration coordination."
          },
          {
            "title": "QA and handoff",
            "description": "Tested layout, forms, CTA and payment across sizes, then documented operation for Marketing."
          }
        ],
        "technologies": [
          {
            "name": "Landing Page",
            "purpose": "Presented the campaign around one primary action."
          },
          {
            "name": "Online Payment",
            "purpose": "Reduced manual payment confirmation."
          },
          {
            "name": "Registration Form",
            "purpose": "Captured structured registration and order data."
          },
          {
            "name": "Responsive Web",
            "purpose": "Kept the conversion path usable on mobile."
          }
        ],
        "outcome": "Delivered a more compact digital flow for Workshop registration and Pre-order campaigns, helping Marketing launch faster and reducing manual intake steps.",
        "evidence": [
          "preorder.bongtra.vn is live.",
          "Two landing-page groups: Workshop and Pre-order.",
          "Online payment built into the registration / ordering flow."
        ],
        "learning": "A landing page must connect Marketing with downstream operations; a beautiful page that produces difficult data still creates more work."
      },
      "waveform-edit-studio": {
        "role": "Author – designed and built the whole application",
        "challenge": "Waveform videos for podcasts, music or audiobooks are usually assembled by hand in an editor: fit the waveform to the audio, type subtitles, mask images, add frames. Every video repeats the same steps, and layouts drift when switching between 16:9 landscape and 9:16 portrait.",
        "responsibilities": [
          "Built a Next.js interface that follows the editing flow: 8 tabs from source files, background, overlays, waveform, subtitles, camera frame and background removal to render settings, next to a live preview.",
          "Wrote a background Python worker for the heavy lifting: audio frequency analysis, Pillow image masks and the FFmpeg filter chain that assembles the video.",
          "Integrated Whisper (Base, Small, Medium) for timestamped subtitles with real-time progress and a cancel button.",
          "Designed a proportional coordinate system so subtitles, overlays and camera frames scale correctly between 1920×1080 and 1080×1920."
        ],
        "process": [
          {
            "title": "All inputs in one place",
            "description": "Background video, voice or music, an optional .srt file and the overlay images are picked in the first tab; the remaining tabs are pure configuration."
          },
          {
            "title": "Preview before rendering",
            "description": "Every change to background, waveform, overlays and subtitles shows up in the live preview, so rendering happens only once the layout is right."
          },
          {
            "title": "AI subtitles",
            "description": "Whisper listens to the voice track and produces timestamped subtitles. A line-breaking algorithm keeps every sentence to at most two lines, with Word Reveal, Karaoke, Pop and Fade effects and a single-word RSVP mode."
          },
          {
            "title": "Assembly with FFmpeg",
            "description": "The worker builds one FFmpeg filter chain: multi-pass background blur, waveform drawing, overlays and frames, burned-in subtitles. Default bitrate 12 Mbps, with a progress bar and log."
          }
        ],
        "technologies": [
          {
            "name": "Next.js / React",
            "purpose": "Glassmorphic interface with 8 editing tabs, live preview and a render log."
          },
          {
            "name": "Python worker",
            "purpose": "A background process that takes configuration from Node.js, validates it with pydantic and orchestrates the heavy steps."
          },
          {
            "name": "FFmpeg",
            "purpose": "Audio decoding, 7 waveform styles, boxblur backgrounds, layer compositing and subtitle burn-in."
          },
          {
            "name": "Whisper / PyTorch",
            "purpose": "Speech-to-subtitle with timestamps; torch and torchaudio provide hardware acceleration."
          },
          {
            "name": "Pillow",
            "purpose": "Circle, hexagon, square, rectangle and feathered masks for image overlays."
          },
          {
            "name": "AI background removal",
            "purpose": "Cuts portraits out of their background as transparent PNGs, ready to use as overlays."
          }
        ],
        "outcome": "A local studio for waveform videos: from one audio file and a few images to a finished video with waveform, AI subtitles, bass-reactive overlays and a camera frame, in both landscape and portrait for TikTok and Shorts.",
        "evidence": [
          "Open source on GitHub: trakhanh/WaveForm-Edit-Studio.",
          "7 waveform styles: Linear, Circle, Vertical, Rectangle, Triangle, Hexagon, Custom; with gradients and mirroring.",
          "Whisper subtitles with 4 effects (Word Reveal, Karaoke, Pop, Fade), single-word RSVP and a two-line limit.",
          "4 camera frames: Classic REC, Modern Cinema, Vlogger DSLR, Retro VHS.",
          "Exports 1920×1080 (16:9) or 1080×1920 (9:16) with coordinates that scale to the frame."
        ],
        "learning": "For a video tool, fast preview matters more than fast rendering: when every edit shows up in the preview, users render only once. Splitting the interface (Node.js) from the heavy processing (Python and FFmpeg) keeps the UI responsive while Whisper or FFmpeg is running."
      },
      "hrm-application": {
        "role": "Built from scratch and runs the whole system: data, API, interface, testing and deployment",
        "challenge": "Sun Media needed one place to replace scattered spreadsheets, forms and email: requests had to follow the right approval chain, HR, attendance, payroll and project data had to agree with each other, and each person should see only their own share of the work.",
        "responsibilities": [
          "Modelled the business into 146 PostgreSQL tables (via Prisma 7) and 51 Node.js/Express API groups written in TypeScript.",
          "Built close to 150 React 19 screens covering HR, leave and attendance, project finance, KPIs, recruitment, administration and internal communications.",
          "Designed multi-step approvals along the management line, a single approval inbox for every request type, live notifications and scheduled reminders.",
          "Built a permission matrix with custom roles, an audit log that masks sensitive content, read-only observer accounts and per-module on/off switches.",
          "Security: Google sign-in, signed session cookies, Helmet and CSP, API rate limiting, Zod input validation and sanitize-html for user HTML.",
          "Wrote about 4,800 automated tests and deployed with Docker Compose on a Debian VPS behind Cloudflare."
        ],
        "process": [
          {
            "title": "Start from the real process",
            "description": "Began with the work still done by hand: leave requests, timesheets, purchase requests, hiring requests. For each one, pinned down who creates it, who approves it and what data must be kept."
          },
          {
            "title": "One shared data model",
            "description": "People, departments and the management line are the root. Leave, attendance, labour cost, KPIs and payroll all reference them, so figures roll up to every level of management."
          },
          {
            "title": "Access control from day one",
            "description": "Every module is tied to permissions in the role matrix and every action is logged, so new modules ship without reworking the controls."
          },
          {
            "title": "Automated tests, continuous delivery",
            "description": "The API is tested against a dedicated test database with Vitest and Supertest, the interface with Playwright. The system is packaged with Docker Compose and updated continuously on the VPS."
          }
        ],
        "technologies": [
          {
            "name": "React 19 / TypeScript",
            "purpose": "Close to 150 screens built with Vite 6 and Tailwind CSS; Tiptap for rich text, Recharts for charts, Lucide and Motion."
          },
          {
            "name": "Node.js / Express",
            "purpose": "A single TypeScript server on one port that serves both the API and the interface."
          },
          {
            "name": "PostgreSQL / Prisma 7",
            "purpose": "146 tables with strictly typed access through Prisma."
          },
          {
            "name": "Google Login / RBAC",
            "purpose": "Gmail sign-in, signed cookie sessions, bcrypt-hashed passwords; a permission matrix with custom roles."
          },
          {
            "name": "Helmet / Zod / sanitize-html",
            "purpose": "Security headers and CSP, API rate limiting, input validation and filtering of user-supplied HTML."
          },
          {
            "name": "Gemini / Nodemailer",
            "purpose": "A policy Q&A chatbot grounded in the employee handbook; request, interview-invite and newsletter email over SMTP."
          },
          {
            "name": "xlsx / sharp",
            "purpose": "Excel import and export (attendance-machine data, payroll), image processing and file bundling with jszip."
          },
          {
            "name": "Vitest / Playwright",
            "purpose": "About 4,800 tests: API against a dedicated test database via Supertest, interface flows via Playwright."
          },
          {
            "name": "Docker Compose / Cloudflare",
            "purpose": "Deployed on a Debian VPS behind Cloudflare at eoffice.sunmedia.net.vn."
          }
        ],
        "outcome": "eOffice is live at eoffice.sunmedia.net.vn, bringing HR, leave and attendance, project finance, KPIs, recruitment, administration and internal communications into one system with access control and an audit log. About three months after it started (25 June 2026) it stands at roughly 1,130 commits.",
        "evidence": [
          "Live at eoffice.sunmedia.net.vn.",
          "About 1,130 commits · 146 tables · 51 API groups · close to 150 screens.",
          "About 4,800 automated tests (Vitest, Supertest, Playwright).",
          "One approval inbox for every request type; multi-step approvals along the management line.",
          "A policy chatbot on Google Gemini that answers from the company handbook and rules."
        ],
        "learning": "For an internal system, what decides success is not the number of screens but whether the data agrees. Once people, the management line and permissions are modelled right, later modules such as attendance, payroll or project finance simply reference and roll up. Automated tests are what make it safe to add a module every week without breaking the old ones.",
        "privacyNote": "This case study covers scope and technology only; no data, accounts, internal screenshots or specific permission settings are disclosed."
      },
      "ai-creative-production": {
        "role": "AI-tool R&D and video-production workflow design",
        "challenge": "GenAI tools produce many output types but easily become fragmented. The challenge was organizing them into a workflow with a clear brief, quality control, versioning and handoff.",
        "responsibilities": [
          "Researched and evaluated AI tools by production stage.",
          "Applied AI to research, scripts, storyboards, visuals, voice and animation.",
          "Designed asset, version and work-status tracking.",
          "Kept a human in the loop for factual, visual and consistency review."
        ],
        "process": [
          {
            "title": "Brief and research",
            "description": "Translated requests into objectives, audience, message and references before generation."
          },
          {
            "title": "Script and storyboard",
            "description": "Used AI for structure, shot lists and storyboards, then edited against the creative direction."
          },
          {
            "title": "Create and manage assets",
            "description": "Produced visual, voice and animation assets with naming, version and status rules."
          },
          {
            "title": "QA and publishing",
            "description": "Reviewed factuality, visuals, tone, continuity and final-output checklists before publishing."
          }
        ],
        "technologies": [
          {
            "name": "ChatGPT / Claude",
            "purpose": "Research, content structure, scripts and critical review."
          },
          {
            "name": "Gemini / NotebookLM",
            "purpose": "Source synthesis, document reading and contextual verification."
          },
          {
            "name": "Antigravity",
            "purpose": "Tool and asset-direction experimentation during R&D."
          },
          {
            "name": "AI Visual / Voice",
            "purpose": "Created imagery, narration and production assets."
          }
        ],
        "outcome": "Established a systems approach to AI Video Production that connects research → script → assets → QA → publishing instead of treating tools in isolation.",
        "evidence": [
          "Workflow coverage across multiple video-production stages.",
          "Tools evaluated by task fit rather than trend."
        ],
        "learning": "AI accelerates production but does not replace art direction, fact-checking or version control; a human must remain accountable for the final output.",
        "privacyNote": "Client assets, unreleased content and internal production-workflow configuration are not disclosed."
      },
      "odoo-erp-demo": {
        "role": "Proposed the solution and built the ERP demo",
        "challenge": "A growing F&B business had data and operations spread across many tools. Before investing in ERP, the company needed to see concretely what a centralised system would look like with its own processes.",
        "responsibilities": [
          "Mapped current processes and picked the flows to bring into ERP first.",
          "Proposed Odoo Online as a lean starting point with no infrastructure to run.",
          "Configured a trial demo with the relevant modules.",
          "Presented the demo as the basis for a company-wide decision."
        ],
        "process": [
          {
            "title": "Map the process",
            "description": "Recorded how each team works today and where data is re-entered or scattered."
          },
          {
            "title": "Scope the demo",
            "description": "Prioritised flows that show the value of centralised data rather than every module."
          },
          {
            "title": "Build on Odoo Online",
            "description": "Configured modules and sample data so users could see a real working flow."
          },
          {
            "title": "Present and collect feedback",
            "description": "Demoed to stakeholders and captured questions and requirements for the decision."
          }
        ],
        "technologies": [
          {
            "name": "Odoo Online",
            "purpose": "SaaS ERP for a fast demo with no servers to run."
          },
          {
            "name": "ERP / HRM Model",
            "purpose": "Modular thinking, centralised data and approval flows."
          },
          {
            "name": "Workflow / API",
            "purpose": "Modelling business flows before configuration."
          }
        ],
        "outcome": "The Odoo Online demo showed leadership concretely how ERP would run with the company's processes, giving a basis for a company-wide adoption decision.",
        "evidence": [
          "Proposed an ERP approach with Odoo Online.",
          "Built and presented a trial demo.",
          "Confirmed in the Bong Tra F&B recommendation letter."
        ],
        "learning": "A working demo convinces more than pages of proposal: users give better feedback when they see their own process in the system.",
        "privacyNote": "Internal data, configuration and screenshots are not published."
      },
      "amis-misa-erp": {
        "role": "IT intern – supported the ERP rollout and user training",
        "challenge": "Moving a Sales team to a new ERP/CRM always meets resistance: people need to learn new ways of working, leads must be tracked properly, and daily work cannot stop.",
        "responsibilities": [
          "Supported the AMIS MISA ERP rollout, focusing on the AI Marketing module.",
          "Wrote CRM user guides for the Sales team.",
          "Helped train and support users during the switch-over.",
          "Supported internal IT operations and troubleshooting."
        ],
        "process": [
          {
            "title": "Understand the module and needs",
            "description": "Learned the AI Marketing module and how Sales tracked leads."
          },
          {
            "title": "Support configuration and rollout",
            "description": "Joined the rollout steps with the implementation team."
          },
          {
            "title": "Document",
            "description": "Wrote guides that follow Sales' daily tasks so they could self-serve."
          },
          {
            "title": "Train and support",
            "description": "Hands-on guidance and troubleshooting in the first weeks of use."
          }
        ],
        "technologies": [
          {
            "name": "AMIS MISA",
            "purpose": "The ERP/CRM system rolled out for the business."
          },
          {
            "name": "ERP / HRM Model",
            "purpose": "Understanding customer data flow and permissions in ERP."
          },
          {
            "name": "AI Marketing",
            "purpose": "Module helping Sales track and nurture leads."
          }
        ],
        "outcome": "Sales had guides and training support to move to the new CRM and use the AI Marketing module to track leads more effectively.",
        "evidence": [
          "Supported the AMIS MISA ERP rollout, AI Marketing module.",
          "CRM user guides for the Sales team.",
          "Training support during the system switch-over."
        ],
        "learning": "ERP success depends on people as much as software: guides that match real tasks and on-site support are what make a system actually used.",
        "privacyNote": "Customer data and system configuration are not published."
      }
    }
  }
} as const;
