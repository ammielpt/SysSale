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
            <h1 class="center error"><?php echo $this->mensaje ?></h1>
        </div>        
        <?php require 'views/footer.php'; ?>
</html>