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

*  após rodar utilize a opção 'o' para abrir o projeto no navegador 

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

* 

