<?php
//Se invoca el archivo que contiene la clase que permite la conexión a la BD
require_once('conexion.php');

class Inventario{
  //Función que realiza la consulta a la BD
    public function listarObjetos(){
        $objConexion = new Conexion();
        $conexion = $objConexion -> conectarse();
        $listar = $conexion->query("call listar()");

        return $listar;
    }
}

 ?>
