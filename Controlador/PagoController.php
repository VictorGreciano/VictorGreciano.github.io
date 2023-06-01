<?php
require "../Modelo/PagoModelo.php";
$p = new PagoModelo();
if (isset($_POST["idPagoDetalle"])) {
    session_start();
    echo $p->insertaPago($_SESSION["idUser"], $_POST["idPagoDetalle"]);
}
