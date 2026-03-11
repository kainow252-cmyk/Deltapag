# 🎯 Guia Rápido de Configuração

## 📝 Passo 1: Obter API Key da DeltaPag

1. Acesse a documentação: https://deltapag-tech.readme.io
2. Faça login na sua conta DeltaPag
3. Vá em **API Keys** ou **Configurações**
4. Gere uma nova API Key ou copie a existente
5. Guarde essa chave em um local seguro

## 🔧 Passo 2: Configurar Variáveis Locais

Copie e configure o arquivo de ambiente:

```bash
cp .env.example .env.local
```

Edite `.env.local` e adicione sua API Key:

```env
DELTAPAG_API_KEY=sua_chave_api_aqui
DELTAPAG_API_URL=https://api.deltapag.com/v1
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🚀 Passo 3: Executar Localmente

```bash
# Instalar dependências (se ainda não fez)
npm install

# Executar em desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## 🌐 Passo 4: Deploy no Cloudflare Pages

### Opção A: Via Dashboard (Mais Fácil)

1. Acesse: https://dash.cloudflare.com/
2. Vá em **Workers & Pages** > **Create application**
3. Selecione **Pages** > **Connect to Git**
4. Autorize o GitHub e selecione o repositório `Deltapag`
5. Configure:
   ```
   Build command: npm run build
   Build output directory: .next
   Framework preset: Next.js
   Root directory: /
   ```
6. Adicione as variáveis de ambiente:
   ```
   DELTAPAG_API_KEY=sua_chave_api
   DELTAPAG_API_URL=https://api.deltapag.com/v1
   NEXT_PUBLIC_BASE_URL=https://seu-projeto.pages.dev
   ```
7. Clique em **Save and Deploy**
8. Aguarde alguns minutos e pronto!

### Opção B: Via Wrangler CLI

```bash
# Instalar Wrangler globalmente
npm install -g wrangler

# Fazer login
wrangler login

# Build e deploy
npm run build
wrangler pages deploy .next --project-name=deltapag-checkout
```

## ⚙️ Configurar Domínio Customizado (Opcional)

1. No Cloudflare Dashboard, acesse seu projeto
2. Vá em **Custom domains**
3. Clique em **Set up a custom domain**
4. Digite seu domínio (ex: `checkout.seusite.com`)
5. Configure os registros DNS conforme instruído
6. Aguarde propagação (pode levar até 24h)

## 🔐 Secrets do GitHub (Para CI/CD futuro)

Se quiser configurar deploy automático via GitHub Actions:

1. Vá em: `Settings` > `Secrets and variables` > `Actions`
2. Adicione os seguintes secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `DELTAPAG_API_KEY`
   - `NEXT_PUBLIC_BASE_URL`

## 🧪 Testar os Checkouts

1. Acesse a aplicação (local ou deploy)
2. Selecione um dos 4 planos disponíveis
3. Clique em "Assinar Agora"
4. Será redirecionado para o checkout da DeltaPag
5. Complete o pagamento
6. Será redirecionado de volta para página de sucesso

## 📊 Planos Disponíveis

- **Básico**: R$ 19,90/mês
- **Padrão**: R$ 29,90/mês ⭐ Popular
- **Premium**: R$ 39,90/mês
- **Empresarial**: R$ 49,90/mês

## 🐛 Troubleshooting

### Build falha localmente
```bash
# Limpar cache e reinstalar
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### API retorna erro 401
- Verifique se `DELTAPAG_API_KEY` está correta
- Confirme se a chave está ativa na DeltaPag

### Checkout não redireciona
- Verifique se `NEXT_PUBLIC_BASE_URL` está configurada
- Confirme que as URLs de retorno estão corretas

### Variáveis de ambiente não carregam
- Reinicie o servidor de desenvolvimento: `Ctrl+C` e `npm run dev`
- No Cloudflare, faça um novo deploy após adicionar variáveis

## 📞 Suporte

- **Documentação DeltaPag**: https://deltapag-tech.readme.io
- **GitHub Issues**: https://github.com/kainow252-cmyk/Deltapag/issues
- **Pull Request**: https://github.com/kainow252-cmyk/Deltapag/pull/1

---

**Desenvolvido com ❤️ para facilitar suas assinaturas!**
