window.addEventListener("load", ()=>{
    var inputBuscar = document.querySelector("#cajaConsulta");
    var divResultados = document.querySelector(".vinosNovedades");
    
    var tipos = document.querySelectorAll(".tipos li");
    var pais = document.querySelectorAll(".pais li");
    
    for (let index = 0; index < tipos.length; index++) {
        tipos[index].addEventListener("click", ()=>{
            
            let tipin = tipos[index].innerHTML;
            
            let peticion = new XMLHttpRequest();

            peticion.addEventListener("readystatechange", ()=>{
                if(peticion.status == 200 && peticion.readyState==4){

                    divResultados.innerHTML = "";
                    let vinos = JSON.parse(peticion.response);

                    for (let index = 0; index < vinos.length; index++) {
                        pintaVino(divResultados, vinos, index);
                    }
                    var btns = document.querySelectorAll(".comprar");
                    for (let index = 0; index < btns.length; index++) {
                        btns[index].addEventListener("click", ()=>{
                            borraProducto(btns, index, divResultados);
                        });
                    }
                }
            });
            peticion.open("POST","Controlador/ProductosController.php", true);
            let formulario = new FormData();
            
            formulario.append("tipo", tipin);
            peticion.send(formulario);
        });
    }

    for (let index = 0; index < pais.length; index++) {
        pais[index].addEventListener("click", ()=>{
            
            let paisin = pais[index].innerHTML;
            
            let peticion = new XMLHttpRequest();

            peticion.addEventListener("readystatechange", ()=>{
                if(peticion.status == 200 && peticion.readyState==4){

                    divResultados.innerHTML = "";
                    let vinos = JSON.parse(peticion.response);

                    for (let index = 0; index < vinos.length; index++) {
                        pintaVino(divResultados, vinos, index);
                    }
                    var btns = document.querySelectorAll(".comprar");
            for (let index = 0; index < btns.length; index++) {
                btns[index].addEventListener("click", ()=>{
                    borraProducto(btns, index, divResultados);
                });
                
            }
                }
            });
            peticion.open("POST","Controlador/ProductosController.php", true);
            let formulario = new FormData();
            
            formulario.append("pais", paisin);
            peticion.send(formulario);
        }); 
    }
    
    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", ()=>{
        if(peticion.status == 200 && peticion.readyState==4){
            divResultados.innerHTML = "";
            let vinoss = JSON.parse(peticion.response);
            for (let index = 0; index < vinoss.length; index++) {
                pintaVino(divResultados, vinoss, index);
            }
            var btns = document.querySelectorAll(".comprar");
            for (let index = 0; index < btns.length; index++) {
                btns[index].addEventListener("click", ()=>{
                    borraProducto(btns, index, divResultados);
                });
                
            }
        }
    });

    peticion.open("POST","Controlador/ProductosController.php", true);
    peticion.send(null);
    
    //Petición que busca un vino en concreto
    inputBuscar.addEventListener("keyup", ()=>{
        let peticion = new XMLHttpRequest();
        
        peticion.addEventListener("readystatechange", ()=>{
            if(peticion.status == 200 && peticion.readyState==4){
                divResultados.innerHTML = "";
                let vinoss = JSON.parse(peticion.response);
                for (let index = 0; index < vinoss.length; index++) {
                    pintaVino(divResultados, vinoss, index);       
                }
                var btns = document.querySelectorAll(".comprar");
                for (let index = 0; index < btns.length; index++) {
                    var tipos = "completo";
                    let anios = null;
                    borraProducto(btns, index, divResultados);
                }
            }
        });
        peticion.open("POST","Controlador/ProductosController.php", true);
        let formulario = new FormData();
        formulario.append("nombre", inputBuscar.value);
        peticion.send(formulario);  
    });
});

function pintaVino(divResultados, vinos, index){
    
    let vino = vinos[index];
    let vinoCreado = document.createElement("article");
    vinoCreado.classList.add("vinoNuevo");
    
    let aImagen = document.createElement("a");
    aImagen.setAttribute("href", "Index.php?idProductos="+vino["id_productos"]);
    let imagenVino = document.createElement("img");
    imagenVino.setAttribute("src", "uploads/productos1/"+vino["imagen"]);
    aImagen.appendChild(imagenVino);
    vinoCreado.appendChild(aImagen);
    
    let pnombreVIno = document.createElement("p");
    pnombreVIno.innerHTML = vino["nombre"] +" | " + vino["denominacion"];
    vinoCreado.appendChild(pnombreVIno);
    
    let pPrecio = document.createElement("p");
    pPrecio.classList.add("precio");
    pPrecio.innerHTML = vino["precio"] +" €";
    vinoCreado.appendChild(pPrecio);
    
    
    let btnComprar = document.createElement("a");
    btnComprar.classList.add("comprar");
    btnComprar.setAttribute("id", vino["id_productos"]);
    btnComprar.innerHTML = "Borrar";
    vinoCreado.appendChild(btnComprar);
    
    divResultados.appendChild(vinoCreado);
}

function borraProducto(btns, index, divResultados){
    let pNombre = btns[index].parentElement.querySelector("p").innerHTML;  
    let partes = pNombre.split(" | ");
    let nombreVinos = partes[0];
    let respuesta = confirm("¿Seguro que quieres borrar el vino "+nombreVinos);
    if(respuesta){
        let peticion = new XMLHttpRequest();
        peticion.addEventListener("readystatechange",()=>{
            if(peticion.status == 200 && peticion.readyState == 4){
                if(peticion.response == 1){
                    let peticion = new XMLHttpRequest();
                    peticion.addEventListener("readystatechange", ()=>{
                        if(peticion.status == 200 && peticion.readyState==4){
                            divResultados.innerHTML = "";
                            let vinos = JSON.parse(peticion.response);
                            for (let index = 0; index < vinos.length; index++) {
                                pintaVino(divResultados, vinos, index);
                            }
                        }
                    });
                    peticion.open("POST","Controlador/ProductosController.php", true);
                    peticion.send(null);
                }else{
                    alert("Ha ocurrido un error al borrar el producto");
                }
            }
        });
        peticion.open("post", "Controlador/ProductosController.php", true);
        let formulario = new FormData();
        formulario.append("idBorrar", btns[index].getAttribute("id"));
        peticion.send(formulario);
        window.location.href = window.location.pathname+"?consultaProductosAdmin+";
    }
}

/*
function borraProductosSeccion(btns, index, divResultados, anios){
    let pNombre = btns[index].parentElement.querySelector("p").innerHTML;  
    let partes = pNombre.split(" | ");
    let nombreVinos = partes[1];
    let respuesta = confirm("¿Seguro que quieres borrar el album "+nombreVinos);
    if(respuesta){
        let peticion = new XMLHttpRequest();
        peticion.addEventListener("readystatechange",()=>{
            if(peticion.status == 200 && peticion.readyState == 4){
                if(peticion.response == 1){
                    let peticion = new XMLHttpRequest();
                    peticion.addEventListener("readystatechange", ()=>{
                        if(peticion.status == 200 && peticion.readyState==4){
                            divResultados.innerHTML = "";
                            let vinos = JSON.parse(peticion.response);
                            for (let index = 0; index < vinos.length; index++) {
                                pintaAlbum(divResultados, vinos, index);
                            }
                        }
                    });
                    peticion.open("POST","Controlador/ProductosController.php", true);
                    let formulario = new FormData();       
                    formulario.append("seccion", anios);
                    peticion.send(formulario);
                }else{
                    alert("Ha ocurrido un error al borrar el producto");
                }
            }
        });
        peticion.open("post", "Controlador/ProductosController.php", true);
        let formulario = new FormData();
        formulario.append("idBorrar", btns[index].getAttribute("id"));
        peticion.send(formulario);
    }
}*/