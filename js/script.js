var G = new jsnx.Graph();
        var idList = [];

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
                idList.push(jsonresponse.nodes[i].id);
                console.log("nique ta mere");
            }


            for (var i = jsonresponse.links.length - 1; i >= 0; i--) {
                G.addEdge(jsonresponse.links[i].source, jsonresponse.links[i].target);
            }

            for (var i = idList.length - 1; i >= 0; i--) {
                if (G.neighbors(idList[i]).length < 8) {console.log("p");}
            }

            G.addNodesFrom(idList);
            jsnx.draw(G, {
            element: '#canvas',  
             weighted: true,
             edgeStyle: {
            'stroke-width': 10
            }
            });
        });