<?php 
	require_once( "classes/pdoDB.class.php" );
	require_once( "classes/RecordSet.class.php" );
	require_once('classes/session.class.php');
	$session    = Session::getInstance();
	$useremail  = $session->getProperty('email');   // session email
	$rs         = new JSONRecordSet();              
	$sql    = "SELECT nfc_film.film_id, nfc_film.title FROM nfc_film JOIN nfc_note ON nfc_film.film_id != nfc_note.film_id WHERE NOT EXISTS (SELECT nfc_note.film_id FROM nfc_note WHERE nfc_film.film_id = nfc_note.film_id)";
	    $result = $rs->getRecordSet($sql);
        $results = json_decode($result);
        $results = $results->results; 
  		// echo '<select name = "filmid">';
    //     for ($i = 0; $i < count($results); $i++){
    //         	echo '<option value='.$results[$i]->film_id.'> '.$results[$i]->title.'</option>';
    //     }
    //     echo '</select>';
        echo '<form action = "index.php?action=updateNotes" method = "post">';
        echo '<select name = "filmid">';
        for ($i = 0; $i < count($results); $i++){
            	echo '<option value='.$results[$i]->film_id.'> '.$results[$i]->title.'</option>';
        }
        echo '</select>';

        echo '                  <label>Addnote  :</label><textarea name="comment" id="" cols="30" rows="10"></textarea><br /><br />
                  
                  <input type = "submit" value = " Add note "/><br />
		  </form>';
 ?>
