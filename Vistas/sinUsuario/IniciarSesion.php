<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vinotecas · Casa Greciano</title>
    <link rel="stylesheet" href="assets/css/estilosLogin.css">
</head>

<body>
    <div class="containerInicioSesion">
        <div class="imageAside">
            <img src="assets/images/vinoslog.webp" alt="">
        </div>
        <div class="login">
            <article>
                <div class="logo"><a href="Index.php"><img src="assets/images/logo/1223.png"></a></div>
                <div class="divForm">
                    <?php
                        if(isset($_SESSION["errorInicioSesion"])){
                            echo "<h2 style='color: red'>El usuario o contraseña es incorrecto</h2>";
                        }
                        if(isset($_SESSION["usuarioRegistrado"])){
                            echo "<h2>El usuario ".$_SESSION["usuarioRegistrado"]." ha sido creado con éxito</h2><br>";
                        }
                    ?>
                    <h2>Inicia sesión con tu cuenta</h2>
                    <form action="Index.php?login" method="POST" autocomplete="off">
                        <input type="email" name="email" placeholder="Email" required>
                        <input type="password" name="pass" placeholder="***********" required>
                        <div class="recuerda">
                            <label for="">Recuerda</label>
                            <input type="checkbox" name="recuerda">
                        </div>    
                        <input type="submit" value="Iniciar sesión" name="inicioSesion">
                    </form>
                    <p>¿No tienes cuenta? Registrate <a href="Index.php?registrar" class="link">aquí</a></p>
                    <p>¿Quieres volver a la página principal? Pincha <a href="Index.php" class="link">aquí</a></p>
                </div>
            </article>
        </div>
    </div>
</body>

</html>