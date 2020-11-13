<?php
include "db.php";
//include("validation-mob.php");
$c = $_GET['selected'];
$req= "select * from client order by code_cl asc";
$rs=mysqli_query($con,$req);
?>
<select id="client" >
    <option value=""></option>
	<?php while($cl=mysqli_fetch_assoc($rs)){  ?>
	   <option value="<?php echo ($cl['code_cl']) ?>"  <?php echo ((($c != "")&&($c==$cl['code_cl']))?"selected='selected'" : "") ?>  >
	     <?php echo ($cl['nom'])?> </option>
	<?php } ?>	 
</select>