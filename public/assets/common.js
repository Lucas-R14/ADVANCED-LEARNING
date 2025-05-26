// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignore modal links or other special links
            if (targetId === '#loginModal' || targetId.startsWith('#modal')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Common functions used across the site

// Function to add fade-in effect on scroll
function initializeFadeInOnScroll() {
    // Add fade-in-element class to all major content sections
    const sections = document.querySelectorAll('section, .container > div');
    sections.forEach(section => {
        // Skip header, footer, and already animated elements
        if (!section.closest('header') && 
            !section.closest('footer') && 
            !section.classList.contains('visible') &&
            !section.classList.contains('fade-in-element')) {
            section.classList.add('fade-in-element');
        }
    });
    
    // Observer for fade-in effect
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once the animation is done, we can unobserve
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // adds a margin to the bottom
    });
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-element').forEach(element => {
        fadeObserver.observe(element);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize fade-in on scroll
    initializeFadeInOnScroll();
});

// Also initialize after components are loaded
document.addEventListener('componentLoaded', () => {
    setTimeout(initializeFadeInOnScroll, 100);
}); 