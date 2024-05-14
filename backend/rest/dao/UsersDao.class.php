<?php

require_once __DIR__ . "/BaseDao.class.php";

class UsersDao extends BaseDao{
    public function __construct(){
        parent::__construct("users");
    }

    public function add_user($user){
        return $this -> insert("users", $user);
    }

    public function get_user_by_id($userid){
        $query = "SELECT * FROM users WHERE id = :id";
        return $this -> query_unique($query, ["id" => $userid]);
    }
}