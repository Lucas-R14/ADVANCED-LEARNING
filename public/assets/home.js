document.addEventListener('DOMContentLoaded', function() {
    // Loading screen functionality
    const loadingScreen = document.getElementById('loadingScreen');
    const loaderText = document.querySelector('.loader-text');
    let resourcesLoaded = 0;
    let totalResources = 0;
    
    // Função para atualizar o texto de carregamento
    function updateLoaderText(loaded, total) {
        const percentage = Math.round((loaded / total) * 100);
        loaderText.textContent = `Loading... ${percentage}%`;
    }
    
    // Conta todas as imagens, scripts e folhas de estilo
    const allImages = document.querySelectorAll('img');
    const allScripts = document.querySelectorAll('script');
    const allStylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    
    totalResources = allImages.length + allScripts.length + allStylesheets.length;
    updateLoaderText(0, totalResources);
    
    // Função que será chamada quando um recurso terminar de carregar
    function resourceLoaded() {
        resourcesLoaded++;
        updateLoaderText(resourcesLoaded, totalResources);
        
        if (resourcesLoaded >= totalResources) {
            // Todos os recursos foram carregados
            loadingScreen.classList.add('fade-out');
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
    
    // Monitora o carregamento de cada imagem
    allImages.forEach(img => {
        if (img.complete) {
            resourceLoaded();
        } else {
            img.addEventListener('load', resourceLoaded);
            img.addEventListener('error', resourceLoaded); // Conta mesmo se houver erro
        }
    });
    
    // Monitora scripts e folhas de estilo
    // Como scripts e CSS normalmente já estão carregados quando o DOMContentLoaded é acionado,
    // vamos apenas contá-los como carregados
    allScripts.forEach(script => resourceLoaded());
    allStylesheets.forEach(stylesheet => resourceLoaded());
    
    // Timeout de segurança - se algo falhar, ainda assim esconde o loading após 8 segundos
    setTimeout(function() {
        if (loadingScreen.style.display !== 'none') {
            loadingScreen.classList.add('fade-out');
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 8000);
    
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

    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
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
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-rotate carousel
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause carousel on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
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
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
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
    
    // Animation for programme cards
    const animatedElements = document.querySelectorAll('.programme-card, .news-card, .experience-feature');
    
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