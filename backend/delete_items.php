<?php

require_once __DIR__ . "/rest/services/ItemsService.class.php";


$item_id = $_REQUEST["id"];

$items_service = new ItemsService();
$items_service -> delete_item($item_id);
echo json_encode(["message" => "You have delete the patient!"]);