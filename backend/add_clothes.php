<?php
// add_items.php

require_once __DIR__ . "/rest/services/ItemsService.class.php";

// Ensure the form is submitted via POST method
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Initialize an empty array to store payload data
    $payload = array();

    // Process other form fields
    $payload['name'] = $_POST['name']; // Item Name
    $payload['brand'] = $_POST['brand']; // Item Brand
    $payload['description'] = $_POST['description']; // Item Description
    $payload['item_categoryID'] = $_POST['item_categoryID']; // Item Category
    $payload['size'] = $_POST['size']; // Item Size
    $payload['weatherID'] = $_POST['weatherID']; // Weather Occasion
    $payload['date_added'] = $_POST['date_added']; // Date Added
    $payload['rating'] = $_POST['rating']; // Personal Rating
    

    // Handle file upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $targetDir = "../assets/img/clothes/";
        $targetFilePath = $targetDir . basename($_FILES['image']['name']);
        $targetDirDB = "assets/img/clothes/";
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

    // Instantiate ItemsService and add the item
    $items_service = new ItemsService();
    $item = $items_service->add_item($payload);

    // Return JSON response
    echo json_encode(["message" => "You have made the request successfully", 'data' => $item]);
} else {
    // Handle non-POST requests
    echo json_encode(["error" => "Only POST requests are allowed"]);
}
?>
