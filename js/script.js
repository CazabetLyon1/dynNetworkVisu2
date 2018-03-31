document.getElementById("rangeEpisode").innerHTML = '<input type="range" min="0" max="'+listeEpi.length+'" value="0" class="slider" id="episodeChoisi">';

var slider = document.getElementById("episodeChoisi");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    updateEpisode(this.value);
}