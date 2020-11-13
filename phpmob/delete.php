<?php
include "db.php";
include("validation.inc.php");	 
$code_p=$_POST['code_p'];
if(!check_mouvement_produit($code_p)){
	if( is_produit_element_pack($code_p) != 'existe'){
	  if(delete_produit($code_p)){
		 if( get_param('use_prix_promo') =='yes' ) delete_prix_promo($code_p);
	     echo "succees";
	  }else echo "erreur2";
	}else echo "erreur3"; // le produit est un pack d un autre produit
 }else echo "erreur1"; // existe des mouvement pour produit  
 //echo $code_p;
 /*
if(!check_mouvement_produit($code_p)){
	
	if( is_produit_element_pack($code_p) != 'existe'){
		 //if( $prod == NULL ){						  
			if(delete_produit($code_p)){
			   if( get_param('use_prix_promo') =='yes' ) delete_prix_promo($code_p);
			   //$message = "<font color = green><b>Suppression terminée avec succés ! ";
			   echo "succees:".$code_p;
			}else echo "error1";
			  //$message = "<font color = red><b>Suppression impossible ! "; }
			  
		 //}else
			//$message = "<font color = red><b>Suppression impossible ! ";
			//echo "error2";
	}else{
		//$message = "<font color = red><b>Suppression impossible ! <br> Ce produit existe dans des PACKS de produits que vous devez d'abord supprimés. ";
	   echo "error3";
	}	 
}else "error4";
 */


 /*
 $q=mysqli_query($con,"delete from `produit` where `code_p`='$code_p'");
 if($q)
 echo "success";
 else
 echo "error";*/
 //}
 ?>