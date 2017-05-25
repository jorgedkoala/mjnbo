<?php 
header('Access-Control-Allow-Origin: *');  
include("../config/conexion.php");
require_once('../jwt/jwt2.php');
use \Firebase\JWT\JWT;
$key = "tfcconsultinggroup";
$user = $_GET["user"];
$password = $_GET["password"];
//$token = strrev( str_replace(".","",$_SERVER['SERVER_ADDR']) );
$sql = "select * from usuarios where usuario = '" . $user . "' and password = '" . $password . "'";
$registros=mysql_query($sql , $conexion) or die("{'success':false,'error':".mysql_error()."}");
//echo $sql;
$numero_filas = mysql_num_rows($registros);
while ($reg=mysql_fetch_array($registros))
{	
$rows[] = $reg;
$role = $reg["id"];
$user = $reg["tipouser"];
}

if($numero_filas){
$issuedat= time();
$expire = $issuedat + 36000;
$token = array(
    "iss" => "http://tfc.com", //IDENTIFICADOR DE DOMINIO
    "aud" => "http://tfc.com", //
    "iat" => $issuedat,//1356999524, // Issued at: time when the token was generated
  //  "nbf" => $notbefore,
    "exp" => $expire,
    "rol"=> $role, // Not before
    "jti"=> $user
);
$jwt = JWT::encode($token, $key);

$result = '{"success":"true","token":"' .$jwt . '" ,"data":' .json_encode($rows) .'}';
}
else {
$result = '{"success":"false"}';
}
print json_encode($result);

?>