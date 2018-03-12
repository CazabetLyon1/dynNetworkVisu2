function getResumeSaison(saison)
{
  var saison_ = saison.firstChild.nodeValue;
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
