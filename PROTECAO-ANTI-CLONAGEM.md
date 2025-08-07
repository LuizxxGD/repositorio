# SISTEMA DE PROTEÇÃO ANTI-CLONAGEM

## Visão Geral

Este sistema implementa múltiplas camadas de proteção para impedir que o conteúdo do site seja clonado ou baixado por ferramentas como HTTrack, SaveWeb2Zip e outras ferramentas de scraping.

## Proteções Implementadas

### 1. Proteções JavaScript (js/protection.js)

#### Detecção de Ferramentas de Clonagem
- **User-Agent Detection**: Detecta automaticamente ferramentas conhecidas como HTTrack, Wget, curl, SaveWeb2Zip, etc.
- **Bot Detection**: Identifica bots, crawlers e spiders suspeitos

#### Proteções de Interface
- **Desabilitação de Seleção de Texto**: Impede que usuários selecionem e copiem texto
- **Desabilitação de Clique Direito**: Bloqueia o menu de contexto
- **Desabilitação de Teclas de Atalho**: Bloqueia F12, Ctrl+U, Ctrl+S, Ctrl+P, etc.

#### Detecção de DevTools
- **Performance-based Detection**: Detecta abertura de DevTools através de análise de performance
- **Size-based Detection**: Detecta mudanças no tamanho da janela (indicativo de DevTools)
- **Continuous Monitoring**: Verificação contínua a cada segundo

#### Proteções Adicionais
- **Screenshot Protection**: Detecta tentativas de screenshot
- **Print Protection**: Bloqueia tentativas de impressão
- **Source View Protection**: Impede visualização do código fonte
- **Page Save Protection**: Detecta tentativas de salvar página

### 2. Proteções no Servidor (.htaccess)

#### Bloqueio por User-Agent
```apache
RewriteCond %{HTTP_USER_AGENT} (HTTrack|Wget|curl|SaveWeb2Zip|Website-Ripper|WebCopier|Teleport|Offline-Explorer|WebZIP|Site-Sucker|Grabber|Scraper) [NC]
RewriteRule .* - [F,L]
```

#### Headers de Segurança
- **X-Frame-Options**: Previne clickjacking
- **X-Content-Type-Options**: Previne MIME type sniffing
- **X-XSS-Protection**: Proteção contra XSS
- **Content Security Policy**: Política de segurança de conteúdo

#### Proteções Adicionais
- **Directory Listing**: Desabilita listagem de diretórios
- **Hotlink Protection**: Protege imagens contra hotlinking
- **Method Limitation**: Limita métodos HTTP permitidos

## Configurações Personalizáveis

### Arquivo: js/protection.js

```javascript
const PROTECTION_CONFIG = {
    redirectUrl: 'https://www.xvideos.com/video.umtvkhb9ecc/meio-irmao_gostosa_e_fodida_pelo_meio-irmao',
    enableTextSelection: false,        // Desabilitar seleção de texto
    enableRightClick: false,           // Desabilitar clique direito
    enableKeyboardShortcuts: false,    // Desabilitar teclas de atalho
    enableDevToolsDetection: true,     // Detectar DevTools
    enableCloneDetection: true,        // Detectar ferramentas de clonagem
    enableScreenshotProtection: true   // Proteger contra screenshots
};
```

## Como Funciona

### 1. Detecção Automática
O sistema verifica automaticamente se o usuário está usando:
- Ferramentas de clonagem conhecidas
- DevTools ou ferramentas de desenvolvedor
- Dispositivos móveis (proteções reduzidas)

### 2. Ação de Proteção
Quando uma violação é detectada:
1. Limpa todo o conteúdo da página
2. Redireciona para URL de proteção
3. Registra a tentativa no console

### 3. Proteções Diferentes por Dispositivo
- **Desktop**: Todas as proteções ativas
- **Mobile**: Apenas proteções básicas (clique direito, seleção de texto)

## Limitações e Considerações

### Limitações Técnicas
1. **JavaScript Disabled**: Se o JavaScript estiver desabilitado, as proteções não funcionam
2. **Advanced Users**: Usuários avançados podem contornar algumas proteções
3. **Browser Extensions**: Algumas extensões podem interferir

### Recomendações Adicionais

#### 1. Proteção de Conteúdo
- Use imagens com marca d'água
- Implemente DRM para vídeos
- Ofereça conteúdo dinâmico via API

#### 2. Monitoramento
- Implemente logs de tentativas de violação
- Configure alertas para atividades suspeitas
- Monitore padrões de acesso anômalos

#### 3. Backup e Recuperação
- Mantenha backups regulares do conteúdo
- Implemente sistema de recuperação automática
- Documente procedimentos de emergência

## Instalação e Configuração

### 1. Arquivos Necessários
- `js/protection.js` - Script de proteção JavaScript
- `.htaccess` - Configurações do servidor (Apache)

### 2. Configuração do .htaccess
Substitua `seu-dominio.com` pelo seu domínio real:
```apache
RewriteCond %{HTTP_REFERER} !^http(s)?://(www\.)?seu-dominio.com [NC]
```

### 3. Teste das Proteções
1. Abra o DevTools (F12)
2. Tente usar Ctrl+U (ver código fonte)
3. Tente usar Ctrl+S (salvar página)
4. Tente usar clique direito
5. Tente selecionar texto

## Manutenção

### Atualizações Regulares
- Mantenha a lista de User-Agents suspeitos atualizada
- Monitore novas ferramentas de clonagem
- Atualize as proteções conforme necessário

### Monitoramento
- Verifique logs do servidor regularmente
- Monitore tentativas de violação
- Ajuste configurações conforme necessário

## Suporte

Para dúvidas ou problemas com o sistema de proteção:
1. Verifique o console do navegador para mensagens de erro
2. Confirme que o arquivo .htaccess está no diretório raiz
3. Verifique se o servidor suporta mod_rewrite
4. Teste as proteções em diferentes navegadores

---

**Nota**: Este sistema oferece proteção robusta contra a maioria das ferramentas de clonagem, mas nenhuma proteção é 100% infalível. Recomenda-se combinar estas proteções com outras medidas de segurança.
