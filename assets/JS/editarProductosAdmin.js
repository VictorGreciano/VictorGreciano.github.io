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
                        var tipos = "tipos";
                        editaDatos(btns, index, divResultados, tipos, pais);
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
            var btns = document.querySelectorAll(".comprar");
            for (let index = 0; index < btns.length; index++) {
                var tipos = "completo";
                let pais = null;
                editaDatos(btns, index, divResultados, tipos, pais);
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
                var btns = document.querySelectorAll(".comprar");
                for (let index = 0; index < btns.length; index++) {
                    var tipos = "completo";
                    let pais = null;
                    editaDatos(btns, index, divResultados, tipos, pais);
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
    btnComprar.innerHTML = "Editar";
    vinoCreado.appendChild(btnComprar);
    
    
    divResultados.appendChild(vinoCreado);
}

function editaDatos(btns, index, divResultados, tipos, pais){
    btns[index].addEventListener("click", ()=>{
        divResultados.innerHTML = "";
        var idSeleccionado = btns[index].getAttribute("id");
        let peticion = new XMLHttpRequest();
        peticion.addEventListener("readystatechange", ()=>{
            if(peticion.status == 200 && peticion.readyState == 4){
                let vino = JSON.parse(peticion.response);
                
                divResultados.parentElement.querySelector("h1").innerHTML = "Editar producto";
                
                let filaDatos = document.createElement("div");
                pintaDatosVino(filaDatos, vino);
                
                var filaFormulario = document.createElement("div");
                pintaFormulario(filaFormulario, vino);
                
                divResultados.appendChild(filaDatos);
                divResultados.appendChild(filaFormulario);
                
                let btnEditar = document.querySelector("input[name='editaProduct']");
                btnEditar.addEventListener("click", (e)=>{
                    e.preventDefault();
                    clickBtnEditar(idSeleccionado, divResultados, tipos, pais);
                });
            }
        });
        peticion.open("POST", "Controlador/ProductosController.php", true);
        let formulario = new FormData();
        formulario.append("id_productos", idSeleccionado);
        peticion.send(formulario);  
    });
}

function decodeHTMLEntities(text) {
    var element = document.createElement('div');
    element.innerHTML = text;
    return element.textContent || element.innerText;
}

function pintaFormulario(filaFormulario, vino){
    //Formulario
    
    filaFormulario.classList.add("filaFormulario");
    let form = document.createElement("form");
    
    let h2Form = document.createElement("h2");
    h2Form.innerHTML = "Edita los datos";
    
    let inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("name", "nameProduct");
    inputName.setAttribute("placeholder", "Nombre vino");
    inputName.setAttribute("required", "true");
    inputName.setAttribute( "value", decodeHTMLEntities(vino[0]["nombre"]) );
    
    let inputBodega = document.createElement("input");
    inputBodega.setAttribute("type", "text");
    inputBodega.setAttribute("name", "bodega");
    inputBodega.setAttribute("placeholder", "Bodega");
    inputBodega.setAttribute("required", "true");
    inputBodega.setAttribute("value", decodeHTMLEntities(vino[0]["bodega"]));
    
    let inputTipo = document.createElement("input");
    inputTipo.setAttribute("type", "text");
    inputTipo.setAttribute("name", "tipos");
    inputTipo.setAttribute("placeholder", "Tipo");
    inputTipo.setAttribute("required", "true");
    inputTipo.setAttribute("value", decodeHTMLEntities(vino[0]["tipo"]));
    
    let inputDenominacion = document.createElement("input");
    inputDenominacion.setAttribute("type", "text");
    inputDenominacion.setAttribute("name", "denominacion");
    inputDenominacion.setAttribute("placeholder", "Denominacion");
    inputDenominacion.setAttribute("required", "true");
    inputDenominacion.setAttribute("value", decodeHTMLEntities(vino[0]["denominacion"]));
    
    let inputRegion = document.createElement("input");
    inputRegion.setAttribute("type", "text");
    inputRegion.setAttribute("name", "region");
    inputRegion.setAttribute("placeholder", "Region");
    inputRegion.setAttribute("required", "true");
    inputRegion.setAttribute("value", decodeHTMLEntities(vino[0]["region"]));
    
    let inputPais = document.createElement("input");
    inputPais.setAttribute("type", "text");
    inputPais.setAttribute("name", "pais");
    inputPais.setAttribute("placeholder", "Pais");
    inputPais.setAttribute("required", "true");
    inputPais.setAttribute("value", decodeHTMLEntities(vino[0]["pais"]));
    
    let inputFormato = document.createElement("input");
    inputFormato.setAttribute("type", "text");
    inputFormato.setAttribute("name", "formato");
    inputFormato.setAttribute("placeholder", "Formato");
    inputFormato.setAttribute("required", "true");
    inputFormato.setAttribute("value", decodeHTMLEntities(vino[0]["formato"]));

    let inputVariedad = document.createElement("input");
    inputVariedad.setAttribute("type", "text");
    inputVariedad.setAttribute("name", "variedad");
    inputVariedad.setAttribute("placeholder", "Variedad");
    inputVariedad.setAttribute("required", "true");
    inputVariedad.setAttribute("value", decodeHTMLEntities(vino[0]["variedad"]));


    let inputGrado = document.createElement("input");
    inputGrado.setAttribute("type", "text");
    inputGrado.setAttribute("name", "grado");
    inputGrado.setAttribute("placeholder", "Grado");
    inputGrado.setAttribute("required", "true");
    inputGrado.setAttribute("value", vino[0]["grado"]);

    let inputAniada = document.createElement("input");
    inputAniada.setAttribute("type", "text");
    inputAniada.setAttribute("name", "añada");
    inputAniada.setAttribute("placeholder", "Añada");
    inputAniada.setAttribute("required", "true");
    inputAniada.setAttribute("value", vino[0]["añada"]);

    
    let inputCantidad = document.createElement("input");
    inputCantidad.setAttribute("type", "text");
    inputCantidad.setAttribute("name", "cantidad");
    inputCantidad.setAttribute("placeholder", "Cantidad");
    inputCantidad.setAttribute("required", "true");
    inputCantidad.setAttribute("value", vino[0]["cantidad"]);

    let inputPrecio = document.createElement("input");
    inputPrecio.setAttribute("type", "text");
    inputPrecio.setAttribute("name", "precio");
    inputPrecio.setAttribute("placeholder", "Precio");
    inputPrecio.setAttribute("required", "true");
    inputPrecio.setAttribute("value", vino[0]["precio"]);
    
    let inputFoto = document.createElement("input");
    inputFoto.setAttribute("type", "file");
    inputFoto.setAttribute("name", "foto");
    inputFoto.setAttribute("value", vino[0]["imagen"]);
    
    let inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("name", "editaProduct");
    inputSubmit.setAttribute("value", "Editar Producto");
    
    form.appendChild(h2Form);
    form.appendChild(inputName);
    form.appendChild(inputBodega);
    form.appendChild(inputTipo);
    form.appendChild(inputDenominacion);
    form.appendChild(inputRegion);
    form.appendChild(inputPais);
    form.appendChild(inputFormato);

    form.appendChild(inputVariedad);
    form.appendChild(inputGrado);
    form.appendChild(inputAniada);

    form.appendChild(inputCantidad);
    form.appendChild(inputPrecio);
    form.appendChild(inputFoto);
    form.appendChild(inputSubmit);
    filaFormulario.appendChild(form);
    
}

function pintaDatosVino(filaDatos, vino){
    filaDatos.classList.add("filaDatos");
    
    let h2Datos = document.createElement("h2");
    h2Datos.innerHTML = "Datos vino";
    
    let divImagen = document.createElement("div");
    divImagen.classList.add("divImagen");
    let imagen = document.createElement("img");
    imagen.setAttribute("src", "uploads/productos1/"+vino[0]["imagen"]);
    divImagen.appendChild(imagen);
    
    let pNombre = document.createElement("p");
    pNombre.innerHTML = "<span>Nombre: </span>"+vino[0]["nombre"];
    
    let pBodega = document.createElement("p");
    pBodega.innerHTML = "<span>Bodega: </span>"+vino[0]["bodega"];
    
    let pSeccion = document.createElement("p");
    pSeccion.innerHTML = "<span>Tipos: </span>"+vino[0]["tipo"] ;
   
    let pDenominacion = document.createElement("p");
    pDenominacion.innerHTML = "<span>Denominacion: </span>"+vino[0]["denominacion"];    
    
    let pRegion= document.createElement("p");
    pRegion.innerHTML = "<span>Región: </span>"+vino[0]["region"];    
    
    let pPais = document.createElement("p");
    pPais.innerHTML = "<span>País: </span>"+vino[0]["pais"];    
    
    let pFormato = document.createElement("p");
    pFormato.innerHTML = "<span>Formato: </span>"+vino[0]["formato"];  
    
    let pVariedad= document.createElement("p");
    pVariedad.innerHTML = "<span>Variedad: </span>"+vino[0]["variedad"];  
    
    let pGrado = document.createElement("p");
    pGrado.innerHTML = "<span>Grado: </span>"+vino[0]["grado"];  
    
    let pAniada= document.createElement("p");
    pAniada.innerHTML = "<span>Añada: </span>"+vino[0]["añada"]; 

    let pCantidad = document.createElement("p");
    pCantidad.classList.add("cantidad");
    pCantidad.innerHTML = "Solo quedan <span>"+vino[0]["cantidad"]+"</span> disponibles";
    
    let pPrecio = document.createElement("p");
    pPrecio.classList.add("precio");
    pPrecio.innerHTML = vino[0]["precio"]+" €";
    
    filaDatos.appendChild(h2Datos);
    filaDatos.appendChild(divImagen);
    filaDatos.appendChild(pNombre);
    filaDatos.appendChild(pBodega);
    filaDatos.appendChild(pSeccion);
    filaDatos.appendChild(pDenominacion);
    filaDatos.appendChild(pRegion);
    filaDatos.appendChild(pPais);
    filaDatos.appendChild(pFormato);
    filaDatos.appendChild(pVariedad);
    filaDatos.appendChild(pGrado);
    filaDatos.appendChild(pAniada);
    

    filaDatos.appendChild(pCantidad);
    filaDatos.appendChild(pPrecio);
}

function clickBtnEditar(idSeleccionado, divResultados, tipos, pais){
    
    let inputNombre = document.querySelector("input[name='nameProduct']");
    let inputBodega = document.querySelector("input[name='bodega']");
    let inputTipo= document.querySelector("input[name='tipos']");
    let inputDenominacion = document.querySelector("input[name='denominacion']");
    let inputRegion = document.querySelector("input[name='region']");
    let inputPais = document.querySelector("input[name='pais']");
    let inputFormato = document.querySelector("input[name='formato']");
    let inputVariedad = document.querySelector("input[name='variedad']");
    let inputGrado = document.querySelector("input[name='grado']");
    let inputAniada = document.querySelector("input[name='añada']");
    let inputCantidad = document.querySelector("input[name='cantidad']");
    let inputPrecio = document.querySelector("input[name='precio']");

    let inputFotoEnviado = document.querySelector("input[name='foto']");

    let divImagen = document.querySelector('.divImagen');
    // Obtener la referencia a la imagen dentro del div
    let imagen = divImagen.querySelector('img');
    // Obtener el valor del atributo src de la imagen
    let valorImagen = imagen.src;
    let partesURL = valorImagen.split('/');
    let inputFoto = partesURL[partesURL.length - 1];
    console.log(inputFoto);


    if(inputNombre.value != null && inputNombre.value != "" && inputBodega.value != null && inputBodega.value != "" && inputTipo.value != null && inputTipo.value != "" && inputDenominacion.value != null && inputDenominacion.value != "" && inputRegion.value != null && inputRegion.value != "" && inputPais.value != null && inputPais.value != "" && inputFormato.value != null && inputFormato.value != "" && inputVariedad.value != null && inputVariedad.value != "" && inputGrado.value != null && inputGrado.value != "" && inputAniada.value != null && inputAniada.value != "" && inputCantidad.value != null && inputCantidad.value != "" && inputPrecio.value != null && inputPrecio.value != "" && inputFoto != null && inputFoto != ""
      ){
        let peticion = new XMLHttpRequest();
        peticion.addEventListener("readystatechange", ()=>{
            if(peticion.readyState==4 && peticion.status==200){
                if(peticion.response == 1){
                    alert("Producto actualizado con éxito");
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
                    if(tipos == "tipos"){
                        let formulario = new FormData();                     
                        formulario.append("tipos", pais);
                        peticion.send(formulario);
                    }else{
                        peticion.send(null);
                    }
                    
                }else{
                    alert("Ha ocurrido un error al editar el producto");
                    console.log(peticion.response);
                }
            }
        });

        peticion.open("POST", "Controlador/ProductosController.php", true);
        let formulario = new FormData();
        formulario.append("idProducto", idSeleccionado);
        formulario.append("nombre", inputNombre.value);
        formulario.append("bodega", inputBodega.value);
        formulario.append("tipo", inputTipo.value);
        formulario.append("denominacion", inputDenominacion.value);
        formulario.append("region", inputRegion.value);
        formulario.append("pais", inputPais.value); 
        formulario.append("formato", inputFormato.value);
        formulario.append("variedad", inputVariedad.value);
        formulario.append("grado", inputGrado.value);
        formulario.append("aniada", inputAniada.value);
        formulario.append("cantidad", inputCantidad.value);
        formulario.append("precio", inputPrecio.value);
        
        
        if( inputFotoEnviado != null || inputFotoEnviado != "" ){

            let partesURL1 = inputFotoEnviado.value.split('/');
            let inputFoto1 = partesURL1[partesURL1.length - 1];
            console.log(inputFoto1);
            let arrayFoto = inputFoto1.split("\\");
            let rutaBuena = arrayFoto[2];

            formulario.append("foto", rutaBuena);
            
            console.log("DENTRO DEL IF "+rutaBuena)
        }else{
            formulario.append("foto", inputFoto);
            console.log("DENTRO DEL ELSE "+inputFoto)
        }
        
        peticion.send(formulario);
        window.location.href = window.location.pathname+"?consultaProductosAdmin+";

    }else{
        let titulo = document.querySelector("form h2");
        titulo.innerHTML = "Rellena todos los campos";
        titulo.style.color = "red";
    }    
}