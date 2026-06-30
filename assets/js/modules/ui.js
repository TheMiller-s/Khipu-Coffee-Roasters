/**
 * General UI Module for scroll-reveals, mobile toggles, and navigation actions.
 */
export function initCommonUI() {
    // ==========================================
    // ACTIVE NAVIGATION LINKS HIGHLIGHT
    // ==========================================
    // Auto-highlight based on current page filename
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // If link points to home page sections and we are on home page
        if (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '') {
            // Let scroll handle it (or basic hash check)
            if (window.location.hash === linkHref) {
                link.classList.add('active');
            }
        } else {
            // We are on a subpage like pages/productos.html
            if (linkHref.includes(currentPath.split('/').pop())) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });

    // Handle scroll highlight if on home page
    const sections = document.querySelectorAll('main section[id]');
    if (sections.length > 0 && (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '')) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollPosition >= sectionTop - 120) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = [
        ...document.querySelectorAll('.feature-item'),
        ...document.querySelectorAll('.product-card'),
        ...document.querySelectorAll('.visual-card-wrap'),
        ...document.querySelectorAll('.sub-calculator-card'),
        ...document.querySelectorAll('.sub-info-content'),
        ...document.querySelectorAll('.narrative-block'),
        ...document.querySelectorAll('.quote-block'),
        ...document.querySelectorAll('.locale-card'),
        ...document.querySelectorAll('.map-container')
    ];

    if (revealElements.length > 0) {
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
}
