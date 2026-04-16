// ================================================
// LANGUAGE TRANSLATION SYSTEM
// ================================================

class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'vi';
        this.translations = {
            vi: {
                // Navigation
                'nav.about': 'Giới thiệu',
                'nav.skills': 'Kỹ năng',
                'nav.certificates': 'Chứng chỉ',
                'nav.experience': 'Kinh nghiệm',
                'nav.projects': 'Dự án',
                'nav.contact': 'Liên hệ',
                'nav.portfolio': 'Portfolio',

                // Splash Screen
                'splash.loading': 'Đang tải portfolio...',
                'splash.preparing': 'Đang chuẩn bị nội dung...',
                'splash.info': 'Đang tải thông tin...',
                'splash.completing': 'Đang hoàn thành...',
                'splash.welcome': 'Chào mừng bạn!',
                'splash.subtitle1': 'Data Science',
                'splash.subtitle2': 'AI Enthusiast',
                'splash.subtitle3': 'IT Support',

                // Hero Section
                'hero.student': 'Sinh viên chuyên ngành Data Science - Trường Đại học Huflit',
                'hero.greeting': 'Xin chào, tôi là',
                'hero.name': 'Trà Nguyễn Gia Khánh',
                'hero.title1': 'Data Science',
                'hero.title2': 'AI Enthusiast',
                'hero.description': 'Chào mừng đến với portfolio của tôi! Tôi là sinh viên năm cuối chuyên ngành Data Science tại Huflit, với niềm đam mê mãnh liệt về trí tuệ nhân tạo, học máy và phân tích dữ liệu. Hãy cùng khám phá hành trình và dự án của tôi!',
                'hero.downloadCV': 'Tải CV',
                'hero.viewWork': 'Xem dự án',
                'hero.contactMe': 'Liên hệ với tôi',
                'hero.learnMore': 'Tìm hiểu thêm',
                'hero.scrollDown': 'Cuộn xuống',
                'hero.gradeScore': 'Điểm đồ án tốt nghiệp',
                'hero.certificates': 'Chứng chỉ',
                'hero.projects': 'Dự án hoàn thành',

                // About Section
                'about.title': 'Giới thiệu bản thân',
                'about.subtitle': 'Tìm hiểu về tôi',
                'about.heading': 'Giới thiệu bản thân',
                'about.intro': 'Tôi là Trà Nguyễn Gia Khánh, tốt nghiệp chuyên ngành Khoa học Dữ liệu (Data Science) trường Đại Học Ngoại Ngữ Và Tin Học (HUFLIT) tại TP.HCM, định hướng phát triển trong lĩnh vực AI, AI Automation và Hỗ trợ Kỹ thuật. Tôi có nền tảng Python, chứng chỉ Google IT Support, cùng kinh nghiệm thực tập tại Bông Trà F&B, nơi tôi tham gia phát triển chatbot, giải pháp AI nội bộ và công cụ tự động hóa quy trình.',
                'about.achievement': 'Thành tựu',
                'about.achievementDesc': 'Tôi đã hoàn thành đồ án tốt nghiệp với chủ đề "Xây dựng hệ thống kiểm tra chất lượng gỗ công nghiệp bằng Computer Vision", đạt điểm số ấn tượng 9.5/10. Dự án này không chỉ minh chứng cho khả năng ứng dụng kiến thức AI vào giải quyết bài toán công nghiệp thực tiễn, mà còn phản ánh tinh thần ham học hỏi và khát khao đóng góp vào các giải pháp đổi mới sáng tạo.',
                'about.goal': 'Mục tiêu nghề nghiệp',
                'about.goalDesc': 'Tôi tìm kiếm cơ hội nghề nghiệp trong lĩnh vực phát triển, ứng dụng AI hoặc Hỗ trợ Kỹ thuật CNTT. Với những kỹ năng đã được trang bị, tôi mong muốn được vận dụng chuyên môn để giải quyết các thách thức công nghệ, đồng thời mang lại giá trị thiết thực cho tổ chức và cộng đồng.',
                'about.stats.projects': 'Dự án',
                'about.stats.certificates': 'Chứng chỉ',
                'about.stats.experience': 'Năm kinh nghiệm',
                'about.stats.internships': 'Công ty thực tập',
                'about.statsTitle': 'Tổng quan',
                'about.thesisLabel': 'Đồ án tốt nghiệp',
                'about.achievementShort': 'Nhận diện đối tượng trên băng chuyền công nghiệp bằng Computer Vision & AI',
                'about.contactBtn': 'Liên hệ tôi',
                'about.downloadCV': 'Xem và tải CV của tôi',
                'about.contactInfo': 'Thông tin liên hệ',
                'about.location': 'Địa điểm',
                'about.locationValue': 'TP.HCM, Việt Nam',
                'about.education': 'Học vấn',
                'about.educationValue': 'Đại học Huflit - Data Science',
                'about.email': 'Email',

                // Skills Section
                'skills.title': 'Kỹ năng của tôi',
                'skills.subtitle': 'Những công nghệ và kỹ năng mà tôi đã phát triển qua quá trình học tập',
                'skills.programming': 'Lập trình',
                'skills.dataScience': 'AI & Data Science',
                'skills.tools': 'Kỹ năng & Hệ thống',
                'skills.soft': 'Kỹ năng mềm',

                // Certificates Section
                'certificates.title': 'Chứng chỉ của tôi',
                'certificates.subtitle': 'Một vài chứng chỉ và bằng cấp tôi đã đạt được trong quá trình học tập và phát triển nghề nghiệp, ngoài ra tôi còn đang học thêm về chứng chỉ Data Analysis và IT Security từ Google, bạn có thể xem thêm ở CV của tôi ở trên.',
                'certificates.view': 'Xem chi tiết',

                // Projects Section
                'projects.title': 'Dự án nổi bật',
                'projects.subtitle': 'Khám phá những dự án AI và Data Science tôi đã thực hiện trong quá trình học tập',
                'projects.viewMore': 'Xem thêm',
                'projects.viewCode': 'Xem mã nguồn',
                'projects.technologies': 'Công nghệ',
                'projects.prev': 'Trước',
                'projects.next': 'Tiếp',

                // Contact Section
                'contact.title': 'Liên hệ',
                'contact.subtitle': 'Hãy kết nối với tôi',
                'contact.heading': 'Liên hệ với tôi',
                'contact.description': 'Tôi luôn sẵn sàng kết nối và trao đổi về các cơ hội hợp tác, dự án thú vị, hoặc đơn giản là trò chuyện về công nghệ!',
                'contact.form.title': 'Gửi tin nhắn',
                'contact.form.name': 'Họ và tên',
                'contact.form.namePlaceholder': 'Nhập họ và tên của bạn',
                'contact.form.email': 'Email',
                'contact.form.emailPlaceholder': 'Nhập địa chỉ email',
                'contact.form.message': 'Tin nhắn',
                'contact.form.messagePlaceholder': 'Nhập tin nhắn của bạn...',
                'contact.form.send': 'Gửi tin nhắn',
                'contact.form.sending': 'Đang gửi...',
                'contact.info.title': 'Thông tin liên hệ',
                'contact.info.email': 'Email',
                'contact.info.phone': 'Điện thoại',
                'contact.info.location': 'Địa điểm',
                'contact.info.locationValue': 'TP. Hồ Chí Minh, Việt Nam',
                'contact.social.title': 'Mạng xã hội',
                'contact.social.follow': 'Theo dõi tôi trên',

                // Footer
                'footer.copyright': '© 2025 Trà Nguyễn Gia Khánh. Tất cả quyền được bảo lưu.',
                'footer.madeWith': 'Được tạo với',
                'footer.by': 'bởi',

                // Notifications
                'notification.success': 'Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi trong thời gian sớm nhất.',
                'notification.error': 'Có lỗi xảy ra. Vui lòng thử lại sau.',
                'notification.fillAll': 'Vui lòng điền đầy đủ tất cả các trường',
                'notification.invalidEmail': 'Vui lòng nhập địa chỉ email hợp lệ',
                'notification.sendError': 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email: khanhtra229@gmail.com',

                // CV Popup
                'cv.title': 'Đang chuẩn bị CV',
                'cv.subtitle': 'CV của bạn sẽ mở trong',
                'cv.seconds': 'giây',
                'cv.openNow': 'Mở ngay',
                'cv.close': 'Đóng',
                'cv.progress.checking': 'Đang kiểm tra file...',
                'cv.progress.loading': 'Đang tải dữ liệu...',
                'cv.progress.preparing': 'Đang chuẩn bị CV...',
                'cv.progress.completing': 'Gần hoàn thành...',
                'cv.progress.done': 'Hoàn tất!'
            },
            en: {
                // Navigation
                'nav.about': 'About',
                'nav.skills': 'Skills',
                'nav.certificates': 'Certificates',
                'nav.experience': 'Experience',
                'nav.projects': 'Projects',
                'nav.contact': 'Contact',
                'nav.portfolio': 'Portfolio',

                // Splash Screen
                'splash.loading': 'Loading portfolio...',
                'splash.preparing': 'Preparing content...',
                'splash.info': 'Loading information...',
                'splash.completing': 'Completing...',
                'splash.welcome': 'Welcome!',
                'splash.subtitle1': 'Data Science',
                'splash.subtitle2': 'AI Enthusiast',
                'splash.subtitle3': 'IT Support',

                // Hero Section
                'hero.student': 'Data Science Student - Huflit University',
                'hero.greeting': 'Hello, I am',
                'hero.name': 'Tra Nguyen Gia Khanh',
                'hero.title1': 'Data Science',
                'hero.title2': 'AI Enthusiast',
                'hero.description': 'Welcome to my portfolio! I am a final-year Data Science student at Huflit, with a strong passion for artificial intelligence, machine learning, and data analysis. Let\'s explore my journey and projects!',
                'hero.downloadCV': 'Download CV',
                'hero.viewWork': 'View Projects',
                'hero.contactMe': 'Contact Me',
                'hero.learnMore': 'Learn More',
                'hero.scrollDown': 'Scroll Down',
                'hero.gradeScore': 'Thesis Grade',
                'hero.certificates': 'Certificates',
                'hero.projects': 'Completed Projects',

                // About Section
                'about.title': 'About Me',
                'about.subtitle': 'Get to know me',
                'about.heading': 'About Me',
                'about.intro': 'I am Tra Nguyen Gia Khanh, a Data Science student preparing to graduate, with a career focus on Artificial Intelligence (AI) and IT Technical Support. With a strong foundation in Python programming and experience developing AI solutions through various academic projects, I have also strengthened my user support skills through Google IT Support certification and practical experience.',
                'about.achievement': 'Achievements',
                'about.achievementDesc': 'I completed my thesis on "Building an Industrial Wood Quality Inspection System using Computer Vision" with an impressive score of 9.5/10. This project not only demonstrates my ability to apply AI knowledge to solve practical industrial problems but also reflects my learning spirit and desire to contribute to innovative solutions.',
                'about.goal': 'Career Goals',
                'about.goalDesc': 'I am seeking career opportunities in AI development, application, or IT Technical Support. With the skills I have acquired, I aspire to apply my expertise to solve technology challenges while bringing practical value to organizations and communities.',
                'about.stats.projects': 'Projects',
                'about.stats.certificates': 'Certificates',
                'about.stats.experience': 'Years Experience',
                'about.stats.internships': 'Internships',
                'about.statsTitle': 'Overview',
                'about.thesisLabel': 'Graduation Thesis',
                'about.achievementShort': 'Object Detection on Industrial Conveyor Belt using Computer Vision & AI',
                'about.contactBtn': 'Contact Me',
                'about.downloadCV': 'View & Download My CV',
                'about.contactInfo': 'Contact Information',
                'about.location': 'Location',
                'about.locationValue': 'Ho Chi Minh City, Vietnam',
                'about.education': 'Education',
                'about.educationValue': 'Huflit University - Data Science',
                'about.email': 'Email',

                // Skills Section
                'skills.title': 'My Skills',
                'skills.subtitle': 'Technologies and skills I have developed through my learning journey',
                'skills.programming': 'Programming',
                'skills.dataScience': 'AI & Data Science',
                'skills.tools': 'Skills & Systems',
                'skills.soft': 'Soft Skills',

                // Certificates Section
                'certificates.title': 'My Certificates',
                'certificates.subtitle': 'Some certificates and qualifications I have earned during my studies and professional development. I am also currently studying for Data Analysis and IT Security certificates from Google, you can see more in my CV above.',
                'certificates.view': 'View Details',

                // Projects Section
                'projects.title': 'Featured Projects',
                'projects.subtitle': 'Explore my AI and Data Science projects completed during my studies',
                'projects.viewMore': 'View More',
                'projects.viewCode': 'View Code',
                'projects.technologies': 'Technologies',
                'projects.prev': 'Previous',
                'projects.next': 'Next',

                // Contact Section
                'contact.title': 'Contact',
                'contact.subtitle': 'Let\'s connect',
                'contact.heading': 'Get In Touch',
                'contact.description': 'I\'m always open to connecting and discussing collaboration opportunities, exciting projects, or simply chatting about technology!',
                'contact.form.title': 'Send Message',
                'contact.form.name': 'Full Name',
                'contact.form.namePlaceholder': 'Enter your full name',
                'contact.form.email': 'Email',
                'contact.form.emailPlaceholder': 'Enter your email address',
                'contact.form.message': 'Message',
                'contact.form.messagePlaceholder': 'Enter your message...',
                'contact.form.send': 'Send Message',
                'contact.form.sending': 'Sending...',
                'contact.info.title': 'Contact Information',
                'contact.info.email': 'Email',
                'contact.info.phone': 'Phone',
                'contact.info.location': 'Location',
                'contact.info.locationValue': 'Ho Chi Minh City, Vietnam',
                'contact.social.title': 'Social Media',
                'contact.social.follow': 'Follow me on',

                // Footer
                'footer.copyright': '© 2025 Tra Nguyen Gia Khanh. All rights reserved.',
                'footer.madeWith': 'Made with',
                'footer.by': 'by',

                // Notifications
                'notification.success': 'Thank you for contacting me! I will respond as soon as possible.',
                'notification.error': 'An error occurred. Please try again later.',
                'notification.fillAll': 'Please fill in all fields',
                'notification.invalidEmail': 'Please enter a valid email address',
                'notification.sendError': 'An error occurred while sending the message. Please try again later or contact directly via email: khanhtra229@gmail.com',

                // CV Popup
                'cv.title': 'Preparing CV',
                'cv.subtitle': 'Your CV will open in',
                'cv.seconds': 'seconds',
                'cv.openNow': 'Open Now',
                'cv.close': 'Close',
                'cv.progress.checking': 'Checking file...',
                'cv.progress.loading': 'Loading data...',
                'cv.progress.preparing': 'Preparing CV...',
                'cv.progress.completing': 'Almost done...',
                'cv.progress.done': 'Complete!'
            }
        };

        this.documentMeta = {
            vi: { title: 'Khanh Tra Portfolio' },
            en: { title: 'Gia Khanh Tra Nguyen Portfolio' }
        };

        this.staticTranslations = {
            vi: {
                '.splash-footer-text': 'Portfolio 2025',
                '#contact .text-center p:not([data-i18n])': 'Hay lien he voi toi neu ban muon hop tac hoac co bat ky cau hoi nao',
                '#contact .mt-8 h3': 'Hoac lien he voi toi thong qua',
                '.certificate-verify-btn': '<i class="fas fa-certificate mr-2"></i>Xac thuc',
                '.certificate-info-btn': '<i class="fas fa-info-circle mr-2"></i>Thong tin',
                '.certificate-date': 'Ngay hoan thanh: {value}',
                '.about-goal-tag:nth-of-type(1)': 'AI Development',
                '.about-goal-tag:nth-of-type(2)': 'IT Support',
                '.about-goal-tag:nth-of-type(3)': 'Automation',
                '#projects [data-project-label="internal"]': 'Internal Tool',
                '#projects [data-project-label="website"]': 'Website Demo',
                '#projects [data-project-label="fanpage"]': 'Fanpage Demo',
                '#projects [data-project-label="video"]': 'Video Demo',
                '#projects [data-project-label="source"]': 'Ma nguon',
                'footer .lg\\:col-span-1:first-child > p': 'Sinh vien Data Science voi dam me AI va IT Support. Luon san sang hoc hoi va ap dung cong nghe de giai quyet cac van de thuc tien.',
                'footer .lg\\:col-span-1:nth-child(2) h4': 'Lien ket nhanh',
                'footer .lg\\:col-span-1:nth-child(3) h4': 'Chuyen mon',
                'footer .lg\\:col-span-1:nth-child(4) h4': 'Thong tin lien he',
                '#cvPopup .cv-popup-title': 'Dang chuan bi CV cua toi',
                '#cvPopup .cv-popup-subtitle': 'Kinh gui Anh/Chi tuyen dung,',
                '#cvPopup .cv-popup-note': 'He thong dang chuan bi va mo CV trong giay lat.',
                '#cvPopup .cv-popup-timer': 'Chuyen huong sau <span id="cvCountdown">15</span> giay'
            },
            en: {
                '.splash-footer-text': 'Portfolio 2025',
                '#contact .text-center p:not([data-i18n])': 'Reach out if you would like to collaborate or have any questions.',
                '#contact .mt-8 h3': 'Or connect with me through',
                '.certificate-verify-btn': '<i class="fas fa-certificate mr-2"></i>Verify',
                '.certificate-info-btn': '<i class="fas fa-info-circle mr-2"></i>Details',
                '.certificate-date': 'Completed: {value}',
                '.about-goal-tag:nth-of-type(1)': 'AI Development',
                '.about-goal-tag:nth-of-type(2)': 'IT Support',
                '.about-goal-tag:nth-of-type(3)': 'Automation',
                '#projects [data-project-label="internal"]': 'Internal Tool',
                '#projects [data-project-label="website"]': 'Website Demo',
                '#projects [data-project-label="fanpage"]': 'Fanpage Demo',
                '#projects [data-project-label="video"]': 'Video Demo',
                '#projects [data-project-label="source"]': 'Source Code',
                'footer .lg\\:col-span-1:first-child > p': 'Data Science student with a strong interest in AI and IT Support. Always eager to learn and apply technology to solve practical problems.',
                'footer .lg\\:col-span-1:nth-child(2) h4': 'Quick Links',
                'footer .lg\\:col-span-1:nth-child(3) h4': 'Core Expertise',
                'footer .lg\\:col-span-1:nth-child(4) h4': 'Contact Info',
                '#cvPopup .cv-popup-title': 'Preparing My CV',
                '#cvPopup .cv-popup-subtitle': 'Dear Hiring Team,',
                '#cvPopup .cv-popup-note': 'The system is preparing and opening my CV in a few seconds.',
                '#cvPopup .cv-popup-timer': 'Redirecting in <span id="cvCountdown">15</span> seconds'
            }
        };

        this.init();
    }

    init() {
        this.setupLanguageToggle();
        this.applyLanguage(this.currentLanguage);
    }

    setupLanguageToggle() {
        const languageToggle = document.getElementById('languageToggle');
        if (!languageToggle) return;

        languageToggle.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }

    toggleLanguage() {
        // Add switching animation
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.classList.add('switching');
            setTimeout(() => {
                languageToggle.classList.remove('switching');
            }, 600);
        }

        this.currentLanguage = this.currentLanguage === 'vi' ? 'en' : 'vi';
        this.applyLanguage(this.currentLanguage);
        localStorage.setItem('language', this.currentLanguage);

        // Update language toggle button
        this.updateLanguageToggleButton();
    }

    updateLanguageToggleButton() {
        const languageToggle = document.getElementById('languageToggle');
        if (!languageToggle) return;

        const flag = languageToggle.querySelector('.language-flag');
        const text = languageToggle.querySelector('.language-text');

        if (this.currentLanguage === 'vi') {
            flag.textContent = '🇻🇳';
            text.textContent = 'VI';
            languageToggle.setAttribute('title', 'Chuyển sang tiếng Anh');
        } else {
            flag.textContent = '🇬🇧';
            text.textContent = 'EN';
            languageToggle.setAttribute('title', 'Switch to Vietnamese');
        }
    }

    applyLanguage(language) {
        const translations = this.translations[language];

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = translations[key];

            if (translation) {
                // Check if element has data-i18n-target attribute
                const target = element.getAttribute('data-i18n-target');

                if (target === 'placeholder') {
                    element.setAttribute('placeholder', translation);
                } else if (target === 'title') {
                    element.setAttribute('title', translation);
                } else if (target === 'aria-label') {
                    element.setAttribute('aria-label', translation);
                } else if (target === 'html') {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update splash screen messages if visible
        if (typeof splashManager !== 'undefined' && splashManager) {
            splashManager.loadingMessages = [
                translations['splash.loading'],
                translations['splash.preparing'],
                translations['splash.info'],
                translations['splash.completing'],
                translations['splash.welcome']
            ];
        }

        // Update CV popup progress messages if they exist
        if (typeof progressMessages !== 'undefined') {
            window.progressMessages = [
                translations['cv.progress.checking'],
                translations['cv.progress.loading'],
                translations['cv.progress.preparing'],
                translations['cv.progress.completing'],
                translations['cv.progress.done']
            ];
        }

        // Update language toggle button
        this.updateLanguageToggleButton();

        // Trigger custom event for other components
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language }
        }));
    }

    translate(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
}

// Initialize language manager
let languageManager;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        languageManager = new LanguageManager();
    });
} else {
    languageManager = new LanguageManager();
}

// Export for use in other scripts
window.languageManager = languageManager;
window.__ = function (key) {
    return languageManager ? languageManager.translate(key) : key;
};

