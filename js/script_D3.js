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