var G = new jsnx.Graph();
var idList = [];
var idEdge = [];

function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'Donnees/BB_cum_D3.json', true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// .open will NOT return a value but simply returns undefined in async mode so use a callback
			callback(xobj.responseText);
		}
	}
	xobj.send(null);

}

// Call to function with anonymous callback


loadJSON(function(response) {
	// Do Something with the response e.g.
	jsonresponse = JSON.parse(response);


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

function affichageD3(nodes, edges) {
	var svg = d3v4.select("svg"),
	width = +svg.attr("width"),
	height = +svg.attr("height");

	var color = d3v4.scaleOrdinal(d3v4.schemeCategory20);

	var simulation = d3v4.forceSimulation()
	.force("link", d3v4.forceLink().id(function(d) { return d.id; }))
	.force("charge", d3v4.forceManyBody())
	.force("center", d3v4.forceCenter(width / 2, height / 2));


	var svg = d3v4.select("svg"),
	width = +svg.attr("width"),
	height = +svg.attr("height");

	var color = d3v4.scaleOrdinal(d3v4.schemeCategory20);

	var simulation = d3v4.forceSimulation()
	.force("link", d3v4.forceLink().id(function(d) { return d.id; }))
	.force("charge", d3v4.forceManyBody())
	.force("center", d3v4.forceCenter(width / 2, height / 2));

	var link = svg.append("g")
	.attr("class", "links")
	.selectAll("line")
	.data(edges)
	.enter().append("line")
	.attr("stroke-width", function(d) { return Math.sqrt(d.value); });

	var node = svg.append("g")
	.attr("class", "nodes")
	.selectAll("circle")
	.data(nodes)
	.enter().append("circle")
	.attr("r", function(d){return tailleDuNoeudVoisin(d);})
	.attr("fill", function(d) { return couleurDuNoeudVoisin(d);})
	.call(d3v4.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended));


	node.append("title")
	.text(function(d) { return d.label; });

	node.append("image")
	.attr("xlink:href", function(d) { return d.image; });

	node.append("text")
	.text(function(d) { return d.label; });

	node.append("id")
	.text(function(d) { return d.id; });

	node.on("click", function()
	{
		var path_image = "<img src=\"Donnees/Photos/BB/Walter_White.jpg\" alt=\"Image\">";
		var id = this.childNodes[3].innerHTML;
		var node_image = this.childNodes[1].href.baseVal;
		var name = this.childNodes[2].innerHTML;

		if (node_image === "")
		{
			default_image = "Donnees/Photos/Default.png";
			document.getElementById('img').attributes[1].value = default_image;
		}
		else
		{
			image = node_image
			document.getElementById('img').attributes[1].value = image;
		}

		document.getElementById('name').innerHTML = name;
	});

	simulation
	.nodes(idList)
	.on("tick", ticked);

	simulation.force("link")
	.links(idEdge);

	function ticked() {
		link
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });

		node
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	}

	function dragstarted(d) {
		if (!d3v4.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3v4.event.x;
		d.fy = d3v4.event.y;
	}

	function dragended(d) {
		if (!d3v4.event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}
}

function tailleDuNoeudVoisin(n){
	//Retourne la taille du noeud en fonction du nombre de voisins
	/*if(G.neighbors(n.id).length>10){return 13;} 
	else if(G.neighbors(n.id).length>5){return 8}
	else if(G.neighbors(n.id).length>2){return 5}  
	else{return 3;}*/
	var voisins = G.neighbors(n.id).length;
	if (voisins == 1) {return 3;}
	else {return Math.log(voisins)*7;}
}

function couleurDuNoeudVoisin(n){
	//Retourne la couleur du noeud en fonction du nombre de voisins
	/*if(G.neighbors(n.id).length>10){return 'Red';} 
	else if(G.neighbors(n.id).length>5){return 'Blue'} 
	else{return '#E7EA00';}*/
	var voisins = G.neighbors(n.id).length;
	if (voisins>=10) {return "#"+voisins+"0";}
	else {return "#"+voisins+"00";}
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
