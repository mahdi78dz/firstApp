<?php
include "db.php";
//include("validation-mob.php");
$c = $_GET['code_d'];
$q=mysqli_query($con,"select d.code_d,d.mod_doc,d.mt_htc,d.mt_ttc,d.mt_tva,d.droit_timbre , d.type_paiement, d.seq_facture , r.remise , d.obs from detail_documt d left join remise_cl r on r.code_d=d.code_d where d.code_d ='$c' ");
$row=mysqli_fetch_assoc($q);
 	 $data[]=$row;
 	 echo json_encode($data);
 ?>
