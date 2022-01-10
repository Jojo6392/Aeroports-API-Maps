<?php

include('headers.php');
include('../db/airports-class.php');

$db = new SQLite3('../db/store.db');
$airports = new Airports($db);

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        http_response_code(200);
        $all_airports = $airports->read();
        echo json_encode((object) $all_airports);

        break;

    case 'POST':

        $create_airport = $airports->create(json_decode(file_get_contents("php://input"),true));
        http_response_code(200);
        echo json_encode((object) $create_airport, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;

    case 'PUT':

        $update_airport = $airports->update(json_decode(file_get_contents("php://input"),true));
        http_response_code(200);
        echo json_encode((object) $update_airport, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;

    case 'DELETE':

        $delete_airport = $airports->delete(json_decode(file_get_contents("php://input"),true));
        http_response_code(200);
        echo json_encode((object) $delete_airport, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;

    default:
        break;
}