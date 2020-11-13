<?php
 $user = isset($_POST['username']) ? $_POST['username'] : '';
 $pwd = isset($_POST['password']) ? $_POST['password'] : '';
 $ok = true;
 $message = array();
 
 if( !isset($user) || empty($user) ){
	 $ok = true;
 	 $message[] = 'User ne doit pas etre vide ! ';
 }

 if( !isset($pwd) || empty($pwd) ){
	 $ok = true;
 	 $message[] = 'Mot de passe ne doit pas etre vide ! ';
 }

 if($ok){
	 if( $user === 'dcode'  && $pwd === 'dcode' ){
	      $ok = true;
 	      $message[] = 'Acces réussi.';
     }else{
	      $ok = false;
 	      $message[] = 'Combinaison user / mot de passe   erronée .';
	 }
 }
 
 echo json_encode(
       array(
	     'ok' => $ok,
		 'message' => $message
	   )
 );


?>