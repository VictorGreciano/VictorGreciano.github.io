window.addEventListener("load", () => {
    numeroProductos();
    var inputBuscar = document.querySelector("#cajaConsulta");
    var divResultados = document.querySelector(".vinosNovedades");

    var tipos = document.querySelectorAll(".tipos li");
    var pais = document.querySelectorAll(".pais li");

    for (let index = 0; index < tipos.length; index++) {
        tipos[index].addEventListener("click", () => {

            let tipin = tipos[index].innerHTML;

            let peticion = new XMLHttpRequest();

            peticion.addEventListener("readystatechange", () => {
                if (peticion.status == 200 && peticion.readyState == 4) {

                    divResultados.innerHTML = "";
                    let vinos = JSON.parse(peticion.response);

                    for (let index = 0; index < vinos.length; index++) {
                        pintaVino(divResultados, vinos, index);
                    }

                    let botones = document.querySelectorAll(".comprar");

                    for (let index = 0; index < botones.length; index++) {
                        botones[index].addEventListener("click", () => {
                            let pNombre = botones[index].parentElement.querySelector("p").innerHTML;
                            let partes = pNombre.split(" | ");
                            let nombreVino = partes;
                            if (window.sessionStorage.getItem("productos") == null) {
                                alert("Has añadido el vino  " + nombreVino + " al carrito de la compra");
                                window.sessionStorage.setItem("productos", botones[index].getAttribute("id"));
                                numeroProductos();
                            } else {
                                let productosAgregados = window.sessionStorage.getItem("productos");
                                let idProducto = botones[index].getAttribute("id");

                                if (productosAgregados && productosAgregados.includes(idProducto)) {
                                    alert(nombreVino + " ya fue añadido al carrito, esta tienda solo dispone de una existencia de cada vino.");
                                } else {
                                    alert("Has añadido el vino " + nombreVino + " al carrito de la compra");
                                    let nuevosProductos = productosAgregados ? productosAgregados + "-" + idProducto : idProducto;
                                    window.sessionStorage.setItem("productos", nuevosProductos);
                                    console.log(window.sessionStorage.getItem("productos"));
                                    numeroProductos();
                                }
                            }
                        });
                    }
                }
            });
            peticion.open("POST", "Controlador/ProductosController.php", true);
            let formulario = new FormData();

            formulario.append("tipo", tipin);
            peticion.send(formulario);
        });

    }

    for (let index = 0; index < pais.length; index++) {
        pais[index].addEventListener("click", () => {

            let paisin = pais[index].innerHTML;

            let peticion = new XMLHttpRequest();

            peticion.addEventListener("readystatechange", () => {
                if (peticion.status == 200 && peticion.readyState == 4) {

                    divResultados.innerHTML = "";
                    let vinos = JSON.parse(peticion.response);

                    for (let index = 0; index < vinos.length; index++) {
                        pintaVino(divResultados, vinos, index);
                    }

                    let botones = document.querySelectorAll(".comprar");

                    for (let index = 0; index < botones.length; index++) {
                        botones[index].addEventListener("click", () => {
                            let pNombre = botones[index].parentElement.querySelector("p").innerHTML;
                            let partes = pNombre.split(" | ");
                            let nombreVino = partes;
                            if (window.sessionStorage.getItem("productos") == null) {
                                alert("Has añadido el vino  " + nombreVino + " al carrito de la compra");
                                window.sessionStorage.setItem("productos", botones[index].getAttribute("id"));
                                numeroProductos();
                            } else {
                                let productosAgregados = window.sessionStorage.getItem("productos");
                                let idProducto = botones[index].getAttribute("id");

                                if (productosAgregados && productosAgregados.includes(idProducto)) {
                                    alert(nombreVino + " ya fue añadido al carrito, esta tienda solo dispone de una existencia de cada vino.");
                                } else {
                                    alert("Has añadido el vino " + nombreVino + " al carrito de la compra");
                                    let nuevosProductos = productosAgregados ? productosAgregados + "-" + idProducto : idProducto;
                                    window.sessionStorage.setItem("productos", nuevosProductos);
                                    console.log(window.sessionStorage.getItem("productos"));
                                    numeroProductos();
                                }
                            }
                        });
                    }
                }
            });
            peticion.open("POST", "Controlador/ProductosController.php", true);
            let formulario = new FormData();

            formulario.append("pais", paisin);
            peticion.send(formulario);
        });

    }

    let peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", () => {
        if (peticion.status == 200 && peticion.readyState == 4) {
            divResultados.innerHTML = "";
            let vinoss = JSON.parse(peticion.response);
            for (let index = 0; index < vinoss.length; index++) {
                pintaVino(divResultados, vinoss, index);
            }
            let botones = document.querySelectorAll(".comprar");
            for (let index = 0; index < botones.length; index++) {
                botones[index].addEventListener("click", () => {
                    let pNombre = botones[index].parentElement.querySelector("p").innerHTML;
                    let partes = pNombre.split(" | ");
                    let nombreVino = partes;
                    if (window.sessionStorage.getItem("productos") == null) {
                        alert("Has añadido el vino  " + nombreVino + " al carrito de la compra");
                        window.sessionStorage.setItem("productos", botones[index].getAttribute("id"));
                        numeroProductos();
                    } else {
                        let productosAgregados = window.sessionStorage.getItem("productos");
                        let idProducto = botones[index].getAttribute("id");

                        if (productosAgregados && productosAgregados.includes(idProducto)) {
                            alert(nombreVino + " ya fue añadido al carrito, esta tienda solo dispone de una existencia de cada vino.");
                        } else {
                            alert("Has añadido el vino " + nombreVino + " al carrito de la compra");
                            let nuevosProductos = productosAgregados ? productosAgregados + "-" + idProducto : idProducto;
                            window.sessionStorage.setItem("productos", nuevosProductos);
                            console.log(window.sessionStorage.getItem("productos"));
                            numeroProductos();
                        }
                    }
                });
            }
        }
    });
    peticion.open("POST", "Controlador/ProductosController.php", true);
    peticion.send(null);

    inputBuscar.addEventListener("keyup", () => {
        let peticion = new XMLHttpRequest();
        peticion.addEventListener("readystatechange", () => {
            if (peticion.status == 200 && peticion.readyState == 4) {
                divResultados.innerHTML = "";
                let vinoss = JSON.parse(peticion.response);
                for (let index = 0; index < vinoss.length; index++) {
                    pintaVino(divResultados, vinoss, index);
                }
                let botones = document.querySelectorAll(".comprar");
                for (let index = 0; index < botones.length; index++) {
                    botones[index].addEventListener("click", () => {
                        let pNombre = botones[index].parentElement.querySelector("p").innerHTML;
                        let partes = pNombre.split(" | ");
                        let nombreVino = partes[1];
                        if (window.sessionStorage.getItem("productos") == null) {
                            alert("Has añadido el vino " + nombreVino + " al carrito de la compra");

                            window.sessionStorage.setItem("productos", botones[index].getAttribute("id"));
                            numeroProductos();
                        } else {
                            let productosAgregados = window.sessionStorage.getItem("productos");
                            let idProducto = botones[index].getAttribute("id");

                            if (productosAgregados && productosAgregados.includes(idProducto)) {
                                alert(nombreVino + " ya fue añadido al carrito, esta tienda solo dispone de una existencia de cada vino.");
                            } else {
                                alert("Has añadido el vino " + nombreVino + " al carrito de la compra");
                                let nuevosProductos = productosAgregados ? productosAgregados + "-" + idProducto : idProducto;
                                window.sessionStorage.setItem("productos", nuevosProductos);
                                console.log(window.sessionStorage.getItem("productos"));
                                numeroProductos();
                            }
                        }
                    });
                }
            }
        });


        peticion.open("POST", "Controlador/ProductosController.php", true);
        let formulario = new FormData();
        formulario.append("nombre", inputBuscar.value);
        peticion.send(formulario);
    });

});

function numeroProductos() {
    if (window.sessionStorage.getItem("productos") != null) {
        let elementosCarrito = window.sessionStorage.getItem("productos");
        let arrayCarrito = elementosCarrito.split("-");
        let liCarrito = document.querySelectorAll("a[href='Index.php?carrito']");
        for (let index = 0; index < liCarrito.length; index++) {
            liCarrito[index].innerHTML = "CARRITO (" + arrayCarrito.length + ")";
        }
    }
}

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

    let pnombreVIno = document.createElement("p");
    pnombreVIno.innerHTML = vino["nombre"] + " | " + vino["denominacion"];
    vinoCreado.appendChild(pnombreVIno);

    let pPrecio = document.createElement("p");
    pPrecio.classList.add("precio");
    pPrecio.innerHTML = vino["precio"] + " €";
    vinoCreado.appendChild(pPrecio);

    if (parseInt(vino["cantidad"]) != 0) {
        let btnComprar = document.createElement("a");
        btnComprar.classList.add("comprar");
        btnComprar.innerHTML = "Comprar";
        btnComprar.setAttribute("id", vino["id_productos"])
        vinoCreado.appendChild(btnComprar);
    } else {
        let btnComprar = document.createElement("a");
        btnComprar.classList.add("agotado");
        btnComprar.innerHTML = "AGOTADO";
        btnComprar.setAttribute("id", vino["id_productos"])
        vinoCreado.appendChild(btnComprar);
    }

    divResultados.appendChild(vinoCreado);
}


