<?php
include "db.php";
$data=array();
 $con = mysqli_connect("localhost","root","","cab_db") or die ("could not connect database");
//if($_SERVER["REQUEST_METHOD"]=="POST"){ 
 //$date = $_GET['date'];
  //$date = "2020-07-02";
  $date=date("Y-m-d");
  $q=mysqli_query($con," select d.code_d , date_format(d.date_s,'%d-%m-%Y  %H:%i:%s') date_s , c.reste , c.versement , d.obs from `documt` d  left join credit_cl c on d.code_d = c.code_d where d.date_d='$date' and d.type_d='s' order by d.code_d desc  ");
	while ($row=mysqli_fetch_object($q)){
	 $data[]=$row;
	}
	echo json_encode($data);
//}	
?>