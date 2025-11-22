# Pasta 251 — Aulas de Programação Web

Esta pasta ("251") contém materiais das aulas de Programação Web: aulas, laboratórios, projetos-exemplo e exercícios. O README abaixo é um guia leve para ajudar estudantes e contribuidores a entender a organização, executar exemplos localmente e contribuir com atualizações.

## Conteúdo (o que você normalmente encontrará)
- `lectures/` — slides e anotações de cada aula (PDF, PPTX ou Markdown).
- `labs/` — exercícios práticos com código inicial e soluções.
- `projects/` — pequenos projetos de exemplo (front-end e back-end) usados em aula.
- `examples/` — trechos curtos demonstrando conceitos (HTML/CSS/JS, AJAX, REST).
- `assets/` — imagens, folhas de estilo e arquivos estáticos compartilhados.
- `docs/` — documentação suplementar, bibliografia e referências.

Se a sua cópia da pasta tiver uma estrutura diferente, substitua a lista acima ou peça para eu inspecionar a pasta e eu atualizo esta seção para corresponder à estrutura real.

## Início rápido — visualizar páginas estáticas
Se a pasta contém arquivos HTML/CSS/JS simples, você pode abri-los diretamente no navegador, mas é recomendado usar um servidor estático local.

- Usando Python 3 (a partir da pasta `251`):
  ```
  python3 -m http.server 8000
  ```
  Em seguida abra http://localhost:8000 no navegador.

- Usando Node (serve via npx):
  ```
  npx serve .
  ```
  Ou, se existir `package.json`:
  ```
  npm install
  npm start
  ```

## Executando exemplos de backend
Alguns labs/projetos podem incluir aplicações backend pequenas (Express, Flask, Django, etc.). Passos típicos:

- Node / Express
  ```
  cd projects/some-express-app
  npm install
  npm start
  # ou
  node index.js
  ```

- Python / Flask
  ```
  cd projects/some-flask-app
  python3 -m venv venv
  source venv/bin/activate   # macOS / Linux
  venv\Scripts\activate      # Windows (PowerShell)
  pip install -r requirements.txt
  flask run
  ```

Ajuste os comandos conforme o README específico do projeto ou os arquivos de configuração.

## Convenções & estilo de código
- HTML: marcação semântica, layout responsivo mobile-first.
- CSS: estilos modulares (preferência por BEM, classes utilitárias ou CSS modules se usar bundler).
- JavaScript: ES6+; preferir código modular e funções pequenas e testáveis.
- Backend: variáveis de ambiente para segredos e configuração; cada serviço deve ter um README com instruções de execução.

## Testes & linting
Se um projeto incluir testes e linters, execute:
```
npm test
npm run lint
```
ou siga as instruções específicas do README do projeto.

## Bom saber
- Mantenha chaves e credenciais fora do repositório — use `.env` e adicione ao `.gitignore`.
- Mensagens de commit devem ser concisas e descritivas.
- Cada pasta de lab/projeto deve incluir seu próprio README explicando o propósito e como executar.

## Como contribuir
1. Faça um fork do repositório (ou trabalhe em uma branch local) e crie uma branch de feature.
2. Adicione/atualize READMEs dentro de pastas específicas de lab/projeto quando mudar a estrutura.
3. Abra um pull request com um resumo das mudanças e instruções de teste.

## Solução de problemas
- Se o build do frontend falhar, verifique a versão do Node (use uma LTS suportada).
- Se dependências do backend falharem ao instalar, atualize suas ferramentas Python/Node.
- Se uma demo não iniciar, verifique a porta do servidor local e as variáveis de ambiente.

## Recursos & referências
- MDN Web Docs — HTML / CSS / JS: https://developer.mozilla.org/
- Express: https://expressjs.com/
- Flask: https://flask.palletsprojects.com/
- Frameworks CSS (Bootstrap, Tailwind) — conforme usados nos projetos da pasta

## Licença & atribuição
Se esta pasta fizer parte de um repositório público, inclua um arquivo de licença na raiz (por exemplo, `LICENSE`). Se quiser, eu posso sugerir um bloco de licença.

---

Se quiser, eu posso:
- Inspecionar a pasta `251` e produzir um README que liste cada arquivo com descrições curtas.
- Criar ou atualizar READMEs por projeto dentro de `labs/` ou `projects/`.
- Adicionar comandos de execução específicos para os projetos encontrados.

Peça para eu listar os arquivos da pasta (forneça o repositório ou permita listar) e eu atualizo o README para ficar exatamente com os detalhes do conteúdo.
