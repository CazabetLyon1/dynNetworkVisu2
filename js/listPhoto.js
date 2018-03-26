var fs = require('fs');
var listePhoto = [];

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];

fs.readdir(path, function(err, items) {
	var liste = [];
    for (var i=0; i<items.length; i++) {
    	if(items[i].split('.')[1] == "jpg"){
        	liste.push(items[i]);

    	}
    }

listePhoto = liste;
console.log(listePhoto);
});
