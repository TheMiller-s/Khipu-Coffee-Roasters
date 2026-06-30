import { Cart } from './modules/cart.js';
import { initCommonUI } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Cart Module (persisted state)
    const cart = new Cart();
    cart.init();

    // Initialize animations and navigation actions
    initCommonUI();
});
