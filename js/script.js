// Performance optimized script with advanced optimizations
(function() {
    'use strict';
    
    // Advanced debounce function for performance
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }
    
    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Optimized Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
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
        
        // Optimize scroll events with throttling
        const scrollHandler = throttle(() => {
            // Use requestIdleCallback for non-critical scroll operations
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    // Scroll-based animations here
                }, { timeout: 1000 });
            }
        }, 16); // 60fps
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
        
        // Initialize lazy loading for images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        // Preload critical images after initial render
        setTimeout(() => {
            preloadCriticalImages();
        }, 2000);
    });
    
    // Optimized image preloading
    function preloadCriticalImages() {
        const criticalImages = [
            'dep/depoimento02.jpg',
            'dep/depoimento3.jpeg',
            'dep/depoimento4.jpeg'
        ];
        
        // Use requestIdleCallback for non-critical preloading
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                criticalImages.forEach(src => {
                    const img = new Image();
                    img.src = src;
                });
            }, { timeout: 3000 });
        } else {
            // Fallback for older browsers
            criticalImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }
    }
    
    // Service Worker registration with error handling
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Use requestIdleCallback for SW registration
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    registerServiceWorker();
                }, { timeout: 5000 });
            } else {
                setTimeout(registerServiceWorker, 1000);
            }
        });
    }
    
    function registerServiceWorker() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
                    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
                }
            }, 0);
        });
    }
})();
