import json
nom_fichier = "Donnees/GoT_cum.json"
source = open(nom_fichier, "r")
destination = open("GoT_cum_D3.json", "w")
destination.write("{\n")
destination.write(" \"nodes\": [\n")
toutesleslignes = source.readlines()
toutesleslignes = str1 = ''.join(toutesleslignes)
node, link = toutesleslignes.split("}, \"edges\": [")
node = node[11:]
node = node.split(',')
for noeud in node:
    a, id, c, d, e, label, g = noeud.split("\"")
    destination.write("     {\"id\": \"" + id +"\"},\n")
destination.write(" ],\n")
destination.write(" \"links\": [\n")
link = link.split('{')
del link[0]
for edge in link:
    edge = edge.split(",")
    destination.write("     {" + edge[0] + ", " + edge[2] + ", \"value\": " + edge[1][11:])
    destination.write("},\n")

destination.write(" ]\n")
destination.write("}")

