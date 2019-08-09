<?php

class Correo extends Controller {

    function __construct() {
        parent::__construct();
    }

    function crearCorreo() {
        $idCliente = $_POST['idCliente'];
        $correo = $_POST['correo'];
        $principal = $_POST['principal'];
        $mensaje = "";
        header('Content-Type: application/json');
        if ($this->model->crear(["idCliente" => $idCliente, "correo" => $correo, "principal" => $principal])) {
            $mensaje = "El telefono fue agregado correctamente";
        } else {
            $mensaje = "El telefono ya existe";
        }
        $data = ["mensaje" => $mensaje, "success" => true];
        echo json_encode($data);
    }

    function listarCorreos() {
        $idCliente = $_GET['idCliente'];
        $correos = $this->model->getAllCorreos($idCliente);
        $data = ["data" => $correos, "numFilas" => 25, "success" => true];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function actualizarCorreo() {
        $flag = false;
        $idCorreo = $_POST['idCorreo'];
        $idCliente = $_POST['idCliente'];
        $correo = $_POST['correo'];
        $principal = $_POST['principal'];
        if ($this->model->update(['idCorreo' => $idCorreo, 'idCliente' => $idCliente, 'correo' => $correo, 'principal' => $principal])) {
            $mensaje = "Correo actualizado correctamente";
            $flag = true;
        } else {
            //Mensaje de error
            $mensaje = "Nose pudo actualizar el correo";
        }
        $data = ["mensaje" => $mensaje, "success" => $flag];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function eliminarCorreo() {
        $idCorreo = $_GET['idCorreo'];
        $flag = false;
        if ($this->model->delete($idCorreo)) {
            $mensaje = "Correo eliminado correctamente";
            $flag = true;
        } else {
            $mensaje = "Nose pudo eliminar el correo";
        }
        $data = ["mensaje" => $mensaje, "success" => $flag];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

}
