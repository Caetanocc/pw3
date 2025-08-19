Ano: **2025**  
Curso: **DS**  
Disciplina: **PW3**  
Professor: **Claudiomiro**  
Aula: **03** — 14/08/2025

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

16. escrever embaixo do button submit, div.error 


17. criar variavel declarative ui , mostrar se for true.
 
 const [error, setError] = useState('');
 
     {
                    error && 
                    <div className="error">
                      {error}
                    </div>
                  }
				  
18. ajustar o setError  para limpar e mostrar msg
				  
  
19.  criar function handleLogin(e) incluir onClick

20. mostrar na console.log os dados de login do usuario.

21. criar function handlePasswdReset








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