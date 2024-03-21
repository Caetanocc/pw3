
listarMusicas()

function listarMusicas() {
    const url="https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas.json"

    const options ={
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        }
    }

    fetch(url,options)
    .then(response => response.json())
    .then(
        dados => {
            console.log(dados)

            let lista = document.querySelector("#listaMusicas")
            let tbody = lista.querySelector('tbody')

            tbody.innerHTML='';

            for (let chave in dados) {
                let item = dados[chave]

                let linha = document.createElement('tr')
                linha.innerHTML = `
                <td>${item.faixa}</td>
                <td>${item.cantor}</td>
                <td>${item.estrelas}</td>
                <td>${item.album}</td>

                `


                                // crio o botão de excluir, adicionando o id do usuário nele
                const tdRowDelete = document.createElement("td")
                const delete_btn = document.createElement("button")
                delete_btn.classList.add("btnExcluir")
                delete_btn.innerHTML = `<i class="fa-solid fa-trash"></i>`
                delete_btn.addEventListener("click", () => {
                    deleteMusica(chave)
                })

                tdRowDelete.appendChild(delete_btn)
                linha.append( tdRowDelete)

                tbody.appendChild(linha)

            }


        }
    )
}

function deleteMusica(chave) {

    const url= `https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas/${chave}.json`

    const options ={
        method: "DELETE",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        }
    }

    fetch(url,options)
    .then(response => response.json())
    .then(
        dados => {
            console.log(dados)
        })
}

const activeAddMusModal_btn = document.querySelector(".activeAddMusModal")
const addMusModal = document.querySelector(".addMusModal")
const closeMusModal_btn = document.querySelector("#closeAddMusModal")
const createMus_btn = document.querySelector("#createMus")

const faixa = document.querySelector("#faixa")
const artista = document.querySelector("#artista")
const estrelas = document.querySelector("#estrelas")
const album = document.querySelector("#album")

// const btnNova = document.querySelector("#btnNova")
activeAddMusModal_btn.addEventListener('click', () => {
    openCreateMusModal()
})

closeMusModal_btn.addEventListener('click', closeCreateMusModal)

function openCreateMusModal() {
    addMusModal.classList.add("active")

    faixa.value = ""
    artista.value = ""
    album.value = ""
    estrelas.value = 1

}
   
   // Fecho a modal de adicionar usuário
function closeCreateMusModal() {
    addMusModal.classList.remove("active")
}
   
createMus_btn.addEventListener("click", (e) => {
    e.preventDefault()
   
    createMusica()
})
   
function createMusica() {
    const faixa = document.querySelector("#faixa")
    const artista = document.querySelector("#artista")
    const estrelas = document.querySelector("#estrelas")
    const album = document.querySelector("#album")
    

    const url= `https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas.json`

    const options ={
        method: "POST",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        },
        body: `{
            "faixa": "${faixa}",
            "artista": "${artista}",
            "estrelas": "${estrelas}",
            "album": "${album}",
            "status": "1" 
            }`
        }


    fetch(url,options)
    .then(response => response.json())
    .then(
        dados => {
            console.log(dados)
        })


}
