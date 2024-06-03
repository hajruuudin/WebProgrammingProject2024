<?php

require_once __DIR__ . "/../config.php";

class BaseDao{
    protected $connection;
    private $table;

    //Constructor for BaseDao class
    public function __construct($table){
        $this -> table = $table;
        try{
            $this -> connection = new PDO(
                "mysql:host=" . Config::DB_HOST() . 
                ";dbname=" . Config::DB_NAME(). 
                ";port=" . Config::DB_PORT(),
                Config::DB_USER(),
                Config::DB_PASS(), [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
        } catch (PDOException $e){
            throw $e;
        }
    }

    //Return all reords
    protected function query($query, $params = array()){
        $statement = $this -> connection -> prepare($query);
        $statement -> execute($params);
        return $statement -> fetchAll(PDO::FETCH_ASSOC);
    }

    //Return only a certain record
    protected function query_unique($query, $params){
        $results = $this -> query($query, $params);
        return reset($results);
    }

    //Execute statement function implementation:
    protected function execute($query, $params){
        $prepared_statemet = $this -> connection -> prepare($query);
        if($params){
            foreach($params as $key => $param){
                $prepared_statemet -> bindValue($key, $param);
            }
        }
        $prepared_statemet -> execute();
        return $prepared_statemet;
    }

    //Default function for INSERTING a query into a SPECIFIED TABLE from the ENTITY:
    public function insert($table, $entity){
        // Check if entity contains an image file
        // if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        //     // Handle file upload
        //     $targetDir = "assets/img/";
        //     $targetFilePath = $targetDir . basename($_FILES['image']['name']);
    
        //     // Move uploaded file to desired directory
        //     if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
        //         throw new Exception("Failed to move uploaded file.");
        //     }
    
        //     // Add image path to entity
        //     $entity['img_dir'] = $targetFilePath;
        // }

        $query = "INSERT INTO {$table} (";

        foreach($entity as $column => $value){
            $query .= $column . ", ";
        }

        $query = substr($query, 0, -2);
        $query .= ") VALUES (";

        foreach($entity as $column => $value){
            $query .= ":" . $column . ", ";
        }

        $query = substr($query, 0, -2);
        $query .= ")";

        $statement = $this -> connection -> prepare($query);
        $statement -> execute($entity);
        $entity["id"] = $this -> connection -> lastInsertId();
        return $entity;
    }
}