<?php
 include "db.php";
 include "validation.inc.php";
// if(isset($_POST['insert']))
 //{
 $cab= trim($_POST['cab']);
 $designation=ucfirst(trim($_POST['designation']));
 $prix=$_POST['prix'];
 $quantite=$_POST['quantite'];
 if( !check_produit_des_new($designation) ){
	 $q=mysqli_query($con,"INSERT INTO `produit` (`cab`,`des_p`,`prix_p`,`qte`,`nature`,`type_p`,`image`) VALUES ('$cab','$designation','$prix','$quantite','n','0','PCE')");
    if($q)
	  echo "success";
	 else
	  echo "error";
	 //}
 }else echo "des_existe";
 
 ?>