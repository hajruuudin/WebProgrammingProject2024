<?php

require_once __DIR__ . "/rest/services/OutfitsService.class.php";

$outfits_service = new OutfitsService();
$outfits = $outfits_service -> get_outfits();

header('Content-Type: application/json');
echo json_encode($outfits);