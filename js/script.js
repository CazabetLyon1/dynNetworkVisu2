function sliderCreate(){
	document.getElementById("rangeEpisode").innerHTML = '<input type="range" min="0" max="'+listeEpi.length+'" value="0" class="slider" style="height: 40px" id="episodeChoisi">';
	var slider = document.getElementById("episodeChoisi");
	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
	updateEpisode(this.value);
}}

function sliderDelete(){
	document.getElementById("rangeEpisode").innerHTML = '<div class="progress"><div class="progress-bar" id="progBarCumule" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>';
}

function updateSlider(e){
	document.getElementById("rangeEpisode").childNodes[0].attributes[2].nodeValue = e;
}
