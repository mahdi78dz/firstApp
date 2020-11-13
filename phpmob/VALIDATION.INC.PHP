<?php 
 $con=mysqli_connect("localhost","root","","cab_db");
function connection(){
	//header("Access-Control-Allow-Origin: *");
	if(  $con=mysqli_connect("localhost","root","","cab_db") ) return true;
	else{ 
	   affichErreur("Impossible d'établir la connexion !");
	   return false;
	}
}
function get_my_last_doc(){
	global $con;
      if (connection()){
 		  if($result=mysqli_query($con,"select code_d from documt order by code_d desc limit 0,1 ")){									             $l = mysqli_fetch_object($result);	
			  return $l->code_d;							
		  }
	  }	  
	  return 0 ;	 
}

function affichErreur($str){ 
  echo "<script language='JavaScript'> alert('Erreur: ' + '$id' + ' \\n".addslashes($str)." ');</script>";     
}

function creer_documt($ref, $date_d, $type, $frnsr, $obs,$agt){
	  global $con;
	  $date_s = date("Y-m-d H:i:s"); 
	  if (($date_d=='')||($date_d==NULL) ) $date_d = date("Y-m-d"); 	  
	  //$c_agt = $_SESSION['code_agt'];
	 
	  if (connection())
	   if(mysqli_query($con,"insert into documt ( ref_d,date_d,type_d,code_agt,date_s,code_f,obs ) values ( '$ref','$date_d','$type','$agt','$date_s','$frnsr','$obs' )"))
		return true;	  
	    //echo "creer !!";	  
	    return false ;	 
}

function creer_detail_documt($index,$type_bon,$mt_htc,$type_paiement,$comment ){
	 global $index_d ,$total,$con;
	 $mt_htc = $total;
	 if( $type_bon == 'yes' ){
		$mt_tva = $mt_htc*$_SESSION['tva']/100 ;
		(( $type_paiement == 'e' )? $mt_timbre = $mt_htc*$_SESSION['timbre']/100 : $mt_timbre = 0 );  
	    $mt_ttc = $mt_tva + $mt_htc + $mt_timbre;
		$type_bon = 'R';
        $seq_fac = mysql_result(mysql_query("select MAX(seq_facture) from detail_documt "), 0) + 1;   		
	 }else{	
	   $type_bon = 'F' ;
	   $mt_timbre =0;
	   $mt_tva  =0;
	   $mt_ttc =$mt_htc;
	   $seq_fac =0;
	   //$type_paiement = $_POST['type_paiement'];
	 }  
	  if (connection())
	   //echo "type:".$index."/".$seq_fac."/".$type_bon."/".$mt_htc."/".$mt_ttc."/".$mt_tva."/".$mt_timbre."/".$type_paiement;
		if(mysqli_query($con,"insert into detail_documt ( code_d,seq_facture,mod_doc,mt_htc,mt_ttc,mt_tva,droit_timbre,type_paiement,obs ) values ( '$index','$seq_fac','$type_bon','$mt_htc','$mt_ttc','$mt_tva','$mt_timbre','$type_paiement','$comment' )"))
		return true;	  
	  return false ;	 
}


function get_client($code_cl){
  global $con;
  if( connection()){
	  if($result=mysqli_query($con,"select * from  client  where '$code_cl' = code_cl ")){			
		$cli = mysqli_fetch_object($result) ;
		return $cli;
	  }
  }
  return NULL ;	
} 
function set_remise($client,$index_d,$remise){
  global $con;
  if( connection()){
	   mysqli_query($con,"insert into remise_cl (code_cl,code_d,remise) values ('$client','$index_d','$remise' )");		   
	   return true;
  }		  
  return false;	
}
function set_audit($param_audit,$ri,$action,$src,$cd,$cp,$oldval,$newval,$oldconcerned,$newconcerned,$option,$obs,$obs2){ 
	  global $con;
	  if($param_audit!='parametrage')
	  	if(  !isset($_SESSION[$param_audit]) || !($_SESSION[$param_audit]=='true')  ) return false;
	  $date = date("Y-m-d");
	  $heure = date("H:i:s");	
	  $des_p = get_produit_des_code_p($cp);
	  $agt = $_SESSION['code_agt']; 
	  $host = $_SESSION['host'];
	  if( connection()){
		   return mysqli_query($con,"insert into audit (risque,code_agt,action,source,date,heure,code_d,code_p,des_p,old_value,new_value,old_concerned,new_concerned,host,option_action,obs,obs2) values ('$ri','$agt','$action','$src','$date','$heure','$cd','$cp','$des_p','$oldval','$newval','$oldconcerned','$newconcerned','$host','$option','$obs','$obs2')");		   
	  }
	  return false;		
} 
function get_produit_des_code_p($code_p){
	global $con;
	if (connection()){	
	  if($result=mysqli_query($con,"select des_p from produit where  code_p = '$code_p' ")){
		  $l = mysqli_fetch_object($result);	
		  return $l->des_p;							
	   }
	 }
	return NULL ;	 
}
function get_detail_doc($code_d){
global $con;
 	  if (connection()){	
		  if($result=mysqli_query($con,"select * from detail_documt where code_d = '$code_d' ")){
			  return mysqli_fetch_object($result);					
		  }
	  }
	  return NULL ;	 
}
function set_credit($client,$index_d,$versement,$reste,$obs,$agt){
 global $con;
  $date = date("Y-m-d");
  if( connection()){
	   mysqli_query($con,"insert into credit_cl (code_cl,code_d,reste,versement,date,code_agt,obs) values ('$client','$index_d','$reste','$versement','$date','$agt','$obs')");		   
	   return true;
  }		  
  return false;	
}

function set_mouvt($cd, $cp, $qte, $prix,$code_l,$agt){
	   global $con;
	   $code_mv ='';$prix_acht=0;
	   $date_mv = date("Y-m-d"); 
	   $heure_mv = date("H:i:s"); 
	   $prix_acht=get_detail_prod_annexe($cp)->Prix_Achat;
	   $pump =round (get_detail_prod_annexe($cp)->col6,4);
	   $type_mv = get_detail_documt($cd)->type_d;
	   $type_p = get_produit($cp , 'code_p')->type_p;
	   $val_v = $qte*$prix;
	   $val_as = $prix_acht*$qte;
	   $val_ap = $pump*$qte;
	   $ben_as = $val_v-$val_as;	   
	   $ben_ap = $val_v-$val_ap;	   	   
	  if(mysqli_query($con,"insert into mouvt ( code_d,code_p,qte_mv, prix,pump,prix_as,val_v,val_as,val_ap,ben_as,ben_ap,code_agt,type_mv,type_p,date_mv,heure_mv,code_l) 
	                              values ( '$cd', '$cp', '$qte', '$prix','$pump','$prix_acht','$val_v','$val_as','$val_ap','$ben_as','$ben_ap','$agt','$type_mv','$type_p','$date_mv','$heure_mv','$code_l' ) ")){
		 return true;
	  }
	  return false ;	 
}
function get_detail_documt($code_d){
	  global $con;
	  if($r=mysqli_query($con," select * from documt where code_d = '$code_d' ")) 
	     if($l = mysqli_fetch_object($r)) return $l;	  
	  return '';	 
}
function get_all_detail_documt($code_d){
	  global $con;
	  if($r=mysqli_query($con," select * from documt d left join detail_documt dt on d.code_d=dt.code_d where d.code_d = '$code_d' ")) 
	     if($l = mysqli_fetch_object($r)) return $l;	  
	  return '';	 
}
function get_detail_prod_annexe($code){
  	    global $con;
		if (connection()){	
		  if($result=mysqli_query($con,"select * from produit_annexe where  code_p = '$code'")){
			  $l = mysqli_fetch_object($result);	
			  //$prix_ach = $l->Prix_Achat;							   
			  return $i;							
		   }
	     }
	  return NULL ;	 
}
function get_produit($code , $attribut){
  	    global $con;
		if (connection()){	
		  //set_char_arabe();
		  if($result=mysqli_query($con,"select * from produit where $attribut='$code'  ")){
			$num = mysqli_num_rows($result);
			if( $num == 1 ) return mysqli_fetch_object($result);					
 		  }
	    }
	  return NULL ;	 
}
function maj_qte_produit( $cp, $qte, $operation){
    global $con;
	if( $operation == 'e') {
		   if (is_produit_pere($cp) =='existe'){
		       $c=get_base($cp); 
			   if($c > 0){ 
			     $coef=get_coef($cp); 
			     $cp=$c; 
			   }
			   $requete =	"update produit set qte = round(qte + $qte*$coef, 4 ) where code_p = '$cp' ";	  		 
		   }else  $requete =	"update produit set qte = round(qte + '$qte', 4) where code_p = '$cp' ";	  
    }elseif( $operation == 's'){ 
		   if (is_produit_pere($cp) =='existe'){
		       $c=get_base($cp); 
			   if($c > 0){ 
			     $coef=get_coef($cp); 
			     $cp=$c; 
				}
			   $requete =	"update produit set qte = round(qte - $qte*$coef, 4 ) where code_p = '$cp' ";	  		 
		    }else{ 
		        $requete =	"update produit set qte = round(qte - '$qte' ,4) where code_p = '$cp' ";
			}
	 }else return false;   
	 if(mysqli_query($con,$requete))  return true;  
	 return false ;	 
}
function is_produit_pere($code_p){ 
      global $con;
	  if( connection())
		 if($result=mysqli_query($con,"select * from produit_corresp where code_p ='$code_p' "))	{
			$num = mysqli_num_rows($result);
			if ($num >=1) return 'existe';
		 }	
	  return  '';
} 
function get_base($code_p){  	         	   
     global $con;
	  if( connection())
		 if($result=mysqli_query($con,"select code_b from produit_corresp where code_p ='$code_p' "))	{
			$num = mysqli_num_rows($result);
			if ($num >1) {affichErreur("Ce produit (code: $code_p) a plusieurs produits de base! Ce problème doit etre réglé."); return -1;}
			elseif ($num == 0) $code_b = 0;
			else {$l=mysqli_fetch_object($result); $code_b = $l->code_b;}
	     } 
	  return  $code_b;
} 
function get_coef($code){
      global $con;
	  if( connection())
		  if ($res = mysqli_query($con,"select rap from produit_corresp where  code_p = '$code' "))			
		      if (mysqli_num_rows($res) > 0){
			      $l=mysqli_fetch_object($res);
				  return $l->rap;			      
			  }
	  return '';	
}
function get_old_lot($cp){
 global $con;
      if (connection()){	
		  if($result=mysqli_query($con,"select * from produit_prm where  code_p = '$cp' and qte_lot > 0  order by date_p asc limit 0,1 ")){						         
			  return mysqli_fetch_object($result)->code_l;								
		  }
	  }	  
	  return 0 ;	 
}
function set_prod_peromp($cp,$qte,$action,$dat_per,$code_l){
global $con;
  if( $action == 'e'){
		//echo "<br>".$dat_per."/";
		if(verif_prod_lot($cp,formater_to_bdd($dat_per)) == 1 ){
			 if(mysqli_query($con,"update produit_prm set qte_lot = qte_lot + '$qte' where date_p = '".formater_to_bdd($dat_per)."'  and code_p = '$cp' ")){
			  init_qte_produit_prm($cp); 	
			  return true;	 	 
			  }
		}else{
		//echo "insert into produit_prm ( code_p,qte_lot,date_p) values ( '$cp', '$qte', '".formater_to_bdd($dat_per)."') ";
			 if(mysqli_query($con,"insert into produit_prm ( code_p,qte_lot,date_p) values ( '$cp', '$qte', '".formater_to_bdd($dat_per)."') ")){
			  init_qte_produit_prm($cp); 	
			  return true;	
			  }
		}
  }elseif( $action == 's'){
			if(mysqli_query($con,"update produit_prm set qte_lot = qte_lot-'$qte' where code_l = '$code_l' ")){
			 init_qte_produit_prm($cp); 	
			 return true;	 	 
			 }
 }elseif( $action == 'ae'){
		//echo "update produit_prm set qte_lot = qte_lot-'$qte' where code_l = '$code_l' ";
		if(verif_prod_lot($cp,formater_to_bdd($dat_per)) == 1 ){
			if(mysqli_query($con,"update produit_prm set qte_lot = qte_lot-'$qte' where code_l = '$code_l' ")){
			 init_qte_produit_prm($cp); 	
			 return true;	 	 
			 }
		}else{
		//echo "insert into produit_prm ( code_p,qte_lot,date_p) values ( '$cp', '$qte', '".formater_to_bdd($dat_per)."') ";
			 if(mysqli_query($con,"insert into produit_prm ( code_p,qte_lot,date_p) values ( '$cp', '0', '".formater_to_bdd($dat_per)."') ")){
			  init_qte_produit_prm($cp); 	
			  return true;	
			  }
		}
 }
  
  return false ;	 
}
function verif_prod_lot($cp,$date){
global $con;
      if (connection()){	
	  //echo "select * from produit_prm where  code_p = '$cp' and date_p = '$date' ";
		  if($result=mysqli_query($con,"select * from produit_prm where  code_p = '$cp' and date_p = '$date' ")){						         
			 $num = mysqli_num_rows($result);
			 if ($num >= 1) return 1;						
		  }
	  }	  
	  return 0 ;	 
}
function formater_to_bdd($date){
	@list($jour,$mois,$annee)=explode('-',$date);
	return date("Y-m-d", mktime(0,0,0,$mois,$jour,$annee));
}
function init_qte_produit_prm($code){
   global $con;
	  if( !connection()) return false;
	  	  if( mysqli_query($con,"update produit_prm set qte_lot=0  where code_p='$code' and qte_lot < 0 ")) return true;
	  return false;	
}
function get_param($par){
global $con;
      if (connection()){	
		  if($result=mysqli_query($con,"select * from param where nom ='$par' ")){						         
			  $l = mysqli_fetch_object($result);	
			  if ( $l->valeur != '' ) return $l->valeur;							  
			  else return $l->defaut;							  
		  }
	  }	  
	  return false ;	 
}
function get_credit_documt($d){  	
	  global $con;
	  $code_d = (int)$d;
	  if( connection()){
		  if($result=mysqli_query($con,"select reste,versement from  credit_cl  where '$code_d' = code_d  ")){			
			//$li = mysql_fetch_object($result) ;
			return mysqli_fetch_object($result);	
		  }
	  }
	  return '' ;	
}
function get_client_of_documt($c_d){  	
	  global $con;
	  $code_d = (int)$c_d;
	  if( connection()){
		  if($result=mysqli_query($con,"select code_f from  documt  where '$code_d' = code_d and type_d='s'  ")){			
			$li = mysqli_fetch_object($result) ;
			return $li->code_f;
		  }
	  }
	  return '' ;	
} 
function delete_credit($code_cr){ // suppression credit 
	  global $con;
	  if( connection() ){ 
	     //$versement_old = get_credit_cl($code_cr)->versement;
		 //$code_cl = get_credit_cl($code_cr)->code_cl;
		 mysqli_query($con,"delete from credit_cl where code_cr='$code_cr' ");
	     //update_tot_versement_cl($versement_old,0,$code_cl);
		 return true;  
	  }	 
	  return false;	
}
function update_credit_doc($code_d, $code_cl, $reste, $versement, $obs,$agt){ // maj crédit	 
	  global $con;
	  $date_d = date("Y-m-d"); 	
	  if( connection() ){	      	      
	   return mysqli_query($con,"update credit_cl set code_cl='$code_cl', reste='$reste', versement='$versement',date='$date_d' ,obs='$obs', code_agt='$agt' where code_d='$code_d' LIMIT 1");	
	  }
	  return false;	
}
function get_remise_documt($c_d){  	
	  global $con;
	  $code_d = (int)$c_d;
	  if( connection()){
		  if($result=mysqli_query($con,"select remise from  remise_cl  where '$code_d' = code_d ")){			
			$li = mysqli_fetch_object($result) ;
			return $li->remise;
		  }
	  }
	  return 0 ;	
} 
function delete_mouvt_of_documt($c_d){
	  global $con;
	  //if (!connection()) return false;
	  if( connection()){
	  $operation = get_type_documt($c_d);
	  //en cas d avoir affectation des operations de base 'e' et 's'
	  if ($operation=='as') $operation = 'e';
	  if ($operation=='ae') $operation = 's';
	  if ($operation=='rb') $operation = 's';
	  ////////////////////////////////////////////////////////////
	  if($operation=='') return false;
	  if($result=mysqli_query($con,"select * from mouvt where code_d = '$c_d' ")){
	     $i=1;
		 
		 while($l = mysqli_fetch_object($result) ){
			$i++;
			//$qte_lot = get_detail_lot($code_l)->code_l;
			if (is_produit_pack($l->code_p) == 'PAC'){					
				 if($res=mysqli_query($con,"select * from produit_pack where code_p = '$l->code_p' ")){		
				   while($m=mysqli_fetch_object($res)){ 
     			            if( !cancel_qte_produit( $m->code_pc, $l->qte_mv*$m->coef/1000, $operation) ) return false;
							cancel_qte_lot($m->code_pc,$l->qte_mv*$m->coef/1000,$l->code_l ,$operation);				
				   } 
				 } 
			}elseif (is_produit_pack($l->code_p) == 'PACK'){
			     if($res=mysqli_query($con,"select * from produit_pack where code_p = '$l->code_p' ")){		
				   while($m=mysqli_fetch_object($res)){ 
     			            if( !cancel_qte_produit( $m->code_pc, $l->qte_mv*$m->coef, $operation) ) return false;
							cancel_qte_lot($m->code_pc,$l->qte_mv*$m->coef,$l->code_l ,$operation);								
				   } 
				 }
			}else{
			  if( !cancel_qte_produit( $l->code_p, $l->qte_mv, $operation) ) return false;
			  //echo $l->code_p."/".$l->qte_mv."/".$code_l;
			  cancel_qte_lot($l->code_p,$l->qte_mv,$l->code_l,$operation);				
			  //Mif( !ajuster_pump(get_mouvt_detail($c_d,$l->code_p)->code_mv_d,'',$l->code_p,'supprimer',$c_d,$l->qte,$l->prix));								
			}
		 } 
	  }
	  if(mysqli_query($con," delete from mouvt where code_d = '$c_d' ")){
	       //mysql_query(" delete from detail_mouvt where code_d = '$c_d' and type_mv='BS' ");
		   return true;	  
	  }	 
	  }
	  return false ;	 
}
function get_type_documt($code_d){
	  global $con;
	  if( connection()){
	  if($r=mysqli_query($con," select type_d from documt where code_d = '$code_d' ")) 
	     if($l = mysqli_fetch_object($r)) return $l->type_d;
	  }
	  return '';	 
}
function is_produit_pack($code_p){ 
		global $con;
          if( connection())
		 if($result=mysqli_query($con,"select image from produit where code_p ='$code_p' "))	{
			$pack = mysqli_fetch_object($result);
			return $pack->image;
		 }
	  	
	  return  '';
}

function get_client_credit_documt($c,$d){  	
	  $code_d = (int)$d;
	  $code_c = (int)$c;
	  global $con;
	  if( connection()){
		  if($result=mysqli_query($con,"select reste,versement from  credit_cl  where '$code_d' = code_d and code_cl='$code_c'  ")){			
			//$li = mysql_fetch_object($result) ;
			return mysqli_fetch_object($result);	
		  }
	  }
	  return '' ;	
} 
function cancel_qte_produit( $cp, $qte, $operation){
      global $con;
	  $prix_pump =0;
	  $anc_qte=0;
	  if( $operation == 'e'){ 
		   if (is_produit_pere($cp) =='existe'){
		       $c=get_base($cp); 
			   if($c > 0){ $coef=get_coef($cp); 
			               $cp=$c; 
						 }
				 $requete =	"update produit set qte = round(qte - $qte*$coef ,4) where code_p = '$cp' ";	  		 
		   }else{
	             $requete =	"update produit set qte = round(qte - '$qte' , 4) where code_p = '$cp' ";	  
		   }
	  }elseif( $operation == 's') $requete = "update produit set qte = round(qte + '$qte', 4) where code_p = '$cp' ";
	  else return false; 	  
	  if(mysqli_query($con,$requete))  return true; 	   
	  return false ;	 
}
function get_recu_fact($code_d){
		  global $con;
	if( connection() ){	
		if ( $res=mysqli_query($con,"select obs from documt  where code_d ='$code_d'") ){	
                 	 $row=mysqli_fetch_array($res);
					 return $row[0];					 
		}
	} 
}
function supprimer_documt($code_d){ 
	  global $con;
	//echo "****** à supprimer *******:".$code_d;
	if( !connection() ) return false;
	$type_d = get_type_documt($code_d);  //echo "<br />type = ".$type_d;	 
	if($type_d == ''){  affichErreur("L'extraction du type de document a échoué! "); return false; }	
	if ( !delete_mouvt_of_detail_documt($code_d) ){ affichErreur( " probleme suppression des details mouvements du document: $code_d! "); return false;}
	if ( !delete_mouvt_of_documt($code_d) ){ affichErreur( " probleme suppression des mouvements de document: $code_d! "); return false;}
	if ( !delete_detail_documt($code_d) ){ affichErreur( " Echec de suppression du détail document: $code_d! "); return false;}	
	if ( !delete_documt($code_d) ){ affichErreur( " Echec de suppression de document: $code_d! "); return false;}
	return true;
}
function delete_mouvt_of_detail_documt($c_d){
		  global $con;
	  if (!connection()) return false;
	  //echo "ddddd";
	  if($result=mysqli_query($con,"select * from mouvt where code_d = '$c_d' ")){
	     $i=1;
		 while($l = mysqli_fetch_object($result) ){
			$i++;
 		    ////////////////// ajuster pump /////////////////////////////////
			if (get_type_documt($c_d) == 'e' ){
				$detail_mv=get_mouvt_detail($c_d,$l->code_p);
			    $code_mv=$detail_mv->code_mv_d;
				//echo $code_mv."/".$c_d."/".$l->code_p;
				delete_detail_mouvt($code_mv,$c_d,$l->code_p);
				//if(($pump == 0)||($pump == '')) set_pump($l->code_p);
			}
			/////////////////////////////////////////////////////////////////
		 } 
		 return true;
	  }
	  return false ;	 
}
function delete_detail_mouvt($code_mv,$code_d,$index){
		  global $con;
 $new_pump = 0; 
 $first_ligne = 0;
 $val_qte = 0;
 if($result=mysqli_query($con,"SELECT * FROM `detail_mouvt` WHERE  code_p='$index' and code_mv_d >='$code_mv' order by code_mv_d asc ")){		
		while($l=mysqli_fetch_object($result)){ 
			  if( $first_ligne == 1){
				//$qte_stk = $l->qte_stk + $val_qte; // initialisation pour la prochaine ligne
				 $new_pump = round((($l->qte * $l->prix ) + ($ex_pump * $qte_stk ))/($l->qte + $qte_stk ) ,4)  ;
				 mysqli_query($con,"update detail_mouvt set   qte_stk='$qte_stk' , ex_pump='$ex_pump', new_pump='$new_pump' where code_d = '$l->code_d' and code_p='$index'  ");
     			 $ex_pump=$new_pump;
				 $qte_stk = $qte_stk + $l->qte ;
			  }elseif( $first_ligne == 0){	 
 				 $ex_pump=$l->ex_pump;
				 $qte_stk = $l->qte_stk;
				 mysqli_query($con,"delete from detail_mouvt where code_mv_d = '$code_mv'  ");
				 //$ex_pump=$new_pump;
				 $first_ligne = 1;
			  }	 
		}
        mysqli_query($con,"update produit_annexe set col6='$new_pump' where code_p='$index'  ");
  }	
  }
function delete_detail_documt($c_d){
		  global $con;
	  if (!connection()) return false;	  
	  if(mysqli_query($con," delete from detail_documt where code_d = '$c_d' ")) return true;	  
	  return false ;	 
}
function delete_documt($c_d){
		  global $con;
	  if (!connection()) return false;	  
	  if(mysqli_query($con," delete from documt where code_d = '$c_d' ")) return true;	  
	  return false ;	 
}


function if_existe_doc_fidelite($cd){
		  global $con;
	  if( connection())
		 if($result=mysqli_query($con,"select * from historique_fidelite  where code_d = '$cd'  "))	{
			$num = mysqli_num_rows($result);
			if ($num >= 1) return 'existe';
		 }	
	  return  '';
}
function set_fidelite_cl_doc($cf,$cd,$code_agt){  	
		  global $con;
  if ( if_existe_client_fidelite($cf) != 'existe'){
   	  if(mysqli_query($con,"INSERT INTO `cab_db`.`client_fidele` (`code_cf`,date_c,code_agt) VALUES ('$cf','".date("Y-m-d")."','".$_SESSION['code_agt']."');  ")){ 
	      if ( if_existe_doc_fidelite($cd) != 'existe'){
			  mysqli_query($con,"INSERT INTO `cab_db`.`historique_fidelite` (`code_cf`,`code_d`,`code_agt`,`date`,`heure`) VALUES ('$cf','$cd','$code_agt','".date("Y-m-d")."','".date("H:i:s")."');  "); 
			 
		   }else{
		   	  mysqli_query($con,"update `cab_db`.`historique_fidelite` set  `code_cf` = '$cf' where code_d='$cd' ");   
		   } 
		   // echo " update client_fidele set date_der_v = '".date("Y-m-d H:i:s")."'  where code_cf='$cf' " ;
		   mysqli_query($con," update client_fidele set date_der_v = '".date("Y-m-d H:i:s")."'  where code_cf='$cf' " ); 	  
	  }else return false;
  }else{	  
	      if ( if_existe_doc_fidelite($cd) != 'existe')
			  mysqli_query($con,"INSERT INTO `cab_db`.`historique_fidelite` (`code_cf`,`code_d`,`code_agt`,`date`,`heure`) VALUES ('$cf','$cd','$code_agt','".date("Y-m-d")."','".date("H:i:s")."');  "); 
		   else
		   	  mysqli_query($con,"update `cab_db`.`historique_fidelite` set  `code_cf` = '$cf' where code_d='$cd' ");  
	     // echo " update client_fidele set date_der_v = '".date("Y-m-d H:i:s")."'  where code_cf='$cf' " ;
		 mysqli_query($con," update client_fidele set date_der_v = '".date("Y-m-d H:i:s")."'  where code_cf='$cf' " ); 	  		   
  } 
  return true;	  	  
}
function del_fidelite($cd){ 
  		  global $con;
  $cf = get_client_doc_fidelite($cd);
  if ( if_existe_doc_fidelite($cd) == 'existe'){
     //mysql_query(" delete from `historique_fidelite` where code_d = '$cd' ");
	 mysqli_query($con," update client_fidele set date_der_v = '".date("Y-m-d H:i:s")."'  where code_cf='$cf' " ); 
  	 return true;
  }
}
function delete_fidelite_cl($cf,$index_d,$rm){
		  global $con;
  if( connection()){
	   mysqli_query($con," update client_fidele set date_der_v = '".date("Y-m-d")."' , nbr_visite=nbr_visite - 1, nbr_tick=nbr_tick - 1, mt_remise=mt_remise - $rm where code_cf='$cf' " ); 	  	
	   fideliser_doc($cd,$cf);
  }
}
function get_client_doc_fidelite($cd){  	
	   global $con;
	  if( connection()){
		  if($result=mysqli_query($con,"select obs2 from  detail_documt where code_d='$cd'")){			
			 $li = mysqli_fetch_object($result) ;
			 return $li->obs2;
		  }
	  }
	  return '' ;	
}	
function set_var_fidelite($cf,$par,$var){  	
 global $con;
  if( if_existe_client_fidelite($cf) == 'existe')
    if( mysqli_query($con," update client_fidele set date_der_v = '".date("Y-m-d H:i:s")."'  where code_cf='$cf' " ) )  return true; 	  
  return false;	  	  
}
function verif_doc_fidelite($cd,$cf){
	 global $con;
	  if( connection())
		 if($result=mysqli_query($con,"select * from detail_documt  where obs1 = '$cf' and code_d='$cd'  "))	{
			$num = mysqli_num_rows($result);
			if ($num >= 1) return 'existe';
		 }	
	  return  '';
}

function delete_credit_doc($code_d){ // suppression credit 
	 global $con;
	  if( connection() ) 
	     return @mysqli_query($con,"delete from credit_cl where code_d='$code_d' ");
	  return false;	
}
function delete_remise($index_d){
	 global $con;
	  if( connection()){		   
		   return mysqli_query($con,"delete from remise_cl where code_d='$index_d' ");		   
	  }		  
	  return false;	
}
function cancel_qte_lot($code_p,$qte_mv,$code_l,$operation){
	global $con;
	$qte_bdd = 0;
	/////traitement des produits perissable /////
			//	echo "<br>****** à supprimer *******:".$_SESSION['autoriser_gest_prm']."/$code_p/"."/$qte_mv/"."/$code_l/";
 	if ($operation=='ae') $operation = 's';
	if($operation =='e'){
	    //if(($_SESSION['autoriser_gest_prm']=='yes')&&(get_produit($code_p , 'code_p')->nature =='p')&&($qte_mv > 0)&&($code_l != '')&&($code_l !=0 )){   
		if((get_param('autoriser_gest_prm')=='yes')&&(get_produit($code_p , 'code_p')->nature =='p')&&($qte_mv > 0)&&($code_l != '')&&($code_l !=0 )){   
			$qte_lot = get_detail_lot($code_l)->qte_lot;
			$qte_bdd = $qte_lot - $qte_mv;
			//echo "update produit_prm set qte_lot='$qte_bdd' where code_l='$code_l'  ";
			mysqli_query($con,"update produit_prm set qte_lot='$qte_bdd' where code_l='$code_l'  ");
			//if($qte_bdd > 0 )mysql_query("update produit_prm set qte_lot='$qte_bdd' where code_l='$code_l'  ");
			//else mysql_query("update produit_prm set qte_lot=0 where code_l='$code_l'  ");
		}
		////////////////////////////////////////// 
	}elseif($operation =='s'){
     	//if(verif_exist_lot($code_l)==1) mysql_query("update produit_prm set qte_lot=qte_lot+'$qte_mv' where code_l='$code_l'  ");
		//else mysql_query("insert into produit_prm ( code_p,qte_lot,date_p) values ( '$cp', '$qte', '".formater_to_bdd($dat_per)."') ")) return true;	
		//echo "update produit_prm set qte_lot=qte_lot+'$qte_mv' where code_l='$code_l'  ";
		//echo "update produit_prm set qte_lot=qte_lot+'$qte_mv' where code_l='$code_l'  ";
		mysqli_query($con,"update produit_prm set qte_lot=qte_lot+'$qte_mv' where code_l='$code_l'  ");
	}	
}
function get_detail_lot($code_lot){
	  global $con;
	  if (connection()){	
		  if($result=mysqli_query($con,"select * from produit_prm where  code_l = '$code_lot'  ")){						         
			  return mysqli_fetch_object($result);								
		  }
	  }	  
	  return '' ;	 
}
function edit_remise($client,$index_d,$remise){
	  global $con;
	  if( connection()){		   
		   return (mysqli_query($con,"delete from remise_cl where code_d='$index_d' ") && mysqli_query($con,"insert into remise_cl (code_cl,code_d,remise) values ('$client','$index_d','$remise' )"));		   
	  }		  
	  return false;	
}
 
function check_produit_des_new($des){
	global $con;
	if($q=mysqli_query($con,"select * from produit where  des_p = '$des' ")){
		$num = mysqli_num_rows($q);
		if ($num >=1) return true;
 	}			  
    return false ;		 
}
function is_produit_element_pack($code_p){ 
	  global $con;
	  $num = 0;
	  if( connection())
		 if($result=mysqli_query($con,"select * from produit_pack where code_pc ='$code_p' "))	{
			$num = mysqli_num_rows($result);
			if ($num >=1) return 'existe';
		 }	
	  return  '';
}
function delete_produit($code){
	  global $con;
	  // test si le produit est un pere
	  if(is_prod_base($code) != 'existe'){
	    if(mysqli_query($con,"delete from  produit where code_p = '$code' ") && mysqli_query($con,"delete from  favori where code_p = '$code' ") && mysqli_query($con,"delete from  produit_corresp where code_p = '$code' ") && mysqli_query($con,"delete from  produit_annexe where code_p = '$code' ") && mysqli_query($con,"delete from  produit_pack where code_p = '$code' ")&& mysqli_query($con,"delete from  produit_prm where code_p = '$code' ")  ){
			    //if (is_produit_pack($code) == 'PAC') delete_pack($code); 	
				return true;
		} 				 	  
	  }else{
	    if(mysqli_query($con,"delete from  produit where code_p = '$code' ") && mysqli_query($con,"delete from  favori where code_p = '$code' ") && mysqli_query($con,"delete from  produit_annexe where code_p = '$code' ")  ){
		   $result=mysqli_query($con,"select code_p from produit_corresp  where code_b = '$code' ");			
		   while( $li = mysqli_fetch_object($result) )  mysqli_query($con,"update  produit set image='PCE' where code_p ='$li->code_p' ");
		   mysqli_query($con,"delete from  produit_corresp where code_b = '$code' "); 
	       return true;
		 }					 	  
	  }
	  return false ;	 
}
function is_prod_base($code_p){ 
	  global $con;
	  if( connection())
		 if($result=mysqli_query($con,"select * from produit_corresp where code_b ='$code_p' "))	{
			$num = mysqli_num_rows($result);
			if ($num >=1) return 'existe';
		 }	
	  return  '';
}
function delete_prix_promo($code_p){
	  global $con;	
	  return( mysqli_query($con,"delete from  produit_promo where code_p = '$code_p' ") );
	  return false ;	 
}
function check_mouvement_produit($code_p){
	   global $con;
	  if( connection()){
		 if($result=mysqli_query($con,"select * from  mouvt where  code_p='$code_p' " ))	{
			$num = mysqli_num_rows($result);
			if ($num >= 1) return true;
		 }	
      }
	  return false ;
}
function print_ticket_volentaire($code_d){ 
 echo"<script language='javascript' type='text/javascript' >
		 if(wt==null){ wt = window.open('to_print.php?code_d=$code_d','print','HEIGHT=550,WIDTH=280');
			 setTimeout(fonc,2000);
			 function fonc(){ wt.close(); }
		 }
	  </script> ";	
}
function formater_to_affichage($date){
 //echo "dd:".$date;
 @list($annee,$mois,$jour)=explode('-',$date);
 return date("d-m-Y", mktime(0,0,0,$mois,$jour,$annee));
}
function get_tot_credit_client_ordre_doc($code_cl,$date_d){
global $con;
$r_a_p = 0;
 if( connection()){
  if($r=mysqli_query($con,"select * from credit_cl where code_cl='$code_cl' and date < '$date_d' ")){									
	while($cr=mysqli_fetch_object($r)){
		   if($cr->code_d!=0){
               $type_d = get_type_documt($cr->code_d);
			   if($type_d == 's'){		   
 			       $r_a_p = $r_a_p + $cr->reste - get_remise_documt($cr->code_d);
				}elseif($type_d == 'as'){
 			       $r_a_p = $r_a_p - $cr->reste ;
				}
		   }else{
			       $r_a_p = $r_a_p - $cr->versement;
		   }
	}
   }
 }
return $r_a_p;
}

function get_tot_credit_client($code_cl){
 global $con;
 $r_a_p = 0;
 if( connection()){
  if($r=mysqli_query($con,"select * from credit_cl where code_cl='$code_cl' ")){									
	while($cr=mysqli_fetch_object($r)){
		   if($cr->code_d!=0){
               $type_d = get_type_documt($cr->code_d);
			   if($type_d == 's'){		   
			       $r_a_p = $r_a_p + $cr->reste - get_remise_documt($cr->code_d);
				}elseif($type_d == 'as'){
			       $r_a_p = $r_a_p - $cr->reste ;
				}
		   }else{
			       $r_a_p = $r_a_p - $cr->versement;
		   }
	}
   }
 }
return $r_a_p;
}
function get_date_of_fac($c_d){  	
 global $con;
	  $code_d = (int)$c_d;
	  if( connection()){
		  if($result=mysqli_query($con,"select date_d from  documt  where '$code_d' = code_d   ")){			
			$li = mysqli_fetch_object($result) ;
			return $li->date_d;
		  }
	  }
	  return '' ;	
}
function get_detail_plt($obs,$code_p){
  $detail_des = explode('|', $obs);
  for($j=0;$j<count($detail_des);$j++){
	$det = explode(':', $detail_des[$j]);
	if($det[0] == $code_p){ 
	   $i = count($detail_des);
	   return $det[1];    
	} 
  }
  return '';
}
function set_detail_documt($c_d, $detail_des){
 global $con;
	  if (!connection()) return false;	  
	  if(mysqli_query($con," update detail_documt set obs1='$detail_des' where code_d = '$c_d' ")) return true;	  
	  return false ;	 
}

?>