<?php

require_once __DIR__ . "/../dao/OutfitsDao.class.php";

class OutfitsService{
    private $outfits_dao;

    public function __construct(){
        $this -> outfits_dao = new OutfitsDao();
    }

    public function add_outfit($outfit){
        return $this -> outfits_dao -> add_outfit($outfit);
    }

    public function get_outfits(){
        return $this -> outfits_dao -> get_outfits();
    }

    public function delete_outfit($outfit_id){
        $this -> outfits_dao -> delete_outfit($outfit_id);
    }

    public function get_outfit_by_id($outfit_id){
        return $this -> outfits_dao -> get_outfit_by_id($outfit_id);
    }

    public function edit_outfit($outfit){
        $id = $outfit['id'];
        unset($outfit['id']);

        $this -> outfits_dao -> edit_outfit($id, $outfit);
    }


}