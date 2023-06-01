<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vinotecas · Casa Greciano</title>
    <link rel="icon" type="image/x-icon" href="assets/favicon/uvas.png">
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
                <li><a href="Index.php?productos">PRODUCTOS</a></li>
                <li><a href="Index.php?carrito">CARRITO</a></li>
                <li><a href="Index.php?misPedidos">MIS PEDIDOS</a></li>
                <li><a href="Index.php?catas">VISÍTANOS</a></li>
                <li><a href="Index.php?quienesSomos">QUIÉNES SOMOS</a></li>
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
        <h1>Operación de pago</h1>
        <section class="carrito row">
            <div class="containerTarjeta">
                <section class="tarjeta" id="tarjeta">
                    <div class="parteDelante">
                        <div class="logoMarca">
                            <!-- <img src="assets/images/tarjeta/logos/visa.png" alt=""> -->
                        </div>
                        <img src="assets/images/tarjeta/chip-tarjeta.png" alt="" class="chip">
                        <div class="datosTarjeta">
                            <div class="grupo" id="numeroTarjeta">
                                <p class="label">Número de tarjeta</p>
                                <p class="numero">#### #### #### ####</p>
                            </div>
                            <div class="row">
                                <div class="grupo" id="nombreTitular">
                                    <p class="label">Nombre del titular</p>
                                    <p class="nombre">Tu nombre...</p>
                                </div>
                                <div class="grupo" id="containerExpiracion">
                                    <p class="label" id="expiracion">Fecha expiración</p>
                                    <p class="expiracion"><span class="mes">MM</span> / <span class="year">AA</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="parteTrasera">
                        <div class="barraMagnetica"></div>
                        <div class="datosTarjeta row">
                            <div class="grupo" id="firma">
                                <p class="label">Firma</p>
                                <div class="firma">
                                    <p></p>
                                </div>

                            </div>
                            <div class="grupo" id="ccv">
                                <p class="label">CVV</p>
                                <p class="ccv"></p>
                            </div>
                        </div>
                        <p class="leyenda">Datos bancarios protegidos por derecho bajo aviso legal y política de privacidad.</p>
                    </div>
                </section>
                <div class="containerBtn">
                    <button class="btnAbrirForm">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <form class="formTarjeta">
                    <div class="grupo">
                        <label for="numTarjeta">Número Tarjeta</label>
                        <input type="text" name="numTarjeta" id="numTarjeta" required maxlength="16" autocomplete="off" minlength="16" >
                    </div>
                    <div class="grupo">
                        <label for="nombreTarjeta">Nombre</label>
                        <input type="text" name="nombreTarjeta" id="nombreTarjeta" required maxlength="19" autocomplete="off">
                    </div>
                    <div class="row">
                        <div class="grupo" id="grupoExpiracion">
                            <label for="selectMes">Expiración</label>
                            <div class="row">
                                <grupo class="select">
                                    <select name="mes" id="selectMes">
                                        <option disabled selected>Mes</option>
                                    </select>
                                    <i class="fas fa-angle-down"></i>
                                </grupo>
                                <grupo class="select">
                                    <select name="year" id="selectYear">
                                        <option disabled selected>Año</option>
                                    </select>
                                    <i class="fas fa-angle-down"></i>
                                </grupo>
                            </div>
                        </div>
                        <div class="grupo ccv">
                            <label for="inputCcv">CCV</label>
                            <input type="text" name="inputCcv" id="inputCcv" required maxlength="3">
                        </div>
                    </div>
                    <div class="row buttons">
                        <a class="btnCancelar">Cancelar</a>
                        <button type="submit" class="btnEnviar">Comprar</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
    <footer>
        <section class="containerFooter row">
            <nav>
                <ul>
                    <li><a href="Index.php" class="selected">INICIO</a></li>
                    <li><a href="Index.php?productos">NUESTROS VINOS</a></li>
                    <li><a href="Index.php?carrito">CARRITO</a></li>
                    <li><a href="Index.php?misPedidos">MIS PEDIDOS</a></li>
                    <li><a href="Index.php?catas">VISÍTANOS</a></li>
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
    <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
    <script src="assets/JS/formularioPago.js"></script>
</body>

</html>