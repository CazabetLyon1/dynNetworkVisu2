var svg = d3v4.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var color = d3v4.scaleOrdinal(d3v4.schemeCategory20);

var simulation = d3v4.forceSimulation()
.force("link", d3v4.forceLink().id(function(d) { return d.id; }))
.force("charge", d3v4.forceManyBody())
.force("center", d3v4.forceCenter(width / 2, height / 2));

var link = svg.append("g").selectAll(".link"),
  node = svg.append("g").selectAll(".node");

function affichageD3(nodes, edges) {

  link = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(edges)
  .enter().append("line")
  .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  node = svg.append("g")
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
    var chemin = document.location.pathname;
    var fichierHTML = chemin.substring(chemin.lastIndexOf( "/" )+1);

    var id = this.childNodes[3].innerHTML;
    var name = this.childNodes[2].innerHTML;
    default_image = "Donnees/Photos/Default.png";

    listePhoto = listePhoto.sort();
    //if(listePhoto[0] == "") listePhoto.splice(0, 1);
    //compter le nombre de photos

    if(fichierHTML === "BB.html")
    {
      var i;
      var photoOK = false;
      for (i = 0; i < 20; i++)
      {
        var photo = listePhoto[i];
        if ((name + ".jpg") === photo)
        {
          image = "Donnees/Photos/BB/" + photo;
          document.getElementById('img').attributes[1].value = image;
          photoOK = true;
        }
      }
      if (photoOK === false)
      {
        document.getElementById('img').attributes[1].value = default_image;
      }

      document.getElementById('name').innerHTML = name;
    }
    else if(fichierHTML === "GoT.html")
    {
      var i;
      var photoOK = false;
      for (i = 0; i < 20; i++)
      {
        var photo = listePhoto[i];
        if ((name + ".jpg") === photo)
        {
          image = "Donnees/Photos/GoT/" + photo;
          document.getElementById('img').attributes[1].value = image;
          photoOK = true;
        }
      }
      if (photoOK === false)
      {
        document.getElementById('img').attributes[1].value = default_image;
      }

      document.getElementById('name').innerHTML = name;
    }
    else if(fichierHTML === "HoC.html")
    {
      var i;
      var photoOK = false;
      for (i = 0; i < 20; i++)
      {
        var photo = listePhoto[i];
        if ((name + ".jpg") === photo)
        {
          image = "Donnees/Photos/HoC/" + photo;
          document.getElementById('img').attributes[1].value = image;
          photoOK = true;
        }
      }
      if (photoOK === false)
      {
        document.getElementById('img').attributes[1].value = default_image;
      }

      document.getElementById('name').innerHTML = name;
    }
  });

  simulation
  .nodes(idList)
  .on("tick", ticked);

  simulation.force("link")
  .links(idEdge);


}



function updateGraph(nodes, edges) {
  update(nodes, edges);
  
}



function update(nodes, links) {
    // Update link set based on current state
  // DATA JOIN
  link = link.data(links);
  
  // EXIT
    // Remove old links
  link.exit().remove();

  // ENTER
    // Create new links as needed.  
  link = link.enter().append("line")
    .attr("class", "link")
    .merge(link);

  // DATA JOIN
  node = node.data(nodes);

  // EXIT
  node.exit().remove();

  // ENTER
  node = node.enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .attr("fill", function(d) {return color(d.group);})
    .call(d3v4.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
        )
    .merge(node);

  //  Set nodes, links, and alpha target for simulation
  simulation
    .nodes(nodes)
    .on("tick", ticked);

    simulation.force("link")
      .links(links);

    simulation.alphaTarget(1).restart();
}

// function updateGraph(nodes, edges) {

//   link = link.data(link, function(d) { //console.log(edges); console.log(d);
//     //console.log(edges.includes(d));
//     var existe = false;
//     for (var i = edges.length - 1; i >= 0; i--) {
//        if((d.source.id==edges[i].source) && (d.target.id==edges[i].target)){existe = true;}
//     }
//     if(existe) linkBis.push(d);
//     //if (!edges.includes(d)) return d.source.id + "-" + d.target.id; 
//   });
//   console.log(linkBis);
//   console.log(link);
//   link.exit().remove();
//   link = svg.append("g")
//   .attr("class", "links")
//   .selectAll("line")
//   .data(edges)
//   .enter().append("line")
//   .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

//   node = node.data(node, function(d) { return d.id;});
//   node.exit().remove();
//   node = svg.append("g")
//   .attr("class", "nodes")
//   .selectAll("circle")
//   .data(nodes)
//   .enter().append("circle")
//   .attr("r", function(d){return tailleDuNoeudVoisin(d);})
//   .attr("fill", function(d) { return couleurDuNoeudVoisin(d);})
//   .call(d3v4.drag()
//     .on("start", dragstarted)
//     .on("drag", dragged)
//     .on("end", dragended));

//   node.append("title")
//   .text(function(d) { return d.label; });

//   node.append("image")
//   .attr("xlink:href", function(d) { return d.image; });

//   node.append("text")
//   .text(function(d) { return d.label; });

//   node.append("id")
//   .text(function(d) { return d.id; });

//   node.on("click", function()
//   {
//     var chemin = document.location.pathname;
//     var fichierHTML = chemin.substring(chemin.lastIndexOf( "/" )+1);

//     var id = this.childNodes[3].innerHTML;
//     var name = this.childNodes[2].innerHTML;
//     default_image = "Donnees/Photos/Default.png";

//     listePhoto = listePhoto.sort();
//     //if(listePhoto[0] == "") listePhoto.splice(0, 1);
//     //compter le nombre de photos

//     if(fichierHTML === "BB.html")
//     {
//       var i;
//       var photoOK = false;
//       for (i = 0; i < 20; i++)
//       {
//         var photo = listePhoto[i];
//         if ((name + ".jpg") === photo)
//         {
//           image = "Donnees/Photos/BB/" + photo;
//           document.getElementById('img').attributes[1].value = image;
//           photoOK = true;
//         }
//       }
//       if (photoOK === false)
//       {
//         document.getElementById('img').attributes[1].value = default_image;
//       }

//       document.getElementById('name').innerHTML = name;
//     }
//     else if(fichierHTML === "GoT.html")
//     {
//       var i;
//       var photoOK = false;
//       for (i = 0; i < 20; i++)
//       {
//         var photo = listePhoto[i];
//         if ((name + ".jpg") === photo)
//         {
//           image = "Donnees/Photos/GoT/" + photo;
//           document.getElementById('img').attributes[1].value = image;
//           photoOK = true;
//         }
//       }
//       if (photoOK === false)
//       {
//         document.getElementById('img').attributes[1].value = default_image;
//       }

//       document.getElementById('name').innerHTML = name;
//     }
//     else if(fichierHTML === "HoC.html")
//     {
//       var i;
//       var photoOK = false;
//       for (i = 0; i < 20; i++)
//       {
//         var photo = listePhoto[i];
//         if ((name + ".jpg") === photo)
//         {
//           image = "Donnees/Photos/HoC/" + photo;
//           document.getElementById('img').attributes[1].value = image;
//           photoOK = true;
//         }
//       }
//       if (photoOK === false)
//       {
//         document.getElementById('img').attributes[1].value = default_image;
//       }

//       document.getElementById('name').innerHTML = name;
//     }
//   });


//   simulation.nodes(nodes);
//   simulation.force("link").links(edges);
//   simulation.alpha(1).restart();
// }

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
