# Atividade REST

# 📚 Aula sobre APIs REST

---


1. Acessar https://caetanocc.github.io/rest/ 

2. cada aluno deve postar sua linha com nome e data de nascimento.  USAR POST 

3. Postar na base do professor, usando game.json  deve ser o primeiro passo da tarefa.

curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEDOALUNO\", \"dtnasc\": \"2000-01-06\" }" https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json
curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEALUNO\", \"dtnasc\": \"2000-01-06\"   }"  https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json

acessar   https://caetanocc.github.io/rest/lista2.html  para mostrar os resultados.


4. pedir aos alunos para realizar mais POST mostrando que aumentam os nrs.
5. marcar 5 min e gamificar, ganha quem tiver a maior qtde 

6. Agora , marcar mais 15 min. dar tempo para pensar em estratégia
7. ganhar quem tiver o maior nr. vale post e delete dos colegas.


8. Usar PATCH para alterar os dados de nota  , alterar nome e data tb

curl -X PATCH -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEALUNO\", \"dtnasc\": \"2000-01-06\"  }" https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json

curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEDOALUNO\", \"dtnasc\": \"2000-01-06\"  }" https://etec24-3dc8c-default-rtdb.firebaseio.com/game.json
curl https://etec24-3dc8c-default-rtdb.firebaseio.com/game/-Ne0YLL3sCnPdVewuM7F.json

curl -X PATCH -H "Content-Type: application/json" -d "{ \"nota\": \"MB" }" https://etec24-3dc8c-default-rtdb.firebaseio.com//game/-Ne0YLL3sCnPdVewuM7F.json
curl -X PATCH -H "Content-Type: application/json" -d "{ \"url\": \"caetanoc.github.io\" }" https://etec24-3dc8c-default-rtdb.firebaseio.com/game/-NWP6XTMmG-0U79bTEF0.json
curl -X PATCH -H "Content-Type: application/json" -d "{ \"url\": \"caetanoc.github.io\" }" https://etec24-3dc8c-default-rtdb.firebaseio.com/game/-Ne0YLL3sCnPdVewuM7F.json

Acessar  https://caetanocc.github.io/

9. apos os alunos visualizaerem os nomes de tods com as qtdes, ensinar metodo delete 

a. primeiro acessar https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json

b. aplicar comando para delete de um registro.
curl -X DELETE https://etec24-3dc8c-default-rtdb.firebaseio.com//game/-Nt6wFA7ELDdtLRwUdCV.json

curl -X DELETE https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json



