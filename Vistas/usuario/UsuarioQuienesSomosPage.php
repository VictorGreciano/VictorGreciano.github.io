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
                <li><a href="Index.php?productos">NUESTROS VINOS</a></li>
                <li><a href="Index.php?carrito">CARRITO</a></li>
                <li><a href="Index.php?misPedidos">MIS PEDIDOS</a></li>
                <li><a href="Index.php?catas">CATAS</a></li>
                <li><a href="Index.php?quienesSomos" class="selected">QUIÉNES SOMOS</a></li>
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
        <div class="quienesSomos">
            <h1>¿QUIÉNES SOMOS?</h1>
            <div class="filas">
                <section class="fila1 row">

                    <div class="imagenLogo"><img src="assets\images\logo\viti.png" alt=""></div>
                    <div class="nuestraHIstoria">
                        <h1>NUESTRA HISTORIA</h1>
                        <p>La historia de una vinoteca puede variar dependiendo de la región y el país en el que se encuentre, pero generalmente se remonta a los siglos XVIII y XIX, cuando los comerciantes comenzaron a importar grandes cantidades de vino de Europa y otras partes del mundo.</p>
                        <p>En algunos casos, las vinotecas comenzaron como bodegas familiares, donde se almacenaba y se vendía vino producido localmente. Sin embargo, con el tiempo, muchas vinotecas se especializaron en la venta de vinos importados de alta calidad y se convirtieron en lugares de encuentro para los amantes del vino y los conocedores.

Con el paso de los años, las vinotecas se han expandido y han adoptado diferentes enfoques para atender a sus clientes. Algunas se han convertido en tiendas especializadas en vinos de una determinada región o país, mientras que otras ofrecen una amplia selección de vinos de todo el mundo.

Además de la venta de vino, muchas vinotecas también ofrecen degustaciones y catas, eventos especiales y asesoramiento a sus clientes. En algunos casos, las vinotecas también ofrecen servicios de restaurante y bar de vinos, proporcionando a los clientes la oportunidad de disfrutar del vino en un ambiente relajado y acogedor.

En la actualidad, las vinotecas siguen siendo lugares populares para comprar y disfrutar de vinos de alta calidad. Con el creciente interés en la cultura del vino y la gastronomía, se espera que las vinotecas sigan siendo un elemento importante en el mundo del vino y el turismo en los años venideros.</p>

                    </div>
                </section>
                <section class="fila2 row">
                    <div class="textoss">
                        <h1>NUESTRA CALIDAD COMO MARCA</h1>
                        <p>La calidad de marca de una vinoteca se refiere a la reputación y el prestigio que tiene la marca en el mercado. Una vinoteca con una buena calidad de marca se considera confiable, ofrece productos de alta calidad y cuenta con una buena imagen en el mercado. Una vinoteca que tiene una mala calidad de marca puede tener problemas para atraer a nuevos clientes y retener a los clientes existentes. La calidad de marca se puede construir a través de una combinación de factores, como la calidad de los productos, la atención al cliente, la publicidad y el marketing, entre otros.</p>
                    </div>
                    <div class="imagenLogo"><img src="assets/images/logo/1223.png"  style="width:350px;height:350px;" alt=""></div>
                </section>
            </div>
        </div>
    </div>
    <footer>
        <section class="containerFooter row">
            <nav>
                <ul>
                    <li><a href="Index.php">INICIO</a></li>
                    <li><a href="Index.php?productos">NUESTROS VINOS</a></li>
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

</body>

</html>