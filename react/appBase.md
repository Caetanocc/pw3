### Criar projeto REACT com vite

*   Crie uma nova pasta c:\pw3 no PC e posicione nela
*   Abra um cmd do Windows na pasta c:\pw3 e execute o código :

```
npm install -g create-vite
npm create vite@latest appBase 
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
                      <button className="btn">Times</button>
                    </NavLink>

                    <NavLink to="/members">
                      <button className="btn">Membros</button>
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





