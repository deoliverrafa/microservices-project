# Sistema de Microserviços - Frontend + DevOps

Este projeto implementa uma arquitetura de microserviços completa com frontend React e pipeline CI/CD automatizado.

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Controller    │    │   Catalog       │
│   (React)       │◄──►│   Service       │◄──►│   Service       │
│   Port: 3000    │    │   Port: 8081    │    │   Port: 8082    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Tecnologias

### Backend
- **Java 17** + Spring Boot
- **Maven** para gerenciamento de dependências
- **Docker** para containerização

### Frontend
- **React 18** + TypeScript
- **Tailwind CSS** para estilização
- **Axios** para requisições HTTP
- **React Router** para navegação

### DevOps
- **Docker** + Docker Compose
- **GitHub Actions** para CI/CD
- **Nginx** para proxy reverso

## 📋 Pré-requisitos

- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento local)
- Java 17+ (para desenvolvimento local)
- Maven 3.6+ (para desenvolvimento local)

## 🛠️ Como Executar

### Opção 1: Docker Compose (Recomendado)

```bash
# Clone o repositório
git clone <repository-url>
cd microservices-project

# Execute todos os serviços
docker-compose up --build

# Acesse a aplicação
# Frontend: http://localhost:3000
# Auth API: http://localhost:8081
# Products API: http://localhost:8082
```

### Opção 2: Desenvolvimento Local

```bash
# Backend - Controller Service
cd controller
./mvnw spring-boot:run

# Backend - Catalog Service  
cd model
./mvnw spring-boot:run

# Frontend
cd frontend
npm install
npm start
```

## 🔐 Credenciais de Teste

- **Username**: admin
- **Password**: 123

## 📡 APIs Disponíveis

### Controller Service (Auth) - Porta 8081

```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123"
}
```

### Catalog Service (Products) - Porta 8082

```http
GET /products
Authorization: Bearer <token>

POST /products/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Produto Exemplo",
  "price": 29.99
}
```

## 🔄 Pipeline CI/CD

O pipeline automatizado inclui:

1. **Testes Automatizados**
   - Testes unitários Java (JUnit)
   - Testes React (Jest)
   - Linting e validação de código

2. **Build e Push**
   - Build de imagens Docker
   - Push para Docker Hub
   - Cache otimizado

3. **Deploy**
   - Deploy automático em produção
   - Health checks
   - Rollback automático

### Configuração do GitHub Actions

Para usar o pipeline, configure os secrets no GitHub:

```bash
DOCKER_USERNAME=seu-usuario-dockerhub
DOCKER_PASSWORD=sua-senha-dockerhub
```

## 📁 Estrutura do Projeto

```
microservices-project/
├── controller/                 # Auth Service
│   ├── src/main/java/
│   ├── Dockerfile
│   └── pom.xml
├── model/                     # Catalog Service
│   ├── src/main/java/
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                  # React Frontend
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── .github/workflows/         # CI/CD Pipeline
│   └── ci-cd.yml
├── docker-compose.yml         # Orquestração
└── README.md
```

## 🧪 Testes

### Executar Testes Localmente

```bash
# Backend
cd controller && ./mvnw test
cd model && ./mvnw test

# Frontend
cd frontend && npm test
```

### Executar com Docker

```bash
# Todos os testes
docker-compose -f docker-compose.test.yml up --build
```

## 📊 Monitoramento

### Logs
```bash
# Ver logs de todos os serviços
docker-compose logs -f

# Logs de um serviço específico
docker-compose logs -f frontend
```

### Health Checks
```bash
# Verificar status dos serviços
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
```

## 🔧 Desenvolvimento

### Adicionando Novos Serviços

1. Crie a pasta do serviço
2. Adicione Dockerfile
3. Configure no docker-compose.yml
4. Atualize o pipeline CI/CD

### Modificando o Frontend

1. Edite os componentes em `frontend/src/`
2. Atualize os tipos em `frontend/src/types/`
3. Modifique os serviços em `frontend/src/services/`

## 🚨 Troubleshooting

### Problemas Comuns

1. **Porta já em uso**
   ```bash
   # Verificar processos usando as portas
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :8081
   netstat -tulpn | grep :8082
   ```

2. **Erro de conexão entre serviços**
   ```bash
   # Verificar rede Docker
   docker network ls
   docker network inspect microservices-project_microservices-network
   ```

3. **Build falhando**
   ```bash
   # Limpar cache Docker
   docker system prune -a
   docker-compose build --no-cache
   ```

## 📈 Próximos Passos

- [ ] Implementar JWT real
- [ ] Adicionar monitoramento (Prometheus/Grafana)
- [ ] Configurar service mesh (Istio)
- [ ] Implementar testes E2E
- [ ] Adicionar documentação da API (Swagger)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: Equipe de Microserviços
- **DevOps**: Pipeline CI/CD
- **Frontend**: React + TypeScript

---

**Versão**: 1.0.0  
**Última atualização**: $(date)
