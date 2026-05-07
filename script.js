// Wait for window load
// Wait for window load
window.addEventListener('load', function () {
    const loader = document.getElementById('loader-wrapper');

    // Remove loader immediately after load
    loader.classList.add('fade-out');

    // Remove from DOM after transition
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Navigation Logic
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu'); // This might need adjustment based on new structure
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    const body = document.body;

    // Toggle Mobile Menu
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            mobileMenuContainer.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    // Mobile Menu Structure Handling
    function handleMobileMenu() {
        if (window.innerWidth <= 992) {
            // Move menus to mobile container if not already there
            if (!mobileMenuContainer.contains(navLeft) && navLeft) {
                mobileMenuContainer.appendChild(navLeft);
            }
            if (!mobileMenuContainer.contains(navRight) && navRight) {
                mobileMenuContainer.appendChild(navRight);
            }
        } else {
            // Move menus back to main header
            const navContainer = document.querySelector('.nav-container');
            const navCenter = document.querySelector('.nav-center');

            if (navContainer && navCenter) {
                if (navContainer.contains(mobileMenuContainer)) {
                    // Insert navLeft before navCenter
                    if (!navContainer.contains(navLeft) && navLeft) {
                        navContainer.insertBefore(navLeft, navCenter);
                    }
                    // Insert navRight after navCenter (before hamburger)
                    if (!navContainer.contains(navRight) && navRight) {
                        navContainer.insertBefore(navRight, hamburger);
                    }
                }
            }
        }
    }

    // Initial check
    handleMobileMenu();

    // Listen for resize
    window.addEventListener('resize', handleMobileMenu);

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');

        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                // If it's a mobile view, toggle the dropdown
                // Prevent default only if we want to stop navigation on parent click
                // For now, let's assume clicking the parent toggles the menu
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking a link (that isn't a dropdown toggle)
    const navLinks = document.querySelectorAll('.nav-item:not(.dropdown) a, .dropdown-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 992) {
                hamburger.classList.remove('active');
                mobileMenuContainer.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (scrollTopBtn) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    }
}

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}
