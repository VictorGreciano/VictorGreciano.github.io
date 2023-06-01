window.addEventListener("load", ()=>{
    cargaPedidos();
});

function cargaPedidos(){
    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", ()=>{
        if(peticion.status == 200 && peticion.readyState==4){
            let albunes = JSON.parse(peticion.response);   
            let id_usuarios = [];
            for (let index = 0; index < albunes.length; index++) {
                id_usuarios[index] = albunes[index]["id_usuario"];
            }
            devuelveClientesPedidos(id_usuarios, albunes);
        }
    });
    peticion.open("POST","Controlador/PedidoController.php", true);
    let formulario = new FormData();
    formulario.append("pedidos", "");
    peticion.send(formulario);   
}

function devuelveClientesPedidos(usuarios, albunes){
    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", ()=>{
        if(peticion.status == 200 && peticion.readyState==4){
            let usuarios = JSON.parse(peticion.response);
            let ultimo = usuarios.length-1;
            let clientes = [];
            for (let index = 0; index < usuarios[ultimo].length; index++) {
                if(index % 2 == 1){
                    clientes.push(usuarios[ultimo][index]);
                }                
            }
            for (let index = 0; index < clientes.length; index++) {
                pintaPedido(index, albunes[index]["numero_pedido"], clientes);
                
            }
        }
    });
    peticion.open("POST","Controlador/UsuariosController.php", true);
    let formulario = new FormData();
    formulario.append("usuarios", usuarios);
    peticion.send(formulario);  
}

function pintaPedido(index, numeroPedido, clientes){
    let peticion = new XMLHttpRequest();

    let sectionPedidos = document.querySelector(".pedidos");
    let articuloPedido = document.createElement("article");
    articuloPedido.classList.add("pedido");

    let titulo = document.createElement("h2");
    titulo.innerHTML = "Pedido "+(index+1);
    articuloPedido.appendChild(titulo);

    let imagenPedido = document.createElement("img");
    imagenPedido.setAttribute("src", "uploads/pedidos/pedidoVino.jpg");
    articuloPedido.appendChild(imagenPedido);

    let nombreTitular = document.createElement("a");
    nombreTitular.classList.add("nombre");
    nombreTitular.setAttribute("href", window.location.pathname+"?idUsuarios="+clientes[index]["id_usuario"]);
    nombreTitular.innerHTML = clientes[index]["nombre"]+ " "+clientes[index]["apellidos"];
    articuloPedido.appendChild(nombreTitular);

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
    tituloPrincipal.innerHTML = "VINOS COMPRADOS EN EL PEDIDO";
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