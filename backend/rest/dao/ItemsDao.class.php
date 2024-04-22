<?php

require_once __DIR__ . "/BaseDao.class.php";

class ItemsDao extends BaseDao {
    public function __construct(){
        parent::__construct("clothes");
    }

    public function add_item($item){
        return $this -> insert("clothes", $item);
    }
    
    public function get_items() {
        $query = "SELECT c.*, w.name AS weatherName, ic.name AS categoryName
                FROM clothes c
                JOIN weather w ON c.weatherID = w.id
                JOIN itemsCategories ic ON c.item_categoryID = ic.id";
        return $this -> query($query);
    }

    public function delete_item($item_id){
        $query = "DELETE FROM clothes WHERE id = :id";
        $this -> execute(
            $query,
            ['id' => $item_id]
        );
    }

    public function get_item_by_id($item_id){
        return $this -> query_unique(
            "SELECT * FROM clothes WHERE id = :id", 
            ["id" => $item_id]
        );
    }

    public function edit_item($item_id, $item){
        $query = "UPDATE clothes SET 
                        name = :name, 
                        brand = :brand,
                        description = :description, 
                        item_categoryID = :item_categoryID, 
                        size = :size, 
                        weatherID = :weatherID, 
                        date_added = :date_added, 
                        rating = :rating 
                WHERE id = :id";

        $this -> execute($query, [
            "id" => $item_id,
            "name" => $item['name'],
            "brand" => $item['brand'],
            "description" => $item['description'],
            "item_categoryID" => $item['item_categoryID'],
            "size" => $item['size'],
            "weatherID" => $item['weatherID'],
            "date_added" => $item['date_added'],
            "rating" => $item['rating']
        ]);
    
    }
}