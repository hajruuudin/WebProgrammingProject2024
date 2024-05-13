<?php

require_once __DIR__ . "/../dao/UsersDao.class.php";

class UsersService {
    private $users_dao;

    public function __construct(){
        $this -> users_dao = new UsersDao();
    }

    public function add_user($user){
        $user["password"] = password_hash($user["password"], PASSWORD_BCRYPT);
        return $this -> users_dao -> add_user($user);
    }

    public function get_user_by_id($userid){
        return $this -> users_dao -> get_user_by_id($userid);
    }
}