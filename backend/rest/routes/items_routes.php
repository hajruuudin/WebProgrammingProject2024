<?php

require_once __DIR__ . "/../services/ItemsService.class.php";

Flight::set("items_service", new ItemsService());

Flight::group("/items", function() {

    /* Getting all the items */
    /**
     * @OA\Get(
     *      path="/items/{userId}",
     *      tags={"Items"},
     *      summary="Get all items",
     *      security = {
     *          {"ApiKey" : {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Get all items from the database"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="userId", example="0", description="ID Of the user")
     * )
     */
    Flight::route("GET /@userid", function($userid){
        $items = Flight::get("items_service") -> get_items($userid);
    
        header('Content-Type: application/json');
        Flight::json($items);
    });

    /* Adding an item to the database */
    /**
     * @OA\Post(
     *      path="/items/add",
     *      tags={"Items"},
     *      summary="Add an item to the database",
     *      security = {
     *          {"ApiKey" : {}}
     *      },
     *      @OA\RequestBody(
     *          required=true,
     *          description="Item data",
     *          @OA\MediaType(
     *              mediaType="application/json", 
     *              @OA\Schema(
     *                  @OA\Property(property="img_dir", description="Image directory of the file to upload", type="string", example="assets/img/clothes/1.jpg"),
     *                  @OA\Property(property="name", description="Name of the item", type="string", example="T-Shirt"),
     *                  @OA\Property(property="brand", description="Brand of the item", type="string", example="Nike"),
     *                  @OA\Property(property="description", description="Description of the item", type="string", example="A nice T-Shirt"),
     *                  @OA\Property(property="item_categoryID", description="Category ID of the item", type="integer", example="1"),
     *                  @OA\Property(property="size", description="Size of the item", type="string", example="M"),
     *                  @OA\Property(property="weatherID", description="Weather ID of the item", type="integer", example="1"),
     *                  @OA\Property(property="date_added", description="Date added of the item", type="string", format="date", example="2021-06-01"),
     *                  @OA\Property(property="rating", description="Rating of the item", type="string", example="5")
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Add an item of clothing to the database, along with its data. Throw an error if the data is not properly entered."
     *      )
     * )
     */

    Flight::route("POST /add", function(){
        // Get the Flight Data from the POST request:
        $payload = Flight::request() -> data -> getData();

        // Handle file upload for the image:
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
            
                $resizedImage = imagescale($image, 600, -1);
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
        $item = Flight::get("items_service")->add_item($payload);

        // Return JSON response
        echo json_encode(["message" => "You have successfully added an item of clothing to the database", 'data' => $item]);
    });     

    /* Deleting an item from the database */
    /**
     * @OA\Delete(
     *      path="/items/delete/{itemid}",
     *      tags={"Items"},
     *      summary="Delete item",
     *      security = {
     *          {"ApiKey" : {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Delete an item from the database, or throw an error if it doesn't exists"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="itemid", example="0", description="ID Of the item"),
     * )
     */
    Flight::route("DELETE /delete/@itemid", function($itemid){
        $item_id = $itemid;

        Flight::get("items_service") -> delete_item($item_id);
        Flight::json(["message" => "You have delete the patient!"]);
    });

    //Getting an individual item from the database:
    /**
     * @OA\Get(
     *      path="/items/get/{itemid}",
     *      tags={"Items"},
     *      summary="Get item",
     *      security = {
     *          {"ApiKey" : {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Retrieve a specific item from the database, if it exists"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="itemid", example="0", description="ID Of the item"),
     * )
     */
    Flight::route("GET /get/@itemid", function($itemid){
        $item_id = $itemid;

        $item = Flight::get("items_service") -> get_item_by_id($item_id);

        Flight::json($item);
    });

    //Editig an item:
    Flight::route("POST /edit", function(){
        $payload = Flight::request() -> data -> getData("id");

        $item = Flight::get("items_service") -> edit_item($payload);
        
        Flight::json(["message" => "Item edited successfully!", 'data' => $item]);
    });

    //Logging an item:
    Flight::route("POST /log", function(){
        $payload = Flight::request() -> data -> getData("items");

        foreach($payload as $itemID){
            Flight::get("items_service") -> log_item($itemID);
        };

        Flight::json(["message" => "Updated successfully"]);
    });
});