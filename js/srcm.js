function ajouterProd(code){
    var case_val ="";
 			   if( code.length > 0 ){		 
 				  var server = $('#ip-serveur').val();
				  var url = "http://"+server+"/phoneGap/cabmob/phpmob/json.php?c="+code+"";
 				  //var url = "http://127.0.0.1/phoneGap/scanner/json.php?c="+code+"";
				  //var url = "https://192.168.43.122:444/json.php?c="+code+"";
 				  $.getJSON(url, function(result) {
					if(result!=''){
 						$.each(result, function(i, field) {
							var code_p = field.code_p;
							var code = field.cab;
							var designation = field.des_p;
							var prix = field.prix_p;
							var ua = field.image;
							var carton = field.metre_pl;
							var piece = field.pcs_metre_pl;
							qte_p = 1;
							var famille = field.des_fm;
							var nbr =  $('#nbr').val();
							if(nbr > 0){
							    var idNew = true; var ex_val = 0; var total=0;
								$('#idata tr').each(function() {
								      var idProd = $(this).find('input').eq(0).val();
									  var qteProd = parseFloat($(this).find('td').eq(1).html());
									  var PrixProd = parseFloat($(this).find('td').eq(2).html());
									  var ex_val = parseFloat($(this).find('td').eq(3).html());
									  if( idProd == code_p ){
										 qteProd++;
										 idNew = false;
										 $('#det_plt'+code_p).html('');
									     $(this).find("td").eq(1).html(qteProd);
									  }	
									  $(this).find("td").eq(3).html(format(qteProd*PrixProd,2,''));									 
									  //total = parseFloat(total) + parseFloat(qteProd*PrixProd);
									  //$('#mt_total').html(total+" Da");
 								 });
								 if(idNew){
								   case_val += "<tr   >";
								   case_val += "<td width='45%'   >"+designation+"<span class='del_plt' id='det_plt"+code_p+"' ></span><input type='hidden' id='"+code_p+"' value='"+code_p+"' ><input type='hidden' id='prod_ua_"+code_p+"' value='"+ua+"' ><input type='hidden' id='prod_metre_"+code_p+"' value='"+carton+"' ><input type='hidden' id='prod_pcs_"+code_p+"' value='"+piece+"' ></td>";
								   case_val += "<td width='10%' class='tqte'  align='center' >"+qte_p+"</td>";
								   case_val += "<td width='20%' class='tprix'  align='right' >"+format(prix,2,'')+"</td>";
								   case_val += "<td width='25%'  align='right'>"+format(prix,2,'')+"</td>";
								   case_val += "<td width='5%'   align='center'><img id='img-delete' class='img-delete'    src='img/delete.gif'   ></td>";
								   case_val += "</tr>";
								   nbr++;
								   //total = parseFloat($('#mt_total').html()) + parseFloat(prix);
								   //$('#mt_total').html(total+" Da");
								   $("#idata").append(case_val);
								   
								  } 
 						          $('#msg_v').html(''); 
							 }else{
								   case_val += "<tr  >";
								   //case_val += "<td width='10%' class='code_p'  >"+code_p+"</td>";
								   case_val += "<td width='45%'  class='tdes' >"+designation+"<span class='del_plt' id='det_plt"+code_p+"' ></span><input type='hidden' id='"+code_p+"' value='"+code_p+"' ><input type='hidden' id='prod_ua_"+code_p+"' value='"+ua+"' ><input type='hidden' id='prod_metre_"+code_p+"' value='"+carton+"' ><input type='hidden' id='prod_pcs_"+code_p+"' value='"+piece+"' ></td>";
								   case_val += "<td width='10%' class='tqte'  align='center' >"+qte_p+"</td>";
								   case_val += "<td width='20%' class='tprix'  align='right' >"+format(prix,2,'')+"</td>";
								   case_val += "<td width='25%' class='tvaleur' align='right'>"+format(prix,2,'')+"</td>";
								   case_val += "<td width='5%'   align='center'><img class='img-delete' id='img-delete'    src='img/delete.gif'   ></td>";
								   case_val += "</tr>";
								   nbr++;
								   //var total = parseFloat($('#mt_total').html()) + parseFloat(prix);
								   //total = parseFloat(prix);
								   //$('#mt_total').html(total+" Da");
 								   $("#idata").append(case_val);
								   $('#msg_v').html('');
							 }
   							$('#cab_v').val('');
							$('#cab_v').focus();
							$('#nbr').val(parseFloat(nbr));
							calculTotal();
 						});
						$('#msg_v').html('');
					    //$("#idata").append(case_val);
					}else{
 						$('#msg_v').html('Le produit :'+$('#cab_v').val()+" n'existe pas dans la base de donn&eacute;es."); 
						$('#section-message-v').slideDown(800).delay(500).slideUp(500); 
						//$('#section-message').slideDown(800).delay(500).slideUp(500); 
					}	
				})
			  }//else 
}
function ajouterProdFromFile(code){
    var case_val ="";
	var nbr =0;
	var artExiste = false;
    if( code.length > 0 ){		 
 			jQuery.get('data.csv', function(data){
				   var lines = data.split(/\r?\n|\r/);
				   $.each(lines, function(n, elem) {
					  var rowCells = elem.split(",");
					  if( rowCells[1].replace( /"/g,'') == code){
							var code_p = rowCells[0].replace( /"/g,'');
							var designation = rowCells[2].replace( /"/g,'');
							var prix = rowCells[4].replace( /"/g,'');
							var qte_p = rowCells[3].replace( /"/g,'');
							var famille = rowCells[6].replace( /"/g,'');
							qte_p = 1;
							artExiste = true;
							var nbr =  $('#nbr').val();
							if(nbr > 0){
							    var idNew = true; var ex_val = 0; var total=0;
								$('#idata tr').each(function() {
								      var idProd = $(this).find('input').eq(0).val();
									  var qteProd = parseFloat($(this).find('td').eq(1).html());
									  var PrixProd = parseFloat($(this).find('td').eq(2).html());
									  var ex_val = parseFloat($(this).find('td').eq(3).html());
									  if( idProd == code_p ){
										 qteProd++;
										 idNew = false;
									     $(this).find("td").eq(1).html(qteProd);
									  }	
									  $(this).find("td").eq(3).html(qteProd*PrixProd);									 
									  total = parseFloat(total) + parseFloat(qteProd*PrixProd);
									  $('#mt_total').html(total+" Da");
 								 });
								 if(idNew){
									   case_val += "<tr   >";
									   case_val += "<td width='45%'   >"+designation+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
									   case_val += "<td width='10%' class='tqte'  align='center' >"+qte_p+"</td>";
									   case_val += "<td width='20%' class='tprix'  align='right' >"+prix+"</td>";
									   case_val += "<td width='25%'  align='right'>"+prix+"</td>";
									   case_val += "<td width='5%'   align='center'><img id='img-delete'    src='img/delete.gif'   ></td>";
									   case_val += "</tr>";
									   nbr++;
									   total = parseFloat($('#mt_total').html()) + parseFloat(prix);
									   $('#mt_total').html(total+" Da");
									   $("#idata").append(case_val);								 
								  } 
 						          $('#msg_v').html(''); 
							 }else{
								   case_val += "<tr  >";
								   //case_val += "<td width='10%' class='code_p'  >"+code_p+"</td>";
								   case_val += "<td width='45%'  class='tdes' >"+designation+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
								   case_val += "<td width='10%' class='tqte'  align='center' >"+qte_p+"</td>";
								   case_val += "<td width='20%' class='tprix'  align='right' >"+prix+"</td>";
								   case_val += "<td width='25%' class='tvaleur' align='right'>"+prix+"</td>";
								   case_val += "<td width='5%'   align='center'><img class='img-delete' id='img-delete'    src='img/delete.gif'   ></td>";
								   case_val += "</tr>";
								   nbr++;
								   //var total = parseFloat($('#mt_total').html()) + parseFloat(prix);
								   total = parseFloat(prix);
								   $('#mt_total').html(total+" Da");
 								   $("#idata").append(case_val);
								   $('#msg_v').html('');
							 }
   							$('#cab_v').val('');
							$('#cab_v').focus();
							$('#nbr').val(parseFloat(nbr));
					  }
				   }); //// fin each 
				   $('#msg_v').html('');
 			   });  // fin jquery.get
	}
	    if(!artExiste){
 		   $('#msg_v').css('color','red');
		   $('#msg_v').html("Le produit  n'existe pas dans le fichier de donn&eacute;es.");
		} 
}
function get_ProdFromTextFile(code,p){
    ///////////////////
        //var fcode = '"'+code+'"';
	    var par = p;
		var nbrLigne = 0; 
		if( par == 'p' )par = '';
		else if( par == 'v' )par = '_v';
		if( code.length > 0 ){	
 			jQuery.get('data.csv', function(data){
				 var lines = data.split(/\r?\n|\r/);
				  $.each(lines, function(n, elem) {
					  var rowCells = elem.split(",");
					  if( rowCells[1].replace( /"/g,'') == code){
							var code_p = rowCells[0].replace( /"/g,'');;
							var designation = rowCells[2].replace( /"/g,'');
							var prix = rowCells[4].replace( /"/g,'');
							var qte_p = rowCells[3].replace( /"/g,'');
							var famille = rowCells[6].replace( /"/g,'');
								$('#code_p'+par).val(code_p);         
								$('#cab'+par).val(code);         
								$('#designation'+par).val(designation);         
								$('#prix'+par).val(prix+' Da');  
								$('#quantite'+par).val(qte_p);  
								$('#famille'+par).val(famille);
								//$('#section_add').slideUp(1000);
								//$('#section_update').slideUp(1000);					  
								//$('#msg').html('');
							    //$('#btn-ajouter-produit').css('display','none');
							    //$('#btn-modifier-produit').css('display','none');
							    //$('#btn-supprimer-produit').css('display','none');
								reinitialiser();
								return false;
						}else{
							$('#code_p'+par).val('');         
							$('#designation'+par).val('');         
							$('#prix'+par).val('');
							$('#quantite'+par).val('');  
							$('#famille'+par).val(''); 
							$('#section_message').slideDown(1000);
							//$('#section_add').slideUp(1000);
							 $('#msg'+par).css('color','red');
							$('#msg'+par).html('Le produit :'+$('#cab').val()+" n'existe pas le fichier de donn&eacute;es."); 
						}
						nbrLigne++;
				  });
				  ////////////  fin lecture des lignes
			}).fail(function(){
				$('#msg').css('color','red');
				$('#msg').html("Veuillez charger votre fichier de donn&eacute;es."); 
				nbrLigne ='';				
			});	   			  
			if(nbrLigne == 0){
				    $('#msg').css('color','red');
				    $('#msg').html("Veuillez charger les donn&eacute;es, le fichier est vide."); 
			}
  		     /////////// fin lecture du fichier
			
		}else{
				$('#code_p'+par).val('');         
				$('#cab'+par).val('');         
				$('#designation'+par).val('');         
				$('#prix'+par).val('');
				$('#quantite'+par).val('');  
				$('#famille'+par).val(''); 
		 } 	
}	
function getProdVente(code){
    var case_val ="";
 			   if( code.length > 0 ){		 
 					var server = $('#ip-serveur').val();
					var url = "http://"+server+"/phoneGap/scanner/json.php?c="+code+"";
 					//var url = "http://127.0.0.1/phoneGap/scanner/json.php?c="+code+"";
					//var url = "https://192.168.43.122:444/json.php?c="+code+"";
 				 $.getJSON(url, function(result) {
					
					if(result!=''){
						$.each(result, function(i, field) {
						//console.log(field);
						//$('#section2').slideDown(500);
							var code_p = field.code_p;
							var code = field.cab;
							var designation = field.des_p;
							var prix = field.prix_p;
							var qte_p = field.qte;
							var famille = field.des_fm;
						       case_val += "<tr  >";
							   case_val += "<td  >"+value.cab+"</td>";
							   case_val += "<td  >"+value.des_p+"</td>";
							   case_val += "<td  >"+value.prix_p+"</td>";
							   case_val += "</tr>";
								/*$('#code_p'+par).val(code_p);         
								$('#cab'+par).val(code);         
								$('#designation'+par).val(designation);         
								$('#prix'+par).val(prix+' Da');  
								$('#quantite'+par).val(qte_p);  
								$('#famille'+par).val(famille);
								$('#section_add').slideUp(1000);
								$('#section_update').slideDown(1000);*/
						});
						 $("#idata").append(case_val);
					}else{ 
						//$('#section2').slideUp(1000);
						$('#code_p'+par).val('');         
						$('#designation'+par).val('');         
						$('#prix'+par).val('');
						$('#quantite'+par).val('');  
						$('#famille'+par).val(''); 
						$('#section_message').slideDown(1000);
						//$('#section_update').slideUp(1000);
						//$('#section_add').slideDown(1000);
					    //$('#btn-ajouter-produit').css('display','block');
					    //$('#btn-modifier-produit').css('display','none');
					    //$('#btn-supprimer-produit').css('display','none');
						$('#msg'+par).css('color','red');
						$('#msg'+par).html('Le produit :'+$('#cab').val()+" n'existe pas dans la base de donnees."); 
					}	
				})
			  }else{
						$('#code_p'+par).val('');         
						$('#cab'+par).val('');         
						$('#designation'+par).val('');         
						$('#prix'+par).val('');
						$('#quantite'+par).val('');  
						$('#famille'+par).val(''); 
							   
			  } 
}
////////////// section initialisation ///////
function reinitialiser(){
    $('#msg').html("");
	$('#msg_v').html("");	
	$('#msg_i').html("");	
	$('#qte_tmp').val('');
	$('#qte_tmp_i').val('');
	 $('#articleLu').html(0);
	 $('#cab_i').val('');
	 //$('#remise').val('');
	 //$('#versement').val('');	 
	 //getListeClientM2(''); 
	 $('#mt_total').html("");
	$('#section-client').slideUp(500);
	 $('#numTicket').val('');
    $('#metre').html("");	
	$('#piece').html("");	
    localStorage.setItem('selected_prod','');
    localStorage.setItem('selected_prod_ua','');
    localStorage.setItem('selected_prod_ca','');
    localStorage.setItem('selected_prod_pcs','');
    localStorage.setItem('detail_ca','');	 	
}
function reinitialiser_table(){
	$('#mt_total').html("");
    $("#idata").empty();
    $("#idata-i").empty();
     //$('#numTicket').val('');
    $('#btn-valider-ticket').css('display','block');
    $('#btn-modifier-ticket').css('display','none');
    $('#btn-supprimer-ticket').css('display','none');
    $('#btn-imprimer-ticket').css('display','none');
}
////////////// fin section initialisatation ///


/////////////// section produit ////////////
function get_Prod(code,p){
    ///////////////////
               // alert(code);
			   if( p == 'p' )par = '_p';
			   else if( p == 'v' )par = '_v';
 			   if( code.length > 0 ){		 
 					var server = $('#ip-serveur').val();
					var url = "http://"+server+"/phoneGap/cabmob/phpmob/json.php?c="+code+"";
 					//var url = "http://"+server+"/phoneGap/scanner/json.php?c="+code+"";
					//var url = "http://127.0.0.1/phoneGap/scanner/json.php?c="+code+"";
					//var url = "https://192.168.43.122:444/json.php?c="+code+"";
 				 $.getJSON(url, function(result) {
					
					if(result!=''){
						$.each(result, function(i, field) {
						//console.log(field);
						//$('#section2').slideDown(500);
							var code_p = field.code_p;
							var code = field.cab;
							var designation = field.des_p;
							var prix = field.prix_p;
							var qte_p = field.qte;
							var famille = field.des_fm;
								$('#code_p').val(code_p);         
								$('#cab'+par).val(code);         
								$('#designation').val(designation);         
								$('#prix').val(prix);  
								$('#quantite').val(qte_p);  
								//$('#famille'+par).val(famille);
							    $('#btn-ajouter-produit').css('display','none');
								$('#btn-vider-produit').css('display','block');
							    $('#btn-modifier-produit').css('display','block');
							    $('#btn-supprimer-produit').css('display','block');
						});
					}else{ 
						$('#code_p').val('');         
						$('#designation').val('');         
						$('#prix').val('');
						$('#quantite').val('');  
						//$('#famille').val(''); 
					    $('#btn-ajouter-produit').css('display','block');
					    $('#btn-modifier-produit').css('display','none');
					    $('#btn-supprimer-produit').css('display','none');
						$('#btn-vider-produit').css('display','none');
						$('#msg'+par).css('color','red');
						$('#msg'+par).html('Le produit :'+$('#cab'+par).val()+" n'existe pas dans la base de donn&eacute;es."); 
						//$('#section-message'+par).slideDown(500).delay(900).slideUp(500);
						 $('#section-message'+par).slideDown(500).delay(900).slideUp(500);
					}	
				})
			  }else{
						$('#code_p').val('');         
						$('#cab'+par).val('');         
						$('#designation').val('');         
						$('#prix').val('');
						$('#quantite'+par).val('');  
						$('#famille').val(''); 
							   
			  } 
			  ////////////////////
}
function insertProd(){
    var server = $('#ip-serveur').val();
  var url = "http://"+server+"/phoneGap/cabmob/phpmob/insert.php";
  var modConn = localStorage.getItem('modConn');	
  if(modConn == 'con'){
		$.ajax({
			 //url: "https://192.168.43.122:444/insert.php",
			 url:url,
			 method: "POST",
			 data: { cab: $('#cab_p').val(), prix: $('#prix').val(), designation: $('#designation').val(), quantite: $('#quantite').val()}
		  }).done(function(res){
				//console.log(res);
				if(res == 'existe'){
				  $('#msg_p').css('color','red');
				  $('#msg_p').html('Ajout impossible ! le produit existe déja.');
				  $('#section-message_p').slideDown(500).delay(900).slideUp(500);
			      $('#btn-ajouter-produit').css('display','block');
			      $('#btn-modifier-produit').css('display','none');
			      $('#btn-supprimer-produit').css('display','none');
				  $('#btn-vider-produit').css('display','none');
				}else if(res == 'des_existe'){
				  $('#msg_p').css('color','red');
				  $('#msg_p').html('Ajout impossible ! la designation produit existe d&eacute;ja.');
				  $('#section-message_p').slideDown(500).delay(900).slideUp(500);
			      $('#btn-ajouter-produit').css('display','block');
			      $('#btn-modifier-produit').css('display','none');
			      $('#btn-supprimer-produit').css('display','none');
				  $('#btn-vider-produit').css('display','none');				
				}else{
			      $('#btn-ajouter-produit').css('display','none');
				  $('#btn-vider-produit').css('display','block');
			      $('#btn-modifier-produit').css('display','block');
			      $('#btn-supprimer-produit').css('display','block');
				  $('#msg_p').css('color','green');
				  $('#msg_p').html('Le produit : '+$('#cab_p').val()+' - '+$('#designation').val()+' - est ajout&eacute; avec succ&eacute;s.');
				  $('#section-message_p').slideDown(500).delay(900).slideUp(500);
				  $('#cab_p').focus();
				}
				//$('#section-message').slideDown(500);
		  });
	 }else{
		  $('#msg_p').css('color','red');
		  $('#msg_p').html('Ajout produit impossible ! vous &Agrave;tes en mode hors connexion.');
		  $('#section-message_p').slideDown(500).delay(900).slideUp(500);
	 } 	 	
	 $('#cab_p').focus();
}
function deleteProd(){
    //"http://127.0.0.1/phoneGap/scanner/delete.php"
  var server = $('#ip-serveur').val();
  var url = "http://"+server+"/phoneGap/cabmob/phpmob/delete.php";
  var modConn = localStorage.getItem('modConn');	
  if(modConn == 'con'){
			$.ajax({
				 url: url,
				 method: "POST",
				 data: {code_p: $('#code_p').val()}
			  }).done(function(res){
				  //console.log(res);
				  if(res == 'succees'){ 
					  $('#msg_p').css('color','green');
					  $('#msg_p').html('Le produit : '+$('#cab_p').val()+' est supprim&eacute; avec succ&eacute;s.');
					  $('#section-message_p').slideDown(500).delay(2000).slideUp(500);
					  $('#cab_p').val('');
					  $('#designation').val('');
					  $('#prix').val('');
					  $('#quantite').val('');
				  }else if(res == 'erreur1'){
		  			  $('#msg_p').css('color','red');
		  			  $('#msg_p').html('La suppression du produit '+$('#cab_p').val()+' est impossible. le produit figure dans un ou plusieurs mouvements.');
					  $('#section-message_p').slideDown(500).delay(2000).slideUp(500);
				  }else if(res == 'erreur3'){
		  			  $('#msg_p').css('color','red');
		  			  $('#msg_p').html('La suppression du produit '+$('#cab_p').val()+' est impossible. le produit figure comme &eacute;l&eacute;ment pack.');
					  $('#section-message_p').slideDown(500).delay(2000).slideUp(500);				  
				  }else{
		  			  $('#msg_p').css('color','red');
		  			  $('#msg_p').html('La suppression du produit '+$('#cab_p').val()+' est impossible. contactez votre administrateur.');
					  $('#section-message_p').slideDown(500).delay(2000).slideUp(500);				  
				  }
 			  });
	 }else{
		  $('#msg_p').css('color','red');
		  $('#msg_p').html('Suppression impossible ! vous &Agrave;tes en mode hors connexion.');
		  $('#section-message_p').slideDown(500).delay(900).slideUp(500);
	 }	
	 $('#cab_p').focus(); 		
}
function updateProd(){
    var server = $('#ip-serveur').val();
	var url = "http://"+server+"/phoneGap/cabmob/phpmob/update.php";
	var modConn = localStorage.getItem('modConn') ;
	if(modConn == 'con'){
			 $.ajax({
			 url:url,
			 method: "POST",
			 data: {code_p: $('#code_p').val(), cab: $('#cab_p').val(), prix: $('#prix').val(), designation: $('#designation').val(), quantite: $('#quantite').val()}
		  }).done(function(res){
				//console.log(res);
				if(res == 'existe'){
				  $('#msg_p').css('color','red');
				  $('#msg_p').html('Modification impossible ! la d&eacute;signation produit existe d&eacute;ja.');
				  $('#section-message_p').slideDown(500).delay(900).slideUp(500);
				}else{
				  $('#msg_p').css('color','green');
				  $('#msg_p').html('La modification du produit : '+$('#cab_p').val()+' est termin&eacute;e avec succ&eacute;s.');
				  $('#section-message_p').slideDown(500).delay(900).slideUp(500);
				  $('#cab_p').focus();
				}
				//$('#section-message').slideDown(500);
		  });
	 }else{
		  $('#msg_p').css('color','red');
		  $('#msg_p').html('Modification impossible ! vous &Agrave;tes en mode hors connexion.');
		  $('#section-message_p').slideDown(500).delay(900).slideUp(500);
	 }
	 $('#cab_p').focus();  	 	
}
function rechercherParDesP(des){
    $("#tab-pd2").empty();
   var case_val ="";
    if( des.length > 0 ){		 
	 var server = $('#ip-serveur').val();
	 var url = "http://"+server+"/phoneGap/cabmob/phpmob/json_des.php?c="+des+"";
	 $('#section2pd').slideDown(500);
	 $('#idata-pd2').show();
 	 $.getJSON( url, function( data ){
		//if(result!=''){
		  $.each( data, function( key,value){
			   case_val += "<tr  >";
			   case_val += "<td width='12%'  >"+value.cab+"</td>";
			   case_val += "<td width='58%'  align='left' >"+value.des_p+"</td>";
			   case_val += "<td width='12%'  align='center' >"+value.qte+"</td>";
			   case_val += "<td width='18%' align='right' >"+format(value.prix_p,2,'')+"</td>";
			   case_val += "</tr>";
		  });
		  $("#tab-pd2").append(case_val);
	 }); 
   }else{
			$('#designation').val('');
			$('#prix').val('');
			$('#quantite').val('');
			$('#idata-pd2').hide();
			$("#tab-pd2").empty();
			$('#section2pd').hide();
  } 	
}
////////////  fin section produit /////////


function calculTotal(){
    var total = 0; var nbr = 0;var detail_ca = "";
  $('#idata tr').each(function() {
	  var qteProd = parseFloat($(this).find('td').eq(1).html());
	  var PrixProd = parseFloat($(this).find('td').eq(2).html());
	  total = parseFloat(total) + parseFloat(qteProd*PrixProd);
	  nbr++;
	  var ProdUa  = $(this).find('input').eq(1).val();
	  var ProdPlt = $(this).find('span').eq(0).html();
	  if (ProdPlt != '' ){//alert(ProdPlt);
	   if(detail_ca != ''){
		  detail_ca +=' | '+$(this).find('input').eq(0).val()+' : '+$(this).find('span').eq(0).html()+' : '+$(this).find('input').eq(2).val()+' : '+$(this).find('input').eq(3).val();
	   }else{
          detail_ca += $(this).find('input').eq(0).val()+' : '+$(this).find('span').eq(0).html()+' : '+$(this).find('input').eq(2).val()+' : '+$(this).find('input').eq(3).val();
	   }
	   localStorage.setItem('detail_ca',detail_ca);
	  }
 });
  //var remise=0;
  var remise = parseFloat($('#remise').val());
  if(remise)total -= remise;
  //else remise=0;
  //total = total - remise; 
  localStorage.setItem('totalTicket',total);
  localStorage.setItem('nbrLigneTicket',nbr);
  $('#mt_total').html(format(total,2,' ')+" Da");
}
function ajouterProdInv(code){
	var case_val ="";
			   //var nbrArtLu = $('#nbrArtLu').val();
 			   if( code.length > 0 ){		 
 				  var server = $('#ip-serveur').val();
				  var url = "http://"+server+"/phoneGap/scanner/json.php?c="+code+"";
 				  //var url = "http://127.0.0.1/phoneGap/scanner/json.php?c="+code+"";
				  //var url = "https://192.168.43.122:444/json.php?c="+code+"";
 				  //alert($('#nbr').val());
				  var nbr =  $('#nbr').val();
				  $.getJSON(url, function(result) {
					if(result!=''){
 						$.each(result, function(i, field) {
							var code_p = field.code_p;
							var code = field.cab;
							var designation = field.des_p;
 							qte_p = 1;
							var famille = field.des_fm;
							
							//var nbr =  $('#nbr').val();
							// alert(nbr);
							if(nbr > 0){
							    var prodExist = false; 
								$('#idata-i tr').each(function() {
								      var idProd = $(this).find('input').eq(0).val();
									  var qteProd = parseFloat($(this).find('td').eq(2).html());
 									  if( idProd == code_p ){
										 prodExist = true;
									  }	
  								 });
								 
								 if(!prodExist){
								   var nombreArt = $('#nbr').val();
								   nombreArt++;
								   //alert(nombreArt);
								   $('#articleLu').html(nombreArt);
								   case_val += "<tr   >";
								   case_val += "<td width='20%'   >"+code+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
								   case_val += "<td width='60%' align='left'  >"+designation+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
								   case_val += "<td width='10%' class='tqte'  align='right' >"+qte_p+"</td>";
								   case_val += "<td width='10%'   align='center'><img id='img-delete-i' class='img-delete'    src='img/delete.gif'   ></td>";
								   case_val += "</tr>";
								   nbr++;
  								   $("#idata-i").append(case_val);
								  } 
 						          $('#msg_i').html(''); 
							 }else{
								   case_val += "<tr  >";
								   case_val += "<td width='20%'   >"+code+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
								   case_val += "<td width='60%'  align='left' >"+designation+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
								   case_val += "<td width='10%' class='tqte'  align='right' >"+qte_p+"</td>";
								   case_val += "<td width='10%'   align='center'><img id='img-delete-i' class='img-delete'    src='img/delete.gif'   ></td>";
								   case_val += "</tr>";
								   nbr++;
								    $('#articleLu').html(1);
  								   $("#idata-i").append(case_val);
								   $('#msg_i').html('');
							 }
   							$('#cab_i').val('');
							$('#cab_i').focus();
							$('#nbr').val(parseFloat(nbr));
  						});
						$('#msg_i').html('');
 					}else{ 
 						$('#msg_i').html('Le produit :'+$('#cab_i').val()+" n'existe pas dans la base de donn&eacute;es."); 
						$('#section-message-i').slideDown(800).delay(500).slideUp(500);
					}	
				})
			  }//else 
 			   
}
function ajouterProdFromFileInv(code){
	var case_val ="";
	var nbr =0;
    if( code.length > 0 ){	
	        //artExiste
 			jQuery.get('data.csv', function(data){
				   var artExiste = false;
				   var lines = data.split(/\r?\n|\r/);
				      $.each(lines, function(n, elem) {
					  var rowCells = elem.split(",");
					  if( rowCells[1].replace( /"/g,'') == code){
							var code_p = rowCells[0].replace( /"/g,'');
							var designation = rowCells[2].replace( /"/g,'');
 							var qte_p = rowCells[3].replace( /"/g,'');
 							qte_p = 1;
							artExiste = true;
							var nbr =  $('#nbr').val();
							if(nbr > 0){
							    var idNew = true; var ex_val = 0; var total=0;
								$('#idata-i tr').each(function() {
								      var idProd = $(this).find('input').eq(0).val();
									  var qteProd = parseFloat($(this).find('td').eq(2).html());
 									  if( idProd == code_p ){
										 //qteProd++;
										 idNew = false;
									     $(this).find("td").eq(2).html(qteProd);
									  }	
  								 });
								 if(idNew){
								       var nombreArt = $('#nbr').val();
								       nombreArt++;
									   $('#articleLu').html(nombreArt);
									   case_val += "<tr   >";
									   case_val += "<td width='20%'   >"+code+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
									   case_val += "<td width='60%'   >"+designation+"</td>";
									   case_val += "<td width='10%' class='tqte'  align='center' >"+qte_p+"</td>";
									   case_val += "<td width='10%'   align='center'><img id='img-delete' class='img-delete'    src='img/delete.gif'   ></td>";
									   case_val += "</tr>";
									   nbr++;
 									   $("#idata-i").append(case_val);										  
 								  } 
 						          $('#msg_i').html(''); 
							 }else{
							           case_val += "<tr  >";
									   case_val += "<td width='20%'   >"+code+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
									   case_val += "<td width='60%'   >"+designation+"</td>";
									   case_val += "<td width='10%' class='tqte'  align='center' >"+qte_p+"</td>";
									   case_val += "<td width='10%'   align='center'><img id='img-delete' class='img-delete'    src='img/delete.gif'   ></td>";
								       case_val += "</tr>";
								       nbr++;
									   $('#articleLu').html(1);
									   //$('#articleLu').html(nbr);							 
	 								   $("#idata-i").append(case_val);
									   $('#msg_i').html('');
							 }
   							$('#cab_i').val('');
							$('#cab_i').focus();
							$('#nbr').val(parseFloat(nbr));
					  }
				   }); //// fin each ligne
				   $('#msg_i').html('');
					//alert(artExiste);
					if(!artExiste){
					   $('#msg_i').css('color','red');
					   $('#msg_i').html("Le produit  n'existe pas dans le fichier de donn&eacute;es.");
					   //$('#msg_i').html('Le produit :'+$('#cab_i').val()+" n'existe pas dans la base de donn&eacute;es."); 
					   $('#section-message-i').slideDown(800).delay(500).slideUp(500);
					}  			
 			});  // fin jquery.get
 		}
 }
function insertQteInv(){
	$('#section-qte-i').slideUp(500);
	  var cp = localStorage.getItem('selected_prod');
 	  $('#idata-i tr').each(function() {
		  var idProd = $(this).find('input').eq(0).val();
		  var qteProd = parseFloat($(this).find('td').eq(2).html());
		  var exqteProd = $(this).find('td').eq(2).html();
		  if( idProd == cp ){
				  if (isNaN($('#qte_tmp_i').val())||parseFloat($('#qte_tmp_i').val())<0.0){
					   $('#msg_i').css('color','red');
					   $('#msg_i').html("Veuillez saisir une quantit&eacute; valide.");
					   $('#section-message-i').slideDown(800).delay(700).slideUp(500);			 
					   $(this).find("td").eq(2).html(exqteProd);
				  }else{
					  $(this).find("td").eq(2).html($('#qte_tmp_i').val()); 
		   		  }
		 }
 	   });
 	  $('#cab_i').focus();
 }
function insertPrix(){
    //var total=0;
  $('#section-prix').slideUp(500);
  var cp = localStorage.getItem('selected_prod');
  //$(this).find("td").eq(1).html(qteProd);
  $('#idata tr').each(function() {
	  var idProd = $(this).find('input').eq(0).val();
	  var qteProd = parseFloat($(this).find('td').eq(1).html());
	  var prixProd = parseFloat($(this).find('td').eq(2).html());
	  var exprixProd = $(this).find('td').eq(2).html();
      if( idProd == cp ){
		  if (isNaN($('#prix_tmp').val())||parseFloat($('#prix_tmp').val())<0.0){
			   $('#msg_v').css('color','red');
			   $('#msg_v').html("Veuillez saisir un prix valide.");
			   $('#section-message').slideDown(800).delay(700).slideUp(500);			 
			   $(this).find("td").eq(2).html(exprixProd);
			   //$(this).find("td").eq(3).html(qteProd*parseFloat($('#prix_tmp').val()));									 
		 }else{
			  $(this).find("td").eq(2).html(format($('#prix_tmp').val(),2,''));
			  $(this).find("td").eq(3).html(format(qteProd*parseFloat($('#prix_tmp').val()),2,''));									 
		   }
	  }
   }); 
  calculTotal();
  $('#cab_v').focus();
  $('#mt_total').html(total+" Da");
} 
function insertQte(){
	$('#section-qte').slideUp(500);
	  var cp = localStorage.getItem('selected_prod');
	  $('#idata tr').each(function() {
		  var idProd = $(this).find('input').eq(0).val();
		  var qteProd = parseFloat($(this).find('td').eq(1).html());
		  var prixProd = parseFloat($(this).find('td').eq(2).html());
		  var exqteProd = $(this).find('td').eq(1).html();
		  if( idProd == cp ){
			  if (isNaN($('#qte_tmp').val())||parseFloat($('#qte_tmp').val())<0.0){
				   $('#msg_v').css('color','red');
				   $('#msg_v').html("Veuillez saisir une quantit&eacute; valide.");
				   $('#section-message').slideDown(800).delay(700).slideUp(500);			 
				   $(this).find("td").eq(1).html(exqteProd);
			  }else{							   
				   $(this).find("td").eq(1).html($('#qte_tmp').val()); 
				   var valeur = format(parseFloat($('#qte_tmp').val())*prixProd,2,'');
				   $(this).find("td").eq(3).html(valeur);									 
			   }
		  }
  
		   $('#section-qte-propo').slideUp(500);
		  //alert(detail_ca);
	   });
	  calculTotal();
	  
	  $('#cab_v').focus();
	  $('#mt_total').html(total+" Da");
} 
function insertDataInv(){ 
    inventaireObj = [];
  inventaireRecord = [];  
   $('#idata-i tr').each(function() {
	  var idProd = $(this).find('input').eq(0).val();
	  var qteProd = parseFloat($(this).find('td').eq(2).html());
	  var cabProd = parseFloat($(this).find('td').eq(0).html());
	  //var prixProd = parseFloat($(this).find('td').eq(2).html());
	  var desProd = $(this).find('td').eq(1).html();
	  var inventaireObj = {code_p:idProd , cab:cabProd ,des_p:desProd , qte:qteProd };
	  inventaireRecord.push(inventaireObj);
  });
    if( inventaireRecord.length > 0){
	  localStorage.setItem('Inventaire',JSON.stringify(inventaireRecord)); 
 	  $("#idata-i").empty();
	  //$("#articleLu").html(0);
	  $('#cab_i').focus();
  }
}
function charger_inventaire(){
 	$('#msg_i').html('');
 		 $('#idata-i').empty();
		 var inventaire = localStorage.getItem('Inventaire');
 		//alert(inventaireRecord.length);
		if(inventaire){
 			 var inventaireRecord = JSON.parse(localStorage.getItem('Inventaire')); 
 			 for( var i=0; i < inventaireRecord.length ;  i++ ){
				  var lscode_p = inventaireRecord[i].code_p; 
				  var lscab = inventaireRecord[i].cab; 
				  var lsdes_p  = inventaireRecord[i].des_p; 
				  var lsqte    = inventaireRecord[i].qte;
				  prepareTableInv(lscode_p,lscab,lsdes_p,lsqte);
 			}
			//alert(inventaireRecord.length); 
			 $('#nbr').val(inventaireRecord.length);
			 //$('#articleLu').html(inventaireRecord.length);
		} 
}
function modifier_inventaire_bdd(){
	inventaireObj = [];
		 inventaireRecord =[]; 
		 inventaireTmp =[];
		 var inventaire = localStorage.getItem('Inventaire');
		 if(inventaire){
			 
				 var inventaireRecord = JSON.parse(localStorage.getItem('Inventaire')); 
				  $('#idata-i tr').each(function() {
					  var idProd = $(this).find('input').eq(0).val();
					  var qteProd = parseFloat($(this).find('td').eq(2).html());
					  var cabProd = $(this).find('td').eq(0).html();
					  var desProd = $(this).find('td').eq(1).html();
					  var inventaireObj = {code_p:idProd ,cab:cabProd, des_p:desProd , qte:qteProd };
					  inventaireTmp.push(inventaireObj);
				  });
				   //alert(inventaireTmp.length);
				  if( inventaireTmp.length > 0){
					 localStorage.removeItem('Inventaire');
				     localStorage['Inventaire'] = JSON.stringify(inventaireTmp);
				     $("#idata-i").empty();
				     $('#msg_i').css('color','green');
					 $('#msg_i').html('Inventaire modifi&eacute; avec succ&eacute;s.'); 
					 $('#section-message-i').slideDown(800).delay(500).slideUp(500);
				  }else{
				     localStorage.removeItem('Inventaire'); 
				  }
 		  }
 }
function checkProdInv(code,champ){
	$('#msg_i').html('');
	 var inventaire = localStorage.getItem('Inventaire');
	 if(inventaire){
		 var inventaireRecord = JSON.parse(localStorage.getItem('Inventaire')); 
		 for( var i=0; i < inventaireRecord.length ;  i++ ){
			  var lscode_p = inventaireRecord[i].code_p;
			  var lscab = inventaireRecord[i].cab;
 			  if(champ == 'cab'){
			    if( lscab == code ) return true;
			  }else{
				if( lscode_p == code ) return true;  
			  }
		 }
	 }
	 return false;
}
function prepareTableInv(code_p,cab,des,qte){
    var case_v;
 		   var table = document.getElementById('#idata-i');
  		    case_v += "<tr   >";
		    case_v += "<td width='20%'   >"+cab+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
		    case_v += "<td width='60%' align='left' class='tdes'  align='center' >"+des+"</td>";
		    case_v += "<td width='10%' class='tqte'  align='right' >"+qte+"</td>";
		    case_v += "<td width='10%'   align='center'><img id='img-delete' class='img-delete'    src='img/delete.gif'   ></td>";
		    case_v += "</tr>";
		    $('#idata-i').append(case_v); 
}
function getDetailClient(code_cl){
	//var server = $('#ip-serveur').val();
	//var url = "http://"+server+"/phoneGap/cabmob/getDetailClient.php";
 	var modConn = localStorage.getItem('modConn') ;
	if(modConn == 'con'){
 				//alert(code_cl);
			$.ajax({
			  dataType: 'JSON',
			  url: 'phpmob/getDetailClient.php',
			  data: {
				 client:code_cl,
			  },
			  success: function (response,etat) {
				 //if(response=="success"){
				    $('#lib-clt').html(response);
				 //}else{
					//$('#lib-clt').html("erreur"); 
			     //}
			  }
			});//.responseText;
 	 } 	 	
}
function getListeClient(){
	$.getJSON("phpmob/getClient.php", function(data){ 
			var select = $("#client"); 
			$.each(data, function(index, array) {
				  var html = '<option value="' + array.code_cl +'"  >' + array.nom + '</option>';
				  if(array.code_cl == 17 ) 
					 html = '<option value="' + array.code_cl +'" selected="selected"  >'+array.nom+'</option>';
				  $('#client').append(html);
			}); 
			//$('#client').html(html);
	});
}

function getListeClientM2(selected){
$.get("phpmob/getListeClient.php?selected="+selected,function(rep){
	$("#divClt").html(rep);
   })
}
function valider_ticket(){
    var Ticket = localStorage.getItem('lastTicket');
	  Ticket++;
	  var versement = $('#versement').val();
	  var code_cl = $('#client').val();
	  var remise  = $('#remise').val();
	  localStorage.setItem('lastTicket',Ticket);
	  if (isNaN(remise)||parseFloat(remise)<0.0){
		   $('#msg_v').css('color','red');
		   $('#msg_v').html("Veuillez saisir une remise valide.");
		   $('#section-message-v').slideDown(800).delay(700).slideUp(500);		
		   remise=0;
		   //$('#remise').val('');
	  }
	  if(code_cl!=''){
 		 if (isNaN(versement)||parseFloat(versement)<0.0){
		   $('#msg_v').css('color','red');
		   $('#msg_v').html("Veuillez saisir un versement valide.");
		   $('#section-message-v').slideDown(800).delay(700).slideUp(500);		
		   versement=0;
 	     }
	  }else if( parseFloat(versement)> 0.0 ){
		   versement=0;
		   $('#msg_v').css('color','red');
		   $('#msg_v').html("Veuillez saisir un versement pour un client valide.");
		   $('#section-message-v').slideDown(800).delay(700).slideUp(500);	  
	  }
	  insertData(Ticket,code_cl,remise,versement);  
	  getListeClientM2('');
	  $('#remise').val('');
	  $('#versement').val('');
	  $('#section-client').slideUp(500);
} 
function insertData(Ticket,code_cl,remise,versement){ 
    detailTicket = [];
  detailTicketRecord = [];
  mouvementObj = [];
  ExMouvementObj = [];
  mouvementRecord = [];
  exTicketRecord = [];
  exMouvementTicket = [];
  // charger les anciens documents
  var exTicket = localStorage.getItem('Ticket');
  if(exTicket){
	var exTicketRecord = JSON.parse(localStorage.getItem('Ticket')); 
    for( var i=0; i < exTicketRecord.length ;  i++ ){
		var detailTicket ={code_d:exTicketRecord[i].code_d,date_s:exTicketRecord[i].date_s,client:exTicketRecord[i].client,remise:exTicketRecord[i].remise , versement:exTicketRecord[i].versement};
	    detailTicketRecord.push(detailTicket);
	}
  }

  // charger le nouveau ticket
  var fullDate = new Date();
  var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
  var currentDate =    fullDate.getFullYear()+ "-" + twoDigitMonth+ "-" +fullDate.getDate() +" "+ fullDate.getHours()+':'+fullDate.getMinutes()+':'+fullDate.getSeconds();
  var detailTicket = {code_d:Ticket, date_s:currentDate,client:code_cl ,remise:remise , versement:versement };
  detailTicketRecord.push(detailTicket);


  // charger des details des anciens documents (tickets)
  var exMouvementTicket = localStorage.getItem('mouvementTicket');
  if(exMouvementTicket){
	var ExMouvementObj = JSON.parse(localStorage.getItem('mouvementTicket')); 
	//mouvementRecord.push(ExMouvementObj);
    for( var i=0; i < ExMouvementObj.length ;  i++ ){
		var mouvementObj ={code_d:ExMouvementObj[i].code_d , code_p:ExMouvementObj[i].code_p , des_p:ExMouvementObj[i].des_p,  qte:ExMouvementObj[i].qte , prix:ExMouvementObj[i].prix };
	    mouvementRecord.push(mouvementObj);
	}
  }

  // chargement du detail de nouveau ticket
  $('#idata tr').each(function() {
	  var idProd = $(this).find('input').eq(0).val();
	  var qteProd = parseFloat($(this).find('td').eq(1).html());
	  var prixProd = parseFloat($(this).find('td').eq(2).html());
	  var desProd = $(this).find('td').eq(0).html();
 	  var mouvementObj = {code_d:Ticket , code_p:idProd , des_p:desProd ,  qte:qteProd , prix:prixProd };
	  mouvementRecord.push(mouvementObj);
  });
  if( detailTicketRecord.length > 0){
	   localStorage["Ticket"] = JSON.stringify(detailTicketRecord);
	   if( mouvementRecord.length > 0){
		 localStorage["mouvementTicket"] = JSON.stringify(mouvementRecord);
		 $("#idata").empty();
		 $('#mt_total').html('');
		 $('#cab_v').focus();
	  }
  }
 
}
function modifier_ticket(){
    var numTicket = $('#numTicket').val();
	  var versement = $('#versement').val();
	  var code_cl = $('#client').val();
	  var remise  = $('#remise').val();
	  //verification des champs de saisie
	  //if(isNaN(remise)) alert(remise);
	  if(isNaN(remise)||parseFloat(remise)<0.0){
		   $('#msg_v').css('color','red');
		   $('#msg_v').html("Veuillez saisir une remise valide.");
		   $('#section-message-v').slideDown(500).delay(700).slideUp(500);		
		   remise=0;
	  }
	  if(code_cl!=''){
 		 if (isNaN(versement)||parseFloat(versement)<0.0){
		   $('#msg_v').css('color','red');
		   $('#msg_v').html("Veuillez saisir un versement valide.");
		   $('#section-message-v').slideDown(800).delay(700).slideUp(500);		
		   versement=0;
 	     }
	  }else if( parseFloat(versement)> 0.0 ){
		   versement=0;
		   $('#msg_v').css('color','red');
		   $('#msg_v').html("Veuillez saisir un versement pour un client valide.");
		   $('#section-message-v').slideDown(800).delay(700).slideUp(500);	  
	  }
	  detailTicket = [];	  detailTicketRecord = [];	  mouvementObj = [];	  ExMouvementObj = [];	  mouvementRecord = [];
	  exTicketRecord = [];  exMouvementTicket = [];	  var ticketExist = false;
	  var numTicket = $('#numTicket').val();
	  if(numTicket == ''){
			   $('#msg_v').css('color','red');
			   $('#msg_v').html("Veuillez saisir un num&eacute; de Bon/Ticket valide.");
			   $('#section-message-v').slideDown(800).delay(700).slideUp(500);	  
	  }else{
		  // charger les anciens documents
		  var exTicket = localStorage.getItem('Ticket');
		  if(exTicket){
			var exTicketRecord = JSON.parse(localStorage.getItem('Ticket')); 
			for( var i=0; i < exTicketRecord.length ;  i++ ){
			  if( exTicketRecord[i].code_d != numTicket )	
				var detailTicket ={code_d:exTicketRecord[i].code_d,date_s:exTicketRecord[i].date_s,client:exTicketRecord[i].client,remise:exTicketRecord[i].remise , versement:exTicketRecord[i].versement};
			  else{
				var detailTicket ={code_d:exTicketRecord[i].code_d,date_s:exTicketRecord[i].date_s,client:code_cl,remise:remise , versement:versement};
				ticketExist = true;  
			  }
			  detailTicketRecord.push(detailTicket);
			}
			localStorage["Ticket"] = JSON.stringify(detailTicketRecord);
			if(!ticketExist){
			   $('#msg_v').css('color','red');
			   $('#msg_v').html("Le num&eacute;de Bon/Ticket introduit n'existe pas dans la base de donn&eacute;es.");
			   $('#section-message-v').slideDown(800).delay(700).slideUp(500);	  
			}else{
			  // charger des details des anciens documents (tickets)
			  var exMouvementTicket = localStorage.getItem('mouvementTicket');
			  if(exMouvementTicket){
				var ExMouvementObj = JSON.parse(localStorage.getItem('mouvementTicket')); 
				//mouvementRecord.push(ExMouvementObj);
				for( var i=0; i < ExMouvementObj.length ;  i++ ){
				  if( ExMouvementObj[i].code_d != numTicket ){	
					var mouvementObj ={code_d:ExMouvementObj[i].code_d , code_p:ExMouvementObj[i].code_p , des_p:ExMouvementObj[i].des_p,  qte:ExMouvementObj[i].qte , prix:ExMouvementObj[i].prix };
					mouvementRecord.push(mouvementObj);
				  }
				}
				//chargement des mouvements nouveaux
			    $('#idata tr').each(function() {
					  var idProd = $(this).find('input').eq(0).val();
					  var qteProd = parseFloat($(this).find('td').eq(1).html());
					  var prixProd = parseFloat($(this).find('td').eq(2).html());
					  var desProd = $(this).find('td').eq(0).html();
					  var mouvementObj = {code_d:numTicket , code_p:idProd , des_p:desProd ,  qte:qteProd , prix:prixProd };
					  mouvementRecord.push(mouvementObj);
					//alert(idProd);
				});
				localStorage["mouvementTicket"] = JSON.stringify(mouvementRecord);
				reinitialiser();
				//localStorage.setItem('lastTicket','');
				$('#numTicket').val('');
				$('#remise').val('');
				$('#versement').val('');
				$('#idata').empty();
			    $('#msg_v').css('color','green');
			    $('#msg_v').html("Le Bon/Ticket num&eacute;o :"+numTicket+" est modifi&eacute; avec succ&eacute;s.");
			    $('#section-message-v').slideDown(800).delay(700).slideUp(500);	 
				$('#btn-imprimer-ticket').css('display','none');
				//$('#btn-rech-ticket').css('display','none');
				$('#btn-modifier-ticket').css('display','none');
				$('#btn-supprimer-ticket').css('display','none');
				$('#btn-valider-ticket').css('display','block');
			  }				
			}
		  }

  }
}
function format(valeur,decimal,separateur) {
    // formate un chiffre avec 'decimal' chiffres après la virgule et un separateur
	var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
	var val=Math.floor(Math.abs(valeur));
	if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
	var val_format=val+"";
	var nb=val_format.length;
	for (var i=1;i<4;i++) {
		if (val>=Math.pow(10,(3*i))) {
			val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
		}
	}
	if (decimal>0) {
		var decim=""; 
		for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
		deci=decim+deci.toString();
		val_format=val_format+"."+deci;
	}
	if (parseFloat(valeur)<0) {val_format="-"+val_format;}
	return val_format;
}
function rechercher_ticket(){
	$('#msg_v').html('');
	//if(event.keyCode == 13) {
		var numTicket = $('#numTicket').val();
		$('#idata').empty();
		var ticket = localStorage.getItem(numTicket);
		//alert(numTicket);
		if(ticket){
		   mouvementRecord = JSON.parse(ticket);
		   for( var i=0; i < mouvementRecord.length ;  i++ ){
			  var lscode_d = mouvementRecord[i].code_d; 
			  var lscode_p = mouvementRecord[i].code_p; 
			  var lsdes_p = mouvementRecord[i].des_p; 
			  var lsqte    = mouvementRecord[i].qte;
			  var lsprix   = mouvementRecord[i].prix;
			  prepareTable(lscode_p,lsdes_p,lsqte,lsprix);
		   }
		   //$('#btn-valider-ticket').css('display','none');     
		   $('#btn-rech-ticket').css('display','block');
		   $('#btn-modifier-ticket').css('display','block');
		   $('#btn-supprimer-ticket').css('display','block');
		   $('#btn-imprimer-ticket').css('display','block');
		   //$('#btn-valider-ticket').css('display','none');
		   
		   //$('#btn-modifier-ticket').html("Le Bon/Ticket N :"+numTicket+" n'existe pas.");
		}else{
			 $('#btn-imprimer-ticket').css('display','none');
			 $('#btn-rech-ticket').css('display','none');
			 $('#btn-modifier-ticket').css('display','none');
			 $('#btn-supprimer-ticket').css('display','none');
			 //$('#btn-valider-ticket').css('display','block');
			 $('#msg_v').css('color','red');
			 $('#msg_v').html("Le Bon/Ticket N :"+numTicket+" n'existe pas.");
			 
		}

}
function supprimer_ticket(){
    detailTicket = [];
  detailTicketRecord = [];
  mouvementObj = [];
  ExMouvementObj = [];
  mouvementRecord = [];
  exTicketRecord = [];
  exMouvementTicket = [];
  var ticketExist = false;
  var numTicket = $('#numTicket').val();
  if(numTicket == ''){
	   $('#msg_v').css('color','red');
	   $('#msg_v').html("Veuillez saisir un num&eacute; de Bon/Ticket valide.");
	   $('#section-message-v').slideDown(800).delay(700).slideUp(500);	  
  }else{
		  // charger les anciens documents
		  var exTicket = localStorage.getItem('Ticket');
		  if(exTicket){
			var exTicketRecord = JSON.parse(localStorage.getItem('Ticket')); 
			for( var i=0; i < exTicketRecord.length ;  i++ ){
			  if( exTicketRecord[i].code_d != numTicket ){	
				var detailTicket ={code_d:exTicketRecord[i].code_d,date_s:exTicketRecord[i].date_s,client:exTicketRecord[i].client,remise:exTicketRecord[i].remise , versement:exTicketRecord[i].versement};
				detailTicketRecord.push(detailTicket);
			  }else{
				i = exTicketRecord.length;  
				ticketExist = true;  
			  }
			}
			localStorage["Ticket"] = JSON.stringify(detailTicketRecord);
			if(!ticketExist){
			   $('#msg_v').css('color','red');
			   $('#msg_v').html("Le num&eacute;de Bon/Ticket introduit n'existe pas dans la base de donn&eacute;es.");
			   $('#section-message-v').slideDown(800).delay(700).slideUp(500);	  
			}else{
			  // charger des details des anciens documents (tickets)
			  var exMouvementTicket = localStorage.getItem('mouvementTicket');
			  if(exMouvementTicket){
				var ExMouvementObj = JSON.parse(localStorage.getItem('mouvementTicket')); 
				//mouvementRecord.push(ExMouvementObj);
				for( var i=0; i < ExMouvementObj.length ;  i++ ){
				  if( ExMouvementObj[i].code_d != numTicket ){	
					var mouvementObj ={code_d:ExMouvementObj[i].code_d , code_p:ExMouvementObj[i].code_p , des_p:ExMouvementObj[i].des_p,  qte:ExMouvementObj[i].qte , prix:ExMouvementObj[i].prix };
					mouvementRecord.push(mouvementObj);
				  }
				}
				localStorage["mouvementTicket"] = JSON.stringify(mouvementRecord);
				reinitialiser();
				//localStorage.setItem('lastTicket','');
				$('#idata').empty();
			    $('#msg_v').css('color','green');
			    $('#msg_v').html("Le Bon/Ticket num&eacute; :"+numTicket+" est supprim&eacute; avec succ&eacute;s.");
			    $('#section-message-v').slideDown(800).delay(700).slideUp(500);	 
				$('#btn-imprimer-ticket').css('display','none');
				//$('#btn-rech-ticket').css('display','none');
				$('#btn-modifier-ticket').css('display','none');
				$('#btn-supprimer-ticket').css('display','none');
				$('#btn-valider-ticket').css('display','block');
			  }				
			}
		  }

  }
}
function consulter_inventaire(){
    var inventaire = localStorage.getItem('Inventaire');
   //alert(inventaire);
   if(inventaire){
		 $('#btn-save-inventaire').css('display','none');
		 $('#btn-modif-inventaire').css('display','block');
		 charger_inventaire();
		$('#articleLu').html($('#idata-i tr').length++);
   }else{
		 $('#msg_i').css('color','red');
		 $('#msg_i').html('Aucun inventaire enregistr&eacute;.'); 
		 $('#section-message-i').slideDown(800).delay(500).slideUp(500);
   }
}

function consulter_document(){
   $('#idata-j').empty();
    //alert('dd');
	 var server = $('#ip-serveur').val();
	 var url = "http://"+server+"/phoneGap/cabmob/phpmob/getDocDate.php";
	 $.getJSON(url, function(result) {
		
		if(result!=''){
			$.each(result, function(i, field) {
 				   var code_d = field.code_d;
				   var date_s = field.date_s;
				   var reste = field.reste;
				   var versement = field.versement;
				   var mt = field.obs;
				   //alert(result);
				   var case_val="";
				   case_val += "<tr>";
				   case_val += "<td width='25%'  align='center' >"+code_d+"</td>";
				   case_val += "<td width='40%'  align='center'  >"+date_s+"</td>";
				   case_val += "<td width='35%'  align='right'  >"+format(mt,2,' ')+"</td>";
				   //case_val += "<td width='10%'  align='center' ><img id='img-delete' class='img-delete'    src='img/delete.gif'   ></td>";
				   case_val += "</tr>";
				   $("#idata-j").append(case_val);
			});
			//chargerMvtTickeBdd(code_d);
		}else{ 
		     //charger_ticket();
		}	
	})
}
function charger_document(){
     
	var numTicket=1;
	//if(numTicket !='') {
		$('#idata-j').empty();
		var ticket = localStorage.getItem(numTicket);
		if(ticket){
		   mouvementRecord = JSON.parse(ticket);
		   for( var i=0; i < mouvementRecord.length ;  i++ ){
			  var lscode_d = mouvementRecord[i].code_d; 
			  var lscode_cl = mouvementRecord[i].client; 
			  var lscode_p = mouvementRecord[i].code_p; 
			  var lsdes_p = mouvementRecord[i].des_p; 
			  var lsqte    = mouvementRecord[i].qte;
			  var lsprix   = mouvementRecord[i].prix;
			  var lsremise   = mouvementRecord[i].remise;
			  var lsversement   = mouvementRecord[i].versement;
			  var lsdate   = mouvementRecord[i].date_s;
			  //prepareTableDetailVente(lscode_p,lsdes_p,lsqte,lsprix);
		      alert(lscode_d);
			  prepareTableDetailVente(lscode_d,lsremise,lsversement,lsdate,lscode_cl)
		   }

		}
 
}
function prepareTableDetailVente(code_d,remise,versement,date,code_cl){
    var  case_v;
 		   if (( code_cl == null )||( code_cl == '' )) client = "-";
		   else{
		       var client = code_cl; 
		   }
		   var mt = 0 ;
		   //var mt = calculTotalTicket(code_d); 
		   if (( versement == null )||( versement == '' )) versement = "0.00";
		   if (( remise == null )||( remise == '' )) remise = "0.00";
 		   var table = document.getElementById('#idata-j');
 			case_v += "<tr   >";
		    case_v += "<td width='10%' align='center'   >"+code_d+"</td>";
		    case_v += "<td width='15%' align='center' >"+date+"</td>";
		    case_v += "<td width='30%' align='center' >"+client+"</td>";
		    case_v += "<td width='15%' align='right'>"+format(mt,2,' ')+"&nbsp;</td>";
		    case_v += "<td width='10%' align='center'>"+remise+"</td>";
			case_v += "<td width='10%' align='center'>"+format(versement,2,'')+"</td>";
 		    case_v += "<td width='10%' align='center'><img id='img-delete_doc' class='img-delete' src='img/delete.gif'></td>";
		    case_v += "</tr>";
			$('#idata-j').append(case_v);
}
function viderEcran(){
	$('#btn-save-inventaire').css('display','block');
	 $('#btn-modif-inventaire').css('display','none');
	 $('#cab_i').val(''); 
	 $('#idata-i').empty();  
	 $('#nbr').val(0);
	 $('#articleLu').html(0);
	 //reinitialiser();
}
function modifierInventaire(){
	var inventaire = localStorage.getItem('Inventaire');
	  if (!inventaire) localStorage.setItem('Inventaire','');
	  modifier_inventaire_bdd(); 
	  $('#btn-save-inventaire').css('display','block');
	  $('#btn-modif-inventaire').css('display','none');					  
	  $('#idata-i').empty(); 
	  $('#articleLu').html(0);

	
	} 
function validerInventaire(){
	var inventaire = localStorage.getItem('Inventaire');
	  if (!inventaire) localStorage.setItem('Inventaire','');
	  charger_inventaire_bdd();
	  $('#articleLu').html(0); 
	  $('#msg_i').css('color','green');
	  $('#msg_i').html('Inventaire est valid&eacute; avec succ&eacute;s.'); 
	  $('#section-message-i').slideDown(500).delay(800).slideUp(500);
	}	
function charger_inventaire_bdd(){
	inventaireObj = [];
		 inventaireRecord =[]; 
		 inventaireTmp =[];
		 var ProdExist = false;
		 //alert(inventaireTmp.length);
		 var inventaire = localStorage.getItem('Inventaire');
		 if(inventaire){
				 var inventaireRecord = JSON.parse(localStorage.getItem('Inventaire')); 
				 for( var i=0; i < inventaireRecord.length ;  i++ ){
					  var lscode_p = inventaireRecord[i].code_p; 
					  var lscab = inventaireRecord[i].cab; 
					  var lsdes_p  = inventaireRecord[i].des_p; 
					  var lsqte    = inventaireRecord[i].qte;
					  $('#idata-i tr').each(function() {
							  var idProd = $(this).find('input').eq(0).val();
							  var idcab = $(this).find('td').eq(0).html();
							  if( idProd == lscode_p ) ProdExist = true;
					  });
					  if(!ProdExist){
						  var inventaireObj = {code_p:lscode_p, cab:lscab,  des_p:lsdes_p ,  qte:lsqte   };
						  inventaireTmp.push(inventaireObj);
					  }
				  }
				  // alert(inventaireTmp.length);
				  $('#idata-i tr').each(function() {
					  var idProd = $(this).find('input').eq(0).val();
					  var qteProd = parseFloat($(this).find('td').eq(2).html());
					  var cabProd = $(this).find('td').eq(0).html();
					  var desProd = $(this).find('td').eq(1).html();
					  var inventaireObj = {code_p:idProd ,cab:cabProd, des_p:desProd , qte:qteProd };
					  inventaireTmp.push(inventaireObj);
				  });
				  //alert(inventaireTmp.length);
				  if( inventaireTmp.length > 0){
					 localStorage.removeItem('Inventaire');
				     localStorage['Inventaire'] = JSON.stringify(inventaireTmp);
				     $("#idata-i").empty();
				  }
 		  }else{
			//alert('aaaaaaaaaaaaaaaaa');
			insertDataInv();
		  }
 }
function effacerInventaire(){
    var inventaire = localStorage.getItem('Inventaire');
 if(inventaire){
	 localStorage.removeItem('Inventaire'); 
	 $('#btn-save-inventaire').css('display','block');
	 $('#btn-modif-inventaire').css('display','none');
	 $('#articleLu').html(0);
	 $('#idata-i').empty();
	 $('#nbr').val(0);
	 $('#cab_i').focus(); 
	 $('#msg_i').css('color','green');
	 $('#msg_i').html('Inventaire supprim&eacute; avec succ&eacute;s.'); 
	 $('#section-message-i').slideDown(500).delay(800).slideUp(500);
  }else{
	 $('#msg_i').css('color','red');
	 $('#msg_i').html('Aucun inventaire enregistr&eacute;.'); 
	 $('#section-message-i').slideDown(500).delay(800).slideUp(500);
  }

	}	
function getParam(par){
    $.get("phpmob/getParam.php?param="+par,function(rep){
	var result = JSON.parse(rep);
	var t =  result[0].valeur;
	//alert(t);
	localStorage.setItem(par,t) ;
    })
} 
function insertTicket(){
   var server = $('#ip-serveur').val();
   var url = "http://"+server+"/phoneGap/cabmob/phpmob/addDoc.php";
   //var modConn = localStorage.getItem('modConn');	
   //alert('ee');
   var total = localStorage.getItem('totalTicket');
   var nbrLigneTicket = localStorage.getItem('nbrLigneTicket');
   var detail_ca = localStorage.getItem('detail_ca');
   //alert(detail_ca);
   ///////////////  preparation des mouvements ///////////////////
   mouvementRecord = [];  
   mouvement = [];  
   $('#idata tr').each(function() {
	  var idProd = $(this).find('input').eq(0).val();
	  var qteProd = parseFloat($(this).find('td').eq(1).html());
	  var prixProd = parseFloat($(this).find('td').eq(2).html());
	  var mouvementRecord = { code_p:idProd , qte:qteProd ,prix:prixProd };
	  mouvement.push(mouvementRecord);
  });
  $.ajax({
	 url:url,
	 method: "POST",
	 data: {nbrLigne:nbrLigneTicket,total:total, client:$('#client').val() , versement:$('#versement').val() , remise:$('#remise').val() , mouvement:mouvement,detail_ca:detail_ca}
  }).done(function(res){
		//console.log(res);
		if(res == 'existe'){
		  $('#msg_v').css('color','red');
		  $('#msg_v').html('Ajout impossible ! le produit existe déja.');
		}else{
		  //$('#msg_v').html(res);
		  $('#msg_v').css('color','green');
		  $('#msg_v').html("L'insertion du Bon/Ticket est termin&eacute;e avec succ&eacute;s.");
		  $('#section-message-v').slideDown(500).delay(3000).slideUp(500);
		}
  });
	 	
}
function updateTicket(){
    var server = $('#ip-serveur').val();
  var url = "http://"+server+"/phoneGap/cabmob/phpmob/editDoc.php";
  //var modConn = localStorage.getItem('modConn');	
  //alert('ee');
  var code_d = $('#numTicket').val();
  var total = localStorage.getItem('totalTicket');
  var nbrLigneTicket = localStorage.getItem('nbrLigneTicket');
  var detail_ca = localStorage.getItem('detail_ca');
  //alert(total);
  ///////////////  preparation des mouvements ///////////////////
   mouvementRecord = [];  
   mouvement = [];  
   $('#idata tr').each(function() {
	  var idProd = $(this).find('input').eq(0).val();
	  var qteProd = parseFloat($(this).find('td').eq(1).html());
	  var prixProd = parseFloat($(this).find('td').eq(2).html());
	  var mouvementRecord = { code_p:idProd , qte:qteProd ,prix:prixProd };
	  //var mouvementRecord = { code_p:idProd , qte:qteProd ,prix:prixProd };
	  mouvement.push(mouvementRecord);
	  //var mouvement =+  idProd;
  });
  ///////////////////////////////////////////////////////////////
 
 
  $.ajax({
	 //url: "https://192.168.43.122:444/insert.php",
	 url:url,
	 method: "POST",
	 data: {code_d: $('#numTicket').val(),nbrLigne:nbrLigneTicket,total:total, client:$('#client').val() , versement:$('#versement').val() , remise:$('#remise').val() , mouvement:mouvement ,detail_ca:detail_ca}
  }).done(function(res){
		//console.log(res);
		if(res == 'existe'){
		  $('#msg_v').css('color','red');
		  $('#msg_v').html('Ajout impossible ! le produit existe déja.');
		}else{
		  reinitialiser();
		  $('#remise').val('');
		  reinitialiser_table();
		  $('#versement').val('');	 
		  getListeClientM2(''); 
	      $('#msg_v').css('color','green');
		  $('#msg_v').html("La modification de Bon/Ticket : "+code_d+" est termin&eacute;ee avec succ&eacute;s.");
		  $('#section-message-v').slideDown(500).delay(3000).slideUp(500);
		  $('#numTicket').val('');
		}
  });
}
function charger_ticket_bdd(){
    var code_d = $('#numTicket').val();
   //alert(code_d);
   $('#idata').empty();
   if( code_d.length > 0 ){		 
	 var server = $('#ip-serveur').val();
	 var url = "http://"+server+"/phoneGap/cabmob/phpmob/getDoc.php?c="+code_d+"";
	 $.getJSON(url, function(result) {
		 //alert('rr');
		if(result!=''){
			$.each(result, function(i, field) {
 				var code_d = field.code_d;
				var code_cl = field.code_f;
				var remise = field.remise;
				var versement = field.versement;
                if(code_cl != 0 ){
					$('#section-client').slideDown(500);
					$('#versement').val(versement);         
					$('#client').val(code_cl);  
				}
				$('#remise').val(remise);  
			});
			getDetCaDoc(code_d);
			chargerMvtTickeBdd(code_d);
			
		}else{ 
		     charger_ticket();
		}	
	})
  }else{
	 $('#msg_v').html("Veuillez saisir un num&eacute;ro de Bon/Ticket valide."); 
	 $('#section-message-v').slideDown(500).delay(1000).slideUp(500);
  } 
}
function chargerMvtTickeBdd(code_d){
	var server = $('#ip-serveur').val();
	 var url = "http://"+server+"/phoneGap/cabmob/phpmob/getDetailDoc.php?c="+code_d+"";
	 $.getJSON(url, function(result) {
		if(result!=''){
			$.each(result, function(i, field) {
 				//var code_d = field.code_d;
				var code_p = field.code_p;
				var qte = field.qte_mv;
				var des = field.des_p;
				var prix = field.prix;
				var ua = field.image;
				//alert(code_p);
                prepareTable(code_p,des,qte,prix,ua);
				getDetPltProd(code_p);
			});
			 
			 $('#btn-valider-ticket').css('display','none');
			 $('#btn-imprimer-ticket').css('display','block');
			 $('#btn-rech-ticket').css('display','block');
			 $('#btn-modifier-ticket').css('display','block');
			 $('#btn-supprimer-ticket').css('display','block');			
			 calculTotal();
		}else{ 
 			 $('#msg_v').css('color','red');
			 $('#msg_v').html("Aucun mouvements associ&eacute; à ce document."); 
			 $('#section-message-v').slideDown(500).delay(1000).slideUp(500);
		}	
	})
}
function prepareTable(code_p,des,qte,prix,ua){
    var  case_v;
   var table = document.getElementById('#idata');
   var valeur = parseFloat(qte)*parseFloat(prix);
   /*  <input type='hidden' id='prod_metre_"+code_p+"' value='"+carton+"' ><input type='hidden' id='prod_pcs_"+code_p+"' value='"+piece+"' >*/
	/*if(ua=='PLT'){
	  var xl = getDetPltProd(code_p);
	  //alert(xl);
	  //$('#det_plt'+code_p).html(xl);
	}*/
	case_v += "<tr   >";
	case_v += "<td width='45%'   >"+des+"<span id='det_plt"+code_p+"' class='del_plt' ></span><input type='hidden' id='"+code_p+"' value='"+code_p+"' ><input type='hidden' id='prod_ua_"+code_p+"' value='"+ua+"' ><input type='hidden' id='prod_metre_"+code_p+"' ><input type='hidden' id='prod_pcs_"+code_p+"'  ></td>";
	case_v += "<td width='10%' class='tqte'  align='center' >"+qte+"</td>";
	case_v += "<td width='20%' class='tprix'  align='right' >"+prix+"</td>";
	case_v += "<td width='25%'  align='right'>"+format(qte*prix,2,'')+"</td>";
	case_v += "<td width='5%'   align='center'><img id='img-delete' class='img-delete'    src='img/delete.gif'   ></td>";
	case_v += "</tr>";
	$('#idata').append(case_v); 
}
function charger_ticket(){
	$('#msg_v').html('');
	var exisTicket = false;
	var numTicket = $('#numTicket').val();
	var consDoc = localStorage.getItem('can_check_doc_mob') ;
	//if(consDoc=='no') var tx = '( Consultation locale )';	
	if(numTicket !='') {
		$('#idata').empty();
		var ticket = localStorage.getItem("Ticket");
		if(ticket){
 		   var detailTicket = JSON.parse(ticket);
 		   for( var i=0; i < detailTicket.length ;  i++ ){
			  var lscode_d = detailTicket[i].code_d; 
			  if(lscode_d == numTicket ){
				   $('#versement').val(detailTicket[i].versement);
				   $('#remise').val(detailTicket[i].remise);
				   var lscode_cl = detailTicket[i].client; 
				   i = detailTicket.length+1;
				   exisTicket = true;
			  }
		   }
		   if(exisTicket){
 				   var mouvementTicket = JSON.parse(localStorage.getItem("mouvementTicket"));
				   for( var i=0; i < mouvementTicket.length ;  i++ ){
					   var mvcode_d = mouvementTicket[i].code_d; 
					   if(mvcode_d == numTicket ){
						 prepareTable(mouvementTicket[i].code_p,mouvementTicket[i].des_p,mouvementTicket[i].qte,mouvementTicket[i].prix);			   }
				   }
				   getListeClientM2(lscode_cl);
				   $('#btn-modifier-ticket').css('display','block');
				   $('#btn-supprimer-ticket').css('display','block');
				   $('#btn-imprimer-ticket').css('display','block');
				   $('#btn-valider-ticket').css('display','none');
				   if(lscode_cl != ''){
						$('#section-client').slideDown(500);
						 var htsel = "<option value=\""+lscode_cl+"\">"+lscode_cl+"</option>";
						  $('#client').append(htsel);
				   }else $('#section-client').slideUp(500);
				   calculTotal();
		   }else{
				 $('#btn-imprimer-ticket').css('display','none');
				 $('#btn-rech-ticket').css('display','none');
				 $('#btn-modifier-ticket').css('display','none');
				 $('#btn-supprimer-ticket').css('display','none');
 				 reinitialiser();
				 $('#msg_v').css('color','red');
				 $('#msg_v').html("Le Bon/Ticket N :"+numTicket+" n'existe pas.");
				 $('#section-message-v').slideDown(500).delay(700).slideUp(500);
		   }
 		}else{
			 $('#btn-imprimer-ticket').css('display','none');
			 $('#btn-rech-ticket').css('display','none');
			 $('#btn-modifier-ticket').css('display','none');
			 $('#btn-supprimer-ticket').css('display','none');
 			 $('#msg_v').css('color','red');
			 $('#remise').val('');
 			 reinitialiser();
			 $('#msg_v').html("Aucun ticket enregistr&eacute;.");
			 $('#section-message-v').slideDown(500).delay(700).slideUp(500);
		}
	}else{
 	   reinitialiser();
	   $('#msg_v').css('color','red');
	   $('#msg_v').html("Veuillez saisir un num&eacute;ro de bon.");
	} 
}
function rechercherParDes(des){
    //alert(des);
   $("#tab-vd2").empty();
   //var des = $(this).val().toLowerCase();
   var case_val ="";
   //$('#msg').text('');
   
   if( des.length > 0 ){		 
	 var server = $('#ip-serveur').val();
	 var url = "http://"+server+"/phoneGap/cabmob/phpmob/json_des.php?c="+des+"";
	 $('#section2vd').slideDown(500);
	 $('#idata-vd2').show();
	 //$('#cab').val('');         
	 //$('#prix').val(''); 
	 $.getJSON( url, function( data ){
		//if(result!=''){
		  $.each( data, function( key,value){
			   case_val += "<tr  >";
			   case_val += "<td width='12%'  >"+value.cab+"</td>";
			   case_val += "<td width='58%'  align='left' >"+value.des_p+"</td>";
			   case_val += "<td width='12%'  align='center' >"+value.qte+"</td>";
			   case_val += "<td width='18%' align='right' >"+format(value.prix_p,2,'')+"</td>";
			   case_val += "</tr>";
		  });
		  $("#tab-vd2").append(case_val);
	 }); 
   }else{
			$('#idata-vd2').hide();
			$("#tab-vd2").empty();
			$('#section2vd').hide();
			//$('#code_p').val('');         
			//$('#cab').val('');         
			//$('#designation').val('');         
			//$('#prix').val('');
			//$('#msg').html('La désignation :'+$('#designation').val()+" n'existe pas dans la base de données.");          
   } 	
}
function deleteTicket(){
    var server = $('#ip-serveur').val();
  var url = "http://"+server+"/phoneGap/cabmob/phpmob/deleteDoc.php";
  //var modConn = localStorage.getItem('modConn');	
  var code_d = $('#numTicket').val();
  //var total = localStorage.getItem('totalTicket');
  //var nbrLigneTicket = localStorage.getItem('nbrLigneTicket');
  ///////////////////////////////////////////////////////////////
   $.ajax({
	 //url: "https://192.168.43.122:444/insert.php",
	 url:url,
	 method: "POST",
	 data: {code_d: $('#numTicket').val()}
  }).done(function(res){
		if(res == 'error'){
		  $('#msg_v').css('color','red');
		  $('#msg_v').html('La suppression du Bon/Ticket :'+code_d+' est impossible !');
		}else{
		  reinitialiser();
		  $('#remise').val('');
		  reinitialiser_table();
		  $('#versement').val('');	 
		  getListeClientM2(''); 
		  $('#msg_v').css('color','green');
		  $('#msg_v').html('La suppression du Bon/Ticket n :'+code_d+' est termin&eacute;e avec succ&eacute;s.');
		  $('#section-message-v').slideDown(500).delay(3000).slideUp(500);
		}
  });
	 	
}
function rechercherParDes(des){
    //alert(des);
   $("#tab-vd2").empty();
   //var des = $(this).val().toLowerCase();
   var case_val ="";
   //$('#msg').text('');
   
   if( des.length > 0 ){		 
	 var server = $('#ip-serveur').val();
	 var url = "http://"+server+"/phoneGap/cabmob/phpmob/json_des.php?c="+des+"";
	 $('#section2vd').slideDown(500);
	 $('#idata-vd2').show();
	 //$('#cab').val('');         
	 //$('#prix').val(''); 
	 $.getJSON( url, function( data ){
		//if(result!=''){
		  $.each( data, function( key,value){
			   case_val += "<tr  >";
			   case_val += "<td width='12%'  >"+value.cab+"</td>";
			   case_val += "<td width='58%'  align='left' >"+value.des_p+"</td>";
			   case_val += "<td width='12%'  align='center' >"+value.qte+"</td>";
			   case_val += "<td width='18%' align='right' >"+format(value.prix_p,2,'')+"</td>";
			   case_val += "</tr>";
		  });
		  $("#tab-vd2").append(case_val);
	 }); 
   }else{
			$('#idata-vd2').hide();
			$("#tab-vd2").empty();
			$('#section2vd').hide();
			//$('#code_p').val('');         
			//$('#cab').val('');         
			//$('#designation').val('');         
			//$('#prix').val('');
			//$('#msg').html('La désignation :'+$('#designation').val()+" n'existe pas dans la base de données.");          
   } 	
}
function rechercherParDesI(des){
    $("#tab-id2").empty();
   var case_val ="";
   if( des.length > 0 ){		 
	 var server = $('#ip-serveur').val();
	 var url = "http://"+server+"/phoneGap/cabmob/phpmob/json_des.php?c="+des+"";
	 $('#section2id').slideDown(500);
	 $('#idata-id2').show();
	 //$('#cab').val('');         
	 //$('#prix').val(''); 
	 $.getJSON( url, function( data ){
		//if(result!=''){
		  $.each( data, function( key,value){
			   case_val += "<tr  >";
			   case_val += "<td width='12%'  >"+value.cab+"</td>";
			   case_val += "<td width='58%'  align='left' >"+value.des_p+"</td>";
			   case_val += "<td width='12%'  align='center' >"+value.qte+"</td>";
			   case_val += "<td width='18%' align='right' >"+format(value.prix_p,2,'')+"</td>";
			   case_val += "</tr>";
		  });
		  $("#tab-id2").append(case_val);
	 }); 
   }else{
			$('#idata-id2').hide();
			$("#tab-id2").empty();
			$('#section2id').hide();
   } 	
}
function check_saisie(){
	if( $('#designation').val() == null){
 	  		$('#msg_p').css('color','red');
	  		$('#msg_p').html('Veuillez saisir une designation produit.');
	  		$('#section-message_p').slideDown(500).delay(900).slideUp(500);
			$('#designation').css('background-color','red');
			$('#designation').focus();
			return false;
	}	
	if (isNaN($('#prix').val())||parseFloat($('#prix').val())<0.0){
		   $('#msg_p').css('color','red');
		   $('#msg_p').html("Veuillez saisir un prix produit valide.");
		   $('#section-message_p').slideDown(500).delay(900).slideUp(500);
			$('#prix').css('background-color','red');
			$('#prix').focus();		   
		   return false;			 
	}
	if ( $('#prix').val() == '' ){
		   $('#msg_p').css('color','red');
		   $('#msg_p').html("Veuillez saisir un prix produit.");
		   $('#section-message_p').slideDown(500).delay(900).slideUp(500);			 
		   return false;
	}

	if (isNaN($('#quantite').val())||parseFloat($('#quantite').val())<0.0){
		   $('#msg_p').css('color','red');
		   $('#msg_p').html("Veuillez saisir une quantit&Eacute; valide.");
		   $('#section-message_p').slideDown(500).delay(900).slideUp(500);			 
		   $('#quantite').css('background-color','red');
		   $('#quantite').focus();
		   return false;
	}
	$('#prix').css('background-color','white');
	$('#quantite').css('background-color','white');
	$('#designation').css('background-color','white');
    return true;
}
function imprimerBon(){
    var case_val=""; var id_val=""; var doc=$('#numTicket').val();
    entete1 = localStorage.getItem('entete_bon') ;
    entete2 = localStorage.getItem('entete_bon2');
    entete3 = localStorage.getItem('entete_bon3');
    entete4 = localStorage.getItem('entete_bon4');
    entete5 = localStorage.getItem('entete_bon5');
    entete6 = localStorage.getItem('entete_bon6');
    entete7 = localStorage.getItem('entete_bon7');               
    
	var size_entete1 = localStorage.getItem('entete_bon1_size'); if(!size_entete1) size_entete1 = 14;
    var size_entete2 = localStorage.getItem('entete_bon2_size');if(!size_entete2) size_entete2 = 14;              
    var size_entete3 = localStorage.getItem('entete_bon3_size'); if(!size_entete3) size_entete3 = 14;               
    var size_entete4 = localStorage.getItem('entete_bon4_size'); if(!size_entete4) size_entete4 = 14;               
    var size_entete5 = localStorage.getItem('entete_bon5_size'); if(!size_entete5) size_entete5 = 14;               
    var size_entete6 = localStorage.getItem('entete_bon6_size'); if(!size_entete6) size_entete6 = 14;               
    var size_entete7 = localStorage.getItem('entete_bon7_size'); if(!size_entete7) size_entete7 = 14; 
   
   if((entete1)&&(entete1!='')) case_val += "<tr><td width='50%' style='font-family: Arial, Helvetica, sans-serif;font-size:"+size_entete1+"px'><b>"+entete1+"</b></td><td width='50%'></td></tr>"; 
   if((entete2)&&(entete2!='')) case_val += "<tr><td width='50%'  style='font-family: Arial, Helvetica, sans-serif;font-size:"+size_entete2+"px' ><b>"+entete2+"</b></td><td width='50%'></td></tr>"; 
   if((entete3)&&(entete3!='')) case_val += "<tr><td width='50%'  style='font-family: Arial, Helvetica, sans-serif;font-size:"+size_entete3+"px' ><b>"+entete3+"</b></td><td width='50%'></td></tr>"; 
   if((entete4)&&(entete4!='null')) case_val += "<tr><td width='50%' style='font-family: Arial, Helvetica, sans-serif;font-size:"+size_entete4+"px'  ><b>"+entete4+"</b></td><td width='50%'></td></tr>"; 
   if((entete5)&&(entete5!='null')) case_val += "<tr><td width='50%' style='font-family: Arial, Helvetica, sans-serif;font-size:"+size_entete5+"px'  ><b>"+entete5+"</b></td><td width='50%'></td></tr>"; 
   if((entete6)&&(entete6!=null)) case_val += "<tr><td width='50%' style='font-family: Arial, Helvetica, sans-serif;font-size:"+size_entete6+"px'  ><b>"+entete6+"</b></td><td width='50%'></td></tr>"; 
   if((entete7)&&(entete7!=null)) case_val += "<tr><td width='50%' style='font-family: Arial, Helvetica, sans-serif;font-size:"+size_entete7+"px'  ><b>"+entete7+"</b></td><td width='50%'></td></tr>"; 
   /////// partie id bon /////////
   setDetailDocPrint(doc);
   setDetailDocClPrint(doc);
   	  
    $("#enteteBon").append(case_val);
	var code_d = $("#numTicket").val(); 
	getDetCaDoc(code_d);
	chargerMvtTickeBddPrint(code_d);
    setTotalDocPrint(doc);
    setDetailCreditPrint(doc);
    ///////////////// talon /////////////////////
	var affichTalon = localStorage.getItem('talon_bon') ;			
	if(affichTalon=='yes'){ 
	  $('#section-talonBon').css('display','block');
      chargerMvtTickeBddTalon(code_d);
	  $('#idDocPrint').html('Bon : '+code_d);
	}else $('#section-talonBon').css('display','none');	
	
	/////////////////////////////////////////////
	
	
	//////////////////////////////	
    $("#printZone").printThis({
		  debug:false,
		  importCSS:true,
		  importStyle:false,
		  printContainer:true,
		  loadCSS:"",
		  pageTitle:"",
		  removeInLine:false,
		  printDelay:333,
		  header:null,
		  footer:null,
		  formValues:true,
		  canvas:false,
		  base:false,
		  doctypeString:'<!DOCTYPE html>',
		  removeScripts:false,
		  copyTagClasses:false,
		});
 }
 function readParam(){
    /*$.get("phpmob/readParam.php",function(rep){
	var result = JSON.parse(rep);
	var t =  result[0].valeur;
	//alert(t);
	localStorage.setItem(par,t) ;
    })*/
	//alert('ee');
	var server = $('#ip-serveur').val();
	var url = "http://"+server+"/phoneGap/cabmob/phpmob/readParam.php";
	$.getJSON(url, function(result) {
		if(result!=''){
			$.each(result, function(i, field) {
 				var nom = field.nom;
				var valeur = field.valeur; 
				//alert(nom);
				//var entete1 = getParam('entete_bon'); localStorage.setItem(nom,entete1) ;
				if(nom == 'entete_bon')  localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon2') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon3') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon4') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon5') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon6') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon7') localStorage.setItem(nom,valeur) ;
				
				if(nom == 'entete_bon1_size') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon2_size') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon3_size') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon4_size') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon5_size') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon6_size') localStorage.setItem(nom,valeur) ;
				if(nom == 'entete_bon7_size') localStorage.setItem(nom,valeur) ;
				
				if(nom == 'affichItemBon') localStorage.setItem(nom,valeur) ;
				if(nom == 'affichCodeBon') localStorage.setItem(nom,valeur) ;
				if(nom == 'affichDesBon') localStorage.setItem(nom,valeur) ;
				if(nom == 'affichPrixBon') localStorage.setItem(nom,valeur) ;
				if(nom == 'affichQteBon') localStorage.setItem(nom,valeur) ;
				if(nom == 'affichUaBon') localStorage.setItem(nom,valeur) ;
				if(nom == 'affichPltBon') localStorage.setItem(nom,valeur) ;
				if(nom == 'affichValBon') localStorage.setItem(nom,valeur) ;
			});
		}	
	})
} 
function initialisation(){
	//var entete1 = getParam('entete_bon'); localStorage.setItem('entete_bon',entete1) ;
	//var entete2 = getParam('entete_bon2');localStorage.setItem('entete_bon2',entete2) ;
	//var entete3 = getParam('entete_bon3');localStorage.setItem('entete_bon3',entete3) ;
	//var entete4 = getParam('entete_bon4');localStorage.setItem('entete_bon4',entete4) ;
	//var entete5 = getParam('entete_bon5');localStorage.setItem('entete_bon5',entete5) ;
	//var entete6 = getParam('entete_bon6');localStorage.setItem('entete_bon6',entete6) ;
	//var entete7 = getParam('entete_bon7');localStorage.setItem('entete_bon7',entete7) ;
	readParam();
	//var sizeEntete1 = getParam('entete_bon1_size');
	//var sizeEntete2 = getParam('entete_bon2_size');
	//var sizeEntete3 = getParam('entete_bon3_size');
	//var sizeEntete4 = getParam('entete_bon4_size');
	//var sizeEntete5 = getParam('entete_bon5_size');
	//var sizeEntete6 = getParam('entete_bon6_size');
	//var sizeEntete7 = getParam('entete_bon7_size');	
	var affichTalon = getParam('talon_bon');	
	localStorage.setItem('talon_bon',affichTalon) ;			
	//localStorage.setItem('entete_bon1_size',sizeEntete1) ;			
	//localStorage.setItem('entete_bon2_size',sizeEntete2) ;			
	//localStorage.setItem('entete_bon3_size',sizeEntete3) ;			
	//localStorage.setItem('entete_bon4_size',sizeEntete4) ;			
	//localStorage.setItem('entete_bon5_size',sizeEntete5) ;			
	//localStorage.setItem('entete_bon6_size',sizeEntete6) ;																		
	//localStorage.setItem('entete_bon7_size',sizeEntete7) ;	
	
    /*getParam('affichItemBon');
    getParam('affichCodeBon');
    getParam('affichDesBon');
    getParam('affichPrixBon');
    getParam('affichQteBon');
    getParam('affichUaBon');
    getParam('affichPltBon');
    getParam('affichValBon');
	*/
	var af_item = localStorage.getItem('affichItemBon');
	var af_code = localStorage.getItem('affichCodeBon');
	var af_des = localStorage.getItem('affichDesBon');
	var af_prix = localStorage.getItem('affichPrixBon');
	var af_qte = localStorage.getItem('affichQteBon');
	var af_ua = localStorage.getItem('affichUaBon');
	var af_plt = localStorage.getItem('affichPltBon');
	var af_val = localStorage.getItem('affichValBon');	
	
	var autoriseCom = getParam('autoriser_doc_comment');
	localStorage.setItem('autoriser_doc_comment',autoriseCom) ;	
	
  ////////////////////////parametrage du tableau ////////////////////
//	var af_item = getParam('affichItemBon');localStorage.setItem('affichItemBon',af_item) ;
   //alert(localStorage.getItem('affichItemBon')); 
   var w_item = 5 ; var w_code = 11 ;var w_des = 30 ;var w_prix = 10 ;var w_qte = 8 ;var w_ua = 5 ;var w_plt = 18 ; var w_val = 13 ; 
   //var c = getParam('affichItemBon') ;
   //alert(af_code);
  if(af_item =='no'){ w_item=0; localStorage.setItem('itemBon',w_item)};
  if(af_code=='no'){ w_code=0; localStorage.setItem('codeBon',w_code)};
  if(af_des=='no'){ w_des=0; localStorage.setItem('desBon',w_des)};
  if(af_prix=='no'){ w_prix=0; localStorage.setItem('prixBon',w_prix)};
  if(af_qte=='no'){ w_qte=0; localStorage.setItem('qteBon',w_qte)};
  if(af_ua=='no'){ w_ua=0; localStorage.setItem('uaBon',w_ua)};
  if(af_plt=='no'){ w_plt=0; localStorage.setItem('pltBon',w_plt)};
  if(af_val=='no'){ w_val=0; localStorage.setItem('valBon',w_val)};

  var totWidth = w_item + w_code + w_des + w_prix + w_qte + w_ua + w_plt + w_val;
  var difWidth = 100 - totWidth ;
   
  if(w_item == 5 ){ w_item = w_item*difWidth/100 + w_item; localStorage.setItem('itemBon',w_item);} 
  if(w_code == 11){ w_code = w_code*difWidth/100 + w_code ;localStorage.setItem('codeBon',w_code);} 
  if(w_des == 30 ){  w_des = w_des*difWidth/100 + w_des ;localStorage.setItem('desBon',w_des);} 
  if(w_prix == 10 ){ w_prix = w_prix*difWidth/100 + w_prix ; localStorage.setItem('prixBon',w_prix);} 	  
  if(w_qte == 8 ){  w_qte = w_qte*difWidth/100 + w_qte ;localStorage.setItem('qteBon',w_qte);} 	  
  if(w_ua == 5 ){   w_ua = w_ua*difWidth/100 + w_ua ;localStorage.setItem('uaBon',w_ua);}
  if(w_val == 13 ){  w_val = w_val*difWidth/100 + w_val ;localStorage.setItem('valBon',w_val);}
  if(w_plt == 18 ){  w_plt = w_plt*difWidth/100 + w_plt ; localStorage.setItem('pltBon',w_plt);}

  var totWidth_n = w_item + w_code + w_des + w_prix + w_qte + w_ua + w_plt + w_val;  
  
  if((totWidth_n < 100)&&(w_des == 30)){ w_des = w_des + (100-totWidth_n);localStorage.setItem('desBon',w_code);}  
  else if( w_des == 0 ){ w_code = w_code + (100 - totWidth_n); localStorage.setItem('codeBon',w_code);}  
  localStorage.setItem('detail_ca','');	 
 }
function chargerMvtTickeBddTalon(code_d){
	var server = $('#ip-serveur').val();
	var url = "http://"+server+"/phoneGap/cabmob/phpmob/getDetailDoc.php?c="+code_d+"";
	var i = 0;
	var  case_vt;
 	$('#talonBon').empty(); 
	case_vt += "<tr   >";
	case_vt += "<th  style='width:20%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;' >Code Art.</t>";
	case_vt += "<th  style='width:45%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;' >D&eacute;signation</th>";
	case_vt += "<th  style='width:10%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;'  >Quantit&eacute;</th>";
	case_vt += "<th  style='width:25%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;'  >Det. Qte</th>";
	case_vt += "</tr>";
    $('#talonBon').append(case_vt); 
	 $.getJSON(url, function(result0) {
		if(result0!=''){
			$.each(result0, function(i, field0) {
				var code_p = field0.code_p;
				var cab = field0.cab;
				var qte = field0.qte_mv;
				var des = field0.des_p;
				//var prix = field.prix;
				//var ua = field.image;
				i +=1 ;
				//alert(cab);
                //prepareTablePrint(code_p,des,qte,prix,cab,ua,i,code_d);
				var  case_vt;
				case_vt += "<tr  ><input type='hidden' id='prod_metre_"+code_p+"' ><input type='hidden' id='prod_pcs_"+code_p+"'  >";
  				case_vt += "<td   style='text-align:center;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;'>"+cab+"</td>";
 				case_vt += "<td   style='text-align:left;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;' >&nbsp;"+des+"</td>";
  				case_vt += "<td   style='text-align:center;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;'>"+qte+"</td>";
 				case_vt += "<td   style='text-align:center;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;'><span id='det_print_plt_tl"+code_p+"' class='del_plt' ></span></td>";
 				case_vt += "</tr>";
				$('#talonBon').append(case_vt); 
				getDetPltProd(code_p);
			});
			$('#nbrArtTalon').html(result0.length);
		}	
	})
}
function chargerMvtTickeBddPrint(code_d){
	var server = $('#ip-serveur').val();
	var url = "http://"+server+"/phoneGap/cabmob/phpmob/getDetailDoc.php?c="+code_d+"";
	var i = 0;
	var  case_v;
	var w_item = localStorage.getItem('itemBon');    var w_code = localStorage.getItem('codeBon');    var w_des = localStorage.getItem('desBon');
    var w_prix = localStorage.getItem('prixBon');    var w_qte = localStorage.getItem('qteBon');    var w_ua = localStorage.getItem('uaBon');
    var w_plt = localStorage.getItem('pltBon');    var w_val = localStorage.getItem('valBon');	

 	$('#detailBon').empty(); 
	case_v += "<tr   >";

	if( w_item > 0) case_v += "<th  style='width:"+w_item+"%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;' >Item</th>";
	if( w_code > 0) case_v += "<th  style='width:"+w_code+"%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;' >Code Art.</t>";
	if( w_des > 0) case_v += "<th  style='width:"+w_des+"%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;' >D&eacute;signation</th>";
	if( w_prix > 0)case_v += "<th  style='width:"+w_prix+"%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;'  >Prix Unitaire</th>";
	if( w_qte > 0)case_v += "<th  style='width:"+w_qte+"%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;'  >Quantit&eacute;</th>";
	if( w_plt > 0)case_v += "<th  style='width:"+w_plt+"%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;'  >Det. Qte</th>";
	if( w_ua > 0)case_v += "<th  style='width:"+w_ua+"%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;' >UA</th>";	
    if( w_val > 0)case_v += "<th  style='width:"+w_val+"%;border: solid 1px black; border-bottom:solid 1px black;align:center;font-size:11px;' >Montant(DA)</th>";
	
	case_v += "</tr>";
	
    $('#detailBon').append(case_v); 
	 $.getJSON(url, function(result) {
		if(result!=''){
			$.each(result, function(i, field) {
				var code_p = field.code_p;
				var cab = field.cab;
				var qte = field.qte_mv;
				var des = field.des_p;
				var prix = field.prix;
				var ua = field.image;
				i +=1 ;
                prepareTablePrint(code_p,des,qte,prix,cab,ua,i,code_d);
				getDetPltProd(code_p);
				$('#DateDocPrint').html(field.date_d); 
			});
			 calculTotal();
		}else{ 
 			 //$('#msg_v').css('color','red');
			 //$('#msg_v').html("Aucun mouvements associ&eacute; à ce document."); 
			 //$('#section-message-v').slideDown(500).delay(1000).slideUp(500);
		}	
	})
}
function prepareTablePrint(code_p,des,qte,prix,cab,ua,ord,code_d){
    var w_item = localStorage.getItem('itemBon');    var w_code = localStorage.getItem('codeBon');    var w_des = localStorage.getItem('desBon');
    var w_prix = localStorage.getItem('prixBon');    var w_qte = localStorage.getItem('qteBon');    var w_ua = localStorage.getItem('uaBon');
    var w_plt = localStorage.getItem('pltBon');    var w_val = localStorage.getItem('valBon');

    var  case_v;
 	case_v += "<tr  ><input type='hidden' id='prod_ua_"+code_p+"' value='"+ua+"' ><input type='hidden' id='prod_metre_"+code_p+"' ><input type='hidden' id='prod_pcs_"+code_p+"'  >";
	if(w_item > 0 )
	  case_v += "<td   style='text-align:center;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;'>"+ord+"</td>";
	if(w_code > 0 )
	  case_v += "<td   style='text-align:center;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;'>"+cab+"</td>";
	if(w_des > 0 )
	  case_v += "<td   style='text-align:left;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;' >&nbsp;"+des+"</td>";
    if(w_prix > 0 )
	  case_v += "<td   style='text-align:right;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;'>"+format(prix,2,' ')+"&nbsp;</td>";
	if(w_qte > 0 )
	  case_v += "<td   style='text-align:center;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;'>"+qte+"</td>";
	if(w_plt > 0 ){
	  case_v += "<td   style='text-align:center;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;'><span id='det_print_plt"+code_p+"' class='del_plt' ></span></td>";
	}
	if(w_ua > 0 )
	  case_v += "<td   style='text-align:center;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;' >"+ua+"</td>";	
	if(w_val > 0 )
      case_v += "<td   style='text-align:right;border: solid 1px black; border-bottom:solid 1px black;font-size:11px;'>"+format(qte*prix,2,' ')+"&nbsp;</td>";

	case_v += "</tr>";
	$('#detailBon').append(case_v); 
}
function setDetailDocPrint(doc){
  	var v_text = '';
	//var inf_credit ='';
	var titre_bon ='';
	var titre_lettre = '';
	var v_text = ''; var textId='';
	$.get("phpmob/getDetailBon.php?code_d="+doc,function(rep){
	var result = JSON.parse(rep);
	var mod =  result[0].mod_doc;
	
   $("#idBon").empty();
   if( mod == 'F' ){
	     titre_bon = " BON DE LIVRAISON " ;
		 titre_lettre = "LE PRESENT BON EST ARRETE A LA SOMME : ";
		 v_text = "LA FACTURE SERA ETABLIE APRES LA LIVRAISON DE CE BON.";   
   }else{
   	     titre_bon = " BON DE LIVRAISON " ;
		 titre_lettre = "LE PRESENT BON EST ARRETE A LA ";
		 v_text = "LA FACTURE SERA ETABLIE APRES LA LIVRAISON DE CE BON.";
   }
   $("#idBon").empty();
   var id_val = "<tr><th style='width: 100%; text-align: center; font-size: 14pt;'>"+titre_bon+"  N&ordm; : "+doc+"</th></tr>";
   $("#idBon").append(id_val);
   setTotalTextPrint(result[0].mt_htc,titre_lettre,v_text);
 });
} 
function setDetailDocClPrint(doc){
	var clt =""; 
	var case_val = "";
	$.get("phpmob/getDetailBonClient.php?code_d="+doc,function(rep){
	var result = JSON.parse(rep);
	if ( result[0].code_f == 0) clt ='' ;
	else clt = result[0].nom; 
	$('#infoClientTalon').html(clt);
   $("#clientBon").empty();
   //var id_val = "<tr><td style='width: 10%; text-align: center; font-size: 13pt;'>"+titre_bon+"</td></tr>";
   case_val += "<tr  >";
   case_val += "<td  style='width: 10%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  ><b>Client</b></td>";
   case_val += "<td style='width: 40%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  ><em>:"+clt+"</em></td>";
   case_val += "<td style='width: 50%; text-align: right; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  ><b>Date : "+ result[0].date_d+"</b></td>";
   case_val += "</tr>";

   if (( result[0].rc != '')&&( result[0].rc != null)){
	   case_val += "<tr  >";
	   case_val += "<td style='width: 10%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  ><b>N.R.C</b></td>";
	   case_val += "<td style='width: 40%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  align='left' ><em>:&nbsp;"+result[0].rc+"</em></td>";
	   case_val += "<td style='width: 50%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  align='center' ></td>";
	   case_val += "</tr>";
   }
   if (( result[0].nif != '')&&( result[0].nif != null)){
	   case_val += "<tr  >";
	   case_val += "<td style='width: 10%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  ><b>N.I.F</b></td>";
	   case_val += "<td style='width: 40%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  align='left' ><em>:&nbsp;"+result[0].nif+"</em></td>";
	   case_val += "<td style='width: 50%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  align='center' ></td>";
	   case_val += "</tr>";
   }
  if (( result[0].nai != '')&&( result[0].nai != null)){
	   case_val += "<tr  >";
	   case_val += "<td style='width: 10%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif' ><b>A.R.T</b></td>";
	   case_val += "<td style='width: 40%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  align='left' ><em>:&nbsp;"+result[0].nai+"</em></td>";
	   case_val += "<td style='width: 50%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  align='center' ></td>";
	   case_val += "</tr>";
   }
   if (( result[0].nis != '')&&( result[0].nis != null)){
	   case_val += "<tr  >";
	   case_val += "<td style='width: 10%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif' ><b>N.I.S</b></td>";
	   case_val += "<td style='width: 40%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  align='left' ><em>:&nbsp;"+result[0].nis+"</em></td>";
	   case_val += "<td style='width: 50%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  align='center' ></td>";
	   case_val += "</tr>";
   }
   if (( result[0].adresse != '')&&( result[0].adresse != null)){
	   case_val += "<tr  >";
	   case_val += "<td style='width: 10%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  ><b>Adresse</b></td>";
	   case_val += "<td style='width: 40%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  align='left' ><em>:&nbsp;"+result[0].adresse+"</em></td>";
	   case_val += "<td style='width: 50%; text-align: left; font-size: 10pt;font-family: Arial, Helvetica, sans-serif'  align='center' ></td>";
	   case_val += "</tr>";
   }   
   $("#clientBon").append(case_val);
 });
} 
function setTotalDocPrint(doc){
  	var v_text = '';
	var inf_credit ='';
	var titre_bon ='';
	var titre_lettre = '';
	var v_text = '';
    var id_val  ='';
	var comment ='';
	var textComment ='';
	$.get("phpmob/getDetailBonRemise.php?code_d="+doc,function(rep){
	var result = JSON.parse(rep);
	var mod =  result[0].mod_doc;
   $("#totalBon").empty();
   if( mod == 'F' ){
	     titre_bon = " BON DE LIVRAISON " ;
		 titre_lettre = "LE PRESENT BON EST ARRETE A LA ";
		 v_text = "LA FACTURE SERA ETABLIE APRES LA LIVRAISON DE CE BON.";   
   }else{
   	     //titre_bon = " BON DE LIVRAISON " ;
		 //titre_lettre = "LE PRESENT BON EST ARRETE A LA ";
		 //v_text = "LA FACTURE SERA ETABLIE APRES LA LIVRAISON DE CE BON.";
   }
   id_val +="<tr><th style='width:80%; text-align: right; font-size: 10px;font-family: Arial, Helvetica, sans-serif'>TOTAL :</th>";
   id_val +="<th style='width: 20%; text-align: right; font-size: 10px;font-family: Arial, Helvetica, sans-serif'><b>"+format(result[0].mt_htc,2,' ')+"&nbsp;</b></th></tr>";
   id_val +="<tr><th style='width:80%; text-align: right; font-size: 10px;font-family: Arial, Helvetica, sans-serif'>REMISE :</th>";
   id_val +="<th style='width: 20%; text-align: right; font-size: 10px;font-family: Arial, Helvetica, sans-serif'><b>"+format(result[0].remise,2,' ')+"&nbsp;</b></th></tr>";
   id_val +="<tr><th style='width:80%; text-align: right; font-size: 10px;font-family: Arial, Helvetica, sans-serif'>TOTAL A PAYER :</th>";
   id_val +="<th style='width: 20%; text-align: right; font-size: 10px;font-family: Arial, Helvetica, sans-serif'><b>"+format(result[0].mt_htc - result[0].remise ,2,' ')+"&nbsp;</b></th></tr>";
   $("#totalBon").append(id_val);
   

   
   //////////  commentaires //////////
   var autoriseCom = localStorage.getItem('autoriser_doc_comment') ;	
   comment = result[0].obs; 
   if((autoriseCom=='yes')&&(comment !='' )){
	   $("#textComment").empty();
	   textComment +="<tr><th style='width:100%; text-align: left; font-size: 10px;'><b>Commentaires :</b></th>";
	   textComment +="<tr><th style='width:100%; text-align: left; font-size: 10px;'>&nbsp;&nbsp;"+comment+"</th>";
	   $("#textComment").append(textComment);
   };
   ///////////////////////////////////   

 });
}
function setTotalTextPrint(total,titre_lettre,v_text){
    var textId ="";
   $("#totalText").empty();
   $.get("phpmob/setTotalText.php?total="+total,function(rep0){
   textId += "<tr><td style='width: 100%; text-align: left; font-size: 10px;font-family: Arial, Helvetica, sans-serif'>"+titre_lettre+"</td></tr>";
   textId += "<tr><td style='width:100%; text-align: left; font-size: 10px;font-family: Arial, Helvetica, sans-serif'><i>"+rep0+"</i></td>";
   textId += "<tr><td style='width: 100%; text-align: left; font-size: 10px;font-family: Arial, Helvetica, sans-serif'>"+v_text+"</td></tr>";
   $("#totalText").append(textId);
 });
}
function setDetailCreditPrint(doc){
        	
	   $("#detailCredit").empty();
	   
	 $.get("phpmob/getTotalCredit.php?code_d="+doc,function(reponse){
		var id_val ="";
		var result = JSON.parse(reponse);
		var anc_solde = parseFloat(result[1]);
		var nouv_solde = parseFloat(result[2]);
		var solde_au = parseFloat(result[4]);
		var total = parseFloat(result[3]);
		//var remise_doc = parseFloat(result[3]);
		var versement = parseFloat(result[0]);
		var dat_doc = result[5];
		//alert(anc_solde);alert(nouv_solde);alert(total);alert(solde_au);alert(versement);alert(dat_doc);
 	    id_val ="<tr><td style='text-align: left; font-size: 10px;font-family: Arial, Helvetica, sans-serif'>&nbsp;<u>Detail credit client </u></td></tr>";
       $("#detailCredit").append(id_val);
	   
	   id_val ="<tr><td style='text-align: left; font-size: 10px;font-family: Arial, Helvetica, sans-serif'><em>&nbsp; Ancien Solde au "+dat_doc+" : "+format(anc_solde,2,' ')+" DA</td></tr>";
	   $("#detailCredit").append(id_val);
	 id_val ="<tr><td style='text-align: left; font-size: 10px;font-family: Arial, Helvetica, sans-serif'><em>&nbsp; Solde au "+dat_doc+" : "+format(total,2,' ')+" DA</td></tr>";
	 
	   $("#detailCredit").append(id_val);
        id_val ="<tr><td style='text-align: left; font-size: 10px;font-family: Arial, Helvetica, sans-serif'><em>&nbsp; Versement du "+dat_doc+" : "+format(versement,2,' ')+" DA</td></tr>";
	  $("#detailCredit").append(id_val);
       
	   id_val ="<tr><td style='text-align: left; font-size: 10px;font-family: Arial, Helvetica, sans-serif'><em>&nbsp; Solde au "+dat_doc+" : "+format(solde_au,2,' ')+" DA</td></tr>";
	   $("#detailCredit").append(id_val);	   
id_val ="<tr><td style='text-align: left; font-size: 10px;font-family: Arial, Helvetica, sans-serif'><em>&nbsp; Solde finale  : "+format(nouv_solde,2,' ')+" DA</td></tr>";
		$("#detailCredit").append(id_val);
			});
}





function calculPalette(qte){
	if(qte !='' ){
	  //var mlcrt = parseFloat(document.getElementById('v_crtpl').value); 
 	  var mlcrt = parseFloat(localStorage.getItem('selected_prod_ca'));
 	  var nbrpcs = parseFloat(localStorage.getItem('selected_prod_pcs'));
 	  //var code_p= document.getElementById('tmp_code_p').value;
	   
	  qte = parseFloat(qte);
 	  if(( mlcrt > 0)&&( nbrpcs > 0)){

		  var nbrCrt_2 = Math.ceil( qte/mlcrt);
		  var mlnbrCrt = nbrCrt_2 * mlcrt ;
 		  mlnbrCrt=Math.round(mlnbrCrt*100)/100;
		  $('#nbrCrt').html(nbrCrt_2);
		  $('#mlnbrCrt').html(mlnbrCrt);
  
		  var nbrCrt = Math.floor( qte / mlcrt);
		  var nbrCrtpcs = nbrCrt;
		  var reste = qte / mlcrt - nbrCrt;
		  var re = qte / mlcrt ;
		  var nbrPcs = reste*nbrpcs ;
		  if( nbrPcs > 0)  nbrPcs = Math.ceil(nbrPcs);
		  var qtePCSml=((nbrCrtpcs*nbrpcs + nbrPcs )*mlcrt)/nbrpcs; 
		  qtePCSml=Math.round(qtePCSml*100)/100;
  		  $('#pcsnbrCrt').html(nbrCrt);	   
		  $('#pcsnbrpcs').html(nbrPcs);
  		  $('#mlnbrCrtPcs').html(qtePCSml);
       } 
	}
}
function getDetCaDoc(doc){
    $.get("phpmob/getDetailBon.php?code_d="+doc,function(rep){
	var result = JSON.parse(rep);
	var t =  result[0].obs1;
	localStorage.setItem('detail_ca',t);
    })
} 
function getDetPltProd(code_p){
    var detail_ca = localStorage.getItem('detail_ca');
  var detail_des = detail_ca.split('|');
  for(j=0;j<detail_des.length;j++){
		var det = detail_des[j].split(':');
		var y = det[0].trim();
		var x = parseInt(y);
 		if(x == code_p){
			//alert(det[1]);
			  $('#det_plt'+code_p).html(det[1]);
			  $('#det_print_plt'+code_p).html(det[1]);
			  $('#det_print_plt_tl'+code_p).html(det[1]);
			  $('#prod_metre_'+code_p).val(det[2]);
			  $('#prod_pcs_'+code_p).val(det[3]);
 		}
  }
}

function rechercherAllProd(){
	 var server = $('#ip-serveur').val();
	 var url = "http://"+server+"/phoneGap/cabmob/phpmob/json_allprod.php";
	 produitObj = [];
     produitRecord = []; 
 	 $.getJSON( url, function( data ){
		  $.each( data, function( key,value){
			  var produitObj = {code_p:value.code_p , cab:value.cab ,des_p:value.des_p , qte:value.qte , prix: value.prix_p};
		  	  produitRecord.push(produitObj);
		  });
		  try{
			 localStorage.setItem('produit','');
			 localStorage["produit"] = JSON.stringify(produitRecord);
		  }catch(e){
			  alert('erreur');
		  }
 	 }); 
} 
function getProdStorage(cp){
 var cab = cp;
 produitObj = [];
 produitRecord =[]; 
 var produit = localStorage.getItem('produit');
 if(produit){
	  $.each(JSON.parse(produit),function(i,obj){
	    if (obj.cab==cp){
			 //alert(obj.des_p);
			$('#code_p').val(obj.code_p);         
			$('#cab').val(obj.cab);         
			$('#designation').val(obj.des_p);         
			$('#prix').val(obj.prix+' Da');  
			$('#quantite').val(obj.qte);  
			//$('#famille').val(famille);
		}
	  });
  }
}
function ajouterProdFromStorageInv(code){
	var case_val ="";
	var nbr =0;
    if( code.length > 0 ){	
	         //artExiste
			 //var cab = cp;
			 //produitObj = [];
			 //produitRecord =[]; 
			 //var artExiste = false;
			 //var produit = localStorage.getItem('produit');
			 //if(produit){
				  /*$.each(JSON.parse(produit),function(i,obj){
					if (obj.cab==code){
						 
					}
				  });*/
			  //}
  			//jQuery.get('data.csv', function(data){
				   var cab = cp;
			       produitObj = [];
			       produitRecord =[]; 
			       var artExiste = false;
			       var produit = localStorage.getItem('produit');
				   var artExiste = false;
				   //var lines = data.split(/\r?\n|\r/);
				   //$.each(lines, function(n, elem) {
				   $.each(JSON.parse(produit),function(i,obj){	  
					  //var rowCells = elem.split(",");
					  //if( rowCells[1].replace( /"/g,'') == code){
					  if (obj.cab==code){
							//var code_p = rowCells[0].replace( /"/g,'');
							//var designation = rowCells[2].replace( /"/g,'');
 							//var qte_p = rowCells[3].replace( /"/g,'');
							var code_p = obj.code_p;
							var designation = obj.des_p;
 							var qte_p = obj.qte;
							qte_p = 1;
							artExiste = true;
							var nbr =  $('#nbr').val();
							if(nbr > 0){
							    var idNew = true; var ex_val = 0; var total=0;
								$('#idata-i tr').each(function() {
								      var idProd = $(this).find('input').eq(0).val();
									  var qteProd = parseFloat($(this).find('td').eq(2).html());
 									  if( idProd == code_p ){
										 //qteProd++;
										 idNew = false;
									     $(this).find("td").eq(2).html(qteProd);
									  }	
  								 });
								 if(idNew){
								       var nombreArt = $('#nbr').val();
								       nombreArt++;
									   $('#articleLu').html(nombreArt);
									   case_val += "<tr   >";
									   case_val += "<td width='20%'   >"+code+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
									   case_val += "<td width='60%'   >"+designation+"</td>";
									   case_val += "<td width='10%' class='tqte'  align='center' >"+qte_p+"</td>";
									   case_val += "<td width='10%'   align='center'><img id='img-delete' class='img-delete'    src='img/delete.gif'   ></td>";
									   case_val += "</tr>";
									   nbr++;
 									   $("#idata-i").append(case_val);										  
 								  } 
 						          $('#msg_i').html(''); 
							 }else{
							           case_val += "<tr  >";
									   case_val += "<td width='20%'   >"+code+"<input type='hidden' id='"+code_p+"' value='"+code_p+"' ></td>";
									   case_val += "<td width='60%'   >"+designation+"</td>";
									   case_val += "<td width='10%' class='tqte'  align='center' >"+qte_p+"</td>";
									   case_val += "<td width='10%'   align='center'><img id='img-delete' class='img-delete'    src='img/delete.gif'   ></td>";
								       case_val += "</tr>";
								       nbr++;
									   $('#articleLu').html(1);
									   //$('#articleLu').html(nbr);							 
	 								   $("#idata-i").append(case_val);
									   $('#msg_i').html('');
							 }
   							$('#cab_i').val('');
							$('#cab_i').focus();
							$('#nbr').val(parseFloat(nbr));
					  }
				   }); //// fin each ligne
				   $('#msg_i').html('');
					//alert(artExiste);
					if(!artExiste){
					   $('#msg_i').css('color','red');
					   $('#msg_i').html("Le produit  n'existe pas dans le fichier de donn&eacute;es.");
					   //$('#msg_i').html('Le produit :'+$('#cab_i').val()+" n'existe pas dans la base de donn&eacute;es."); 
					   $('#section-message-i').slideDown(800).delay(500).slideUp(500);
					}  			
 			//});  // fin jquery.get
 		}
 }