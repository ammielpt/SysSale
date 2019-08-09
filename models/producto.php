<?php

class login extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function getUsuario($user, $password) {
        $item = new Alumno();
        try {
            $query = $this->db->connect()->prepare("select * from usuario where nombre=:usuario and password=:password");
            $query->execute(["usuario" => $user, "password" => $password]);
            return true;
        } catch (Exception $exc) {
            return null;
        }
    }

}
