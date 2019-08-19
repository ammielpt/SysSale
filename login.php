<?php
ob_start();
session_start();
include_once './libs/database.php';
include_once './libs/controller.php';
include_once './libs/model.php';
include_once './libs/view.php';
include_once './libs/app.php';
require_once './config/config.php';
$var = new App();
?>
<html lang="en">

<head>
    <title>::Login::</title>
    <link href="resources/login/login.css" rel="stylesheet">
    <script>
        function hacerLogin() {
            var usuario = document.getElementById('usuario').value;
            var password = document.getElementById('pass').value;
            httpRequest('http://localhost/SysSale/login/validarLogin/' + usuario + '/' + password, function() {
                var data = JSON.parse(this.responseText);
                if (data.success) {
                    location.replace("http://localhost/SysSale/index.php");
                } else {
                    alert(data.mensaje);
                }
            });
        }
        /*$('.message a').click(function(){
          $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        });*/
        function httpRequest(url, callback) {
            const http = new XMLHttpRequest();
            http.open("POST", url);
            http.send();
            http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    callback.apply(http);
                }
            };
        }

        function enterpressalert(e, input) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) { //Enter keycode
                hacerLogin();
            }
        }
    </script>
</head>

<body>
    <div class="login-page">
        <div class="form">
            <form class="register-form">
                <input type="text" placeholder="name" />
                <input type="password" placeholder="password" />
                <input type="text" placeholder="email address" />
                <button>create</button>
                <p class="message">Already registered? <a href="#">Sign In</a></p>
            </form>
            <form class="login-form">
                <div class="title">Sistema de Ventas<br/><label>Version Carlita</label></div>                
                <input type="text" placeholder="usuario" id='usuario' />
                <input type="password" placeholder="password" id="pass" />
                <button onclick="hacerLogin()">Ingresar</button>
                <p class="message">Aún no registrado? <a href="#">Crear una cuenta</a></p>
            </form>
        </div>
    </div>
</body>

</html>