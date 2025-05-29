// Function to load HTML components
function loadComponent(url, targetElement) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load component: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            targetElement.innerHTML = html;
            
            // Execute any scripts in the loaded component
            const scripts = targetElement.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
                // Remove the original script to avoid duplication
                script.remove();
            });
            
            // Dispatch event when component is loaded
            const event = new CustomEvent('componentLoaded', { 
                detail: { component: url, element: targetElement } 
            });
            document.dispatchEvent(event);
        })
        .catch(error => {
            console.error(`Error loading component ${url}:`, error);
            targetElement.innerHTML = `<p>Error loading component. Please try refreshing the page.</p>`;
        });
}

// Function to set active navigation link
function setActiveNavLink(pageId) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.getElementById(pageId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Function to set page title and breadcrumb
function setPageTitleAndBreadcrumb(title, breadcrumb) {
    const pageTitle = document.getElementById('page-title');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    
    if (pageTitle) {
        pageTitle.textContent = title;
    }
    
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = breadcrumb;
    }
}

// Function to load common.js script
function loadCommonScript() {
    return new Promise((resolve, reject) => {
        // Check if common.js is already loaded
        if (document.querySelector('script[src*="common.js"]')) {
            resolve();
            return;
        }
        
        // Create script element
        const commonScript = document.createElement('script');
        commonScript.src = '../../public/assets/common.js';
        commonScript.onload = () => resolve();
        commonScript.onerror = () => reject(new Error('Failed to load common.js'));
        document.head.appendChild(commonScript);
    });
}

// Function to initialize all components on the page
function initializeComponents() {
    // First load common.js
    loadCommonScript()
        .then(() => {
            // Then load components
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                loadComponent('../../src/components/header.html', headerContainer);
            }
            
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                loadComponent('../../src/components/footer.html', footerContainer);
            }
        })
        .catch(error => {
            console.error('Error initializing components:', error);
        });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeComponents);

// Configure page-specific settings after components are loaded
document.addEventListener('componentLoaded', function(e) {
    const component = e.detail.component;
    
    // If the header was loaded, set the active page and title
    if (component.includes('header.html')) {
        // Get current page name from URL path
        const path = window.location.pathname;
        const pageName = path.split('/').pop().split('.')[0];
        
        // Set page-specific config based on current page
        switch (pageName) {
            case 'home':
                setActiveNavLink('nav-home');
                // Home page doesn't use the standard page banner
                document.querySelector('.page-banner')?.remove();
                break;
            case 'about':
                setActiveNavLink('nav-about');
                setPageTitleAndBreadcrumb('About Advanced Learning', 'About Us');
                break;
            case 'programmes':
                setActiveNavLink('nav-programmes');
                setPageTitleAndBreadcrumb('Study Programmes', 'Programmes');
                break;
            case 'admissions':
                setActiveNavLink('nav-admissions');
                setPageTitleAndBreadcrumb('Admissions', 'Admissions');
                break;
            case 'student-support':
                setActiveNavLink('nav-support');
                setPageTitleAndBreadcrumb('Student Support Services', 'Student Support');
                break;
            case 'contact':
                setActiveNavLink('nav-contact');
                setPageTitleAndBreadcrumb('Contact Us', 'Contact');
                break;
            case 'index':
                setActiveNavLink('nav-home');
                // Index page redirects to home, so no banner needed
                document.querySelector('.page-banner')?.remove();
                break;
            default:
                // For any other page, hide the banner by default
                document.querySelector('.page-banner')?.remove();
        }

        // Mobile menu logic for all pages (runs after header is loaded)
        attachMobileMenuListeners();
    }
});

function attachMobileMenuListeners() {
    const mobileMenuBtn = document.querySelector('.main-nav .mobile-menu-btn');
    const navMenu = document.querySelector('.main-nav ul');
    if (!mobileMenuBtn || !navMenu) return;

    // Remove previous listeners (by using named handler and removing before adding)
    mobileMenuBtn.removeEventListener('pointerup', window._menuBtnHandler);
    navMenu.removeEventListener('pointerup', window._menuMenuHandler);
    document.removeEventListener('pointerup', window._menuDocHandler);

    // Handler for menu button
    window._menuBtnHandler = function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    };
    mobileMenuBtn.addEventListener('pointerup', window._menuBtnHandler);

    // Prevent menu from closing when tapping inside
    window._menuMenuHandler = function(e) {
        e.stopPropagation();
    };
    navMenu.addEventListener('pointerup', window._menuMenuHandler);

    // Handler for closing menu when tapping outside
    window._menuDocHandler = function(e) {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    };
    document.addEventListener('pointerup', window._menuDocHandler);

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('pointerup', function() {
            navMenu.classList.remove('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    attachMobileMenuListeners();
    // As a fallback, re-attach after a short delay (for slow dynamic loads)
    setTimeout(attachMobileMenuListeners, 500);
}); 