listarMusicas()  // function chamada ao carregar a pagina home.html

function listarMusicas() {

    //url da realtime database com collection musicas.json
    //const url="https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas.json"

    let userId = document.querySelector("#userId")
    auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            userId.innerHTML = auth.currentUser.uid
        }
        else {
            dados.style.display = "none"
            //window.location.pathname="/"
        }
    })
        

    console.log(userId.value)

    const url=`https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas/${userId}.json`

    //opcoes de chamada REST usando 
    // método GET , mode cors (permite cruzar dados entre sites)
    // headers:  cabeçalho informa tipo de dados json UTF-8
    const options ={
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        }
    }

    // function fetch => faz chamada da url passando as opções.
    // response.json() vai formatar dados json recebidos
    fetch(url,options)
    .then(response => response.json())
    .then(
        // conteudo de response vai para objeto "dados"
        dados => {
            console.log(dados)

            // recuperar os objetos html da pagina home.html
            let lista = document.querySelector("#listaMusicas")
            let tbody = lista.querySelector('tbody')

            tbody.innerHTML='';  //limpar a tbody

            for (let userId in dados){
                if (dados.hasOwnProperty(userId)){

                    const childDados = dados[userId]

                    for (let chave in childDados) {
                        //listar as musicas, para cada chave no json dados.
                        let item = childDados[chave]

                        //criar um button lixeira dentro de um td
                        const tdBtnDelete = document.createElement('td')
                        const btnDelete =  document.createElement('button')
                        btnDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`
                        tdBtnDelete.appendChild(btnDelete) 
                        
                        btnDelete.addEventListener("click", ()=>{
                            removerItem(chave)
                        })

                        //criar nova linha dentro da tbody
                        let linha = document.createElement('tr')
                        linha.innerHTML = `
                        <td>${item.faixa}</td>
                        <td>${item.cantor}</td>
                        <td>${item.estrelas}</td>
                        <td>${item.album}</td>
                        `
                        linha.append(tdBtnDelete) //incluir o td da lixeira

                        tbody.appendChild(linha) //incluir a linha no corpo da tabela

                    }
                }

            }
        }
    )
}

function removerItem(chave){

    console.log(chave)
    const url=`https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas/${chave}.json`

    //opcoes de chamada REST usando 
    // método GET , mode cors (permite cruzar dados entre sites)
    // headers:  cabeçalho informa tipo de dados json UTF-8
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
        data => {
            location.reload()     
        }
        
    )
}

const activeAddMusModal_btn = document.querySelector(".activeAddMudModal")
const addMusModal = document.querySelector('.addMusModal')
const closeMusModal_btn = document.querySelector("#closeAddMusModal")
const createMus_btn = document.querySelector("#createMus")

const faixa = document.querySelector("#faixa")
const artista = document.querySelector("#artista")
const estrelas = document.querySelector("#estrelas")
const album = document.querySelector("#album")

activeAddMusModal_btn.addEventListener('click', ()=>{
    openCreateMusModal()
})

function openCreateMusModal() {
    addMusModal.classList.add("active")

    faixa.value = ""
    artista.value = ""
    album.value = ""
    estrelas.value = 1

}

closeMusModal_btn.addEventListener('click', closeCreateMusModal)

function closeCreateMusModal(){
    addMusModal.classList.remove("active")
}

createMus_btn.addEventListener('click', (e) => {
    e.preventDefault()
    //preventDefault serve para evitar o comportamento default do form
    //Form html sempre envia os dados via get se não aplicar esse método

    createMusica()
})

function createMusica(){
    const faixa = document.querySelector("#faixa").value
    const artista = document.querySelector("#artista").value
    const estrelas = document.querySelector("#estrelas").value
    const album = document.querySelector("#album").value

    //url da realtime database com collection musicas.json
    //const url="https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas.json"
    const url=`https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas/${userId}.json`

    //opcoes de chamada REST usando 
    // método POST , mode cors (permite cruzar dados entre sites)
    // headers:  cabeçalho informa tipo de dados json UTF-8
    const options ={
        method: "POST",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        },
        body: `{
            "faixa": "${faixa}",
            "cantor": "${artista}",
            "estrelas": "${estrelas}",
            "album": "${album}",
            "status": "1" 
            } `
    }

    fetch(url,options)
    .then(response => response.json())
    .then(
        data => {
            location.reload()     
        }
        
    )



}
