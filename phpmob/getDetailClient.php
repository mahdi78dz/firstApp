<?php
include "db.php";
$data=array();

//if($_SERVER["REQUEST_METHOD"]=="POST"){ 
 $c = $_GET['client'];
//$q=mysqli_query($con,"select * from `produit` where cab='6130433000019'  ");

	$q=mysqli_query($con,"select nom from `client` where code_cl='$c'  ");
	$row=mysqli_fetch_assoc($q);
	//while ($row=mysqli_fetch_object($q)){
	 //echo "<p>".$row->nom."</p>";
	  $data[]=$row;
	  //echo "<span>".$row['nom']."</span>";
	//}
	 echo json_encode($data);
//}	
?>