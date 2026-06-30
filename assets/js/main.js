import { Cart } from './modules/cart.js';
import { initCalculator } from './modules/calculator.js';
import { initCommonUI } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Cart Module
    const cart = new Cart();
    cart.init();

    // Bind Add to Cart buttons for the home page shop preview
    const addCartBtns = document.querySelectorAll('.btn-add-cart');
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const id = card.getAttribute('data-id');
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));

            cart.addItem(id, name, price);
        });
    });

    // Initialize subscription range calculator
    initCalculator();

    // Initialize animations and navigation actions
    initCommonUI();
});
