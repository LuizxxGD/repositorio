// Performance Optimizer - Otimizações para PageSpeed Insights
// Adicione este script no final do seu HTML, antes do </body>

(function() {
  'use strict';
  
  // Preload critical resources
  function preloadCriticalResources() {
    const criticalImages = [
      'img/paredeoficial.jpg',
      'img/COMUNIDADE-removebg-preview.png'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  }
  
  // Lazy load images with Intersection Observer
  function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  // Optimize JavaScript execution
  function optimizeJavaScript() {
    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
      script.setAttribute('defer', '');
    });
    
    // Preload external resources
    const externalResources = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
      'https://cdn.utmify.com.br/scripts/pixel/pixel.js'
    ];
    
    externalResources.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      if (href.includes('css')) {
        link.as = 'style';
        link.onload = function() {
          this.rel = 'stylesheet';
        };
      } else {
        link.as = 'script';
      }
      document.head.appendChild(link);
    });
  }
  
  // Optimize CSS delivery
  function optimizeCSS() {
    // Inline critical CSS
    const criticalCSS = `
      .hero-section { position: relative; width: 100%; height: 100vh; min-height: 600px; }
      .hero-background { background-image: url("img/paredeoficial.jpg"); background-size: cover; background-position: center; width: 100%; height: 100%; position: absolute; top: 0; left: 0; filter: brightness(50%); }
      .hero-content { position: relative; z-index: 4; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 1rem; max-width: 100%; }
      .hero-title { font-size: clamp(2rem, 8vw, 4rem); margin-bottom: 0.8rem; line-height: 1.1; font-weight: 800; margin-top: 0; }
      .cta-button { display: inline-flex; align-items: center; gap: 10px; padding: 1rem 2rem; background: linear-gradient(45deg, rgb(106, 13, 173), rgb(255, 140, 0)); color: white; border: none; border-radius: 50px; font-size: clamp(0.9rem, 3vw, 1.1rem); text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(255, 140, 0, 0.3); cursor: pointer; }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  }
  
  // Optimize images
  function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" for images below the fold
      if (!img.classList.contains('hero-logo') && !img.classList.contains('hero-background')) {
        img.loading = 'lazy';
      }
      
      // Add fetchpriority for critical images
      if (img.classList.contains('hero-logo') || img.classList.contains('hero-background')) {
        img.fetchPriority = 'high';
      }
      
      // Add proper alt attributes if missing
      if (!img.alt) {
        img.alt = 'Imagem do curso iOS Unlocker Pro';
      }
    });
  }
  
  // Optimize fonts
  function optimizeFonts() {
    // Preload font files
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
      link.rel = 'preload';
      link.as = 'style';
      link.onload = function() {
        this.rel = 'stylesheet';
      };
    });
  }
  
  // Reduce layout shifts
  function reduceLayoutShifts() {
    // Set explicit dimensions for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.style.width && !img.style.height) {
        img.style.width = '100%';
        img.style.height = 'auto';
      }
    });
    
    // Reserve space for dynamic content
    const containers = document.querySelectorAll('.module-card, .bonus-card, .plan-card');
    containers.forEach(container => {
      if (!container.style.minHeight) {
        container.style.minHeight = '200px';
      }
    });
  }
  
  // Optimize third-party scripts
  function optimizeThirdPartyScripts() {
    // Load UTMify script with lower priority
    const utmifyScript = document.querySelector('script[src*="latest.js"]');
    if (utmifyScript) {
      utmifyScript.setAttribute('data-utmify-prevent-xcod-sck', '');
      utmifyScript.setAttribute('data-utmify-prevent-subids', '');
      utmifyScript.async = true;
      utmifyScript.defer = true;
    }
    
    // Load pixel script with lower priority
    const pixelScript = document.querySelector('script[src*="pixel.js"]');
    if (pixelScript) {
      pixelScript.async = true;
      pixelScript.defer = true;
    }
  }
  
  // Initialize optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      preloadCriticalResources();
      setupLazyLoading();
      optimizeJavaScript();
      optimizeCSS();
      optimizeImages();
      optimizeFonts();
      reduceLayoutShifts();
      optimizeThirdPartyScripts();
    });
  } else {
    preloadCriticalResources();
    setupLazyLoading();
    optimizeJavaScript();
    optimizeCSS();
    optimizeImages();
    optimizeFonts();
    reduceLayoutShifts();
    optimizeThirdPartyScripts();
  }
  
  // Performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          console.log('Performance Metrics:', {
            'First Contentful Paint': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            'Largest Contentful Paint': perfData.loadEventEnd - perfData.loadEventStart,
            'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
          });
        }
      }, 0);
    });
  }
})();
