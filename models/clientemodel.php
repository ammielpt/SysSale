<?php

include_once 'models/cliente.php';
include_once 'models/telefonomodel.php';
include_once 'models/correomodel.php';
include_once 'models/departamento.php';
include_once 'models/provincia.php';
include_once 'models/distrito.php';
include_once 'models/documentocliente.php';

class ClienteModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function insertarCliente($datos)
    {
        $item = new Clientes();
        try {
            $query = $this->db->connect()->prepare("insert into tbl_clientes(razon_social, ruc, direccion, fecha_nacimiento) values(:razonSocial,:ruc,:direccion,:fechaNacimiento)");
            $query->execute(['razonSocial' => $datos['razonSocial'], 'ruc' => $datos['ruc'], 'direccion' => $datos['direccion'], 'fechaNacimiento' => $datos['fechaNacimiento']]);
            $query1 = $this->db->connect()->query("select * from tbl_clientes where id_cliente=(select max(id_cliente) as id_cliente from tbl_clientes)");
            while ($row = $query1->fetch()) {
                $item->idCliente = $row['id_cliente'];
                $item->razonSocial = $row['razon_social'];
                $item->ruc = $row['ruc'];
                $item->direccion = $row['direccion'];
                $item->fechaNacimiento = $row['fecha_nacimiento'];
            }
            return $item;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getAllClientes($rows, $off)
    {
        $items = [];
        try {
            $query = $this->db->connect()->query("select * from tbl_clientes where activo=1 order by razon_social limit $rows offset $off");
            while ($row = $query->fetch()) {
                $item = new Clientes();
                $item->idCliente = $row['id_cliente'];
                $item->razonSocial = $row['razon_social'];
                $item->ruc = $row['ruc'];
                $item->direccion = $row['direccion'];
                $item->fechaNacimiento = $row['fecha_nacimiento'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getAllClientesReportExcel()
    {
        $items = [];
        try {
            $query = $this->db->connect()->query("select * from tbl_clientes where activo=1 order by razon_social");
            while ($row = $query->fetch()) {
                $item = new Clientes();
                $item->razonSocial = $row['razon_social'];
                $item->ruc = $row['ruc'];
                $item->direccion = $row['direccion'];
                $item->fechaNacimiento = $row['fecha_nacimiento'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function countClientes()
    {
        $numeroClientes = 0;
        try {
            $query = $this->db->connect()->query("select count(*) as cantidad_clientes from tbl_clientes where activo=1");
            while ($row = $query->fetch()) {
                $numeroClientes = $row['cantidad_clientes'];
            }
            return $numeroClientes;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getById($idCliente)
    {
        $item = new Clientes();
        try {
            $query = $this->db->connect()->prepare("select * from tbl_clientes where id_cliente=:idCliente and activo=1");
            $query->execute(["idCliente" => $idCliente]);
            while ($row = $query->fetch()) {
                $item->idCliente = $row['id_cliente'];
                $item->razonSocial = $row['razon_social'];
                $item->ruc = $row['ruc'];
                $item->direccion = $row['direccion'];
                $item->fechaNacimiento = $row['fecha_nacimiento'];
            }
            return $item;
        } catch (Exception $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getPhoneById($idCliente)
    {
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

    public function getEmailById($idCliente)
    {
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

    public function update($item)
    {
        try {
            $query = $this->db->connect()->prepare("update tbl_clientes set razon_social=:razonSocial, ruc=:ruc, direccion=:direccion, fecha_nacimiento=:fechaNacimiento where id_cliente=:idCliente");
            $query->execute([
                "razonSocial" => $item['razonSocial'],
                "ruc" => $item['ruc'],
                "direccion" => $item['direccion'],
                "fechaNacimiento" => $item['fechaNacimiento'],
                "idCliente" => $item['idCliente']
            ]);
            return true;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function delete($idCliente)
    {
        try {
            $query = $this->db->connect()->prepare("update tbl_clientes set activo=0 where id_cliente=:idCliente");
            $query->execute(["idCliente" => $idCliente]);
            return true;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function crearDocumentoCliente($datos)
    {
        $item = new DocumentoCliente();
        try {
            $query = $this->db->connect()->prepare("insert into tbl_documento_cliente(id_cliente, nombre, size, url, descripcion) values(:idCliente,:nombre,:size,:url,:descripcion)");
            $query->execute([
                'idCliente' => $datos['idCliente'],
                'nombre' => $datos['nombre'],
                'size' => $datos['size'],
                'url' => $datos['url'],
                'descripcion' => $datos['descripcion']
            ]);
            $item->idCliente = $datos['idCliente'];
            $item->nombre = $datos['nombre'];
            $item->size = $datos['size'];
            $item->url = $datos['url'];
            $item->descripcion = $datos['descripcion'];
            return $item;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getDocumentos($idCliente)
    {
        $items = [];
        try {
            $query = $this->db->connect()->prepare("select * from tbl_documento_cliente  where id_cliente=:idCliente and  activo=1");
            $query->execute(["idCliente" => $idCliente]);
            while ($row = $query->fetch()) {
                $item = new DocumentoCliente();
                $item->idDocumento = $row['id_documento'];
                $item->idCliente = $row['id_cliente'];
                $item->nombre = $row['nombre'];
                $item->size = $row['size'];
                $item->url = $row['url'];
                $item->descripcion = $row['descripcion'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getDepartamentos()
    {
        $items = [];
        try {
            $query = $this->db->connect()->query("select * from tbl_departamento");
            while ($row = $query->fetch()) {
                $item = new Departamento();
                $item->idDepartamento = $row['idDepa'];
                $item->departamento = $row['departamento'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getProvinciaById($idDepartamento)
    {
        $items = [];
        try {
            $query = $this->db->connect()->prepare("select * from tbl_provincia where idDepa=:idDepartamento");
            $query->execute(["idDepartamento" => $idDepartamento]);
            while ($row = $query->fetch()) {
                $item = new Provincia();
                $item->idProvincia = $row['idProv'];
                $item->provincia = $row['provincia'];
                $item->idDepartamento = $row['idDepa'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getDistritoById($idProvincia)
    {
        $items = [];
        try {
            $query = $this->db->connect()->prepare("select * from tbl_distrito where idProv=:idProvincia");
            $query->execute(["idProvincia" => $idProvincia]);
            while ($row = $query->fetch()) {
                $item = new Distrito();
                $item->idDistrito = $row['idDist'];
                $item->distrito = $row['distrito'];
                $item->idProvincia = $row['idProv'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }
}
