
<?php
include_once 'models/producto.php';
include_once 'models/productocategoria.php';
include_once 'models/productonominacion.php';
class ProductoModel extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function insertarProducto($datos) {
        $item = new Productos();
        try {
            $query = $this->db->connect()->prepare("insert into tbl_productos(nombre, precio, id_categoria, peso, fecha_alta, stock, id_nominacion) values(:nombre,:precio,:idCategoria,:peso,:fechaAlta,:stock,:idNominacion)");
            $query->execute([
                'nombre' => $datos['nombre'],
                'precio' => $datos['precio'],
                'idCategoria' => $datos['idCategoria'],
                'peso' => $datos['peso'],
                'fechaAlta' => $datos['fechaAlta'],
                'stock' => $datos['stock'],
                'idNominacion' => $datos['idNominacion']
            ]);
            $query1 = $this->db->connect()->query("select * from tbl_productos where id_producto=(select max(id_producto) as id_producto from tbl_productos)");
            while ($row = $query1->fetch()) {
                $item->idProducto = $row['id_producto'];
                $item->nombre = $row['nombre'];
                $item->precio = $row['precio'];
                $item->idCategoria = $row['id_categoria'];
                $item->peso = $row['peso'];
                $item->fechaAlta = $row['fecha_alta'];
                $item->stock = $row['stock'];
                $item->idNominacion = $row['id_nominacion'];
            }
            return $item;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getAllProductos($rows, $off) {
        $items = [];
        try {
            $query = $this->db->connect()->query("select * from tbl_productos order by nombre limit $rows offset $off");
            while ($row = $query->fetch()) {
                $item = new Productos();
                $item->idProducto = $row['id_producto'];
                $item->nombre = $row['nombre'];
                $item->precio = $row['precio'];
                $item->idCategoria = $row['id_categoria'];
                $item->peso = $row['peso'];
                $item->fechaAlta = $row['fecha_alta'];
                $item->stock = $row['stock'];
                $item->idNominacion = $row['id_nominacion'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getAllProductosReportExcel() {
        $items = [];
        try {
            $query = $this->db->connect()->query("select * from tbl_clientes order by razon_social");
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

    public function countProductos() {
        $numeroProductos = 0;
        try {
            $query = $this->db->connect()->query("select count(*) as cantidad_productos from tbl_productos");
            while ($row = $query->fetch()) {
                $numeroProductos = $row['cantidad_productos'];
            }
            return $numeroProductos;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getById($idCliente) {
        $item = new Clientes();
        try {
            $query = $this->db->connect()->prepare("select * from tbl_clientes where id_cliente=:idCliente");
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

    public function update($item) {
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

    public function delete($idCliente) {
        try {
            $query = $this->db->connect()->prepare("delete from tbl_clientes where  id_cliente=:idCliente");
            $query->execute(["idCliente" => $idCliente]);
            return true;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getDocumentos($idCliente) {
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
    
    public function getCategorias(){
        $items = [];
        try {
            $query = $this->db->connect()->query("select * from tbl_categoria");                   
            while ($row = $query->fetch()) {
                $item = new ProductoCategoria();
                $item->idCategoria = $row['id_categoria'];
                $item->nombreCategoria = $row['nombre_categoria'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getNominaciones(){
        $items = [];
        try {
            $query = $this->db->connect()->query("select * from tbl_nominacion");                   
            while ($row = $query->fetch()) {
                $item = new ProductoNominacion();
                $item->idNominacion = $row['id_nominacion'];
                $item->nombreNominacion = $row['nombre_nominacion'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

}
