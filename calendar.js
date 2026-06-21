// ─────────────────────────────────────────────────────────────
//  EMAILJS SETUP  (https://www.emailjs.com — free tier: 200/mo)
//  1. Create a free account at emailjs.com
//  2. Add Email Service → connect your Gmail (aandmdetailingservice@gmail.com)
//  3. Create TWO Email Templates (see variable names below)
//  4. Replace the four placeholder strings below with your real IDs
// ─────────────────────────────────────────────────────────────
const EMAILJS_CONFIG = {
    publicKey:          'YOUR_PUBLIC_KEY',        // Account → API Keys
    serviceId:          'YOUR_SERVICE_ID',         // Email Services tab
    adminTemplateId:    'YOUR_ADMIN_TEMPLATE_ID',  // Template for YOU (admin)
    customerTemplateId: 'YOUR_CUSTOMER_TEMPLATE_ID' // Template for the customer
};

/*
 ADMIN TEMPLATE VARIABLES  (To Email: aandmdetailingservice@gmail.com)
 Subject:  New Booking – {{service}} on {{date}} at {{time}}
 Body uses: {{customer_name}}, {{customer_email}}, {{customer_phone}},
            {{service}}, {{date}}, {{time}}, {{vehicle}}, {{address}}, {{notes}}

 CUSTOMER TEMPLATE VARIABLES  (To Email: {{to_email}})
 Subject:  Your A&M Detailing Appointment – {{service}}
 Body uses: {{customer_name}}, {{service}}, {{date}}, {{time}},
            {{address}}, {{to_email}}
*/

// ── Google Calendar helpers ────────────────────────────────────
function parseTimeTo24h(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return { hours, minutes };
}

function formatGCalDateTime(dateStr, timeStr, addHours = 0) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const { hours, minutes } = parseTimeTo24h(timeStr);
    const d = new Date(year, month - 1, day, hours + addHours, minutes);
    return (
        d.getFullYear() +
        String(d.getMonth() + 1).padStart(2, '0') +
        String(d.getDate()).padStart(2, '0') + 'T' +
        String(d.getHours()).padStart(2, '0') +
        String(d.getMinutes()).padStart(2, '0') + '00'
    );
}

function generateGoogleCalendarLink({ service, date, time, address, name, email, phone, carInfo, notes }) {
    const start = formatGCalDateTime(date, time, 0);
    const end   = formatGCalDateTime(date, time, 2);
    const title   = encodeURIComponent('A&M Detailing – ' + service);
    const details = encodeURIComponent(
        '🚗 A&M Detailing Appointment\n' +
        '━━━━━━━━━━━━━━━━━━━━\n' +
        '📋 Service:  ' + service + '\n' +
        '👤 Name:     ' + name + '\n' +
        '📧 Email:    ' + email + '\n' +
        '📞 Phone:    ' + phone + '\n' +
        '🚙 Vehicle:  ' + carInfo + '\n' +
        '📍 Address:  ' + address + '\n' +
        '📝 Notes:    ' + (notes || 'None')
    );
    return (
        'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text='     + title +
        '&dates='    + start + '/' + end +
        '&details='  + details +
        '&location=' + encodeURIComponent(address)
    );
}

// ── Email sending ──────────────────────────────────────────────
function sendBookingEmails(data) {
    const templateVars = {
        customer_name:  data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        service:        data.service,
        date:           data.date,
        time:           data.time,
        vehicle:        data.carInfo,
        address:        data.address,
        notes:          data.notes || 'None',
        to_email:       data.email       // customer "To" field
    };

    // 1️⃣  Notify admin
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.adminTemplateId, templateVars)
        .then(() => console.log('Admin notified'))
        .catch(err => console.error('Admin email failed:', err));

    // 2️⃣  Confirm to customer
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.customerTemplateId, templateVars)
        .then(() => console.log('Customer confirmed'))
        .catch(err => console.error('Customer email failed:', err));
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    // Init EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    }

    // Min date = today
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
    }

    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;

    bookingForm.addEventListener('submit', function (e) {
        const submitBtn = bookingForm.querySelector('.submit-btn');
        const serviceEl = document.getElementById('service');

        const data = {
            service:  serviceEl.options[serviceEl.selectedIndex].text,
            date:     document.getElementById('bookingDate').value,
            time:     document.getElementById('timeSlot').value,
            name:     document.getElementById('name').value,
            email:    document.getElementById('email').value,
            phone:    document.getElementById('phone').value,
            carInfo:  document.getElementById('carInfo').value,
            address:  document.getElementById('address').value,
            notes:    document.getElementById('notes').value,
        };

        // Set Google Calendar link on modal button
        if (data.date && data.time) {
            const btn = document.getElementById('addToCalendarBtn');
            if (btn) btn.href = generateGoogleCalendarLink(data);
        }

        // Send emails
        if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            sendBookingEmails(data);
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-calendar-plus"></i> Request Booking';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            console.warn('EmailJS not configured yet — add your keys to EMAILJS_CONFIG in calendar.js');
        }
    });
});
