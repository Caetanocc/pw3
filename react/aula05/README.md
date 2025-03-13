# React + Vite

1. revisar conteudo aula anterior.

Codigo gerado na aula 05 disponivel em 

https://github.com/Caetanocc/pw3_251/tree/main/appIni


=> fundamentos REACT
	a. framework javascript 
	b. jsx 
	c. Componentes e return de html 
	d. integrar com firebase para Autenticação


2. sugestão:  acessar o github e fazer um Fork.
https://github.com/Caetanocc/pw3_251/

ver documentação em 
https://etecspgov-my.sharepoint.com/:w:/r/personal/claudiomiro_silva2_etec_sp_gov_br/Documents/atividadeGitGithub02_appIni.docx?d=w318a41436c5c4334a52f2673f598ca86&csf=1&web=1&e=9HDQXL


3. fazer os passos básicos para rodar o projeto:

Abrir vscode 
Clone 

```
npm install 
npm run dev 
```

outros pacotes necessários:

```
npm install firebase 
```


????
```
npm install react-router-dom
npm install @reduxjs/toolkit 
npm install react-redux
npm install react-modal
```


3. melhorar o projeto com session de usuário :


user github  caetano1973    



5. Traduzir erros.  usar dictionaire    na LoginPage

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


