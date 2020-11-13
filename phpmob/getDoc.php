<?php
include "db.php";
$data=array();
 $con = mysqli_connect("localhost","root","","cab_db") or die ("could not connect database");
//if($_SERVER["REQUEST_METHOD"]=="POST"){ 
 $c = $_GET['c'];
	 $q=mysqli_query($con,"select dd.code_d , dd.ref_d , dd.date_d , dd.date_s , dd.code_f ,dd.versement , r.remise  from remise_cl r right join ( select d.code_d , d.ref_d , d.date_d , d.date_s , d.code_f ,c.versement from `documt` d  left join credit_cl c on d.code_d = c.code_d where d.code_d='$c' and d.type_d='s' )dd on dd.code_d=r.code_d  ");
	while ($row=mysqli_fetch_object($q)){
	 $data[]=$row;
	}
	echo json_encode($data);
//}	
?>