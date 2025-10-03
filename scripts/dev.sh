#!/bin/bash

# Script de desenvolvimento para o projeto de microserviços

set -e

echo "🚀 Iniciando ambiente de desenvolvimento..."

# Função para verificar se o Docker está rodando
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker não está rodando. Por favor, inicie o Docker Desktop."
        exit 1
    fi
    echo "✅ Docker está rodando"
}

# Função para limpar containers antigos
cleanup() {
    echo "🧹 Limpando containers antigos..."
    docker-compose down --remove-orphans
    docker system prune -f
}

# Função para build e start
start_services() {
    echo "🔨 Fazendo build dos serviços..."
    docker-compose build
    
    echo "🚀 Iniciando serviços..."
    docker-compose up -d
    
    echo "⏳ Aguardando serviços ficarem prontos..."
    sleep 10
    
    echo "🔍 Verificando status dos serviços..."
    docker-compose ps
}

# Função para mostrar logs
show_logs() {
    echo "📋 Logs dos serviços:"
    docker-compose logs --tail=50
}

# Função para parar serviços
stop_services() {
    echo "🛑 Parando serviços..."
    docker-compose down
}

# Função para executar testes
run_tests() {
    echo "🧪 Executando testes..."
    
    echo "Testando Controller Service..."
    docker-compose exec controller-service ./mvnw test
    
    echo "Testando Catalog Service..."
    docker-compose exec catalog-service ./mvnw test
    
    echo "Testando Frontend..."
    docker-compose exec frontend npm test -- --watchAll=false
}

# Função para mostrar URLs
show_urls() {
    echo ""
    echo "🌐 URLs disponíveis:"
    echo "Frontend: http://localhost:3000"
    echo "Auth API: http://localhost:8081"
    echo "Products API: http://localhost:8082"
    echo ""
    echo "🔐 Credenciais de teste:"
    echo "Username: admin"
    echo "Password: 123"
}

# Menu principal
case "${1:-start}" in
    "start")
        check_docker
        cleanup
        start_services
        show_urls
        ;;
    "stop")
        stop_services
        ;;
    "restart")
        stop_services
        sleep 2
        start_services
        show_urls
        ;;
    "logs")
        show_logs
        ;;
    "test")
        run_tests
        ;;
    "clean")
        cleanup
        ;;
    "status")
        docker-compose ps
        ;;
    "help")
        echo "Uso: $0 [comando]"
        echo ""
        echo "Comandos disponíveis:"
        echo "  start    - Inicia todos os serviços (padrão)"
        echo "  stop     - Para todos os serviços"
        echo "  restart  - Reinicia todos os serviços"
        echo "  logs     - Mostra logs dos serviços"
        echo "  test     - Executa todos os testes"
        echo "  clean    - Limpa containers e imagens"
        echo "  status   - Mostra status dos serviços"
        echo "  help     - Mostra esta ajuda"
        ;;
    *)
        echo "Comando desconhecido: $1"
        echo "Use '$0 help' para ver comandos disponíveis"
        exit 1
        ;;
esac
