<?php
include "db.php";
$data=array();
//if($_SERVER["REQUEST_METHOD"]=="POST"){ 
// $c = $_GET['c'];
//$q=mysqli_query($con,"select * from `produit` where cab='6130433000019'  ");
	$q=mysqli_query($con,"select * from `produit` ");
	while ($row=mysqli_fetch_object($q)){
	 $data[]=$row;
	}
	echo json_encode($data);
//}	
?>