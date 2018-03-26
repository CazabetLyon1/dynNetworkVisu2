<?php
$iterator = new DirectoryIterator('../Donnees/Photos/'.$_GET['photo']);

// On boucle sur la liste des photos retournés dans l'itérateur
foreach($iterator as $photo){
      if(explode(".", $photo)[1] == "jpg") echo $photo.'§';
}
?>
