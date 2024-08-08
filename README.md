# Go-React server

Uma aplicação em Go + React que permite aos usuários interagir em um ambiente de perguntas e respostas. Com esta aplicação, você pode postar perguntas, responder a perguntas de outros usuários e reagir a perguntas que lhe interessam.

## Visão Geral

A aplicação é projetada para oferecer um espaço simples e eficiente para discussão e troca de conhecimentos. A estrutura principal inclui:

- **Postar Perguntas**: Crie novas perguntas para obter respostas da comunidade.
- **Responder Perguntas**: Forneça respostas às perguntas feitas por outros usuários.
- **Reagir a Perguntas**: Expresse sua opinião sobre as perguntas com reações.

## Tecnologias Utilizadas

- **Golang**: Linguagem principal para o desenvolvimento da aplicação no backend.
- **Docker / Docker Compose**: Gerenciamento de containers.
- **PostgreSQL**: Banco de dados.

## Instalação

### Pré-requisitos

Certifique-se de ter o [Go](https://go.dev/) instalado em sua máquina.

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/acluiz/go-react-server
 ```
2. **Instale as dependências**
```bash
go mod tidy
 ```
3. **Inicie o docker**
```bash
docker compose up
 ```
4. **Execute a aplicação**
```bash
go run cmd/ws/main.go
```
