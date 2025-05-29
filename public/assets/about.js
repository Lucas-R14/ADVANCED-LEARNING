document.addEventListener('DOMContentLoaded', function() {
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

    // Make all animated elements visible by default
    const animatedElements = document.querySelectorAll('.mission-box, .vision-box, .team-member, .pillar, .principle, .benefit');
    animatedElements.forEach(element => {
        element.classList.add('visible');
    });
}); 