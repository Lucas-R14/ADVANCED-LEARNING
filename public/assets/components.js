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

// Function to initialize all components on the page
function initializeComponents() {
    // Load header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        loadComponent('../../src/components/header.html', headerContainer);
    }
    
    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        loadComponent('../../src/components/footer.html', footerContainer);
    }
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
    }
}); 