<?php
    $repertories_array = new DirectoryIterator("glob://../Donnees/*"); //Recover a array of repositories

    foreach($repertories_array as $pdf)
    {
      $name_pdf = $pdf->getFilename();
      echo $name_pdf;
    }
?>
