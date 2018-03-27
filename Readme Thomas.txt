J'ai modifié le script graphml_to_JSOND3.py du coup il transforme les graphml en JSON adaptés a D3, faut juste taper
	python graphml_to_JSOND3.py Donnees/GoT_cum.graphml et ça crée un .JSON dans le même répertoire que le graphml adapté a D3 (normalement '-')



La fonction loadJson permet de lire le fichier JSON 
Le code s'écrit dans loadJSON(function(response) {}) pour pouvoir utiliser le fichier JSON lu
La fonction G.neighbors(noeud) retourne la liste des voisins du noeud "noued" dans le graph G, utile pour supprimer ceux qui ont moins de x voisins (je test encore la manière de l'utiliser)
Doc de networkx iste des algo implantés dans networkx (c'est un truc en python mais jsnetworkx a plus ou moins les mêmes algo implantés et la doc de jsnetworkx je galère a la trouver) https://networkx.github.io/documentation/latest/reference/algorithms/index.html?#

L'affichage se fait avec d3 en remplaçant d3 par d3v4 (exemple : var svg = d3.select("svg") --> var svg = d3v4.select("svg"))
