// Cache Optimizer - Otimizações para PageSpeed Insights
// Adicione este script no final do seu HTML, antes do </body>

(function() {
  'use strict';
  
  // Cache configuration
  const cacheConfig = {
    // Static assets cache duration (in seconds)
    staticAssets: 31536000, // 1 year
    
    // Dynamic content cache duration (in seconds)
    dynamicContent: 3600, // 1 hour
    
    // API responses cache duration (in seconds)
    apiResponses: 1800, // 30 minutes
    
    // Critical resources that should always be cached
    criticalResources: [
      'css/styles.css',
      'js/script.js',
      'img/paredeoficial.jpg',
      'img/COMUNIDADE-removebg-preview.png'
    ],
    
    // Resources that can be cached for a long time
    longTermCache: [
      'img/md1.png',
      'img/md2.png',
      'img/md3.png',
      'img/md4.png',
      'img/BONUS 1.png',
      'img/BONUS 3.png',
      'img/BONUS 4.png',
      'img/BONUS 5.png',
      'img/BONUS 6.png',
      'dep/depoimento01iphone.jpg',
      'dep/depoimento02.jpg',
      'dep/depoimento3.jpeg',
      'dep/depoimento4.jpeg'
    ]
  };
  
  // Service Worker for advanced caching
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }
  
  // Browser cache optimization
  function optimizeBrowserCache() {
    // Add cache headers for static assets
    const links = document.querySelectorAll('link[rel="stylesheet"], script[src]');
    
    links.forEach(link => {
      const href = link.href || link.src;
      if (href) {
        // Add version parameter for cache busting
        if (href.includes('styles.css')) {
          link.href = href + '?v=' + Date.now();
        }
        if (href.includes('script.js')) {
          link.src = href + '?v=' + Date.now();
        }
      }
    });
  }
  
  // Local Storage optimization
  function optimizeLocalStorage() {
    // Cache critical data in localStorage
    const criticalData = {
      lastVisit: Date.now(),
      userPreferences: {
        theme: 'dark',
        language: 'pt-BR'
      }
    };
    
    try {
      localStorage.setItem('iosUnlockerCache', JSON.stringify(criticalData));
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
  }
  
  // Session Storage optimization
  function optimizeSessionStorage() {
    // Cache session-specific data
    const sessionData = {
      pageLoadTime: Date.now(),
      scrollPosition: 0,
      formData: {}
    };
    
    try {
      sessionStorage.setItem('iosUnlockerSession', JSON.stringify(sessionData));
    } catch (e) {
      console.warn('SessionStorage not available:', e);
    }
  }
  
  // IndexedDB optimization for larger data
  function optimizeIndexedDB() {
    if ('indexedDB' in window) {
      const request = indexedDB.open('iosUnlockerDB', 1);
      
      request.onerror = function() {
        console.warn('IndexedDB not available');
      };
      
      request.onsuccess = function(event) {
        const db = event.target.result;
        
        // Create object store for caching
        if (!db.objectStoreNames.contains('cache')) {
          const objectStore = db.createObjectStore('cache', { keyPath: 'key' });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
      
      request.onupgradeneeded = function(event) {
        const db = event.target.result;
        
        if (!db.objectStoreNames.contains('cache')) {
          const objectStore = db.createObjectStore('cache', { keyPath: 'key' });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    }
  }
  
  // Memory cache optimization
  function optimizeMemoryCache() {
    // Cache DOM elements that are frequently accessed
    window.domCache = {
      heroSection: null,
      ctaButton: null,
      modulesSection: null,
      bonusSection: null,
      plansSection: null
    };
    
    // Populate cache when DOM is ready
    function populateCache() {
      window.domCache.heroSection = document.querySelector('.hero-section');
      window.domCache.ctaButton = document.querySelector('.cta-button');
      window.domCache.modulesSection = document.querySelector('.modules-section');
      window.domCache.bonusSection = document.querySelector('.bonus-section');
      window.domCache.plansSection = document.querySelector('.plans-section');
    }
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', populateCache);
    } else {
      populateCache();
    }
  }
  
  // Resource hints optimization
  function optimizeResourceHints() {
    // DNS prefetch for external domains
    const externalDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'i.postimg.cc',
      'cdn.utmify.com.br'
    ];
    
    externalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
    
    // Preconnect for critical external resources
    const criticalDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ];
    
    criticalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = `https://${domain}`;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
  
  // Cache invalidation strategy
  function setupCacheInvalidation() {
    // Invalidate cache when content changes
    const cacheVersion = '1.0.0';
    
    // Check if cache version has changed
    const currentVersion = localStorage.getItem('cacheVersion');
    if (currentVersion !== cacheVersion) {
      // Clear old cache
      localStorage.clear();
      sessionStorage.clear();
      
      // Set new version
      localStorage.setItem('cacheVersion', cacheVersion);
      
      // Reload page to apply new cache
      // window.location.reload();
    }
  }
  
  // Performance monitoring for cache
  function monitorCachePerformance() {
    if ('performance' in window) {
      // Monitor resource loading performance
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource') {
            // Log slow resources
            if (entry.duration > 1000) {
              console.warn('Slow resource loaded:', entry.name, entry.duration + 'ms');
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    }
  }
  
  // Cache warming strategy
  function warmCache() {
    // Preload critical resources in background
    const criticalResources = [
      'css/styles.css',
      'js/script.js',
      'img/paredeoficial.jpg'
    ];
    
    criticalResources.forEach(resource => {
      if (resource.includes('.css')) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
      } else if (resource.includes('.js')) {
        const script = document.createElement('script');
        script.src = resource;
        script.async = true;
        document.head.appendChild(script);
      } else if (resource.includes('.jpg') || resource.includes('.png')) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
      }
    });
  }
  
  // Initialize cache optimizations
  function init() {
    registerServiceWorker();
    optimizeBrowserCache();
    optimizeLocalStorage();
    optimizeSessionStorage();
    optimizeIndexedDB();
    optimizeMemoryCache();
    optimizeResourceHints();
    setupCacheInvalidation();
    monitorCachePerformance();
    warmCache();
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export functions for external use
  window.CacheOptimizer = {
    registerServiceWorker,
    optimizeBrowserCache,
    optimizeLocalStorage,
    optimizeSessionStorage,
    optimizeIndexedDB,
    optimizeMemoryCache,
    optimizeResourceHints,
    setupCacheInvalidation,
    monitorCachePerformance,
    warmCache
  };
})();
