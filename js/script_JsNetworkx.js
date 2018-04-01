var G;
var episode = 0;
var pIdEdgeList = [];
var pIdEdge = [];
var idList;
var idEdge;

var chemin = document.location.pathname;
var fichierHTML = chemin.substring(chemin.lastIndexOf( "/" )+1);

if(fichierHTML === "BB.html")
{
	listeEpi = listeEpi.sort();
	if(listeEpi[0] == "") listeEpi.splice(0, 1);
	initGraph('Donnees/BB_dyn_ts10/'+listeEpi[0]);
}
else if(fichierHTML === "GoT.html")
{
	listeEpi = listeEpi.sort();
	if(listeEpi[0] == "") listeEpi.splice(0, 1);
	initGraph('Donnees/GoT_dyn_ts10/'+listeEpi[0]);
}
else if(fichierHTML === "HoC.html")
{
	listeEpi = listeEpi.sort();
	if(listeEpi[0] == "") listeEpi.splice(0, 1);	
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
		pIdEdgeList.push(idList);
		//---------- AFFICHAGE D3 ----------
		affichageD3( idList, pIdEdgeList[pIdEdgeList.length-1]);
	});
}
/*
function episodeSuivant(){
		next = listeEpi[listeEpi.indexOf(episode)+1];
		episode = next;
		console.log(episode);

    loadJSON('Donnees/BB_dyn_ts10/'+next, function(response) {
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
	updateGraph(idList, idEdge);
});
}

function episodePrecedent(){
		prev = listeEpi[listeEpi.indexOf(episode)-1];
		episode = prev;
		console.log(episode);

    loadJSON('Donnees/BB_dyn_ts10/'+prev, function(response) {
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
	updateGraph(idList, idEdge);
});
}
*/
function updateEpisode(e){
	prev = listeEpi[e];
	pIdList = idList;

	loadJSON('Donnees/BB_dyn_ts10/'+prev, function(response) {
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
	console.log(e);
	console.log(episode);
	for (var i = jsonresponse.links.length - 1; i >= 0; i--) {
		idEdge.push(jsonresponse.links[i]);
		//console.log(jsonresponse.links[i])
		G.addEdge(jsonresponse.links[i].source, jsonresponse.links[i].target);
	}
	if(e == 'next') {pIdEdge = pIdEdge.concat(idEdge); pIdEdgeList.push(pIdEdge)}
	else pIdEdgeList.pop();
	//---------- AFFICHAGE D3 ----------
	console.log(pIdEdgeList[pIdEdgeList.lenght-1]);
	updateGraph(idList, idEdge);
});
}

function tailleDuNoeudVoisin(n){
	//Retourne la taille du noeud en fonction du nombre de voisins
	/*if(G.neighbors(n.id).length>10){return 13;}
	else if(G.neighbors(n.id).length>5){return 8}
	else if(G.neighbors(n.id).length>2){return 5}
		else{return 3;}*/
	if (G.node.get(n.id)!=null) {
		var voisins = G.neighbors(n.id).length;
		if (voisins == 1) {return 3;}
		else {return Math.log(voisins)*7;}
	}
}

function couleurDuNoeudVoisin(n){
	//Retourne la couleur du noeud en fonction du nombre de voisins
	/*if(G.neighbors(n.id).length>10){return 'Red';}
	else if(G.neighbors(n.id).length>5){return 'Blue'}
		else{return '#E7EA00';}*/
	if (G.node.get(n.id)!=null) {
		var voisins = G.neighbors(n.id).length;
		if (voisins>=10) {return "#"+voisins+"0";}
		else {return "#"+voisins+"00";}
	}
}

/*var width = 1920, height = 1080

var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

var force = d3.layout.force()
		.gravity(0.05)
		.distance(100)
		.charge(-100)
		.size([width, height])
		.nodes(idList)
		.links(idEdge)
		.start();

	var link = svg.selectAll(".link")
			.data(idEdge)
		.enter().append("line")
			.attr("class", "link");

	var node = svg.selectAll(".node")
			.data(idList)
		.enter().append("g")
			.attr("class", "node")
			.call(force.drag);

		node.append("image")
			//.attr("xlink:href", "https://github.com/favicon.ico")
			.attr("x", -8)
			.attr("y", -8)
			.attr("width", 16)
			.attr("height", 16);

		node.append("text")
			.attr("dx", 12)
			.attr("dy", ".35em")
			.text(function(d) { return d.name });

		node.append("circle")
				.attr("r", 15);


	force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

		node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	});*/

					 /* jsnx.draw(G, {
								element: '#canevas',
								layoutAttr: {
										charge: -120,
										linkDistance: 20
								},
								nodeAttr: {
									r: function(d){
												if(G.neighbors(d.node).length>10){return 30;}
												else if(G.neighbors(d.node).length>5){return 20}
													else{return 10;}
												return (G.neighbors(d.node).length)*3},
										title: function(d) { return d.node;}
								},
								nodeStyle: {
										fill : function(d){
												if(G.neighbors(d.node).length>10){return 'red';}
												else if(G.neighbors(d.node).length>5){return 'blue'}
												else{return 'yellow';}},
								},
										stroke: 'none',
								edgeStyle: {
										fill: '#999'
								}
							});
						});*/
