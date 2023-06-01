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
                <li><a href="Index.php?catas" class="selected">CATAS</a></li>
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
        <h1>LOCALIZACIÓN</h1>
        <div class="catas row">

            <section class="datosEmpresa">

                <p>Estamos en la calle <span>Francisco Silvela</span>, 25 en el barrio de <span>Las Ventas</span> en
                    Madrid.</p>
                <p>Puedes venir en transporte público:</p>
                <ul>
                    <li>En <span>autobús</span>: líneas 1, 74, 146, 12 y 21</li>
                    <li>En <span>metro</span>: líneas M-2, M-6, M-4 y M-2</li>
                </ul>
                <p>Nuestro horario es:</p>
                <ul>
                    <li><span>Lunes a Viernes</span> de 9.00 a 24.00h</li>
                    <li><span>Sábados</span> de 12.00 a 1.00h</li>
                </ul>
                <p>Si quieres contactar con uno de los dueños:</p>
                <div class="redesSociales row">
                    <div><a href="https://www.instagram.com/victor_greci/" target="_blank"><img
                                src="assets/images/insta.png" alt=""></a></div>
                    <div><a href="https://www.facebook.com/victor.greci.9/" target="_blank"><img
                                src="assets/images/facebook.png" alt=""></a></div>
                    <div><a href="https://twitter.com/victor_greci" target="_blank" rel="noopener noreferrer"><img
                                src="assets/images/twitter-tweet-social-logo-icon.svg" width="48" height="48"
                                alt=""></a></div>
                </div>
            </section>
            <section class="maps">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24298.129123797575!2d-3.7013108681165363!3d40.42510537171067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd413ee7ab5c51af%3A0x89ef2260ca0cbbf0!2sVinoPremier!5e0!3m2!1ses!2ses!4v1680223751318!5m2!1ses!2ses"
                    width="400" height="200" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </div>
        <section class="catas row">
            <div class="imfg">
                <img src="assets/images/interior2.jpg" style="width:400px;" alt="">
            </div>
            <div class="datosEmpresa">
                <div class="product-information">

                    <div id="product-description-short-4703" class="product-description-short mb-3 "
                        itemprop="description">
                        <h1>CATA LOCAL</h1>
                        <p>• Cata de 5 Vinos&nbsp;<strong></strong>•&nbsp;</p>
                        <p><strong>Ver toda la información en descripción</strong></p>
                    </div>

                    <!-- añado la descripcion larga aquí -->

                    <div class="product-description">
                        <div class="style_content">
                            <p><strong>Viernes 23 de Junio&nbsp;</strong>te esperamos otro&nbsp;día más para catar vinos
                                en&nbsp;<strong>Casa Pablo Vinos</strong>&nbsp;en Marbella.</p>
                            <p>Presentaremos vinos&nbsp;de la Bodega <strong>Toni Martin</strong>.</p>
                            <p></p>
                            <p class="MsoNormal">José Ángel Triano sumiller certificado será el encargado de guiarnos
                                por la diversidad y originalidad de la geografía Castilla y León a través de sus vinos.
                            </p>
                            <p>También os daremos tips sobre que ocasión es ideal para beber los vinos catados, que
                                temperaturas son ideales para servirlos y como armonizarlos de forma acertada con
                                diferentes especialidades gastronómicas.</p>
                            <p>&nbsp;</p>
                            <p><strong>Que incluye</strong></p>
                            <p>Cata de 5 vinos impartida por un sumiller certificado.</p>
                            <p>Aperitivo al finalizar.</p>
                            <p></p>
                            <p><strong>IDIOMA</strong>: Español</p>
                            <p><strong>NIVEL</strong>: todos los niveles.&nbsp;</p>
                            <p>&nbsp;</p>
                            <p><strong>Vinos a Catar</strong></p>
                            <p>1. <b>All &amp; Billo 2020</b>&nbsp;•<em> Blanco</em></p>
                            <p>2. <b>José Del Amo Fermentado E Barrica 2017</b>&nbsp;• <em>Blanco</em></p>
                            <p>3. <strong>Talla Granito</strong><em><strong>&nbsp;2020</strong></em> • <em>Tinto</em>
                            </p>
                            <p>4.&nbsp;<strong>Tóser Tinaja</strong>&nbsp;• <em>Tinto</em></p>
                            <p>5. <strong>Talla Vendimia
                                    Seleccionada</strong><strong>&nbsp;201</strong><strong>8</strong>&nbsp;• Tinto</p>

                            <p><em>Venta de entradas exclusiva para mayores de 18 años.&nbsp;</em></p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
    <footer>
        <section class="containerFooter row">
            <nav>
                <ul>
                    <li><a href="Index.php">INICIO</a></li>
                    <li><a href="Index.php?productos">NUESTROS VINOS</a></li>
                    <li><a href="Index.php?carrito">CARRITO</a></li>
                    <li><a href="Index.php?misPedidos">MIS PEDIDOS</a></li>
                    <li><a href="Index.php?catas" class="selected">CATAS</a></li>

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