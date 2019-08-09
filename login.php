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
<html lang = "en">
    <head>
        <title>Tutorialspoint.com</title>
        <link href = "resources/login/login.css" rel = "stylesheet">        
        <script>
            function hacerLogin() {
                var usuario = document.getElementById('usuario').value;
                var password = document.getElementById('pass').value;
                httpRequest('http://localhost/SysSale/login/validarLogin/' + usuario + '/' + password, function () {
                    var data = JSON.parse(this.responseText);
                    if (data.success) {
                        location.replace("http://localhost/SysSale/index.php");
                    } else {
                        alert(data.mensaje);
                    }
                });
            }
            function httpRequest(url, callback) {
                const http = new XMLHttpRequest();
                http.open("POST", url);
                http.send();
                http.onreadystatechange = function () {
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
        <div class="login-wrap">
            <div class="login-html">
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Login</label>
                <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Bienvenido</label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <div class="group">
                            <label for="user" class="label">Usuario</label>
                            <input id="usuario" type="text" class="input"  onKeyPress="enterpressalert(event, this)">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Password</label>
                            <input id="pass" type="password" class="input" data-type="password" onKeyPress="enterpressalert(event, this)">
                        </div>
                        <div class="group">
                            <input id="check" type="checkbox" class="check" checked>
                            <label for="check"><span class="icon"></span>Mantenerme logueado</label>
                        </div>
                        <div class="group">
                            <input type="submit" class="button" onclick="hacerLogin();" value="Entrar">
                        </div>
                        <div class="hr"></div>
                        <div class="foot-lnk">
                            <a href="#forgot">Olvidaste tu password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>