# Laboratório de REST

### Enviar comandos via cmd

## Comandos básicos REST:

* GET
* POST
* DELETE
* PATCH

```
curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEDOALUNO\", \"dtnasc\": \"2000-01-06\"  }" https://etec24-3dc8c-default-rtdb.firebaseio.com/game.json
```

```
curl https://etec24-3dc8c-default-rtdb.firebaseio.com/game.json
```

```
curl -X PATCH -H "Content-Type: application/json" -d "{ \"nota\": \"MB" }" https://etec24-3dc8c-default-rtdb.firebaseio.com/-Ne0YLL3sCnPdVewuM7F.json
```

```
curl -X PATCH -H "Content-Type: application/json" -d "{ \"url\": \"caetanocc.github.io\" }" https://etec24-3dc8c-default-rtdb.firebaseio.com/game/-NWP6XTMmG-0U79bTEF0.json
```
```
curl -X PATCH -H "Content-Type: application/json" -d "{ \"url\": \"caetanocc.github.io\" }" https://etec24-3dc8c-default-rtdb.firebaseio.com/game/-Ne0YLL3sCnPdVewuM7F.json
```



### game:  postar e deletar conteudo.

***Acessar interface para todos verem o conteudo da base.***

1. cada aluno deve postar sua linha com nome e data de nascimento.
2. todos os alunos devem fazer isso para alimentar a base.

```
curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEDOALUNO\", \"dtnasc\": \"2000-01-06\"  }" https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json
```

```
curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEALUNO\", \"dtnasc\": \"2000-01-06\"  }" https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json
```

3. Promover alterações na base via PATCH
   
```

curl -X PATCH -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEALUNO\", \"dtnasc\": \"2000-01-06\"  }" https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json
```

4. Buscar conteúdo na base via comando GET:

```
curl https://etec24-3dc8c-default-rtdb.firebaseio.com//game/-Nt6wFA7ELDdtLRwUdCV.json
```
   
5. Após os alunos visualizaerem os nomes de tods com as qtdes, usar metodo DELETE 

```
curl -X DELETE https://etec24-3dc8c-default-rtdb.firebaseio.com//game/-Nt6wFA7ELDdtLRwUdCV.json
```

6. Alunos devem realizar mais POST mostrando que aumentam os nrs.
   
7. marcar 5 min para o game, ganha quem tiver a maior qtde 

8. Após apurar os resultados , marcar mais 15 min. dar tempo para pensar em estratégia

9. ganha quem tiver o maior nr. vale post e delete dos colegas.


html para visualizar o conteudo da aula.
