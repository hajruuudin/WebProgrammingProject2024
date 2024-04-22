<?php

require_once __DIR__ . "/rest/services/OutfitsService.class.php";

if ($_SERVER["REQUEST_METHOD"] === "POST"){
    $payload = array();

    $payload['name'] = $_POST['name'];
    $payload['description'] = $_POST['description'];
    $payload['outfit_categoryID'] = $_POST['outfit_categoryID'];
    $payload['weatherID'] = $_POST['weatherID'];
    $payload['rating'] = $_POST['rating'];
    $payload['date_added'] = $_POST['date_added'];

    // Handling the image upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $targetDir = "../assets/img/outfits/";
        $targetFilePath = $targetDir . basename($_FILES['image']['name']);
        $targetDirDB = "assets/img/outfits/";
        $targetFilePathDB = $targetDirDB . basename($_FILES['image']['name']);

        try {
            $image = imagecreatefromstring(file_get_contents($_FILES['image']['tmp_name']));
            if (!$image) {
                throw new Exception("Failed to create image from file.");
            }

            $exif = exif_read_data($_FILES['image']['tmp_name']);

            if (!empty($exif['Orientation'])) {
                $orientation = $exif['Orientation'];
                switch ($orientation) {
                    case 3: // 180 degrees
                        $image = imagerotate($image, 180, 0);
                        break;
                    case 6: // 90 degrees clockwise
                        $image = imagerotate($image, -90, 0);
                        break;
                    case 8: // 90 degrees counterclockwise
                        $image = imagerotate($image, 90, 0);
                        break;
                }
            }
        
            $resizedImage = imagescale($image, 800, -1);
            if (!$resizedImage) {
                throw new Exception("Failed to resize image.");
            }
        
            if (!imagejpeg($resizedImage, $targetFilePath, 80)) {
                throw new Exception("Failed to save JPEG image.");
            }
        
            $payload['img_dir'] = $targetFilePathDB;

            imagedestroy($image);
            imagedestroy($resizedImage);
        } catch (Exception $e) {
            // Handle the exception
            echo json_encode(["error" => "Failed to move uploaded file."]);
            echo $e->getMessage();
            exit;
        }
    }

    // Creating te outfit service to add the payload to the table
    $outfits_service = new OutfitsService();
    $outfit = $outfits_service -> add_outfit($payload);
    
    echo json_encode(["message" => "You have made the request horray",
                    'data' => $outfit]);
} else {
    echo json_encode(["error" => "Only POST requests are allowed"]);
}
