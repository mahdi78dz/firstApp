<?php
include "db.php";
include "validation.inc.php";
$anc_solde=0; $nouv_solde=0;
$code_d = $_GET['code_d'];
$det = get_all_detail_documt($code_d);
$code_cl = $det->code_f;
if( $code_cl != 0 ){
	$detcr = get_credit_documt($code_d);
	$dat_f = get_date_of_fac($code_d);
	$anc_solde = get_tot_credit_client_ordre_doc($det->code_f,$dat_f);
	$nouv_solde = get_tot_credit_client($det->code_f);
	$versement = $detcr->versement; 
	
	$remise = get_remise_documt($code_d);
	$date_j = date("d-m-Y");
	$mt = $det->mt_htc;
	$total = $anc_solde + $det->mt_htc - $remise; 
	$solde_au = $anc_solde + $mt - $remise - $versement; 
	
	//$data[0] = $date_j;
	$data[0] = $versement;
	$data[1] = $anc_solde;
	$data[2] = $nouv_solde;
	$data[3] = $total; 
	$data[4] = $solde_au;
	$data[5] = formater_to_affichage($dat_f);
}
//$data[0] = strtoupper( $lettre->Conversion($dec))." DINARS ALGERIENS ";  
echo json_encode($data);
 ?>
