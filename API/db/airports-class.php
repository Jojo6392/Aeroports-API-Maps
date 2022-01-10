<?php

class Airports {

	// table
	private $db;
    private $table = "airports";

    // object properties
    public $id;
    public $name;
    public $latitude;
    public $longitude;

    /**
     * Constructor with $db
     *
     * @param $db
     */
    public function __construct($db){
        $this->db = $db;
    }


    /**
     * Create user
     *
     * @return array
     */
	public function create ($data) {
        $name = $data["airport"];
        $lat = $data["lat"];
        $lng = $data["lng"];

        $sql = "INSERT INTO airports(name, latitude, longitude) VALUES('$name', '$lat', '$lng')";
        $query = $this->db->query($sql);

        if(!$query) {
            $response = array(
                'status' => 404,
                'status_message' => 'Erreur dans la requête'
            );
        }
        else {
            $response = array(
                'status' => 200,
                'status_message' => 'Aéroport ajouté avec succès.',
            );
        }

        return $response;
	}

    /**
     * Read all users
     *
     * @return array
     */
	public function read() {
		$sql = 'SELECT * FROM airports';
        $query = $this->db->query($sql);

        $jsonArray = array();

        while($row = $query->fetchArray(SQLITE3_ASSOC)) {
            $jsonArray[] = $row;
        }

        return $jsonArray;
	}

    /**
     * Update user
     *
     * @return array
     */
	public function update($data) {
        $id = (int) $data["id"];
        $name = (string) $data["airport"];
        $lat = (string) $data["lat"];
        $lng = (string) $data["lng"];

        $sql = "UPDATE airports SET name= '$name', latitude= '$lat', longitude= '$lng' WHERE id= $id";  

        $query = $this->db->query($sql);

        if(!$query) {
            $response = array(
                'status' => 404,
                'status_message' => 'Erreur dans la requête'
            );
        }
        else {
            $response = array(
                'status' => 200,
                'status_message' => 'Aéroport mis à jour avec succès.',
            );
        }

        return $response;
	}

    /**
     * Delete user
     *
     * @return array
     */
	public function delete ($data) {
        $sql = 'DELETE FROM airports WHERE id = '.$data['id'];
        $query = $this->db->query($sql);

        if(!$query) {
            $response = array(
                'status' => 404,
                'status_message' => 'Erreur dans la requête'
            );
        }
        else {
            $response = array(
                'status' => 200,
                'status_message' => 'Aéroport supprimé avec succès.',
            );
        }

        return $response;
	}
}

?>
