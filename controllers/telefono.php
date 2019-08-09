<?php

class Telefono extends Controller {

    function __construct() {
        parent::__construct();
    }

    function crearTelefono() {
        $idCliente = $_POST['idCliente'];
        $numeroTelefono = $_POST['numeroTelefono'];
        $idOperador = $_POST['idOperador'];
        $mensaje = "";
        header('Content-Type: application/json');
        if ($this->model->crear(["idCliente" => $idCliente, "numeroTelefono" => $numeroTelefono, "idOperador" => $idOperador])) {
            $mensaje = "El telefono fue agregado correctamente";
        } else {
            $mensaje = "El telefono ya existe";
        }
        $data = ["mensaje" => $mensaje, "success" => true];
        echo json_encode($data);
    }

    function listarOperadores() {
        $operadores = $this->model->getAllOperadores();
        $data = ["data" => $operadores, "numFilas" => 25, "success" => true];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function listarTelefonos() {
        $idCliente = $_GET['idCliente'];
        $telefonos = $this->model->getAllTelefonos($idCliente);
        $data = ["data" => $telefonos, "numFilas" => 25, "success" => true];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function actualizarTelefono() {
        $flag = false;
        $idCliente = $_POST['idCliente'];
        $idTelefono = $_POST['idTelefono'];
        $numeroTelefono = $_POST['numeroTelefono'];
        $idOperador = $_POST['idOperador'];
        if ($this->model->update(['idCliente' => $idCliente, 'idTelefono' => $idTelefono, 'numeroTelefono' => $numeroTelefono, 'idOperador' => $idOperador])) {
            $mensaje = "Telefono actualizado correctamente";
            $flag = true;
        } else {
            //Mensaje de error
            $mensaje = "Nose pudo actualizar el telefono";
        }
        $data = ["mensaje" => $mensaje, "success" => $flag];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function eliminarTelefono() {
        $idTelefono = $_GET['idTelefono'];
        $flag = false;
        if ($this->model->delete($idTelefono)) {
            $mensaje = "Telefono eliminado correctamente";
            $flag = true;
        } else {
            $mensaje = "Nose pudo eliminar el telefono";
        }
        $data = ["mensaje" => $mensaje, "success" => $flag];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

}
