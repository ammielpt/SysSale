<?php

require_once '../config/config.php';
require '../vendor/autoload.php';
require '../libs/database.php';
include_once '../models/cliente.php';

$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true,
        'debug' => true,
        'whoops.editor' => 'sublime']
        ]);
$app->get('/hello/{skip}/{page}', function($request, $response, $args) {
    $db = new Database();
    $rows = $request->getAttribute('skip');
    $off = $request->getAttribute('page');
    $items = [];
    $query = $db->connect()->query("select * from tbl_clientes order by razon_social limit $rows offset $off");
    while ($row = $query->fetch()) {
        $item = new Clientes();
        $item->idCliente = $row['id_cliente'];
        $item->razonSocial = $row['razon_social'];
        $item->ruc = $row['ruc'];
        $item->direccion = $row['direccion'];
        $item->fechaNacimiento = $row['fecha_nacimiento'];
        array_push($items, $item);
    }
    return $response->withJson([
                'data' => $items,
                'status' => 200
    ]);
});

$app->post('/hello/registerphone', function($request, $response, $args) {
    $datos = $request->getParsedBody();
    $db = new Database();
    try {
        $query = $db->connect()->prepare("insert into tbl_telefonos(id_operador, numero_telefono, id_cliente) values(:idOperador,:numeroTelefono,:idCliente)");
        $query->execute(['idOperador' => $datos['idOperador'], 'numeroTelefono' => $datos['numeroTelefono'], 'idCliente' => $datos['idCliente']]);
        return $response->withJson([
                    'message' => "Se logró insertar",
                    'status' => 200
        ]);
    } catch (PDOException $exc) {
        $mensaje = $exc->getMessage();
        return $response->withJson([
                    'message' => $mensaje,
                    'status' => 500
        ]);
    }
});

$app->run();
