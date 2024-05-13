<?php

require_once __DIR__ . "/../services/UsersService.class.php";

Flight::set("users_service", new UsersService());

Flight::group("/users", function(){
     /**
     * @OA\Get(
     *      path="/users/get/{userid}",
     *      tags={"Users"},
     *      summary="Get a user",
     *      @OA\Response(
     *           response=200,
     *           description="Retrieve a specific user from the database, if he/she exists"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="userid", example="0", description="ID Of the user"),
     * )
     */
    Flight::route("GET /get/@userid", function($userid){
        // Get the user from the database using the UsersService:
        $user = Flight::get("users_service") -> get_user_by_id($userid);

        // Return a message to the user:
        Flight::json($user);
    });

    /**
     * @OA\Post(
     *      path="/users/add",
     *      tags={"Users"},
     *      summary="Adding a user to the databse (Registering)",
     *      @OA\RequestBody(
     *          description="Register data",
     *          @OA\JsonContent(
     *              required = {"email", "password", "fullname", "password"},
     *              @OA\Property(property="username", description="Username of the user", type="string", example="JohnDoe"),
     *              @OA\Property(property="fullname", description="Fullname of the user", type="string", example="John Doe"),
     *              @OA\Property(property="email", description="Email of the user", type="string", example="john@doe.gmail", format="email"),
     *              @OA\Property(property="password", description="Password of the user", type="string", example="password")
     *          )
     *      ),
     *      @OA\Response(
     *           response=200,
     *           description="Add a user to the database, if all credentials are properly entered!"
     *      ),
     * )
    */
    Flight::route("POST /add", function(){
        // Get the Flight Data from the POST request:
        $payload = Flight::request() -> data -> getData();

        unset($payload["repeat_password"]);

        // Add the user to the database using the UsersService:
        Flight::get("users_service") -> add_user($payload);

        // Return a message to the user:
        Flight::json(["message" => "You have added a new user!"]);
    });
});