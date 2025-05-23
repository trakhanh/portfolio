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

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
    
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
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white z-50`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
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