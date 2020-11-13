<?php
include "db.php";
//include("validation-mob.php");
$data=array();

//if($_SERVER["REQUEST_METHOD"]=="POST"){ 
 $c = $_GET['c'];
 //$c = '0001';
//$q=mysqli_query($con,"select * from `produit` where cab='6130433000019'  ");
 	$q=mysqli_query($con,"select * from `produit` where code_p='$c'  ");
	while ($row=mysqli_fetch_object($q)){
	 $data[]=$row;
	}
	echo json_encode($data);
 	
?>