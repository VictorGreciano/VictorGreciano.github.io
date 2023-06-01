window.addEventListener("load", () => {
    numeroProductos();
    var container = document.querySelector(".carrito");
    if (window.sessionStorage.getItem("productos") == null) {
        ningunProducto(container);
    } else {
        productos(container);
    }
});

function numeroProductos() {
    if (window.sessionStorage.getItem("productos") != null) {
        let elementosCarrito = window.sessionStorage.getItem("productos");
        let arrayCarrito = elementosCarrito.split("-");
        let liCarrito = document.querySelectorAll("a[href='Index.php?carrito']");
        for (let index = 0; index < liCarrito.length; index++) {
            liCarrito[index].innerHTML += " (" + arrayCarrito.length + ")";
        }
    }
}

//Función que añadirá un título al contenedor para indicar que no
//tenemos ningun producto agregado al carrito
function ningunProducto(container) {
    let h1Titulo = document.createElement("h1");
    h1Titulo.innerHTML = "No has añadido ningun producto al carrito de la compra";
    container.appendChild(h1Titulo);
}

//Función que crea las secciones de productos y la factura
function productos(container) {
    let productosAgregados = window.sessionStorage.getItem("productos");
    let mas = productosAgregados.indexOf("-");
    creaNovedades(container);
    let vinosNovedades = document.querySelector(".vinosNovedades");
    creaFactura(container);

    if (mas != -1) {
        let arrayProductos = productosAgregados.split("-");
        buscaProductos(arrayProductos, vinosNovedades);
    } else {
        let arrayProductos = [];
        arrayProductos[0] = productosAgregados;
        buscaProductos(arrayProductos, vinosNovedades);
    }

}

//Función que crea en el DOM el contenedor de los vinos agregados al carrito
function creaNovedades(container) {
    let novedades = document.createElement("div");
    novedades.classList.add("novedades");
    let vinosNovedades = document.createElement("div");
    vinosNovedades.classList.add("vinosNovedades");
    vinosNovedades.classList.add("row");
    novedades.appendChild(vinosNovedades);
    container.appendChild(novedades);
}

//Función que crea en el DOM el contenedor de la factura
function creaFactura(container) {
    let divFactura = document.createElement("div");
    divFactura.classList.add("factura");
    container.appendChild(divFactura);

    let h2 = document.createElement("h2");
    h2.innerHTML = "Factura de compra";
    divFactura.appendChild(h2);
}

//Función que busca en la base de datos cada producto agregado al carrito
//La base de datos devuelve el producto encontrado y lo pinta
//Añade el producto al contenedor de la factura
function buscaProductos(arrayProductos, vinosNovedades) {
    let precios = 0;
    var contadorRepetidos = 0;

    var peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", () => {
        if (peticion.status == 200) {
            if (peticion.readyState == 4) {
                let vinos = JSON.parse(peticion.response);
                for (let indice = 0; indice < vinos.length; indice++) {
                    let vino = vinos[indice];
                    for (let index = 0; index < vino.length; index++) {
                        pintaVino(vinosNovedades, vino, 0);
                        agregaFacturas(vino, 0);
                        precios += parseFloat(vino[index]["precio"]);
                    }
                }
                let precioTotal = parseFloat(precios.toFixed("2"));
                agregaTotal(precioTotal);
                pintaBotonComprar(vinos, arrayProductos, contadorRepetidos)
            }
        }

    });
    peticion.open("POST", "Controlador/ProductosController.php", true);
    let formulario = new FormData();
    formulario.append("productos", arrayProductos);
    peticion.send(formulario);

}

function customConfirmationQuitar(message, callback) {
    var overlay = document.createElement("div");
    overlay.className = "alert-overlay";

    var alertBox = document.createElement("div");
    alertBox.className = "alert-box";

    var messageElement = document.createElement("p");
    messageElement.className = "alert-message";
    messageElement.textContent = message;

    var acceptButton = document.createElement("button");
    acceptButton.className = "alert-button";
    acceptButton.textContent = "Aceptar";
    acceptButton.addEventListener("click", function () {
        document.body.removeChild(overlay);
        if (typeof callback === "function") {
            callback();
        }
    });

    var cancelButton = document.createElement("button");
    cancelButton.className = "alert-button";
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener("click", function () {
        document.body.removeChild(overlay);
    });

    alertBox.appendChild(messageElement);
    alertBox.appendChild(acceptButton);
    alertBox.appendChild(cancelButton);
    overlay.appendChild(alertBox);

    document.body.appendChild(overlay);
}

// Función para mostrar el alert personalizado
function showAlertQuitar(message) {
    var alertOverlay = document.createElement("div");
    alertOverlay.className = "alert-overlay";

    var alertBox = document.createElement("div");
    alertBox.className = "alert-box";

    var messageElement = document.createElement("p");
    messageElement.className = "alert-message";
    messageElement.textContent = message;

    var closeButton = document.createElement("button");
    closeButton.className = "alert-button";
    closeButton.textContent = "Cerrar";
    closeButton.addEventListener("click", function () {
        document.body.removeChild(alertOverlay);
        window.location.href = "?carrito";
    });

    alertBox.appendChild(messageElement);
    alertBox.appendChild(closeButton);
    alertOverlay.appendChild(alertBox);

    document.body.appendChild(alertOverlay);
}


//Función que pinta el vino encontrando en la BBDD en el contenedor de novedades
function pintaVino(divResultados, vinos, index) {
    let vino = vinos[index];
    let vinoCreado = document.createElement("article");
    vinoCreado.classList.add("vinoNuevo");

    let aImagen = document.createElement("a");
    aImagen.setAttribute("href", "Index.php?idProductos=" + vino["id_productos"]);
    let imagenVino = document.createElement("img");
    imagenVino.setAttribute("src", "uploads/productos1/" + vino["imagen"]);
    aImagen.appendChild(imagenVino);
    vinoCreado.appendChild(aImagen);

    let pnombreArtista = document.createElement("p");
    pnombreArtista.innerHTML = vino["nombre"] + " | " + vino["denominacion"] + " ";
    vinoCreado.appendChild(pnombreArtista);

    let pPrecio = document.createElement("p");
    pPrecio.classList.add("precio");
    pPrecio.innerHTML = "" + vino["precio"] + " €";
    vinoCreado.appendChild(pPrecio);

    let btnQuitar = document.createElement("a");
    btnQuitar.classList.add("comprar");
    btnQuitar.setAttribute("id", "quitar-" + vino["id_productos"]);
    btnQuitar.innerHTML = "Quitar";
    btnQuitar.addEventListener("click", () => {
    let vinoID = btnQuitar.getAttribute("id").replace("quitar-", "");

        customConfirmationQuitar(
            "¿Estás seguro de que quieres eliminar el vino " +
            vino["nombre"] +
            " del carrito?",
            function () {
                let vinosAgregados = window.sessionStorage.getItem("productos");
                let mas = vinosAgregados.indexOf("-");
                if (mas !== -1) {
                    let arrayVinos = vinosAgregados.split("-");
                    let posicion = arrayVinos.indexOf(vinoID);
                    arrayVinos.splice(posicion, 1);
                    let vinosActualizados = arrayVinos.join("-");
                    window.sessionStorage.setItem("productos", vinosActualizados);
                } else {
                    window.sessionStorage.removeItem("productos");
                }
                showAlertQuitar(
                    "¡El vino " + vino["nombre"] + " ha sido eliminado del carrito!"
                );
            }
        );
    });
    vinoCreado.appendChild(btnQuitar);

    divResultados.appendChild(vinoCreado);
}



//Función que agrega el vino encontrado en el contenedor de la factura
function agregaFacturas(vinos, index) {
    let divFactura = document.querySelector(".factura");
    let divVino = document.createElement("div");
    divVino.classList.add("VinoFactura");
    divVino.classList.add("row");
    divFactura.appendChild(divVino);

    let pNombre = document.createElement("p");
    pNombre.innerHTML = vinos[index]["nombre"];
    pNombre.classList.add("nombre");
    divVino.appendChild(pNombre);

    let pPrecio = document.createElement("p");
    pPrecio.classList.add("precio");
    pPrecio.innerHTML = " precio u/" + vinos[index]["precio"] + " €";
    divVino.appendChild(pPrecio);
}

//Función que agrega el total de los precios sumados a la factura
function agregaTotal(precios) {
    let divFactura = document.querySelector(".factura");
    let hr = document.createElement("hr");
    divFactura.appendChild(hr);

    let divTotal = document.createElement("div");
    divTotal.classList.add("total");
    divTotal.classList.add("row");
    divFactura.appendChild(divTotal);

    let h3 = document.createElement("h3");
    h3.innerHTML = "Total";
    divTotal.appendChild(h3);

    let pPrecio2 = document.createElement("p");
    pPrecio2.classList.add("precio");
    pPrecio2.innerHTML = precios.toFixed(2) + " €";
    divTotal.appendChild(pPrecio2);
}

function pintaBotonComprar(vinos, arrayProductos, contadorRepetidos) {
    let divFactura = document.querySelector(".factura");

    let btnComprar = document.createElement("a");
    btnComprar.classList.add("comprar");
    btnComprar.innerHTML = "Comprar";
    btnComprar.addEventListener("click", () => {
        let respuesta = confirm("¿Estás seguro que quieres comprar los vinos seleccionados?");
        if (respuesta) {
            for (let indice = 0; indice < arrayProductos.length; indice++) {
                contadorRepetidos = controlCantidades(vinos, arrayProductos, indice, contadorRepetidos);
            }
            let decision = confirm("¿Quieres revisar tu pedido antes de pagar?");
            if (decision) {
                window.location.href = window.location.pathname + "?carrito";
            } else {
                window.sessionStorage.setItem("pago", "activado");
                window.location.href = window.location.pathname + "?pago";
            }
        }
    });
    divFactura.appendChild(btnComprar);
}

function controlCantidades(vinos, arrayProductos, indice, contadorRepetidos) {
    let arrayProductosOrdenado = arrayProductos.sort();
    let arrayRepe = arrayProductos.sort();

    if (arrayProductosOrdenado[indice] == arrayRepe[indice + 1]) {
        contadorRepetidos += 1;
    } else {

        if (contadorRepetidos > 0) {
            let productoRepetido = arrayProductosOrdenado[indice];
            let cantidadStock = 0;
            for (let index = 0; index < vinos.length; index++) {
                if (productoRepetido == vinos[index][0]["id_productos"]) {
                    cantidadStock = parseInt(vinos[index][0]["cantidad"]);
                    var nombreProducto = vinos[index][0]["nombre"];
                }
            }
            let cantidadProducto = contadorRepetidos + 1;
            let cantidadResultante = cantidadStock - cantidadProducto;
            if (cantidadResultante < 0) {
                alert("Parece ser que no tenemos las suficientes unidades del vino " + nombreProducto);
                alert("Eliminaremos de tu carrito las unidades que no tenemos en stock");
                var unidades = Math.abs(cantidadResultante);
                for (let index = 0; index < unidades; index++) {
                    let elementosCarrito = window.sessionStorage.getItem("productos");
                    let arrayCarrito = elementosCarrito.split("-");
                    let posicion = arrayCarrito.indexOf(productoRepetido);
                    arrayCarrito.splice(posicion, 1);
                    let productosActualizados = arrayCarrito.join("-");
                    window.sessionStorage.setItem("productos", productosActualizados);
                }


            }
        }
        contadorRepetidos = 0;
    }
    return contadorRepetidos;
}