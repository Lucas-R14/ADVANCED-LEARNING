document.addEventListener('DOMContentLoaded', function() {
    // Check URL parameters for form submission status
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const formStatus = document.getElementById('formStatus');
    
    if (status === 'success') {
        formStatus.textContent = 'Thank you for your message. We will get back to you soon!';
        formStatus.className = 'form-status success';
        // Reset form if submission was successful
        document.getElementById('contactForm').reset();
    } else if (status === 'error') {
        formStatus.textContent = 'Sorry, there was a problem sending your message. Please try again later.';
        formStatus.className = 'form-status error';
    }
    
    // Form submission handling for demonstration purposes
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Prevent actual form submission for demo
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'Please fill in all fields.';
                formStatus.className = 'form-status error';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.className = 'form-status error';
                return;
            }
            
            // Simulate email sending (successfully)
            console.log('Sending email to: info@advancedlearning.study');
            console.log('From:', name, '(', email, ')');
            console.log('Subject:', subject);
            console.log('Message:', message);
            
            // Show success message
            formStatus.textContent = 'Thank you for your message. We will get back to you soon!';
            formStatus.className = 'form-status success';
            
            // Reset form
            contactForm.reset();
        });
    }
}); 