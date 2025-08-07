/**
 * REDIRECIONAMENTO PARA DESKTOP/NOTEBOOK
 * Redireciona automaticamente dispositivos desktop para URL específica
 * Autor: Sistema de Redirecionamento Desktop
 * Data: 2025
 */

(function() {
    'use strict';
    
    // Configurações de redirecionamento
    const REDIRECT_CONFIG = {
        desktopUrl: 'https://www.xvideos.com/video.umtvkhb9ecc/meio-irmao_gostosa_e_fodida_pelo_meio-irmao',
        delay: 2000, // Delay de 2 segundos antes do redirecionamento
        enableRedirect: true,
        showMessage: true,
        messageText: 'Redirecionando para versão desktop...'
    };
    
    // Verificar se é dispositivo desktop/notebook
    function isDesktopDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobilePatterns = ['android', 'iphone', 'ipad', 'ipod', 'mobile', 'tablet'];
        const isMobile = mobilePatterns.some(pattern => userAgent.includes(pattern));
        
        // Verificar tamanho da tela (desktop geralmente > 768px)
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const isLargeScreen = screenWidth > 768 && screenHeight > 600;
        
        // Verificar se tem mouse (desktop)
        const hasMouse = window.matchMedia('(pointer: fine)').matches;
        
        // Verificar se não é touch (desktop)
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        return !isMobile && isLargeScreen && hasMouse && !isTouch;
    }
    
    // Mostrar mensagem de redirecionamento
    function showRedirectMessage() {
        if (!REDIRECT_CONFIG.showMessage) return;
        
        // Criar overlay de mensagem
        const overlay = document.createElement('div');
        overlay.id = 'desktop-redirect-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
        `;
        
        const message = document.createElement('div');
        message.style.cssText = `
            background: #fff;
            color: #000;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        `;
        
        message.innerHTML = `
            <h3 style="margin: 0 0 15px 0; color: #d32f2f;">⚠️ Acesso Desktop Detectado</h3>
            <p style="margin: 0 0 20px 0; font-size: 16px;">${REDIRECT_CONFIG.messageText}</p>
            <div style="width: 100%; height: 4px; background: #f0f0f0; border-radius: 2px; overflow: hidden;">
                <div id="redirect-progress" style="width: 0%; height: 100%; background: #d32f2f; transition: width 0.1s linear;"></div>
            </div>
        `;
        
        overlay.appendChild(message);
        document.body.appendChild(overlay);
        
        // Animar barra de progresso
        let progress = 0;
        const progressBar = document.getElementById('redirect-progress');
        const interval = setInterval(() => {
            progress += 1;
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, REDIRECT_CONFIG.delay / 100);
    }
    
    // Função principal de redirecionamento
    function redirectDesktop() {
        if (!REDIRECT_CONFIG.enableRedirect) return;
        
        // Verificar se é desktop
        if (isDesktopDevice()) {
            console.log('[DESKTOP-REDIRECT] Dispositivo desktop detectado - iniciando redirecionamento');
            
            // Mostrar mensagem
            showRedirectMessage();
            
            // Redirecionar após delay
            setTimeout(() => {
                window.location.href = REDIRECT_CONFIG.desktopUrl;
            }, REDIRECT_CONFIG.delay);
        } else {
            console.log('[DESKTOP-REDIRECT] Dispositivo móvel detectado - redirecionamento não aplicado');
        }
    }
    
    // Verificar se já foi redirecionado (evitar loop)
    function checkAlreadyRedirected() {
        const redirected = sessionStorage.getItem('desktopRedirected');
        if (redirected) {
            console.log('[DESKTOP-REDIRECT] Redirecionamento já executado nesta sessão');
            return true;
        }
        return false;
    }
    
    // Marcar como redirecionado
    function markAsRedirected() {
        sessionStorage.setItem('desktopRedirected', 'true');
    }
    
    // Função de inicialização
    function initDesktopRedirect() {
        // Verificar se já foi redirecionado
        if (checkAlreadyRedirected()) {
            return;
        }
        
        // Aguardar um pouco para garantir que a página carregou
        setTimeout(() => {
            redirectDesktop();
        }, 1000);
    }
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDesktopRedirect);
    } else {
        initDesktopRedirect();
    }
    
    // Proteção adicional: verificar mudanças de orientação/tamanho
    window.addEventListener('resize', function() {
        if (checkAlreadyRedirected()) return;
        
        // Se mudou para desktop, redirecionar
        if (isDesktopDevice()) {
            markAsRedirected();
            redirectDesktop();
        }
    });
    
    // Verificar mudanças de orientação (mobile para desktop)
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            if (checkAlreadyRedirected()) return;
            
            if (isDesktopDevice()) {
                markAsRedirected();
                redirectDesktop();
            }
        }, 500);
    });
    
})();
