<?php

require_once __DIR__ . "/../dao/ItemsDao.class.php";

class ItemsService {
    private $items_dao;

    public function __construct(){
        $this -> items_dao = new ItemsDao();
    }
    
    public function add_item($item){
        return $this -> items_dao -> add_item($item);
    }

    public function get_items($userId){
        return $this -> items_dao -> get_items($userId);
    }

    public function delete_item($item_id){
        $this -> items_dao -> delete_item($item_id);
    }

    public function get_item_by_id($item_id){
        return $this -> items_dao -> get_item_by_id($item_id);
    }

    public function edit_item($item){
        $id = $item['id'];
        unset($item['id']);

        $this -> items_dao -> edit_item($id, $item);
    }

    public function log_item($itemId){
        $this -> items_dao -> log_item($itemId);
    }
}