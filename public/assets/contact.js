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
    const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            // Disable the button and show loading text
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(contactForm);

            fetch('../../src/php/contact_mailer.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                formStatus.textContent = data.message;
                if (data.success) {
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    formStatus.className = 'form-status error';
                }
            })
            .catch(() => {
                formStatus.textContent = 'Sorry, there was a problem sending your message. Please try again later.';
                formStatus.className = 'form-status error';
            })
            .finally(() => {
                // Re-enable the button and restore text
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }
}); 