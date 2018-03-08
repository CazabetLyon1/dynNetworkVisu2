<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="css/style.css">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <svg width="960" height="600"></svg>
    <script src="https://d3js.org/d3.v4.js"></script>
    
  <script>
    d3v4 = d3
    window.d3 = null
  </script>
  <?php
    if ($handle = opendir('Donnees/BB_dyn_ts10')) {
    $list = array();
    while (false !== ($entry = readdir($handle))) {

        if ($entry != "." && $entry != ".." && strpos($entry, '.json') !== false) {

            array_push($list, $entry);
        }
    }

    closedir($handle);
}
  function js_str($s)
{
    return '"' . addcslashes($s, "\0..\37\"\\") . '"';
}

function js_array($array)
{
    $temp = array_map('js_str', $array);
    return '[' . implode(',', $temp) . ']';
}
  asort($list);
 echo '<script> var listeEpi = ', js_array($list), ';</script>';
?>
  <script src="https://d3js.org/d3.v3.js"></script>
    <script src="js/jsnetworkx.js"></script>
    <script src="js/script_JsNetworkx.js"></script>
    <script src="js/script_D3.js"></script>
    <!--<script src="js/script_D3.js"></script>-->

</head>
<body>
	<body>
   <!-- Tests affichage JSNetworkX
    <div id="canevas"></div>
  -->
  <button onclick="episodePrecedent()"><-- Episode precedent</button>
  <button onclick="episodeSuivant()">Episode suivant --></button>
  <div id="image">
      <img id="img" src="Donnees/Photos/BB/Walter_White.jpg" alt="Photo">
      <p id="name">Walter White</p>
  <div>
</body>

</body>
</html>
