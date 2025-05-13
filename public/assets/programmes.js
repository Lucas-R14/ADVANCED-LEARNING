document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded disparado");
    
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

    // Inicializar a funcionalidade de filtro
    setTimeout(function() {
        console.log("Tentando inicializar filtros após 500ms");
        initializeFilters();
    }, 500);
    
    // Também inicializa os filtros quando os componentes terminarem de carregar
    document.addEventListener('componentLoaded', function(e) {
        console.log("Evento componentLoaded disparado: ", e.detail.component);
        setTimeout(function() {
            console.log("Tentando inicializar filtros após componentLoaded");
            initializeFilters();
        }, 100);
    });
});

// Função para inicializar os filtros de programas
function initializeFilters() {
    // Programme filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const programmeItems = document.querySelectorAll('.programme-detail');
    
    console.log("InitializeFilters chamado - botões encontrados:", filterButtons.length);
    console.log("InitializeFilters chamado - itens de programa encontrados:", programmeItems.length);
    
    if (filterButtons.length > 0 && programmeItems.length > 0) {
        // Remove qualquer event listener anterior para evitar duplicação
        filterButtons.forEach(button => {
            button.removeEventListener('click', filterHandler);
            
            // Adicionar novo event listener
            button.addEventListener('click', filterHandler);
            console.log("Event listener adicionado ao botão:", button.getAttribute('data-filter'));
        });
        
        console.log('Filtros de programa inicializados com sucesso.');
    } else {
        console.log('Elementos de filtro ou programas não encontrados na página.');
    }
}

// Função de handler para o filtro para evitar duplicação de eventos
function filterHandler(event) {
    const button = event.currentTarget;
    const filter = button.getAttribute('data-filter');
    console.log("Botão clicado:", filter);
    
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Filter items
    document.querySelectorAll('.programme-detail').forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        console.log("Item:", item.querySelector('h2').textContent, "Categorias:", categories);
        
        if (filter === 'all') {
            item.style.display = 'block';
            console.log("Mostrando item (all):", item.querySelector('h2').textContent);
        } else {
            if (categories.includes(filter)) {
                item.style.display = 'block';
                console.log("Mostrando item (filtrado):", item.querySelector('h2').textContent);
            } else {
                item.style.display = 'none';
                console.log("Ocultando item:", item.querySelector('h2').textContent);
            }
        }
    });
} 