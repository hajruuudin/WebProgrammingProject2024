<?php

require_once __DIR__ . "/rest/services/ItemsService.class.php";

$items_service = new ItemsService();
$items = $items_service -> get_items();

header('Content-Type: application/json');
echo json_encode($items);
