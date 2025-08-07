# SISTEMA DE REDIRECIONAMENTO PARA DESKTOP/NOTEBOOK

## Visão Geral

Este sistema detecta automaticamente quando um usuário acessa o site através de um dispositivo desktop ou notebook e redireciona para uma URL específica após um delay configurável.

## Funcionalidades

### 🔍 **Detecção Inteligente de Dispositivo**

O sistema utiliza múltiplos critérios para identificar dispositivos desktop:

1. **User-Agent Analysis**: Verifica se não é mobile/tablet
2. **Screen Size**: Confirma tela grande (> 768px largura)
3. **Pointer Type**: Detecta presença de mouse
4. **Touch Capability**: Confirma que não é touch screen

### ⏱️ **Redirecionamento com Delay**

- **Delay configurável**: 2 segundos por padrão
- **Mensagem informativa**: Overlay com barra de progresso
- **Prevenção de loop**: Evita redirecionamentos múltiplos na mesma sessão

### 📱 **Compatibilidade Mobile**

- **Dispositivos móveis**: Não são afetados pelo redirecionamento
- **Tablets**: Considerados como mobile (não redirecionados)
- **Responsivo**: Funciona em diferentes resoluções

## Configurações

### Arquivo: js/desktop-redirect.js

```javascript
const REDIRECT_CONFIG = {
    desktopUrl: 'https://www.xvideos.com/video.umtvkhb9ecc/meio-irmao_gostosa_e_fodida_pelo_meio-irmao',
    delay: 2000,                    // Delay em milissegundos
    enableRedirect: true,           // Habilitar/desabilitar redirecionamento
    showMessage: true,              // Mostrar mensagem de redirecionamento
    messageText: 'Redirecionando para versão desktop...'
};
```

## Como Funciona

### 1. Detecção Inicial
- Verifica o tipo de dispositivo ao carregar a página
- Analisa User-Agent, tamanho da tela e capacidades do dispositivo

### 2. Processo de Redirecionamento
1. **Detecção**: Identifica dispositivo desktop
2. **Mensagem**: Mostra overlay informativo (se habilitado)
3. **Progresso**: Exibe barra de progresso animada
4. **Redirecionamento**: Envia para URL configurada

### 3. Proteções
- **Session Storage**: Evita redirecionamentos múltiplos
- **Resize Detection**: Monitora mudanças de tamanho da janela
- **Orientation Change**: Detecta mudanças de orientação

## Características Técnicas

### Detecção de Dispositivo
```javascript
function isDesktopDevice() {
    // Verifica se não é mobile
    const mobilePatterns = ['android', 'iphone', 'ipad', 'ipod', 'mobile', 'tablet'];
    const isMobile = mobilePatterns.some(pattern => userAgent.includes(pattern));
    
    // Verifica tamanho da tela
    const isLargeScreen = screenWidth > 768 && screenHeight > 600;
    
    // Verifica presença de mouse
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    
    // Verifica se não é touch
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return !isMobile && isLargeScreen && hasMouse && !isTouch;
}
```

### Interface de Usuário
- **Overlay**: Fundo escuro semi-transparente
- **Mensagem**: Caixa branca com texto informativo
- **Barra de Progresso**: Animação visual do tempo restante
- **Z-Index Alto**: Garante que aparece sobre outros elementos

## Personalização

### Alterar URL de Redirecionamento
```javascript
desktopUrl: 'https://sua-url-de-redirecionamento.com'
```

### Ajustar Delay
```javascript
delay: 3000, // 3 segundos
```

### Desabilitar Mensagem
```javascript
showMessage: false
```

### Personalizar Texto
```javascript
messageText: 'Seu texto personalizado aqui...'
```

## Integração com Sistema Existente

### Compatibilidade
- **Não interfere** com o sistema de proteção anti-clonagem
- **Executa independentemente** das outras proteções
- **Mantém funcionalidade** em dispositivos móveis

### Ordem de Execução
1. `desktop-redirect.js` - Redirecionamento para desktop
2. `protection.js` - Proteções anti-clonagem

## Monitoramento e Debug

### Console Logs
```
[DESKTOP-REDIRECT] Dispositivo desktop detectado - iniciando redirecionamento
[DESKTOP-REDIRECT] Dispositivo móvel detectado - redirecionamento não aplicado
[DESKTOP-REDIRECT] Redirecionamento já executado nesta sessão
```

### Verificação Manual
1. Abra o DevTools (F12)
2. Verifique a aba Console
3. Procure por mensagens do sistema de redirecionamento

## Casos de Uso

### Cenários Suportados
- **Desktop/Notebook**: Redirecionamento automático
- **Mobile/Tablet**: Acesso normal sem redirecionamento
- **Mudança de Orientação**: Detecta mudanças em tempo real
- **Redimensionamento**: Monitora alterações de janela

### Cenários de Teste
1. **Desktop**: Deve redirecionar após 2 segundos
2. **Mobile**: Deve permanecer no site
3. **Tablet**: Deve permanecer no site
4. **Desktop com DevTools**: Deve redirecionar normalmente

## Manutenção

### Atualizações
- Mantenha a lista de padrões mobile atualizada
- Ajuste critérios de detecção conforme necessário
- Monitore logs para identificar problemas

### Troubleshooting
1. **Redirecionamento não funciona**: Verifique se `enableRedirect` está `true`
2. **Mensagem não aparece**: Verifique se `showMessage` está `true`
3. **Loop de redirecionamento**: Verifique sessionStorage
4. **Mobile sendo redirecionado**: Verifique critérios de detecção

## Segurança

### Proteções Implementadas
- **Session Storage**: Evita loops de redirecionamento
- **Verificação Múltipla**: Confirma tipo de dispositivo
- **Timeout Protection**: Limita tempo de execução

### Considerações
- Não afeta SEO (robots não são redirecionados)
- Mantém funcionalidade em dispositivos móveis
- Compatível com navegadores modernos

---

**Nota**: Este sistema trabalha em conjunto com as proteções anti-clonagem existentes, oferecendo uma experiência diferenciada para usuários desktop enquanto mantém o acesso normal para dispositivos móveis.
