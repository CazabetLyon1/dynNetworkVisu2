function affichageCumule(){
	sliderDelete();
document.getElementById("btnCumule").disabled = true;
document.getElementById("btnParEpisode").disabled = false;
var btnVoisins = document.createElement('button');
var btnAncien = document.createElement('button');
btnVoisins.setAttribute("style", "margin-top:10px;");
btnVoisins.setAttribute("id", "btnVoisins");
btnVoisins.setAttribute("type","button");
btnVoisins.setAttribute("class", "btn btn-primary");
btnVoisins.innerHTML += "Nb voisins";

btnAncien.setAttribute("style", "margin-top:10px;");
btnAncien.setAttribute("id", "btnAncien");
btnAncien.setAttribute("type","button");
btnAncien.setAttribute("class", "btn btn-primary");
btnAncien.innerHTML += "Ancienneté";

document.getElementById("choixCouleur").appendChild(btnVoisins);
document.getElementById("choixCouleur").appendChild(btnAncien);

var serie = location.pathname.substring(1).split("/")[1].split(".")[0];
initGraph('Donnees/'+serie+"_cum_D3.json");
}


function loadJSON(JSONfile, callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', JSONfile, true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// .open will NOT return a value but simply returns undefined in async mode so use a callback
			callback(xobj.responseText);
		}
	}
	xobj.send(null);

}

function initGraph(e){
	loadJSON(e, function(response) {
		// Do Something with the response e.g.
		jsonresponse = JSON.parse(response);
		G = new jsnx.Graph();
		idList = [];
		idEdge = [];

		for (var i = jsonresponse.nodes.length - 1; i >= 0; i--) {
			idList.push(jsonresponse.nodes[i]);
			//console.log(jsonresponse.nodes[i]);
		}
		G.addNodesFrom(idList);

		for (var i = jsonresponse.links.length - 1; i >= 0; i--) {
			idEdge.push(jsonresponse.links[i]);
			//console.log(jsonresponse.links[i])
			G.addEdge(jsonresponse.links[i].source, jsonresponse.links[i].target);
		}

		//---------- AFFICHAGE D3 ----------
		affichageD3Cumule(idList, idEdge);
	});
}