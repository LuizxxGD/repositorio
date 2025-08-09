// Performance optimized script with debouncing and lazy loading
(function() {
    'use strict';
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    // Smooth scroll with performance optimization
    const smoothScroll = debounce((target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 100);
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Add smooth scroll to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                smoothScroll(this.getAttribute('href'));
            });
        });
        
        // Optimize scroll events
        let ticking = false;
        const scrollHandler = debounce(() => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-based animations here
                    ticking = false;
                });
                ticking = true;
            }
        }, 16); // 60fps
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
        
        // Initialize lazy loading for images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    });
    
    // Service Worker registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
})();
