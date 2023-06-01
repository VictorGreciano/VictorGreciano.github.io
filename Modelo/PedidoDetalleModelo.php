<?php
Class PedidoDetalleModelo{
    private $bd;
    private $pedidosDetalles;
    public function __construct()
    {
        require "Conexion.php";
        $this->bd = Conexion::__connect();
        $this->pedidosDetalles = array();
    }

    function insertaPedidoDetalle($idPedidoDetalle, $idProducto){
        $consulta = "INSERT INTO pedido_detalle (numero_pedido, id_productos) VALUES (:numero_pedido,:id_Productos)";
        $res = $this->bd->prepare($consulta);
        $res->bindParam(":numero_pedido", $idPedidoDetalle);
        $res->bindParam(":id_Productos", $idProducto);
        return $res->execute();

    }

    function dameUltimoPedido()
    {
        $consulta = "select max(numero_pedido) as id from pedido_detalle";
        $res = $this->bd->prepare($consulta);
        if($res->execute()){
            if($res->rowCount() > 0){
                $reg = $res->fetch(PDO::FETCH_ASSOC);
                return $reg["id"];
            }
        }
    }

    function getIdsProductos($numeroPedido){
        $this->pedidosDetalles = array();
        $consulta = "SELECT id_productos FROM `pedido_detalle` WHERE numero_pedido = :numeroPedido";
        $res = $this->bd->prepare($consulta);
        $numeroPedidoBueno = intval($numeroPedido);
        $res->bindParam(":numeroPedido", $numeroPedidoBueno);
        if($res->execute()){
            if($res->rowCount()>0){
                while($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->pedidosDetalles[] = $reg;
                }
                return $this->pedidosDetalles;
            }
        }
    }
}