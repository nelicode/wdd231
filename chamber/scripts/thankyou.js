// ============================================
// THANKYOU.JS - Display form data
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // Get URL parameters
    const params = new URLSearchParams(window.location.search);

    // Get container
    const infoContainer = document.querySelector('#application-info');

    if (!infoContainer) return;

    // ===== 1. DISPLAY FORM DATA =====
    const firstname = params.get('firstname') || 'Not provided';
    const lastname = params.get('lastname') || 'Not provided';
    const email = params.get('email') || 'Not provided';
    const phone = params.get('phone') || 'Not provided';
    const business = params.get('business') || 'Not provided';
    const orgtitle = params.get('orgtitle') || 'Not provided';
    const description = params.get('description') || 'Not provided';

    // Membership level mapping
    const membershipMap = {
        'np': 'Basic (Free)',
        'bronze': 'Standard ($100/year)',
        'silver': 'Premium ($250/year)',
        'gold': 'Enterprise ($500/year)'
    };
    let membership = params.get('membership') || 'Not provided';
    membership = membershipMap[membership] || membership;

    // Timestamp
    let timestamp = params.get('timestamp') || 'Not provided';
    if (timestamp !== 'Not provided') {
        try {
            timestamp = new Date(timestamp).toLocaleString('en-US', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
        } catch (e) {
            timestamp = 'Not provided';
        }
    }

    // Build HTML
    infoContainer.innerHTML = `
        <p><strong>First Name:</strong> ${firstname}</p>
        <p><strong>Last Name:</strong> ${lastname}</p>
        <p><strong>Organizational Title:</strong> ${orgtitle}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Name:</strong> ${business}</p>
        <p><strong>Membership Level:</strong> ${membership}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Date Submitted:</strong> ${timestamp}</p>
    `;

    // ===== 2. DYNAMIC FOOTER =====
    // Year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Last Modified
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        try {
            let lastMod = new Date(document.lastModified);
            if (isNaN(lastMod.getTime())) throw new Error('Invalid date');

            const formattedDate = lastMod.toLocaleString('en-US', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
            lastModifiedElement.textContent = formattedDate;
        } catch (e) {
            const now = new Date();
            lastModifiedElement.textContent = now.toLocaleString('en-US', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
        }
    }

    console.log('✅ Thank You page loaded successfully');
});