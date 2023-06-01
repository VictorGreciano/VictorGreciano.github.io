<?php
require "../Modelo/UsuariosModelo.php";
$u = new UsuariosModelo();
if(isset($_POST["id_usuarios"])){
    echo json_encode($u->sacaUsuariosId($_POST["id_usuarios"]));
}else if(isset($_POST["usuarios"])){
    $usuarios = $_POST["usuarios"];
    $arrayusuarios = explode(",", $usuarios);
    $arrayusuariosDevueltos = array();
    foreach($arrayusuarios as $usuario){
        $arrayusuariosDevueltos[] = $u->sacaUsuariosId($usuario);
    }
    echo json_encode($arrayusuariosDevueltos);
}else{
    echo json_encode($u->sacaUsuarios());
}
