window.addEventListener("DOMContentLoaded", ()=>{
    numeroProductos();
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var producto = urlParams.get('idProductos');
    var filaProduct = document.querySelector(".filaProduct"); 
    
    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", ()=>{
        if(peticion.readyState == 4 && peticion.status == 200){
            let vino = JSON.parse(peticion.response);
            
            let divImagen = document.createElement("div");
            divImagen.classList.add("divImagen");
            let imagen = document.createElement("img");
            imagen.setAttribute("src", "uploads/productos1/"+vino[0]["imagen"]);
            divImagen.appendChild(imagen);
            
            let divDatos = document.createElement("div");
            divDatos.classList.add("divDatos");
            
            let tituloDetalles = document.createElement("h2");
            tituloDetalles.innerHTML = vino[0]["nombre"]+" | " +vino[0]["denominacion"];
            
            let hr = document.createElement("hr");
            
            let datos = document.createElement("div");
            datos.classList.add("datos");
            
            let pRegion = document.createElement("p");
            pRegion.innerHTML = "<span>Región: </span>"+vino[0]["region"];
            
            let pBodega = document.createElement("p");
            pBodega.innerHTML = "<span>Bodega: </span>"+vino[0]["bodega"];
            
            let pTipo = document.createElement("p");
            pTipo.innerHTML = "<span>Tipo: </span>"+vino[0]["tipo"] ;
            
            let pDeno = document.createElement("p");
            pDeno.innerHTML = "<span>Denominación: </span>"+vino[0]["denominacion"] ;

            let pFormato = document.createElement("p");
            pFormato.innerHTML = "<span>Formato: </span>"+vino[0]["formato"];
            

            let pAñada = document.createElement("p");
            pAñada.innerHTML = "<span>Añada: </span>"+vino[0]["añada"];
            
            let pGrado = document.createElement("p");
            pGrado.innerHTML = "<span>Grado: </span>"+vino[0]["grado"];


            let pVariedad = document.createElement("p");
            pVariedad.innerHTML = "<span>Variedad: </span>"+vino[0]["variedad"];


            
            let pPrecio = document.createElement("p");
            pPrecio.classList.add("precio");
            pPrecio.innerHTML = vino[0]["precio"]+" €";
            
            let pCantidad = document.createElement("p");
            pCantidad.classList.add("cantidad");
            if(parseInt(vino[0]["cantidad"]) !=0){
                pCantidad.innerHTML = "Solo quedan <span>"+vino[0]["cantidad"]+"</span> disponibles";
            }else{
                pCantidad.innerHTML = "Este producto está <span>agotado</span>";
            }
            
            let btnCarrito = document.createElement("a");
            
            if(parseInt(vino[0]["cantidad"]) !=0){
                
                btnCarrito.classList.add("btnCarrito");
                btnCarrito.innerHTML = "Añadir al carrito";
                btnCarrito.addEventListener("click", ()=>{
                    alert("Para agregar productos al carrito debes iniciar sesión como usuario");
                    window.location.href = window.location.pathname+"?login";
                });
            }else{
                btnCarrito.classList.add("agotado");
                btnCarrito.innerHTML = "AGOTADO";
                btnCarrito.setAttribute("id", vino[0]["id_productos"]);
            }
            
            datos.appendChild(pFormato);
            datos.appendChild(pBodega);
            datos.appendChild(pTipo);
            datos.appendChild(pRegion);
            datos.appendChild(pDeno);
            datos.appendChild(pAñada);
            datos.appendChild(pVariedad);
            datos.appendChild(pGrado);
            

            datos.appendChild(pPrecio);
            datos.appendChild(pCantidad);
            datos.appendChild(btnCarrito);
            
            divDatos.appendChild(tituloDetalles);
            divDatos.appendChild(hr);
            divDatos.appendChild(datos);
            
            filaProduct.appendChild(divImagen);
            filaProduct.appendChild(divDatos);
        }
    });
    peticion.open("POST", "Controlador/ProductosController.php", true);
    let formulario = new FormData();
    formulario.append("id_productos", producto);
    peticion.send(formulario);
});

function numeroProductos(){
    if(window.sessionStorage.getItem("productos") != null){
        let elementosCarrito = window.sessionStorage.getItem("productos");
        let arrayCarrito = elementosCarrito.split("-");
        let liCarrito = document.querySelectorAll("a[href='Index.php?carrito']");
        for (let index = 0; index < liCarrito.length; index++) {
            liCarrito[index].innerHTML="CARRITO ("+arrayCarrito.length+")";
        }
    }
}