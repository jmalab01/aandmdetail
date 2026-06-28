// ============================================
// BOOKING MODAL - SIMPLE & RELIABLE
// ============================================

console.log('🔧 Modal.js loading...');

// Get modal elements
const modal = document.getElementById('bookingModal');
const closeBtn = document.getElementById('closeBookingModal');

console.log('Modal element:', modal);
console.log('Close button:', closeBtn);

// Open modal function
function showModal() {
    console.log('showModal() called');
    if (modal) {
        modal.style.display = 'flex';
        console.log('✅ Modal displayed');
    } else {
        console.error('❌ Modal not found');
    }
}

// Close modal function
function hideModal() {
    console.log('hideModal() called');
    if (modal) {
        modal.style.display = 'none';
        console.log('✅ Modal hidden');
    }
}

// Close button click
if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
    console.log('✅ Close button listener added');
}

// Close when clicking outside modal content
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });
    console.log('✅ Modal background click listener added');
}

// Keyboard escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideModal();
    }
});

// Get all booking buttons and add click handlers
const navBtn = document.getElementById('navBookBtn');
const footerBtn = document.getElementById('footerBookBtn');
const heroBtn = document.querySelector('.cta-button');
const serviceButtons = document.querySelectorAll('.service-book-btn');

console.log('Nav button:', navBtn);
console.log('Footer button:', footerBtn);
console.log('Hero button:', heroBtn);
console.log('Service buttons count:', serviceButtons.length);

// Click handlers for all buttons
if (navBtn) {
    navBtn.addEventListener('click', function(e) {
        console.log('🔘 Nav button clicked');
        e.preventDefault();
        showModal();
    });
    console.log('✅ Nav button listener added');
}

if (footerBtn) {
    footerBtn.addEventListener('click', function(e) {
        console.log('🔘 Footer button clicked');
        e.preventDefault();
        showModal();
    });
    console.log('✅ Footer button listener added');
}

// Hero button
if (heroBtn) {
    heroBtn.addEventListener('click', function(e) {
        console.log('🔘 Hero button clicked');
        e.preventDefault();
        showModal();
    });
    console.log('✅ Hero button listener added');
}

// Service card buttons
serviceButtons.forEach(function(button, index) {
    button.addEventListener('click', function(e) {
        console.log('🔘 Service button #' + index + ' clicked');
        e.preventDefault();
        showModal();
    });
});
console.log('✅ Service button listeners added');

console.log('✅ Modal.js loaded successfully');
console.log(`📱 Found ${serviceButtons.length} service book buttons`);
