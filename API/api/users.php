<?php

include('headers.php');
include('../db/users-class.php');

$db = new SQLite3('../db/store.db');
$users = new Users($db);

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        http_response_code(200);
        $all_users = $users->read(json_decode(file_get_contents("php://input"),true));
        echo json_encode((object) $all_users);
        break;

    case 'POST':

        break;

    case 'PUT':

        break;

    case 'DELETE':

        break;

    default:
        break;
}