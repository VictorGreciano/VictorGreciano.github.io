<?php
require "../Modelo/Conexion.php";
require "../Modelo/productosModelo.php";
$p = new ProductosModelo();

if (isset($_POST["foto"])) {
    echo $p->editaProducto(
    $_POST["idProducto"], $_POST["nombre"],
    $_POST["bodega"], $_POST["tipo"],
    $_POST["denominacion"], $_POST["region"],
    $_POST["pais"],$_POST["formato"],
    $_POST["variedad"], $_POST["grado"],
    $_POST["aniada"],$_POST["cantidad"],
    $_POST["precio"],$_POST["foto"]
);

} else if (isset($_POST["nombre"])) {
    
    echo json_encode($p->busquedaVino($_POST["nombre"]));

} else if (isset($_POST["productosCantidad"])) {
    
    $productos = $_POST["productosCantidad"];
    $arrayProductos = explode("-", $productos);
    foreach ($arrayProductos as $producto) {
        $p->actualizaCantidad($producto);
    }
    echo 1;

} else if (isset($_POST["productos"])) {

    $productos = $_POST["productos"];
    $arrayProductos = explode(",", $productos);
    $arrayProductosDevueltos = array();
    foreach ($arrayProductos as $producto) {
        $arrayProductosDevueltos[] = $p->busquedaId($producto);
    }
    echo json_encode($arrayProductosDevueltos);

} else if (isset($_POST["home"])) {

    echo json_encode($p->sacaAleatorios());

} else if (isset($_POST["tipo"])) {

    echo json_encode($p->busquedaTipo($_POST["tipo"]));

}else if (isset($_POST["pais"])) {

    echo json_encode($p->busquedaPais($_POST["pais"]));

}  else if (isset($_POST["id_productos"])) {

    echo json_encode($p->busquedaId($_POST["id_productos"]));

} else if (isset($_POST["idBorrar"])) {

    echo $p->borraProducto($_POST["idBorrar"]);

} else {

    echo json_encode($p->todosProductos());
    
}