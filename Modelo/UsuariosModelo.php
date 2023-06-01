<?php
Class UsuariosModelo{
    private $db;
    private $usuarios;
    public function __construct()
    {
        require "Conexion.php";
        $this->db = Conexion::__connect();
    }

    public function insertaUser(){
        $consulta = "insert into usuarios (nombre, apellidos, direccion, email, telefono, codigo_postal, password, rol) 
        values (:nombre, :apellidos, :direccion, :email, :telefono, :codigo_postal, :password, 'user')";
        $nombre = htmlentities(addslashes($_POST["name"]));
        $apellidos = htmlentities(addslashes($_POST["surname"]));
        $direccion = htmlentities(addslashes($_POST["adress"]));
        $email = htmlentities(addslashes($_POST["email"]));
        $telefono = htmlentities(addslashes($_POST["phone"]));
        $codigo_postal = htmlentities(addslashes($_POST["postal"]));
        $password = htmlentities(addslashes($_POST["password"]));
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $res = $this->db->prepare($consulta);
        $res->bindParam(":nombre", $nombre);
        $res->bindParam(":apellidos", $apellidos);
        $res->bindParam(":direccion", $direccion);
        $res->bindParam(":email", $email);
        $res->bindParam(":telefono", $telefono);
        $res->bindParam(":codigo_postal", $codigo_postal);
        $res->bindParam(":password", $hash);
        return $res->execute();
        
    }

    public function iniciaSesion(){
        $consulta = "select * from usuarios where email=:email";
        $email = htmlentities(addslashes($_POST["email"]));
        $pass = htmlentities(addslashes($_POST["pass"]));
        $res = $this->db->prepare($consulta);
        $res->bindParam(":email", $email);
        if($res->execute()){
            if($res->rowCount() > 0){
                $reg = $res->fetch(PDO::FETCH_ASSOC);
                if(password_verify($pass,$reg["password"])){
                    if(isset($_POST["recuerda"])){
                        $coockie = $reg["nombre"]."-".$reg["id_usuario"]."-".$email."-".$reg["rol"];
                        setcookie("user", $coockie, time()+36000, "/");
                    }
                    $_SESSION["name"] = strval($reg["nombre"]);
                    $_SESSION["idUser"] = intval($reg["id_usuario"]);
                    $_SESSION["user"] = $email;
                    $_SESSION["rol"] = $reg["rol"];
                    if(isset($_SESSION["errorInicioSesion"])){
                        unset($_SESSION["errorInicioSesion"]);
                    }
                    header("location:Index.php");
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
    }

    public function sacaUsuarios(){
        $this->usuarios[] = array();
        $consulta = "select * from usuarios where rol = 'user'";
        $res = $this->db->prepare($consulta);
        if($res->execute()){
            if($res->rowCount() > 0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->usuarios[] = $reg;
                }
                return $this->usuarios;
            }
        }
    }

    public function sacaUsuariosId($idUsuarios){
        $this->usuarios[] = array();
        $consulta = "select * from usuarios where id_usuario = $idUsuarios";
        $res = $this->db->prepare($consulta);
        if($res->execute()){
            if($res->rowCount() > 0){
                while ($reg = $res->fetch(PDO::FETCH_ASSOC)){
                    $this->usuarios[] = $reg;
                }
                return $this->usuarios;
            }
        }
    }
    
}
?>