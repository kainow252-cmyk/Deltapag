# Configuração do Cloudflare Pages

## Configuração Manual via Dashboard

### 1. Acesse o Cloudflare Dashboard

1. Faça login em: https://dash.cloudflare.com/
2. Navegue até **Workers & Pages**
3. Clique em **Create application**
4. Selecione **Pages** > **Connect to Git**

### 2. Conecte o Repositório GitHub

1. Autorize o Cloudflare a acessar seu GitHub
2. Selecione o repositório do projeto
3. Configure o build:

```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: /
```

### 3. Configure Variáveis de Ambiente

Na seção **Environment variables**, adicione:

```
DELTAPAG_API_KEY=sua_chave_api_deltapag
DELTAPAG_API_URL=https://api.deltapag.com/v1
NEXT_PUBLIC_BASE_URL=https://seu-projeto.pages.dev
```

⚠️ **IMPORTANTE:** Depois do primeiro deploy, volte e atualize `NEXT_PUBLIC_BASE_URL` com a URL real fornecida pelo Cloudflare.

### 4. Deploy

1. Clique em **Save and Deploy**
2. Aguarde o build completar
3. Sua aplicação estará disponível em: `https://seu-projeto.pages.dev`

---

## Configuração via GitHub Actions (Recomendado)

### 1. Obter Credenciais do Cloudflare

#### API Token:
1. Acesse: https://dash.cloudflare.com/profile/api-tokens
2. Clique em **Create Token**
3. Use o template **Edit Cloudflare Workers**
4. Ou crie um custom token com permissões:
   - Account > Cloudflare Pages > Edit
5. Copie o token gerado

#### Account ID:
1. No Dashboard do Cloudflare
2. Vá em **Workers & Pages**
3. Clique em qualquer projeto (ou crie um)
4. No menu lateral direito, você verá **Account ID**
5. Copie o ID

### 2. Configurar Secrets no GitHub

1. Vá até seu repositório no GitHub
2. **Settings** > **Secrets and variables** > **Actions**
3. Clique em **New repository secret**
4. Adicione os seguintes secrets:

```
CLOUDFLARE_API_TOKEN: (token copiado acima)
CLOUDFLARE_ACCOUNT_ID: (account ID copiado acima)
DELTAPAG_API_KEY: (sua chave API DeltaPag)
DELTAPAG_API_URL: https://api.deltapag.com/v1
NEXT_PUBLIC_BASE_URL: https://deltapag-checkout.pages.dev
```

### 3. Push para Ativar o Deploy

```bash
git add .
git commit -m "feat: configurar deploy Cloudflare"
git push origin main
```

O GitHub Actions automaticamente:
- ✅ Fará o build da aplicação
- ✅ Executará os testes
- ✅ Fará deploy no Cloudflare Pages
- ✅ Fornecerá a URL de acesso

---

## Comandos Úteis

### Verificar status do build
```bash
# Via CLI do Cloudflare (wrangler)
npm install -g wrangler
wrangler login
wrangler pages deployment list --project-name=deltapag-checkout
```

### Deploy manual via Wrangler
```bash
npm run build
wrangler pages deploy .next --project-name=deltapag-checkout
```

---

## URLs de Acesso

Após o deploy, você terá:

- **Produção:** `https://deltapag-checkout.pages.dev`
- **Preview (PRs):** `https://[pr-number].deltapag-checkout.pages.dev`

---

## Variáveis de Ambiente por Branch

Você pode configurar diferentes valores para:
- **Production:** Deploy da branch `main`
- **Preview:** Deploy de PRs e outras branches

No Cloudflare Dashboard:
1. Vá em **Settings** > **Environment variables**
2. Adicione variáveis específicas para cada ambiente

---

## Domínio Customizado (Opcional)

Para usar um domínio próprio:

1. No Cloudflare Dashboard, vá até seu projeto Pages
2. **Custom domains** > **Set up a custom domain**
3. Digite seu domínio (ex: `checkout.seusite.com`)
4. Siga as instruções de DNS
5. Aguarde a propagação (até 24h)

---

## Troubleshooting

### Build falha com erro de memória
Adicione no `next.config.js`:
```javascript
const nextConfig = {
  // ... outras configs
  experimental: {
    workerThreads: false,
    cpus: 1
  }
}
```

### Variáveis de ambiente não carregam
- Verifique se estão configuradas no Cloudflare Dashboard
- Redeploy o projeto após adicionar novas variáveis
- Variáveis com `NEXT_PUBLIC_` devem estar disponíveis no build time

### Erro 522 (Connection Timed Out)
- Verifique se o build completou com sucesso
- Confirme que a pasta de output está correta (`.next`)
- Teste localmente com `npm run build && npm start`

---

## Recursos Úteis

- [Documentação Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Next.js no Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Nota:** Após o primeiro deploy, lembre-se de atualizar `NEXT_PUBLIC_BASE_URL` com a URL real do Cloudflare!
