/**
 * Class representing the Shopping Cart state and UI management.
 * Persists data inside localStorage and dynamically handles cart drawers.
 */
export class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('khipu_cart_items')) || [];
        this.sidebar = null;
        this.overlay = null;
        this.container = null;
        this.badge = null;
        this.totalVal = null;
        this.checkoutBtn = null;
    }

    /**
     * Initialize DOM elements and register common event listeners.
     */
    init() {
        this.sidebar = document.getElementById('cart-sidebar');
        this.overlay = document.getElementById('cart-overlay');
        this.container = document.getElementById('cart-items-container');
        this.badge = document.getElementById('cart-count');
        this.totalVal = document.getElementById('cart-total-val');
        this.checkoutBtn = document.getElementById('cart-checkout-btn');

        const toggleBtn = document.getElementById('cart-toggle');
        const closeBtn = document.getElementById('cart-close');

        if (toggleBtn) toggleBtn.addEventListener('click', () => this.toggle());
        if (closeBtn) closeBtn.addEventListener('click', () => this.toggle());
        if (this.overlay) this.overlay.addEventListener('click', () => this.toggle());

        if (this.checkoutBtn) {
            this.checkoutBtn.addEventListener('click', () => this.checkout());
        }

        this.updateUI();
    }

    toggle() {
        if (this.sidebar) this.sidebar.classList.toggle('active');
        if (this.overlay) this.overlay.classList.toggle('active');
    }

    open() {
        if (this.sidebar) this.sidebar.classList.add('active');
        if (this.overlay) this.overlay.classList.add('active');
    }

    addItem(id, name, price) {
        const existingItem = this.items.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id,
                name,
                price,
                quantity: 1
            });
        }

        this.save();
        this.updateUI();
        this.open();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
        this.updateUI();
    }

    save() {
        localStorage.setItem('khipu_cart_items', JSON.stringify(this.items));
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateUI() {
        if (!this.container) return;

        this.container.innerHTML = '';

        if (this.items.length === 0) {
            this.container.innerHTML = '<p class="empty-cart-msg">Tu carrito está vacío.</p>';
            if (this.badge) this.badge.innerText = '0';
            if (this.totalVal) this.totalVal.innerText = '$0.00';
            if (this.checkoutBtn) this.checkoutBtn.disabled = true;
            return;
        }

        if (this.checkoutBtn) this.checkoutBtn.disabled = false;
        let totalItems = 0;
        let totalPrice = 0;

        this.items.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Cantidad: ${item.quantity} (250g)</p>
                </div>
                <div class="cart-item-right">
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            
            cartItemEl.querySelector('.remove-item-btn').addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-id');
                this.removeItem(itemId);
            });

            this.container.appendChild(cartItemEl);
        });

        if (this.badge) this.badge.innerText = totalItems;
        if (this.totalVal) this.totalVal.innerText = `$${totalPrice.toFixed(2)}`;
    }

    checkout() {
        if (this.items.length === 0) return;

        const total = this.totalVal ? this.totalVal.innerText : `$${this.getTotalPrice().toFixed(2)}`;
        
        if (this.checkoutBtn) {
            this.checkoutBtn.disabled = true;
            this.checkoutBtn.innerText = 'Abriendo PayPhone...';
        }

        setTimeout(() => {
            alert(`¡Simulación de Compra Exitosa!\nMonto total cobrado: ${total} USD.\n\nGracias por apoyar a los caficultores locales a través de Khipu Coffee Roasters.`);
            this.items = [];
            this.save();
            this.updateUI();
            this.toggle();
            
            if (this.checkoutBtn) {
                this.checkoutBtn.disabled = false;
                this.checkoutBtn.innerText = 'Proceder al pago con PayPhone';
            }
        }, 1500);
    }
}
