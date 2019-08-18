
<?php
include_once 'models/producto.php';
include_once 'models/productocategoria.php';
include_once 'models/productonominacion.php';
include_once 'models/documentoproducto.php';
class ProductoModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function insertarProducto($datos)
    {
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

    public function getAllProductos($rows, $off)
    {
        $items = [];
        try {
            $query = $this->db->connect()->query("select * from tbl_productos  where activo=1 order by nombre limit $rows offset $off");
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

    public function getAllProductosReportExcel()
    {
        $items = [];
        try {
            $query = $this->db->connect()->query("select tp.*, tc.nombre_categoria, tn.nombre_nominacion from tbl_productos tp 
            left join tbl_categoria tc on tp.id_categoria= tc.id_categoria left join tbl_nominacion tn on tp.id_nominacion=tn.id_nominacion where tp.activo=1");
            while ($row = $query->fetch()) {
                $item = new Productos();
                $item->idProducto = $row['id_producto'];
                $item->nombre = $row['nombre'];
                $item->precio = $row['precio'];
                $item->categoria = $row['nombre_categoria'];
                $item->peso = $row['peso'];
                $item->fechaAlta = $row['fecha_alta'];
                $item->stock = $row['stock'];
                $item->nominacion = $row['nombre_nominacion'];
                array_push($items, $item);
            }
            return $items;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function countProductos()
    {
        $numeroProductos = 0;
        try {
            $query = $this->db->connect()->query("select count(*) as cantidad_productos from tbl_productos where activo=1");
            while ($row = $query->fetch()) {
                $numeroProductos = $row['cantidad_productos'];
            }
            return $numeroProductos;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getById($idProducto)
    {
        $item = new Productos();
        try {
            $query = $this->db->connect()->prepare("select * from tbl_productos where id_producto=:idProducto and activo=1");
            $query->execute(["idProducto" => $idProducto]);
            while ($row = $query->fetch()) {
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
        } catch (Exception $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function update($item)
    {
        try {
            $query = $this->db->connect()->prepare("update tbl_productos set nombre=:nombre, precio=:precio, id_categoria=:idCategoria, peso=:peso, fecha_alta=:fechaAlta, stock=:stock, id_nominacion=:idNominacion where id_producto=:idProducto");
            $query->execute([
                "nombre" => $item['nombre'],
                "precio" => $item['precio'],
                "idCategoria" => $item['idCategoria'],
                "peso" => $item['peso'],
                "fechaAlta" => $item['fechaAlta'],
                "stock" => $item['stock'],
                "idNominacion" => $item['idNominacion'],
                "idProducto" => $item['idProducto']
            ]);
            return true;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function delete($idProducto)
    {
        try {
            $query = $this->db->connect()->prepare("update tbl_productos set activo=0  where  id_producto=:idProducto");
            $query->execute(["idProducto" => $idProducto]);
            return true;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getDocumentos($idProducto)
    {
        $items = [];
        try {
            $query = $this->db->connect()->prepare("select * from tbl_documento_producto  where id_producto=:idProducto and  activo=1");
            $query->execute(["idProducto" => $idProducto]);
            while ($row = $query->fetch()) {
                $item = new DocumentoProducto();
                $item->idDocumento = $row['id_documento'];
                $item->idCliente = $row['id_producto'];
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
    public function crearDocumentoProducto($datos)
    {
        $item = new DocumentoProducto();
        try {
            $query = $this->db->connect()->prepare("insert into tbl_documento_producto(id_producto, nombre, size, url, descripcion) values(:idProducto,:nombre,:size,:url,:descripcion)");
            $query->execute([
                'idProducto' => $datos['idProducto'],
                'nombre' => $datos['nombre'],
                'size' => $datos['size'],
                'url' => $datos['url'],
                'descripcion' => $datos['descripcion']
            ]);
            $item->idProducto = $datos['idProducto'];
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
    public function getCategorias()
    {
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

    public function getNominaciones()
    {
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
