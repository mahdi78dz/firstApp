<?php
 include "db.php";
// if(isset($_POST['insert']))
 //{
 $cab=$_POST['cab'];
 $prix=$_POST['prix'];
 $quantite=$_POST['quantite'];
 $designation=$_POST['designation'];
if( !check_produit_cab($cab) ){
	 $q=mysqli_query($con,"INSERT INTO `produit` (`cab`,`des_p`,`prix_p`,`qte`) VALUES ('$cab','$designation','$prix','$quantite')");
	 if($q)
	  echo "success";
	 else
	  echo "error";
	 //}
}else echo "existe" ;
 ?>