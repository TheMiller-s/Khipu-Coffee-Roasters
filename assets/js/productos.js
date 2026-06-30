import { Cart } from './modules/cart.js';
import { initCommonUI } from './modules/ui.js';

// Catalog Products Data Array
const PRODUCTS = [
    {
        id: '1',
        name: 'Loja Typica Mejorada',
        origin: 'loja',
        process: 'lavado',
        altitude: '1,900 msnm',
        notes: 'Notas a jazmín, durazno maduro y miel de caña. Acidez cítrica brillante.',
        price: 14.50,
        cssClass: 'text-accent-1',
        icon: 'fa-mug-hot',
        originLabel: 'Loja',
        processLabel: 'Lavado'
    },
    {
        id: '2',
        name: 'Galápagos Bourbon Rojo',
        origin: 'galapagos',
        process: 'natural',
        altitude: '850 msnm (Clima Isleño)',
        notes: 'Notas a chocolate oscuro, cáscara de naranja y nueces tostadas. Cuerpo sedoso.',
        price: 18.00,
        cssClass: 'text-accent-2',
        icon: 'fa-seedling',
        originLabel: 'San Cristóbal',
        processLabel: 'Natural'
    },
    {
        id: '3',
        name: 'Zaruma Caturra Clásico',
        origin: 'zaruma',
        process: 'honey',
        altitude: '1,600 msnm',
        notes: 'Notas a panela, frutos rojos y vainilla. Cuerpo cremoso y balanceado.',
        price: 11.00,
        cssClass: 'text-accent-3',
        icon: 'fa-leaf',
        originLabel: 'Zaruma',
        processLabel: 'Honey'
    },
    {
        id: '4',
        name: 'Puyango Gesha Reserva',
        origin: 'loja',
        process: 'lavado',
        altitude: '1,850 msnm',
        notes: 'Notas florales intensas, té de limón y jazmín. Retrogusto dulce y prolongado.',
        price: 22.00,
        cssClass: 'text-accent-1',
        icon: 'fa-award',
        originLabel: 'Puyango',
        processLabel: 'Lavado'
    },
    {
        id: '5',
        name: 'Imbabura Sidra Exótico',
        origin: 'imbabura',
        process: 'natural',
        altitude: '1,750 msnm',
        notes: 'Notas tropicales a mango, maracuyá y acidez de sidra de manzana.',
        price: 16.50,
        cssClass: 'text-accent-2',
        icon: 'fa-fire-flame-simple',
        originLabel: 'Imbabura',
        processLabel: 'Natural'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Cart
    const cart = new Cart();
    cart.init();

    const catalogGrid = document.getElementById('catalog-grid');
    const originFilterBtns = document.querySelectorAll('[data-filter-origin]');
    const processFilterBtns = document.querySelectorAll('[data-filter-process]');

    let activeOrigin = 'all';
    let activeProcess = 'all';

    // Render Products to DOM
    function renderCatalog() {
        if (!catalogGrid) return;
        
        catalogGrid.innerHTML = '';
        
        // Filter items
        const filteredProducts = PRODUCTS.filter(p => {
            const matchOrigin = activeOrigin === 'all' || p.origin === activeOrigin;
            const matchProcess = activeProcess === 'all' || p.process === activeProcess;
            return matchOrigin && matchProcess;
        });

        if (filteredProducts.length === 0) {
            catalogGrid.innerHTML = '<div class="no-results">No se encontraron cafés con los filtros seleccionados.</div>';
            return;
        }

        // Generate DOM cards
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-id', product.id);
            card.innerHTML = `
                <div class="product-visual">
                    <div class="product-bag-mock ${product.cssClass}">
                        <span class="origin-tag">${product.originLabel}</span>
                        <i class="fa-solid ${product.icon}"></i>
                    </div>
                </div>
                <div class="product-details">
                    <div class="product-meta">
                        <span>Proceso: ${product.processLabel}</span>
                        <span>${product.altitude}</span>
                    </div>
                    <h3>${product.name}</h3>
                    <p class="product-notes">${product.notes}</p>
                    <div class="product-purchase">
                        <span class="price">$${product.price.toFixed(2)} <small>/ 250g</small></span>
                        <button class="btn-add-cart">Añadir</button>
                    </div>
                </div>
            `;

            // Bind individual click listener
            card.querySelector('.btn-add-cart').addEventListener('click', () => {
                cart.addItem(product.id, product.name, product.price);
            });

            catalogGrid.appendChild(card);
        });
    }

    // Set filter event listeners
    originFilterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            originFilterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeOrigin = e.target.getAttribute('data-filter-origin');
            
            // Add grid loading effect
            catalogGrid.classList.add('loading');
            setTimeout(() => {
                renderCatalog();
                catalogGrid.classList.remove('loading');
            }, 300);
        });
    });

    processFilterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            processFilterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeProcess = e.target.getAttribute('data-filter-process');
            
            // Add grid loading effect
            catalogGrid.classList.add('loading');
            setTimeout(() => {
                renderCatalog();
                catalogGrid.classList.remove('loading');
            }, 300);
        });
    });

    // Initial render
    renderCatalog();

    // Init animations/headers
    initCommonUI();
});
