	J'ai modifi� le script graphml_to_JSOND3.py du coup il transforme les graphml en JSON adapt�s a D3, faut juste taper
		python graphml_to_JSOND3.py Donnees/GoT_cum.graphml et �a cr�e un .JSON dans le m�me r�pertoire que le graphml adapt� a D3 (normalement '-')

	Doc de networkx liste des algo implant�s dans networkx (c'est un truc en python mais jsnetworkx a plus ou moins les m�mes algo implant�s et la doc de jsnetworkx je gal�re a la trouver) https://networkx.github.io/documentation/latest/reference/algorithms/index.html?#


	La fonction loadJson permet de lire le fichier JSON 
	Le code utilisant les variables "idList" et "idEdge" s'�crit dans loadJSON(function(response) {}) pour pouvoir utiliser le fichier JSON lu
	La fonction G.neighbors(noeud).length retourne le nombre de voisins du noeud.


	L'affichage se fait avec d3 en rempla�ant d3 par d3v4 (exemple : var svg = d3.select("svg") --> var svg = d3v4.select("svg"))


04/03

	La fonction d'affichage est maintenant dans le fichier "Script_D3.js" et les fonction de traitement du Graph utilisant JsNetworkx (noeuds, voisins, liens etc...) sont dans "script_JsNetworkx.jsz"
	Pour l'instant les noeuds changent de couleur/taille en fonction de leur nombre de voisins.

	
