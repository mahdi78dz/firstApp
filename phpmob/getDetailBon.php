<?php
include "db.php";
//include("validation-mob.php");
$c = $_GET['code_d'];
$q=mysqli_query($con,"select * from detail_documt where code_d ='$c' ");
$row=mysqli_fetch_assoc($q);
 	 $data[]=$row;
 	 echo json_encode($data);
 ?>
