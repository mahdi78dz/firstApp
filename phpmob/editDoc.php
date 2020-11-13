<?php
 include "db.php";
 include "VALIDATION.INC.PHP";
// if(isset($_POST['insert']))
 //{
 global $con;	 
 $index_d=(int)$_POST['code_d'];
 $remise=$_POST['remise'];
 $versement=$_POST['versement'];
 $client=$_POST['client'];
 $total=$_POST['total']; 
 $taille = $_POST['nbrLigne'];
 //$mouvement = json_encode($_POST['mouvement']);  
 $mouvement = $_POST['mouvement'];  
 $detail_plt = $_POST['detail_ca'];
 //echo $mouvement[0][code_p]; 
 $agt =8 ;

	 //$index_d = (int)$_POST['tout_facture'];
	 $old_ticket=NULL;	
	 $old_cl =NULL; $new_cl =NULL;
	 //reparer_tables();
	 //if ($_POST['id_doc'] != '') $index_d = (int)$_POST['id_doc']; 
	 //if ($_POST['id_doc_2'] != '') $index_d = (int)$_POST['id_doc_2']; 
	 $_POST['type_bon'] = 'no' ;
	 $_POST['type_paiement'] = 'e';
	 if ( ($index_d != '') && ($index_d != NULL) && ($index_d != 0) ){	      
		  if (connection()){
		      if($r=mysqli_query($con,"select a.alias, d.obs, d.date_s from documt d , agent a where a.code_agt = d.code_agt and d.code_d='$index_d' limit 1") )
			  	 $old_ticket = mysqli_fetch_object($r); 
				 if($_POST['type_bon'] =='yes' ){				 
					$mt_tva =$total*$_SESSION['tva']/100;
					(( $_POST['type_paiement'] == 'e' )? $mt_timbre = $total*$_SESSION['timbre']/100 : $mt_timbre = 0 );  
					(( $_POST['type_paiement'] == 'e' )? $mt_timbre = $total*get_param('timbre')/100 : $mt_timbre = 0 );  
					$mt_ttc = $mt_tva + $total + $mt_timbre;
					$type_bon = 'R';
					$reste = $total + $mt_tva + $mt_timbre - $versement;
				  }else{	
				   $type_bon = 'F' ;
				   $mt_timbre =0;
				   $mt_tva  =0;
				   $mt_ttc = $total;
				   $seq_fac = 0;
				   $reste = $total - $versement;
				  } 					
			      //////////////////////////////////////////////////////
				  //if($_POST['id_doc'] !='') $_POST['tout_facture'] = $_POST['id_doc'];
			      //if($_POST['id_doc_2'] !='') $_POST['tout_facture'] = $_POST['id_doc_2'];
				  
				  $info = get_credit_documt($_POST['tout_facture']);
				  
				  //echo "eee : ".$client."/".$_POST['id_doc']."/".$_POST['tout_facture'];
			      if($client==0){
						if( $info != NULL ){	
							   $old_cl=get_client(get_client_of_documt($index_d)) ;					  
							   if (!delete_credit($info->code_cr)){ 
									affichErreur("La suppression du crédit a échoué!");							
									set_audit('credit_tick',2,'Echec Supp crédit',$rsrc,$index_d,'',$info->reste,'',$old_cl->nom,'','echec',"Ancien crédit par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Modif ticket');
							   }else{ 
									set_audit('credit_tick',2,'Suppression crédit',$rsrc,$index_d,'',$info->reste,'',$old_cl->nom,'','succès',"Ancien crédit par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Modif ticket');
							   }	
						 }
			      }else{
						$new_cl=get_client($client) ;
						if( $info != NULL ){						  
							   $old_cl=get_client(get_client_of_documt($index_d)) ;
							   if (!update_credit_doc($index_d, $client, $reste, $versement, $obs ,$agt)) {
									affichErreur("Mise à jour du crédit a échoué!");
									set_audit('credit_tick',2,'Echec modif crédit',$rsrc,$index_d,'',$info->reste,$reste,$old_cl->nom,$new_cl->nom,'echec',"Ancien crédit par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Modif ticket');							
							   }else{ 
									set_audit('credit_tick',2,'Modif crédit',$rsrc,$index_d,'',$info->reste,$reste,$old_cl->nom,$new_cl->nom,'succès',"Ancien crédit par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Modif ticket');
							   }	   
						 }else{
							   if (!set_credit($client,$index_d,$versement,$reste,'')){
									affichErreur("L'insertion du crédit a échoué!");
									set_audit('credit_tick',2,'Echec ajout crédit',$rsrc,$index_d,'','',$reste,'',$new_cl->nom,'echec',"Ancien crédit par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Modif ticket');							
							   }else{
									set_audit('credit_tick',2,'Ajout crédit',$rsrc,$index_d,'','',$reste,'',$new_cl->nom,'succès',"Ancien crédit par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Modif ticket');
							   }
						 }
			  }
			  if((float)$remise >= 0.0){
				if (!edit_remise($client,$index_d,$remise)){ 
					affichErreur("La modification de la remise a échoué!");
					set_audit('remise',2,'Echec Modif remise',$rsrc,$index_d,'',''.get_remise_documt($index_d),$remise,'',$new_cl->nom,'echec',"Ancienne remise par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Modif ticket');						
				}else{
					set_audit('remise',2,'Modification remise',$rsrc,$index_d,'',''.get_remise_documt($index_d),$remise,'',$new_cl->nom,'echec',"Ancienne remise par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Modif ticket');				
				 }
			  }
 			  if( !mysqli_query($con,"update documt set code_f='$client', obs ='$total' , date_s='".date("Y-m-d H:i:s")."', date_d='".date("Y-m-d")."', code_agt='$agt'  where code_d='$index_d' limit 1") ){
				   affichErreur(" La modification du client a échoué! \n Ignorez ce message si vous n'avez pas modifié le client de ce ticket."); 
				   return false;
			  }
		      if( !delete_mouvt_of_documt($index_d) ){ 
				   echo "Echec de suppression des anciens mouvements"; 
				   if($set_audit_vente!='')
				      set_audit('edit_price_v_vente',2,'Echec M ticket avec prix modifié',$rsrc,$index_d,'','',$total,'',$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s $set_audit_vente",'');
				   set_audit('edit_tick',2,'Echec Modif ticket',$rsrc,$index_d,'',$old_ticket->obs,$total,$old_cl->nom,$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s ",'supp mouvements');
                   return false;
               }
			   ///////////////MODIFICATION DETAIL DOCUMENT////////////////////////////////////////////////////
               $exist_detail = mysqli_query($con,"select * from detail_documt where code_d='$index_d' ");
			   $le = mysqli_fetch_object($exist_detail);	
		       if ($le->code_d != ''){
			  	  //modification dun detail document qui existe deja
	              
				  
				  (($_POST['type_bon'] =='yes' )? (($le->mod_doc == 'F')? $seq_fac = mysql_result(mysql_query("select MAX(seq_facture) from detail_documt "), 0)+1 :$seq_fac = $le->seq_facture)  : $seq_fac = 0);
				  
				  
				  
				  if( !mysqli_query($con,"update detail_documt set seq_facture='$seq_fac',mod_doc='$type_bon',mt_htc='$total',
					 mt_ttc='$mt_ttc',mt_tva='$mt_tva',droit_timbre='$mt_timbre',type_paiement='".$_POST['type_paiement']."',obs='' where code_d='$index_d' limit 1") ){
					 affichErreur(" La modification du detail document a échoué!"); 
					 return false;
				   }
			   }else{
			       
				   //insertion d'un nouveau detail pour un doc qui n'existe pas////
				   (($_POST['type_bon'] =='yes' )?$seq_fac = mysql_result(mysql_query("select MAX(seq_facture) from detail_documt "), 0) + 1 :$seq_fac = 0);   	
				   
				   if(!mysqli_query($con,"insert into detail_documt ( code_d,seq_facture,mod_doc,mt_htc,mt_ttc,mt_tva,droit_timbre,type_paiement,obs ) 
			       values ( '$index_d','$seq_fac','$type_bon','$total','$mt_ttc','$mt_tva','$mt_timbre','$type_paiement','' )")){
					affichErreur(" L' insertion d'un detail document a échoué!"); 				   
				    return false ;
				}
			   }
			  ///////////////FIN MODIFICATION DETAIL DOCUMENT///////////////////////////////////////////							
			  for ($i=0; $i<$taille; $i++){
					 ////////////////////////////////////////// 
   					/*if(($_SESSION['autoriser_gest_prm']=='yes')&&(get_produit($index[$i] , 'code_p')->nature =='p')&&($qte[$i] > 0)){   
						if( ! set_prod_peromp($index[$i], $qte[$i],'s',$dat_per[$i],$code_l[$i]) ) return false;
					    //$code_l = get_detail_lot_date($index[$i],$dat_per[$i])->code_l;
					}*/
    		         //if($detail_plt != '' ) $detail_plt = $detail_plt."|".$index[$i].":".$detail_des[$i] ;
				     //else  $detail_plt = $index[$i].":".$detail_des[$i] ;
					if( ! set_mouvt($index_d,$mouvement[$i][code_p],$mouvement[$i][qte],$mouvement[$i][prix],'',$agt)) {
						set_audit('edit_tick',2,'Echec Modif ticket',$rsrc,$index_d,$mouvement[$i][code_p],$old_ticket->obs,$total,$old_cl->nom,$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s",'ajout mouvements'); 
						if($set_audit_vente!='')set_audit('edit_price_v_vente',2,'Echec M ticket avec prix modifié',$rsrc,$index_d,'','',$total,'',$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s $set_audit_vente",'');
						return false; 	
					}
					// VERIFICATION EN CAS D UN PRODUIT PACK
				         // echo "unite ;".is_produit_pack($index[$i]);
					if (is_produit_pack($mouvement[$i][code_p]) == 'PAC'){
						if($res=mysqli_query($con,"select * from produit_pack where code_p = '$index[$i]' ")){		
						   while($m=mysqli_fetch_object($res)){ 
								if( ! maj_qte_produit( $m->code_pc , ($m->coef * $mouvement[$i][qte])/1000 , 's') ){
									if($set_audit_vente!='')set_audit('edit_price_v_vente',2,'Echec M ticket avec prix modifié',$rsrc,$index_d,'','',$total,'',$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s $set_audit_vente",'');
									set_audit('edit_tick',2,'Echec Modif ticket',$rsrc,$index_d,$m->code_pc,$old_ticket->obs,$total,$old_cl->nom,$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s",'maj qte stock'); 
									return false; 	
								}					
						   } 
						 }
					}elseif(is_produit_pack($mouvement[$i][code_p]) == 'PACK'){	  
					      if($res=mysqli_query($con,"select * from produit_pack where code_p = '$index[$i]' ")){		
						   while($m=mysqli_fetch_object($res)){ 
								if( ! maj_qte_produit( $m->code_pc , ($m->coef * $mouvement[$i][qte]) , 's') ){
									if($set_audit_vente!='')set_audit('edit_price_v_vente',2,'Echec M ticket avec prix modifié',$rsrc,$index_d,'','',$total,'',$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s $set_audit_vente",'');
									set_audit('edit_tick',2,'Echec Modif ticket',$rsrc,$index_d,$m->code_pc,$old_ticket->obs,$total,$old_cl->nom,$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s",'maj qte stock'); 
									return false; 	
								}					
						   } 
						 }
					}else{
					   if( ! maj_qte_produit( $mouvement[$i][code_p] , $mouvement[$i][qte], 's') ){
							if($set_audit_vente!='')set_audit('edit_price_v_vente',2,'Echec M ticket avec prix modifié',$rsrc,$index_d,'','',$total,'',$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s $set_audit_vente",'');
							set_audit('edit_tick',2,'Echec Modif ticket',$rsrc,$index_d,$mouvement[$i][code_p],$old_ticket->obs,$total,$old_cl->nom,$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s",'maj qte stock'); 
							return false; 	
						}
					}
 			  } 
 		  }
     }else{
	 	affichErreur('index document null 000!'); 
		if($set_audit_vente!='')set_audit('edit_price_v_vente',2,'Echec M ticket avec prix modifié',$rsrc,$index_d,'','',$total,'',$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s $set_audit_vente",'');
	 	set_audit('edit_tick',2,'Echec Modif ticket',$rsrc,$index_d,'',$old_ticket->obs,$total,$old_cl->nom,$new_cl->nom,'echec',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s",'code ticket NULL');
		return false; 
	 }
	 //$_SESSION['edited_doc']='yes';
	 //$_SESSION['to_print_doc']=$index_d;
     /*
 	 if (($_SESSION['autorise_fidelite']=='yes')&&($_POST['id_fidelite'] != '' )){ 	
	    if( verif_doc_fidelite($index_d,$_POST['id_fidelite']) != 'existe'){ 
		    set_fidelite_cl($_POST['id_fidelite'],$index_d,$_SESSION['code_agt'],(float)$_POST['remise']); 
		}else{
            delete_fidelite_cl(get_client_doc_fidelite($index_d),$index_d,get_remise_documt($index_d)); 
			set_fidelite_cl($_POST['id_fidelite'],$index_d,$_SESSION['code_agt'],(float)$_POST['remise']); 
		} 
	  }*/	
		/*	 
	 if( ($_SESSION['can_print'] =='yes' ) || ($_SESSION['can_print'] =='key' && $_POST['print_ticket'] =='print' ) ){ 		
	   if( $_SESSION['default_printer'] =='a4' ) print_bon($index_d,$_POST['type_paiement'],$_POST['type_bon'],$_POST['versement']);
	   elseif( $_SESSION['default_printer'] =='tick' ) print_ticket();	 
	   elseif( $_SESSION['default_printer'] =='' ){
	   			if (($_SESSION['type_client'] == 1  )||($_SESSION['type_client'] == ''   )) print_ticket();	
				elseif(($_SESSION['type_client'] == 3 )||($_SESSION['type_client'] == 2 ))  print_bon($index_d,$_POST['type_paiement'],$_POST['type_bon'],$_POST['versement']);
	   }		
	 }*/
	 if($set_audit_vente!='')set_audit('edit_price_v_vente',2,'Modif ticket avec prix modifié',$rsrc,$index_d,'','',$total,'',$new_cl->nom,'succès',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s $set_audit_vente",'');
	 set_audit('edit_tick',2,'Modif ticket',$rsrc,$index_d,'',$old_ticket->obs,$total,$old_cl->nom,$new_cl->nom,'succès',"Ancien ticket par $old_ticket->alias à $old_ticket->date_s",'');
    set_detail_documt($index_d, $detail_plt);	
 	 
  ?>