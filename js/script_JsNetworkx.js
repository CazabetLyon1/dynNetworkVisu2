var G;
var idList;
var idEdge;

var chemin = document.location.pathname;
var fichierHTML = chemin.substring(chemin.lastIndexOf( "/" )+1);

if(fichierHTML === "BB.html")
{
	listeEpi = listeEpi.sort();
	if(listeEpi[0] == "") listeEpi.splice(0, 1);
	var episode = listeEpi[0];
	initGraph('Donnees/BB_dyn_ts10/'+listeEpi[0]);
}
else if(fichierHTML === "GoT.html")
{
	listeEpi = listeEpi.sort();
	if(listeEpi[0] == "") listeEpi.splice(0, 1);
	var episode = listeEpi[0];
	initGraph('Donnees/GoT_dyn_ts10/'+listeEpi[0]);
}
else if(fichierHTML === "HoC.html")
{
	listeEpi = listeEpi.sort();
	if(listeEpi[0] == "") listeEpi.splice(0, 1);
	var episode = listeEpi[0];
	initGraph('Donnees/HoC_dyn_ts10/'+listeEpi[0]);
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
		affichageD3(idList, idEdge);
	});
}

function updateEpisode(e){
	prev = listeEpi[e];

    loadJSON('Donnees/BB_dyn_ts10/'+prev, function(response) {
	// Do Something with the response e.g.
	jsonresponse = JSON.parse(response);
	G = new jsnx.Graph();
	idList = [];
	idEdge = [];


	for (var i = jsonresponse.nodes.length - 1; i >= 0; i--) {
		idList.push(jsonresponse.nodes[i]);
	}
	G.addNodesFrom(idList);

	for (var i = jsonresponse.links.length - 1; i >= 0; i--) {
		idEdge.push(jsonresponse.links[i]);
		G.addEdge(jsonresponse.links[i].source, jsonresponse.links[i].target);
	}

	//---------- AFFICHAGE D3 ----------
	updateGraph(idList, idEdge);
});
}

function tailleDuNoeudVoisin(n){
	//Retourne la taille du noeud en fonction du nombre de voisins

	if (G.node.get(n.id)!=null) {
		var voisins = G.neighbors(n.id).length;
		if (voisins == 1) {return 3;}
		else {return Math.log(voisins)*7;}
	}
}

function couleurDuNoeudVoisin(n){
	//Retourne la couleur du noeud en fonction du nombre de voisins

	if (G.node.get(n.id)!=null) {
		var voisins = G.neighbors(n.id).length;
		if (voisins>=10) {return "#"+voisins+"0";}
		else {return "#"+voisins+"19";}
	}
}
