#!/bin/bash

# Script para iniciar o OctoFit Tracker
# Este script configura e inicia o frontend e backend

echo "🏋️  OctoFit Tracker - Setup Script"
echo "=================================="

# Define o Codespace name no .env do frontend
CODESPACE_NAME=${CODESPACE_NAME:-""}
if [ -n "$CODESPACE_NAME" ]; then
    echo "✅ Configurando Codespace: $CODESPACE_NAME"
    echo "REACT_APP_CODESPACE_NAME=$CODESPACE_NAME" > /workspaces/flai-workshop-github-copilot-800_turma19_3/octofit-tracker/frontend/.env
else
    echo "⚠️  Aviso: CODESPACE_NAME não definido"
fi

# Verifica se o MongoDB está rodando
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB está rodando"
else
    echo "❌ MongoDB não está rodando"
    echo "   Inicie com: mongod --dbpath /data/db --fork --logpath /tmp/mongod.log"
fi

# Verifica se o Django está rodando
if pgrep -f "manage.py runserver" > /dev/null; then
    echo "✅ Backend Django está rodando na porta 8000"
else
    echo "⚠️  Backend Django não está rodando"
    echo "   Inicie com debug ou execute:"
    echo "   cd octofit-tracker/backend && source venv/bin/activate && python manage.py runserver 0.0.0.0:8000"
fi

# Verifica se o React está rodando
if pgrep -f "react-scripts start" > /dev/null; then
    echo "✅ Frontend React está rodando na porta 3000"
    echo ""
    echo "⚠️  IMPORTANTE: Para carregar as novas configurações, você precisa:"
    echo "   1. Parar o servidor React (Ctrl+C no terminal)"
    echo "   2. Reiniciar com: cd octofit-tracker/frontend && npm start"
else
    echo "⚠️  Frontend React não está rodando"
    echo "   Inicie com: cd octofit-tracker/frontend && npm start"
fi

echo ""
echo "🌐 URLs do aplicativo:"
echo "   Frontend: https://$CODESPACE_NAME-3000.app.github.dev"
echo "   Backend:  https://$CODESPACE_NAME-8000.app.github.dev/api/"
echo ""
echo "📝 Arquivo .env criado em: octofit-tracker/frontend/.env"
