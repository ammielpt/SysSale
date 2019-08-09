<?php

class Errores extends Controller {

    function __construct() {
        parent::__construct();
        $this->view->mensaje = "Hubo un error en la solicitud";
    }

    function render() {
        $this->view->render('error/index');
    }

}
