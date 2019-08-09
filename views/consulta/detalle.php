<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="public/css/default.css" rel="stylesheet">
    </head>
    <body>
        <?php require 'views/header.php'; ?>
        <div id="main">
            <h1>Detalle de <?php echo $this->alumno->matricula; ?></h1>
            <div class="center"><?php echo $this->mensaje; ?></div>
            <form action="<?php echo constant('URL') ?>consulta/actualizarAlumno" method="POST">
                <p>
                    <label for="matricula">Matricula</label><br/>
                    <input type="text" name="matricula" id=""  value="<?php echo $this->alumno->matricula ?>">
                </p>
                <p>
                    <label for="nombre">Nombre</label><br/>
                    <input type="text" name="nombre"  id="" value="<?php echo $this->alumno->nombre ?>">
                </p>
                <p>
                    <label for="apellido">Apellido</label><br/>
                    <input type="text" name="apellido" id="" value="<?php echo $this->alumno->apellido ?>">
                </p>
                <p>
                    <input type="submit" value="Actualizar alumno" id="">
                </p>
            </form>
        </div>
        <?php require 'views/footer.php'; ?>
    </body>
</html>