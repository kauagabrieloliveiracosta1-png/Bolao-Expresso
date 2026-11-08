# Bolão Expresso

Projeto web responsivo com interface em azul, branco e laranja.

## Como abrir
1. Extraia o ZIP.
2. Abra `index.html` no navegador para testar a interface.
3. Para testar a instalação PWA e o modo offline, publique em um servidor HTTPS (por exemplo, GitHub Pages).

## Arquivos
- `index.html`: estrutura das telas.
- `styles.css`: identidade visual e layout responsivo.
- `app.js`: navegação, criação local de bolões, palpites de demonstração e ranking.
- `manifest.webmanifest`: metadados para instalação como aplicativo.
- `sw.js`: cache básico para uso offline após primeira visita.

## O que funciona nesta versão
- Menu lateral no computador e navegação inferior no celular.
- Telas Início, Jogos, Meus bolões, Ranking e Meu perfil.
- Criação de bolões com privacidade e pontuação selecionáveis.
- Salvamento local de bolões e palpites no navegador.
- Edição do nome local do perfil.

## Limitações importantes
Esta é uma versão de interface funcional local. Não possui cadastro real, login Google, banco de dados, sincronização entre dispositivos, convites por link, calendário oficial de partidas, resultados ao vivo, cálculo automático de pontuação ou pagamentos. Os times e rankings apresentados são dados fictícios de demonstração. Para uso real com vários participantes, será necessário conectar um backend e uma fonte confiável de partidas/resultados.
