<?php

class LoginModel extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function getUsuario($user, $password) {
        try {
            $query = $this->db->connect()->prepare("select * from tbl_usuario where nombre=:usuario and password=:password");
            $query->execute(["usuario" => $user, "password" => $password]);
            if ($query->fetch()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $exc) {
           echo "Hubo un error interno en la aplicación";
           return false;
        }
    }

}
