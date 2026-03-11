# DeltaPag Checkout - Sistema de Assinaturas

Sistema completo de pagamento com assinaturas usando a API DeltaPag, com links de checkout e valores predefinidos.

## 🚀 Funcionalidades

- ✅ 4 planos de assinatura (R$ 19,90 / 29,90 / 39,90 / 49,90)
- ✅ Interface moderna e responsiva com Tailwind CSS
- ✅ Integração com API DeltaPag
- ✅ Geração automática de links de checkout
- ✅ Páginas de sucesso e cancelamento
- ✅ Suporte a assinaturas mensais
- ✅ Deploy automático via GitHub Actions
- ✅ Hospedagem no Cloudflare Pages

## 📋 Pré-requisitos

- Node.js 18+ ou superior
- Conta na DeltaPag com API Key
- Conta no GitHub
- Conta no Cloudflare

## 🔧 Configuração Local

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd webapp
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` e adicione suas credenciais:

```env
DELTAPAG_API_KEY=sua_chave_api_aqui
DELTAPAG_API_URL=https://api.deltapag.com/v1
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Execute o projeto em desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📦 Estrutura do Projeto

```
webapp/
├── app/
│   ├── api/
│   │   └── checkout/
│   │       └── route.ts          # API endpoint para criar checkouts
│   ├── success/
│   │   └── page.tsx              # Página de pagamento bem-sucedido
│   ├── cancel/
│   │   └── page.tsx              # Página de pagamento cancelado
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página inicial com planos
│   └── globals.css               # Estilos globais
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions para deploy
├── .env.example                  # Exemplo de variáveis de ambiente
├── next.config.js                # Configuração do Next.js
├── tailwind.config.ts            # Configuração do Tailwind
└── package.json
```

## 💳 Planos Disponíveis

| Plano | Valor | Recursos |
|-------|-------|----------|
| **Básico** | R$ 19,90/mês | Acesso básico, Suporte email, 1GB storage |
| **Padrão** | R$ 29,90/mês | Acesso completo, Suporte prioritário, 5GB storage, API |
| **Premium** | R$ 39,90/mês | Acesso ilimitado, Suporte 24/7, 20GB storage, API avançada |
| **Empresarial** | R$ 49,90/mês | Recursos empresariais, Suporte dedicado, Storage ilimitado |

## 🔐 API DeltaPag

### Endpoint de Checkout

**POST** `/api/checkout`

```json
{
  "planId": "standard",
  "amount": 29.90
}
```

**Resposta de Sucesso:**

```json
{
  "success": true,
  "checkoutUrl": "https://checkout.deltapag.com/...",
  "checkoutId": "ckout_xxx",
  "amount": 29.90,
  "planId": "standard"
}
```

### Consultar Status

**GET** `/api/checkout?id=ckout_xxx`

## 🚀 Deploy no Cloudflare Pages

### Via GitHub Actions (Recomendado)

1. **Configure os secrets no GitHub:**
   - `CLOUDFLARE_API_TOKEN`: Token da API Cloudflare
   - `CLOUDFLARE_ACCOUNT_ID`: ID da sua conta Cloudflare
   - `DELTAPAG_API_KEY`: Chave da API DeltaPag

2. **Push para o repositório:**
   ```bash
   git add .
   git commit -m "feat: sistema de checkout DeltaPag"
   git push origin main
   ```

3. O GitHub Actions automaticamente fará o build e deploy

### Via Cloudflare Dashboard

1. Acesse o [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vá em **Pages** > **Create a project**
3. Conecte seu repositório GitHub
4. Configure:
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
   - **Framework preset:** Next.js
5. Adicione as variáveis de ambiente:
   - `DELTAPAG_API_KEY`
   - `DELTAPAG_API_URL`
   - `NEXT_PUBLIC_BASE_URL`

## 🛠️ Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Lint
npm run lint
```

## 🔒 Segurança

- ✅ API Key nunca exposta no frontend
- ✅ Validação de valores permitidos
- ✅ HTTPS obrigatório em produção
- ✅ Variáveis de ambiente protegidas
- ✅ CORS configurado adequadamente

## 📝 Notas de Desenvolvimento

### Valores Permitidos

Os valores de assinatura são fixos e validados:
- R$ 19,90
- R$ 29,90
- R$ 39,90
- R$ 49,90

Qualquer outro valor será rejeitado pela API.

### URLs de Retorno

- **Sucesso:** `/success?checkout_id={id}`
- **Cancelamento:** `/cancel?reason={motivo}`

### Modo de Teste

Para testar localmente sem integração real:

```typescript
// Em app/api/checkout/route.ts
// Adicione esta flag para modo de teste
const TEST_MODE = process.env.NODE_ENV === 'development'

if (TEST_MODE) {
  return NextResponse.json({
    success: true,
    checkoutUrl: '/success?checkout_id=test_checkout',
    checkoutId: 'test_checkout',
    amount: amount,
    planId: planId
  })
}
```

## 🐛 Troubleshooting

### Erro: "Configuração de API incompleta"
- Verifique se `DELTAPAG_API_KEY` está configurada no `.env.local`

### Erro: "Valor inválido"
- Certifique-se de usar apenas os valores permitidos: 19.90, 29.90, 39.90, 49.90

### Checkout não redireciona
- Verifique se `NEXT_PUBLIC_BASE_URL` está configurada corretamente
- Confirme que as URLs de retorno estão acessíveis

## 📞 Suporte

Para questões relacionadas à:
- **API DeltaPag:** Consulte a [documentação oficial](https://deltapag-tech.readme.io)
- **Este projeto:** Abra uma issue no GitHub

## 📄 Licença

ISC

---

**Desenvolvido com ❤️ usando Next.js 16 e Tailwind CSS**
