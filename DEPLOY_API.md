# 🚀 Deploy Automático via API Cloudflare

## 📋 Credenciais Configuradas

```
Zone ID:     ff82ebf9edf15aa07d62e8d32855eea7
Account ID:  ef4dfafae6fc56ebf84a3b58aa7d8b45
```

---

## 🔑 Como Obter o API Token

### Passo 1: Acessar Painel de API Tokens

Acesse: https://dash.cloudflare.com/profile/api-tokens

### Passo 2: Criar Novo Token

1. Clique em **"Create Token"**
2. Escolha uma das opções:

#### Opção A: Template Pronto (Recomendado)
- Use o template **"Edit Cloudflare Workers"**
- Clique em **"Use template"**
- Revise as permissões (já vêm configuradas)
- Clique em **"Continue to summary"**
- Clique em **"Create Token"**
- **COPIE O TOKEN** (só aparece uma vez!)

#### Opção B: Token Customizado
- Clique em **"Create Custom Token"**
- Configure as permissões:
  - **Account** → **Cloudflare Pages** → **Edit**
  - **Account** → **Account Settings** → **Read**
  - **Zone** → **Zone** → **Read**
- Em **Account Resources**:
  - Include → Specific account → Selecione sua conta
- Em **Zone Resources**:
  - Include → Specific zone → Selecione sua zona
- Clique em **"Continue to summary"**
- Clique em **"Create Token"**
- **COPIE O TOKEN** (só aparece uma vez!)

### Passo 3: Salvar o Token

O token terá este formato:
```
[um_texto_longo_com_letras_numeros_e_caracteres_especiais]
```

⚠️ **IMPORTANTE:** Copie e guarde o token em local seguro. Ele só é mostrado uma vez!

---

## 🚀 Métodos de Deploy

### Método 1: Script Automático (Recomendado)

```bash
# 1. Configure o token
export CLOUDFLARE_API_TOKEN='seu_token_aqui'

# 2. Execute o script
./deploy.sh
```

O script fará automaticamente:
- ✅ Build do projeto
- ✅ Deploy no Cloudflare Pages
- ✅ Configuração do projeto
- ✅ Exibição da URL final

### Método 2: Wrangler CLI Manual

```bash
# 1. Instalar Wrangler
npm install -g wrangler

# 2. Fazer login (interativo)
wrangler login

# 3. Build
npm run build

# 4. Deploy
wrangler pages deploy .next \
  --project-name=deltapag-checkout \
  --branch=main
```

### Método 3: Via GitHub Actions

O workflow já está preparado, mas precisa dos secrets configurados:

1. Vá em: `Settings` → `Secrets and variables` → `Actions`
2. Adicione os secrets:

```
CLOUDFLARE_API_TOKEN: [seu_token]
CLOUDFLARE_ACCOUNT_ID: ef4dfafae6fc56ebf84a3b58aa7d8b45
DELTAPAG_API_KEY: eyJhbGciOiJIUzUxMiJ9...
NEXT_PUBLIC_BASE_URL: https://deltapag-checkout.pages.dev
```

3. Crie o arquivo `.github/workflows/deploy.yml` (atualmente não está no repo)
4. Push para `main` e o deploy será automático

---

## ⚙️ Configurar Variáveis de Ambiente no Cloudflare

Após o deploy, você precisa configurar as variáveis de ambiente:

### Via Dashboard (Mais Fácil)

1. Acesse: https://dash.cloudflare.com/
2. Vá em **Workers & Pages**
3. Clique no projeto **deltapag-checkout**
4. Vá em **Settings** → **Environment variables**
5. Clique em **Add variables**
6. Adicione estas 3 variáveis:

```env
Nome: DELTAPAG_API_KEY
Valor: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3ODYiLCJ0ZW5hbnQiOiJiZW1wYWdnb19rYWlub3dwcm9tb2Nhb2RldmVuXzJfMjc5MjM3NDYwMDAxMjMiLCJpYXQiOjE3NzMyNDAwNDIsImV4cCI6NDEwMjM1ODM5OSwiaXNNYXN0ZXIiOnRydWV9.LCBvzjy-dUdchb4VHwsIt7rMpLVc4U9RjvI1wd5MFrvHDijbL9UlTtvZlyRj_YBHOAPYR_xXSGY7ep5PkfeaSA
Environment: Production

Nome: DELTAPAG_API_URL
Valor: https://api.deltapag.com/v1
Environment: Production

Nome: NEXT_PUBLIC_BASE_URL
Valor: https://deltapag-checkout.pages.dev
Environment: Production
```

7. Clique em **Save**
8. Faça um novo deploy para aplicar as variáveis

### Via Wrangler CLI

```bash
wrangler pages secret put DELTAPAG_API_KEY --project-name=deltapag-checkout
# Cole o token quando solicitado

wrangler pages secret put DELTAPAG_API_URL --project-name=deltapag-checkout
# Digite: https://api.deltapag.com/v1

wrangler pages secret put NEXT_PUBLIC_BASE_URL --project-name=deltapag-checkout
# Digite: https://deltapag-checkout.pages.dev
```

---

## 🧪 Testar o Deploy

Após o deploy:

1. Acesse: https://deltapag-checkout.pages.dev
2. Verifique se a interface carrega corretamente
3. Teste cada um dos 4 planos de assinatura
4. Confirme que o checkout da DeltaPag abre corretamente
5. Verifique o retorno para páginas de sucesso/cancelamento

---

## 📊 Monitorar o Deploy

### Via Dashboard

1. Acesse: https://dash.cloudflare.com/
2. Workers & Pages → deltapag-checkout
3. Veja **Deployments** para histórico
4. Veja **Analytics** para métricas
5. Veja **Logs** para debugging

### Via Wrangler CLI

```bash
# Listar deployments
wrangler pages deployment list --project-name=deltapag-checkout

# Ver logs
wrangler pages deployment tail --project-name=deltapag-checkout
```

---

## 🔧 Configurações Avançadas

### Domínio Customizado

1. No dashboard do projeto
2. **Custom domains** → **Set up a custom domain**
3. Digite seu domínio (ex: `checkout.seusite.com`)
4. Configure DNS conforme instruído
5. Aguarde propagação

### Múltiplos Ambientes

Configure variáveis diferentes para:
- **Production**: Deploy da branch `main`
- **Preview**: Deploy de PRs e outras branches

### Rollback

Se algo der errado:

```bash
# Listar deployments
wrangler pages deployment list --project-name=deltapag-checkout

# Promover deployment antigo
wrangler pages deployment promote [DEPLOYMENT_ID] --project-name=deltapag-checkout
```

---

## 🐛 Troubleshooting

### Erro: "Authentication error"
```bash
# Fazer login novamente
wrangler logout
wrangler login
```

### Erro: "Project not found"
```bash
# Criar projeto primeiro
wrangler pages project create deltapag-checkout
```

### Erro: "Build failed"
```bash
# Testar build localmente
npm run build
# Se funcionar, problema é no deploy
```

### Erro: "Token expired"
```bash
# Gerar novo token no dashboard
# Atualizar a variável
export CLOUDFLARE_API_TOKEN='novo_token'
```

---

## 📝 Comandos Úteis

```bash
# Ver projetos
wrangler pages project list

# Ver informações do projeto
wrangler pages project get deltapag-checkout

# Ver deployments
wrangler pages deployment list --project-name=deltapag-checkout

# Ver logs em tempo real
wrangler pages deployment tail --project-name=deltapag-checkout

# Deletar projeto (cuidado!)
wrangler pages project delete deltapag-checkout
```

---

## 🎯 Resumo do Processo

```
1. Obter API Token do Cloudflare
   ↓
2. Configurar token: export CLOUDFLARE_API_TOKEN='...'
   ↓
3. Executar deploy: ./deploy.sh
   ↓
4. Configurar variáveis de ambiente no dashboard
   ↓
5. Fazer novo deploy para aplicar variáveis
   ↓
6. Testar aplicação em produção
   ↓
7. 🎉 Começar a receber pagamentos!
```

---

## ✅ Checklist de Deploy

- [ ] Obter API Token do Cloudflare
- [ ] Configurar token localmente
- [ ] Fazer merge do PR #1
- [ ] Executar `./deploy.sh`
- [ ] Configurar variáveis de ambiente
- [ ] Fazer novo deploy
- [ ] Testar aplicação
- [ ] Verificar checkouts
- [ ] Configurar domínio customizado (opcional)
- [ ] Monitorar logs e analytics

---

## 🎉 Após o Deploy

Sua aplicação estará disponível em:
- **URL Principal:** https://deltapag-checkout.pages.dev
- **Preview Branches:** https://[branch].deltapag-checkout.pages.dev
- **Domínio Custom:** Seu domínio configurado

---

**📞 Precisa de ajuda?**

- Documentação Cloudflare Pages: https://developers.cloudflare.com/pages/
- Documentação Wrangler: https://developers.cloudflare.com/workers/wrangler/
- Repositório do Projeto: https://github.com/kainow252-cmyk/Deltapag

---

**Desenvolvido com ❤️ por GenSpark AI Developer**
