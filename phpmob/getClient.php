<?php
include "db.php";
//include("validation-mob.php");
$data=array();
 	$q=mysqli_query($con,"select * from `client` order by nom asc");
	while ($row=mysqli_fetch_object($q)){
	 $data[]=$row;
	}
	echo json_encode($data);
 	
?>