<?php
//Se requiere el archivo que contiene la clase usuarios, con la ruta para llamarlo desde la vista
require_once('listarObjetosModelo.php');

$objInventario=new Inventario;
$listar=$objInventario->listarObjetos();
$myArray = array();

//Recibimos la respuesta y la almacenamos en un array
while ($elemento = $listar->fetch_assoc()) {
array_push($myArray, $elemento);
}

//Imprimimos el array en formato JSON
print_r(json_encode($myArray));

?>
