<?php
include "db.php";
//include("validation-mob.php");
$c = $_GET['code_d'];
$p = $_GET['code_p'];
$q=mysqli_query($con,"select * from detail_documt where code_d ='$c' ");
//$row=mysqli_fetch_assoc($q);
$row=mysqli_fetch_object($q);
$detail_des = explode('|', $row->obs1);
for($j=0;$j<count($detail_des);$j++){
	$det = explode(':', $detail_des[$j]);
	if(trim($det[0]) == $p){ 
   		$i = count($detail_des);
   		$data =  trim($det[1]);    
	} 
}
//$data[]=$c."/".$p;
//echo json_encode($data);
 echo $data;
 ?>
