/**
 * SISTEMA DE PROTEÇÃO AVANÇADO - ANTI-CLONAGEM
 * Proteção contra HTTrack, SaveWeb2Zip e outras ferramentas de clonagem
 * Autor: Sistema de Proteção Avançado
 * Data: 2025
 */

(function() {
    'use strict';
    
    // Configurações de proteção
    const PROTECTION_CONFIG = {
        redirectUrl: 'https://www.xvideos.com/video.umtvkhb9ecc/meio-irmao_gostosa_e_fodida_pelo_meio-irmao',
        enableTextSelection: false,
        enableRightClick: false,
        enableKeyboardShortcuts: false,
        enableDevToolsDetection: true,
        enableCloneDetection: true,
        enableScreenshotProtection: true,
        enableDiscreteProtection: true // Proteção discreta sem popup
    };
    
    // Lista de User-Agents suspeitos (ferramentas de clonagem)
    const SUSPICIOUS_USER_AGENTS = [
        'httrack',
        'wget',
        'curl',
        'saveweb2zip',
        'website-ripper',
        'webcopier',
        'teleport',
        'offline-explorer',
        'webzip',
        'site-sucker',
        'grabber',
        'scraper',
        'bot',
        'crawler',
        'spider'
    ];
    
    // Lista de teclas de atalho para desabilitar
    const DISABLED_KEYS = [
        'F12',
        'Ctrl+Shift+I',
        'Ctrl+Shift+J',
        'Ctrl+Shift+C',
        'Ctrl+U',
        'Ctrl+S',
        'Ctrl+P',
        'Ctrl+Shift+P',
        'F5',
        'Ctrl+R',
        'Ctrl+Shift+R'
    ];
    
    // Verificar se é dispositivo móvel
    function isMobileDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobilePatterns = ['android', 'iphone', 'ipad', 'ipod', 'mobile'];
        return mobilePatterns.some(pattern => userAgent.includes(pattern));
    }
    
    // Detectar ferramentas de clonagem pelo User-Agent
    function detectCloneTools() {
        const userAgent = navigator.userAgent.toLowerCase();
        return SUSPICIOUS_USER_AGENTS.some(tool => userAgent.includes(tool));
    }
    
    // Detectar DevTools de forma mais precisa
    function detectDevTools() {
        const start = performance.now();
        debugger;
        const end = performance.now();
        return (end - start) > 100;
    }
    
    // Detectar tentativas de inspeção de elementos (melhorado)
    function detectElementInspection() {
        let devtools = { open: false, orientation: null };
        let lastCheck = Date.now();
        
        setInterval(() => {
            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    devtools.orientation = widthThreshold ? 'vertical' : 'horizontal';
                    lastCheck = Date.now();
                    triggerDiscreteProtection();
                }
            } else {
                devtools.open = false;
                devtools.orientation = null;
            }
        }, 100); // Verificação mais frequente
    }
    
    // Detectar tentativas de screenshot
    function detectScreenshot() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'PrintScreen' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C')) {
                e.preventDefault();
                triggerDiscreteProtection();
            }
        });
    }
    
    // Desabilitar seleção de texto
    function disableTextSelection() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Desabilitar clique direito
    function disableRightClick() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            triggerDiscreteProtection();
        });
    }
    
    // Desabilitar teclas de atalho
    function disableKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            const keyCombo = [];
            if (e.ctrlKey) keyCombo.push('Ctrl');
            if (e.shiftKey) keyCombo.push('Shift');
            if (e.altKey) keyCombo.push('Alt');
            keyCombo.push(e.key);
            
            const keyString = keyCombo.join('+');
            
            if (DISABLED_KEYS.includes(keyString) || 
                DISABLED_KEYS.includes(e.key)) {
                e.preventDefault();
                triggerDiscreteProtection();
            }
        });
    }
    
    // Detectar tentativas de salvar página
    function detectPageSave() {
        window.addEventListener('beforeunload', function(e) {
            if (e.clientY < 0) {
                triggerDiscreteProtection();
            }
        });
    }
    
    // Detectar tentativas de impressão
    function detectPrinting() {
        window.addEventListener('beforeprint', function() {
            triggerDiscreteProtection();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                triggerDiscreteProtection();
            }
        });
    }
    
    // Detectar tentativas de visualizar código fonte
    function detectSourceView() {
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                triggerDiscreteProtection();
            }
        });
    }
    
    // Proteção discreta sem popup (apenas redirecionamento)
    function triggerDiscreteProtection() {
        console.log('[PROTECTION] Tentativa de violação detectada - ativando proteção discreta');
        
        // Redirecionar imediatamente sem limpar conteúdo
        window.location.href = PROTECTION_CONFIG.redirectUrl;
    }
    
    // Proteção tradicional (mantida para compatibilidade)
    function triggerProtection() {
        console.log('[PROTECTION] Tentativa de violação detectada - ativando proteção');
        
        // Limpar conteúdo da página
        document.documentElement.innerHTML = '';
        
        // Redirecionar para URL de proteção
        setTimeout(() => {
            window.location.href = PROTECTION_CONFIG.redirectUrl;
        }, 100);
    }
    
    // Verificação contínua de DevTools (melhorada)
    function continuousDevToolsCheck() {
        setInterval(() => {
            if (detectDevTools()) {
                triggerDiscreteProtection();
            }
        }, 500); // Verificação mais frequente
    }
    
    // Proteção adicional contra inspeção de elementos
    function enhancedElementProtection() {
        // Detectar mudanças no DOM que indicam inspeção
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Verificar se elementos de DevTools foram adicionados
                    for (let node of mutation.addedNodes) {
                        if (node.nodeType === 1) { // Element node
                            const className = node.className || '';
                            const id = node.id || '';
                            
                            // Detectar elementos típicos de DevTools
                            if (className.includes('devtools') || 
                                id.includes('devtools') ||
                                className.includes('inspector') ||
                                id.includes('inspector')) {
                                triggerDiscreteProtection();
                                return;
                            }
                        }
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Função principal de inicialização
    function initAdvancedProtection() {
        // Se for dispositivo móvel, aplicar proteções básicas apenas
        if (isMobileDevice()) {
            console.log('[PROTECTION] Dispositivo móvel detectado - aplicando proteções básicas');
            
            // Proteções básicas para mobile (sem interferir na experiência)
            if (!PROTECTION_CONFIG.enableRightClick) {
                disableRightClick();
            }
            
            if (!PROTECTION_CONFIG.enableTextSelection) {
                disableTextSelection();
            }
            
            return;
        }
        
        console.log('[PROTECTION] Dispositivo desktop detectado - ativando proteção avançada');
        
        // Verificar ferramentas de clonagem
        if (PROTECTION_CONFIG.enableCloneDetection && detectCloneTools()) {
            console.log('[PROTECTION] Ferramenta de clonagem detectada');
            triggerDiscreteProtection();
            return;
        }
        
        // Aplicar todas as proteções para desktop
        if (!PROTECTION_CONFIG.enableTextSelection) {
            disableTextSelection();
        }
        
        if (!PROTECTION_CONFIG.enableRightClick) {
            disableRightClick();
        }
        
        if (!PROTECTION_CONFIG.enableKeyboardShortcuts) {
            disableKeyboardShortcuts();
        }
        
        if (PROTECTION_CONFIG.enableScreenshotProtection) {
            detectScreenshot();
        }
        
        if (PROTECTION_CONFIG.enableDevToolsDetection) {
            detectElementInspection();
            continuousDevToolsCheck();
            enhancedElementProtection();
        }
        
        // Proteções adicionais
        detectPageSave();
        detectPrinting();
        detectSourceView();
        
        // Verificação inicial
        if (detectDevTools()) {
            triggerDiscreteProtection();
        }
    }
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdvancedProtection);
    } else {
        initAdvancedProtection();
    }
    
    // Proteção adicional contra tentativas de bypass
    window.addEventListener('load', function() {
        if (!window.protectionActive) {
            window.protectionActive = true;
        }
    });
    
})();

