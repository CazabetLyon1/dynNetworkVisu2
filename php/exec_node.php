<?php
$iterator = new DirectoryIterator('../Donnees/'.$_GET['serie']);

// On boucle sur la liste des documents retournés dans l'itérateur
foreach($iterator as $document){
      if(explode(".",$document)[1] == "json") echo $document.'§';
}
?>