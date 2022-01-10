<?php

class Users {

	// table
	private $db;
    private $table = "users";

    // object properties
    public $id;
    public $login;
    public $password;
    public $role;

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
	public function create () {
        
	}

    /**
     * Read all users
     *
     * @return array
     */
	public function read($data) {
        print_r("?".$data);
        $login = $data["login"];
        $password = $data["password"];

		$sql = "SELECT * FROM users WHERE login= '$login' AND password='$password'";
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
        
	}

    /**
     * Delete user
     *
     * @return array
     */
	public function delete ($data) {
        
	}
}

?>
