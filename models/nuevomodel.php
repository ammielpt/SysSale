<?php

class NuevoModel extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function insert($datos) {
        try {
            $query = $this->db->connect()->prepare("insert into alumnos values(:matricula,:nombre,:apellido)");
            $query->execute(['matricula' => $datos['matricula'], 'nombre' => $datos['nombre'], 'apellido' => $datos['apellido']]);
            return true;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

}
