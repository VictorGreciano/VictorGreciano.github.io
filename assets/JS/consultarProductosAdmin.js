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
        }
    });

    peticion.open("POST","Controlador/ProductosController.php", true);
    peticion.send(null);
    
    inputBuscar.addEventListener("keyup", ()=>{
        let peticion = new XMLHttpRequest();
        
        peticion.addEventListener("readystatechange", ()=>{
            if(peticion.status == 200 && peticion.readyState==4){
                divResultados.innerHTML = "";
                let vinoss = JSON.parse(peticion.response);
                for (let index = 0; index < vinoss.length; index++) {
                    pintaVino(divResultados, vinoss, index);       
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
    btnComprar.innerHTML = "Detalles"
    btnComprar.setAttribute("href", "Index.php?idProductos="+vino["id_productos"]);
    vinoCreado.appendChild(btnComprar);
    
    
    divResultados.appendChild(vinoCreado);
}