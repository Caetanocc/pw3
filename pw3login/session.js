let dados = document.querySelector("#dados")
let perfil = document.querySelector("#perfil")
let foto = document.querySelector("#foto")

// controle de sessão.
auth.onAuthStateChanged(firebaseUser => {

    if(firebaseUser){
        console.log(auth.currentUser.email + " logado" )
        dados.style.display = "block"
        perfil.innerHTML = auth.currentUser.email
            + " " + auth.currentUser.displayName
        
        if (auth.currentUser.photoURL) {
            foto.innerHTML = "<img src='"+ auth.currentUser.photoURL + "'>"
        }

        sessionStorage.setItem('Usuario', JSON.stringify(auth.currentUser.uid));

        console.log(auth.currentUser.uid)

        //window.location.pathname="home.html"
    }
    else {
        dados.style.display = "none"
        window.location.pathname="/"
        sessionStorage.removeItem('Usuario');

    }
    
})

let btnSair = document.querySelector("#btnSair")
btnSair.addEventListener("click", () => {
   auth.signOut() 
})
