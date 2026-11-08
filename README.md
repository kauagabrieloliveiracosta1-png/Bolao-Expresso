# Bolão Expresso — reconstrução

## Como executar
1. Extraia o ZIP.
2. Abra `index.html` no navegador ou publique os arquivos na raiz do GitHub Pages.
3. O aplicativo salva dados de demonstração no armazenamento local do navegador.

## Layout visual
- Template minimalista compartilhado por todas as telas.
- Navegação lateral branca, cabeçalho compacto, cartões simples e paleta azul, branco e laranja.
- Layout responsivo para desktop e celular.

## Sistemas incluídos nesta versão
- Menu responsivo e navegação entre páginas.
- Criação e exclusão de bolões públicos e privados.
- Regras personalizadas de pontuação por bolão.
- Campo para premiação definida pelo organizador.
- Cadastro manual de partidas.
- Registro de palpites para o primeiro bolão da lista.
- Cadastro de resultados e cálculo automático de pontos.
- Ranking local, notificações, perfil editável e convites por link.
- PWA e service worker com cache versionado.

## Limitações importantes
Esta entrega é uma versão funcional local/front-end. Não possui ainda autenticação real por e-mail ou Google, banco de dados remoto, sincronização entre dispositivos/participantes, feed oficial de partidas, notificações push, nem validação segura de convites no servidor. Para isso será necessário configurar um backend (por exemplo, Supabase/Firebase) e credenciais próprias. Não insira senhas reais nesta versão.

## Publicação no GitHub Pages
Envie os arquivos `index.html`, `styles.css`, `app.js`, `sw.js` e `manifest.webmanifest` para a raiz do repositório. Depois aguarde o Pages publicar. Se o site ficar preso em uma versão anterior, feche o aplicativo instalado e faça uma atualização forçada (Ctrl+F5). O service worker usa cache versionado (v5) para evitar servir arquivos antigos. Após publicar, atualize com Ctrl+F5; no celular, feche e reabra o navegador se necessário.
