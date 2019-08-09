<?php

include_once 'models/operador.php';
include_once 'models/telefono.php';

class TelefonoModel extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function getAllOperadores() {
        $items = [];
        try {
            $query = $this->db->connect()->query("select * from tbl_operador");
            while ($row = $query->fetch()) {
                $item = new Operador();
                $item->idOperador = $row['id_operador'];
                $item->nombreOperador = $row['nombre_operador'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function crear($datos) {
        try {
            $query = $this->db->connect()->prepare("insert into tbl_telefonos(id_operador, numero_telefono, id_cliente) values(:idOperador,:numeroTelefono,:idCliente)");
            $query->execute(['idOperador' => $datos['idOperador'], 'numeroTelefono' => $datos['numeroTelefono'], 'idCliente' => $datos['idCliente']]);
            return true;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getAllTelefonos($idCliente) {
        $items = [];
        try {
            $query = $this->db->connect()->prepare("select top.nombre_operador, tl.* from tbl_telefonos as tl left join tbl_operador as top on tl.id_operador=top.id_operador where tl.id_cliente=:idCliente and tl.activo=1");
            $query->execute(["idCliente" => $idCliente]);
            while ($row = $query->fetch()) {
                $item = new Telefonos();
                $item->idTelefono = $row['id_telefono'];
                $item->idOperador = $row['id_operador'];
                $item->nombreOperador = $row['nombre_operador'];
                $item->numeroTelefono = $row['numero_telefono'];
                $item->idCliente = $row['id_cliente'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function update($item) {
        try {
            $query = $this->db->connect()->prepare("update tbl_telefonos set id_cliente=:idCliente, numero_telefono=:numeroTelefono, id_operador=:idOperador  where id_telefono=:idTelefono");
            $query->execute([
                "idCliente" => $item['idCliente'],
                "numeroTelefono" => $item['numeroTelefono'],
                "idOperador" => $item['idOperador'],
                "idTelefono" => $item['idTelefono']
            ]);
            return true;
        } catch (PDOException $exc) {
            return false;
        }
    }

    public function delete($idTelefono) {
        try {
            $query = $this->db->connect()->prepare("update tbl_telefonos set activo=0  where  id_telefono=:idTelefono");
            $query->execute(["idTelefono" => $idTelefono]);
            return true;
        } catch (PDOException $exc) {
            return false;
        }
    }

}
