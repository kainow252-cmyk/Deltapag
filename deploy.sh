#!/bin/bash

# Script de Deploy Automático para Cloudflare Pages
# Usa Wrangler CLI para fazer deploy via API

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║       🚀 Deploy Automático - Cloudflare Pages               ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar se as variáveis de ambiente estão configuradas
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ Erro: CLOUDFLARE_API_TOKEN não configurado"
    echo ""
    echo "📝 Para obter o token:"
    echo "   1. Acesse: https://dash.cloudflare.com/profile/api-tokens"
    echo "   2. Clique em 'Create Token'"
    echo "   3. Use template 'Edit Cloudflare Workers'"
    echo "   4. Ou crie custom com permissões: Account > Cloudflare Pages > Edit"
    echo "   5. Copie o token gerado"
    echo ""
    echo "🔧 Configure com:"
    echo "   export CLOUDFLARE_API_TOKEN='seu_token_aqui'"
    echo ""
    exit 1
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "⚙️  Usando Account ID padrão: ef4dfafae6fc56ebf84a3b58aa7d8b45"
    export CLOUDFLARE_ACCOUNT_ID="ef4dfafae6fc56ebf84a3b58aa7d8b45"
fi

echo "📦 Informações do Deploy:"
echo "   Account ID: $CLOUDFLARE_ACCOUNT_ID"
echo "   Zone ID: ff82ebf9edf15aa07d62e8d32855eea7"
echo ""

# Nome do projeto
PROJECT_NAME="${1:-deltapag-checkout}"

echo "🏗️  Projeto: $PROJECT_NAME"
echo ""

# Verificar se o wrangler está instalado
if ! command -v wrangler &> /dev/null; then
    echo "📥 Instalando Wrangler CLI..."
    npm install -g wrangler@latest
    echo "✅ Wrangler instalado!"
    echo ""
fi

# Build do projeto
echo "🔨 Fazendo build do projeto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build!"
    exit 1
fi

echo "✅ Build concluído!"
echo ""

# Deploy para Cloudflare Pages
echo "🚀 Fazendo deploy para Cloudflare Pages..."
echo ""

wrangler pages deploy .next \
    --project-name="$PROJECT_NAME" \
    --branch=main \
    --commit-dirty=true

if [ $? -eq 0 ]; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                                                              ║"
    echo "║           ✅ DEPLOY CONCLUÍDO COM SUCESSO! ✅               ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "🌐 Sua aplicação está disponível em:"
    echo "   https://$PROJECT_NAME.pages.dev"
    echo ""
    echo "📝 Próximos passos:"
    echo "   1. Configure as variáveis de ambiente no Cloudflare"
    echo "   2. Atualize NEXT_PUBLIC_BASE_URL com a URL do deploy"
    echo "   3. Teste os checkouts em produção"
    echo ""
else
    echo ""
    echo "❌ Erro no deploy!"
    echo ""
    echo "🔍 Possíveis soluções:"
    echo "   1. Verifique se o token tem permissões corretas"
    echo "   2. Confirme se o Account ID está correto"
    echo "   3. Tente fazer login: wrangler login"
    echo ""
    exit 1
fi
