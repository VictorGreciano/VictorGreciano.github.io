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
        <div class="condicionesGenerales">
            <h1>Aviso Legal</h1>
            <p>
                ¡Bienvenido a Vinos Casa Greciano!
                En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de
                Comercio Electrónico, le informamos:
            </p>
            <p>
                VINOS · CASA  GRECIANO · es una tienda dedicada a la venta de vinos de música y merchandising musical.
                VINOS · CASA  GRECIANO· con NIF 47582153Y, con domicilio a los efectos de la presente información en
                C/ de Francisco Silvela, 25, 28028 Madrid, es en la actualidad la encargada de la explotación,
                gestión y funcionamiento del sitio web www.vinoscasagreciano.es
            </p>
            <p>
                Como empresa dedicada a la venta de vinos y licores de alta calidad, en cumplimiento de la Ley 34/2002,
                de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, le informamos
                que somos una tienda en línea con NIF 47582153Y y con domicilio en C/ de Francisco Silvela, 25, 28028 Madrid.
                Nos encargamos de la explotación, gestión y funcionamiento del sitio web www.vinoscasagreciano.es
            </p>
            <p>
                Además, ponemos a su disposición los siguientes datos de contacto: correo electrónico:
                info@vinoscasagreciano.es
            </p>
            <h3>
                PROPIEDAD INTELECTUAL E INDUSTRIAL
            </h3>
            <p>
                En nuestro sitio web, los usuarios pueden adquirir una amplia variedad de vinos y licores de alta
                calidad. Todos los precios incluyen IVA y cualquier descuento aplicado se indicará en cada uno de los
                productos.
            </p>
            <p>
                En Vinos Casa Greciano, nos preocupamos por la privacidad y seguridad de nuestros clientes, y nos
                reservamos el derecho de modificar nuestra política de privacidad para cumplir con las normativas
                legales vigentes. Cualquier cambio será anunciado en nuestro sitio web para que sea conocido por
                nuestros usuarios.
            </p>
            <p>
                Todos los elementos, contenidos, estructura, diseño y forma de presentación de nuestro sitio web son
                propiedad de Vinos Casa Greciano y están protegidos por los derechos de propiedad industrial e
                intelectual. Por tanto, queda prohibida cualquier forma de reproducción, transformación, distribución o
                explotación sin nuestra autorización expresa.
            </p>
            <p>
                Además, instamos a nuestros usuarios a no utilizar medios que puedan alterar o manipular el sitio web o
                sus contenidos.
            </p>
            <p>En Vinos Casa Greciano no nos responsabilizamos por el uso inapropiado que terceros puedan hacer de
                nuestro sitio web ni de la información que a través de él transmitan a terceros. Los contenidos
                proporcionados en nuestra página web son meramente informativos y cualquier consecuencia o daño que
                pudiera derivarse de su uso son de la exclusiva responsabilidad del usuario.</p>

            <p>Finalmente, nos reservamos el derecho de ejercer las acciones legales oportunas contra cualquier uso
                ilícito por parte de terceros de los contenidos de nuestro sitio web.</p>

            <p>¡Gracias por confiar en Vinos Casa Greciano!</p>
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
                    <li><a href="Index.php?avisoLegal" class="selected">AVISO LEGAL</a></li>
                    <li><a href="Index.php?politicaCookies">POLÍTICA DE COOKIES</a></li>
                    <li><a href="Index.php?condicionesGenerales">CONDICIONES GENERALES</a></li>
                </ul>
            </nav>
            <div>
                <p>¿Dónde encontrarnos?</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24298.129123797575!2d-3.7013108681165363!3d40.42510537171067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd413ee7ab5c51af%3A0x89ef2260ca0cbbf0!2sVinoPremier!5e0!3m2!1ses!2ses!4v1680223751318!5m2!1ses!2ses" width="400" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
        <hr>
        <div>
            <p>Copyright © 2023 - Víctor Greciano - Todos los derechos reservados</p>

        </div>
    </footer>
</body>

</html>