<?php

require_once __DIR__ . "/../services/OutfitsService.class.php";

Flight::set("outfits_service", new OutfitsService());

Flight::group("/outfits", function(){
    /* Getting all outfits from the database */
    /**
     * @OA\Get(
     *      path="/outfits/{userId}",
     *      tags={"Outfits"},
     *      summary="Get all outfits",
     *      @OA\Response(
     *           response=200,
     *           description="Get all outfits from the database"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="userId", example="0", description="ID Of the user")
     * )
     */
    Flight::route("GET /@userId", function($userId){
        $outfits = Flight::get("outfits_service") -> get_outfits($userId);
        Flight::json($outfits);
    });

    /* Adding an outfit to the database */
    /**
     * @OA\Post(
     *      path="/outfits/add",
     *      tags={"Outfits"},
     *      summary="Add an outfit to the database",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Outfit data",
     *          @OA\MediaType(
     *              mediaType="application/json", 
     *              @OA\Schema(
     *                  @OA\Property(property="img_dir", description="Image directory of the file to upload", type="string", example="assets/img/outfits/1.jpg"),
     *                  @OA\Property(property="name", description="Name of the outfit", type="string", example="Outfit 1"),
     *                  @OA\Property(property="description", description="Description of the outfit", type="string", example="A nice outfit"),
     *                  @OA\Property(property="date_added", description="Date added of the outfit", type="string", format="date", example="2021-06-01"),
     *                  @OA\Property(property="outfit_categoryID", description="Category ID of the outfit", type="integer", example="1"),
     *                  @OA\Property(property="weatherID", description="Weather ID of the outfit", type="integer", example="1"), 
     *                  @OA\Property(property="rating", description="Rating of the outfit", type="string", example="5")
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Add an outfit to the database, along with its data. Throw an error if the data is not properly entered."
     *      )
     * )
     */
    Flight::route("POST /add", function(){
        // Get the Flight Data from the POST request:
        $payload = Flight::request() -> data -> getData();

        // Handling the file upload for the image:
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

        // Creating the outfit service to add the payload to the table:
        $outfit = Flight::get("outfits_service") -> add_outfit($payload);

        // JSON output if everything went well:
        Flight::json($outfit);
    });

    /* Deleting an outfit from the database */
    /**
     * @OA\Delete(
     *      path="/outfits/delete/{outfitid}",
     *      tags={"Outfits"},
     *      summary="Delete outfit",
     *      @OA\Response(
     *           response=200,
     *           description="Delete an outfit from the database, or throw an error if it doesn't exists"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="outfitid", example="0", description="ID Of the outfit"),
     * )
     */
    Flight::route("DELETE /delete/@outfitid", function($outfitid){
        $payload = $outfitid;
        $outfit = Flight::get("outfits_service") -> delete_outfit($payload);
        Flight::json($outfit);
    });

    /* Getting an outfit from the database */
    /**
     * @OA\Get(
     *      path="/outfits/get/{outfitid}",
     *      tags={"Outfits"},
     *      summary="Get outfit",
     *      @OA\Response(
     *           response=200,
     *           description="Retrieve a specific outfit from the database, if it exists"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="outfitid", example="0", description="ID Of the Outfit"),
     * )
     */
    Flight::route("GET /get/@outfitid", function($outfitid){
        $payload = $outfitid;
        $outfit = Flight::get("outfits_service") -> get_outfit_by_id($payload);
        Flight::json($outfit);
    });

    //this does not work UPDATE LATER
    //Updating an outfit in the database:
    Flight::route("POST /edit", function(){
        $payload = Flight::request() -> data -> getData("id");

        $outfit = Flight::get("outfits_service") -> edit_outfit($payload);
        
        Flight::json(["message" => "Outfit edited successfully!", 'data' => $outfit]);
    });

});