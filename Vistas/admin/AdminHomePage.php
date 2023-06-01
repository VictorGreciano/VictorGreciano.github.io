<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vinotecas · Casa Greciano</title>
    <link rel="stylesheet" href="assets/css/estilos.css">
</head>

<body>
    <header>
        <div class="logoHeader">
            <a href="Index.php"><img src="assets/images/logo/1223.png" style="width:250px;height:250px;"></a>
        </div>
        <nav>
            <ul class="row">
                <li><a href="Index.php" class="selected">INICIO</a></li>
                <li><a href="Index.php?productosAdmin">Productos</a></li>
                <li><a href="Index.php?pedidosAdmin">Pedidos</a></li>
                <li><a href="Index.php?clientesAdmin">Clientes</a></li>
                <?php
                if (isset($_SESSION["rol"])) {
                    echo "<li><a href='Index.php?logout'>CERRAR SESIÓN</a></li>";
                } else {
                    echo "<li><a href='Index.php?login'>INICIAR SESIÓN</a></li>";
                }
                ?>

            </ul>
        </nav>
    </header>
    <div class="banner"></div>
    <div class="container">
        <h1>Bienvenido Administrador</h1>
        <p>Puedes realizar las siguientes acciones:</p>
        <section class="adminSection row">
            <div>
                <h2>Productos</h2>
                <nav>
                    <ul>
                        <li><a href="Index.php?consultaProductosAdmin">Consultar Productos</a></li>
                        <li><a href="Index.php?editarProductosAdmin">Editar Productos</a></li>
                        <li><a href="Index.php?borrarProductosAdmin">Borrar Productos</a></li>
                        <li><a href="Index.php?insertarProductos">Insertar Productos</a></li>
                    </ul>
                </nav>
                <h2>Clientes</h2>
                <nav>
                    <ul>
                        <li><a href="Index.php?clientesAdmin">Visualizar Clientes</a></li>
                    </ul>
                </nav>
                <h2>Pedidos</h2>
                <nav>
                    <ul>
                        <li><a href="Index.php?pedidosAdmin">Visualizar Pedidos</a></li>
                    </ul>
                </nav>
            </div>
            <div><img src="assets/images/adminvinos.jpg" alt=""></div>
        </section>
    </div>
    <footer>
        <section class="containerFooter row">
            <nav>
                <ul>
                    <li><a href="Index.php" class="selected">INICIO</a></li>
                    <li><a href="Index.php?productosAdmin">PRODUCTOS</a></li>
                    <li><a href="Index.php?pedidosAdmin">PEDIDOS</a></li>
                    <li><a href="Index.php?clientesAdmin">CLIENTES</a></li>
                    <?php
                    if (isset($_SESSION["rol"])) {
                        echo "<li><a href='Index.php?logout'>CERRAR SESIÓN</a></li>";
                    } else {
                        echo "<li><a href='Index.php?login''>INICIAR SESIÓN</a></li>";
                    }
                    ?>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li><a href="Index.php?consultaProductosAdmin">Consultar Productos</a></li>
                    <li><a href="Index.php?editarProductosAdmin">Editar Productos</a></li>
                    <li><a href="Index.php?borrarProductosAdmin">Borrar Productos</a></li>
                    <li><a href="Index.php?insertarProductos">Insertar Productos</a></li>
                </ul>
            </nav>
            <div>
                <p>¿Dónde encontrarnos?</p>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24298.129123797575!2d-3.7013108681165363!3d40.42510537171067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd413ee7ab5c51af%3A0x89ef2260ca0cbbf0!2sVinoPremier!5e0!3m2!1ses!2ses!4v1680223751318!5m2!1ses!2ses"
                    width="400" height="200" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
        <hr>
        <div>
            <p>Copyright © 2023 - Víctor Greciano - Todos los derechos reservados</p>
        </div>
    </footer>

</body>

</html>