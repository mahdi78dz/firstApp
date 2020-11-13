<?php
include "db.php";
require('ChiffresEnLettres.php'); 
$tot_l = $_GET['total'];
$lettre=new ChiffreEnLettre();
$tot_conv = explode('.',number_format($tot_l, $nbr_ch_virg, '.', ' ')); 	  
$dec = $tot_conv[0]; 
$a_virg = $tot_conv[1];
$StrVirgule = strlen($a_virg); 

if( $StrVirgule == 1 ) $a_virg = $a_virg.'0';
if(($a_virg == '00' )||($a_virg == '' )||($a_virg == 0 )||($a_virg == NULL )) $texteCtm="";
else $texteCtm = " ET ".strtoupper( $lettre->Conversion($a_virg))." CENTIMES.";

//$data[] = strtoupper( $lettre->Conversion($dec))." DINARS ALGERIENS ";  
//echo json_encode($data);
$data  = strtoupper( $lettre->Conversion($dec))." DINARS ALGERIENS ";  
echo $data;
 ?>
