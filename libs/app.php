<?php

require_once 'controllers/errores.php';

class App {

    function __construct() {
        $url = isset($_GET['url']) ? $_GET['url'] : null;
        $url = rtrim($url, '/');
        $url = explode('/', $url);
        //Cuando se ingresa sin definir un controlador.
        if (empty($url[0])) {
            $archivoController = 'controllers/main.php';
            require_once $archivoController;
            $controller = new Main();
            $controller->loadModel('main');
            $controller->render();
            return false;
        }
        //var_dump($url);
        $archivoController = 'controllers/' . $url[0] . '.php';
        if (file_exists($archivoController)) {
            require_once $archivoController;

            //Inicializar controlador
            $controller = new $url[0];
            $controller->loadModel($url[0]);
            //Numero de elementos del arreglo
            $nparam = count($url);
            if ($nparam > 1) {
                if ($nparam > 2) {
                    $param = [];
                    for ($i = 2; $i < $nparam; $i++) {
                        array_push($param, $url[$i]);
                    }
                    $controller->{$url[1]}($param);
                } else {
                    $controller->{$url[1]}();
                }
                die();
            } else {
                $controller->render();
            }
        } else {
            $controller = new Errores();
        }
    }

}
