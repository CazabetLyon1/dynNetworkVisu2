var apparition = [];
var Gcum = new jsnx.Graph();

function affichageCumule() {
    var Gcum;
    var nbVoisinTaille;
    var nbVoisinCouleur;
    sliderDelete();

    document.getElementById("btnCumule").disabled = true;
    document.getElementById("btnParEpisode").disabled = false;
    document.getElementById("choixCumule").attributes.class.nodeValue = "visible";
    nbVoisinTailleClique();
    nbVoisinCouleurClique();

    var chemin = document.location.pathname;
    var fichierHTML = chemin.substring(chemin.lastIndexOf("/") + 1);

    if (fichierHTML === "BB.html") {
      initGraphCumule("Donnees/BB_cum_D3.json");
    } else if (fichierHTML === "GoT.html") {
      initGraphCumule("Donnees/GoT_cum_D3.json");
    } else if (fichierHTML === "HoC.html") {
      initGraphCumule("Donnees/HoC_cum_D3.json");
    }
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

function initGraphCumule(e) {
    var li = 0;
    loadJSON(e, function(response) {
        // Do Something with the response e.g.
        jsonresponse = JSON.parse(response);
        Gcum = new jsnx.Graph();
        idList = [];
        idEdge = [];

        for (var i = jsonresponse.nodes.length - 1; i >= 0; i--) {
            idList.push(jsonresponse.nodes[i]);
        }
        Gcum.addNodesFrom(idList);
        for (var i = jsonresponse.links.length - 1; i >= 0; i--) {
            idEdge.push(jsonresponse.links[i]);
            //G.addEdge(jsonresponse.links[i].source, jsonresponse.links[i].target);
        }

        loadAllEpisodes(idList, idEdge, 10, li);
    });
}

function nbVoisinTailleClique() {
    document.getElementById("btnVoisinsTaille").disabled = true;
    document.getElementById("btnAncienTaille").disabled = false;
    nbVoisinTaille = true;
    changeTaille();
}

function ancienTailleClique() {
    document.getElementById("btnVoisinsTaille").disabled = false;
    document.getElementById("btnAncienTaille").disabled = true;
    nbVoisinTaille = false;
    changeTaille();
}

function nbVoisinCouleurClique() {
    document.getElementById("btnVoisinsCouleur").disabled = true;
    document.getElementById("btnAncienCouleur").disabled = false;
    nbVoisinCouleur = true;
    changeCouleur();
}

function ancienCouleurClique() {
    document.getElementById("btnVoisinsCouleur").disabled = false;
    document.getElementById("btnAncienCouleur").disabled = true;
    nbVoisinCouleur = false;
    changeCouleur();

}

function loadAllEpisodes(idListe, idEdge, time, i) {
    Gcum = new jsnx.Graph();
    Gcum.addNodesFrom(idListe);
    for (var j = i - 1; j >= 0; j--) {
        Gcum.addEdge(idEdge[j].source.id, idEdge[j].target.id);
        if (apparition.indexOf(idEdge[j].source.id) == -1) apparition.push(idEdge[j].source.id);
        if (apparition.indexOf(idEdge[j].target.id) == -1) apparition.push(idEdge[j].target.id);
    }
    var idEdgeT = idEdge.slice(0, i);

    //---------- AFFICHAGE D3 ----------
    affichageD3Cumule(idList, idEdgeT);

    i = i + 1;
    document.getElementById("progBarCumule").setAttribute("aria-valuenow", (i * 100) / idEdge.length);
    document.getElementById("progBarCumule").setAttribute("style", "width:" + (i * 100) / idEdge.length + "%");
    timeoutCumule = setTimeout(function() { if (i < idEdge.length) loadAllEpisodes(idListe, idEdge, time, i);
        else console.log(apparition); }, time);

}

function tailleDuNoeudVoisinCumule(n) {
    //Retourne la taille du noeud en fonction du nombre de voisins
    if (Gcum.node.get(n.id) != null) {
        var voisins = Gcum.neighbors(n.id).length;
        if (voisins == 1) { return 3; } else { return Math.log(voisins) * 7 + 2; }
    }
}

function tailleDuNoeudAncienCumule(n) {
    //Retourne la taille du noeud en fonction du nombre de voisins
    if (Gcum.node.get(n.id) != null) {
        ancien = apparition.indexOf(n.id);
        return Math.log(apparition.length / (ancien + 1)) * 7 + 2;
    }
}

function couleurDuNoeudVoisinCumule(n) {
    //Retourne la couleur du noeud en fonction du nombre de voisins
    if (Gcum.node.get(n.id) != null) {
        var voisins = Gcum.neighbors(n.id).length;
        if (voisins >= 10) { return "#" + voisins + "0"; } else { return "#" + voisins + "19"; }
    }
}

function couleurDuNoeudAncienCumule(n) {
    //Retourne la couleur du noeud en fonction du nombre de voisins
    if (Gcum.node.get(n.id) != null) {
        var ancien = apparition.indexOf(n.id);
        if (ancien >= 10) { return "#" + ancien + "0"; } else { return "#" + ancien + "19"; }
    }
}
