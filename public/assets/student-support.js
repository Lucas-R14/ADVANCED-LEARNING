document.addEventListener('DOMContentLoaded', function() {
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#loginModal') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set active navigation link when component is loaded
    document.addEventListener('componentLoaded', function(e) {
        if (e.detail.component.includes('header.html')) {
            // Set Student Support as active
            if (typeof setActiveNavLink === 'function') {
                setActiveNavLink('nav-support');
            }
        }
    });
});
