window.addEventListener("load", ()=>{
    numeroProductos();
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