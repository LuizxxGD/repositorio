// iOS Unlocker Pro - Mobile Optimized JavaScript
// Created: 2025-01-05

// Performance optimization utilities
const PerformanceUtils = {
  // Throttle function to limit execution frequency
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Debounce function to delay execution
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Request animation frame wrapper
  raf: (callback) => {
    return requestAnimationFrame(callback);
  }
};

// Intersection Observer for lazy loading and performance
class LazyLoader {
  constructor() {
    this.observers = new Map();
  }

  observe(element, callback, options = {}) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);
    this.observers.set(element, observer);
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Optimized testimonials carousel
class TestimonialsCarousel {
  constructor() {
    this.images = [
      'dep/depoimento01iphone.jpg',
      'dep/depoimento02.jpg',
      'dep/depoimento3.jpeg',
      'dep/depoimento4.jpeg'
    ];
    this.currentIndex = 0;
    this.imageElement = document.getElementById('testimonial-image');
    this.interval = null;
    this.lazyLoader = new LazyLoader();
    this.init();
  }

  init() {
    if (!this.imageElement) return;

    // Only start carousel when visible
    this.lazyLoader.observe(this.imageElement.parentElement, () => {
      this.startCarousel();
    });
  }

  startCarousel() {
    if (this.interval) return;

    this.interval = setInterval(() => {
      this.changeImage();
    }, 3000);
  }

  changeImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.imageElement.style.opacity = '0';
    
    setTimeout(() => {
      this.imageElement.src = this.images[this.currentIndex];
      this.imageElement.style.opacity = '1';
    }, 250);
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.lazyLoader.disconnect();
  }
}

// Smooth scrolling with passive listeners
class SmoothScroller {
  constructor() {
    this.init();
  }

  init() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          this.scrollToElement(target);
        }
      }, { passive: false });
    });
  }

  scrollToElement(element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 80;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Optimized scroll handling
class ScrollHandler {
  constructor() {
    this.ticking = false;
    this.init();
  }

  init() {
    window.addEventListener('scroll', 
      PerformanceUtils.throttle(this.handleScroll.bind(this), 16), 
      { passive: true }
    );
  }

  handleScroll() {
    if (!this.ticking) {
      PerformanceUtils.raf(() => {
        this.updateScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updateScroll() {
    // Add scroll-based animations here if needed
    // Example: parallax effects, scroll-triggered animations
  }
}

// Image preloader for better performance
class ImagePreloader {
  constructor() {
    this.preloadedImages = new Set();
  }

  preload(images) {
    images.forEach(src => {
      if (!this.preloadedImages.has(src)) {
        const img = new Image();
        img.src = src;
        this.preloadedImages.add(src);
      }
    });
  }

  preloadCritical() {
    const criticalImages = [
      'dep/depoimento02.jpg',
      'dep/depoimento3.jpeg',
      'dep/depoimento4.jpeg'
    ];
    
    // Preload after initial render
    setTimeout(() => {
      this.preload(criticalImages);
    }, 1000);
  }
}

// Service Worker registration
class ServiceWorkerManager {
  static register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered successfully:', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed:', registrationError);
          });
      });
    }
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Monitor Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
  }

  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        console.log('LCP:', this.metrics.lcp);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          console.log('FID:', this.metrics.fid);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
            console.log('CLS:', this.metrics.cls);
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }
}

// Carrossel de Bônus
class BonusesCarousel {
  constructor() {
    this.currentIndex = 0;
    this.interval = null;
    this.init();
  }

  init() {
    // Aguardar o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupCarousel());
    } else {
      this.setupCarousel();
    }
  }

  setupCarousel() {
    this.track = document.querySelector('.carousel-track');
    this.cards = document.querySelectorAll('.carousel-container .bonus-card');
    this.indicators = document.querySelectorAll('.indicator');
    this.totalCards = this.cards.length;

    if (!this.track || this.cards.length === 0) {
      console.log('Carrossel de bônus não encontrado');
      return;
    }

    // Ativar o primeiro card
    this.showCard(0);
    
    // Iniciar o carrossel automático
    this.startCarousel();
    
    // Adicionar eventos aos indicadores
    this.setupIndicators();
  }

  startCarousel() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    
    // Iniciar o carrossel automático a cada 4 segundos
    this.interval = setInterval(() => {
      this.nextCard();
    }, 4000);
  }

  nextCard() {
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.showCard(this.currentIndex);
  }

  showCard(index) {
    // Esconder todos os cards
    this.cards.forEach(card => {
      card.classList.remove('active');
      card.style.opacity = '0.5';
      card.style.transform = 'scale(0.8)';
    });

    // Remover classes ativas de todos os indicadores
    this.indicators.forEach(indicator => {
      indicator.classList.remove('active');
      indicator.style.background = 'rgba(255, 255, 255, 0.3)';
    });

    // Mostrar o card atual
    if (this.cards[index]) {
      this.cards[index].classList.add('active');
      this.cards[index].style.opacity = '1';
      this.cards[index].style.transform = 'scale(1)';
    }

    // Ativar o indicador atual
    if (this.indicators[index]) {
      this.indicators[index].classList.add('active');
      this.indicators[index].style.background = '#ff6600';
    }
  }

  setupIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.currentIndex = index;
        this.showCard(index);
        
        // Reiniciar o intervalo
        if (this.interval) {
          clearInterval(this.interval);
          this.startCarousel();
        }
      });
    });
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Main application class
class IOSUnlockerApp {
  constructor() {
    this.carousel = null;
    this.bonusesCarousel = null;
    this.scroller = null;
    this.scrollHandler = null;
    this.imagePreloader = null;
    this.performanceMonitor = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Initialize components
    this.carousel = new TestimonialsCarousel();
    this.bonusesCarousel = new BonusesCarousel();
    this.scroller = new SmoothScroller();
    this.scrollHandler = new ScrollHandler();
    this.imagePreloader = new ImagePreloader();
    this.performanceMonitor = new PerformanceMonitor();

    // Preload critical images
    this.imagePreloader.preloadCritical();

    // Register service worker
    ServiceWorkerManager.register();

    // Add focus management for accessibility
    this.setupAccessibility();

    console.log('iOS Unlocker Pro - Mobile Optimized Version Loaded');
  }

  setupAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Add focus indicators
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
        element.classList.add('focus-visible');
      });

      element.addEventListener('blur', () => {
        element.classList.remove('focus-visible');
      });
    });
  }

  destroy() {
    if (this.carousel) {
      this.carousel.destroy();
    }
    if (this.bonusesCarousel) {
      this.bonusesCarousel.destroy();
    }
    // Clean up other resources if needed
  }
}

// Initialize the application
const app = new IOSUnlockerApp();

// Export for potential external use
window.IOSUnlockerApp = app;
