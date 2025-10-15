Ano: **2025**  
Curso: **DS**  
Disciplina: **PW3**  
Professor: **Claudiomiro**  
Aula: **12** — 16/10/2025
---
## Aula 12 — 16/10

### Objetivos da aula

*App React TCC* 

 - Mostrar entrega https://pre-tcc-4cf63.web.app/  

 - material nosql   https://github.com/Caetanocc/bd3


 - Criar conta banco atlas: Atlas https://www.mongodb.com/products/platform

 -  comparativo relacional vs nosql. mongodb

### Code Summary: INSERT in MongoDB
Insert a Single Record
To insert a single record into a SQL database, you would use the following command:

```
INSERT INTO users (first_name, last_name, phone, age) 
VALUES ('Nancy', 'Smith', "5234560987", 29);
```


To insert the same data into a MongoDB database, use the following:

```
db.users.insertOne(
    {
        first_name: "Nancy",
        last_name: "Smith",
        phone: "523-456-0987",
        age: 25
    }
)
```


Insert Multiple Records
To insert four records into a SQL database, you would use the following command:

```

INSERT INTO users (first_name, last_name, phone, age)
VALUES
  ('Douglas', 'Lowel', "5234768907", 23),
  ('Kai', 'Tran', "9198761234", 43),
  ('Linzey', 'Rivers', "7659023456", 54),
  ('Mira', 'Chan', "7650981234", 88);
```


To insert the same four documents into a MongoDB database, use the following:

```
db.users.insertMany([
    {
        first_name: "Douglas",
        last_name: "Lowel",
        phone: "523-476-8907",
        age: 23
    },
    {
        first_name: "Kai",
        last_name: "Tran",
        phone: "919-876-1234",
        age: 43,
    },
    {
        first_name: "Linzey",
        last_name: "Rivers",
        phone: "765-902-3456",
        age: 54,
    },
    {
        first_name: "Mira",
        last_name: "Chan",
        phone: "765-098-1234",
        age: 88,
    }
])
```


### Code Summary: SQL SELECT in MongoDB
Query for One Record
In SQL, we use the SELECT statement to query for specific records in the database:

SELECT chooses which fields to include in the output.
FROM chooses which table to select from.
LIMIT chooses how many records to return.
In the following example, we’re selecting the city and state fields from one entry in the zips table:

```
SELECT city, state FROM zips LIMIT 1;
```

To perform the same action in MongoDB, we use the findOne() method to return a single document from the zips collection.

```
db.zips.findOne({})
```


Query for Multiple Records
To query for more than one record in SQL, we use the SELECT statement along with a WHERE clause. Here, we’re selecting the city from the zips table where the state is equal to AZ, and the population is less than 500:

SELECT city FROM zips WHERE state = 'AZ' AND pop < 500;
Now, let’s do the same thing in MongoDB by providing a filter document to the find() method:

```
db.zips.find({state: 'AZ', pop: {$lt: 500}})
```


Use Projection to Modify Output
Let’s build on the previous query by returning the city field of every document. To do this in MongoDB, we would use a projection document like this:

```
db.zips.find({state: 'AZ', pop: {$lt: 500}}, {_id: 0, city: 1})
```


Explain a Query
If we want to better understand a query in SQL, we place the EXPLAIN keyword in front of our query. For example:

```
EXPLAIN SELECT city, state, pop 
            FROM zips 
WHERE state = 'NY' AND pop BETWEEN 1000 AND 5000 
ORDER BY pop DESC 
LIMIT 10;
```

MongoDB has its own explain method. We add the explain() method just before the find() command:

```
db.zips.explain().find(
    { state: "NY", pop: { $gte: 1000, $lte: 5000 }}, 
    {_id: 0, state: 1, city: 1, pop: 1}
    ).sort({pop: -1})
    .limit(10)
```

### Code Summary: BETWEEN, ORDER BY, LIMIT in MongoDB
In SQL, we can specify an order for our results by using ORDER BY. For example, in the following SQL statement, we’re selecting every record’s city, state, and population from the zips table, where the state is New York, and the population is between 1000 and 5000. We also want to order the results by population in descending order and limit it to the first 10 results. To do this, we use ORDER BY along with BETWEEN and LIMIT.

SELECT city, state, pop 
FROM zips 
WHERE state = 'NY' AND pop BETWEEN 1000 AND 5000 
ORDER BY pop DESC 
LIMIT 10;


The MongoDB equivalent of SELECT is the find() method. We can create the equivalent command by passing in a filter to select documents where the state is New York, and the population is between 1000 and 5000. We can also sort the results based on population by appending the sort() method to our query. Then, we use the limit() method to determine how many results to return:

```
db.zips.find(
    { state: "NY", pop: { $gte: 1000, $lte: 5000 }}
    ).sort({pop: -1})
    .limit(10)
```


Now, let’s pass in a projection document in MongoDB that excludes the _id and includes city, state, and population fields:

```
db.zips.find(
    { state: "NY", pop: { $gte: 1000, $lte: 5000 }}, 
    {_id: 0, state: 1, city: 1, pop: 1}
    ).sort({pop: -1})
    .limit(10)
```


### Code Summary: UPDATE in MongoDB
Insert a Single Record
In SQL, we use UPDATE to update a record. In the following example, we’re updating a record in the sales table, where the id is equal to 1234567, to set the store location to London.

```
UPDATE sales SET storeLocation = 'London' WHERE id = '1234567';
```

We can do the same thing in MongoDB by using the updateOne() method:

```
db.sales.updateOne(
  { _id: ObjectId("5bd761dcae323e45a93ccff1") },
  { $set: { storeLocation: "London" } }
);
```

If you want to update a document that may not already exist, you can optionally include it by setting the upsert option to true:

```
db.sales.updateOne(
  { _id: ObjectId("5bd761dcae323e45a93ccab2") },
  { $set: { storeLocation: "London" } },
  { upsert: true }
);
```


Update Multiple Records
In SQL, updating multiple records is similar to our first example where we updated a single record. Here, we're updating all records for purchases made online to indicate that they also used a coupon:

```
UPDATE sales SET couponUsed = true WHERE purchaseMethod = 'Online';
```

To perform this same action in MongoDB, we use the updateMany() method with a filter and the $set method:

```
db.sales.updateMany(
 { purchaseMethod: "Online" },
  { $set:  { couponUsed: true } }
);
```


### Code Summary: DELETE in MongoDB
Delete a Single Record
To delete a record in SQL, we use DELETE. In the following SQL statement, we’re deleting a record from the sales table, where the id is equal to 1234567:

```
DELETE FROM sales WHERE id = '1234567';
```
To do the same thing in MongoDB, we use the deleteOne() method:

```
db.sales.deleteOne({_id: ObjectId("5bd761dcae323e45a93ccff1")})
```


Delete Multiple Records
To delete multiple records in SQL, we still use a DELETE statement along with a WHERE clause. Here, we’re deleting every store located in Denver or New York:

```
DELETE FROM sales WHERE storeLocation IN ('Denver', 'New York');
```

To delete multiple documents in MongoDB, we use the deleteMany() method along with the $in operator:

```
db.sales.deleteMany({ storeLocation: {$in: [ 'Denver', 'New York' ]} });
```

### Code Summary: SQL JOINs In MongoDB 
In SQL, we use INNER JOIN in our statement to join two tables:

```
SELECT t.*, a.account_id, a.account_holder
              FROM transfers t
INNER JOIN account_holder a ON t.transfer_id = a.transfers_complete
```

This SQL JOIN query does the following:

Joins the records of the transfers table with the records of the accounts table.
Uses the transfers_complete field from the accounts table and the transfer_id field from the transfers table.
Projects the account_holder and account_id fields from the accounts table into the transfers table.
To do the same in MongoDB, we use the $lookup operator from the aggregation framework. Inside the $lookup stage, we define the following:

accounts is the collection to join.
transfer_id as localField is the field to use in the equality match from the input documents.
transfers_complete as foreignField is the field to use in the equality match from the transfers collection.
account_id and account_holder are the projected fields in the resulting documents while suppressing the _id field.
account_holder is the name of the new array field to add to the input documents.
Here’s the code:

```
db.transfers.aggregate( [
    {
      $lookup:
        {
          from: "accounts",
          localField: "transfer_id",
          foreignField: "transfers_complete",
          pipeline: [
 
             { $project: { _id: 0, account_id: 1, account_holder: 1 } }
          ],
          as: "account_holder"
      }
  }] )
```

  

---
## Aula 11 — 09/10

### Objetivos da aula

### 1. Ver andamento do trabalho dos TCCs.
comentar sobre as notas, se está tudo ok.


### 2. VERBOS HTTP:  Introdução ao REST 

GET 
POST
PUT 
DELETE 

https://github.com/Caetanocc/pw3_252/blob/main/Criar%20REALTIME%20DATABASE%20FIREBASE.pdf


### 3. Atividade coletiva.

Analisar conceitos faltantes:  cookies,REST,testes 


https://4sysops.com/archives/how-to-use-curl-on-windows/


Lab de REST

enviar via cmd
game:   postar e deletar conteudo.
criar interface para todos verem o conteudo da base.

Acessar https://caetanocc.github.io/


1. cada aluno deve postar sua linha com nome e data de nascimento.  USAR POST 

2. pedir a todos os alunos para fazer isso. deve ser o primeiro passo da tarefa.

curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEDOALUNO\", \"dtnasc\": \"2000-01-06\" }" https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json
curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEALUNO\", \"dtnasc\": \"2000-01-06\"  }"  https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json

3. acessar   https://caetanocc.github.io/rest/lista2.html  para mostrar os resultados.

4. pedir aos alunos para realizar mais POST mostrando que aumentam os nrs.
5. marcar 5 min e gamificar, ganha quem tiver a maior qtde 

6. Agora , marcar mais 15 min. dar tempo para pensar em estratégia
7. ganhar quem tiver o maior nr. vale post e delete dos colegas.


8. Usar PATCH para alterar os dados de nota 

curl -X PATCH -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEALUNO\", \"dtnasc\": \"2000-01-06\"  }" https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json

curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEDOALUNO\", \"dtnasc\": \"2000-01-06\"  }" https://etec22s2-default-rtdb.firebaseio.com/game.json
curl https://etec22s2-default-rtdb.firebaseio.com/game/-Ne0YLL3sCnPdVewuM7F.json

curl -X PATCH -H "Content-Type: application/json" -d "{ \"nota\": \"MB" }" https://etec22s2-default-rtdb.firebaseio.com//game/-Ne0YLL3sCnPdVewuM7F.json
curl -X PATCH -H "Content-Type: application/json" -d "{ \"url\": \"caetanoc.github.io\" }" https://etec22s2-default-rtdb.firebaseio.com/game/-NWP6XTMmG-0U79bTEF0.json
curl -X PATCH -H "Content-Type: application/json" -d "{ \"url\": \"caetanoc.github.io\" }" https://etec22s2-default-rtdb.firebaseio.com/game/-Ne0YLL3sCnPdVewuM7F.json



9. apos os alunos visualizaerem os nomes de tods com as qtdes, ensinar metodo delete 

a. primeiro acessar https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json

b. aplicar comando para delete de um registro.
curl -X DELETE https://etec24-3dc8c-default-rtdb.firebaseio.com//game/-Nt6wFA7ELDdtLRwUdCV.json

curl -X DELETE https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json


10. Acesso a dados via APIs REST

**VIACEP. Exemplos.**  implementar js react 

https://viacep.com.br/exemplo/javascript/

```
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import axios from "axios";

const BuscaEnderecoViaCEP = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuscarCep = async () => {
    if (cep.length !== 8) {
      setErro("CEP inválido! Deve conter 8 dígitos.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setErro("CEP não encontrado!");
        setEndereco(null);
      } else {
        setEndereco(response.data);
        setErro("");
      }
    } catch (error) {
      setErro("Erro ao buscar o CEP.");
      setEndereco(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <Input
        placeholder="Digite o CEP (somente números)"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        maxLength={8}
        className="w-60"
      />
      <Button onClick={handleBuscarCep} className="w-60" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Buscar Endereço"}
      </Button>

      {erro && <p className="text-red-500">{erro}</p>}

      {endereco && (
        <Card className="w-80 mt-4">
          <CardContent>
            <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
            <p><strong>Bairro:</strong> {endereco.bairro}</p>
            <p><strong>Cidade:</strong> {endereco.localidade}</p>
            <p><strong>Estado:</strong> {endereco.uf}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BuscaEnderecoViaCEP;

```



### 4. Mongodb


Acessar Mongodb pagina github 

1. seguir os passos para criar base com 2 collections 
https://github.com/Caetanocc/bd3/blob/main/01_Introducao_MongoDB.md

2. complemento de apis node.js para acessar dados Mongodb

https://github.com/Caetanocc/bd3/blob/main/03_APIs_MongoDB.md












---
## Aula 10 — 02/10

### Objetivos da aula

Nova tarefa. elaborar passos  :

1. Criar um app REACT do zero ou Fork do seu projeto chat 

**Se necessário, Usar como referência**: 
https://github.com/Caetanocc/pw3_252/blob/main/appInicial.md
https://github.com/Caetanocc/pw3_252/blob/main/addLogin.md
https://github.com/Caetanocc/pw3_252/blob/main/addHeaderMainLogin.md


2. Criar as páginas TCC, usar como referência MainPage.jsx  :

Criar 1 página TemaTCCPage.jsx para Tema do TCC com imagem e descrição, logo , etc.
Criar 1 página TimeTccPage.jsx com os membros do TCC, com foto de cada um 
Alterar o Header  para ter 2 buttons:  [Tema] e [Time]
Criar as Rotas para renderizar as páginas.

3. Escolher se prefere iniciar com LoginPage ou uma das páginas. 

4. Publicar seu projeto via firebase (é possivel criar outro projeto) 

5. Entregar o link , pode ser o mesmo para os membros do grupo TCC 
















---
## Aula 09 — 25/09

### Objetivos da aula

1. Retormar Avaliação da aula anterior 
2. Checar alunos que faltam concluir a atividade e dar suporte.
3. Mostrar versões entregues. 

4. Fechar notas dos alunos. no primeiro horário.
Concluir os fechamentos e comunicar no 2o.

Para quem já finalizou!
desafios. elaborar passos  :
1. Criar um app REACT do zero ou Fork do projeto chat 
2. Criar página inicial com tema do seu TCC 
3. Escolher se prefere iniciar com LoginPage ou MainPage 
4. Publicar seu projeto via firebase (é possivel criar outro projeto) 




---
## Aula 08 — 18/09

### Objetivos da aula

1. Revisar e Concluir a Lista de contatos.
2. Revisar  mensagens entre usuarios e testar.
3. Subir versão atualizada para web 

### Criar tarefa para entregar, valendo nota do trimestre.

**1. Criar cópia básica do projeto app Etec Chat**
Logar com sua conta em https://github.com
Acessar o Github do Professor.  https://github.com/Caetanocc/pw3_252 
Clicar no button [Fork]  para copiar o repositório para seu usuário.
baixar o código da pasta appEtecChat para seu pc
abrir em cmd, dentro da pasta do projeto digitar  ```npm install```
digite o comando para abrir o vscode ```code .```
no vscode dentro da pasta firebase acesso arquivo config.js e incluir suas chaves do firebase

no cmd execute  npm run dev
fazer os testes com a conta local.

**2. Implementar melhorias no Chat e melhorar CSS para ficar responsivo**
Acessar o link pw3_252/improveChat02.md at main · Caetanocc/pw3_252 
para implementar as melhorias necessárias do projeto.

**3. Subir seu projeto para Web para fazer a entrega da tarefa**
Seguir as instruções em pw3_252/improveChat02.md at main · Caetanocc/pw3_252
para subir o projeto para web e gerar um link publico.

Entrega deve ser o link do seu projeto.





---
## Aula 07 — 11/09

### Objetivos da aula


1. Revisar e Concluir a Lista de contatos.
2. Introdução a mensagens entre usuarios
3. Subir versão atualizada para web 



## Criar feature para Contatos e Conversas. versão inicial

### 1. partir do appIni básico. Fazer conforme tutorial do proprio exercício.

### 2. Criar feature dos contatos:


### revisão:
1. Acessar a pasta **views** do projeto e criar página para add novo contato  AddContactPage.jsx 

```
import { useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import './UserProfilePage.css';
import Header from '../components/Header';

const AddContactPage = () => {
  const pageTitle = "Adicionar Contato";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    photo: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  // Função para buscar o usuário pelo e-mail
  const fetchUserByEmail = async (email) => {
    setError('');
    setUserNotFound(false);

    if (!email) return;

    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setFormData(prev => ({
          ...prev,
          fullName: userData.fullName || '',
          photo: userData.photo || '',
          phone: userData.phone || ''
        }));
      } else {
        setUserNotFound(true);
        setFormData(prev => ({
          ...prev,
          fullName: '',
          photo: '',
          phone: ''
        }));
      }
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setError("Erro ao buscar usuário.");
    }
  };

  // Captura mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "email") {
      fetchUserByEmail(value); // Busca o usuário ao digitar o email
    }
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!auth.currentUser) {
      setError('Usuário não autenticado.');
      return;
    }

    if (!formData.fullName || !formData.phone) {
      setError('Nome e telefone são obrigatórios.');
      return;
    }

    try {
      setLoading(true);

      // Adiciona o contato na coleção "contacts"
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdBy: auth.currentUser.uid, // Usuário autenticado que adicionou o contato
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      setSuccess(true);
      setFormData({ email: '', fullName: '', photo: '', phone: '' });
      navigate("/"); // Redireciona para a lista de contatos
    } catch (err) {
      setError(err.message || 'Erro ao salvar o contato.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header pageTitle={pageTitle} />

      <div className="user-profile-container">
        <h2 className="text-2xl font-bold mb-6">{pageTitle}</h2>

        {error && <div className="user-profile-error">{error}</div>}
        {success && <div className="user-profile-success">Contato adicionado com sucesso!</div>}
        {userNotFound && <div className="user-profile-warning">Usuário não encontrado! Você pode editar os dados manualmente.</div>}

        <form onSubmit={handleSubmit} className="user-profile-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Foto URL</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
          />

          <label>Telefone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Contato'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddContactPage;


```



2. criar um Component ContactItem.jsx na pasta **components** 
```
import './ContactItem.css';

// eslint-disable-next-line react/prop-types
const ContactItem = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-item">
      <img src={user.photo} alt={user.fullName} className="user-photo" />
      <div className="user-info">
        <h3 className="user-name">{user.fullName}</h3>
        <p className="user-phone">{user.phone}</p>
      </div>
      <div className="user-actions">
        <button onClick={(e) => { e.stopPropagation(); onEdit(user.id)}}>Editar</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(user.id)}}>Excluir</button>
      </div>
    </div>
  );
};

export default ContactItem;


```

3. criar ContactItem.css na pasta  **components**

```
/* Estilos gerais para o item de usuário */
.user-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .user-actions {
    display: flex;
    gap: 10px;
    margin-left: auto;
  } 
   
  .user-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
  }
  
  .user-name {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }
  
  .user-phone {
    font-size: 14px;
    color: #555;
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .user-item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
```
  


3. criar pagina com Lista Contatos na pasta **views**   ContactListPage.jsx 
```
import { useState, useEffect } from 'react';
import ContactItem from '../components/ContactItem';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

const ContactList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'contacts');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-cont/${id}`);
  };


  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      
	  <div className="contact-list">
        {users.length === 0 ? (
          <div>Não há contatos disponíveis.</div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="contact-item" >
             <ContactItem 
                  user={user} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
            </div>
          ))
        )}

		{/* Botão flutuante, aqui abaixo */}
		

      </div>
    </>
  );
};

export default ContactList;



```

### Itens novos aula 07

	4. inserir Header na lista de contatos.

	```
			<Header pageTitle='👥 Lista'/>
	```


	5. criar button flutuante com simbolo + na pagina de Contatos.
	```
			<Link to="/add-cont">         <div className="floating-button">
				<span>+</span>
				</div>
			</Link>
	```

	6. alterar as rotas para abrir pagina add contato no **App.jsx**

	```
				<Route index element={<ContactList />} />
				<Route path="/user-prof" element={<UserProfileForm />} />
				<Route path="/add-cont"  element={<AddContactPage />} />

	```


	7. Criar página ChatPage.jsx na pasta **views**


	```
	import { useState, useEffect } from 'react';
	import { useParams } from 'react-router-dom';
	import { db, auth } from '../firebase/config';
	import { collection, query, where, orderBy, addDoc, serverTimestamp, onSnapshot, getDoc, doc } from "firebase/firestore";
	import Header from '../components/Header';
	import './Chat.css'

	const Chat = () => {
	  const { id } = useParams();
	  const [messages, setMessages] = useState([]);
	  const [newMessage, setNewMessage] = useState('');
	  const [contact, setContact] = useState(null);
	  const myUserId =  auth.currentUser.uid 

	  useEffect(() => {
		// Buscar informações do contato
		const fetchContact = async () => {
		  try {
			const contactRef = doc(db, 'contacts', id);
			const contactSnap = await getDoc(contactRef);
			if (contactSnap.exists()) {
			  setContact(contactSnap.data());
			}
		  } catch (error) {
			console.error("Erro ao buscar contato:", error);
		  }
		};

		// Buscar mensagens em tempo real
		const fetchMessages = () => {
		  const messagesRef = collection(db, 'messages');
		  const q = query(messagesRef, where('contactId', '==', id), orderBy('timestamp', 'asc'));

		  return onSnapshot(q, (snapshot) => {
			const messagesList = snapshot.docs.map(doc => ({
			  id: doc.id,
			  ...doc.data()
			}));
			setMessages(messagesList);
		  });
		};

		fetchContact();
		const unsubscribe = fetchMessages();

		return () => unsubscribe(); // Limpa o listener ao desmontar
	  }, [id]);

	  const handleSendMessage = async () => {
		if (newMessage.trim() === '') return;

		try {
		  await addDoc(collection(db, 'messages'), {
			contactId: id,
			senderId: myUserId,
			text: newMessage,
			timestamp: serverTimestamp()
		  });
		  setNewMessage('');
		} catch (error) {
		  console.error("Erro ao enviar mensagem:", error);
		}
	  };

	  return (
		<>
		  <Header pageTitle='💬 Conversa' />
		  
		  {contact && (
			<div className="chat-header">
			  <img src={contact.photo} alt={contact.fullName} className="contact-photo" />
			  <div className="contact-info">
				<h3>{contact.fullName}</h3>
				<p>{contact.phone}</p>
			  </div>
			</div>
		  )}

		  <div className="chat-container">
			<div className="chat-messages">
			  {messages.map(msg => (
				<div key={msg.id} className={`chat-message ${msg.senderId === myUserId ? 'sent' : 'received'}`}>
				  <p>{msg.text}</p>
				</div>
			  ))}
			</div>

			<div className="chat-input">
			  <input 
				type="text" 
				value={newMessage} 
				onChange={(e) => setNewMessage(e.target.value)} 
				placeholder="Digite uma mensagem..."
			  />
			  <button onClick={handleSendMessage}>Enviar</button>
			</div>
		  </div>
		</>
	  );
	};

	export default Chat;
	```

	9. criar um arquivo **Chat.css** na pasta **views**
		
	```
	.chat-container {
		display: flex;
		flex-direction: column;
		height: 80vh;
		padding: 10px;
		overflow-y: auto;
	  }
	  
	  .chat-messages {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		overflow-y: auto;
	  }
	  
	  .chat-message {
		max-width: 60%;
		padding: 10px;
		border-radius: 10px;
		word-wrap: break-word;
	  }
	  
	  .sent {
		align-self: flex-end;
		background-color: #007bff;
		color: white;
	  }
	  
	  .received {
		align-self: flex-start;
		background-color: #e5e5e5;
		color: black;
	  }
	  
	  .chat-input {
		display: flex;
		gap: 10px;
		padding: 10px;
	  }
	  
	  .chat-input input {
		flex: 1;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ddd;
	  }
	  
	  .chat-input button {
		padding: 10px;
		border: none;
		background-color: #007bff;
		color: white;
		border-radius: 5px;
		cursor: pointer;
	  }
	  
	```

	10. Na página **ContactListPage.jsx** , Incluir acessos para abrir chat: 

	a. incluir a function apos handleEdit
	```
	  const handleOpenChat = (id) => {
		navigate(`/chat/${id}`);
	  };
	```

	 b. incluir tratamento de evento na linha do contato.  dentro da div "<div key={user.id}  ..."
	 
	```
	onClick={() => handleOpenChat(user.id)}
	```

	11. Criar nova rota no **App.jsx**  para permitir carregar a pagina Chat

	```
				<Route path="/chat/:id"  element={<Chat />} />

	```


mandar aos alunos 
https://github.com/Caetanocc/pw3_252/blob/main/addChat.md






---
## Aula 06 — 04/09

### Objetivos da aula

Na última aula: 
Firebase Hosting
Component Header 

Na aula de 04/09:
Conferir se todos tem database Firestore
Perfil de usuario com Firestore
checar arquivo config.js do firebase 

1. Criar nova pagina, UserProfilePage


```
// UserProfilePage.jsx

import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';


const UserProfileForm = () => {

  const pageTitle = "Perfil usuário ";
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    photo: '',
    birthDate: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

//   const auth = getAuth();
//   const db = getFirestore();

  useEffect(() => {
    // Carrega dados existentes do usuário se houver
    const loadUserData = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            setFormData(userDoc.data());
          }
        }
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do usuário', err);
        setLoading(false);
      }
    };

    loadUserData();
  }, [auth.currentUser, db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      if (!auth.currentUser) {
        throw new Error('Usuário não está autenticado');
      }

      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        ...formData,
        email: auth.currentUser.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccess(true);
      navigate("/");

    } catch (err) {
      setError('Erro ao salvar dados. Por favor, tente novamente.');
      console.error('Erro:', err);
    }
  };

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <>

    <div className="container">
      <Header pageTitle={pageTitle} />
      <h2 className="text-2xl font-bold mb-6">Complete seu Perfil</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Dados salvos com sucesso!
        </div>
      )  }

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Foto URL
          </label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Data de Nascimento
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <button type="submit" className="active btn btn-block"        >          Salvar Dados        </button>
      </form>
    </div>
    </>
  );
};

export default UserProfileForm;
```



2. ajustar App.jsx para incluir Routes e renderizar UserProfileForm


```
function AuthContent() {
  const { user } = useAuth(); 
  return (
    <>
      {user ?
                <Routes>
                  <Route index element={<MainPage />} />
                  <Route path="/user-prof" element={<UserProfileForm />} />
                  
    
                </Routes>
     
       : 
      
      <LoginPage />}
    </>
  );
  
```
  
3. Atividade:  Mostrar fullName quando não vier do Google 

Add telefone ao form de user Profile.

após incluir o form de perfil do usuario, temos o projeto no github

averiguar se todos conseguem baixar o projeto base do github e colocar para rodar.
https://github.com/Caetanocc/pw3_251/tree/main/appIni






1. criar página para add novo contato  AddContactPage.jsx 

```
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase/config'; // Importando o Firestore e auth
import { useNavigate } from 'react-router-dom';
import './UserProfilePage.css'; // Importe o arquivo CSS
import Header from '../components/Header';

const AddContactPage = () => {
  const pageTitle = "Adicionar Contato";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    photo: '',
    birthDate: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Função de mudança no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      setLoading(true);

      if (!auth.currentUser) {
        throw new Error('Usuário não está autenticado');
      }

      // Criando um novo contato na coleção "contacts"
      const userCollectionRef = collection(db, 'contacts');
      await addDoc(userCollectionRef, {
        ...formData,
        email: auth.currentUser.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      setSuccess(true);
      setFormData({ fullName: '', photo: '', birthDate: '', phone: '' }); // Limpa o formulário após sucesso
      navigate("/"); // Navega de volta para a lista de contatos ou outra página desejada
    } catch (err) {
      setError('Erro ao salvar dados. Por favor, tente novamente.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header pageTitle={pageTitle}/>

      <div className="user-profile-container">
        <h2 className="text-2xl font-bold mb-6">{pageTitle}</h2>

        {error && <div className="user-profile-error">{error}</div>}
        {success && <div className="user-profile-success">Contato adicionado com sucesso!</div>}

        <form onSubmit={handleSubmit} className="user-profile-form">
          <label>Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Foto URL</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            required
          />

          <label>Data de Nascimento</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />

          <label>Telefone</label>
          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Contato'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddContactPage;

```



2. criar um Component ContactItem.jsx 
```
import './ContactItem.css'

// Componente de Item de Contato
// eslint-disable-next-line react/prop-types
const ContactItem = ({ user }) => {
  return (
    <div className="user-item">
      <img src={user.photoUrl} alt={user.fullName} className="user-photo" />
      <div className="user-info">
        <h3 className="user-name">{user.fullName}</h3>
        <p className="user-phone">{user.phone}</p>
      </div>
    </div>
  );
};

export default ContactItem;


```


3. criar pagina com Lista Contatos   ContactList.jsx 
```
import  { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Header from '../components/Header';
import './ContactList.css' 
import { Link } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null); // Para armazenar o contato a ser excluído

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contacts'));
        const contactsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setContacts(contactsList);
      } catch (err) {
        console.error('Erro ao buscar contatos: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    try {
      await deleteDoc(doc(db, 'contacts', contactId));
      setContacts(contacts.filter(contact => contact.id !== contactId)); // Remove o contato da lista local
      setConfirmation(false); // Fecha a caixa de confirmação
    } catch (err) {
      console.error('Erro ao excluir contato:', err);
    }
  };

  const showConfirmationDialog = (contactId) => {
    setContactToDelete(contactId); // Armazena o contato a ser excluído
    setConfirmation(true); // Exibe a caixa de confirmação
  };

  const hideConfirmationDialog = () => {
    setConfirmation(false); // Fecha a caixa de confirmação
    setContactToDelete(null); // Limpa o contato
  };

  return (
        <>
    
    <div className="contact-list-container">
      {loading ? (
        <div>Carregando contatos...</div>
      ) : (
        <div className="contact-list">
          {contacts.map(contact => (
            <div key={contact.id} className="contact-item">
              <img src={contact.photo} alt={contact.fullName} className="contact-photo" />
              <div className="contact-info">
                <h3>{contact.fullName}</h3>
                <p>{contact.phone}</p>
              </div>
              <button className="delete-btn" onClick={() => showConfirmationDialog(contact.id)}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Caixa de confirmação */}
      {confirmation && (
        <div className="confirmation-dialog">
          <p>Tem certeza que deseja excluir este contato?</p>
          <button onClick={() => handleDelete(contactToDelete)}>Sim</button>
          <button onClick={hideConfirmationDialog}>Cancelar</button>
        </div>
      )}

		{/* Botão flutuante */}

    </div>
    </>

  );
};

export default ContactList;
```



Aplicar quizzz

https://wayground.com/admin/quiz/66c4dbaeeac6fb148c52cef0?searchLocale=





---
## Aula 05 — 28/08

### Objetivos da aula

Firebase Hosting
Component Header 
Perfil de usuario com Firestore . criar base antes.


1. Implementar Firebase Hosting.
https://github.com/Caetanocc/pw3_252/blob/main/FirebaseHosting.md


2. Criar Componentes Header.jsx e criar function logout()

2.1  Criar base Firestore no projeto.

https://github.com/Caetanocc/pw3_252/blob/main/addHeaderMainLogin.md


```
npm install react-router-dom
```


```
import { NavLink } from 'react-router-dom';
import {auth}      from '../firebase/config.js';
import { useAuth } from '../contexts/AuthContext'; // Importe o hook useAuth

// eslint-disable-next-line react/prop-types
function Header({ pageTitle }) {
  const { user } = useAuth(); // Acesse o objeto user do contexto

  const handleSignOut = () => {
    if (window.confirm('Deseja sair, tem certeza?')) {
      auth.signOut();
    }
  };

  return (
    <>
      <div className="header-btns">
        <NavLink to="/">
          <button className="btn">Lista</button>
        </NavLink>

        <NavLink to="/user-prof">
          <button className="btn">Perfil</button>
        </NavLink>

        <div className="user-info">
          {user && (
            <>
              {user.photoURL ? (
                <div className="user-details">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '6px' }}
                  />
                  <span>{user.displayName}</span>
                </div>
              ) : (
                <div className="user-details">
                  <i className="fa fa-user" style={{ marginRight: '10px' }}></i>
                  <span>{user.email}</span>
                </div>
              )}
              <button onClick={handleSignOut} className="btn">Sair</button>
            </>
          )}
        </div>
      </div>

      <h1>{pageTitle}</h1>
    </>
  );
}

export default Header;
```



3. ajuste na main.jsx para envolver o App com BrowserRouter

```
import { BrowserRouter } from 'react-router-dom'; // Importe BrowserRouter

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Envolva App com BrowserRouter */}
    <App />
    </BrowserRouter>
  </StrictMode>,
)

```


4. Seguir para o Component Header, incluir CSS 

criar na pasta Components  Header.jsx 

```
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import './Header.css'; // Importe o arquivo Header.css

// eslint-disable-next-line react/prop-types
function Header({ pageTitle }) {
  const { user } = useAuth();

  const handleSignOut = () => {
    if (window.confirm('Deseja sair, tem certeza?')) {
      auth.signOut();
    }
  };

  return (
    <header className="header">
      <div className="header-nav">
        <NavLink to="/">
          <button className="btn">Lista</button>
        </NavLink>
        <NavLink to="/user-prof">
          <button className="btn">Perfil</button>
        </NavLink>
      </div>

      <h1>{pageTitle}</h1>

      <div className="header-user">
        {user && (
          <>
            {user.photoURL ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                />
                <span>{user.displayName}</span>
              </div>
            ) : (
              <div>
                <i className="fa fa-user"></i>
                <span>{user.email}</span>
              </div>
            )}
            <button onClick={handleSignOut} className="btn">Sair</button>
          </>
        )}
      </div>

    </header>
  );
}

export default Header;
```

5. criar css Header.css 

```
.header {
    background-color: #ADD8E6;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header-nav {
    display: flex;
  }
  
  .header-nav button {
    margin-right: 5px; /* Adicione margem entre os botões */
  }
  
  .header-user {
    display: flex;
    align-items: center;
  }
  
  .header-user img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 6px;
  }
  
  .header-user i {
    margin-right: 10px;
  }
  
  .header-user button {
    margin-left: 10px;
  }
  
```

6. Criar nova pagina, UserProfilePage


```
// UserProfilePage.jsx

import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';


const UserProfileForm = () => {

  const pageTitle = "Perfil usuário ";
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    photo: '',
    birthDate: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

//   const auth = getAuth();
//   const db = getFirestore();

  useEffect(() => {
    // Carrega dados existentes do usuário se houver
    const loadUserData = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            setFormData(userDoc.data());
          }
        }
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do usuário', err);
        setLoading(false);
      }
    };

    loadUserData();
  }, [auth.currentUser, db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      if (!auth.currentUser) {
        throw new Error('Usuário não está autenticado');
      }

      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        ...formData,
        email: auth.currentUser.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccess(true);
      navigate("/");

    } catch (err) {
      setError('Erro ao salvar dados. Por favor, tente novamente.');
      console.error('Erro:', err);
    }
  };

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <>

    <div className="container">
      <Header pageTitle={pageTitle} />
      <h2 className="text-2xl font-bold mb-6">Complete seu Perfil</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Dados salvos com sucesso!
        </div>
      )  }

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Foto URL
          </label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Data de Nascimento
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <button type="submit" className="active btn btn-block"        >          Salvar Dados        </button>
      </form>
    </div>
    </>
  );
};

export default UserProfileForm;
```



7. ajustar App.jsx para incluir Routes e renderizar UserProfileForm


```
function AuthContent() {
  const { user } = useAuth(); 
  return (
    <>
      {user ?
                <Routes>
                  <Route index element={<MainPage />} />
                  <Route path="/user-prof" element={<UserProfileForm />} />
                  
    
                </Routes>
     
       : 
      
      <LoginPage />}
    </>
  );
  
```
  
8. Atividade:  Mostrar fullName quando não vier do Google 

Add telefone ao form de user Profile.


9. Criar pagina com lista de usuarios



10. Criar diferentes tipos de permissão.


averiguar se todos conseguem baixar o projeto base do github e colocar para rodar.
https://github.com/Caetanocc/pw3_251/tree/main/appIni








---
## Aula 04 — 21/08

### Objetivos da aula

REACT , Vite com autenticação e autorização

https://github.com/Caetanocc/pw3_252/


Acessar o projeto da aula anterior, onde paramos.
Baixar o código para PC local.

1. instalar as dependências, dentro da pasta do projeto.

```
npm install 

npm install firebase
```

2. escrever embaixo do button submit, div.error 

Vamos tratar os erros, conforme eles surgem. 
Criar Renderização condicional.


3. criar variavel declarative ui , mostrar se for true.
 

```
 const [error, setError] = useState('');
```

4. criar a Renderização abaixo do button  

```
 
     {
                    error && 
                    <div className="error">
                      {error}
                    </div>
                  }
				  
```

4. ajustar o setError para limpar e mostrar msg

	 setError('')			  
  
5. criar function handleLogin(e) incluir onClick

    function handleSignIn(e){
        e.preventDefault();
        setError('')

        signInWithEmailAndPassword(auth, userCredenciais.email, userCredenciais.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)

            setError( errorMessage)

            // ..
        }); 
    }



6. mostrar na console.log os dados de login do usuario.


7. criar function handlePasswdReset

    function handlePasswordReset(){
        const email = prompt('Informe seu e-mail:')
        sendPasswordResetEmail(auth, email)
    }



8. criar function login com Google 

```
    const handleGoogleLogin = async(e) =>{
        e.preventDefault()

        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider) 

            const user = result.user
            console.log (' Google login ok', user)

        } catch(error){
            //const errorCode = error.code;
            console.error('Google login failed:', error);

            const errorMessage = error.message;
            setError( errorMessage)

        }

    }

```



9. Traduzir erros.  usar dictionaire    na LoginPage

Incluir na section de variaveis.
```
const dict_errors = {
    "auth/weak-password": "A senha é muito fraca. Exija pelo menos 6 caracteres, incluindo números e letras.",
    "auth/invalid-email": "O endereço de e-mail é inválido.",
    "auth/user-not-found": "Não foi encontrada nenhuma conta com este e-mail ou número de telefone.",
    "auth/wrong-password": "A senha está incorreta.",
    "auth/email-already-in-use": "O endereço de e-mail já está sendo usado por outra conta.",
    "auth/operation-not-allowed": "Esta operação não é permitida para este projeto.",
    "auth/user-disabled": "Esta conta de usuário foi desativada.",
    "auth/too-many-requests": "Muitas tentativas de login. Tente novamente mais tarde.",
    "auth/invalid-api-key": "A chave da API fornecida é inválida.",
    "auth/requires-recent-login": "É necessário fazer login recentemente para realizar esta ação.",
    "auth/invalid-credential" : "E-mail ou senha Inválida"
    // Adicione mais erros aqui conforme necessário
}
```


alterar nos tratamentos de erro.
```
setError( dict_errors[error.code] || error.message);
```

6.  Criar nova pasta em SRC :  contexts

7. Criar arquivo AuthContext.jsx  com esse conteudo.  incluir observer:
```
import  { useState, useEffect, createContext, useContext } from 'react';
import  { auth } from '../firebase/config.js'; // Importe a configuração do Firebase

// Criação do contexto de autenticação
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Limpeza do observador
  }, []); 

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}


```


8. Criar nova pagina em views:   MainPage.jsx 
```
import { auth } from '../firebase/config';

function MainPage() {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <h1>Página Principal</h1>
      <p>Bem-vindo!</p>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}

export default MainPage;

```




9. Adequar o login para somente permitir navegar em páginas quando estiver logado.

App.jsx

```
import './App.css'
import { AuthProvider } from './contexts/AuthContext'; // Importe o AuthProvider
import { useAuth } from './contexts/AuthContext'; // Importe o hook useAuth
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';

function App() {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
}

function AuthContent() {
  const { user } = useAuth(); // Agora o useAuth() deve retornar o valor correto

  return (
    <>
      {user ? <MainPage /> : <LoginPage />}
    </>
  );
}

export default App;

```


10.  alterar a MainPage.jsx para mostrar a foto do usuario

```
import { auth } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext'; // Importe o hook useAuth

function MainPage() {
  const { user } = useAuth(); // Acesse o objeto user do contexto

  const handleSignOut = () => {
    auth.signOut();
  };

  if (!user) {
    return <p>Carregando informações do usuário...</p>; // Ou redirecione para a página de login
  }

  return (
    <div>
      <h1>Página Principal</h1>
      {user.displayName && <p>Nome: {user.displayName}</p>}
      {user.photoURL && <img src={user.photoURL} alt="Foto do usuário" />}
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}

export default MainPage;

```




11. Criar Componentes Header.jsx e criar function logout()


```
npm install react-router-dom
```



```
import { NavLink } from 'react-router-dom';
import {auth}      from '../firebase/config.js';
import { useAuth } from '../contexts/AuthContext'; // Importe o hook useAuth

// eslint-disable-next-line react/prop-types
function Header({ pageTitle }) {
  const { user } = useAuth(); // Acesse o objeto user do contexto

  const handleSignOut = () => {
    if (window.confirm('Deseja sair, tem certeza?')) {
      auth.signOut();
    }
  };

  return (
    <>
      <div className="header-btns">
        <NavLink to="/">
          <button className="btn">Lista</button>
        </NavLink>

        <NavLink to="/user-prof">
          <button className="btn">Perfil</button>
        </NavLink>

        <div className="user-info">
          {user && (
            <>
              {user.photoURL ? (
                <div className="user-details">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '6px' }}
                  />
                  <span>{user.displayName}</span>
                </div>
              ) : (
                <div className="user-details">
                  <i className="fa fa-user" style={{ marginRight: '10px' }}></i>
                  <span>{user.email}</span>
                </div>
              )}
              <button onClick={handleSignOut} className="btn">Sair</button>
            </>
          )}
        </div>
      </div>

      <h1>{pageTitle}</h1>
    </>
  );
}

export default Header;
```



12. ajuste na main.jsx 

```
import { BrowserRouter } from 'react-router-dom'; // Importe BrowserRouter

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Envolva App com BrowserRouter */}
    <App />
    </BrowserRouter>
  </StrictMode>,
)

```





conforme modelo em 
https://github.com/Caetanocc/pw3/blob/main/react/appBase.md

no header

  
  function handleSignOut(){
    if(confirm('Are you sure you want to log out?')) {
	
	    auth.signOut();

    }
  }


		 <button onClick={handleSignOut} className="btn transparent">
		  Logout
		</button>






---
## Aula 03 — 14/08

### Objetivos da aula

Introdução ao REACT , Vite

https://github.com/Caetanocc/pw3_252/


1. ! npm install firebase dentro do projeto 
2. npm i -g firebase-tools
3. criar pasta firebase dentro de src

4. criar config.js e inserir as credentials
5.  import { getAuth } from "firebase/auth";
6.  criar const auth :   export const auth = getAuth(app)
7. na pagina LoginPage.jsx :   import {auth} from '../firebase/config.js' 
8. depois fazer console.log (auth)  antes return

9. vamos criar tratamento para os campos email e senha.  
const [userCredentials, setUserCredentials] = useState({})

10. incluir onChange nos inputs:   onChange={(e)=>{handleCred(e)}}
11. criar a function handleCred(e)
  function handleCred(e){
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
    console.log(userCredentials)
  } 

12. criar function handleSignUp(e) e incluir no onclick do button
onClick={(e)=>handleSignUp(e)}
function handleSignUp(e) {
    e.preventDefault()
    console.log('cadastrar')

  }

13.  fazer import do firebase
import { 
  createUserWithEmailAndPassword } from "firebase/auth";

14. aprimorar o signup

function handleSignUp(e) {
    e.preventDefault();
    //setError("");
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then((userCredential) => {

      console.log(userCredential.user)
      
      //dispatch(setUser({id: userCredential.user.uid, email: userCredential.user.email}));
    })
    .catch((error) => {
      console.log(error.message)
      //setError(error.message);
    });
  }

15.  testar com erro e conta valida. mostrar na console firebase qdo criar.





---
## Aula 02 — 07/08

### Objetivos da aula

- 1. Corrigir avaliação diagnóstica

- 2. tarefa git e github , criar no teams

Instruções:

Abrir o documento anexo atividadeGitGithub01.docx
Seguir as instruções para editar o código fonte do professor
Acompanhar o resultado em https://caetanocc.github.io/sorteio/
Marcar como entregue.
A tarefa estará concluída quando TODOS os alunos estiverem na lista com imagem.


git config --global user.name "My Name"

git config --global user.email "myemail@example.com"

1. gerar relação de alunos no nsa 
2. exportar para excel e abrir 
3. pegar a lista e preparar com nomes distintos. usar chatgpt 



ANGELO LINS DE OLIVEIRA
ARTHUR GOES FRANCELINO
CAIO MARQUES DRUMOND DA SILVA
CAIQUE LUCAS BENIGNO BORGES
EDUARDO ALVES VALERIO
ENZO YUJI UEMURA FERRAREZI
FERNANDO PAES DE JESUS CORREIA
FRANCISCO RODRIGUES LOPES
GABRIEL PINHEIRO GUIMARÃES
GUILHERME PEREIRA DE PAULA
GUSTAVO SANTOS PAFUME
INGRID LIMA DE OLIVEIRA
IVY GABRIELLE ROAH
JHONNY MARQUÊS MAGALHÃES
JONATHAN ALLYSON PATRICIO
JONATHAS DE MELO ARAUJO
JULIO CÉSAR DA SILVA SANTOS
KAUE BUENO LIMA
KAUÊ DAVI ROCHA DE JESUS
LUCAS HENRIQUE CARVALHO DA SILVA
LUCAS TEIXEIRA DE MORAES
MARCIANO SOARES DO NASCIMENTO
MATHEUS LEVI DAGEL
NICOLAS GALVAO BONFANTE
OLIVER LOBO DOURADO
RODRIGO SANTANA MATOS
ROGER CRISTIAN LEOPOLDINO DA SILVA
VITOR GABRIEL NEVES



---
## Aula 01 — 31/07

### Objetivos da aula

- Ingressar no GitHub (caso ainda não tenha conta): [https://github.com/](https://github.com/)
- Apresentação do professor: [LinkedIn](https://www.linkedin.com/in/caetanoc/)
- Apresentação dos alunos
- Apresentação e comentário das bases tecnológicas
- Apresentação dos critérios de avaliação:
    - Exercícios de colaboração e interação
    - Avaliação individual
    - Participação na aula
    - Desenvolvimento TCC
- Aplicação de avaliação diagnóstica

**Calendário do semestre:**  
TCC — Grupos e projetos

---

### Bases Tecnológicas

- Aplicações Web de Página Única (SPA):
  - Renderização de HTML
  - Templates e estilização
  - Componentes
  - Estados
  - Roteamento e navegação
  - Eventos
  - Formulários
  - Validação

- Conceitos de CMS (Content Management System):
  - Sessão de usuário / Cookies / Hash de autenticação

- Acesso a dados via APIs REST
- Autenticação e autorização
- Testes automatizados (Jest)

---

### Avaliação Diagnóstica

- Link público: [https://forms.gle/fToCmEmyNACg6Usz9](https://forms.gle/fToCmEmyNACg6Usz9)
- Link para edição: [Google Forms (edição)](https://docs.google.com/forms/d/1Ye28jGvZUX3f_5Ay426dB1m8kuoGJeANZi-WtGkO3ao/edit)

---

### Referências

- Checar instalação do Node.js
- Instalação do React

#### Links para referência:

- [Cookies — Minha Conexão](https://www.minhaconexao.com.br/blog/internet/cookies)
- [Gist: Cookies em JS](https://gist.github.com/cagartner/4c4dd7a6d5fa53e1f368)
- [REST x SOAP](https://blog.tecnospeed.com.br/rest-x-soap/)
- [Melhores frameworks de desenvolvimento web](https://www.lewagon.com/pt-BR/blog/melhores-frameworks-desenvolvimento-web)
- [O que é REST e RESTful? (Stack Overflow)](https://pt.stackoverflow.com/questions/45783/o-que-%c3%a9-rest-e-restful)
- [Microsoft Learn](https://docs.microsoft.com/pt-br/learn/)

---

#### Outros

- [Tipos de API](https://programadoresdepre.com.br/quais-sao-os-diferentes-tipos-de-api/)
- [Como usar regex em JS](https://programadoresdepre.com.br/como-usar-expressoes-regulares-em-javascript/)