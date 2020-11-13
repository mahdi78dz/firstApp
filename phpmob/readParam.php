<?php
include "db.php";
//include("validation-mob.php");
$q=mysqli_query($con,"select * from param ");
$row=mysqli_fetch_assoc($q);
while ($row=mysqli_fetch_object($q)){
    $data[]=$row;
}
	  //$data[]=$row;
	 echo json_encode($data);
?>
