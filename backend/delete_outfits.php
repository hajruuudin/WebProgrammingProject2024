<?php

require_once __DIR__ . "/rest/services/OutfitsService.class.php";


$outfit_id = $_REQUEST["id"];

$outfits_service = new OutfitsService();
$outfits_service -> delete_outfit($outfit_id);
echo json_encode(["message" => "You have delete the outfit!"]);