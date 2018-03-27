var fs = require('fs');
var listeEpi = [];
 
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var path = process.argv[2];
 
fs.readdir(path, function(err, items) { 
	var liste = [];
    for (var i=0; i<items.length; i++) {
    	if(items[i].split('.')[1] == "json"){
        	liste.push(items[i]);
        	
    	}
    }

listeEpi = liste;
console.log(listeEpi);
});