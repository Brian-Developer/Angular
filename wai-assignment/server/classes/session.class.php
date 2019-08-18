<?php 
Class Session{
	private static $instance;

	private function __construct(){
		session_start();
	}

	public static function getInstance(){
		if (!self::$instance) {
			self::$instance = new Session();
		}
		return self::$instance;
	}

	public function setProperty($key, $value){
		$_SESSION[$key] = $value;
		return true;
	}

	public function getProperty($key){
		// If else

		if(!isset($_SESSION[$key])){
			return "";
		}
		else{
			$property = $_SESSION[$key];
			return $property;
		}
		
	}
	public function unsetProperty(){
		session_destroy();
		return true;
	}
}

?>