<?php
require "../Modelo/PedidoModelo.php";
$p=new PedidoModelo();
if(isset($_POST["numeroPedido"])){
    session_start();
    echo $p->insertaPedido($_SESSION["idUser"], $_POST["numeroPedido"]);
}else if(isset($_POST["misPedidos"])){
    session_start();

    if($p->consultaPedidosUser($_SESSION["idUser"]) != 0){
        echo json_encode($p->consultaPedidosUser($_SESSION["idUser"]));
    }else{
        echo 0;
    }
}else if(isset($_POST["pedidos"])){
    echo json_encode($p->getPedidos());
}