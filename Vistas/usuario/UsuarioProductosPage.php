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
                <li><a href="Index.php">INICIO</a></li>
                <li><a href="Index.php?productos" class="selected">NUESTROS VINOS</a></li>
                <li><a href="Index.php?carrito">CARRITO</a></li>
                <li><a href="Index.php?misPedidos">MIS PEDIDOS</a></li>
                <li><a href="Index.php?catas">CATAS</a></li>

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
        <form autocapitalize="true" autocomplete="off" class="formBusqueda">
            <label for="cajaConsulta">Busca un Vino por</label>
            <input type="text" name="" id="cajaConsulta">
        </form>
        <section class="filaProductos row">
            
            <div class="categorias">
            <h1>FILTROS DE BÚSQUEDA:</h1>
                <div class="tipos">
                    <h2>TIPOS</h2>
                    <ul>
                        <li>Tinto</li>
                        <li>Blanco</li>
                        <li>Rosado</li>
                    </ul>
                </div>
                <div class="pais">
                    <h2>PAÍSES</h2>
                    <ul>
                        <li>España</li>
                        <li>Francia</li>
                        <li>Italia</li>
                    </ul>
                </div>
            </div>
            <div class="novedades">
                <h1>VINOS A LA VENTA</h1>
                <div class="vinosNovedades row">

                </div>
            </div>
        </section>
    </div>
    <footer>
        <section class="containerFooter row">
            <nav>
                <ul>
                    <li><a href="Index.php">INICIO</a></li>
                    <li><a href="Index.php?productos" class="selected">NUESTROS VINOS</a></li>
                    <li><a href="Index.php?carrito">CARRITO</a></li>
                    <li><a href="Index.php?misPedidos">MIS PEDIDOS</a></li>
                    <li><a href="Index.php?catas">CATAS</a></li>
                    <?php
                        if (isset($_SESSION["rol"])) {
                            echo "<li><a href='Index.php?logout'>CERRAR SESIÓN</a></li>";
                        } else {
                            echo "<li><a href='Index.php?login'>INICIAR SESIÓN</a></li>";
                        }
                    ?>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li><a href="Index.php?avisoLegal">AVISO LEGAL</a></li>
                    <li><a href="Index.php?politicaCookies">POLÍTICA DE COOKIES</a></li>
                    <li><a href="Index.php?condicionesGenerales">CONDICIONES GENERALES</a></li>
                </ul>
            </nav>
            <div>
                <p>¿Dónde encontrarnos?</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.2411788407976!2d-3.705544685237276!3d40.425658163021524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228627dfd79af%3A0x2e36663119f596b8!2sCalle%20de%20San%20Vicente%20Ferrer%2C%2025%2C%2028004%20Madrid!5e0!3m2!1ses!2ses!4v1612910205852!5m2!1ses!2ses" width="400" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
        </section>
        <hr>
        <div>
            <p>Copyright © 2023 - Víctor Greciano - Todos los derechos reservados</p>

        </div>
    </footer>
    <script src="assets/JS/consultaProductosUsuario.js"></script>
</body>

</html>