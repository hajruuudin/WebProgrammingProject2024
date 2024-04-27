<?php

require_once __DIR__ . "/rest/services/OutfitsService.class.php";

$payload = $_REQUEST;

$outfits_service = new OutfitsService();
$outfit = $outfits_service -> edit_outfit($payload);

echo json_encode(["message" => "Item edited successfully!", 'data' => $outfit]);