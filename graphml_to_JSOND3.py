import argparse
from xml.etree.ElementTree import ElementTree
import json
import os



parser = argparse.ArgumentParser(description="Convert GraphML file to JSON")
parser.add_argument("--static", action="store_true", default=False, required=False, help="Specify whether you would to include static properties from source file")


parser.add_argument("filename", metavar="filename", type=str, help="File to convert from GraphML to JSON")

args = parser.parse_args()

tree = ElementTree()
tree.parse(file(args.filename, "r"))

# tree.find("{http://graphml.graphdrawing.org/xmlns}graph/{http://graphml.graphdrawing.org/xmlns}node")

graphml = {
	"graph": "{http://graphml.graphdrawing.org/xmlns}graph",
	"node": "{http://graphml.graphdrawing.org/xmlns}node",
	"edge": "{http://graphml.graphdrawing.org/xmlns}edge",
	"data": "{http://graphml.graphdrawing.org/xmlns}data",
	"label": "{http://graphml.graphdrawing.org/xmlns}data[@key='label']",
	"x": "{http://graphml.graphdrawing.org/xmlns}data[@key='x']",
	"y": "{http://graphml.graphdrawing.org/xmlns}data[@key='y']",
	"size": "{http://graphml.graphdrawing.org/xmlns}data[@key='size']",
	"r": "{http://graphml.graphdrawing.org/xmlns}data[@key='r']",
	"g": "{http://graphml.graphdrawing.org/xmlns}data[@key='g']",
	"b": "{http://graphml.graphdrawing.org/xmlns}data[@key='b']",
	"weight": "{http://graphml.graphdrawing.org/xmlns}data[@key='weight']",
	"edgeid": "{http://graphml.graphdrawing.org/xmlns}data[@key='edgeid']"
}

# print dir(graphml)
graph = tree.find(graphml.get("graph"))
nodes = graph.findall(graphml.get("node"))
edges = graph.findall(graphml.get("edge"))

out = {"nodes":{}, "edges":[]}

print "Nodes: ", len(nodes)
print "Edges: ", len(edges)
for node in nodes[:]:
	if not args.static:
		out["nodes"][node.get("id")] = { "label": getattr(node.find(graphml.get("label")), "text", "") }
	else:
		out["nodes"][node.get("id")] = {
			"label": getattr(node.find(graphml.get("label")), "text", ""),
			"size": float( getattr(node.find(graphml.get("size")), "text", 0) ),
			"r": getattr(node.find(graphml.get("r")), "text", 0),
			"g": getattr(node.find(graphml.get("g")), "text", 0),
			"b": getattr(node.find(graphml.get("b")), "text", 0),
			"x": float( getattr(node.find(graphml.get("x")), "text", 0) ),
			"y": float( getattr(node.find(graphml.get("y")), "text", 0) )
}

for edge in edges[:]:
	if edge.find(graphml.get("edgeid")) is not None:
		edgeid = int(edge.find(graphml.get("edgeid")).text)
	else:
		edgeid = None
	out["edges"].append({"source": edge.get("source"),
						 "target": edge.get("target"),
						 "edgeid": edgeid,
						 "weight": float( getattr(edge.find(graphml.get("weight")), "text", 1) )
						})
outfilename = args.filename.split(".")[-2]+".json" if len(args.filename.split(".")) >= 2 else args.filename+".json"
file(outfilename, "w").write(json.dumps(out))

nom_fichier = outfilename
source = open(nom_fichier, "r")
destination = open(outfilename[:outfilename.rfind(".")] +"_D3.json", "w")
destination.write("{\n")
destination.write(" \"nodes\": [\n")
toutesleslignes = source.readlines()
toutesleslignes = str1 = ''.join(toutesleslignes)
node, link = toutesleslignes.split("}, \"edges\": [")
node = node[11:]
node = node.split(',')
i = 0
for noeud in node:
	noeud = noeud.split("\"")
	if i != 0:
		destination.write(",\n")
	if noeud[5][-1:] == '\\':
		noeud[5] = noeud[5][:-1]
	destination.write("     {\"id\": \"" + noeud[1] +"\", \"label\": \""+ noeud[5] + "\"}")
	i+=1
destination.write("\n ],\n")
destination.write(" \"links\": [\n")
link = link.split('{')
del link[0]
j=0
for edge in link:
	edge = edge.split(",")
	if j != 0:
		destination.write(",\n")
	destination.write("     {" + edge[0] + ", " + edge[2] + ", \"value\": " + edge[1][11:]+"}")
	j+=1

destination.write("\n ]\n")
destination.write("}")
os.remove(outfilename)
