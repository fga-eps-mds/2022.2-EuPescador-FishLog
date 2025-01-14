# 2022.2-EuPescador-FishLog
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022.2-EuPescador-FishLog&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022.2-EuPescador-FishLog) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022.2-EuPescador-FishLog&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022.2-EuPescador-FishLog) 

## 1. Ambiente de desenvolvimento
Para fazer uso do ambiente de desenvolvimento é necessário possuir dois pacotes instalados.
* docker
* docker-compose

### 1.1 Mas o que é Docker?
Docker é uma plataforma aberta, criada com o objetivo de facilitar o desenvolvimento, a implantação e a execução de aplicações em ambientes isolados. Para uma base maior do seu propósito e funcionamento é possível acessar o seguinte link:

https://www.redhat.com/pt-br/topics/containers/what-is-docker

## 1.2 Uso do Docker e Docker-compose
Para efetuar o build das imagens só se faz necessário rodar o seguinte comando na raiz do projeto:

```bash
docker compose build
```

Após o build, podemos fazer o comando na raiz do projeto para iniciar a imagem criada:
```bash
docker compose up
```

## 2. Configurações  
Para configurar o serviço deve criar variáveis de ambiente no servidor de acordo com arquivo .env.example

### 2.1 Migrations  
Para subir as migrations só se faz necessário rodar os seguintes comandos na raiz do projeto:
```bash
yarn migration:run
```