<?php
require_once( "classes/pdoDB.class.php" );
require_once( "classes/RecordSet.class.php" );
require_once('classes/session.class.php');

// Validate $_POST
if(empty($_POST)){
  $_POST = json_decode(file_get_contents('php://input'), true);
}

$action     = isset($_REQUEST['action'])  ? $_REQUEST['action']  : null;
$subject    = isset($_REQUEST['subject']) ? $_REQUEST['subject'] : null;
$id         = isset($_REQUEST['id']) ? $_REQUEST['id'] : null;
$forename   = isset($_REQUEST['forename']) ? $_REQUEST['forename'] : null;
$surname    = isset($_REQUEST['surname']) ? $_REQUEST['surname'] : null;
$terms      = isset($_REQUEST['term']) ? $_REQUEST['term'] : null;
$category   = isset($_REQUEST['category']) ? $_REQUEST['category'] : null;
$film_id    = isset($_REQUEST['film_id']) ? $_REQUEST['film_id'] : null;
$filmid     = isset($_POST['filmid']) ? $_POST['filmid'] : null;
$email      = isset($_POST['email']) ? $_POST['email'] : null;
$passwd     = isset($_POST['password']) ? $_POST['password'] : null;
$usercoment = isset($_POST['comment']) ? $_POST['comment'] : null;

// concat action and subject with uppercase first letter of subject
$route      = $action . ucfirst($subject);      // eg list course becomes listCourse
$session    = Session::getInstance();
$pdoDB      = pdoDB::getConnection();           // connect to db
$profile    = $session->getProperty('profile'); // session profile
$useremail  = $session->getProperty('email');   // session email
$comment    = $session->getProperty('comment'); // session comment
$rs         = new JSONRecordSet();              // connect to JSONRecordSet
//set the header to json because everything is returned in that format
header("Content-Type: application/json");
 
// take the appropriate action based on the action and subject
switch ($route) {
// Case list films  
    case 'listFilms':   
    if(!empty($terms)){
        $sql    = "SELECT nfc_film.film_id,title, description, release_year, nfc_category.name, nfc_film.rating, nfc_film.last_update FROM nfc_film JOIN nfc_film_category ON nfc_film_category.film_id = nfc_film.film_id JOIN nfc_category ON nfc_film_category.category_id = nfc_category.category_id WHERE title LIKE :term OR nfc_category.name LIKE :term";
        $param = array(':term'=>'%' . $terms . '%');
        $result = $rs->getRecordSet($sql, $param);
        echo $result;
      }
      else if(!empty($category)){
        $sql    = "SELECT nfc_film.film_id,title, description, release_year, nfc_category.name, nfc_film.rating, nfc_film.last_update FROM nfc_film JOIN nfc_film_category ON nfc_film_category.film_id = nfc_film.film_id JOIN nfc_category ON nfc_film_category.category_id = nfc_category.category_id WHERE nfc_category.category_id = :category";
        $param = array(':category'=>$category);
        $result = $rs->getRecordSet($sql, $param);
        echo $result;
      }
      else{
        $sql    = "SELECT nfc_film.film_id, title, description, release_year, nfc_category.name, nfc_film.rating, nfc_film.last_update FROM nfc_film JOIN nfc_film_category ON nfc_film_category.film_id = nfc_film.film_id JOIN nfc_category ON nfc_film_category.category_id = nfc_category.category_id";
        $param = array();
        $result = $rs->getRecordSet($sql, $param);
        echo $result;
      }
    break;
// Case list Category
    case 'listCategory':
        $sql    = "SELECT name, category_id FROM nfc_category";
        $param = array();
        $result = $rs->getRecordSet($sql, $param);
        echo $result;
     break;
// Case list Actor
    case 'listActors':
        $sql   = "SELECT nfc_actor.last_name, nfc_actor.first_name FROM nfc_film JOIN nfc_film_actor ON nfc_film.film_id = nfc_film_actor.film_id JOIN nfc_actor ON nfc_actor.actor_id = nfc_film_actor.actor_id WHERE nfc_film.film_id = :filmid";
        $param = array('filmid'=>$film_id);
        $result = $rs->getRecordSet($sql, $param);    
        echo $result;
    break;
// Case Film Detail
    case 'filmdetail':
        $sql    = "SELECT nfc_film.film_id, title, description, release_year, nfc_language.name, nfc_film.rental_duration, nfc_film.rental_rate, nfc_film.length, nfc_film.replacement_cost, nfc_film.rating, nfc_film.special_features, nfc_film.last_update FROM nfc_film JOIN nfc_language ON nfc_film.language_id = nfc_language.language_id WHERE nfc_film.film_id = :filmid";
        $param  = array('filmid'=>$film_id);
        $result = $rs->getRecordSet($sql, $param);  
        echo $result;
    break;
// Case Login
    case 'login': 
    $sql    = "SELECT username, password, email FROM nfc_user WHERE email = :email";
    $param  = array('email'=>$email);
    $result = $rs->getRecordSet($sql, $param);
      
      $results = json_decode($result);
      $array = array($results);
      if (!empty($array[0]->results)){
        $passwordHash = $array[0]->results[0]->password;
      if(password_verify($passwd, $passwordHash)){  
        echo $array[0]->results[0]->username;
        $session->setProperty('profile', $array[0]->results[0]->username);
        $session->setProperty('email', $array[0]->results[0]->email);
        }
      else{
        $session->setProperty('profile', null);
        }          
      }
      else {
        echo 'Invalid email or password';
      }    

    break;
// Case Check Login
    case 'checkLogin':
        if($profile != null){
          $checkLogin = array('status' =>'logged in',
                              'logged' => true,
                              'userprofile' => $profile);
        }
        else{
          $checkLogin = array('status' =>'Login failed!',
                              'logged' => false,
                              'userprofile' => []);
        }
        $profile = json_encode($checkLogin);
        echo $profile;
        break;
     case 'logout':
        if($session->getProperty('profile') !== null){
          $session->unsetProperty('profile');
          $checkLogout = array('status' =>'logged out',
                              'logged' => true,
                              'userprofile' => []);}
          $profile = json_encode($checkLogout);
          echo $profile;
    break;
// Case List Notes
   case 'listNotes':
    $sql   = "SELECT comment FROM nfc_note WHERE film_id = :filmid AND user = :email";
       $param = array('filmid'=>$film_id, 'email'=>$useremail);
       $result = $rs->getRecordSet($sql, $param);    
       $checkComment = array(json_decode($result));
       $session->setProperty('comment', $checkComment[0]->results[0]->comment);
       echo $result;
       break;
    case 'listAllNote':
    $sql   = "SELECT film_id, comment FROM nfc_note WHERE user = :email";
       $param = array('email'=>$useremail);
       $result = $rs->getRecordSet($sql, $param);    
       $checkComment = array(json_decode($result));
       $session->setProperty('comment', $checkComment[0]->results[0]->comment);
       echo $result;
    break;
    case 'updateNotes':
       $date = date("Y/m/d h:i:sa");
       $sql   = "SELECT comment FROM nfc_note WHERE film_id = :filmid AND user = :email";
       $param = array('filmid'=>$filmid, 'email'=>$useremail);
       $result = $rs->getRecordSet($sql, $param);    
       $checkComment = array(json_decode($result));
        if (!empty($checkComment[0]->results[0]->comment)){
          $sql    = "UPDATE nfc_note SET user = :user ,film_id = :filmid, comment = :comment, lastupdated = :dateupdate WHERE film_id = :filmid AND user = :user";
          $param = array(':user'=>$useremail, ':filmid'=>$filmid, ':comment'=>$usercoment,':dateupdate'=>$date);
          $result = $rs->insertRecordSet($sql, $param);    
          echo $result;
          }
         else{
          $sql    = "INSERT INTO nfc_note(user, film_id, comment, lastupdated) VALUES (:user, :filmid, :comment, :dateupdate)";
          $param = array(':user'=>$useremail, ':filmid'=>$filmid, ':comment'=>$usercoment,':dateupdate'=>$date);
          $result = $rs->insertRecordSet($sql, $param);    
         echo $result;
          }
    break;
    default:
    echo '{"status":"error", "message":{"text": "default no action taken"}}';
    break;
}

?>