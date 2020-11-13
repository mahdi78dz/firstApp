<?php
 include "db.php";
 include "VALIDATION.INC.PHP";
// if(isset($_POST['insert']))
 //{
 $remise=$_POST['remise'];
 $versement=$_POST['versement'];
 $client=$_POST['client'];
 $total=$_POST['total']; 
 $taille = $_POST['nbrLigne'];
 //$mouvement = json_encode($_POST['mouvement']);  
 $mouvement = $_POST['mouvement'];  
 //echo $mouvement[0][code_p]; 
 //$detail_plt='';
 $detail_plt = $_POST['detail_ca'];
 //var detail_ca = localStorage.getItem('detail_ca');
 $agt = 8 ;
	 $index_d =0; 
	 $new_cl=NULL;	 
     if (creer_documt('','','s',$client,$total,$agt)){ 
		if ($index_d==0) $index_d = get_my_last_doc();
     }else  if (creer_documt('','','s',$client,$total,$agt)) $index_d = get_my_last_doc();	 
 	 ///////// parametrage de la table detail_documt///////////////////////////////////
	 creer_detail_documt($index_d,'no',$total,'e','');
	 //////////////////////////////////////////////////////////////////////////////////
     if ( ($index_d != '') && ($index_d != NULL) && ($index_d != 0) ){
		  if($client != 0){
		    $new_cl=get_client($client) ;
			///////calcul de la valeur reelle a crediter///////
			//$reste = mysql_result(mysql_query("select mt_ttc from detail_documt where code_d ='$index_d' "), 0) - $versement;
			$vc = get_detail_doc($index_d)->mt_ttc;
			if(($vc == NULL)||($vc=='')) $vc = 0;
			$reste = $vc - $versement;
			//////////////////////////////////////////////////////
	        if (!set_credit($client,$index_d,$versement,$reste,'',$agt)) {
				affichErreur("L'insertion du crédit a échoué!");
				set_audit('credit_tick',2,'Echec Ajout crédit',$rsrc,$index_d,'','',$reste,'',$new_cl->nom,'echec',"Echec Ajout crédit versement:$versement, reste:$reste",'');
            }else{ 
			  set_audit('credit_tick',2,'Ajout crédit',$rsrc,$index_d,'','',$reste,'',$new_cl->nom,'succès',"Ajout crédit versement:$versement, reste:$reste",'');
			}
		  }
		  if((float)$_POST['remise'] > 0.0){	        
			if (!set_remise($client,$index_d,$_POST['remise'])) {
				affichErreur("L'insertion de la remise a échoué!");
				set_audit('remise',2,'Echec Ajout remise',$rsrc,$index_d,'','',$_POST['remise'],'',$new_cl->nom,'echec',"Echec Ajout remise ".$_POST['remise'].")",'');
            }else{
			   set_audit('remise',2,'Ajout remise',$rsrc,$index_d,'','',$_POST['remise'],'',$new_cl->nom,'succès',"Ajout remise (".$_POST['remise'].")",'');
			   //if($_SESSION['caisse_remise']=='yes' ) set_caisse($_POST['remise'],'tot_rm',$_SESSION['code_agt'],'ajout',0);
			}   
		  }
 		  if (connection()){
			  for ($i=0; $i<$taille; $i++){
				 //if($detail_plt != '' ) $detail_plt = $detail_plt."|".$index[$i].":".$detail_des[$i] ;
				 //else  $detail_plt = $index[$i].":".$detail_des[$i] ;
				 ////////////////////pack////////
				 $unite_p = get_produit($mouvement[$i][code_p] , 'code_p')->image;
				 if ($unite_p == 'PAC'){		
				     ///////////eclatement pack peinture/////////
					 $PackProd = array();
					 $p = 0;
					 set_mouvt($index_d,$mouvement[$i][code_p],$mouvement[$i][qte],$mouvement[$i][prix],'',$agt); 
					 if($result=mysqli_query($con,"select * from produit_pack where code_p = '".$mouvement[$i][code_p]."' ")){		
					   while($l=mysqli_fetch_object($result)){ 
						 maj_qte_produit( $l->code_pc ,  ($l->coef * $mouvement[$i][qte])/1000, 's');
						 //if(($_SESSION['autoriser_gest_prm']=='yes')&&(get_produit($l->code_pc , 'code_p')->nature =='p')&&(($l->coef * $qte[$i])/1000 > 0)){   
						 if((get_param('autoriser_gest_prm')=='yes')&&(get_produit($l->code_pc , 'code_p')->nature =='p')&&(($l->coef * $mouvement[$i][qte])/1000 > 0)){   						 
							//if ($code_l[$i] == '' ) $code_l[$i] = get_old_lot($mouvement[$i][code_p]);
							if( ! set_prod_peromp($l->code_pc, ($l->coef * $mouvement[$i][qte])/1000,'s',$dat_per[$i],$code_l[$i]) ) return false;
					     }
					   } 
				     } 
				 ///////////////////////////////////
				 }elseif($unite_p[$i] == 'PACK'){
				  ///////////eclatement pack/////////
					 $PackProd = array();
					 $p = 0;
					 set_mouvt($index_d,$mouvement[$i][code_p],$mouvement[$i][qte],$mouvement[$i][prix],'',$agt); 
					 if($result=mysqli_query($con,"select * from produit_pack where code_p = '$index[$i]' ")){		
					   while($l=mysqli_fetch_object($result)){ 
						 maj_qte_produit( $l->code_pc ,  ($l->coef * $mouvement[$i][qte]), 's');
						 /*if((get_param('autoriser_gest_prm')=='yes')&&(get_produit($l->code_pc , 'code_p')->nature =='p')&&(($l->coef * $mouvement[$i][qte]) > 0)){   
							//if ($code_l[$i] == '' ) $code_l[$i] = get_old_lot($index[$i]);
							if( ! set_prod_peromp($l->code_pc, ($l->coef * $mouvement[$i][qte]),'s',$dat_per[$i],$code_l[$i]) ) return false;
					 	 }*/
					   } 
				     } 
					 ///////////////////////////////////
				 }else{
  					 /*if(($_SESSION['autoriser_gest_prm']=='yes')&&(get_produit($index[$i] , 'code_p')->nature =='p')&&($qte[$i] > 0)){   
				        if ($code_l[$i] == '' ) $code_l[$i] = get_old_lot($index[$i]);
						//echo $index[$i]."/".$qte[$i]."/".'s'."/".$dat_per[$i]."/".$code_l[$i];
						if( ! set_prod_peromp($index[$i], $qte[$i],'s',$dat_per[$i],$code_l[$i]) ) return false;
					 }*/
					 if( ! set_mouvt($index_d,$mouvement[$i][code_p],$mouvement[$i][qte],$mouvement[$i][prix],'',$agt)) 
					   return false;
					 else 
					     if( ! maj_qte_produit( $mouvement[$i][code_p],  $mouvement[$i][qte], 's') )return false;
					     // mise a jour des produits qui disposent une correspondance
					     if (($unite_p == 'CRT')||($unite_p == 'FAR')) mysqli_query($con,"update produit set qte = '0' where code_p='$index[$i]' ");  				 
				 }
			  } 
		  }else{ 
		  	if($set_audit_vente!='')set_audit('edit_price_v_vente',2,'Echec ticket avec prix modifié',$rsrc,$index_d,'','',$recu,'',$new_cl->nom,'echec',"$set_audit_vente",'');
			return false;   
		  }
      }else{
	 	affichErreur('Index document null !'); 
		if($set_audit_vente!='')set_audit('edit_price_v_vente',2,'Echec ticket avec prix modifié',$rsrc,$index_d,'','',$recu,'',$new_cl->nom,'echec',"$set_audit_vente",'');
		return false; 
	 }
	 //////// modification du detail documeent pour le detail des palettes
	 set_detail_documt($index_d, $detail_plt);	 
  ?>