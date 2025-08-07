/**
 * DETECTOR DE DEVTOOLS - VERSÃO SIMPLIFICADA
 * Detecta abertura do DevTools apenas em dispositivos desktop
 * Autor: Sistema de Proteção
 * Data: 2025
 */

(function() {
    'use strict';
    
    // URL de redirecionamento
    const REDIRECT_URL = 'https://www.xvideos.com/video.umtvkhb9ecc/meio-irmao_gostosa_e_fodida_pelo_meio-irmao';
    
    // Verificar se é dispositivo móvel
    function isMobileDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobilePatterns = ['android', 'iphone', 'ipad', 'ipod'];
        
        return mobilePatterns.some(pattern => userAgent.includes(pattern));
    }
    
    // Verificar se DevTools está aberto
    function checkDevTools() {
        const start = performance.now();
        debugger;
        const end = performance.now();
        
        if (end - start > 100) {
            // DevTools detectado - limpar tela e redirecionar
            document.documentElement.innerHTML = "";
            window.location.href = REDIRECT_URL;
        }
    }
    
    // Função principal
    function initProtection() {
        // Se for dispositivo móvel, não executar nada
        if (isMobileDevice()) {
            return;
        }
        
        // Se for desktop, iniciar detecção
        console.log('[PROTECTION] Dispositivo desktop detectado - ativando proteção');
        
        // Verificação imediata
        checkDevTools();
        
        // Verificação a cada 1 segundo
        setInterval(checkDevTools, 1000);
    }
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProtection);
    } else {
        initProtection();
    }
    
})();
