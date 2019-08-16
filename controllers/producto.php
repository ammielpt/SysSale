<?php
require "vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Helper\Sample;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use Dompdf\Dompdf;

require_once 'vendor/phpoffice/phpspreadsheet/src/Bootstrap.php';

class Producto extends Controller
{

    function __construct()
    {
        parent::__construct();
    }

    function crearProducto()
    {
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $idCategoria = $_POST['idCategoria'];
        $peso = $_POST['peso'];
        $fechaAlta = $_POST['fechaAlta'];
        $stock = $_POST['stock'];
        $idNominacion = $_POST['idNominacion'];
        $mensaje = "";
        $date1 = new DateTime($fechaAlta);
        $year = $date1->format('Y');
        $mes = $date1->format('m');
        $dia = $date1->format('d');
        $date = new DateTime();
        $date->setDate($year, $mes, $dia);
        $date->setTimezone(new DateTimeZone('America/Lima'));
        $fechaAlta = $date->format('Y-m-d H:i:s');
        $producto = $this->model->insertarProducto([
            "nombre" => $nombre,
            "precio" => $precio,
            "idCategoria" => $idCategoria,
            "peso" => $peso,
            "fechaAlta" => $fechaAlta,
            "stock" => $stock,
            "idNominacion" => $idNominacion
        ]);
        if ($producto) {
            $mensaje = "Se creó el producto";
            $data = ["data" => $producto, "mensaje" => $mensaje, "success" => true];
        } else {
            $mensaje = "Error interno en el servidor";
            $data = ["data" => [], "mensaje" => $mensaje, "success" => false];
        }
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function listarProductos()
    {
        $rows = $_GET['limit'];
        $off = $_GET['start'];
        $productos = $this->model->getAllProductos($rows, $off);
        $cantidadProductos = $this->model->countProductos();
        $data = ["data" => $productos, "numFilas" => $cantidadProductos, "success" => true];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function uploadFileProducto()
    {
        $idCliente = $_POST['idProducto'];
        $descripcion = $_POST['descripcion'];
        if (isset($_FILES['file'])) {
            $phpFileUploadErrors = array(
                0 => 'There is no error, the file uploaded with success',
                1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
                2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
                3 => 'The uploaded file was only partially uploaded',
                4 => 'No file was uploaded',
                6 => 'Missing a temporary folder',
                7 => 'Failed to write file to disk.',
                8 => 'A PHP extension stopped the file upload.',
            );
            $ext_error = false;
            $mensaje = "";
            $flag = false;
            // a list of extensions that we allow to be upload
            $extensiones = array('jpg', 'jpeg', 'gif', 'png', 'pdf', 'docx', 'xls', 'doc', 'xlsx');
            $file_ext = explode(".", $_FILES['file']['name']);
            $file_ext = end($file_ext);
            if (!in_array($file_ext, $extensiones)) {
                $ext_error = true;
            }
            // if the error of the upload is not equal to 0
            if ($_FILES['file']['error']) {
                $mensaje = $phpFileUploadErrors[$_FILES['file']['error']];
            } elseif ($ext_error) {
                $mensaje = "Extensión invalida de archivo, intente nuevamente";
            } else {
                $nombreArchivo = $_FILES['file']['name'];
                $sizeArchivo = $_FILES['file']['size'];
                $urlArchivo = "resources/files/" . $_FILES['file']['name'];
                $documento = $this->model->crearDocumentoCliente(['idCliente' => $idCliente, 'nombre' => $nombreArchivo, 'size' => $sizeArchivo, 'descripcion' => $descripcion, 'url' => $urlArchivo]);
                if ($documento) {
                    move_uploaded_file($_FILES['file']['tmp_name'], $urlArchivo);
                    $flag = true;
                    $mensaje = "El archivo fue subido correctamente¡¡";
                } else {
                    $mensaje = "Error interno del sistema contactar con el adminstrador";
                }
            }
            if ($flag) {
                $data = ["data" => $documento, "mensaje" => $mensaje, "success" => $flag];
            } else {
                $data = ["data" => [], "mensaje" => $mensaje, "success" => $flag];
            }
            header('Content-Type: application/json');
            echo json_encode($data);
        }
    }

    function listarDocumentosProducto()
    {
        $idCliente = $_GET['idCliente'];
        $documentos = $this->model->getDocumentos($idCliente);
        if ($documentos) {
            $data = ["data" => $documentos, "success" => true];
        } else {
            $data = ["data" => [], "success" => false];
        }
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function actualizarProducto()
    {
        $flag = false;
        $idProducto = $_POST['idProducto'];
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $idCategoria = $_POST['idCategoria'];
        $peso = $_POST['peso'];
        $fechaAlta = $_POST['fechaAlta'];
        $stock = $_POST['stock'];
        $idNominacion = $_POST['idNominacion'];
        $mensaje = "";
        $date1 = new DateTime($fechaAlta);
        $year = $date1->format('Y');
        $mes = $date1->format('m');
        $dia = $date1->format('d');
        $date = new DateTime();
        $date->setDate($year, $mes, $dia);
        $date->setTimezone(new DateTimeZone('America/Lima'));
        $fechaAlta = $date->format('Y-m-d H:i:s');
        if ($this->model->update([
            'idProducto' => $idProducto,
            'nombre' => $nombre,
            'precio' => $precio,
            'idCategoria' => $idCategoria,
            'peso' => $peso,
            'fechaAlta' => $fechaAlta,
            'stock' => $stock,
            'idNominacion' => $idNominacion
        ])) {
            $mensaje = "Producto actualizado correctamente";
            $flag = true;
        } else {
            //Mensaje de error
            $mensaje = "Nose pudo actualizar el producto";
        }
        $data = ["mensaje" => $mensaje, "success" => $flag];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function eliminarProducto($param = null)
    {
        $idCliente = $param[0];
        $flag = false;
        if ($this->model->delete($idCliente)) {
            $mensaje = "Cliente eliminado correctamente";
            $flag = true;
        } else {
            $mensaje = "Nose pudo eliminar el cliente";
        }
        $data = ["mensaje" => $mensaje, "success" => $flag];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function reporteProductoExcel()
    {
        $clientes = $this->model->getAllClientesReportExcel();
        $helper = new Sample();
        if ($helper->isCli()) {
            $helper->log('This example should only be run from a Web Browser' . PHP_EOL);
            return;
        }
        // Create new Spreadsheet object
        $spreadsheet = new Spreadsheet();
        // Set document properties
        $spreadsheet->getProperties()->setCreator('Maarten Balliauw')
            ->setLastModifiedBy('Maarten Balliauw')
            ->setTitle('Office 2007 XLSX Test Document')
            ->setSubject('Office 2007 XLSX Test Document')
            ->setDescription('Test document for Office 2007 XLSX, generated using PHP classes.')
            ->setKeywords('office 2007 openxml php')
            ->setCategory('Test result file');
        // Add some data
        $spreadsheet->setActiveSheetIndex(0);
        $contador = 4;
        foreach ($clientes as $key => $value) {
            $spreadsheet->getActiveSheet()
                ->setCellValue('B' . $contador, $value->razonSocial)
                ->setCellValue('C' . $contador, $value->ruc)
                ->setCellValue('D' . $contador, $value->direccion)
                ->setCellValue('E' . $contador, $value->fechaNacimiento);
            $contador++;
        }
        // Width columns
        $spreadsheet->getActiveSheet()->getColumnDimension('B')->setWidth(40);
        $spreadsheet->getActiveSheet()->getColumnDimension('C')->setWidth(25);
        $spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(40);
        $spreadsheet->getActiveSheet()->getColumnDimension('E')->setWidth(25);

        // make table headers
        $spreadsheet->getActiveSheet()->setCellValue("B3", "Razon Social");
        $spreadsheet->getActiveSheet()->setCellValue("C3", "Ruc");
        $spreadsheet->getActiveSheet()->setCellValue("D3", "Direccion");
        $spreadsheet->getActiveSheet()->setCellValue("E3", "Fecha de Nacimiento");
        //make table headers colors
        $spreadsheet->getActiveSheet()->getStyle('B3:E3')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_RED);
        $spreadsheet->getActiveSheet()->getStyle('B3:E3')->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);

        // Rename worksheet
        $spreadsheet->getActiveSheet()->setTitle('Reporte de clientes');
        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $spreadsheet->setActiveSheetIndex(0);
        // Redirect output to a client’s web browser (Xls)
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="Reporte Clientes.xls"');
        header('Cache-Control: max-age=0');
        // If you're serving to IE 9, then the following may be needed
        header('Cache-Control: max-age=1');

        // If you're serving to IE over SSL, then the following may be needed
        header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT'); // always modified
        header('Cache-Control: cache, must-revalidate'); // HTTP/1.1
        header('Pragma: public'); // HTTP/1.0

        $writer = IOFactory::createWriter($spreadsheet, 'Xls');
        $writer->save('php://output');
        exit;
    }

    public function listarCategorias()
    {
        $categorias = $this->model->getCategorias();
        if ($categorias) {
            $data = ["data" => $categorias, "success" => true];
        } else {
            $data = ["data" => [], "success" => false];
        }
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function listarNominaciones()
    {
        $nominaciones = $this->model->getNominaciones();
        if ($nominaciones) {
            $data = ["data" => $nominaciones, "success" => true];
        } else {
            $data = ["data" => [], "success" => false];
        }
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
