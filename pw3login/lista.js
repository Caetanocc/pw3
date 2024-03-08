listarMusicas() {
    const url="https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas.json"

    const options ={
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        }
    }

    fetch(url,options).then(
        data => {
            console.log(data)
        }
    )
}