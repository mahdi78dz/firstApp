<?php
 include "db.php";
// if(isset($_POST['update']))
 //{
 $code_p=$_POST['code_p'];
 $cab=$_POST['cab'];
 $prix=$_POST['prix'];
 $quantite=$_POST['quantite'];
 $designation=$_POST['designation'];
 if ( !check_produit_des($designation,$code_p) ){
    $sql = "UPDATE `produit` SET `cab`='$cab',`des_p`='$designation',`prix_p`='$prix' , qte='$quantite' where `code_p`='$code_p' ";
 	if(mysqli_query($con,$sql)) echo 'succes' ;
 	else echo 'echec' ;
  }else echo 'existe';
 ?>