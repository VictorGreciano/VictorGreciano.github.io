<?php
Class PedidoModelo{
    private $bd;
    private $pedidos;
    public function __construct()
    {
        require "Conexion.php";
        $this->bd = Conexion::__connect();
        $this->pedidos = array();
    }

    public function insertaPedido($idUsuario, $numeroPedido){
        $consulta = "INSERT INTO pedidos(id_usuario, numero_pedido) VALUES (:idUsuario,:numeroPedido)";
        $res = $this->bd->prepare($consulta);
        $res->bindParam(":idUsuario", $idUsuario, PDO::PARAM_INT);
        $res->bindParam(":numeroPedido", $numeroPedido, PDO::PARAM_INT);
        return $res->execute();
    }

    public function consultaPedidosUser($idUser){
        $this->pedidos = array();
        $consulta = "select numero_pedido from pedidos where id_usuario = :idUser";
        $idUsuario = intval($idUser);
        $res = $this->bd->prepare($consulta);
        $res->bindParam(":idUser", $idUsuario);
        if($res->execute()){
            if($res->rowCount()>0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->pedidos[] = $reg;
                }
                return $this->pedidos;
            }else{
                return 0;
            }
        }
    }

    public function getPedidos(){
        $this->pedidos = array();
        $consulta = "select * from pedidos";
        $res = $this->bd->prepare($consulta);
        if($res->execute()){
            if($res->rowCount()>0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->pedidos[] = $reg;
                }
                return $this->pedidos;
            }else{
                return 0;
            }
        }
    }
}

