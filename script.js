// ============================================
// SPLASH SCREEN
// ============================================
const splashScreen = document.getElementById('splashScreen');
if (splashScreen) {
    const splashShownEver = localStorage.getItem('splashShownEver');
    if (!splashShownEver) {
        localStorage.setItem('splashShownEver', 'true');
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 4000);
    } else {
        splashScreen.style.display = 'none';
    }
}

// ============================================
// DOM ELEMENT REFERENCES
// ============================================
const hamburger           = document.querySelector('.hamburger');
const navLinks            = document.querySelector('.nav-links');
const navbar              = document.querySelector('.navbar');

// ============================================
// UTILITIES & TRACKING
// ============================================
function trackEvent(eventName, eventData = {}) {
    console.log(`Event tracked: ${eventName}`, eventData);
}

// ============================================
// LAZY LOADING OPTIMIZATION
// ============================================
// Lazy load images for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Lazy load iframes (Google Calendar, Google Reviews, etc)
if ('IntersectionObserver' in window) {
    const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    iframe.removeAttribute('data-src');
                }
                observer.unobserve(iframe);
            }
        });
    }, { rootMargin: '100px' });

    document.querySelectorAll('iframe[data-src]').forEach(iframe => {
        iframeObserver.observe(iframe);
    });
}

// ============================================
// NAVIGATION
// ============================================

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// NAVBAR SCROLL SHADOW
// ============================================
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.style.boxShadow = window.pageYOffset > 0
            ? '0 4px 20px rgba(0,0,0,0.25)'
            : 'none';
    }
});

// ============================================
// ACTIVE NAV HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(item => {
        item.style.color = '';
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--gold)';
        }
    });
});

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.service-card, .review-card, .feature, .contact-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// HERO ANIMATION ON LOAD
// ============================================
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideUp 0.6s ease ${index * 0.1}s forwards`;
    });
});

// ============================================
// SERVICE CARD HOVER EFFECTS
// ============================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const price = this.querySelector('.price');
        if (price) {
            price.style.color = '#c9a227'; // Match logo gold
        }
    });

    card.addEventListener('mouseleave', function() {
        const price = this.querySelector('.price');
        if (price) {
            price.style.color = '#c9a227'; // Match logo gold
        }
    });
});

// ============================================
// BUTTON CLICK TRACKING
// ============================================
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('button_click', { button_text: button.textContent });
    });
});

// ============================================
// BEFORE/AFTER GALLERY TOGGLE
// ============================================
document.querySelectorAll('.toggle-before-after').forEach(button => {
    const container = button.closest('.before-after-images');
    if (!container) return;

    const beforeImg = container.querySelector('.before-img');
    const afterImg = container.querySelector('.after-img');
    const label = button.querySelector('.toggle-label');
    let isShowingAfter = false;

    button.addEventListener('click', () => {
        isShowingAfter = !isShowingAfter;
        
        if (isShowingAfter) {
            beforeImg.style.opacity = '0';
            afterImg.style.opacity = '1';
            label.textContent = 'Show Before';
        } else {
            beforeImg.style.opacity = '1';
            afterImg.style.opacity = '0';
            label.textContent = 'Show After';
        }
    });
});

// ============================================
// BOOKING MODAL
// ============================================
console.log('🔧 Modal code starting...');

const modal = document.getElementById('bookingModal');
const closeBtn = document.getElementById('closeBookingModal');
const bookingCalendarFrame = document.querySelector('.booking-calendar-frame');

console.log('Modal element found:', !!modal);
if (modal) {
    console.log('Modal classes:', modal.className);
    console.log('Modal display:', window.getComputedStyle(modal).display);
    document.body.appendChild(modal);
}
console.log('Close button found:', !!closeBtn);

function showModal() {
    console.log('showModal() called');
    if (modal) {
        if (bookingCalendarFrame && !bookingCalendarFrame.getAttribute('src')) {
            bookingCalendarFrame.setAttribute('src', bookingCalendarFrame.dataset.src);
        }
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100dvh';
        modal.style.inset = '0';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '999999';
        modal.scrollTop = 0;
        console.log('Before adding class - display:', window.getComputedStyle(modal).display);
        modal.classList.add('show');
        console.log('After adding class - display:', window.getComputedStyle(modal).display);
        console.log('Class list:', modal.className);
        console.log('✅ Modal show class added');
    } else {
        console.error('❌ Modal element not found!');
    }
}

function hideModal() {
    console.log('hideModal() called');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = '';
        console.log('✅ Modal show class removed');
    }
}

// Close button
if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
        console.log('Close button clicked');
        hideModal();
    });
}

// Click outside modal
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            console.log('Clicked outside modal');
            hideModal();
        }
    });
}

// Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
        console.log('Escape key pressed');
        hideModal();
    }
});

function openBookingModal(e) {
    e.preventDefault();
    showModal();
}

function isBookingTrigger(element) {
    if (!element) return false;
    if (element.matches('#navBookBtn, #footerBookBtn, #ctaBookBtn, #ctaSocialBookBtn, .service-book-btn, .booking-trigger, .nav-book-btn, .footer-book-btn')) {
        return true;
    }

    const href = element.getAttribute('href');
    const text = (element.textContent || '').trim().toLowerCase();
    const isLocalCommand = element.matches('button, [role="button"]') || href === '#' || href === '';
    return isLocalCommand && (text.includes('book') || text.includes('custom quote'));
}

document.addEventListener('click', function(e) {
    const trigger = e.target.closest('a, button, [role="button"]');
    if (isBookingTrigger(trigger)) {
        openBookingModal(e);
    }
});

console.log('✅ A&M Detailing loaded successfully!');
