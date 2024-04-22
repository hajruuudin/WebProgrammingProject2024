<?php

require_once __DIR__ . "/rest/services/ItemsService.class.php";

$payload = $_REQUEST;

$items_service = new ItemsService();
$item = $items_service -> edit_item($payload);

echo json_encode(["message" => "Item edited successfully!", 'data' => $item]);