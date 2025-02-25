### Criar projeto REACT com vite

*   Crie uma nova pasta c:\pw3 no PC e posicione nela
*   Abra um cmd do Windows na pasta c:\pw3 e execute o código :

```
npm install -g create-vite
npm create vite@latest appBase 
```
- Escolha como nome do package:  **package.json**
- Escolha opção **React**
- Escolha **JavaScript + SWC**

```
cd appBase
npm install
npm run dev 
```

*  após rodar utilize a opção 'o' para abrir o projeto no navegador , deve abrir algo como http://localhost:5173/
  
*  abra outro cmd na pasta c:\pw3\appBase 

*  instale outros pacotes necessários ao projeto com os comandos:
```
npm install react-router-dom
npm install firebase 
npm install @reduxjs/toolkit 
npm install react-redux
npm install react-modal

```
 
*  digite o comando para abrir o vscode
``` code . ```   

*  no vscode dentro de ***src*** crie uma pasta ***firebase*** e dentro crie arquivo config.js 
*  inclua o código no config.js , lembre-se de incluir suas chaves do firebase 

```
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: " ",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);

``` 

* se preferir basta copiar pasta /firebase de outro projeto.


*  no vscode dentro de ***src*** crie uma pasta ***store*** e dentro crie arquivo store.js 
*  inclua o código no store.js 
``` 
import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './usersSlice.js';

export default configureStore({
  reducer: { 
    
    users: usersReducer
  }
})
``` 

*  na mesma pasta store, crie outro arquivo usersSlice.js e inclua o código 

``` 
import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: null
  },
  reducers: {
    setUser: (users, action) => {
        users.currentUser = action.payload;
    }
  }
})

export const { setUser } = usersSlice.actions;

export const selectUsers = state => state.users;
export default usersSlice.reducer;
``` 

*  dentro de ***src*** crie uma pasta ***components*** 

*  dentro de ***src*** crie uma pasta ***views*** 

*  na pasta ***components*** crie um arquivo ***Header.jsx*** e incluia:

``` 
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from '../firebase/config.js';
import {useDispatch} from 'react-redux';
import {setUser} from '../store/usersSlice.js';

import { useSelector } from 'react-redux';
import {selectUsers } from '../store/usersSlice'; // Seleciona dados do usuário

// eslint-disable-next-line react/prop-types
function Header({pageTitle }) {
  
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUsers).currentUser;
  
  function handleSignOut(){
    if(confirm('Deseja sair , tem certeza?')) {
      signOut(auth).then(() => {
        dispatch(setUser(null));
      }).catch((error) => {
        console.log(error);
      });

    }
  }

    return (
      <>


            <div className="header-btns">
                    <NavLink to="/">
                      <button className="btn">Lista</button>
                    </NavLink>

                    <div className="user-info">

                    {/* Verifica se o usuário está logado e se tem as propriedades do Google */}
                    {currentUser && (
                        <>
                            {currentUser.foto ? (
                                // Exibe a foto e nome do usuário Google
                                <div className="user-details">
                                    <img
                                        src={currentUser.foto}
                                        alt={currentUser.nome}
                                        style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '6px' }}
                                    />
                                    <span>{currentUser.nome}</span>
                                </div>
                            ) : (
                                // Exibe um ícone de pessoa se não for login com Google
                                <div className="user-details">
                                    <i className="fa fa-user" style={{ marginRight: '10px' }}></i>
                                    <span>{currentUser.email}</span>
                                </div>
                            )}
                            {/* Botão de logout */}
                            <button onClick={handleSignOut} className="btn">Sair</button>
                        </>
                    )}
                </div>

            </div>

            <h1>{pageTitle}</h1>
    
      </>
    )
  }
  
  export default Header
  
```


* na pasta ***components*** crie um arquivo ***Item.jsx*** e incluia:

```
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Item({ item }) {
    return (
        <>
            <Link to={'/item/' + item.id}>
                <div className="item">
                    <div className="item-foto">
                        <img src={item.foto} alt="Foto do item" />
                    </div>

                    <div className="item-details">
                        <h3 className="item-nome">{item.nome}</h3>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default Item;

```


*  na pasta ***views*** crie um arquivo ***LoginPage.jsx*** e inclua:

```
import {useState} from 'react';
import {auth} from '../firebase/config.js' 
import { 
    createUserWithEmailAndPassword
  , signInWithEmailAndPassword
  , sendPasswordResetEmail
  , onAuthStateChanged
  , GoogleAuthProvider
  , signInWithPopup   } from "firebase/auth";

import {useDispatch} from 'react-redux';
import {setUser} from '../store/usersSlice.js';
  
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

function LoginPage() {

  const [loginType, setLoginType] = useState('login');

  const [userCredentials, setUserCredentials] = useState({})
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({id: user.uid, email: user.email, foto: user.photoURL, nome: user.displayName}));
    } else {
      dispatch(setUser(null));
    }
    
  });

  function handleCred(e){
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
    console.log(userCredentials)
  } 
  
  function handleSignUp(e) {
    e.preventDefault();
    setError("");
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then((userCredential) => {

      console.log(userCredential.user)
      
    })
    .catch((error) => {
      console.log(error.code)
      console.log(error.message)
      
      setError( dict_errors[error.code] || error.message);
    });
  }

  function handleLogin(e){
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then((userCredential) => {
      console.log(userCredential.user)
    })
    .catch((error) => {

      console.log(error.code)
      console.log(dict_errors[error.code])

      setError( dict_errors[error.code] || error.message);
    });
  } 

  function handlePasswordReset() {
    const email = prompt('Informe seu email');
    sendPasswordResetEmail(auth, email);
    alert('Email sent! Check your inbox for password reset instructions.');
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider); 

      const user = result.user;  


      // Handle successful Google login here
      console.log('Google login successful:', user);
      // You can extract the user's email and other information from user
      // and pass it to your login function (potentially creating a user if needed)
      // handleLogin({ email: user.email }); // Example: Pass email to handleLogin
    } catch (error) {
      // Handle Google login errors
      console.error('Google login failed:', error);
      setError(error.message); // Or a more user-friendly error message
    }
  };



    return (
      <>
        <div className="container login-page">
          <section>
            <h1>Etec Albert Einstein</h1>
            <p>Entre ou crie uma conta para continuar.</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Entrar
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Criar Conta
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>E-mail *</label>
                      <input onChange={(e)=>{handleCred(e)}} type="text" name="email" placeholder="Informe seu email" />
                  </div>
                  <div className="form-control">
                      <label>Senha *</label>
                      <input onChange={(e)=>{handleCred(e)}} type="password" name="password" placeholder="Informe a senha" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>handleLogin(e)} className="active btn btn-block">Entrar</button>
                    : 
                    <button onClick={(e)=>handleSignUp(e)} className="active btn btn-block">Criar Conta</button>


                  }

                  {
                    <button onClick={(e)=>handleGoogleLogin(e)} className="active btn btn-block">Login com Google</button>
                  }

 
                  {
                    error && 
                    <div className="error">
                      {error}
                    </div>
                  }
                  <p onClick={handlePasswordReset} className="forgot-password">Esqueci minha senha.</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
```

*  na pasta ***views*** crie um arquivo ***ListaPage.jsx*** e inclua:


```
import Item from '../components/Item.jsx';
import Header from '../components/Header.jsx';
import { useSelector } from 'react-redux';
import { db } from '../firebase/config.js';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { selectUsers } from '../store/usersSlice.js';
import { Link } from 'react-router-dom';

function ListaPage() {

    const uid = useSelector(selectUsers).currentUser.id;
    const [Items, setItems] = useState([]);

    const pageTitle = "👥 Lista ";

    useEffect(() => {
        const fetchItems = async () => {
            const q = query(collection(db, "items"), where("user_id", "==", uid));
            const querySnapshot = await getDocs(q);
            let ItemList = [];
            querySnapshot.forEach((doc) => {
                ItemList.push({ id: doc.id, ...doc.data() });
            });
            setItems(ItemList);
        };

        fetchItems();
    }, [uid]);

    return (
        <>
            <div className="container">
                <Header pageTitle={pageTitle} />
                <div className="Items-container">
                    <div className="Items-list">
                        {Items.map(item => 
                            <Item key={item.id} item={item} />
                        )}
                    </div>
                </div>

                {/* Botão flutuante para adicionar Item */}
                <Link to="/add-item" className="floating-button">
                         <i className="fa fa-plus"></i>
                </Link>

            </div>
        </>
    );
}

export default ListaPage;


```

*  na pasta ***views*** crie um arquivo ***AddItemPage.jsx*** e inclua:

```

import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; 
import { db, auth } from '../firebase/config.js';

function AddItemPage() {

    const navigate = useNavigate();

    const handleAddItem = async (e) => {
        e.preventDefault();

        const newItem = {
            nome: document.querySelector('input[name=nome]').value,
            foto: document.querySelector('input[name=foto]').value,
        }

        if (newItem.nome && newItem.foto ) {

            newItem.user_id = auth.currentUser.uid;
            const docRef = await addDoc(collection(db, "items"), newItem);
            newItem.id = docRef.id;

            //alert('Item incluído com sucesso!');
            navigate("/");
        } else {
            alert('Por favor, preencha os campos obrigatórios.');
        }
    }

    const pageTitle = "Adicionar 1 Item";

    return (
        <>
            <div className="container">
                <Header pageTitle={pageTitle} />

                <form className="add-form">
                    <div className="form-control">
                        <label>Nome do Item *</label>
                        <input type="text" name="nome" placeholder="Nome do Item" />
                    </div>
                    <div className="form-control">
                        <label>Foto do Item *</label>
                        <input type="text" name="foto" placeholder="Foto: informe uma URL" />
                    </div>

                    <button onClick={(e) => handleAddItem(e)} className="btn btn-block">Salvar</button>
                </form>
            </div>
        </>
    );
}

export default AddItemPage;
```

* Localize o arquivo ***index.html***

* Substitua a section ***<header>*** por esse conteúdo

```
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
    integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"
      integrity="sha512-6PM0qYu5KExuNcKt5bURAoT6KCThUmHRewN3zUFNaoI6Di7XJPTMoT6K0nsagZKk2OB4L7E3q1uQKHNHd4stIQ=="
      crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <title>Etec AE Firebase</title>
  </head>
```

* Localize o arquivo ***index.css***

* Substitua  por esse conteúdo

```
@import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400;1,500&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Lora", sans-serif;
}
body {
  background-color: #d0e2f2;
}

img {
  width: 100px;
  height: 100px;
  box-shadow: 0px 4px 11px 0px rgb(0 0 0 / 14%);
}

#app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-page-loader {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: white;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.full-page-loader .lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.full-page-loader .lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #bcbcbc;
  border-color: #bcbcbc transparent #bcbcbc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* form input */

input:not([type="checkbox"]), textarea {
  border-color: #dfdfdf;
  background-color: #fdfcfb;
  color: #393939;
  transition: border-color 0.2s ease-in-out;
  font-size: 16px;
  line-height: 22px;
  font-weight: normal;
  font-style: normal;
  height: 50px;
  padding: 0 20px;
  max-width: 100%;
  border-width: 1px;
  border-style: solid;
  appearance: none;
  min-width: 100px;
  width: 100%;
  border-radius: 25px;
  margin: 20px 0 0;
}

textarea {
  height: 200px;
  padding-top: 10px;
}

.add-form {
  margin-top: 40px;
}


.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}

.form-control-check {
  display: flex;
  align-items: center;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
.form-control input[type="checkbox"] {
  width: auto;
  flex: unset;
  height: 20px;
  margin-right: 20px;
}

input:focus {
  border-color: #484c53;
  outline: none;
}

/* button */

.btn {
  display: inline-block;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 12px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}

/* container */

.container {
  width: 1400px;
  max-width: 100%;
  margin: auto;
  overflow: auto;
  min-height: 300px;
  background-color: #faf8f2;
  padding: 30px;
  padding-top: 60px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0px 4px 11px 0px rgb(0 0 0 / 14%);
}

@media (max-width: 768px) {
  .container {
    padding: 60px 30px;
  }
}

.container h1 {
  margin-bottom: 20px;
}
.container .header-btns {
  position: absolute;
  top: 0;
  right: 10px;
}

.container a.active button.btn,
.container .btn.active    {
  background: #1cab47;
  color: #fff;
}

.container button.btn {
  margin-top: 0;
  background: #e3e3e3;
  color: #000;
}

.container button.btn.transparent {
  background-color: transparent;
  text-decoration: underline;
}

.container .header-btns button.btn {
  border-radius: 0 0 15px 15px;
}

.container .books-container {
  margin-top: 50px;
}

/* table */

table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 30px;
  width: 100%;
  background-color: #fdfcfb;
}
table th,
table td {
  border-width: 0;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding: 13px 30px;
}
table tr:first-child td,
table tr:first-child th {
  border-top-width: 1px;
  border-top-style: solid;
}
table tr td:first-child,
table tr th:first-child {
  border-left-width: 1px;
  border-left-style: solid;
}
table tr td:last-child,
table tr th:last-child {
  border-right-width: 1px;
  border-right-style: solid;
}
table.is-style-stripes {
  border-width: 0;
  border-style: solid;
}
table.is-style-stripes tr:nth-child(odd) {
  background-color: transparent !important;
}

table tr td,
table tr th {
  padding: 15px 30px;
}
table tr td,
table tr th {
  text-align: left;
}




@media (max-width: 768px) {
  .books-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .books-list {
    grid-template-columns: 1fr;
  }
}


.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-page h1, p {
  text-align: center;
}

.login-page p {
  margin-bottom: 24px;
}

.login-page .login-type {
  text-align: center;

}

.login-page .add-form.login {
  width: 600px;
  max-width: 100%;
}

.login-page .add-form .error {
  text-align: center;
  color: red;
  margin-top: 8px;
}

.login-page p.forgot-password {
  margin-top: 12px;
  color: #0000EE;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
}

.login-page.container button.btn.selected    {
  background: #3e3e3e;
  color: #fff;
}

.login-page.container button.btn.login    {
  background: #3e3e3e;
  color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: right;
}

.user-details {
  display: flex;
  align-items: right;
  margin-right: 10px;
  font-size: 9px;
}

.btn {
  background-color: #f04e4e;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #d94343;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #00ff5e; /* Azul ou a cor de sua preferência */
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  z-index: 1000;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.floating-button:hover {
  background-color: #00b339; /* Cor ao passar o mouse */
}

```


* Localize o arquivo ***main.jsx*** e substitua o conteúdo por esse:

```
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';

import Modal from 'react-modal';

// Defina o app element como a div que contém sua aplicação React.
// Se estiver usando 'create-react-app', o id é geralmente 'root'.
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)

```


* Localize o arquivo ***App.jsx***

* Para ajustar rotas use o conteúdo, substitua tudo.

```
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './views/LoginPage.jsx';
import ListaPage from './views/ListaPage.jsx'
import AddItemPage from './views/AddItemPage.jsx';

import {selectUsers} from './store/usersSlice.js';
import {useSelector} from 'react-redux';

function App() {
  const user = useSelector(selectUsers);

  return (
    <>
      {
          user.currentUser ? 
          <BrowserRouter>
            <Routes>
              <Route index element={<ListaPage />} />
              <Route path="/item/:id" element={<ListaPage />} />
              <Route path="/add-item" element={<AddItemPage />} />

            </Routes>
          </BrowserRouter>
          :
          <LoginPage />
      } 

    </>
  )
}

export default App

```

### Execute o projeto e faça testes incluindo itens.




