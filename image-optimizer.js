// Image Optimizer - Otimizações para PageSpeed Insights
// Adicione este script no final do seu HTML, antes do </body>

(function() {
  'use strict';
  
  // Image optimization configuration
  const imageConfig = {
    // Critical images that should load immediately
    critical: [
      'img/paredeoficial.jpg',
      'img/COMUNIDADE-removebg-preview.png'
    ],
    
    // Images that can be lazy loaded
    lazy: [
      'img/md1.png',
      'img/md2.png', 
      'img/md3.png',
      'img/md4.png',
      'img/BONUS 1.png',
      'img/BONUS 3.png',
      'img/BONUS 4.png',
      'img/BONUS 5.png',
      'img/BONUS 6.png',
      'img/depoimento01iphone.jpg',
      'img/ferramentas-removebg-preview.png',
      'img/servidores-removebg-preview.png',
      'dep/depoimento02.jpg',
      'dep/depoimento3.jpeg',
      'dep/depoimento4.jpeg'
    ],
    
    // Image quality settings
    quality: {
      webp: 0.8,
      jpeg: 0.85,
      png: 0.9
    },
    
    // Responsive image sizes
    sizes: {
      mobile: 480,
      tablet: 768,
      desktop: 1200
    }
  };
  
  // Convert images to WebP if supported
  function convertToWebP() {
    if (!window.supportsWebP) return;
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.src && (img.src.includes('.jpg') || img.src.includes('.png'))) {
        const webpSrc = img.src.replace(/\.(jpg|png)/, '.webp');
        
        // Create WebP image element
        const webpImg = new Image();
        webpImg.onload = function() {
          img.src = webpSrc;
        };
        webpImg.src = webpSrc;
      }
    });
  }
  
  // Optimize image loading
  function optimizeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
      // Add loading="lazy" for non-critical images
      if (!imageConfig.critical.includes(img.src)) {
        img.loading = 'lazy';
      }
      
      // Add fetchpriority for critical images
      if (imageConfig.critical.includes(img.src)) {
        img.fetchPriority = 'high';
      }
      
      // Add proper alt attributes
      if (!img.alt) {
        img.alt = `Imagem ${index + 1} do curso iOS Unlocker Pro`;
      }
      
      // Add aspect ratio to prevent layout shifts
      if (img.naturalWidth && img.naturalHeight) {
        img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
      }
      
      // Add error handling
      img.onerror = function() {
        this.style.display = 'none';
        console.warn(`Failed to load image: ${this.src}`);
      };
    });
  }
  
  // Create responsive images
  function createResponsiveImages() {
    const images = document.querySelectorAll('img[data-responsive]');
    
    images.forEach(img => {
      const srcset = [];
      const sizes = [];
      
      // Generate srcset for different screen sizes
      Object.entries(imageConfig.sizes).forEach(([device, width]) => {
        const responsiveSrc = img.src.replace(/\.(jpg|png|webp)/, `-${device}.$1`);
        srcset.push(`${responsiveSrc} ${width}w`);
        sizes.push(`(max-width: ${width}px) ${width}px`);
      });
      
      if (srcset.length > 0) {
        img.srcset = srcset.join(', ');
        img.sizes = sizes.join(', ');
      }
    });
  }
  
  // Optimize background images
  function optimizeBackgroundImages() {
    const elements = document.querySelectorAll('[style*="background-image"]');
    
    elements.forEach(element => {
      const style = element.getAttribute('style');
      if (style && style.includes('background-image')) {
        // Add will-change for better performance
        element.style.willChange = 'transform';
        
        // Add contain property to prevent layout shifts
        element.style.contain = 'layout style paint';
      }
    });
  }
  
  // Preload critical images
  function preloadCriticalImages() {
    imageConfig.critical.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  }
  
  // Optimize image compression
  function optimizeImageCompression() {
    // This would typically be done server-side
    // Here we just add data attributes for server optimization
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      if (img.src.includes('.jpg') || img.src.includes('.jpeg')) {
        img.setAttribute('data-optimize', 'jpeg');
        img.setAttribute('data-quality', imageConfig.quality.jpeg);
      } else if (img.src.includes('.png')) {
        img.setAttribute('data-optimize', 'png');
        img.setAttribute('data-quality', imageConfig.quality.png);
      }
    });
  }
  
  // Add image loading states
  function addLoadingStates() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading class
      img.classList.add('image-loading');
      
      // Remove loading class when image loads
      img.onload = function() {
        this.classList.remove('image-loading');
        this.classList.add('image-loaded');
      };
      
      // Add error class if image fails to load
      img.onerror = function() {
        this.classList.remove('image-loading');
        this.classList.add('image-error');
      };
    });
  }
  
  // Optimize for Core Web Vitals
  function optimizeCoreWebVitals() {
    // Reduce Cumulative Layout Shift (CLS)
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Set explicit dimensions to prevent layout shifts
      if (img.naturalWidth && img.naturalHeight) {
        img.style.width = img.naturalWidth + 'px';
        img.style.height = img.naturalHeight + 'px';
      }
      
      // Add placeholder dimensions for images without natural dimensions
      if (!img.naturalWidth || !img.naturalHeight) {
        img.style.minHeight = '200px';
        img.style.minWidth = '100%';
      }
    });
    
    // Optimize Largest Contentful Paint (LCP)
    const heroImage = document.querySelector('.hero-background');
    if (heroImage) {
      heroImage.style.contentVisibility = 'auto';
      heroImage.style.containIntrinsicSize = '0 600px';
    }
  }
  
  // Check WebP support
  function checkWebPSupport() {
    const webp = new Image();
    webp.onload = webp.onerror = function() {
      window.supportsWebP = webp.height === 2;
      if (window.supportsWebP) {
        convertToWebP();
      }
    };
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  
  // Initialize image optimizations
  function init() {
    checkWebPSupport();
    preloadCriticalImages();
    optimizeImageLoading();
    createResponsiveImages();
    optimizeBackgroundImages();
    optimizeImageCompression();
    addLoadingStates();
    optimizeCoreWebVitals();
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export functions for external use
  window.ImageOptimizer = {
    convertToWebP,
    optimizeImageLoading,
    createResponsiveImages,
    optimizeBackgroundImages,
    preloadCriticalImages,
    optimizeImageCompression,
    addLoadingStates,
    optimizeCoreWebVitals
  };
})();
