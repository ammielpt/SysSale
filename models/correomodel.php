<?php

include_once 'models/correo.php';

class CorreoModel extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function crear($datos) {
        try {
            $query = $this->db->connect()->prepare("insert into tbl_correos(correo, id_cliente, principal) values(:correo,:idCliente,:principal)");
            $query->execute(['correo' => $datos['correo'], 'idCliente' => $datos['idCliente'], 'principal' => $datos['principal']]);
            return true;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getAllCorreos($idCliente) {
        $items = [];
        try {
            $query = $this->db->connect()->prepare("select * from tbl_correos where id_cliente=:idCliente and activo=1");
            $query->execute(["idCliente" => $idCliente]);
            while ($row = $query->fetch()) {
                $item = new Correos();
                $item->idCliente = $row['id_cliente'];
                $item->idCorreo = $row['id_correo'];
                $item->correo = $row['correo'];
                $item->principal = $row['principal'];
                $item->activo = $row['activo'];
                array_push($items, $item);
            }
            return $items;
        } catch (Exception $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function update($item) {
        try {
            $query = $this->db->connect()->prepare("update tbl_correos set correo=:correo, principal=:principal where id_correo=:idCorreo and id_cliente=:idCliente");
            $query->execute([
                "correo" => $item['correo'],
                "principal" => $item['principal'],
                "idCorreo" => $item['idCorreo'],
                "idCliente" => $item['idCliente']
            ]);
            return true;
        } catch (PDOException $exc) {
            return false;
        }
    }

    public function delete($idCorreo) {
        try {
            $query = $this->db->connect()->prepare("update tbl_correos set activo=0 where  id_correo=:idCorreo");
            $query->execute(["idCorreo" => $idCorreo]);
            return true;
        } catch (PDOException $exc) {
            return false;
        }
    }

}
