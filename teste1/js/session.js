let dados = document.querySelector("#dados")
let perfil = document.querySelector("#perfil")
let foto = document.querySelector("#foto")

// controle de sessão.
auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(auth.currentUser.email + " logado" )
        dados.style.display = "block"
        perfil.innerHTML = auth.currentUser.email
        
        if (auth.currentUser.photoURL) {
            foto.innerHTML = "<img src='"+ auth.currentUser.photoURL + "'>"
        }
        listarMusicas()
    }
    else {
        dados.style.display = "none"
        window.location.pathname="/html/index.html"
    }
    
})

let btnSair = document.querySelector("#btnSair")
btnSair.addEventListener("click", () => {
   auth.signOut() 
})
