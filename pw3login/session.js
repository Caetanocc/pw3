let dados = document.querySelector("#dados")
let perfil = document.querySelector("#perfil")
let foto = document.querySelector("#foto")
let userId = document.querySelector("#userId")

// controle de sessão.
auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(auth.currentUser.uid + " id user" )
        dados.style.display = "block"
        perfil.innerHTML = auth.currentUser.email 
            + " " + auth.currentUser.displayName
            + " " + auth.currentUser.uid
        
        if (auth.currentUser.photoURL) {
            foto.innerHTML = "<img src='"+ auth.currentUser.photoURL + "'>"
        }

        userId.innerHTML = auth.currentUser.uid

    }
    else {
        dados.style.display = "none"
        window.location.pathname="/"
    }
    
})

let btnSair = document.querySelector("#btnSair")
btnSair.addEventListener("click", () => {
   auth.signOut() 
})
