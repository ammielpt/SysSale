<?php

class Login extends Controller {

    function __construct() {
        parent::__construct();
    }

    public function validarLogin($params) {
        $flag = false;
        $nombre = $params[0];
        $pass = $params[1];
        header('Content-Type: application/json');
        if ($this->model->getUsuario($nombre, $pass)) {
            $flag = true;
            $mensaje = "Bienvenido usuario " . $nombre;
        } else {
            $flag = false;
            $mensaje = "Usuario o password incorrectos";
        }
        $data = ["mensaje" => $mensaje, "success" => $flag];
        echo json_encode($data);
    }

}
