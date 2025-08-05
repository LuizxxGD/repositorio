// Optimized JavaScript for iOS Unlocker Pro
// Performance optimizations and modern best practices

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all optimizations
  initializeOptimizations();
});

// Main initialization function
function initializeOptimizations() {
  // Initialize smooth scrolling with passive listeners
  initSmoothScrolling();
  
  // Initialize testimonials carousel
  initTestimonialsCarousel();
  
  // Initialize performance optimizations
  initPerformanceOptimizations();
  
  // Initialize accessibility improvements
  initAccessibility();
}

// Smooth scrolling with passive event listeners
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, { passive: false });
  });
}

// Optimized testimonials carousel
function initTestimonialsCarousel() {
  const images = [
    'dep/depoimento02.jpg',
    'dep/depoimento3.jpeg', 
    'dep/depoimento4.jpeg',
    'dep/depoimento01iphone.jpg'
  ];
  
  let currentIndex = 0;
  const imageElement = document.getElementById('testimonial-image');
  
  if (imageElement) {
    // Preload images for better performance
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    function changeImage() {
      currentIndex = (currentIndex + 1) % images.length;
      imageElement.style.opacity = '0';
      
      setTimeout(() => {
        imageElement.src = images[currentIndex];
        imageElement.style.opacity = '1';
      }, 250);
    }
    
    // Change image every 3 seconds
    setInterval(changeImage, 3000);
  }
}

// Performance optimizations
function initPerformanceOptimizations() {
  // Optimize scroll handling with throttling
  let ticking = false;
  
  function updateScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Minimal scroll-based updates if needed
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Use passive listener for better scroll performance
  window.addEventListener('scroll', updateScroll, { passive: true });
  
  // Optimize images with lazy loading
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
    
    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Optimize animations with will-change
  const animatedElements = document.querySelectorAll('.module-card, .bonus-card, .info-card, .cta-button');
  animatedElements.forEach(el => {
    el.style.willChange = 'transform';
  });
  
  // Remove will-change after animations to save memory
  animatedElements.forEach(el => {
    el.addEventListener('transitionend', () => {
      el.style.willChange = 'auto';
    }, { once: true });
  });
}

// Accessibility improvements
function initAccessibility() {
  // Add focus indicators for keyboard navigation
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid #ff8c00';
      this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });
  
  // Add ARIA labels for better screen reader support
  const testimonialImage = document.getElementById('testimonial-image');
  if (testimonialImage) {
    testimonialImage.setAttribute('alt', 'Depoimento de aluno sobre o curso de desbloqueio de iPhones');
  }
  
  // Add skip link for accessibility
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Pular para o conteúdo principal';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #ff8c00;
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
  `;
  skipLink.addEventListener('focus', function() {
    this.style.top = '6px';
  });
  skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content landmark
  const mainContent = document.querySelector('.hero-content');
  if (mainContent) {
    mainContent.id = 'main-content';
    mainContent.setAttribute('role', 'main');
  }
}

// Optimized event handlers with passive listeners where possible
function addOptimizedEventListeners() {
  // CTA button interactions
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    // Use passive listeners for touch events
    button.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    }, { passive: true });
    
    button.addEventListener('touchend', function() {
      this.style.transform = '';
    }, { passive: true });
    
    // Mouse events
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
    }, { passive: true });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
    }, { passive: true });
  });
  
  // Card hover effects with passive listeners
  const cards = document.querySelectorAll('.module-card, .bonus-card, .info-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    }, { passive: true });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    }, { passive: true });
  });
}

// Utility function for throttling
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
  };
}

// Optimized ripple effect (if needed)
function createOptimizedRipple(event, button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  `;
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Initialize additional optimizations after load
window.addEventListener('load', () => {
  // Add optimized event listeners
  addOptimizedEventListeners();
  
  // Log performance metrics
  if ('performance' in window) {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Site loaded in:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
  }
  
  // Remove loading states
  document.body.classList.add('loaded');
});

// Export functions for potential external use
window.iOSUnlockerPro = {
  initOptimizations: initializeOptimizations,
  initSmoothScrolling,
  initTestimonialsCarousel,
  initPerformanceOptimizations,
  initAccessibility
};
