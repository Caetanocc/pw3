Ano: **2025**  
Curso: **DS**  
Disciplina: **PW3**  
Professor: **Claudiomiro**  
Aula: **14** — 30/10/2025
---
## Aula 14 — 30/10

### Objetivos da aula


- TCCs , como foi a pré banca , avaliar pendências.

- TCCs ver todos grupos.

- Review Bases tecnológicas.

Databricks ?
Mongodb 
Data science




---
## Aula 13 — 23/10

### Objetivos da aula


---

### 📘 **Arquivo:** `Aula_Introducao_Python.ipynb`

---

#### 🧩 **Célula 1 — Título e Apresentação**

```markdown
# 🐍 Aula: Introdução ao Python para Desenvolvedores Web

👨‍🏫 *Professor:* Claudiomiro Caetano da Silva  
📧 claudiomiro.silva2@etec.sp.gov.br  

---

### 🎯 Objetivos
- Entender a sintaxe básica do Python  
- Comparar com JavaScript  
- Praticar variáveis, funções e estruturas de controle  
- Fazer mini hands-ons e um desafio final  

```
---

#### 🧩 **Célula 2 — Primeiros Passos**

```python
# 🚀 Primeiro programa em Python

print("Olá, mundo!")

# Variáveis e tipos básicos
nome = "Caetano"
idade = 25
altura = 1.75
ativo = True

print(f"Meu nome é {nome}, tenho {idade} anos e {altura}m de altura.")
```

---

#### 🧩 **Célula 3 — Comparação com JavaScript**

````markdown
### 💬 Comparando com JavaScript

```javascript
console.log("Olá, mundo!");
let nome = "Caetano";
let idade = 25;
let altura = 1.75;
let ativo = true;
console.log(`Meu nome é ${nome}, tenho ${idade} anos e ${altura}m de altura.`);
````

> 🔹 Note como Python **não usa ponto e vírgula** e **usa indentação** no lugar de `{}`.

````

---

#### 🧩 **Célula 4 — Tipos e Operações**
```python
# 🔢 Tipos e operações básicas

a = 10
b = 3

print("Soma:", a + b)
print("Subtração:", a - b)
print("Multiplicação:", a * b)
print("Divisão:", a / b)
print("Divisão inteira:", a // b)
print("Resto:", a % b)
print("Potência:", a ** b)
````

---

#### 🧩 **Célula 5 — Estruturas Condicionais**

```python
# ⚙️ Condicional simples

idade = int(input("Digite sua idade: "))

if idade >= 18:
    print("Maior de idade")
else:
    print("Menor de idade")
```

---

#### 🧩 **Célula 6 — Estruturas de Repetição**

```python
# 🔁 Estruturas de repetição

print("Contando até 5:")
for i in range(1, 6):
    print(i)

# Lista e iteração
frutas = ["maçã", "banana", "uva"]
for fruta in frutas:
    print("Fruta:", fruta)
```

---

#### 🧩 **Célula 7 — Funções**

```python
# 🧠 Funções em Python

def saudacao(nome):
    return f"Olá, {nome}!"

def soma(a, b):
    return a + b

print(saudacao("Caetano"))
print("Soma:", soma(10, 20))
```

---

#### 🧩 **Célula 8 — Estruturas de Dados**

```python
# 📦 Listas e Dicionários

# Lista
numeros = [10, 20, 30]
numeros.append(40)
print("Lista:", numeros)
print("Tamanho:", len(numeros))

# Dicionário
pessoa = {"nome": "Ana", "idade": 30}
print("Pessoa:", pessoa)
print("Nome:", pessoa["nome"])
pessoa["cidade"] = "São Paulo"
print("Com cidade:", pessoa)
```

---

#### 🧩 **Célula 9 — Loop com Dicionários**

```python
# 🔁 Iterando sobre lista de dicionários

pessoas = [
    {"nome": "Ana", "idade": 25},
    {"nome": "Bruno", "idade": 30},
    {"nome": "Clara", "idade": 22},
]

for p in pessoas:
    print(f"{p['nome']} tem {p['idade']} anos")
```

---

#### 🧩 **Célula 10 — Desafio Hands-on Final**

```python
# 🧩 Desafio final

# 1️⃣ Ler dados do usuário
nome = input("Nome: ")
idade = int(input("Idade: "))
cidade = input("Cidade: ")

# 2️⃣ Armazenar em um dicionário
pessoa = {"nome": nome, "idade": idade, "cidade": cidade}

# 3️⃣ Função de apresentação
def apresentar(p):
    return f"{p['nome']} tem {p['idade']} anos e mora em {p['cidade']}."

# 4️⃣ Exibir resultado formatado
print(apresentar(pessoa))
```

---

#### 🧩 **Célula 11 — Extra (Explorando Módulos)**

```python
# 🎲 Extras - módulos Python

import math, random

print("Raiz quadrada de 9:", math.sqrt(9))
print("Número aleatório entre 1 e 10:", random.randint(1, 10))
```

---

#### 🧩 **Célula 12 — Conclusão**

```markdown
# ✅ Conclusão

### O que aprendemos hoje:
- Sintaxe básica do Python  
- Variáveis e tipos  
- Condicionais e loops  
- Funções e estruturas de dados  
- Entrada e saída de dados  
- Pequeno projeto prático  

💡 Python é simples, direto e poderoso — perfeito tanto para **back-end web** (Flask/Django) quanto para **análise de dados**.

👨‍💻 Próximo passo sugerido:
- Módulos e pacotes (`import`)  
- Manipulação de arquivos (`open`)  
- Flask: criando uma API simples  
```

---



**roteiro atualizado** para o notebook “**MongoDB + Pandas Hands-on**”

* conexão com MongoDB,
* download de uma base pública real,
* carga em um DataFrame,
* análise estatística simples (numérica e categórica),
* integração com o Mongo (salvar/consultar).

---

## 🧭 Estrutura proposta: `MongoDB_Pandas_HandsOn.ipynb`

---

### 🧩 **Célula 1 — Introdução**

```markdown
# 🧠 Python + MongoDB + Pandas Hands-on

Nesta aula, vamos:
1. Conectar o Python a uma base MongoDB
2. Baixar uma base pública de dados
3. Carregar e analisar dados com Pandas
4. Inserir e consultar dados no MongoDB
```

---

### 🧩 **Célula 2 — Instalação de bibliotecas**

```python
!pip install pymongo pandas
```

---

### 🧩 **Célula 3 — Importações e configuração inicial**

```python
import pandas as pd
from pymongo import MongoClient
from getpass import getpass

print("Bibliotecas importadas com sucesso ✅")
```

---

### 🧩 **Célula 4 — Conexão segura com MongoDB**

```python
usuario = input("Usuário MongoDB: ")
senha = getpass("Senha MongoDB: ")
cluster = "seuCluster.mongodb.net"
banco = "aula_dados"

uri = f"mongodb+srv://{usuario}:{senha}@{cluster}/{banco}?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client[banco]

print("✅ Conectado ao MongoDB!")
```

---

### 🧩 **Célula 5 — Download de uma base pública**

Para algo leve e útil, usaremos uma **base pública de cidades brasileiras** do GitHub (ou do IBGE, via CSV).

```python
url = "https://raw.githubusercontent.com/kelvins/Municipios-Brasileiros/main/csv/municipios.csv"
df_cidades = pd.read_csv(url)
df_cidades.head()
```

---

### 🧩 **Célula 6 — Exploração inicial dos dados**

```python
print("Formato (linhas, colunas):", df_cidades.shape)
print("\nColunas disponíveis:\n", df_cidades.columns.tolist())

# Exibir primeiras linhas
df_cidades.sample(5)
```

---

### 🧩 **Célula 7 — Estatísticas numéricas**

```python
# Estatísticas básicas
df_cidades.describe()
```

---

### 🧩 **Célula 8 — Estatísticas categóricas**

```python
# Contagem de cidades por UF
uf_counts = df_cidades["UF"].value_counts()
print("Número de cidades por estado:\n", uf_counts.head(10))
```

---

### 🧩 **Célula 9 — Visualização simples**

```python
import matplotlib.pyplot as plt

uf_counts.head(10).plot(kind="bar", figsize=(8,4), title="Top 10 UFs com mais cidades")
plt.xlabel("UF")
plt.ylabel("Quantidade de cidades")
plt.show()
```

---

### 🧩 **Célula 10 — Inserir dados no MongoDB**

```python
# Inserindo parte dos dados (ex: 100 primeiros registros)
colecao = db["cidades"]

dados = df_cidades.head(100).to_dict("records")
colecao.insert_many(dados)

print(f"✅ Inseridos {len(dados)} documentos na coleção 'cidades'.")
```

---

### 🧩 **Célula 11 — Consultar do MongoDB**

```python
for c in colecao.find().limit(5):
    print(c)
```

---

### 🧩 **Célula 12 — Consultar e transformar em DataFrame**

```python
# Buscar cidades de um estado específico
estado = "SP"
docs = list(colecao.find({"UF": estado}, {"_id": 0}))
df_sp = pd.DataFrame(docs)

print(f"Total de cidades em {estado}: {len(df_sp)}")
df_sp.head()
```

---

### 🧩 **Célula 13 — Estatísticas do subconjunto**

```python
print(df_sp.describe(include="all"))
```

---

### 🧩 **Célula 14 — Encerramento**

```markdown
# ✅ Conclusões

Aprendemos a:
- Conectar o Colab ao MongoDB Atlas
- Baixar bases públicas da internet
- Explorar e analisar dados com Pandas
- Inserir e consultar documentos no MongoDB

💡 Próximo passo: integrar com APIs (Flask) ou dashboards (Plotly / Streamlit)
```

---

### 🔒 Observações de segurança

* Sempre use `getpass` para senha.
* Nunca suba notebooks com credenciais salvas.
* MongoDB Atlas permite restringir IPs autorizados para conexão.

---

