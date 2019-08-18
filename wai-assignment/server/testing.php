<?php
require_once('classes/session.class.php');
//testing all modules in the database folder
$session    = Session::getInstance();
$profile    = $session->getProperty('profile');
$comment    = $session->getProperty('comment');
echo 'Welcome to Films App<br><br>';

if($profile == null){
	echo '<form action = "index.php?action=login" method = "post">
                  <label>UserName  :</label><input type = "text" name = "email" class = "box"/><br /><br />
                  <label>Password  :</label><input type = "password" name = "password" class = "box" /><br/><br />
                  <input type = "submit" value = " Submit "/><br />
		  </form>';
}
else {
	echo $profile.'<br>';
	echo '<a href="index.php?action=logout">Logout</a><br>';
	echo '<br> <a href="index.php?action=listAllNote">View All Notes</a></br>';
	echo '<br> <a href="insertForm.php">Insert Notes</a></br>';
	echo '<br> <a href="updateForm.php">Update Notes</a></br>';

}
 echo '<br><a href="index.php?action=listFilms">ShowFilms</a></br>';
 echo '<br> <a href="index.php?action=listFilms&term=air">Show Search Results</a></br>';
 echo '<br> <a href="index.php?action=listFilms&category=4">Choosing Category</a></br>';
 echo '<br> <a href="index.php?action=listActors&film_id=3">Actors</a></br>';



// echo '<a href="index.php?action=delete&subject=student&id=a8108314">Search for a student with id a8108314</a><br>';
// echo '<a href="index.php?action=update&subject=Student&id=a8008640&forename=DONKEY&surname=KONG&email=shyamyn@Hotmail.com">Update for goodness sake</a><br>';
// echo 'Show films '<a href="wai-assignment/index.php?action=listFilms>);






//  Show search results (i.e. wai-assignment/index.php?action=listFilms&term=air)
//  Show categroy results (i.e. wai-assignment/index.php?action= listFilms &category=4)
//  Show actors for an film (i.e wai-assignment/index.php?action=listActors&film_id=3)
//  Show notes (i.e wai-assignment/index.php?action=listNotes&film_id=1)
//  Allow a note to be changed or created (using a form with method post)
//  Allow a user to log in and log out (using a form with method post)
 ?>