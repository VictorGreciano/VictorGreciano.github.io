<?php
require "Configuracion.php";
Class Conexion{
    public static function __connect(){
        $cn = new PDO("mysql:localhost=".HOST."; dbname=".BBDD, USER, PASS);
        $cn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $cn->exec("set character set " .CHARSET);
        return $cn;
        
    }
}