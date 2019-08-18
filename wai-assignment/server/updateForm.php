<?php 
	require_once( "classes/pdoDB.class.php" );
	require_once( "classes/RecordSet.class.php" );
	require_once('classes/session.class.php');
	$session    = Session::getInstance();
	$useremail  = $session->getProperty('email');   // session email
	$rs         = new JSONRecordSet();              
	$sql    = "SELECT nfc_note.comment, nfc_film.title, nfc_note.film_id FROM nfc_note JOIN nfc_film ON nfc_note.film_id = nfc_film.film_id WHERE user = :email";
    $param = array('email'=>$useremail);
	    $result = $rs->getRecordSet($sql, $param);
        $results = json_decode($result);
        $results = $results->results; 
        
        for ($i = 0; $i < count($results); $i++){
            echo '<form action = "index.php?action=updateNotes" method = "post">';
            echo '<label>Title  :</label><p  id="" cols="30" rows="10">'.$results[$i]->title.'</p><br /><br />';
            echo '<label>Edit Note  :</label><textarea name="comment" id="" cols="30" rows="10">'.$results[$i]->comment.'</textarea><br /><br />';
            echo '<input type = "submit" value = " Save note "/><br />';
            echo '<input type = "hidden" value = "'.$results[$i]->film_id.'" name="filmid"/><br />';
            echo '</form>';
        }
        
 ?>
