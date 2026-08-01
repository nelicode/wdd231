// ============================================
// JOIN.JS - Modals, menu, and footer
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ===== 1. HAMBURGER MENU =====
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('open');
            toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('open');
                    toggle.textContent = '☰';
                }
            });
        });
    }

    // ===== 2. MODALS =====
    // Open modals
    const modalButtons = document.querySelectorAll('.modal-btn');
    modalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const dialog = document.getElementById(modalId);
            if (dialog) {
                dialog.showModal();
            }
        });
    });

    // Close modals with ❌ button
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dialog = this.closest('dialog');
            if (dialog) {
                dialog.close();
            }
        });
    });

    // Close modals when clicking outside
    const dialogs = document.querySelectorAll('dialog');
    dialogs.forEach(dialog => {
        dialog.addEventListener('click', function (event) {
            if (event.target === this) {
                this.close();
            }
        });
    });

    // ===== 3. TIMESTAMP =====
    const timestamp = document.querySelector('#timestamp');
    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }

    // ===== 4. FOOTER =====
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

    console.log('✅ Join page loaded successfully');
});