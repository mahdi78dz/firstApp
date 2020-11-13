<?php
 header("Access-Control-Allow-Origin: *");
 $con = mysqli_connect("localhost","root","","cab_db") or die ("could not connect database");

function check_produit_des($des,$code){
	if($q=mysqli_query($con,"select * from produit where  des_p = '$des' and code_p <> '$code'")){
		$row=mysqli_fetch_object($q);
		return true;							
	}			  
    return false ;	 
}
?>