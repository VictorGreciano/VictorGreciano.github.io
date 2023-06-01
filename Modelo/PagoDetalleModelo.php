<?php
class PagoDetalleModelo{
    private $bd;
    private $pagosDetalles;
    public function __construct()
    {
        require "Conexion.php";
        $this->bd = Conexion::__connect();
        $this->pagosDetalles = array();
    }

    function insertaPagoDetalle($numero, $nombre, $mes_expiracion, $year_expiracion, $cvv, $total){
        $consulta = "insert into pago_detalle (numero, nombre, mes_expiracion, year_expiracion, cvv, total) values (:numero, :nombre, :mes_expiracion, :year_expiracion, :cvv, :total)";
        $res = $this->bd->prepare($consulta);
        $numeroSeguro = htmlentities(addslashes($numero));
        $nombreSeguro = htmlentities(addslashes($nombre));
        $mesExpiracionSeguro = htmlentities(addslashes($mes_expiracion));
        $yearExpiracionSeguro = htmlentities(addslashes($year_expiracion));
        $cvvSeguro = htmlentities(addslashes($cvv));
        $totalSeguro = htmlentities(addslashes($total));
        $totalConvertido = floatval($totalSeguro);
        $res->bindParam(":numero", $numeroSeguro);
        $res->bindParam(":nombre", $nombreSeguro);
        $res->bindParam(":mes_expiracion", $mesExpiracionSeguro);
        $res->bindParam(":year_expiracion", $yearExpiracionSeguro);
        $res->bindParam(":cvv", $cvvSeguro);
        $res->bindParam(":total", $totalConvertido);
        if($res->execute()){
            return $this->bd->lastInsertId();
        }else{
            return false;
        }
    }

    public function consultaPagoDetalle($id){
        $this->pagosDetalles = array();
        $consulta = "select * from pago_detalle where id_pago_detalles = $id";
        $res = $this->bd->prepare($consulta);
        if($res->execute()){
            if($res->rowCount() > 0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->pagosDetalles[] = $reg;
                }
                return $this->pagosDetalles;
            }
        }
    }
}