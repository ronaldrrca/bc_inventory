<?php

class Conexion{
  private $host="localhost";
  private $usuario="root";
  private $contrasena="";//pass del usuario en la base de datos real = RHZ!PE*ca_ip
  private $bd="bc_inventory";

  public function conectarse(){

	$conexion = new mysqli($this->host, $this->usuario, $this->contrasena, $this->bd);
	$conexion->set_charset("utf8");

    //Condicional para arrojar un error en caso que falle la conexión
          	if (!$conexion)
          	{

          	    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
          	    echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
          	    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
          	    exit;

          		}else{

          					//Se retorna la conexión cuando esta se logra
          					return $conexion;
                             

          }
}//Fin de la función conexion
}//Fin de la clase Conectarse


 ?>