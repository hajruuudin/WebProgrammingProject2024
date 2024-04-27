<?php

require_once __DIR__ . "/BaseDao.class.php";

class OutfitsDao extends BaseDao{
    public function __construct(){
        parent::__construct("outfits");
    }

    public function add_outfit($outfit){
        return $this -> insert("outfits", $outfit);
    }

    public function get_outfits(){
        $query = "SELECT o.*, w.name AS weatherName, oc.name AS categoryName
                FROM outfits o
                JOIN weather w ON o.weatherID = w.id
                JOIN outfitsCategories oc ON o.outfit_categoryID = oc.id";
        return $this -> query($query);
    }

    public function get_outfit_by_id($outfit_id){
        return $this -> query_unique(
            "SELECT * FROM outfits WHERE id = :id", 
            ["id" => $outfit_id]
        );
    }

    public function delete_outfit($outfit_id){
        $query = "DELETE FROM outfits WHERE id = :id";
        return $this -> query_unique($query, ["id" => $outfit_id]);
    }

    public function edit_outfit($outfit_id, $outfit){
        $query = "UPDATE outfits SET 
                        name = :name, 
                        description = :description,
                        outfit_categoryID = :outfit_categoryID,
                        weatherID = :weatherID,
                        rating = :rating,
                        date_added = :date_added
                    WHERE id = :id";

        $this -> execute($query, [
            "id" => $outfit_id,
            "name" => $outfit['name'],
            "description" => $outfit['description'],
            "outfit_categoryID" => $outfit['outfit_categoryID'],
            "weatherID" => $outfit['weatherID'],
            "rating" => $outfit['rating'],
            "date_added" => $outfit['date_added']
        ]);
    }
}