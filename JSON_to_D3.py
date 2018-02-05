import json
nom_fichier = "Donnees/GoT_cum.json"
source = open(nom_fichier, "r")
toutesleslignes = source.readlines()
node, edge = [i.split("}, \"edges\": [")[0] for i in toutesleslignes]