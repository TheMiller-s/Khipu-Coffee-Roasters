import { Cart } from './modules/cart.js';
import { initCommonUI } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Cart
    const cart = new Cart();
    cart.init();

    // Map Interactivity Logic
    const mapIframe = document.getElementById('map-iframe');
    const localeCards = document.querySelectorAll('.locale-card');

    localeCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Find map link from card data-map attribute
            const mapUrl = card.getAttribute('data-map');
            if (mapUrl && mapIframe) {
                // Highlight active card
                localeCards.forEach(c => c.style.borderColor = 'rgba(252, 251, 250, 0.08)');
                card.style.borderColor = 'var(--color-terracotta)';

                // Update iframe source
                mapIframe.src = mapUrl;

                // Smooth scroll to map section
                const mapSection = document.getElementById('mapa');
                if (mapSection) {
                    mapSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Initialize animations and navigation actions
    initCommonUI();
});
