<?php
require_once("ApplicationRegistry.class.php");

Class pdoDB extends ApplicationRegistry{
  /**
   * @access private
   * @static $dbConnection to hold the db connection
   */
  private static $dbConnection = null;

  /**
  * make the constructor and clone functions private to prevent normal class instantiation
  * @access private
  */
  private function __construct() {
  }
  private function __clone() {
  }

  /**
   * Return DB connection or create initial connection
   * @return object (PDO connection)
   * @access public
   */
  public static function getConnection() {
    // if there isn't a connection already then create one
    if ( !self::$dbConnection ) {
        try {
            $app_registry = self::getDNS();
            self::$dbConnection = new PDO('sqlite:' . $app_registry);
            self::$dbConnection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
         }
         catch( PDOException $e ) {
            // in a production system you would log the error not display it
            echo $e->getMessage();
         }
    }

    // return the connection
    return self::$dbConnection;
    return $app_registry;
  }

}
?>