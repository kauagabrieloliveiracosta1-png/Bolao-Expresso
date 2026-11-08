# Bolão Expresso — Bolões oficiais (protótipo funcional)

## O que foi implementado
- Somente a administração publica bolões. Não existe botão para usuário criar bolão.
- Painel administrativo com criação, edição, publicação, mudança de status e encerramento.
- Seleção de competições conhecidas, etapa/rodada, prazo, descrição de premiação e pontuação.
- Cadastro de partidas e importação de uma lista JSON de partidas para o formulário.
- Participantes fazem palpites; placares são inseridos pelo administrador.
- Pontuação automática por placar exato ou resultado (vitória/empate/derrota).
- Ranking e histórico dos bolões encerrados.
- Backup JSON e PWA responsiva para PC/celular.

## Como testar
1. Extraia o ZIP.
2. Abra `index.html` no navegador ou publique os arquivos no GitHub Pages.
3. Clique em **Painel admin** para alternar para o painel administrativo.
4. Em **Criar bolão**, selecione competição, prazo, regra de pontuação e adicione partidas.
5. Publique. Volte para **Bolões** para testar os palpites.
6. No painel admin, abra **Partidas e resultados**, informe os placares oficiais e encerre o bolão em **Bolões**.

## Limitações que precisam ficar claras
Esta versão é um protótipo front-end: dados ficam no `localStorage` do navegador. O modo administrador é apenas uma chave de interface, NÃO é login seguro. Não há contas reais, banco de dados, sincronização entre usuários/dispositivos ou pagamentos.
A lista de competições é um catálogo de opções, não um feed de calendário. A importação JSON facilita trazer jogos reais de uma API, mas não consulta uma API por conta própria. Resultados precisam ser informados pelo administrador até a integração real.

## Próxima etapa para produção
- Backend com autenticação e permissões reais (admin/participante), banco de dados e API segura.
- Integração com provedor de futebol para competições, calendário, jogos ao vivo e resultados.
- Chave da API mantida no servidor, nunca no JavaScript público.
- Persistência centralizada para que todos vejam o mesmo bolão e ranking.
- Política de privacidade, regras do bolão e controles contra alteração de palpites após o prazo.

## Formato de importação de partidas
```json
[
  {
    "competition": "Brasileirão Série A",
    "home": "Clube mandante",
    "away": "Clube visitante",
    "date": "2026-11-08T16:00:00Z"
  }
]
```
Os nomes acima são apenas exemplo de estrutura, não partidas anunciadas.
