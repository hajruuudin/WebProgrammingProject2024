<?php

require_once __DIR__ . "/rest/services/OutfitsService.class.php";

$outfit_id = $_REQUEST['id'];

$outfits_service = new OutfitsService();
$outfit = $outfits_service -> get_outfit_by_id($outfit_id);

header('Content-Type: application/json');
echo json_encode($outfit);