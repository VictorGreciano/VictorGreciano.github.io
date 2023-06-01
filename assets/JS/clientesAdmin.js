window.addEventListener("load", ()=>{
    var divResultados = document.querySelector(".vinosNovedades");

    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", ()=>{
        if(peticion.status == 200 && peticion.readyState==4){
            divResultados.innerHTML = "";
            let clientes = JSON.parse(peticion.response);
            console.log(clientes);
            for (let index = 1; index < clientes.length; index++) {
                pintaCliente(divResultados, clientes, index);
            }
        }
    });
    peticion.open("POST","Controlador/UsuariosController.php", true);
    peticion.send(null);
});

function pintaCliente(divResultados, clientes, index){
    
    let cliente = clientes[index];
    let clientela = document.createElement("article");
    clientela.classList.add("vinoNuevo");

    let aImagen = document.createElement("a");
    aImagen.setAttribute("href", "Index.php?idUsuarios="+cliente["id_usuario"]);
    let imagen = document.createElement("img");
    imagen.setAttribute("src", "uploads/productos1/cliente.png");
    aImagen.appendChild(imagen);
    clientela.appendChild(aImagen);
    
    let pnombreArtista = document.createElement("p");
    pnombreArtista.innerHTML = cliente["nombre"] +" "+cliente["apellidos"];
    clientela.appendChild(pnombreArtista);
    
    let pPrecio = document.createElement("p");
    pPrecio.innerHTML = cliente["email"];
    clientela.appendChild(pPrecio);
    
    let btnComprar = document.createElement("a");
    btnComprar.classList.add("comprar");
    btnComprar.setAttribute("href", "Index.php?idUsuarios="+cliente["id_usuario"]);
    btnComprar.innerHTML = "Detalles"
    clientela.appendChild(btnComprar);
    
    divResultados.appendChild(clientela);
}