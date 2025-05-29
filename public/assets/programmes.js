document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded disparado");
    
    // Initialize the filters when DOM is ready
    initializeFilters();
    
    // Also initialize filters after components are loaded
    document.addEventListener('componentLoaded', function() {
        // Small delay to ensure everything is rendered properly
        setTimeout(initializeFilters, 100);
    });
    
    // Initialize on window load as well
    window.addEventListener('load', function() {
        initializeFilters();
    });
});

// Function to initialize program filters
function initializeFilters() {
    // Get all the filter buttons and programme items
    const filterButtons = document.querySelectorAll('.filter-btn');
    const programmeItems = document.querySelectorAll('.programme-detail');
    
    // Only proceed if we have both buttons and items
    if (filterButtons.length === 0 || programmeItems.length === 0) {
        return;
    }
    
    // Replace all buttons to remove any existing event listeners
    filterButtons.forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add new event listener to the cloned button
        newButton.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Apply filter to programme items
            programmeItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else {
                    const categories = item.getAttribute('data-category').split(' ');
                    item.style.display = categories.includes(filter) ? 'block' : 'none';
                }
            });
        });
    });
} 