
## Integração de Cookies com APIs Seguras

Uma das formas mais seguras e eficientes de integrar Cookies com APIs é através do uso de tokens de autenticação, como JWT (JSON Web Token) e OAuth. Essa abordagem permite que o usuário permaneça autenticado e suas permissões sejam verificadas em cada requisição, sem a necessidade de revalidar a sessão constantemente.
- Integração com autenticação JWT e OAuth.

### 🔐 **Como Funciona?**
1. O usuário realiza login e a API valida as credenciais.
2. A API gera um **token JWT** e o armazena em um Cookie do navegador, marcado como **Secure** e **HttpOnly**.
3. Em cada requisição subsequente, o navegador envia automaticamente esse Cookie para o servidor.
4. A API valida o JWT para confirmar a autenticidade e autorização do usuário.

### ⚠️ **Melhores Práticas:**
- Sempre marcar o Cookie como `Secure` para trafegar apenas em HTTPS.
- Usar `HttpOnly` para impedir acesso via JavaScript.
- Definir `SameSite=Strict` para evitar vazamento de informações em ataques Cross-Site.

### 🔄 **Exemplo de Código:**

#### Backend (Node.js - Express):
```javascript
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const user = { id: 1, username: req.body.username };
  const token = jwt.sign(user, 'secretKey', { expiresIn: '1h' });
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/'
  });
  res.send('Login bem-sucedido');
});
```

#### Frontend (JavaScript):
```javascript
fetch('/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'claudiomiro' })
}).then(response => console.log(response));
```

#### Verificação no Backend:
```javascript
app.get('/dashboard', (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(403).send('Acesso negado');

  try {
    const user = jwt.verify(token, 'secretKey');
    res.send(`Bem-vindo, ${user.username}`);
  } catch (error) {
    res.status(401).send('Token inválido');
  }
});
```

---

## Atividade Prática - Integração de Cookies com API Segura

### Objetivo
Criar uma aplicação web que:

1. Realize um login em uma API fictícia, gerando um **JWT**.
2. Armazene esse token em um **Cookie** seguro no navegador.
3. Permita que o usuário visualize uma área protegida da aplicação enquanto o cookie estiver válido.
4. Possibilite realizar logout, apagando o cookie.

### Estrutura do Projeto

- `/index.html` → Página principal com formulário de login.
- `/dashboard.html` → Página protegida que só acessa se o Cookie estiver presente.
- `/server.js` → Backend para gerar o JWT e validar o acesso.

### Código da Atividade

#### `/index.html`
```html
<input type="text" id="username" placeholder="Digite seu nome">
<button onclick="login()">Login</button>
<button onclick="logout()">Logout</button>
```

#### `client.js`
```javascript
function login() {
  const username = document.getElementById('username').value;
  if (username) {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    }).then(response => response.text())
      .then(token => {
        document.cookie = `authToken=${token}; path=/; Secure; HttpOnly`;
        alert('Login realizado!');
        window.location.href = '/dashboard.html';
      }).catch(err => console.error(err));
  }
}

function logout() {
  document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  alert('Logout realizado!');
  window.location.href = '/index.html';
}
```

#### `/dashboard.html`
```html
<h1>Área Protegida</h1>
<p>Bem-vindo, você está autenticado!</p>
<button onclick="logout()">Logout</button>
```

#### `/server.js`
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.use(express.json());

const secretKey = 'secretKey';

app.post('/login', (req, res) => {
  const { username } = req.body;
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  res.send(token);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Testando a Aplicação
1. Rode o servidor com `node server.js`.
2. Acesse `http://localhost:3000` e faça login.
3. Verifique o Cookie gerado em **DevTools → Application → Cookies**.
4. Navegue para `/dashboard.html`. Se o Cookie estiver válido, o acesso será permitido.
5. Ao clicar em **Logout**, o Cookie é excluído e o acesso à área protegida é negado.

---

## Próximos Passos
- Explorar LocalStorage e SessionStorage.

---

## Perguntas?
Dúvidas e discussões sobre os conceitos abordados.
