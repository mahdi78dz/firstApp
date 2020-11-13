<?php
include "db.php";
include "VALIDATION.INC.PHP";
global $con;	 
$agt = 8 ;
$index_d=(int)$_POST['code_d'];
$cod_cl=''.get_client_of_documt($index_d);
$old_cl=NULL; 
$old_ticket=NULL;
$rsDel=true;				  
$remis = get_remise_documt($index_d);
//if (connection())
	  if($r=mysqli_query($con,"select a.alias, d.obs,d.date_s from documt d,agent a where a.code_agt=d.code_agt and d.code_d='".$index_d."' limit 1"))
	  $old_ticket = mysqli_fetch_object($r);				  
	  if($cod_cl!='0' && $cod_cl!=''){
		$old_cl=get_client($cod_cl) ;
		$info = get_client_credit_documt($client,$index_d);
	  }
	 // echo "le document : ".$index_d."/".$_POST['code_d'] ;
	  $recu = get_recu_fact($index_d);
      if ( supprimer_documt($index_d) ){
		     if(if_existe_doc_fidelite($index_d) == 'existe')  del_fidelite($index_d); 
			 $a_Erreur='';          
			 if($old_cl!=NULL){
				if (!delete_credit_doc($index_d) ){ 
					$a_Erreur="la suppression du crédit a échoué! (Ignorer ce message si le ticket ne contient pas de crédit)."; 
					set_audit('credit_tick',2,'Echec supp crédit',$rsrc,$index_d,'',$reste,'',$old_cl->nom,'','echec',"Ancien crédit par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Supp ticket');							
				}else{ 
				  set_audit('credit_tick',2,'Suppression crédit',$rsrc,$index_d,'',$reste,'',$old_cl->nom,'','succès',"Ancien crédit par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Supp ticket');							
				}
			 }
			 if($remis>0){
				if(!delete_remise($index_d) ){ 
					$a_Erreur=$a_Erreur."\nla suppression de la remise a échoué!";
					set_audit('remise',2,'Echec supp remise',$rsrc,$index_d,'',$remis,'',$old_cl->nom,'','echec',"Ancienne remise par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Supp ticket');					 
				}else{
				   set_audit('remise',2,'Suppression remise',$rsrc,$index_d,'',$remis,'',$old_cl->nom,'','succès',"Ancienne remise par $old_ticket->alias à $old_ticket->date_s ($old_ticket->obs)",'pour Supp ticket');
				}   
			 }
			 if($a_Erreur!='') affichErreur($a_Erreur);					 
			 set_audit('delete_tick',2,'Suppression ticket',$rsrc,$_POST['tout_facture'],'',$recu,'',$old_cl->nom,'','succès',"Ticket par $old_ticket->alias 
			 à $old_ticket->date_s ($old_ticket->obs)",'');
			 $rsDel=true;
      }else{
			 affichErreur("Une erreur est produite lors de la suppression de document!");
			 set_audit('delete_tick',2,'Echec supp ticket',$rsrc,$index_d,'',$recu,'',$old_cl->nom,'','echec',"Ticket par $old_ticket->alias 
			 à $old_ticket->date_s ($old_ticket->obs)",'');					  
			 $rsDel=false;
      }
      if($rsDel)echo "success";
      else echo "error";

 	 
  ?>