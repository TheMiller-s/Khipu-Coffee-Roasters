/**
 * Module representing the Club Khipu Coffee Subscription Calculator.
 */
export function initCalculator() {
    const cupsRange = document.getElementById('cups-range');
    const cupsValueDisplay = document.getElementById('cups-value');
    const supplyQtyDisplay = document.getElementById('supply-qty');
    const supplyPriceDisplay = document.getElementById('supply-price');
    const btnSubscribe = document.getElementById('btn-subscribe');

    if (!cupsRange) return; // Only execute if range slider is on page

    // Subscription pricing mapping based on cups/day
    const subscriptionTiers = {
        1: { bags: 1, price: 15.00, label: '1 bolsa de 250g' },
        2: { bags: 2, price: 26.00, label: '2 bolsas de 250g' },
        3: { bags: 3, price: 38.00, label: '3 bolsas de 250g' },
        4: { bags: 4, price: 48.00, label: '4 bolsas de 250g' },
        5: { bags: 6, price: 69.00, label: '6 bolsas de 250g (Familiar)' }
    };

    function updateCalculator() {
        const cups = cupsRange.value;
        const tier = subscriptionTiers[cups];
        
        // Update display text
        cupsValueDisplay.innerText = cups === '5' ? '5 o más tazas' : `${cups} ${cups === '1' ? 'taza' : 'tazas'}`;
        supplyQtyDisplay.innerText = tier.label;
        supplyPriceDisplay.innerText = `$${tier.price.toFixed(2)}`;

        // Polished Interaction: Color the range track up to current value
        const min = cupsRange.min || 1;
        const max = cupsRange.max || 5;
        const percent = ((cups - min) / (max - min)) * 100;
        cupsRange.style.background = `linear-gradient(to right, var(--color-terracotta) 0%, var(--color-terracotta) ${percent}%, rgba(252, 251, 250, 0.15) ${percent}%, rgba(252, 251, 250, 0.15) 100%)`;

        // Polished Interaction: Highlight active label underneath range input
        const labels = document.querySelectorAll('.range-labels span');
        labels.forEach((label, index) => {
            if (index === parseInt(cups) - 1) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });

        // Polished Interaction: Trigger CSS pop animation on values
        const animElements = [cupsValueDisplay, supplyQtyDisplay, supplyPriceDisplay];
        animElements.forEach(el => {
            if (el) {
                el.classList.remove('animate-pop');
                void el.offsetWidth; // Force DOM reflow to restart animation
                el.classList.add('animate-pop');
            }
        });
    }

    cupsRange.addEventListener('input', updateCalculator);
    // Initial call
    updateCalculator();

    if (btnSubscribe) {
        btnSubscribe.addEventListener('click', () => {
            const cups = cupsRange.value;
            const grindSelect = document.getElementById('grind-select');
            const grind = grindSelect.options[grindSelect.selectedIndex].text;
            const tier = subscriptionTiers[cups];
            
            alert(`¡Excelente elección!\nTe estás suscribiendo al Club Khipu con el plan de "${tier.label}" (${grind}) por $${tier.price.toFixed(2)} al mes.\n\n(Simulación: Redirigiendo a pasarela PayPhone...)`);
        });
    }
}
