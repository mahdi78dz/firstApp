<?php
include "db.php";
 include "VALIDATION.INC.PHP";
$c = $_GET['code_d'];
$q=mysqli_query($con,"select date_format(d.date_d,'%d-%m-%Y') date_d , d.ref_d , d.code_agt , d.date_s , d.code_f , c.nom,c.prenom,c.adresse,c.rc , c.nif , c.nis , c.nai, c.n_banque  from documt d left join client c on c.code_cl = d.code_f where d.code_d ='$c' and d.type_d='s' ");
$row=mysqli_fetch_assoc($q);
 	 $data[]=$row;
 	 echo json_encode($data);
 ?>
