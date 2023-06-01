<?php
Class ProductosModelo{
    private $db;
    private $productos;
    public function __construct()
    {
        $this->db = Conexion::__connect();
        $this->productos = array();
    }

    function insertaProducto(){
        $consulta = "INSERT INTO `productos`
         (`nombre`, `bodega`, `tipo`, `denominacion`, `precio`, `region`, `pais`, `formato`, `variedad`, `grado`, `añada`, `cantidad`, `imagen`) 
         VALUES
         (:nombre, :bodega, :tipo, :denominacion, :precio, :region, :pais,:formato,:variedad ,:grado, :aniada, :cantidad, :imagen)";
        
        $nombre = htmlentities(addslashes($_POST["nombre"]));
        $bodega = htmlentities(addslashes($_POST["bodega"]));
        $tipo = htmlentities(addslashes($_POST["tipo"]));
        $denominacion = htmlentities(addslashes($_POST["denominacion"]));
        $precio = htmlentities(addslashes($_POST["precio"]));
        $precioConvertido = floatval($precio);

        $region = htmlentities(addslashes($_POST["region"]));
        $pais = htmlentities(addslashes($_POST["pais"]));
        $formato = htmlentities(addslashes($_POST["formato"]));
        $variedad = htmlentities(addslashes($_POST["variedad"]));
        $grado = htmlentities(addslashes($_POST["grado"]));
        $añada = htmlentities(addslashes($_POST["aniada"]));


        $cantidad = htmlentities(addslashes($_POST["cantidad"]));
        $image = $_FILES['foto']['name'];
        $imgNombre = htmlentities(addslashes($image));

        $res = $this->db->prepare($consulta);
        $res->bindParam(":nombre", $nombre);
        $res->bindParam(":bodega", $bodega);
        $res->bindParam(":tipo", $tipo);
        $res->bindParam(":denominacion", $denominacion);
        $res->bindParam(":precio", $precioConvertido);
        $res->bindParam(":region", $region);
        $res->bindParam(":pais", $pais);
        $res->bindParam(":formato", $formato);
        $res->bindParam(":variedad", $variedad);
        $res->bindParam(":grado", $grado);
        $res->bindParam(":aniada", $añada);
        $res->bindParam(":cantidad", $cantidad, PDO::PARAM_INT);
        $res->bindParam(":imagen", $imgNombre);
        
        
        return $res->execute();
    }

    function todosProductos(){
        $this->productos = array();
        $consulta = "select * from productos";
        $res = $this->db->prepare($consulta);
        if($res->execute()){
            if($res->rowCount() > 0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->productos[] = $reg;
                }
                return $this->productos;
            }
        }
    }

    function busquedaVino($nombrevino){
        $this->productos = array();
        $consulta = "select * from productos where nombre like '%$nombrevino%'";
        $res = $this->db->prepare($consulta);
        if($res->execute()){
            if($res->rowCount() > 0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->productos[] = $reg;
                }
                return $this->productos;
            }
        }
    }

    function actualizaCantidad($id){
        $consulta = "UPDATE productos SET cantidad = (SELECT cantidad FROM productos where id_productos = :id)-1 where id_productos = :id";
        $res = $this->db->prepare($consulta);
        $idSeguro = htmlentities(addslashes($id));
        $idConvertido = intval($idSeguro);
        $res->bindParam("id", $idConvertido);
        return $res->execute();
        
    }

    function sacaAleatorios(){
        $this->productos = array();
        $consulta = "select * from productos order by rand() limit 0,8 ";
        $res = $this->db->prepare($consulta);
        if($res->execute()){
            if($res->rowCount() > 0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->productos[] = $reg;
                }
                return $this->productos;
            }
        }
    }

    function busquedaTipo($tipo){
        $this->productos = array();
        $consulta = "select * from productos where tipo = '$tipo' ";
        $res = $this->db->prepare($consulta);
        if($res->execute()){
            if($res->rowCount() > 0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->productos[] = $reg;
                }
                return $this->productos;
            }
        }
    }

    function busquedaPais($pais){
        $this->productos = array();
        $consulta = "select * from productos where pais = '$pais' ";
        $res = $this->db->prepare($consulta);
        if($res->execute()){
            if($res->rowCount() > 0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->productos[] = $reg;
                }
                return $this->productos;
            }
        }
    }

    function busquedaId($id){
        $this->productos = array();
        $consulta = "select * from productos where id_productos = $id";
        $res = $this->db->prepare($consulta);
        if($res->execute()){
            if($res->rowCount() > 0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->productos[] = $reg;
                }
                return $this->productos;
            }
        }
    }

    function borraProducto($id){
        $consulta = "delete from productos where id_productos = $id";
        $res = $this->db->prepare($consulta);
        return $res->execute();
    }

    function editaProducto(
        $idProducto, $nombre, $bodega, $tipo,
        $denominacion, $region, $pais, $formato,
        $variedad, $grado,$aniada, $cantidad,
        $precio,$foto ){
        
        $nombreSeguro = htmlentities(addslashes($nombre));
        $bodegaSeguro = htmlentities(addslashes($bodega));

        $tipoSeguro = htmlentities(addslashes($tipo));
        $denominacionSeguro = htmlentities(addslashes($denominacion));

        $regionSeguro = htmlentities(addslashes($region));
        $paisSeguro = htmlentities(addslashes($pais));

        $formatoSeguro = htmlentities(addslashes($formato));
        $variedadSeguro = htmlentities(addslashes($variedad));

        $gradoSeguro = htmlentities(addslashes($grado));
        $aniadaSeguro = htmlentities(addslashes($aniada));
        
        $cantidadSeguro = htmlentities(addslashes($cantidad)); 
        $precioSeguro = htmlentities(addslashes($precio)); 
        $precioConvertido = floatval($precioSeguro);
        
        $fotoSeguro = htmlentities(addslashes($foto));
        $idSeguro = htmlentities(addslashes($idProducto));

        $consulta = "UPDATE productos SET nombre=:nombre, bodega=:bodega,
            tipo=:tipo, denominacion=:denominacion,
            region=:region, pais=:pais, formato=:formato,
            variedad=:variedad, grado=:grado, añada=:aniada,
            cantidad=:cantidad, precio=:precio, imagen=:foto
            WHERE id_productos = :idProductos";

        $res = $this->db->prepare($consulta);
        $res->bindParam(":nombre", $nombreSeguro);
        $res->bindParam(":bodega", $bodegaSeguro);
        $res->bindParam(":tipo", $tipoSeguro);
        $res->bindParam(":denominacion", $denominacionSeguro);
        $res->bindParam(":region", $regionSeguro);
        $res->bindParam(":pais", $paisSeguro);
        $res->bindParam(":formato", $formatoSeguro);
        $res->bindParam(":variedad", $variedadSeguro);
        $res->bindParam(":grado", $gradoSeguro);
        $res->bindParam(":aniada", $aniadaSeguro);
        $res->bindParam(":cantidad", $cantidadSeguro);
        $res->bindParam(":precio", $precioConvertido);
        $res->bindParam(":foto", $fotoSeguro);
        $res->bindParam(":idProductos", $idSeguro); 
        return $res->execute();
        
    }
}