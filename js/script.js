// Splash Screen Management - Initialize Immediately
// ================================================

class SplashScreenManager {
    constructor() {
        this.splashScreen = document.getElementById('splashScreen');
        this.loadingText = document.getElementById('splashLoadingText');
        this.isPageLoaded = false;
        this.isResourcesLoaded = false;
        this.minimumDisplayTime = 3000; // Minimum 3 seconds display
        this.startTime = Date.now();
        
        this.loadingMessages = [
            "Đang tải portfolio...",
            "Đang chuẩn bị nội dung...",
            "Đang tải thông tin...",
            "Đang hoàn thành...",
            "Chào mừng bạn!"
        ];
        
        this.currentMessageIndex = 0;
        this.messageInterval = null;
        
        this.init();
    }
    
    init() {
        // Prevent page scroll while splash screen is active
        document.body.style.overflow = 'hidden';
        
        // Start loading message rotation
        this.startLoadingMessages();
        
        // Listen for page load events
        this.setupEventListeners();
        
        // Check if page is already loaded (for browsers that cache)
        if (document.readyState === 'complete') {
            this.handlePageLoad();
        }
    }
    
    setupEventListeners() {
        // Page loaded event
        window.addEventListener('load', () => {
            this.handlePageLoad();
        });
        
        // DOM loaded event
        document.addEventListener('DOMContentLoaded', () => {
            this.handleDOMLoad();
        });
        
        // Resource loading
        this.preloadCriticalResources();
    }
    
    handleDOMLoad() {
        console.log('DOM loaded');
        // Start checking for images and other resources
        this.checkResourcesLoaded();
    }
    
    handlePageLoad() {
        console.log('Page fully loaded');
        this.isPageLoaded = true;
        this.checkReadyToHide();
    }
    
    preloadCriticalResources() {
        // Preload critical images
        const criticalImages = [
            '/img/profile.png',
            '/img/doantotnghiepj2_3.png',
            '/img/fingercount.png'
        ];
        
        let loadedCount = 0;
        const totalImages = criticalImages.length;
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                this.updateLoadingProgress(loadedCount, totalImages);
                
                if (loadedCount === totalImages) {
                    this.isResourcesLoaded = true;
                    this.checkReadyToHide();
                }
            };
            img.onerror = () => {
                loadedCount++;
                this.updateLoadingProgress(loadedCount, totalImages);
                
                if (loadedCount === totalImages) {
                    this.isResourcesLoaded = true;
                    this.checkReadyToHide();
                }
            };
            img.src = src;
        });
        
        // Fallback: assume resources loaded after 2 seconds
        setTimeout(() => {
            if (!this.isResourcesLoaded) {
                this.isResourcesLoaded = true;
                this.checkReadyToHide();
            }
        }, 2000);
    }
    
    updateLoadingProgress(loaded, total) {
        const progress = (loaded / total) * 100;
        console.log(`Loading progress: ${progress}%`);
        
        // Update message based on progress
        if (progress >= 75 && this.currentMessageIndex < 3) {
            this.currentMessageIndex = 3;
            this.updateLoadingMessage();
        } else if (progress >= 50 && this.currentMessageIndex < 2) {
            this.currentMessageIndex = 2;
            this.updateLoadingMessage();
        }
    }
    
    startLoadingMessages() {
        // Update message every 800ms
        this.messageInterval = setInterval(() => {
            this.currentMessageIndex = (this.currentMessageIndex + 1) % (this.loadingMessages.length - 1);
            this.updateLoadingMessage();
        }, 800);
    }
    
    updateLoadingMessage() {
        if (this.loadingText && this.currentMessageIndex < this.loadingMessages.length) {
            this.loadingText.textContent = this.loadingMessages[this.currentMessageIndex];
        }
    }
    
    checkResourcesLoaded() {
        // Check if all images are loaded
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        this.isResourcesLoaded = true;
                        this.checkReadyToHide();
                    }
                });
                
                img.addEventListener('error', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        this.isResourcesLoaded = true;
                        this.checkReadyToHide();
                    }
                });
            }
        });
        
        if (loadedImages === images.length) {
            this.isResourcesLoaded = true;
            this.checkReadyToHide();
        }
    }
    
    checkReadyToHide() {
        const elapsedTime = Date.now() - this.startTime;
        const minTimeElapsed = elapsedTime >= this.minimumDisplayTime;
        
        console.log('Check ready to hide:', {
            pageLoaded: this.isPageLoaded,
            resourcesLoaded: this.isResourcesLoaded,
            minTimeElapsed,
            elapsedTime
        });
        
        if (this.isPageLoaded && this.isResourcesLoaded && minTimeElapsed) {
            this.hideSplashScreen();
        } else if (this.isPageLoaded && this.isResourcesLoaded) {
            // Wait for minimum time
            const remainingTime = this.minimumDisplayTime - elapsedTime;
            setTimeout(() => {
                this.hideSplashScreen();
            }, remainingTime);
        }
    }
    
    hideSplashScreen() {
        // Clear message interval
        if (this.messageInterval) {
            clearInterval(this.messageInterval);
        }
        
        // Show final message
        this.currentMessageIndex = this.loadingMessages.length - 1;
        this.updateLoadingMessage();
        
        // Hide splash screen after a short delay
        setTimeout(() => {
            this.splashScreen.classList.add('hidden');
            
            // Restore page scroll
            setTimeout(() => {
                document.body.style.overflow = '';
                
                // Trigger any page load animations
                this.triggerPageAnimations();
                
                // Remove splash screen from DOM after transition
                setTimeout(() => {
                    if (this.splashScreen && this.splashScreen.parentNode) {
                        this.splashScreen.parentNode.removeChild(this.splashScreen);
                    }
                }, 800);
            }, 300);
        }, 500);
    }
    
    triggerPageAnimations() {
        // Trigger fade-in animations for main content
        const animatedElements = document.querySelectorAll('.animate-fade-in');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Initialize other animations
        if (typeof updateActiveNav === 'function') {
            updateActiveNav();
        }
    }
    
    // Manual trigger for debugging
    forceHide() {
        this.isPageLoaded = true;
        this.isResourcesLoaded = true;
        this.hideSplashScreen();
    }
}

// Initialize splash screen manager immediately
let splashManager;

// Initialize as soon as script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        splashManager = new SplashScreenManager();
    });
} else {
    // DOM already loaded
    splashManager = new SplashScreenManager();
}

// Debug helper - remove in production
// window.hideSplash = () => splashManager?.forceHide();

// Enhanced Mobile menu toggle with animation
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const hamburger = document.querySelector('.hamburger');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    hamburger.classList.toggle('active');
    
    if (!mobileMenu.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Close mobile menu when clicking overlay
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Enhanced theme toggle with smooth transition
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Set light mode as default
body.classList.remove('dark-mode');
localStorage.setItem('theme', 'light');

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
} else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
}

themeToggle.addEventListener('click', () => {
    body.classList.add('theme-transition');
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    
    // Remove transition class after animation completes
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 300);
});

// Active navigation state
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNav);

// Enhanced smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Form submission with validation and animation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Vui lòng điền đầy đủ tất cả các trường', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Vui lòng nhập địa chỉ email hợp lệ', 'error');
        return;
    }
    
    // Get submit button for loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang gửi...';
    
    try {
        // Create FormData to send to Formspree
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        
        console.log('Sending form to:', this.action);
        console.log('Form data:', { name, email, message });
        
        // Send to Formspree
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (response.ok) {
            showNotification('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi trong thời gian sớm nhất.', 'success');
            
            // Reset form with animation
            const formElements = contactForm.elements;
            for (let element of formElements) {
                if (element.type !== 'submit') {
                    element.style.transition = 'all 0.3s ease';
                    element.style.opacity = '0';
                    setTimeout(() => {
                        element.value = '';
                        element.style.opacity = '1';
                    }, 300);
                }
            }
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Không thể gửi tin nhắn');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Fallback: try submitting the form normally if fetch fails
        try {
            // Create a temporary form to submit normally
            const tempForm = document.createElement('form');
            tempForm.action = contactForm.action;
            tempForm.method = 'POST';
            tempForm.style.display = 'none';
            
            // Add form data as hidden inputs
            const nameInput = document.createElement('input');
            nameInput.type = 'hidden';
            nameInput.name = 'name';
            nameInput.value = name;
            tempForm.appendChild(nameInput);
            
            const emailInput = document.createElement('input');
            emailInput.type = 'hidden';
            emailInput.name = 'email';
            emailInput.value = email;
            tempForm.appendChild(emailInput);
            
            const messageInput = document.createElement('input');
            messageInput.type = 'hidden';
            messageInput.name = 'message';
            messageInput.value = message;
            tempForm.appendChild(messageInput);
            
            document.body.appendChild(tempForm);
            tempForm.submit();
            
            showNotification('Đang chuyển hướng để gửi tin nhắn...', 'success');
            
        } catch (fallbackError) {
            console.error('Fallback submission error:', fallbackError);
            showNotification('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email: khanhtra229@gmail.com', 'error');
        }
    } finally {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
    }
});

// Animate skill bars on scroll with intersection observer
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.getElementById('skills');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);
}

// Helper functions
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showNotification(message, type = 'success') {
    // Remove any existing notifications first
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notif => notif.remove());
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 640;
    
    const notification = document.createElement('div');
    notification.className = `notification-toast fixed ${isMobile ? 'top-20 left-2 right-2' : 'top-4 right-4'} p-4 rounded-lg shadow-xl transform transition-all duration-500 ${isMobile ? 'translate-y-full' : 'translate-x-full'} ${
        type === 'success' 
            ? 'bg-green-500 border-l-4 border-green-600' 
            : 'bg-red-500 border-l-4 border-red-600'
    } text-white z-[10000] ${isMobile ? 'max-w-none' : 'max-w-sm'}`;
    
    // Create notification content with icon
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
    notification.innerHTML = `
        <div class="flex items-start space-x-3">
            <i class="${icon} mt-0.5 flex-shrink-0"></i>
            <div class="flex-1">
                <p class="text-sm font-medium leading-relaxed">${message}</p>
            </div>
            <button class="notification-close ml-2 text-white/80 hover:text-white transition-colors" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times text-sm"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in with proper direction based on device
    setTimeout(() => {
        if (isMobile) {
            notification.style.transform = 'translateY(0)';
        } else {
            notification.style.transform = 'translateX(0)';
        }
        notification.style.opacity = '1';
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            if (isMobile) {
                notification.style.transform = 'translateY(-100%)';
            } else {
                notification.style.transform = 'translateX(100%)';
            }
            notification.style.opacity = '0';
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 500);
        }
    }, 5000);
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('hover-lift');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('hover-lift');
    });
});

// Project Slideshow
const projectSlides = document.querySelector('.project-slides');
const prevButton = document.getElementById('prevProject');
const nextButton = document.getElementById('nextProject');
const indicators = document.querySelectorAll('#projectIndicators button');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.project-slide').length;
let isAnimating = false;

function updateSlide() {
    if (isAnimating) return;
    isAnimating = true;

    // Remove active class from all slides
    document.querySelectorAll('.project-slide').forEach(slide => {
        slide.classList.remove('active');
    });

    // Add active class to current slide
    document.querySelectorAll('.project-slide')[currentSlide].classList.add('active');

    // Update transform with smooth transition
    projectSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update indicators with animation
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
            indicator.classList.remove('bg-gray-300');
            indicator.classList.add('bg-blue-500');
        } else {
            indicator.classList.remove('active');
            indicator.classList.remove('bg-blue-500');
            indicator.classList.add('bg-gray-300');
        }
    });

    // Reset animation flag after transition
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

function nextSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
}

function prevSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
}

// Event listeners for navigation with hover effects
prevButton.addEventListener('mouseenter', () => {
    prevButton.style.transform = 'translateY(-50%) scale(1.1)';
});

prevButton.addEventListener('mouseleave', () => {
    prevButton.style.transform = 'translateY(-50%) scale(1)';
});

nextButton.addEventListener('mouseenter', () => {
    nextButton.style.transform = 'translateY(-50%) scale(1.1)';
});

nextButton.addEventListener('mouseleave', () => {
    nextButton.style.transform = 'translateY(-50%) scale(1)';
});

// Event listeners for navigation
prevButton.addEventListener('click', () => {
    if (!isAnimating) {
        prevButton.style.transform = 'translateY(-50%) scale(0.95)';
        setTimeout(() => {
            prevButton.style.transform = 'translateY(-50%) scale(1)';
        }, 100);
        prevSlide();
    }
});

nextButton.addEventListener('click', () => {
    if (!isAnimating) {
        nextButton.style.transform = 'translateY(-50%) scale(0.95)';
        setTimeout(() => {
            nextButton.style.transform = 'translateY(-50%) scale(1)';
        }, 100);
        nextSlide();
    }
});

// Event listeners for indicators with hover effects
indicators.forEach((indicator, index) => {
    indicator.addEventListener('mouseenter', () => {
        if (index !== currentSlide) {
            indicator.style.transform = 'scale(1.2)';
        }
    });

    indicator.addEventListener('mouseleave', () => {
        if (index !== currentSlide) {
            indicator.style.transform = 'scale(1)';
        }
    });

    indicator.addEventListener('click', () => {
        if (!isAnimating && index !== currentSlide) {
            currentSlide = index;
            updateSlide();
        }
    });
});

// Auto-advance slides with pause on hover
let slideInterval = setInterval(nextSlide, 5000);
let isHovering = false;

projectSlides.addEventListener('mouseenter', () => {
    isHovering = true;
    clearInterval(slideInterval);
});

projectSlides.addEventListener('mouseleave', () => {
    isHovering = false;
    slideInterval = setInterval(nextSlide, 5000);
});

// Touch events for mobile swipe with improved detection
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

projectSlides.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(slideInterval);
});

projectSlides.addEventListener('touchmove', (e) => {
    touchEndX = e.changedTouches[0].screenX;
});

projectSlides.addEventListener('touchend', () => {
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
    
    if (!isHovering) {
        slideInterval = setInterval(nextSlide, 5000);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Initialize first slide with animation
document.querySelectorAll('.project-slide')[0].classList.add('active');
updateSlide();

// Certificate Slideshow
const certificateSlides = document.querySelector('.certificate-slides');
const prevCertificateButton = document.getElementById('prevCertificate');
const nextCertificateButton = document.getElementById('nextCertificate');
const certificateIndicators = document.querySelectorAll('#certificateIndicators button');
let currentCertificateSlide = 0;
const totalCertificateSlides = document.querySelectorAll('.certificate-slide').length;
let isCertificateAnimating = false;

function updateCertificateSlide() {
    if (isCertificateAnimating) return;
    isCertificateAnimating = true;

    // Remove active class from all certificate slides
    document.querySelectorAll('.certificate-slide').forEach(slide => {
        slide.classList.remove('active');
    });

    // Add active class to current certificate slide
    document.querySelectorAll('.certificate-slide')[currentCertificateSlide].classList.add('active');

    // Update transform with smooth transition
    certificateSlides.style.transform = `translateX(-${currentCertificateSlide * 100}%)`;
    
    // Update certificate indicators with animation
    certificateIndicators.forEach((indicator, index) => {
        if (index === currentCertificateSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });

    // Reset animation flag after transition
    setTimeout(() => {
        isCertificateAnimating = false;
    }, 500);
}

function nextCertificateSlide() {
    if (isCertificateAnimating) return;
    currentCertificateSlide = (currentCertificateSlide + 1) % totalCertificateSlides;
    updateCertificateSlide();
}

function prevCertificateSlide() {
    if (isCertificateAnimating) return;
    currentCertificateSlide = (currentCertificateSlide - 1 + totalCertificateSlides) % totalCertificateSlides;
    updateCertificateSlide();
}

// Event listeners for certificate navigation with hover effects
if (prevCertificateButton) {
    prevCertificateButton.addEventListener('mouseenter', () => {
        prevCertificateButton.style.transform = 'translateY(-50%) scale(1.1)';
    });

    prevCertificateButton.addEventListener('mouseleave', () => {
        prevCertificateButton.style.transform = 'translateY(-50%) scale(1)';
    });

    prevCertificateButton.addEventListener('click', () => {
        if (!isCertificateAnimating) {
            prevCertificateButton.style.transform = 'translateY(-50%) scale(0.95)';
            setTimeout(() => {
                prevCertificateButton.style.transform = 'translateY(-50%) scale(1)';
            }, 100);
            prevCertificateSlide();
        }
    });
}

if (nextCertificateButton) {
    nextCertificateButton.addEventListener('mouseenter', () => {
        nextCertificateButton.style.transform = 'translateY(-50%) scale(1.1)';
    });

    nextCertificateButton.addEventListener('mouseleave', () => {
        nextCertificateButton.style.transform = 'translateY(-50%) scale(1)';
    });

    nextCertificateButton.addEventListener('click', () => {
        if (!isCertificateAnimating) {
            nextCertificateButton.style.transform = 'translateY(-50%) scale(0.95)';
            setTimeout(() => {
                nextCertificateButton.style.transform = 'translateY(-50%) scale(1)';
            }, 100);
            nextCertificateSlide();
        }
    });
}

// Event listeners for certificate indicators with hover effects
certificateIndicators.forEach((indicator, index) => {
    indicator.addEventListener('mouseenter', () => {
        if (index !== currentCertificateSlide) {
            indicator.style.transform = 'scale(1.2)';
        }
    });

    indicator.addEventListener('mouseleave', () => {
        if (index !== currentCertificateSlide) {
            indicator.style.transform = 'scale(1)';
        }
    });

    indicator.addEventListener('click', () => {
        if (!isCertificateAnimating && index !== currentCertificateSlide) {
            currentCertificateSlide = index;
            updateCertificateSlide();
        }
    });
});

// Auto-advance certificate slides with pause on hover
let certificateSlideInterval = setInterval(nextCertificateSlide, 6000);
let isCertificateHovering = false;

if (certificateSlides) {
    certificateSlides.addEventListener('mouseenter', () => {
        isCertificateHovering = true;
        clearInterval(certificateSlideInterval);
    });

    certificateSlides.addEventListener('mouseleave', () => {
        isCertificateHovering = false;
        certificateSlideInterval = setInterval(nextCertificateSlide, 6000);
    });

    // Touch events for certificate mobile swipe
    let certificateTouchStartX = 0;
    let certificateTouchEndX = 0;

    certificateSlides.addEventListener('touchstart', (e) => {
        certificateTouchStartX = e.changedTouches[0].screenX;
        clearInterval(certificateSlideInterval);
    });

    certificateSlides.addEventListener('touchmove', (e) => {
        certificateTouchEndX = e.changedTouches[0].screenX;
    });

    certificateSlides.addEventListener('touchend', () => {
        const swipeDistance = certificateTouchEndX - certificateTouchStartX;
        
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                prevCertificateSlide();
            } else {
                nextCertificateSlide();
            }
        }
        
        if (!isCertificateHovering) {
            certificateSlideInterval = setInterval(nextCertificateSlide, 6000);
        }
    });

    // Initialize first certificate slide
    document.querySelectorAll('.certificate-slide')[0].classList.add('active');
    updateCertificateSlide();
}

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // Handle certificate slideshow when focused
    const certificateSection = document.getElementById('certificates');
    const isInViewport = certificateSection.getBoundingClientRect().top < window.innerHeight && 
                        certificateSection.getBoundingClientRect().bottom > 0;
    
    if (isInViewport) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevCertificateSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextCertificateSlide();
        }
    }
    
    // Original project slideshow keyboard navigation
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// CV Download Popup Functionality
const cvPopup = document.getElementById('cvPopup');
const cvPopupClose = document.getElementById('cvPopupClose');
const cvOpenNow = document.getElementById('cvOpenNow');
const cvDownloadButton = document.querySelector('a[href*="drive.google.com"]');
let cvCountdownInterval;
let isPopupActive = false;
let currentCVUrl = '';
let linkAlreadyOpened = false;

// Progress messages
const progressMessages = [
    "Đang kiểm tra file...",
    "Đang tải dữ liệu...",
    "Đang chuẩn bị CV...",
    "Gần hoàn thành...",
    "Hoàn tất!"
];

function showCVPopup(originalHref) {
    if (isPopupActive) return;
    
    isPopupActive = true;
    currentCVUrl = originalHref;
    linkAlreadyOpened = false;
    cvPopup.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Add active class with slight delay for animation
    setTimeout(() => {
        cvPopup.classList.add('active');
    }, 10);
    
    // Reset progress
    const progressFill = document.querySelector('.cv-progress-fill');
    const progressPercent = document.getElementById('cvProgressPercent');
    const progressStatus = document.getElementById('cvProgressStatus');
    const countdown = document.getElementById('cvCountdown');
    
    progressFill.style.width = '0%';
    progressPercent.textContent = '0%';
    progressStatus.textContent = progressMessages[0];
    
    // Animate progress
    let progress = 0;
    let messageIndex = 0;
    let countdownTime = 15;
    countdown.textContent = countdownTime;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 25 + 10; // Random progress increase
        
        if (progress > 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        
        progressFill.style.width = progress + '%';
        progressPercent.textContent = Math.round(progress) + '%';
        
        // Update message based on progress
        const newMessageIndex = Math.min(Math.floor((progress / 100) * (progressMessages.length - 1)), progressMessages.length - 1);
        if (newMessageIndex > messageIndex) {
            messageIndex = newMessageIndex;
            progressStatus.textContent = progressMessages[messageIndex];
        }
    }, 200);
    
    // Countdown timer
    cvCountdownInterval = setInterval(() => {
        countdownTime--;
        countdown.textContent = countdownTime;
        
        if (countdownTime <= 0) {
            clearInterval(cvCountdownInterval);
            // Only open link if it hasn't been opened already
            if (!linkAlreadyOpened) {
                linkAlreadyOpened = true;
                closeCVPopup();
                openLinkSafely(currentCVUrl);
            }
        }
    }, 1000);
}

// Function to safely open link without popup blocker issues
function openLinkSafely(url) {
    try {
        // Method 1: Create temporary link and trigger click (most reliable)
        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.target = '_blank';
        tempLink.rel = 'noopener noreferrer';
        tempLink.style.display = 'none';
        
        // Add to DOM temporarily
        document.body.appendChild(tempLink);
        
        // Trigger click event
        tempLink.click();
        
        // Clean up - remove from DOM
        setTimeout(() => {
            if (document.body.contains(tempLink)) {
                document.body.removeChild(tempLink);
            }
        }, 100);
        
    } catch (error) {
        console.log('Link opening failed, using fallback');
        // Fallback - open in same window
        window.location.href = url;
    }
}

function closeCVPopup() {
    if (!isPopupActive) return;
    
    cvPopup.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        cvPopup.classList.add('hidden');
        isPopupActive = false;
        currentCVUrl = '';
        linkAlreadyOpened = false;
    }, 300);
    
    if (cvCountdownInterval) {
        clearInterval(cvCountdownInterval);
    }
}

// Event listeners for CV popup
if (cvDownloadButton) {
    cvDownloadButton.addEventListener('click', function(e) {
        e.preventDefault();
        const originalHref = this.getAttribute('href');
        showCVPopup(originalHref);
    });
}

if (cvPopupClose) {
    cvPopupClose.addEventListener('click', closeCVPopup);
}

// Event listener for "Open Now" button
if (cvOpenNow) {
    cvOpenNow.addEventListener('click', function() {
        if (currentCVUrl && !linkAlreadyOpened) {
            linkAlreadyOpened = true;
            // Clear the countdown interval to prevent auto-open
            if (cvCountdownInterval) {
                clearInterval(cvCountdownInterval);
            }
            closeCVPopup();
            setTimeout(() => {
                openLinkSafely(currentCVUrl);
            }, 100);
        }
    });
}

// Close popup when clicking overlay
cvPopup.addEventListener('click', function(e) {
    if (e.target === cvPopup) {
        closeCVPopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isPopupActive) {
        closeCVPopup();
    }
});

// Prevent popup from showing multiple times rapidly
let popupCooldown = false;

function setCooldown() {
    popupCooldown = true;
    setTimeout(() => {
        popupCooldown = false;
    }, 2000);
}

// Enhanced Responsive JavaScript Functionality
// ==========================================

// Viewport and device detection
const viewportUtils = {
    // Get current viewport width
    getViewportWidth: () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    
    // Get current viewport height
    getViewportHeight: () => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
    
    // Check if mobile device
    isMobile: () => viewportUtils.getViewportWidth() < 768,
    
    // Check if tablet device
    isTablet: () => viewportUtils.getViewportWidth() >= 768 && viewportUtils.getViewportWidth() < 1024,
    
    // Check if desktop device
    isDesktop: () => viewportUtils.getViewportWidth() >= 1024,
    
    // Check if ultra-wide screen
    isUltraWide: () => viewportUtils.getViewportWidth() >= 1920,
    
    // Check if very small mobile
    isVerySmallMobile: () => viewportUtils.getViewportWidth() < 375,
    
    // Check if touch device
    isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    
    // Get device orientation
    getOrientation: () => window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
};

// Responsive behavior manager
const responsiveManager = {
    currentBreakpoint: '',
    
    init() {
        this.updateBreakpoint();
        this.setupEventListeners();
        this.optimizeForDevice();
    },
    
    setupEventListeners() {
        // Throttled resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateBreakpoint();
                this.handleResize();
            }, 100);
        });
        
        // Orientation change handler
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
        
        // Scroll performance optimization
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 16); // ~60fps
        }, { passive: true });
    },
    
    updateBreakpoint() {
        const width = viewportUtils.getViewportWidth();
        let newBreakpoint = '';
        
        if (width < 375) newBreakpoint = 'xs';
        else if (width < 480) newBreakpoint = 'sm';
        else if (width < 640) newBreakpoint = 'md';
        else if (width < 768) newBreakpoint = 'lg';
        else if (width < 1024) newBreakpoint = 'tablet';
        else if (width < 1280) newBreakpoint = 'laptop';
        else if (width < 1440) newBreakpoint = 'desktop';
        else if (width < 1920) newBreakpoint = 'large';
        else newBreakpoint = 'ultra';
        
        if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.handleBreakpointChange(newBreakpoint);
        }
    },
    
    handleBreakpointChange(breakpoint) {
        document.body.setAttribute('data-breakpoint', breakpoint);
        
        // Optimize slideshow behavior based on breakpoint
        this.optimizeSlideshow();
        
        // Adjust navigation behavior
        this.optimizeNavigation();
        
        // Update touch targets if needed
        if (viewportUtils.isTouchDevice()) {
            this.optimizeTouchTargets();
        }
    },
    
    optimizeSlideshow() {
        const slides = document.querySelectorAll('.project-slide, .certificate-slide');
        
        if (viewportUtils.isMobile()) {
            // Enable touch scrolling for mobile
            slides.forEach(slide => {
                slide.style.touchAction = 'pan-x';
            });
            
            // Adjust autoplay timing for mobile
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 6000); // Slower on mobile
            }
        } else {
            // Normal behavior for desktop
            slides.forEach(slide => {
                slide.style.touchAction = 'auto';
            });
        }
    },
    
    optimizeNavigation() {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        
        if (viewportUtils.isDesktop() && !mobileMenu.classList.contains('hidden')) {
            // Auto-close mobile menu on desktop
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    },
    
    optimizeTouchTargets() {
        // Ensure minimum touch target size (44px x 44px)
        const touchTargets = document.querySelectorAll(
            '.nav-link, .mobile-nav-link, .project-nav-button, button, .contact-card'
        );
        
        touchTargets.forEach(target => {
            const rect = target.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                target.style.minWidth = '44px';
                target.style.minHeight = '44px';
                target.style.display = 'flex';
                target.style.alignItems = 'center';
                target.style.justifyContent = 'center';
            }
        });
    },
    
    handleResize() {
        // Recalculate hero section height on mobile
        if (viewportUtils.isMobile()) {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                const vh = window.innerHeight * 0.01;
                heroSection.style.setProperty('--vh', `${vh}px`);
            }
        }
        
        // Update skill grid columns
        this.updateSkillGrid();
        
        // Optimize text sizing
        this.optimizeTextSizing();
    },
    
    updateSkillGrid() {
        const skillsGrid = document.querySelector('#skills .grid');
        if (!skillsGrid) return;
        
        const width = viewportUtils.getViewportWidth();
        let columns = 1;
        
        if (width >= 1920) columns = 4;
        else if (width >= 1280) columns = 3;
        else if (width >= 640) columns = 2;
        else columns = 1;
        
        skillsGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    },
    
    optimizeTextSizing() {
        // Dynamic text scaling for better readability
        const heroTitle = document.querySelector('.hero-section h1');
        if (heroTitle) {
            const width = viewportUtils.getViewportWidth();
            let fontSize = '2rem';
            
            if (width < 375) fontSize = '1.75rem';
            else if (width < 480) fontSize = '2rem';
            else if (width < 640) fontSize = '2.25rem';
            else if (width < 768) fontSize = '2.5rem';
            else if (width < 1024) fontSize = '3rem';
            else if (width < 1280) fontSize = '3.5rem';
            else if (width < 1440) fontSize = '4rem';
            else if (width < 1920) fontSize = '4.5rem';
            else fontSize = '5rem';
            
            heroTitle.style.fontSize = fontSize;
        }
    },
    
    handleOrientationChange() {
        const orientation = viewportUtils.getOrientation();
        document.body.setAttribute('data-orientation', orientation);
        
        if (orientation === 'landscape' && viewportUtils.isMobile()) {
            // Optimize for landscape mobile
            this.optimizeLandscapeMobile();
        }
        
        // Force recalculation after orientation change
        setTimeout(() => {
            this.updateBreakpoint();
            this.handleResize();
        }, 300);
    },
    
    optimizeLandscapeMobile() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.minHeight = '100vh';
            heroSection.style.padding = '1rem 0';
        }
        
        // Hide scroll indicator in landscape
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.display = 'none';
        }
    },
    
    handleScroll() {
        // Optimize scroll performance
        if (viewportUtils.isMobile()) {
            // Use transform instead of changing positions
            const header = document.querySelector('header');
            if (header && window.scrollY > 100) {
                header.style.transform = 'translateY(0)';
                header.style.backdropFilter = 'blur(20px)';
            }
        }
    },
    
    optimizeForDevice() {
        // Device-specific optimizations
        if (viewportUtils.isTouchDevice()) {
            document.body.classList.add('touch-device');
            
            // Remove hover effects on touch devices
            const hoverElements = document.querySelectorAll('.hover-lift, .card-3d');
            hoverElements.forEach(el => {
                el.classList.remove('hover-lift', 'card-3d');
            });
        }
        
        // High DPI display optimizations
        if (window.devicePixelRatio > 1) {
            document.body.classList.add('high-dpi');
        }
        
        // Reduce animations on lower-end devices
        if (this.isLowEndDevice()) {
            document.body.classList.add('reduce-animations');
        }
    },
    
    isLowEndDevice() {
        // Simple heuristic for low-end device detection
        return navigator.hardwareConcurrency <= 2 || 
               (navigator.deviceMemory && navigator.deviceMemory <= 2);
    }
};

// Performance optimizations
const performanceOptimizer = {
    init() {
        this.optimizeImages();
        this.setupIntersectionObservers();
        this.optimizeAnimations();
    },
    
    optimizeImages() {
        // Lazy load images that are not in viewport
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    setupIntersectionObservers() {
        // Optimize animations to only run when in viewport
        const animatedElements = document.querySelectorAll('.animate-fade-in, .skill-category-card');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                } else {
                    entry.target.classList.remove('animate');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => animationObserver.observe(el));
    },
    
    optimizeAnimations() {
        // Reduce animations on slower devices
        if (responsiveManager.isLowEndDevice()) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.2s !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// Touch and gesture handling
const touchManager = {
    init() {
        if (!viewportUtils.isTouchDevice()) return;
        
        this.setupSwipeGestures();
        this.optimizeTouchScrolling();
    },
    
    setupSwipeGestures() {
        let startX, startY, endX, endY;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            this.handleSwipe(startX, startY, endX, endY);
        }, { passive: true });
    },
    
    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            // Horizontal swipe
            if (deltaX > 0) {
                // Swipe right - previous slide
                if (typeof prevSlide === 'function') prevSlide();
            } else {
                // Swipe left - next slide
                if (typeof nextSlide === 'function') nextSlide();
            }
        }
    },
    
    optimizeTouchScrolling() {
        // Enable smooth scrolling for touch devices
        document.documentElement.style.webkitOverflowScrolling = 'touch';
        
        // Prevent zoom on double tap for iOS
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
};

// Accessibility enhancements
const accessibilityManager = {
    init() {
        this.setupKeyboardNavigation();
        this.setupScreenReaderOptimizations();
        this.setupFocusManagement();
    },
    
    setupKeyboardNavigation() {
        // Enhanced keyboard navigation for slideshows
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    if (typeof prevSlide === 'function') {
                        e.preventDefault();
                        prevSlide();
                    }
                    break;
                case 'ArrowRight':
                    if (typeof nextSlide === 'function') {
                        e.preventDefault();
                        nextSlide();
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'End':
                    e.preventDefault();
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    break;
            }
        });
    },
    
    setupScreenReaderOptimizations() {
        // Add ARIA labels and descriptions
        const projectSlides = document.querySelectorAll('.project-slide');
        projectSlides.forEach((slide, index) => {
            slide.setAttribute('aria-label', `Project ${index + 1} of ${projectSlides.length}`);
            slide.setAttribute('role', 'tabpanel');
        });
        
        // Add live region for slide changes
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'slideshow-announcer';
        document.body.appendChild(liveRegion);
    },
    
    setupFocusManagement() {
        // Manage focus for mobile menu
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    // Focus first menu item when menu opens
                    const firstMenuItem = mobileMenu.querySelector('a');
                    if (firstMenuItem) {
                        setTimeout(() => firstMenuItem.focus(), 100);
                    }
                }
            });
        }
    }
};

// Initialize all responsive enhancements
document.addEventListener('DOMContentLoaded', () => {
    responsiveManager.init();
    performanceOptimizer.init();
    touchManager.init();
    accessibilityManager.init();
    
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        clearInterval(slideInterval);
        clearInterval(certificateSlideInterval);
    } else {
        // Resume animations when page becomes visible
        if (!isHovering) {
            slideInterval = setInterval(nextSlide, 5000);
        }
        if (!isCertificateHovering) {
            certificateSlideInterval = setInterval(nextCertificateSlide, 6000);
        }
    }
});

// External Monitor Detection và Layout Fix
class ExternalMonitorHandler {
    constructor() {
        this.isExternalMonitor = false;
        this.screenWidth = window.screen.width;
        this.screenHeight = window.screen.height;
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.init();
    }

    init() {
        this.detectExternalMonitor();
        this.applyMonitorFixes();
        this.setupResizeHandler();
    }

    detectExternalMonitor() {
        // Detect nếu đang dùng màn hình rời
        const isLargeScreen = this.screenWidth >= 1920;
        const isHighDPI = this.devicePixelRatio >= 1.5;
        const isWideAspectRatio = (this.screenWidth / this.screenHeight) >= 1.6;
        
        // Common external monitor resolutions
        const externalResolutions = [
            [2560, 1440], // 1440p
            [3840, 2160], // 4K
            [2560, 1080], // Ultrawide
            [3440, 1440], // Ultrawide 1440p
            [1920, 1080], // 1080p external
        ];
        
        this.isExternalMonitor = externalResolutions.some(([w, h]) => 
            this.screenWidth === w && this.screenHeight === h
        ) || (isLargeScreen && isWideAspectRatio);

        console.log('External Monitor Detected:', this.isExternalMonitor);
        console.log('Screen Resolution:', this.screenWidth, 'x', this.screenHeight);
        console.log('Device Pixel Ratio:', this.devicePixelRatio);
    }

    applyMonitorFixes() {
        if (this.isExternalMonitor) {
            document.body.classList.add('external-monitor');
            this.forceLayoutRecalculation();
            this.optimizeForExternalDisplay();
        }
    }

    forceLayoutRecalculation() {
        // Force browser layout recalculation
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.style.display = 'none';
            skillsSection.offsetHeight; // Trigger reflow
            skillsSection.style.display = '';
            
            // Force grid recalculation
            const grid = skillsSection.querySelector('.grid');
            if (grid) {
                grid.style.transform = 'translateZ(0)';
                grid.style.willChange = 'transform';
            }
        }
    }

    optimizeForExternalDisplay() {
        // Add CSS class cho external monitor
        document.documentElement.style.setProperty('--external-monitor', '1');
        
        // Fix viewport issues
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport && this.screenWidth >= 2560) {
            viewport.setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
            );
        }
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.screenWidth = window.screen.width;
                this.screenHeight = window.screen.height;
                this.detectExternalMonitor();
                this.applyMonitorFixes();
            }, 250);
        });
    }
}

// Initialize External Monitor Handler
document.addEventListener('DOMContentLoaded', () => {
    new ExternalMonitorHandler();
});