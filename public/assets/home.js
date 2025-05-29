document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot, .dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    
    // Check if carousel elements exist
    if (slides.length > 0 && dots.length > 0 && prevBtn && nextBtn) {
        // Debug log to ensure elements are found
        console.log('Carousel elements found:', slides.length, 'slides');
        
        function showSlide(n) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Calculate the index with wrap-around
            currentSlide = (n + slides.length) % slides.length;
            
            // Add active class to current slide and dot
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Set up event listeners for carousel
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
        
        // Set up dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Initialize first slide
        showSlide(0);
        
        // Auto-rotate carousel
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause carousel on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    } else {
        console.error('Carousel elements missing:', {
            slides: slides.length,
            dots: dots.length,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn
        });
    }
    
    // Login modal functionality
    const loginBtn = document.querySelector('a[href="#loginModal"]');
    const closeModal = document.querySelector('.close-modal');
    const loginModal = document.getElementById('loginModal');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }
    
    if (closeModal && loginModal) {
        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }

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
    
    // Make all programme cards and news cards visible immediately
    document.querySelectorAll('.programme-card, .news-card').forEach(card => {
        card.classList.add('visible');
    });
    
    // Make all experience features visible immediately
    const experienceFeatures = document.querySelectorAll('.experience-feature');
    experienceFeatures.forEach(feature => {
        feature.classList.add('visible');
    });
}); 