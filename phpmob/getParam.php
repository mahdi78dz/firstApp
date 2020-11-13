<?php
include "db.php";
//include("validation-mob.php");
$c = $_GET['param'];

//$req= "select * from param where nom ='$c' ";
//$rs=mysqli_query($con,$req);

$q=mysqli_query($con,"select * from param where nom ='$c' ");
$row=mysqli_fetch_assoc($q);
	//while ($row=mysqli_fetch_object($q)){
	 //echo "<p>".$row->nom."</p>";
	  $data[]=$row;
	  //echo "<span>".$row['nom']."</span>";
	//}
	 echo json_encode($data);
		//echo $data;
?>
