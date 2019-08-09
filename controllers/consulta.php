<?php

class Consulta extends Controller {

    function __construct() {
        parent::__construct();
        $this->view->alumnos = [];
    }

    function render() {
        $alumnos = $this->model->get();
        $this->view->alumnos = $alumnos;
        $this->view->render('consulta/index');
    }

    function listarAlumnos() {
        $alumnos = $this->model->get();
        $data = ["data" => $alumnos, "numFilas" => 25, "success" => true];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function verAlumno($param = null) {
        $idAlumno = $param[0];
        $alumno = $this->model->getById($idAlumno);
        session_start();
        $_SESSION['id_verAlumno'] = $alumno->matricula;
        $this->view->alumno = $alumno;
        $this->view->mensaje = "";
        $this->view->render('consulta/detalle');
    }

    function actualizarAlumno() {
        $matricula = $_POST['matricula'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        if ($this->model->update(['matricula' => $matricula, 'nombre' => $nombre, 'apellido' => $apellido])) {
//            $alumno = new Alumno();
//            $alumno->matricula = $matricula;
//            $alumno->nombre = $nombre;
//            $alumno->apellido = $apellido;
//            $this->view->alumno = $alumno;
            $mensaje = "Alumno actualizado correctamente";
        } else {
            //Mensaje de error
            $mensaje = "Nose pudo actualizar el alumno";
        }
        $data = ["mensaje" => $mensaje, "success" => true];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function eliminarAlumno($param = null) {
        $matricula = $param[0];
        if ($this->model->delete($matricula)) {
            //$this->view->mensaje = "Alumno eliminado correctamente";
            $mensaje = "Alumno eliminado correctamente";
        } else {
            //Mensaje de error
            //$this->view->mensaje = "Nose pudo eliminar";
            $mensaje = "Nose pudo eliminar";
        }
        //$this->render();
        $data = ["mensaje" => $mensaje, "success" => true];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

}
