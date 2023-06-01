window.addEventListener("load", ()=>{
    numeroProductos();
    cargaPedidos();
});

function numeroProductos(){
    if(window.sessionStorage.getItem("productos") != null){
        let elementosCarrito = window.sessionStorage.getItem("productos");
        let arrayCarrito = elementosCarrito.split("-");
        let liCarrito = document.querySelectorAll("a[href='Index.php?carrito']");
        for (let index = 0; index < liCarrito.length; index++) {
            liCarrito[index].innerHTML+=" ("+arrayCarrito.length+")";
        }
    }
}

function cargaPedidos(){
    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", ()=>{
        if(peticion.status == 200 && peticion.readyState==4){
            if(peticion.response !=0){
                let sectionPedidos = document.querySelector(".pedidos");
                sectionPedidos.innerHTML = "";
                let numeroPedidos = JSON.parse(peticion.response);   
                for (let index = 0; index < numeroPedidos.length; index++) {
                    pintaPedido(index, numeroPedidos[index]["numero_pedido"]);
                }
            }else{
                ningunPedido();                
            }
            
        }
    });
    peticion.open("POST","Controlador/PedidoController.php", true);
    let formulario = new FormData();
    formulario.append("misPedidos", "");
    peticion.send(formulario);   
}

function ningunPedido(){
    let sectionPedidos = document.querySelector(".pedidos");
    sectionPedidos.innerHTML = "";
    
    let divNingunPedido = document.createElement("div");
    
    let parrafo = document.createElement("h1");
    parrafo.innerHTML = "Aún no has hecho ningún pedido.";
    divNingunPedido.appendChild(parrafo); 
    
    let p2 = document.createElement("p");
    p2.innerHTML = "¡Pero estaríamos encantados de que lo hicieses!";
    divNingunPedido.appendChild(p2); 
    
    let p3 = document.createElement("p");
    p3.innerHTML = "Puedes elegir alguno de nuestros vinos en Nuestros Vinos y añadirlo al carrito.";
    divNingunPedido.appendChild(p3);
    
    let btnProductos = document.createElement("a");
    btnProductos.innerHTML = "Productos";
    btnProductos.setAttribute("href", window.location.pathname+"?productos");
    divNingunPedido.appendChild(btnProductos);
    
    sectionPedidos.appendChild(divNingunPedido); 
}

function pintaPedido(index, numeroPedido){
    let sectionPedidos = document.querySelector(".pedidos");
    let articuloPedido = document.createElement("article");
    articuloPedido.classList.add("pedido");
    
    let titulo = document.createElement("h2");
    titulo.innerHTML = "Pedido "+(index+1);
    articuloPedido.appendChild(titulo);
    
    let imagenPedido = document.createElement("img");
    imagenPedido.setAttribute("src", "uploads/pedidos/pedidoVino.jpg");
    articuloPedido.appendChild(imagenPedido);
    
    let btnDetalles = document.createElement("a");
    btnDetalles.innerHTML = "Detalles";
    btnDetalles.addEventListener("click", ()=>{
        pintaDetallesPedido(numeroPedido);
    });
    articuloPedido.appendChild(btnDetalles);
    
    sectionPedidos.appendChild(articuloPedido);
}

function pintaDetallesPedido(numeroPedido){
    let tituloPrincipal = document.querySelector("h1");
    tituloPrincipal.innerHTML = "Vinos Comprados";
    let sectionPedidos = document.querySelector(".pedidos");
    sectionPedidos.remove();
    let container = document.querySelector(".container");
    creaNovedades(container);
    buscaIdsProductos(numeroPedido);
}

function buscaIdsProductos(numeroPedido){
    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", ()=>{
        if(peticion.status == 200 && peticion.readyState==4){
            let productos = JSON.parse(peticion.response); 
            let arrayProductos = [];  
            for (let index = 0; index < productos.length; index++) {
                arrayProductos[index] = productos[index]["id_productos"];
                
            }
            buscaProductos(arrayProductos);
        }
    });
    peticion.open("POST","Controlador/PedidoDetalleController.php", true);
    let formulario = new FormData();
    formulario.append("numeroPedido", numeroPedido);
    peticion.send(formulario); 
}

//Función que crea en el DOM el contenedor de los discos agregados al carrito
function creaNovedades(container){
    let novedades = document.createElement("div");
    novedades.classList.add("novedades");
    let vinosNovedades = document.createElement("div");
    vinosNovedades.classList.add("vinosNovedades");
    vinosNovedades.classList.add("row");
    novedades.appendChild(vinosNovedades);
    container.appendChild(novedades);
}

function buscaProductos(arrayProductos){
    let vinosNovedades = document.querySelector(".vinosNovedades");
    var peticion = new XMLHttpRequest(); 
    peticion.addEventListener("readystatechange", ()=>{
        if(peticion.status == 200){
            if(peticion.readyState == 4){
                let vinos = JSON.parse(peticion.response);
                for (let index = 0; index < vinos.length; index++) {
                    let vino = vinos[index];
                    for (let index = 0; index < vino.length; index++) {
                        pintaVino(vinosNovedades, vino, 0);                    
                    }               
                }
            }
        }
        
    });
    peticion.open("POST","Controlador/ProductosController.php", true);
    let formulario = new FormData();
    formulario.append("productos", arrayProductos);
    peticion.send(formulario);
}

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
    btnComprar.setAttribute("href", "Index.php?idProductos="+vino["id_productos"]);
    btnComprar.innerHTML = "Detalles"
    vinoCreado.appendChild(btnComprar);
    
    divResultados.appendChild(vinoCreado);
}