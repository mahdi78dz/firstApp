<?php
include "db.php";
//include("validation-mob.php");
$data=array();
$c = $_GET['client'];
 	$q=mysqli_query($con,"select * from `client` where code_cl='$c'");
	while ($row=mysqli_fetch_object($q)){
	 $data[]=$row;
	}
	echo json_encode($data);
 	
?>