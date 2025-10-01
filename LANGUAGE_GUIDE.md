# Hướng Dẫn Sử Dụng Chức Năng Đa Ngôn Ngữ

## Cách Thêm Dịch Cho Các Phần Tử HTML

Để thêm khả năng dịch cho bất kỳ phần tử HTML nào, bạn cần thêm attribute `data-i18n` với key tương ứng.

### Cú pháp cơ bản:

```html
<span data-i18n="key.name">Text tiếng Việt</span>
```

### Các loại dịch:

#### 1. Dịch Text (mặc định)
```html
<h1 data-i18n="hero.title">Tiêu đề</h1>
<p data-i18n="about.description">Mô tả</p>
```

#### 2. Dịch Placeholder
```html
<input 
    type="text" 
    data-i18n="contact.form.name" 
    data-i18n-target="placeholder"
    placeholder="Nhập tên của bạn"
>
```

#### 3. Dịch Title (tooltip)
```html
<button 
    data-i18n="button.submit" 
    data-i18n-target="title"
    title="Gửi biểu mẫu"
>
    Submit
</button>
```

#### 4. Dịch HTML (cho nội dung có HTML tags)
```html
<p data-i18n="about.intro" data-i18n-target="html">
    Xin chào! Tôi là <strong>Khánh</strong>
</p>
```

## Keys Đã Định Nghĩa

### Navigation (nav.*)
- `nav.about` - Giới thiệu / About
- `nav.skills` - Kỹ năng / Skills
- `nav.certificates` - Chứng chỉ / Certificates
- `nav.projects` - Dự án / Projects
- `nav.contact` - Liên hệ / Contact

### Hero Section (hero.*)
- `hero.student` - Sinh viên chuyên ngành...
- `hero.greeting` - Xin chào, tôi là
- `hero.name` - Trà Nguyễn Gia Khánh
- `hero.title1` - Data Science
- `hero.title2` - AI Enthusiast
- `hero.description` - Chào mừng đến với portfolio...
- `hero.downloadCV` - Tải CV
- `hero.viewWork` - Xem dự án
- `hero.scrollDown` - Cuộn xuống

### About Section (about.*)
- `about.title` - Giới thiệu
- `about.subtitle` - Tìm hiểu về tôi
- `about.heading` - Về tôi
- `about.intro` - Xin chào! Tôi là...
- `about.experience` - Hành trình học tập của tôi
- `about.expDesc` - Trong suốt quá trình học tập...
- `about.passion` - Đam mê của tôi
- `about.passionDesc` - Tôi say mê với việc khám phá...
- `about.stats.projects` - Dự án
- `about.stats.certificates` - Chứng chỉ
- `about.stats.experience` - Năm kinh nghiệm
- `about.contactInfo` - Thông tin liên hệ
- `about.location` - Địa điểm
- `about.locationValue` - TP.HCM, Việt Nam
- `about.education` - Học vấn
- `about.educationValue` - Đại học Huflit - Data Science
- `about.email` - Email

### Skills Section (skills.*)
- `skills.title` - Kỹ năng
- `skills.subtitle` - Những kỹ năng tôi có
- `skills.programming` - Lập trình
- `skills.dataScience` - Data Science & AI
- `skills.tools` - Công cụ & Công nghệ
- `skills.soft` - Kỹ năng mềm

### Certificates Section (certificates.*)
- `certificates.title` - Chứng chỉ
- `certificates.subtitle` - Thành tích & Chứng nhận
- `certificates.view` - Xem chi tiết

### Projects Section (projects.*)
- `projects.title` - Dự án
- `projects.subtitle` - Những dự án tôi đã thực hiện
- `projects.viewMore` - Xem thêm
- `projects.viewCode` - Xem mã nguồn
- `projects.technologies` - Công nghệ
- `projects.prev` - Trước
- `projects.next` - Tiếp

### Contact Section (contact.*)
- `contact.title` - Liên hệ
- `contact.subtitle` - Hãy kết nối với tôi
- `contact.heading` - Liên hệ với tôi
- `contact.description` - Tôi luôn sẵn sàng kết nối...
- `contact.form.title` - Gửi tin nhắn
- `contact.form.name` - Họ và tên
- `contact.form.namePlaceholder` - Nhập họ và tên của bạn
- `contact.form.email` - Email
- `contact.form.emailPlaceholder` - Nhập địa chỉ email
- `contact.form.message` - Tin nhắn
- `contact.form.messagePlaceholder` - Nhập tin nhắn của bạn...
- `contact.form.send` - Gửi tin nhắn
- `contact.form.sending` - Đang gửi...

## Ví Dụ Thực Tế

### Hero Section
```html
<section class="hero-section">
    <div class="container">
        <p data-i18n="hero.student">
            Sinh viên chuyên ngành Data Science - Trường Đại học Huflit
        </p>
        <h1>
            <span data-i18n="hero.greeting">Xin chào, tôi là</span>
            <span data-i18n="hero.name">Trà Nguyễn Gia Khánh</span>
        </h1>
        <p data-i18n="hero.description">
            Chào mừng đến với portfolio của tôi...
        </p>
        <button data-i18n="hero.downloadCV">Tải CV</button>
        <button data-i18n="hero.viewWork">Xem dự án</button>
    </div>
</section>
```

### Contact Form
```html
<form id="contactForm">
    <h3 data-i18n="contact.form.title">Gửi tin nhắn</h3>
    
    <label data-i18n="contact.form.name">Họ và tên</label>
    <input 
        type="text" 
        id="name"
        data-i18n="contact.form.namePlaceholder" 
        data-i18n-target="placeholder"
        placeholder="Nhập họ và tên của bạn"
    >
    
    <label data-i18n="contact.form.email">Email</label>
    <input 
        type="email" 
        id="email"
        data-i18n="contact.form.emailPlaceholder" 
        data-i18n-target="placeholder"
        placeholder="Nhập địa chỉ email"
    >
    
    <label data-i18n="contact.form.message">Tin nhắn</label>
    <textarea 
        id="message"
        data-i18n="contact.form.messagePlaceholder" 
        data-i18n-target="placeholder"
        placeholder="Nhập tin nhắn của bạn..."
    ></textarea>
    
    <button type="submit" data-i18n="contact.form.send">
        Gửi tin nhắn
    </button>
</form>
```

### Skills Section
```html
<section id="skills">
    <h2 data-i18n="skills.title">Kỹ năng</h2>
    <p data-i18n="skills.subtitle">Những kỹ năng tôi có</p>
    
    <div class="skill-category">
        <h3 data-i18n="skills.programming">Lập trình</h3>
        <!-- Skill items here -->
    </div>
    
    <div class="skill-category">
        <h3 data-i18n="skills.dataScience">Data Science & AI</h3>
        <!-- Skill items here -->
    </div>
</section>
```

## Cách Thêm Bản Dịch Mới

Nếu bạn muốn thêm text mới cần dịch, hãy:

1. Mở file `js/language.js`
2. Thêm key mới vào cả 2 object `vi` và `en` trong `translations`

Ví dụ:
```javascript
vi: {
    'section.newkey': 'Nội dung tiếng Việt',
    // ... các key khác
},
en: {
    'section.newkey': 'English content',
    // ... other keys
}
```

3. Thêm `data-i18n` vào HTML:
```html
<p data-i18n="section.newkey">Nội dung tiếng Việt</p>
```

## Các Keys Cần Thêm Vào HTML

Bạn cần thêm `data-i18n` vào các phần sau trong file `index.html`:

### ✅ Đã Thêm:
- ✅ Navigation menu (desktop & mobile)

### ⏳ Cần Thêm:
- ⬜ Hero Section (dòng ~240-280)
- ⬜ About Section (dòng ~300-450)
- ⬜ Skills Section (dòng ~500-800)
- ⬜ Certificates Section (dòng ~900-1100)
- ⬜ Projects Section (dòng ~1100-1400)
- ⬜ Contact Section (dòng ~1400-1650)
- ⬜ Splash Screen messages (dòng ~90-100)
- ⬜ CV Popup (dòng ~1670-1700)

## Cách Sử Dụng

1. **Chuyển đổi ngôn ngữ**: Nhấn vào nút cờ (🇻🇳/🇬🇧) ở góc phải header
2. **Lưu lựa chọn**: Ngôn ngữ được tự động lưu trong localStorage
3. **Tự động áp dụng**: Trang web sẽ nhớ ngôn ngữ bạn đã chọn khi quay lại

## Lưu Ý

- Tất cả các keys phải có trong cả 2 ngôn ngữ (vi và en)
- Nếu một key không tồn tại, text gốc sẽ được hiển thị
- Sử dụng `data-i18n-target` để chỉ định loại dịch (text, placeholder, title, html)
- Splash screen messages sẽ tự động cập nhật khi thay đổi ngôn ngữ

## Hỗ Trợ

Nếu bạn cần thêm ngôn ngữ khác hoặc gặp vấn đề, hãy kiểm tra:
1. File `js/language.js` - Chứa tất cả bản dịch
2. Console của trình duyệt - Xem lỗi nếu có
3. localStorage - Key: `language` (giá trị: `vi` hoặc `en`)

---

**Chúc bạn sử dụng thành công! 🎉**

