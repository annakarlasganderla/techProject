# Para rodar o projeto.

## Na pasta /api rodar o seguinte comando 
docker-compose up -d \
docker run -p 5050:80 -e "PGADMIN_DEFAULT_EMAIL=pgadmin4@pgadmin.org" -e "PGADMIN_DEFAULT_PASSWORD=admin" -d elestio/pgadmin \
abrir o localhost:5050 \
irá aparecer uma tela de login do postgres o login é o seguinte \
email: pgadmin4@pgadmin.org \
senha: admin \
npm i \
npm run start:dev (roda o projeto)

## No cmd da maquina local digitar
'ipconfig'
para pegar o ip da rede local

## No arquivo src/database/database.module.ts
Adicionar o ip local da máquina 

## Na pasta webApp 
npm i \
npm run dev


