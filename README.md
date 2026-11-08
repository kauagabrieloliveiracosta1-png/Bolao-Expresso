# Bolão Expresso V4 — Supabase

## O que esta versão conecta
- Cadastro e login por e-mail e senha via Supabase Auth.
- Recuperação de senha por e-mail.
- Perfis e ranking compartilhados.
- Bolões publicados armazenados no banco.
- Palpites individuais sincronizados por conta.
- Acesso administrativo controlado pelo campo `profiles.role` e por Row Level Security (RLS).

## Configuração obrigatória do banco
1. Abra o projeto Supabase do Bolão Expresso.
2. Entre em **SQL Editor** e crie uma consulta.
3. Copie todo o conteúdo de `supabase-setup.sql`, cole e execute.
4. Publique estes arquivos no GitHub Pages (substitua os arquivos da versão anterior).
5. Cadastre sua conta pelo aplicativo e confirme o e-mail.
6. No SQL Editor, execute a instrução abaixo, trocando pelo e-mail usado no cadastro:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'SEU_EMAIL');
```

7. Saia e entre novamente no aplicativo. O botão **Painel admin** aparecerá para a conta promovida.

## Credenciais
A URL e a chave `sb_publishable_` fornecidas pelo proprietário foram configuradas em `app.js`. Publishable key é própria para cliente/browser; nunca coloque `service_role` ou `sb_secret_` no front-end.

## Limitações conhecidas desta etapa
- O primeiro administrador precisa ser promovido manualmente pelo SQL Editor, como descrito acima.
- O app ainda não importa calendário nem placares reais automaticamente; isso exige integração posterior com uma API esportiva e um backend seguro para guardar a chave dessa API.
- A pontuação é calculada no fechamento do bolão pelo administrador.
- O banco guarda bolões em um documento JSON compartilhado e palpites em linhas individuais.
- Configure em **Authentication → URL Configuration** a URL publicada do GitHub Pages como Site URL e Redirect URL para recuperação de senha.
- Para segurança adicional, configure CAPTCHA/rate limits e políticas de confirmação de e-mail no painel Supabase antes de abrir ao público.

## Arquivos
- `index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.webmanifest`
- `supabase-setup.sql` — estrutura do banco e políticas RLS
