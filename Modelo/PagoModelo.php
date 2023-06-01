<?php
class PagoModelo{
    private $bd;
    public function __construct()
    {
        require "Conexion.php";
        $this->bd = Conexion::__connect();
    }

    public function insertaPago($idUser, $idPagoDetalle){
        $consulta = "INSERT INTO pagos(id_usuario, id_pago_detalles) VALUES (:idUser,:idPagoDetalle)";
        $idUserSeguro = htmlentities(addslashes($idUser));
        $idPagoDetalleSeguro = htmlentities(addslashes($idPagoDetalle));
        $res = $this->bd->prepare($consulta);
        $res->bindParam(":idUser", $idUserSeguro);
        $res->bindParam(":idPagoDetalle", $idPagoDetalleSeguro);
        return $res->execute();
    }
}