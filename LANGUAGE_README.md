# 🌐 Chức Năng Đa Ngôn Ngữ - Language Feature

## ✅ Đã Hoàn Thành

Trang web của bạn đã được tích hợp chức năng chuyển đổi ngôn ngữ **Tiếng Việt ⇄ Tiếng Anh**!

### 📦 Files Đã Thêm/Chỉnh Sửa:

1. **`js/language.js`** - Hệ thống quản lý ngôn ngữ
2. **`css/style.css`** - CSS cho nút chuyển đổi ngôn ngữ  
3. **`index.html`** - Thêm nút chuyển đổi và data-i18n attributes
4. **`js/script.js`** - Cập nhật thông báo sử dụng translation keys
5. **`LANGUAGE_GUIDE.md`** - Hướng dẫn chi tiết

## 🎯 Cách Sử Dụng

### Người Dùng (User):
1. Nhấn vào nút cờ 🇻🇳/🇬🇧 ở góc phải header
2. Trang web sẽ tự động chuyển đổi ngôn ngữ
3. Lựa chọn được lưu tự động trong trình duyệt

### Developer:
Để thêm dịch cho phần tử mới:

```html
<!-- Text content -->
<span data-i18n="key.name">Nội dung tiếng Việt</span>

<!-- Placeholder -->
<input 
    type="text"
    data-i18n="key.placeholder"
    data-i18n-target="placeholder"
    placeholder="Placeholder tiếng Việt"
>
```

## 🔧 Phần Đã Tích Hợp

✅ Navigation Menu (Desktop & Mobile)  
✅ Hero Section (Tiêu đề, lời chào)  
✅ Contact Form (Labels, placeholders, button)  
✅ Contact Title  
✅ Form Notifications (Thông báo lỗi, thành công)

## 📝 Phần Cần Bổ Sung (Tùy Chọn)

Để tích hợp đầy đủ, bạn có thể thêm `data-i18n` vào các phần sau:

⬜ **About Section** - Giới thiệu về bản thân  
⬜ **Skills Section** - Danh sách kỹ năng  
⬜ **Certificates Section** - Chứng chỉ  
⬜ **Projects Section** - Các dự án  
⬜ **Footer** - Thông tin footer  
⬜ **Splash Screen** - Màn hình loading  
⬜ **CV Popup** - Popup tải CV

Xem file `LANGUAGE_GUIDE.md` để biết hướng dẫn chi tiết!

## 🌟 Tính Năng

- ✅ Chuyển đổi mượt mà giữa 2 ngôn ngữ
- ✅ Lưu lựa chọn tự động (localStorage)
- ✅ Responsive cho mobile & desktop
- ✅ Tương thích dark mode
- ✅ Animation đẹp mắt
- ✅ Không cần reload trang

## 🎨 Giao Diện Nút Chuyển Đổi

```
┌─────────────┐
│  🇻🇳  VI    │  <- Tiếng Việt
└─────────────┘

Click ↓

┌─────────────┐
│  🇬🇧  EN    │  <- Tiếng Anh
└─────────────┘
```

## 📚 Cấu Trúc Translation Keys

```javascript
{
    'nav.*': 'Navigation menu',
    'hero.*': 'Hero section',
    'about.*': 'About section',
    'skills.*': 'Skills section',
    'certificates.*': 'Certificates section',
    'projects.*': 'Projects section',
    'contact.*': 'Contact section',
    'notification.*': 'System notifications'
}
```

## 🔍 Debug

Nếu có lỗi, kiểm tra:

1. **Console Browser** - Xem log errors
2. **localStorage** - Key: `language` (giá trị: `vi` hoặc `en`)
3. **data-i18n attributes** - Đảm bảo key tồn tại trong `js/language.js`

## 💡 Tips

### Thêm Translation Key Mới:

1. Mở `js/language.js`
2. Thêm vào cả 2 object `vi` và `en`:

```javascript
vi: {
    'new.key': 'Nội dung tiếng Việt',
    // ... existing keys
},
en: {
    'new.key': 'English content',
    // ... existing keys
}
```

3. Sử dụng trong HTML:
```html
<span data-i18n="new.key">Nội dung tiếng Việt</span>
```

### Dịch Nội Dung Có HTML:

```html
<p data-i18n="about.intro" data-i18n-target="html">
    Xin chào! Tôi là <strong>Khánh</strong>
</p>
```

Trong language.js:
```javascript
'about.intro': 'Hello! I am <strong>Khanh</strong>'
```

## 🚀 Quick Start

1. Mở `index.html` trong trình duyệt
2. Nhấn vào nút 🇻🇳 ở header
3. Xem các phần đã dịch chuyển đổi
4. Thử với Contact Form để test notifications

## 📞 Hỗ Trợ

Nếu cần thêm ngôn ngữ hoặc gặp vấn đề:
- Xem `LANGUAGE_GUIDE.md` cho hướng dẫn chi tiết
- Kiểm tra file `js/language.js` cho tất cả translation keys
- Test với Developer Tools (F12) để debug

---

**Chúc mừng! Trang web của bạn đã có chức năng đa ngôn ngữ! 🎉**

Made with ❤️ for Khánh Trà Portfolio

