const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
app.use(express.static("./public"));

var originsWhitelist = ['http://localhost:4000'];
var corsOptions = {
	origin: function(origin, callback){
				var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
				callback(null, isWhitelisted);
	},
	credentials:true
}
app.use(cors(corsOptions));

/* Checking Node connectivity on port 4000*/ 
app.get('/',(req,res)=>{
    res.send("Hello");
});

/**API call to fetch projects on a given page**/
app.get("/projects", function(req, res) {

	var apikey = "N1eKqagx67HWl1wn";
	var page = req.query.page;
	url = "http://api.hackaday.io/v1/projects?api_key=" + apikey + "&page=" + page;

	request.get({
	    url: url,
	    json: true,
	  }, (error, response, body) => {
	    if (error) {
	    	console.log('Error:', error);
	    } else {
			res.send(body);
	    }
	});
});
/**API call to fetch owner details**/
app.get("/owner", function(req, res) {

	var apikey = "N1eKqagx67HWl1wn";
	var owner_id = req.query.owner_id;
	url = "http://api.hackaday.io/v1/users/" + owner_id + "?api_key=" + apikey;

	request.get({
	    url: url,
	    json: true,
	  }, (error, response, body) => {
	    if (error) {
	    	console.log('Error:', error);
	    } else {
			res.send(body);
	    }
	});
});

module.exports = app;