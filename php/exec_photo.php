<?php
$iterator = new DirectoryIterator('../Donnees/Photos/'.$_GET['serie']);

// On boucle sur la liste des photos retournés dans l'itérateur
foreach($iterator as $photo){
      if(explode(".", $photo)[1] == "jpg") echo $photo.'§';
}
?>
