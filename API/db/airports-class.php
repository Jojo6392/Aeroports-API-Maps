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
     * @return boolean
     */
	public function create () {

	}

    /**
     * Read all users
     *
     * @return array
     */
	public function read() {
		
	}

    /**
     * Update user
     *
     * @return boolean
     */
	public function update() {

	}

    /**
     * Delete user
     *
     * @return boolean
     */
	public function delete () {

	}
}

?>
