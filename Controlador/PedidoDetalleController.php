<?php
require "../Modelo/PedidoDetalleModelo.php";
$p = new PedidoDetalleModelo();
//echo $p->dameUltimoId();

if(isset($_POST["arrayProductos"])){
    $arrayProductos = $_POST["arrayProductos"];
    $arrayProductos = explode(",", $arrayProductos);
    $numeroPedido = (intval($p->dameUltimoPedido()+1));
    foreach ($arrayProductos as $producto){
        $p->insertaPedidoDetalle($numeroPedido, $producto);
    }
    echo $numeroPedido;
}else if(isset($_POST["numeroPedido"])){
    echo json_encode($p->getIdsProductos($_POST["numeroPedido"]));
}