<?php

require_once __DIR__ . "/rest/services/ItemsService.class.php";

$item_id = $_REQUEST['id'];

$items_service = new ItemsService();
$item = $items_service -> get_item_by_id($item_id);

header('Content-Type: application/json');
echo json_encode($item);