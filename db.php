<?php
header("Access-Control-Allow-Origin: *");
$con = mysqli_connect("localhost","root","","cab_db") or die ("could not connect database");

function check_produit_des($des,$code){
	global $con;
	if($q=mysqli_query($con,"select * from produit where  des_p = '$des' and code_p <> '$code'")){
		$num = mysqli_num_rows($q);
		if ($num >=1) return true;
		//$row=mysqli_fetch_object($q);
		//return true;							
	}			  
    return false ;	 
}
function check_produit_cab($cab){
	global $con;
	if($q=mysqli_query($con,"select * from produit where  cab = '$cab'")){
		$num = mysqli_num_rows($q);
		if ($num >=1) return true;
		//$row=mysqli_fetch_object($q);
		//return true;							
	}			  
    return false ;	 
}
?>