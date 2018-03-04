	J'ai modifié le script graphml_to_JSOND3.py du coup il transforme les graphml en JSON adaptés a D3, faut juste taper
		python graphml_to_JSOND3.py Donnees/GoT_cum.graphml et ça crée un .JSON dans le même répertoire que le graphml adapté a D3 (normalement '-')

	Doc de networkx liste des algo implantés dans networkx (c'est un truc en python mais jsnetworkx a plus ou moins les mêmes algo implantés et la doc de jsnetworkx je galère a la trouver) https://networkx.github.io/documentation/latest/reference/algorithms/index.html?#


	La fonction loadJson permet de lire le fichier JSON 
	Le code utilisant les variables "idList" et "idEdge" s'écrit dans loadJSON(function(response) {}) pour pouvoir utiliser le fichier JSON lu
	La fonction G.neighbors(noeud).length retourne le nombre de voisins du noeud.


	L'affichage se fait avec d3 en remplaçant d3 par d3v4 (exemple : var svg = d3.select("svg") --> var svg = d3v4.select("svg"))


04/03

	La fonction d'affichage est maintenant dans le fichier "Script_D3.js" et les fonction de traitement du Graph utilisant JsNetworkx (noeuds, voisins, liens etc...) sont dans "script_JsNetworkx.jsz"
	Pour l'instant les noeuds changent de couleur/taille en fonction de leur nombre de voisins.

	
