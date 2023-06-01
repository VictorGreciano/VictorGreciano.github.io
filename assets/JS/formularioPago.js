window.addEventListener("load", () => {
    numeroProductos();
    if (window.sessionStorage.getItem("pago") != "activado") {
        window.location.href = window.location.pathname;
    } else {
        var container = document.querySelector(".carrito");
        let productosAgregados = window.sessionStorage.getItem("productos");
        let mas = productosAgregados.indexOf("-");
        creaFactura(container);
        if (mas != -1) {
            let arrayProductos = productosAgregados.split("-");
            buscaProductos(arrayProductos);
        } else {
            let arrayProductos = [];
            arrayProductos[0] = productosAgregados;
            buscaProductos(arrayProductos);
        }
        giraTarjeta();
        giraBoton();
        rellenaInputMes();
        rellenaInputYear();
        cambiaNumeroTarjeta();
        cambiaNombreTarjeta();
        cambiaMes();
        cambiaYear();
        cambiaCvv();
        cancelaPago();
        confirmaPago();
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
function buscaProductos(arrayProductos) {
    let precios = 0;
    var peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", () => {
        if (peticion.status == 200) {
            if (peticion.readyState == 4) {
                let albums = JSON.parse(peticion.response);
                for (let index = 0; index < albums.length; index++) {
                    let album = albums[index];
                    for (let index = 0; index < album.length; index++) {
                        agregaFacturas(album, 0);
                        precios += parseFloat(album[index]["precio"]);
                    }
                }
                let precioTotal = parseFloat(precios.toFixed("2"));
                agregaTotal(precioTotal);
            }
        }

    });
    peticion.open("POST", "Controlador/ProductosController.php", true);
    let formulario = new FormData();
    formulario.append("productos", arrayProductos);
    peticion.send(formulario);

}

//Función que agrega el album encontrado en el contenedor de la factura
function agregaFacturas(albums, index) {
    let divFactura = document.querySelector(".factura");
    let divAlbum = document.createElement("div");
    divAlbum.classList.add("albumFactura");
    divAlbum.classList.add("row");
    divFactura.appendChild(divAlbum);

    let pNombre = document.createElement("p");
    pNombre.innerHTML = albums[index]["nombre"];
    pNombre.classList.add("nombre");
    divAlbum.appendChild(pNombre);

    let pPrecio = document.createElement("p");
    pPrecio.classList.add("precio");
    pPrecio.innerHTML = albums[index]["precio"] + " €";
    divAlbum.appendChild(pPrecio);
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
    pPrecio2.classList.add("precioTotal");
    pPrecio2.innerHTML = precios.toFixed(2) + " €";
    divTotal.appendChild(pPrecio2);
}

function giraTarjeta() {
    var tarjeta = document.querySelector("#tarjeta");
    tarjeta.addEventListener("click", () => {
        tarjeta.classList.toggle("active");
    });
}

function giraBoton() {
    var btnAbrirForm = document.querySelector(".btnAbrirForm");
    var formTarjeta = document.querySelector(".formTarjeta");
    btnAbrirForm.addEventListener("click", () => {
        btnAbrirForm.classList.toggle("activeBtn");
        formTarjeta.classList.toggle("activeForm");
    });
}

function rellenaInputMes() {
    var inputMes = document.querySelector("#selectMes");
    for (let index = 1; index < 13; index++) {
        var option = document.createElement("option");
        option.innerHTML = index;
        option.setAttribute("value", index);
        inputMes.appendChild(option);
    }
}

function rellenaInputYear() {
    var inputYear = document.querySelector("#selectYear");
    var fecha = new Date();
    var yearActual = fecha.getFullYear();
    for (let index = yearActual; index < (yearActual + 9); index++) {
        var option = document.createElement("option");
        option.innerHTML = index;
        option.setAttribute("value", index);
        inputYear.appendChild(option);

    }
}

function cambiaNumeroTarjeta() {
    let inputNumeroTarjeta = document.querySelector("#numTarjeta");
    let nombreTarjeta = document.querySelector("#numeroTarjeta .numero");
    inputNumeroTarjeta.addEventListener("keyup", (e) => {
        let valorInput = e.target.value;
        inputNumeroTarjeta.value = valorInput
            //Elimina espacios en blanco
            .replace(/\s/g, '')
            //Eliminamos las letras;
            .replace(/\D/g, '')
            //Cada cuatro numero un espacio
            .replace(/([0-9]{4})/g, '$1 ');
        let logoMarca = document.querySelector('.logoMarca');
        nombreTarjeta.innerHTML = inputNumeroTarjeta.value;
        if (inputNumeroTarjeta.value == '') {
            nombreTarjeta.innerHTML = '#### #### #### ####';
            logoMarca.innerHTML = "";
        }
        if (inputNumeroTarjeta.nextElementSibling != null) {
            inputNumeroTarjeta.nextElementSibling.remove();
        }
        if (valorInput.length == 1) {


            if (valorInput[0] == 4) {
                logoMarca.innerHTML = "";
                let imagenMarca = document.createElement("img");
                imagenMarca.setAttribute("src", "assets/images/tarjeta/logos/visa.png");

                logoMarca.appendChild(imagenMarca);
            } else if (valorInput[0] == 5) {
                logoMarca.innerHTML = "";
                let imagenMarca = document.createElement("img");
                imagenMarca.setAttribute("src", "assets/images/tarjeta/logos/mastercard.png");
                logoMarca.appendChild(imagenMarca);
            }
        }
        muestraParteDelantera();
    });
}

function cambiaNombreTarjeta() {
    let inputNombreTarjeta = document.querySelector("#nombreTarjeta");
    let nombreTarjeta = document.querySelector("#nombreTitular .nombre");
    inputNombreTarjeta.addEventListener("keyup", (e) => {
        if (inputNombreTarjeta.nextElementSibling != null) {
            inputNombreTarjeta.nextElementSibling.remove();
        }
        let nombreValue = e.target.value;
        inputNombreTarjeta.value = nombreValue
            .replace(/([0-9])/g, '');
        nombreTarjeta.innerHTML = inputNombreTarjeta.value;
        if (inputNombreTarjeta.value == '') {
            nombreTarjeta.innerHTML = "Tu nombre...";
        }
        muestraParteDelantera();
        escribeFirma(nombreValue);
    });
}

function muestraParteDelantera() {
    var tarjeta = document.querySelector("#tarjeta");
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active');
    }
}

function escribeFirma(nombreValue) {
    let firma = document.querySelector(".firma p");
    firma.innerHTML = nombreValue;
}

function cambiaMes() {
    let spanMes = document.querySelector(".mes");
    let inputMes = document.querySelector("#selectMes");
    inputMes.addEventListener("change", () => {
        spanMes.innerHTML = inputMes.value;
        if (inputMes.nextElementSibling.nextElementSibling != null) {
            inputMes.nextElementSibling.nextElementSibling.remove();
        }
    });
}

function cambiaYear() {
    let spanYear = document.querySelector(".year");
    let inputYear = document.querySelector("#selectYear");
    inputYear.addEventListener("change", () => {
        if (inputYear.nextElementSibling.nextElementSibling != null) {
            inputYear.nextElementSibling.nextElementSibling.remove();
        }
        spanYear.innerHTML = inputYear.value;
    });
}

function cambiaCvv() {
    let inputCvv = document.querySelector("#inputCcv");
    let pCcv = document.querySelector(".ccv");
    inputCvv.addEventListener("keyup", (e) => {
        if (inputCvv.nextElementSibling != null) {
            inputCvv.nextElementSibling.remove();
        }
        let valorInput = e.target.value;
        inputCvv.value = valorInput
            .replace(/\s/g, '')
            .replace(/\D/g, '');
        pCcv.innerHTML = inputCvv.value;
        muestraParteTrasera();
    });
}

function muestraParteTrasera() {
    var tarjeta = document.querySelector("#tarjeta");
    if (!tarjeta.classList.contains('active')) {
        tarjeta.classList.add('active');
    }
}

function cancelaPago() {
    let btnCancelar = document.querySelector(".btnCancelar");
    btnCancelar.addEventListener("click", () => {
        let respuesta = confirm("¿Estás seguro que quieres abandonar el sitio?");
        if (respuesta) {
            window.location.href = window.location.pathname + "?carrito";
            window.sessionStorage.removeItem("pago");
        }
    });
}

function confirmaPago() {
    let btnPago = document.querySelector(".btnEnviar");
    var nombre = document.querySelector("#nombreTarjeta");
    var numeroTarjeta = document.querySelector("#numTarjeta");
    var inputCcv = document.querySelector("#inputCcv");
    var selectMes = document.querySelector("#selectMes");
    var selectYear = document.querySelector("#selectYear");
    btnPago.addEventListener("click", (e) => {
        e.preventDefault();
        let parrafosError = document.querySelectorAll(".error");
        if (parrafosError.length > 0) {
            for (let index = 0; index < parrafosError.length; index++) {
                parrafosError[index].remove();
            }
        }

        let valid = true;

        if (selectMes.value === "Mes") {
            let parrafoMal = document.createElement("p");
            parrafoMal.classList.add("error");
            parrafoMal.innerHTML = "Debes seleccionar el mes de expiración.";
            selectMes.parentElement.appendChild(parrafoMal);
            valid = false;
        }

        if (selectYear.value === "Año") {
            let parrafoMal = document.createElement("p");
            parrafoMal.classList.add("error");
            parrafoMal.innerHTML = "Debes seleccionar el año de expiración.";
            selectYear.parentElement.appendChild(parrafoMal);
            valid = false;
        }

        if (nombre.value.trim() === "") {
            let parrafoMal = document.createElement("p");
            parrafoMal.classList.add("error");
            parrafoMal.innerHTML = "Debes ingresar el nombre del titular.";
            nombre.parentElement.appendChild(parrafoMal);
            valid = false;
        }

        if (numeroTarjeta.value.trim() === "") {
            let parrafoMal = document.createElement("p");
            parrafoMal.classList.add("error");
            parrafoMal.innerHTML = "Debes ingresar el número de tarjeta.";
            numeroTarjeta.parentElement.appendChild(parrafoMal);
            valid = false;
        } else if (numeroTarjeta.value.length !== 19) {
            let parrafoMal = document.createElement("p");
            parrafoMal.classList.add("error");
            parrafoMal.innerHTML = "El número de tarjeta debe tener 16 dígitos.";
            numeroTarjeta.parentElement.appendChild(parrafoMal);
            valid = false;
        }

        if (inputCcv.value.trim() === "") {
            let parrafoMal = document.createElement("p");
            parrafoMal.classList.add("error");
            parrafoMal.innerHTML = "Debes ingresar el código CCV.";
            inputCcv.parentElement.appendChild(parrafoMal);
            valid = false;
        } else if (inputCcv.value.length !== 3) {
            let parrafoMal = document.createElement("p");
            parrafoMal.classList.add("error");
            parrafoMal.innerHTML = "El código CCV debe tener 3 dígitos.";
            inputCcv.parentElement.appendChild(parrafoMal);
            valid = false;
        }

        if (valid) {
            let total = document.querySelector(".precioTotal");
            let totalParseado = parseFloat(total.innerHTML);
            insertaPagoDetalle(
                numeroTarjeta.value.trim(),
                nombre.value.trim(),
                selectMes.value,
                selectYear.value,
                inputCcv.value,
                totalParseado
            );
        }
    });
}

function insertaPagoDetalle(numero, nombre, mes, year, cvv, total) {
    let jsonDetalles = {
        "numero": numero.trim(),
        "nombre": nombre.trim(),
        "mes_expiracion": mes,
        "year_expiracion": year,
        "cvv": cvv,
        "total": total
    }
    jsonDetalles = JSON.stringify(jsonDetalles);
    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", () => {
        if (peticion.status == 200 && peticion.readyState == 4) {
            if (peticion.response != 0) {
                let id = peticion.response;
                let idParseado = parseInt(id, 10);
                insertaPago(idParseado);
            } else {
                alert("Ha ocurrido un error");
            }
        }
    });
    peticion.open("POST", "Controlador/PagoDetalleController.php", true);
    peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    peticion.send("jsonDetalles=" + jsonDetalles);
}

function insertaPago(idPagoDetalle) {
    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", () => {
        if (peticion.status == 200 && peticion.readyState == 4) {
            if (peticion.response == 1) {
                insertaPedidoDetalle();
            } else {
                console.log("Ha ocurrido un error");
            }
        }
    });
    peticion.open("POST", "Controlador/PagoController.php", true);
    let formulario = new FormData();
    formulario.append("idPagoDetalle", idPagoDetalle);
    peticion.send(formulario);
}

function insertaPedidoDetalle() {
    let productosAgregados = window.sessionStorage.getItem("productos");
    let mas = productosAgregados.indexOf("-");
    if (mas != -1) {
        let arrayProductos = productosAgregados.split("-");
        mandaProductos(arrayProductos);
    } else {
        let arrayProductos = [];
        arrayProductos[0] = productosAgregados;
        mandaProductos(arrayProductos);
    }
}

function mandaProductos(arrayProductos) {
    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", () => {
        if (peticion.status == 200 && peticion.readyState == 4) {
            let numeroPedido = parseInt(peticion.response, 10);
            insertaPedido(numeroPedido);
        }
    });
    peticion.open("POST", "Controlador/PedidoDetalleController.php", true);
    let formulario = new FormData();
    formulario.append("arrayProductos", arrayProductos);
    peticion.send(formulario);
}

function insertaPedido(numeroPedido) {
    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", () => {
        if (peticion.status == 200 && peticion.readyState == 4) {
            if (peticion.response == 1) {
                restaCantidad();
            } else {
                alert("Ha ocurrido un error");
            }
        }
    });
    peticion.open("POST", "Controlador/PedidoController.php", true);
    let formulario = new FormData();
    formulario.append("numeroPedido", numeroPedido);
    peticion.send(formulario);
}

function restaCantidad() {

    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", () => {
        if (peticion.status == 200 && peticion.readyState == 4) {
            console.log(peticion.response);
            if (peticion.response == 1) {
                mensajeCompraRealizada();
            } else {
                alert("Ha ocurrido un error");
            }
        }
    });
    peticion.open("POST", "Controlador/ProductosController.php", true);
    let formulario = new FormData();
    formulario.append("productosCantidad", window.sessionStorage.getItem("productos"));
    peticion.send(formulario);
}

function mensajeCompraRealizada() {
    let container = document.querySelector(".container");
    container.innerHTML = "";

    let sectionMensaje = document.createElement("section");
    sectionMensaje.classList.add("mensajeCompra");

    let titulo = document.createElement("h1");
    titulo.innerHTML = "¡MUCHAS GRACIAS POR LA COMPRA!"
    sectionMensaje.appendChild(titulo);

    let pAgradecimientos = document.createElement("p");
    pAgradecimientos.innerHTML = "Nos hace mucha ilusión que hayas decidido adquirir alguno de nuestros vinos.";
    sectionMensaje.appendChild(pAgradecimientos);

    let p2 = document.createElement("p");
    p2.innerHTML = "Tu pedido llegará con un tiempo apróximado de cinco días laborables.";
    sectionMensaje.appendChild(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "Te esperamos próximamente por nuestra web o en nuestra tienda física.";
    sectionMensaje.appendChild(p3);

    let titulo2 = document.createElement("h2");
    titulo2.innerHTML = "¡HASTA LA PRÓXIMA!"
    sectionMensaje.appendChild(titulo2);

    let btnFinalizar = document.createElement("a");
    btnFinalizar.innerHTML = "Finalizar";
    btnFinalizar.addEventListener("click", () => {
        window.sessionStorage.removeItem("productos");
        window.location.href = window.location.pathname;
    });
    sectionMensaje.appendChild(btnFinalizar);

    container.appendChild(sectionMensaje);
}