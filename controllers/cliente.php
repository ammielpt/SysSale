<?php
require "vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Helper\Sample;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use Dompdf\Dompdf;

require_once 'vendor/phpoffice/phpspreadsheet/src/Bootstrap.php';

class Cliente extends Controller
{

    function __construct()
    {
        parent::__construct();
    }

    public function testRest($request, $response, $args)
    {
        return 'Home';
    }

    function crearCliente()
    {
        $razonSocial = $_POST['razonSocial'];
        $ruc = $_POST['ruc'];
        $direccion = $_POST['direccion'];
        $fechaNacimiento = $_POST['fechaNacimiento'];
        $mensaje = "";
        $cliente = $this->model->insertarCliente(["razonSocial" => $razonSocial, "ruc" => $ruc, "direccion" => $direccion, "fechaNacimiento" => $fechaNacimiento]);
        if ($cliente) {
            $mensaje = "Nuevo cliente  creado";
            $data = ["data" => $cliente, "mensaje" => $mensaje, "success" => true];
        } else {
            $mensaje = "Error interno en el servidor";
            $data = ["data" => [], "mensaje" => $mensaje, "success" => false];
        }
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function listarClientes()
    {
        $rows = $_GET['limit'];
        $off = $_GET['start'];
        $clientes = $this->model->getAllClientes($rows, $off);
        $cantidadClientes = $this->model->countClientes();
        $data = ["data" => $clientes, "numFilas" => $cantidadClientes, "success" => true];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function generarReportePDFCliente($params = null)
    {
        $idCliente = $params[0];
        $cliente = $this->model->getById($idCliente);
        $telefonos = $this->model->getPhoneById($idCliente);
        $correos = $this->model->getEmailById($idCliente);
        // generate some PDFs!
        $dompdf = new DOMPDF();  //if you use namespaces you may use new \DOMPDF()
        $html = '<html>';
        $html .= '<style>';
        $html .= '<style>
                        #customers {
                            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                          }
                          #customers td, #customers th {
                            border: 1px solid #ddd;                          
                            padding: 8px;
                          }
                          #customers tr:nth-child(even){background-color: #f2f2f2;}
                          #customers tr:hover {background-color: #ddd;}
                          #customers th {
                            padding-top: 12px;
                            padding-bottom: 12px;
                            text-align: left;
                            background-color: #238AF7;
                            color: white;
                          }
                          </style>';
        $html .= '<body>';
        $html .= '<div><span>Razon Social:' . $cliente->razonSocial . '</span>';
        $html .= '<span>Ruc:' . $cliente->ruc . '</span></div>';
        $html .= '<div><span>Direccion:' . $cliente->direccion . '</span>';
        $html .= '<span>Fecha de Nacimiento:' . $cliente->fechaNacimiento . '</span></div>';
        $html .= '<table id="customers">';
        $html .= '<tr>';
        $html .= '<th>Numero de Telefono</th>';
        $html .= ' <th>Operador</th>';
        $html .= '</tr>';
        foreach ($telefonos as $key => $value) {
            $html .= '<tr>';
            $html .= ' <td>' . $value->numeroTelefono . '</td>';
            $html .= ' <td>' . $value->nombreOperador . '</td>';
            $html .= '</tr>';
        }
        $html .= '</table>';
        $html .= '<table id="customers">';
        $html .= '<tr>';
        $html .= '<th>Correo</th>';
        $html .= ' <th>Principal?</th>';
        $html .= '</tr>';
        foreach ($correos as $key => $value) {
            $html .= '<tr>';
            $html .= ' <td>' . $value->correo . '</td>';
            if ($value->principal)
                $html .= '<td>Si</td>';
            else
                $html .= '<td>No</td>';
            $html .= '</tr>';
        }
        $html .= '</table>';
        $html .= '</body>';
        $html .= '</html>';
        $dompdf->loadHtml($html);
        $dompdf->render();
        $dompdf->stream("sample.pdf", array("Attachment" => 0));
    }

    function uploadFileCliente()
    {
        $idCliente = $_POST['idCliente'];
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

    function listarDocumentosCliente()
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

    function actualizarCliente()
    {
        $flag = false;
        $idCliente = $_POST['idCliente'];
        $razonSocial = $_POST['razonSocial'];
        $ruc = $_POST['ruc'];
        $direccion = $_POST['direccion'];
        $fechaNacimiento = $_POST['fechaNacimiento'];
        if ($this->model->update(['idCliente' => $idCliente, 'razonSocial' => $razonSocial, 'ruc' => $ruc, 'direccion' => $direccion, 'fechaNacimiento' => $fechaNacimiento])) {
            $mensaje = "Cliente actualizado correctamente";
            $flag = true;
        } else {
            //Mensaje de error
            $mensaje = "Nose pudo actualizar el cliente";
        }
        $data = ["mensaje" => $mensaje, "success" => $flag];
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function eliminarCliente($param = null)
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

    function reporteClienteExcel()
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
}
