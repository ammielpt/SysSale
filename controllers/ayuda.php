<?php

require '../vendor/autoload.php';

$app = new Slim\App([
    'settings' => [
        'displayErrorDetails' => true,
        'debug' => true,
        'whoops.editor' => 'sublime',
    ]
        ]);
$app->get('/hello/{nombre}', function ($request, $response, $args) {
    return $response->getBody()->write("Hello, " . $args['nombre']);
})->setName("Hola");

$app->get('/prueba/{nombre}/{apellido}', function ($request, $response, $args) {
    return $response->getBody()->write("Hello, " . $args['nombre'] . $args['apellido']);
});

//Optional second paremeter
//$app->get('/prueba/{nombre}[/{apellido}]', function ($request, $response, $args) {
//    return $response->getBody()->write("Hello, " . $args['nombre'] . $args['apellido']);
//});

$app->get('/regex/{param:[a-zA-Z]}', function ($request, $response, $args) {
    return $response->getBody()->write("Hello, " . $args['param']);
});

$slimadd = function ($request, $response, $next) {
    $response->getBody()->write('BEFORE');
    $response = $next($request, $response);
    $response->getBody()->write('AFTER');
    return $response;
};

$app->get('/prueba2/{nombre}', function ($request, $response, $args) {
    return $response->getBody()->write(' Hello ' . $args['nombre']);
})->add($slimadd);

$app->group('/utils', function () use ($app) {
    $app->get('/date', function ($request, $response) use($app) {
        $url = $this->router->pathFor('home');
        return $response->withRedirect($url);
//        return $response->getBody()->write(date('Y-m-d H:i:s'));
    });
    $app->get('/time', function ($request, $response) {
        return $response->getBody()->write(time());
    });
})->add(function ($request, $response, $next) {
    $response->getBody()->write('It is now ');
    $response = $next($request, $response);
    $response->getBody()->write('. Enjoy!');
    return $response;
});

$app->get('/redirecttest', function ($request, $response, $args) {
    $url = $this->router->pathFor('home');
    $response->write("<a href='$url'>Home</a>");
    return $response;
})->setName('home');

$app->run();
