Ano: **2025**  
Curso: **DS**  
Disciplina: **PW3**  
Professor: **Claudiomiro**  
Aula: **04** — 21/08/2025

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

4. criar a Renderização da mensagem de erro na tela.  

```
      {  error &&  <div className="error">  {error}  </div>  }
			  
```

4. ajustar o setError para limpar e mostrar msg

	 setError('')			  
  
5. criar function handleLogin(e) incluir onClick

    function handleLogin(e){
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
