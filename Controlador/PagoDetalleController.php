<?php

require "../Modelo/PagoDetalleModelo.php";
$p = new PagoDetalleModelo();
if (isset($_POST["id_pago_detalles"])) {
    echo json_encode($p->consultaPagoDetalle($_POST["id_pago_detalles"]));
} else if (isset($_REQUEST["jsonDetalles"])) {
    $arrayDetalle = json_decode($_REQUEST["jsonDetalles"], true); 
    echo $p->insertaPagoDetalle($arrayDetalle["numero"], $arrayDetalle["nombre"], $arrayDetalle["mes_expiracion"], $arrayDetalle["year_expiracion"], $arrayDetalle["cvv"], $arrayDetalle["total"]);
}