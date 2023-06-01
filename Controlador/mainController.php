<?php
//Requerimos los modelos que vamos a usar
require "Modelo/UsuariosModelo.php";
require "Modelo/productosModelo.php";

//Creamos una instancia de los objetos de las clases
$user = new UsuariosModelo();
$p = new ProductosModelo();

//Iniciamos una sesión para manejarla
if(isset($_COOKIE["user"])){
    $datos = explode("-", $_COOKIE["user"]);
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
        $_SESSION["name"] = strval($datos[0]);
        $_SESSION["idUser"] = intval($datos[1]);
        $_SESSION["user"] = $datos[2];
        $_SESSION["rol"] = $datos[3];
    }
}
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_GET["login"]) && !isset($_SESSION["rol"])) {
    if (isset($_SESSION["errorInicioSesion"])) {
        unset($_SESSION["errorInicioSesion"]);
    }
    if (isset($_POST["inicioSesion"])) {
        if (!$user->iniciaSesion()) {
            $_SESSION["errorInicioSesion"] = true;
        }
    }
    require "Vistas/sinUsuario/IniciarSesion.php";
} else if (isset($_GET["registrar"]) && !isset($_SESSION["rol"])) {
    if (isset($_SESSION["usuarioRegistrado"])) {
        unset($_SESSION["usuarioRegistrado"]);
    }
    if (isset($_POST["registrarse"])) {
        if ($user->insertaUser()) {
            $_SESSION["usuarioRegistrado"] = $_POST["name"];
        }
    }
    require "Vistas/sinUsuario/Registrarse.php";
} else if (isset($_GET["logout"])) {
    if (isset($_SESSION["rol"])) {
        session_destroy();
        setcookie("user", "", time()-1, '/');
        header("location: Index.php");
    } else {
        require "Vistas/sinUsuario/HomePage.php";
    }
} else {
    if (isset($_SESSION["rol"])) {
        if (!strcmp($_SESSION["rol"], "user")) {
            if (isset($_GET["productos"])) {
                require "Vistas/usuario/UsuarioProductosPage.php";
            } else if (isset($_GET["quienesSomos"])) {
                require "Vistas/usuario/UsuarioQuienesSomosPage.php";
            } else if (isset($_GET["condicionesGenerales"])) {
                require "Vistas/usuario/UsuarioCondicionesPage.php";
            } else if (isset($_GET["carrito"])) {
                 require "Vistas/usuario/UsuarioCarritoPage.php";
                 //require "Vistas/usuario/UsuarioPasarelaPago.php";
            } else if (isset($_GET["idProductos"])) {
                require "Vistas/usuario/UsuarioProductPage.php";
            } else if (isset($_GET["pago"])) {
                require "Vistas/usuario/UsuarioFormularioPago.php";
            } else if (isset($_GET["misPedidos"])) {
                require "Vistas/usuario/UsuarioMisPedidosPage.php";
            } else if (isset($_GET["politicaCookies"])) {
                require "Vistas/usuario/UsuarioPoliticasCookiesPage.php";
            } else if (isset($_GET["avisoLegal"])) {
                require "Vistas/usuario/UsuarioAvisoLegalPage.php";
            } else if (isset($_GET["catas"])) {
                require "Vistas/usuario/UsuariocatasPage.php";
            } else {
                require "Vistas/usuario/UsuarioHomePage.php";
            }
        } else {
            if (isset($_GET["productosAdmin"])) {
                require "Vistas/admin/productosAdminPage.php";
            } else if (isset($_GET["insertarProductos"])) {
                
                if (isset($_POST["insertarProducto"])) {
                    if ($p->insertaProducto()) {
                        $_SESSION["productoNombre"] = $_POST["nombre"];
                        $image = $_FILES['foto']['name'];
                        $imgNombre = htmlentities(addslashes($image));
                        $carpetaDestino = dirname(__DIR__) . "/uploads/productos1/";
                        move_uploaded_file($_FILES["foto"]["tmp_name"], $carpetaDestino . $imgNombre);
                    }
                }
                require "Vistas/admin/insertarProductosPage.php";
            } else if (isset($_GET["consultaProductosAdmin"])) {
                require "Vistas/admin/consultaProductosAdmin.php";
            } else if (isset($_GET["editarProductosAdmin"])) {
                require "Vistas/admin/editaProductosPage.php";
            } else if (isset($_GET["borrarProductosAdmin"])) {
                require "Vistas/admin/borraProductosPage.php";
            } else if (isset($_GET["idProductos"])) {
                require "Vistas/admin/ProductAdminPage.php";
            } else if (isset($_GET["idUsuarios"])) {
                require "Vistas/admin/UsuarioPage.php";
            } else if (isset($_GET["clientesAdmin"])) {
                require "Vistas/admin/ClientesPage.php";
            } else if (isset($_GET["pedidosAdmin"])) {
                require "Vistas/admin/PedidosPage.php";
            } else {
                require "Vistas/admin/adminHomePage.php";
            }
        }
    } else {
        if (isset($_GET["productos"])) {
            require "Vistas/sinUsuario/ProductosPage.php";
        } else if (isset($_GET["catas"])) {
            require "Vistas/sinUsuario/catasPage.php";
        } else if (isset($_GET["quienesSomos"])) {
            require "Vistas/sinUsuario/QuienesSomosPage.php";
        } else if (isset($_GET["condicionesGenerales"])) {
            require "Vistas/sinUsuario/CondicionesPage.php";
        } else if (isset($_GET["avisoLegal"])) {
            require "Vistas/sinUsuario/AvisoLegalPage.php";
        } else if (isset($_GET["politicaCookies"])) {
            require "Vistas/sinUsuario/PoliticasCookiesPage.php";
        } else if (isset($_GET["idProductos"])) {
            require "Vistas/sinUsuario/ProductPage.php";
        } else {
            require "Vistas/sinUsuario/HomePage.php";
        }
    }
}
