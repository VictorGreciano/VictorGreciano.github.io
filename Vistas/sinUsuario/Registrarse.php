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
                        if(isset($_SESSION["usuarioRegistrado"])){
                            echo "<h2>El usuario ".$_SESSION["usuarioRegistrado"]." ha sido creado con éxito</h2>";
                            header("Location: Index.php?login");
                            exit();
                        }else {
                            echo "<h2>Regístrate como nuevo usario</h2>";
                        }
                    ?>

                    <form action="Index.php?registrar" method="POST" autocomplete="off">
                        <input type="text" name="name" placeholder="Nombre" required pattern="[a-zA-Z ]{2,254}" title="El nombre solo puede tener carácteres no numéricos">
                        <input type="text" name="surname" placeholder="Apellidos" required pattern="[a-zA-Z ]{2,254}" title="El nombre solo puede tener carácteres no numéricos">
                        <input type="text" name="adress" placeholder="Dirección" required>
                        <input type="email" name="email" placeholder="Email" required>
                        <input type="text" name="phone" placeholder="Teléfono" required maxlength="9" pattern="[0-9]{9}" title="El teléfono consta de 9 números">
                        <input type="text" name="postal" placeholder="Código postal" required maxlength="5" pattern="[0-9]{5}" title="Solo cinco números">
                        <input type="password" name="password" placeholder="Contraseña" required>
                        <input type="submit" value="Registrarse" name="registrarse" required>
                    </form>
                    <p>¿Ya tienes cuenta? Inicia sesión <a href="Index.php?login" class="link">aquí</a></p>
                    <p>¿Quieres volver a la página principal? Pincha <a href="Index.php" class="link">aquí</a></p>
                </div>
            </article>
        </div>
    </div>
</body>

</html>