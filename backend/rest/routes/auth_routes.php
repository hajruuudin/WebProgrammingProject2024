<?php

require_once __DIR__ . "/../services/AuthService.class.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::set("auth_service", new AuthService());

Flight::group("/auth", function(){
    /**
     * @OA\Post(
     *      path="/auth/login",
     *      tags={"Authentication"},
     *      summary="Login process",
     *      @OA\RequestBody(
     *          description="Login data",
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/x-www-form-urlencoded",
     *              @OA\Schema(
     *                  @OA\Property(property="email", description="Email of the user", type="string", example="hajruuudin@gmail.com"),
     *                  @OA\Property(property="password", description="Password of the user", type="string", example="banana123")
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *           response=200,
     *           description="Use this to log in"
     *      ),
     * )
     */
    Flight::route("POST /login", function(){
        // Get the Flight Data from the POST request:
        $email = $_POST['email'];
        $password = $_POST['password'];

        //Get the user from the database using the AuthService:
        $user = Flight::get("auth_service") -> get_user_by_email($email);

        // Password check
        if(!$user || !password_verify($password, $user["password"]))
            Flight::halt(500, "Invalid email or password!");


        // Unset the password from the user object:
        unset($user["password"]);

        // Generate the JWT PAYLOAD:
        $jwt_payload = [
            "user" => $user,
            "iat" => time(),
            "eat" => time() + (60 * 60 * 24) // valid for 1 day
        ];

        // Generate the JWT TOKEN:
        $token = JWT::encode(
            $jwt_payload,
            JWT_SECRET,
            "HS256"
        );

        Flight::json(
            array_merge($user, ["token" => $token])
        );

    });

    /**
     * @OA\Post(
     *      path="/auth/logout",
     *      tags={"Authentication"},
     *      summary="Logout process i guess",
     *      security = {
     *          { "ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Use this to log out"
     *      ),
     * )
    */
    Flight::route("POST /logout", function(){
        try{
            $token = Flight::request() -> getHeader("Authentication");

            if(!$token){
                Flight::halt(401, "Missing authentication header");
            } else {
                $decoded_token = JWT::decode($token, new Key(JWT_SECRET, "HS256"));

                Flight::json([
                    "jwt_decoded" => $decoded_token,
                    "user" => $decoded_token -> user
                ]);
            }
        } catch(\Exception $e){
            Flight::halt(401, $e -> getMessage());
        }
    });
});