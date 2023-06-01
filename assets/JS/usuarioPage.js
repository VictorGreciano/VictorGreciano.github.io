window.addEventListener("DOMContentLoaded", ()=>{
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var usuarios = urlParams.get('idUsuarios');
    var filaProduct = document.querySelector(".filaProduct"); 

    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", ()=>{
        if(peticion.readyState == 4 && peticion.status == 200){
            let usuario = JSON.parse(peticion.response);
            console.log(usuarios);
            let divImagen = document.createElement("div");
            divImagen.classList.add("divImagen");
            let imagen = document.createElement("img");
            imagen.setAttribute("src", "uploads/productos1/cliente.png");
            divImagen.appendChild(imagen);

            let divDatos = document.createElement("div");
            divDatos.classList.add("divDatos");
            
            let tituloDetalles = document.createElement("h2");
            tituloDetalles.innerHTML = usuario[1]["nombre"]+" "+usuario[1]["apellidos"];

            let hr = document.createElement("hr");
            
            let datos = document.createElement("div");
            datos.classList.add("datos");

            let pNombre = document.createElement("p");
            pNombre.innerHTML = "<span>Nombre: </span>"+usuario[1]["nombre"];

            let pApellidos = document.createElement("p");
            pApellidos.innerHTML = "<span>Apellidos: </span>"+usuario[1]["apellidos"];

            let pDireccion = document.createElement("p");
            pDireccion.innerHTML = "<span>Direccion: </span>"+usuario[1]["direccion"];
            
            let pEmail = document.createElement("p");
            pEmail.innerHTML = "<span>Email: </span>"+usuario[1]["email"];

            let pCodigo = document.createElement("p");
            pCodigo.innerHTML = "<span>Teléfono: </span>"+usuario[1]["telefono"];

            let pPostal = document.createElement("p");
            pPostal.innerHTML = "<span>Código postal: </span>"+usuario[1]["codigo_postal"];

            datos.appendChild(pNombre);
            datos.appendChild(pApellidos);
            datos.appendChild(pDireccion);
            datos.appendChild(pEmail);
            datos.appendChild(pCodigo);
            datos.appendChild(pPostal);

            divDatos.appendChild(tituloDetalles);
            divDatos.appendChild(hr);
            divDatos.appendChild(datos);

            filaProduct.appendChild(divImagen);
            filaProduct.appendChild(divDatos);
        }
    });
    peticion.open("POST", "Controlador/UsuariosController.php", true);
    let formulario = new FormData();
    formulario.append("id_usuarios", usuarios);
    peticion.send(formulario);
});