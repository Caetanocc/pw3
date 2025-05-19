#  Cookies

## Cookies - Conceitos e Implementação
Cookies são pequenos arquivos de texto armazenados no navegador, utilizados para guardar informações sobre a navegação do usuário. Eles permitem que sites lembrem dados entre visitas, como preferências de idioma, itens em um carrinho de compras ou até mesmo sessões de login.

Criados em 1994 por Lou Montulli (Netscape), os cookies se tornaram uma tecnologia essencial para a experiência moderna de navegação.

---

## Tipos de Cookies
Existem diferentes tipos de cookies, cada um com características específicas:

- **Session Cookies:** Temporários, excluídos ao fechar o navegador. São usados para manter sessões ativas durante a navegação.
- **Persistent Cookies:** Permanecem armazenados até uma data de expiração definida. São utilizados para lembrar preferências do usuário entre sessões.
- **Secure Cookies:** Só são transmitidos em conexões HTTPS, aumentando a segurança dos dados.
- **HttpOnly Cookies:** Não acessíveis via JavaScript, protegendo contra ataques XSS (Cross-site Scripting).

---

## Segurança e Privacidade
Com a evolução da internet, regulamentações como a **LGPD** e a **GDPR** surgiram para proteger os dados dos usuários. A implementação de cookies deve respeitar essas leis, incluindo controle de consentimento e transparência sobre as informações coletadas.

Apesar de úteis, os cookies podem ser explorados por atacantes para roubo de sessões (Session Hijacking) e exposição de dados. Por isso, práticas seguras como o uso de cookies **Secure** e **HttpOnly** são recomendadas.

---

## Como os Cookies Funcionam
Cookies são enviados pelo servidor ao navegador através do cabeçalho HTTP (`Set-Cookie`). Em requisições futuras, o navegador retorna esses cookies ao servidor, permitindo a identificação e a personalização da experiência do usuário.

Eles possuem escopo de domínio e path, ou seja, podem ser acessados apenas por páginas específicas de um site.

---

## Operações com Cookies
Para interagir com cookies via JavaScript, você pode:

- **Criar um Cookie:** Nome, valor e expiração.
- **Ler um Cookie:** Buscar valor pelo nome.
- **Excluir um Cookie:** Definir expiração passada.

### Exemplo:
```javascript
document.cookie = "username=claudiomiro; expires=Fri, 31 Dec 2025 12:00:00 UTC; path=/";
```

---

## Principais Usos
Cookies são amplamente utilizados para:

- Manter sessões de usuário (Login persistente).
- Armazenar preferências (tema, idioma).
- Realizar rastreamento para marketing e análise de tráfego.

---

## Comparação de Armazenamento

| Armazenamento  | Expiração    | Escopo         | Segurança       |
| -------------- | ------------ | -------------- | --------------- |
| Cookies        | Configurável | Entre domínios | Pode ser seguro |
| LocalStorage   | Permanente   | Domínio único  | Menos seguro    |
| SessionStorage | Sessão       | Domínio único  | Menos seguro    |

### 🔎 **Acessando Cookies pelo DevTools**

1. Abra o navegador e pressione `F12` ou `Ctrl + Shift + I` para abrir o DevTools.
2. Vá até a aba **Application** (Chrome/Edge) ou **Storage** (Firefox).
3. No menu lateral, expanda **Cookies** e selecione o domínio do site.
4. Você verá os cookies listados com Nome, Valor, Domínio, Caminho, Expiração e Flags de Segurança.

### 🔄 **Manipulação Rápida:**
- Para **editar** um valor, clique duas vezes sobre ele.
- Para **deletar**, clique com o botão direito e selecione `Delete`.
- Para **adicionar**, clique com o botão direito e escolha `Add`.

---

## Localização dos Cookies nos Navegadores
Cada navegador armazena os cookies de uma forma específica:

- **Chrome (Windows):** `%LocalAppData%\Google\Chrome\User Data\Default\Cookies`
- **Firefox (Windows):** `%AppData%\Mozilla\Firefox\Profiles\<perfil-aleatório>\cookies.sqlite`
- **Edge (Windows):** `%LocalAppData%\Microsoft\Edge\User Data\Default\Cookies`
- **MacOS:** Chrome e Edge: `~/Library/Application Support/Google/Chrome/Default/Cookies`, Safari: `~/Library/Safari/Cookies/Cookies.binarycookies`
- **Linux:** Chrome: `~/.config/google-chrome/Default/Cookies`, Firefox: `~/.mozilla/firefox/<perfil-aleatório>/cookies.sqlite`

---

## Atividade Prática
### Objetivo
Criar uma página de login simples que armazena o nome do usuário em um Cookie. O objetivo é manter o usuário logado após recarregar a página e permitir um logout para apagar o Cookie.

### Código da Atividade

#### HTML:
```html
<input type="text" id="username" placeholder="Digite seu nome">
<button onclick="login()">Login</button>
<button onclick="logout()">Logout</button>
```

#### JavaScript:
```javascript
function login() {
  const username = document.getElementById('username').value;
  if (username) {
    document.cookie = `username=${username}; path=/`;
    alert('Login realizado!');
  }
}

function logout() {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  alert('Logout realizado!');
}
```

---

## Conclusão
- Revisão dos conceitos e implementação.
- Segurança e melhores práticas.
- Integração com autenticação JWT e OAuth.

---

## Próximos Passos
- Explorar LocalStorage e SessionStorage.
- Integração de Cookies com APIs seguras.

---

## Perguntas?
Dúvidas e discussões sobre os conceitos abordados.
