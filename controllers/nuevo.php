<?php

class Nuevo extends Controller {

    function __construct() {
        parent::__construct();
        $this->view->mensaje = "";
    }

    function render() {
        $this->view->render('nuevo/index');
    }

    function registrarNuevoAlumno() {
        $matricula = $_POST['matricula'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $mensaje = "";
        header('Content-Type: application/json');
        if ($this->model->insert(["matricula" => $matricula, "nombre" => $nombre, "apellido" => $apellido])) {
            $mensaje = "Nuevo alumno creado";
        } else {
            $mensaje = "La matricula ya existe";
        }
        $data = ["mensaje" => $mensaje, "success" => true];
        echo json_encode($data);
        die();
        //$this->view->mensaje = $mensaje;
        // $this->render();
    }

}
