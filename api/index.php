<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

/* $path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

$parts = explode("/", $path);


$resource = $parts[3];

if ($resource != "getAllStudents") {

    http_response_code(404);
    exit;
} */


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

require_once "Controlador/Controlador.php";
require_once "Modelo/Modelo.php";

$model = new Modelo($database);
$controller = new Controlador($model);

$method = $_SERVER["REQUEST_METHOD"];


$user = new UserGateway($database);


$JwtCtrl = new Jwt($_ENV["SECRET_KEY"]);

$auth = new Auth($user, $JwtCtrl);

if ($method == "GET" && isset($_GET['validateToken'])) {
    return $auth->authenticateJWTToken();
    exit;
}



if (!$auth->authenticateJWTToken()) {
    exit;
}


/* $gateway = new StudentGateway($database);

$controller = new StudentController($gateway);



$controller->processRequest($_SERVER['REQUEST_METHOD']); */



$table = $_GET['table'];
if ($method == "GET") {
    $id = $_GET['id'];
    if ($table == "register" && isset($_GET['action'])) {
        $action = $_GET['action'];
        $sql = "select * from $table";
        return $controller->$method($sql);
    } else if ($table == "user" && isset($_GET['action'])) {
        $action = $_GET['action'];
        $sql = "select * from $table";
        return $controller->$method($sql);
    }
    if ($table == 'user') {
        $sql = "select * from $table where username = '$id'";
    } else if ($table == "register") {
        $sql = "select * from $table where idregister = $id";
    }

    return $controller->$method($sql);
} else if ($method == "DELETE") {
    $id = $_GET['id'];

    if ($table == 'user') {
        $sql = "delete from $table where username = '$id'";
    } else if ($table == "register") {
        $sql = "delete from $table where idregister = '$id'";
    }

    $controller->$method($sql);
} else if ($method == "POST") {
    $rawJson = file_get_contents('php://input');
    $array = json_decode($rawJson, true);
    if (isset($array['password_hash'])) {
        $contrasenia_encriptada = password_hash($array['password_hash'], PASSWORD_DEFAULT);
        $array['password_hash'] = $contrasenia_encriptada;
    }

    $controller->$method($table, $array);
} else if ($method == "PUT") {
    $id = $_GET['id'];
    $rawJson = file_get_contents('php://input');
    $array = json_decode($rawJson, true);

    if (isset($array['password_hash'])) {
        $contrasenia_encriptada = password_hash($array['password_hash'], PASSWORD_DEFAULT);
        $array['password_hash'] = $contrasenia_encriptada;
    }
    $controller->$method($table, $id, $array);
}

