// ============================================
// BOOKING MODAL - SIMPLE & RELIABLE
// ============================================

// Get modal elements
const modal = document.getElementById('bookingModal');
const closeBtn = document.getElementById('closeBookingModal');

// Open modal function
function showModal() {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal function
function hideModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close button click
if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
}

// Close when clicking outside modal content
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });
}

// Keyboard escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideModal();
    }
});

// Get all booking buttons and add click handlers
const bookingButtons = [
    document.getElementById('navBookBtn'),           // Nav Book Now
    document.getElementById('footerBookBtn'),        // Footer Book Now
    document.querySelector('.cta-button'),          // Hero Book Your Service
    document.querySelectorAll('.service-book-btn'),  // Service cards
];

// Click handlers for all buttons
if (document.getElementById('navBookBtn')) {
    document.getElementById('navBookBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showModal();
    });
}

if (document.getElementById('footerBookBtn')) {
    document.getElementById('footerBookBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showModal();
    });
}

// Hero button
const heroButton = document.querySelector('.cta-button');
if (heroButton) {
    heroButton.addEventListener('click', function(e) {
        e.preventDefault();
        showModal();
    });
}

// Service card buttons
const serviceButtons = document.querySelectorAll('.service-book-btn');
serviceButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        showModal();
    });
});

console.log('✅ Modal system loaded successfully');
console.log(`📱 Found ${serviceButtons.length} service book buttons`);
