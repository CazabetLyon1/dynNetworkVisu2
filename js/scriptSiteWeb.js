function getResumeSaison(saison)
{
  var chemin = document.location.pathname;
  var fichierHTML = chemin.substring(chemin.lastIndexOf( "/" )+1);

  var saison_ = saison.firstChild.nodeValue;

  if(fichierHTML === "BB.html")
  {
    if(saison_ === " Saison 1 ")
    {
      document.getElementById("resume1").attributes[1].value = "visible";
      document.getElementById("resume2").attributes[1].value = "hidden";
      document.getElementById("resume3").attributes[1].value = "hidden";
    }
    else if(saison_ === " Saison 2 ")
    {
      document.getElementById("resume2").attributes[1].value = "visible";
      document.getElementById("resume1").attributes[1].value = "hidden";
      document.getElementById("resume3").attributes[1].value = "hidden";
    }
    else if(saison_ === " Saison 3 ")
    {
      document.getElementById("resume3").attributes[1].value = "visible";
      document.getElementById("resume1").attributes[1].value = "hidden";
      document.getElementById("resume2").attributes[1].value = "hidden";
    }
  }
  else if(fichierHTML === "GoT.html")
  {
    if(saison_ === " Saison 1 ")
    {
      document.getElementById("resume1").attributes[1].value = "visible";
      document.getElementById("resume2").attributes[1].value = "hidden";
      document.getElementById("resume3").attributes[1].value = "hidden";
      document.getElementById("resume4").attributes[1].value = "hidden";
      document.getElementById("resume5").attributes[1].value = "hidden";
    }
    else if(saison_ === " Saison 2 ")
    {
      document.getElementById("resume2").attributes[1].value = "visible";
      document.getElementById("resume1").attributes[1].value = "hidden";
      document.getElementById("resume3").attributes[1].value = "hidden";
      document.getElementById("resume4").attributes[1].value = "hidden";
      document.getElementById("resume5").attributes[1].value = "hidden";
    }
    else if(saison_ === " Saison 3 ")
    {
      document.getElementById("resume3").attributes[1].value = "visible";
      document.getElementById("resume1").attributes[1].value = "hidden";
      document.getElementById("resume2").attributes[1].value = "hidden";
      document.getElementById("resume4").attributes[1].value = "hidden";
      document.getElementById("resume5").attributes[1].value = "hidden";
    }
    else if(saison_ === " Saison 4 ")
    {
      document.getElementById("resume4").attributes[1].value = "visible";
      document.getElementById("resume1").attributes[1].value = "hidden";
      document.getElementById("resume2").attributes[1].value = "hidden";
      document.getElementById("resume3").attributes[1].value = "hidden";
      document.getElementById("resume5").attributes[1].value = "hidden";
    }
    else if(saison_ === " Saison 5 ")
    {
      document.getElementById("resume5").attributes[1].value = "visible";
      document.getElementById("resume1").attributes[1].value = "hidden";
      document.getElementById("resume2").attributes[1].value = "hidden";
      document.getElementById("resume3").attributes[1].value = "hidden";
      document.getElementById("resume4").attributes[1].value = "hidden";
    }
  }
  else if(fichierHTML === "HoC.html")
  {
    if(saison_ === " Saison 1 ")
    {
      document.getElementById("resume1").attributes[1].value = "visible";
      document.getElementById("resume2").attributes[1].value = "hidden";
    }
    else if(saison_ === " Saison 2 ")
    {
      document.getElementById("resume2").attributes[1].value = "visible";
      document.getElementById("resume1").attributes[1].value = "hidden";
    }

  }

}
