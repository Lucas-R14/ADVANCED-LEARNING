document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
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

    // Handle PDF download
    const downloadBtn = document.getElementById('downloadEthics');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a temporary link with correct attributes
            const link = document.createElement('a');
            link.href = '/public/pdf/Appendix K - Code of Ethics.pdf';
            link.download = 'Code of Ethics.pdf';
            link.type = 'application/pdf';
            
            // Append to body, click and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Animation for sections
    const animatedElements = document.querySelectorAll('.mission-box, .vision-box, .team-member, .pillar, .principle, .benefit');
    
    function checkVisibility() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check visibility initially and during scrolling
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}); 