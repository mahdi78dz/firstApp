<?php
include "db.php";
$data=array();
$con = mysqli_connect("localhost","root","","cab_db") or die ("could not connect database");
//if($_SERVER["REQUEST_METHOD"]=="POST"){ 
$c = $_GET['c'];
$q=mysqli_query($con,"select ff.code_p,ff.qte_mv,ff.prix,p.des_p,p.cab,p.image , ff.code_d ,ff.date_s , ff.date_d from produit p right join (select m.code_p,m.qte_mv,m.prix , d.code_d ,d.date_s,d.date_d from `documt` d  left join mouvt m on d.code_d = m.code_d where d.code_d='$c' and d.type_d='s') ff  on ff.code_p=p.code_p");
while ($row=mysqli_fetch_object($q)){
 $data[]=$row;
}
echo json_encode($data);
//}	
?>