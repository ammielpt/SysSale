<?php

//include_once 'models/alumno.php';

class ConsultaModel extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function get() {
        $items = [];
        try {
            $query = $this->db->connect()->query("Select * from alumnos");
            while ($row = $query->fetch()) {
                $item = new Alumno();
                $item->matricula = $row['matricula'];
                $item->nombre = $row['nombre'];
                $item->apellido = $row['apellido'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getById($id) {
        $item = new Alumno();
        try {
            $query = $this->db->connect()->prepare("select * from alumnos where matricula=:matricula");
            $query->execute(["matricula" => $id]);
            while ($row = $query->fetch()) {
                $item->matricula = $row['matricula'];
                $item->nombre = $row['nombre'];
                $item->apellido = $row['apellido'];
            }
            return $item;
        } catch (Exception $exc) {
            return null;
        }
    }

    public function update($item) {
        try {
            $query = $this->db->connect()->prepare("update alumnos set nombre=:nombre, apellido=:apellido where matricula=:matricula");
            $query->execute([
                "nombre" => $item['nombre'],
                "apellido" => $item['apellido'],
                "matricula" => $item['matricula']
            ]);
            return true;
        } catch (PDOException $exc) {
            return false;
        }
    }

    public function delete($matricula) {
        try {
            $query = $this->db->connect()->prepare("delete from alumnos where  matricula=:matricula");
            $query->execute(["matricula" => $matricula]);
            return true;
        } catch (PDOException $exc) {
            return false;
        }
    }

}
