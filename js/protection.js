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
        enableScreenshotProtection: true
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
    
    // Detectar DevTools
    function detectDevTools() {
        const start = performance.now();
        debugger;
        const end = performance.now();
        return (end - start) > 100;
    }
    
    // Detectar tentativas de inspeção de elementos
    function detectElementInspection() {
        let devtools = { open: false, orientation: null };
        
        setInterval(() => {
            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    devtools.orientation = widthThreshold ? 'vertical' : 'horizontal';
                    triggerProtection();
                }
            } else {
                devtools.open = false;
                devtools.orientation = null;
            }
        }, 500);
    }
    
    // Detectar tentativas de screenshot
    function detectScreenshot() {
        // Detectar teclas de screenshot
        document.addEventListener('keydown', function(e) {
            if (e.key === 'PrintScreen' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C')) {
                e.preventDefault();
                triggerProtection();
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
            triggerProtection();
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
                triggerProtection();
            }
        });
    }
    
    // Detectar tentativas de salvar página
    function detectPageSave() {
        window.addEventListener('beforeunload', function(e) {
            // Detectar tentativas de salvar como
            if (e.clientY < 0) {
                triggerProtection();
            }
        });
    }
    
    // Detectar tentativas de impressão
    function detectPrinting() {
        window.addEventListener('beforeprint', function() {
            triggerProtection();
        });
        
        // Detectar Ctrl+P
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                triggerProtection();
            }
        });
    }
    
    // Detectar tentativas de visualizar código fonte
    function detectSourceView() {
        // Detectar Ctrl+U
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                triggerProtection();
            }
        });
    }
    
    // Função principal de proteção
    function triggerProtection() {
        console.log('[PROTECTION] Tentativa de violação detectada - ativando proteção');
        
        // Limpar conteúdo da página
        document.documentElement.innerHTML = '';
        
        // Redirecionar para URL de proteção
        setTimeout(() => {
            window.location.href = PROTECTION_CONFIG.redirectUrl;
        }, 100);
    }
    
    // Verificação contínua de DevTools
    function continuousDevToolsCheck() {
        setInterval(() => {
            if (detectDevTools()) {
                triggerProtection();
            }
        }, 1000);
    }
    
    // Função principal de inicialização
    function initAdvancedProtection() {
        // Se for dispositivo móvel, aplicar proteções básicas apenas
        if (isMobileDevice()) {
            console.log('[PROTECTION] Dispositivo móvel detectado - aplicando proteções básicas');
            
            // Proteções básicas para mobile
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
            triggerProtection();
            return;
        }
        
        // Aplicar todas as proteções
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
        }
        
        // Proteções adicionais
        detectPageSave();
        detectPrinting();
        detectSourceView();
        
        // Verificação inicial
        if (detectDevTools()) {
            triggerProtection();
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
        // Verificar se o script foi removido
        if (!window.protectionActive) {
            window.protectionActive = true;
        }
    });
    
})();

