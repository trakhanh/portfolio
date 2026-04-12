import json
import re

projects = [
    {
        "img": "/img/Notebooklm.png",
        "tag": "💬 NLP & Chatbot",
        "title": "Chatbot Nội bộ (NotebookLM FAQ)",
        "badge": "🤖 AI Assistant",
        "desc": "Hệ thống giảm 40% câu hỏi lặp lại cho bộ phận HR nhờ khả năng tra cứu tài liệu thông minh. Sử dụng <strong>Google NotebookLM</strong> làm não bộ, cùng nền tảng tự động hoá <strong>n8n</strong> và <strong>Gemini AI</strong> kết xuất dữ liệu tức thì.",
        "techs": ["n8n", "Gemini", "Google Apps Script", "NotebookLM"],
        "features": [
            {"icon": "fa-book", "color": "blue", "text": "FAQ Knowledge Base"},
            {"icon": "fa-bolt", "color": "amber", "text": "Instant Responses"},
            {"icon": "fa-chart-line", "color": "green", "text": "Usage Tracking"}
        ],
        "links": [
            {"url": "#", "icon": "fa-lock", "text": "Hệ thống Nội bộ", "style": "gray"}
        ]
    },
    {
        "img": "/img/N8N.jpg",
        "tag": "🚀 AI Assistant",
        "title": "Chatbot đa kênh Website & Fanpage",
        "badge": "🤖 Multi-Channel",
        "desc": "Tự động hóa luồng tương tác với ứng viên tuyển dụng ở Website và Facebook. Triển khai kiến trúc xử lý bằng <strong>n8n</strong> và lưu trữ hồ sơ bằng hệ quản trị <strong>Supabase</strong>, giúp tiết kiệm triệt để thời gian của tư vấn viên.",
        "techs": ["n8n", "GPT/Gemini", "Supabase", "Webhook"],
        "features": [
            {"icon": "fa-globe", "color": "cyan", "text": "Đa nền tảng"},
            {"icon": "fa-brain", "color": "indigo", "text": "LLM Router"},
            {"icon": "fa-database", "color": "rose", "text": "Quản lý Real-time"}
        ],
        "links": [
            {"url": "https://bongtra.vn", "icon": "fa-globe", "text": "Website Demo", "style": "primary"},
            {"url": "https://www.facebook.com/bongtratuyendung", "icon": "fa-facebook", "text": "Fanpage Demo", "style": "secondary"}
        ]
    },
    {
        "img": "/img/appsscripts.jpg",
        "tag": "⚙️ Workflow Automation",
        "title": "Hệ thống Tự động hoá Nội bộ",
        "badge": "🔄 Business Automation",
        "desc": "Giải quyết các điểm nghẽn hành chính. Tool gửi mail hàng loạt (bảng lương, thư báo) bằng <strong>Google Apps Script</strong>. Hệ thống chống xung đột lịch khi đặt phòng họp điều khiển bằng <strong>Google Sheets & Calendar API</strong>.",
        "techs": ["Apps Script", "Sheets API", "JavaScript", "HTML/CSS"],
        "features": [
            {"icon": "fa-envelope", "color": "emerald", "text": "Auto Mailing"},
            {"icon": "fa-calendar-check", "color": "blue", "text": "Auto Booking"},
            {"icon": "fa-shield-alt", "color": "purple", "text": "Chống trùng lịch"}
        ],
        "links": [
            {"url": "#", "icon": "fa-lock", "text": "Internal Systems", "style": "gray"}
        ]
    },
    {
        "img": "./img/doantotnghiepj2_3.png",
        "tag": "🎯 Đạt 9.5 Đồ án",
        "title": "Nhận dạng và Đo kích thước Vật thể",
        "badge": "🏆 Grad. Project",
        "desc": "Nghiên cứu thị giác máy tính công nghiệp. Kết hợp sức mạnh của mô hình <strong>YOLOv8</strong> trong nhận diện và thuật toán <strong>SORT</strong> trong theo dõi vi lường, đạt độ chuẩn xác đo đạc thực tế băng chuyền lến đến 95%.",
        "techs": ["Python", "YOLOv8", "OpenCV", "PyTorch"],
        "features": [
            {"icon": "fa-eye", "color": "blue", "text": "Real-time Detection"},
            {"icon": "fa-ruler", "color": "green", "text": "Measurement (95%)"},
            {"icon": "fa-compress-arrows-alt", "color": "orange", "text": "Multi-Object Track"}
        ],
        "links": [
            {"url": "https://github.com/trakhanh/AppDetectAndMeasureObject.git", "icon": "fa-github", "text": "Mã nguồn", "style": "dark"},
            {"url": "https://youtu.be/L07IJW2GpZo", "icon": "fa-play-circle", "text": "Video Thực Tế", "style": "secondary"}
        ]
    },
    {
        "img": "./img/fingercount.png",
        "tag": "✋ Hand Tracking",
        "title": "Đếm Ngón Tay Bằng Deep Learning",
        "badge": "🤖 Computer Vision",
        "desc": "Phần mềm web tương tác real-time đếm và nhận diện cấu trúc tay người sử dụng kỹ thuật mạng chập (CNN). Kết hợp <strong>U-NET</strong> để phân đoạn ảnh chính xác trên luồng Webcam (<strong>Streamlit</strong>).",
        "techs": ["Streamlit", "CNN/VGG16", "U-NET", "OpenCV"],
        "features": [
            {"icon": "fa-hand-paper", "color": "amber", "text": "Nhận diện cử chỉ"},
            {"icon": "fa-layer-group", "color": "purple", "text": "VGG16 & ResNet"},
            {"icon": "fa-chart-pie", "color": "rose", "text": "Phân đoạn ảnh"}
        ],
        "links": [
            {"url": "https://github.com/trakhanh/UngDungDemNgonTay5-9.git", "icon": "fa-github", "text": "Mã nguồn", "style": "dark"},
            {"url": "https://youtu.be/NEbpUe2FScA", "icon": "fa-play-circle", "text": "Demo Trực Tiếp", "style": "primary"}
        ]
    },
    {
        "img": "./img/multi_task.png",
        "tag": "🧠 Research",
        "title": "Nghiên cứu Multi-Task Learning",
        "badge": "🔬 Data Science",
        "desc": "Tiên phong ứng dụng mô hình một mạng nơ-ron đa tác vụ (Multi-task Learning) lên dữ liệu xe tự lái lớn như <strong>BDD100K</strong>. Thực hiện đồng thời Phát hiện đối tượng, Phân đoạn đường và Ước lượng chiều sâu.",
        "techs": ["PyTorch", "BDD100K/KITTI", "Deep Learning"],
        "features": [
            {"icon": "fa-network-wired", "color": "indigo", "text": "Single Architecture"},
            {"icon": "fa-road", "color": "teal", "text": "Lane Segmentation"},
            {"icon": "fa-cube", "color": "rose", "text": "Depth Estimation"}
        ],
        "links": [
            {"url": "https://www.kaggle.com/code/khanhtraa/multi-task-bdd100k", "icon": "fa-kaggle", "text": "Nghiên cứu cụ thể", "style": "primary"}
        ]
    },
    {
        "img": "./img/project4.png",
        "tag": "📊 Business Analytics",
        "title": "Machine Learning: Customer Churn",
        "badge": "📈 M.L. Data",
        "desc": "Triển khai luồng EDA chuyên sâu (Exploratory Data Analysis) và dự đoán tỷ lệ khách hàng rời bỏ (Customer Churn) bằng các mô hình máy học scikit-learn. Đóng vai trò hạt nhân xây dựng chiến lược Business.",
        "techs": ["Pandas", "Scikit-learn", "Seaborn", "EDA"],
        "features": [
            {"icon": "fa-users-slash", "color": "red", "text": "Churn Prediction"},
            {"icon": "fa-chart-area", "color": "blue", "text": "Visual Analytics"},
            {"icon": "fa-brain", "color": "purple", "text": "ML Modeling"}
        ],
        "links": [
            {"url": "https://colab.research.google.com/drive/1FGsrd0j4zfvvju4NXjXqrvxQPKGvEUIU?usp=sharing", "icon": "fa-google", "text": "Xem phân tích Data", "style": "secondary"}
        ]
    },
    {
        "img": "./img/project5.png",
        "tag": "📈 Sales Forecast",
        "title": "Phân Tích Dữ Liệu Bán Hàng",
        "badge": "📊 Analytics",
        "desc": "Báo cáo chi tiết về tình hình kinh doanh, biến động doanh thu thông qua thư viện Matplotlib và Seaborn. Triển khai mô hình dự đoán xu hướng cho tệp khách hàng tiềm năng bằng Python.",
        "techs": ["Python", "Matplotlib", "Pandas", "Forecasting"],
        "features": [
            {"icon": "fa-chart-bar", "color": "teal", "text": "Trend Analysis"},
            {"icon": "fa-chart-line", "color": "emerald", "text": "Sales Forecasting"},
            {"icon": "fa-tv", "color": "orange", "text": "Dashboard"}
        ],
        "links": [
            {"url": "https://colab.research.google.com/drive/1bEOf_b5ZdatBlnio4CHgAGf15kEH8COs?usp=sharing", "icon": "fa-google", "text": "Notebook Colab", "style": "primary"}
        ]
    }
]

def style_classes(s):
    if s == 'primary': return "bg-blue-600 dark:bg-blue-600 text-white shadow-lg hover:bg-blue-700 shadow-blue-500/30"
    if s == 'secondary': return "bg-emerald-500 dark:bg-emerald-600 text-white shadow-lg hover:bg-emerald-600 shadow-emerald-500/30"
    if s == 'dark': return "bg-slate-800 text-white shadow-lg hover:bg-slate-900 shadow-slate-800/30 dark:bg-slate-100 dark:text-slate-900 border border-slate-700"
    if s == 'gray': return "bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 cursor-not-allowed border border-slate-300 dark:border-slate-700"
    return "bg-slate-800 text-white"

html_out = '<div class="w-full max-w-6xl mx-auto px-4 md:px-0 space-y-16 lg:space-y-32 layout-zigzag">\n'
for idx, p in enumerate(projects):
    techs_html = ""
    for t in p['techs']:
        techs_html += f'<span class="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer">{t}</span>\n'

    feat_html = ""
    for f in p['features']:
        feat_html += f'''
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-{f["color"]}-100 dark:bg-{f["color"]}-900/30 flex items-center justify-center text-{f["color"]}-600 dark:text-{f["color"]}-400 shadow-sm border border-{f["color"]}-200 dark:border-{f["color"]}-800/30">
                <i class="fas {f["icon"]} text-sm"></i>
            </div>
            <span class="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{f["text"]}</span>
        </div>
        '''

    links_html = ""
    for l in p['links']:
        links_html += f'''
        <a href="{l["url"]}" target="_blank" class="px-5 py-2.5 rounded-xl {style_classes(l["style"])} font-semibold transition-all transform hover:-translate-y-1 inline-flex items-center gap-2">
            <i class="fab {l["icon"]} text-lg"></i> {l["text"]}
        </a>\n'''

    # Layout Direction
    is_even = (idx % 2 != 0)
    flex_dir = "lg:flex-row-reverse" if is_even else "lg:flex-row"
    visibility = "" if idx < 4 else " hidden extra-project"

    slide = f'''
    <!-- Project Row {idx+1} -->
    <div class="flex flex-col {flex_dir} gap-8 lg:gap-16 items-center{visibility} reveal-anim">
        <!-- Image Side -->
        <div class="w-full lg:w-1/2 relative group perspective-1000">
            <!-- Glow Effect -->
            <div class="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
            
            <div class="relative bg-white dark:bg-[#151c2c] border border-slate-200/60 dark:border-slate-700/50 p-2 sm:p-3 rounded-[2rem] shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02]">
                <!-- Mac Header -->
                <div class="bg-slate-100 dark:bg-[#0f172a] h-10 rounded-t-[1.5rem] flex items-center px-5 border-b border-slate-200 dark:border-slate-700/50">
                    <div class="flex gap-2">
                        <span class="w-3 h-3 rounded-full bg-rose-500 shadow-sm"></span>
                        <span class="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></span>
                        <span class="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></span>
                    </div>
                </div>
                <!-- Browser content -->
                <div class="aspect-[4/3] sm:aspect-video lg:aspect-[4/3] bg-slate-100 dark:bg-slate-900 rounded-b-[1.5rem] overflow-hidden relative">
                    <img src="{p['img']}" alt="{p['title']}" class="w-full h-full object-cover object-top transition-transform duration-[2000ms] group-hover:scale-110">
                    <!-- Tech overlay on hover -->
                    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <div class="px-6 py-2 border border-white/20 bg-white/10 rounded-full text-white font-medium tracking-widest uppercase text-sm shadow-2xl">
                            {p['tag']}
                         </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Side -->
        <div class="w-full lg:w-1/2 flex flex-col justify-center">
            <div class="inline-flex py-1.5 px-4 mb-5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-indigo-200 dark:border-indigo-700/50 w-max shadow-sm">
                {p['badge']}
            </div>
            
            <h3 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] mb-6 tracking-tight">
                {p['title']}
            </h3>
            
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg mb-8">
                {p['desc']}
            </p>
            
            <!-- Features Layout -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 mb-10">
                {feat_html}
            </div>
            
            <!-- Tags & Actions -->
            <div class="flex flex-col gap-6">
                <div class="flex flex-wrap gap-2">
                    {techs_html}
                </div>
                
                <div class="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4">
                    {links_html}
                </div>
            </div>
        </div>
    </div>
    '''
    html_out += slide

html_out += '''
    <!-- Show more button -->
    <div class="flex justify-center mt-12 pt-8" id="showMoreContainer">
        <button id="showMoreProjectsBtn" onclick="document.querySelectorAll('.extra-project').forEach(el => el.classList.remove('hidden')); this.style.display='none'; document.getElementById('collapseProjectsBtn').style.display='flex';" class="group px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 text-slate-800 dark:text-white">
            Xem Thêm 4 Dự Án Khác
            <i class="fas fa-chevron-down text-blue-500 group-hover:translate-y-1 transition-transform"></i>
        </button>
        <button id="collapseProjectsBtn" style="display:none;" onclick="document.querySelectorAll('.extra-project').forEach(el => el.classList.add('hidden')); this.style.display='none'; document.getElementById('showMoreProjectsBtn').style.display='flex'; window.location.hash='#projects';" class="group px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 text-slate-800 dark:text-white">
            Thu Gọn Dự Án
            <i class="fas fa-chevron-up text-blue-500 group-hover:-translate-y-1 transition-transform"></i>
        </button>
    </div>
</div>
'''

open('c:/Users/Admin/Desktop/Portfolio/scratch_zigzag.txt', 'w', encoding='utf-8').write(html_out)

import re
html = open('c:/Users/Admin/Desktop/Portfolio/index.html', 'r', encoding='utf-8').read()
# Find the wrapper spanning from <div class="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12"> (Line 1054) 
# To the end of the slideshow `</div>\n                </div>\n            </div>`
# I will just match <div class="w-full max-w-7xl mx-auto px-4 ... up to \n    </section>\n
pattern = r'<div class="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12">\s*<div\s*class="project-slideshow.*?</section>'
repl = html_out + '\n    </section>'

new_html, count = re.subn(pattern, repl, html, flags=re.DOTALL)
if count > 0:
    open('c:/Users/Admin/Desktop/Portfolio/index.html', 'w', encoding='utf-8').write(new_html)
    print("Replaced section in index.html successfully!")
else:
    print("Failed to match the regex for projects section block.")

# Clear any JS referring to project-slideshow
script_pattern = r'// Projects Slideshow.*?\}\);'
new_html2, js_count = re.subn(script_pattern, '// Projects Slideshow Removed', new_html, flags=re.DOTALL)
open('c:/Users/Admin/Desktop/Portfolio/index.html', 'w', encoding='utf-8').write(new_html2)

print(f"Javascript removed: {js_count}")

