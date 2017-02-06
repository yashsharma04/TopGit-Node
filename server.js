var http=require("http");
var basePath = __dirname;
var fs = require('fs');
var path = require('path');
const url = require('url') ;
var lodash = require('lodash');

function getQueryVariable(variable) {
    var vars = variable.split("=");
    return vars[1] ; 
}
http.createServer(function(request,response)
{
	console.log(url.parse(request.url));
	
	response.writeHead(200,{"content-type":"text/plain"});

	switch(url.parse(request.url).pathname){
		case '/': 
					fs.readFile(__dirname + '/index.html','utf8', function (err, data) {
						if (err) 
							console.log(err);
						else
						{
							response.writeHead(200, {'Content-Type': 'text/html'});
							response.write(data);
							response.end();
						}	
					});
					break; 
		case "/js/index.js": fs.readFile(__dirname + '/js/index.js','utf8', function (err, data) {
						if (err) 
							console.log(err);
						else{
							response.writeHead(200, {'Content-Type': 'text/javascript'});
							response.write(data);
							response.end();
						}	
					});
					break;  
		case "/css/bootstrap.min.css" : fs.readFile(__dirname + '/css/bootstrap.min.css','utf8', function (err, data) {
						if (err) 
							console.log(err);
						else{
							response.writeHead(200, {'Content-Type': 'text/css'});
							response.write(data);
							response.end();
						}	
					});
					break; 
		case "/js/bootstrap.min.js":
					fs.readFile(__dirname + '/js/bootstrap.min.js','utf8', function (err, data) {
						if (err) 
							console.log(err);
						else{
							response.writeHead(200, {'Content-Type': 'text/javascript'});
							response.write(data);
							response.end();
						}	
					});
					break;  
		case "/js/jquery.twbsPagination.js": fs.readFile(__dirname + '/js/jquery.twbsPagination.js','utf8', function (err, data) {
						if (err) 
							console.log(err);
						else{
							response.writeHead(200, {'Content-Type': 'text/javascript'});
							response.write(data);
							response.end();
						}	
					});
					break;  
		case "/css/index.css" : fs.readFile(__dirname + '/css/index.css','utf8', function (err, data) {	
						if (err) 
							console.log(err);
						else{
							response.writeHead(200, {'Content-Type': 'text/css'});
							response.write(data);
							response.end();
						}	
					});
					break; 
		case  "/getProjects" :
						if(url.parse(request.url).query!=null){
							var query = url.parse(request.url).query;
							var name = getQueryVariable(query);

							fs.readFile(__dirname + '/data.json','utf8', function (err, data) {	
							
							if (err) 
								console.log(err);
							else{
								var items = JSON.parse(data).items;
								var len = items.length ; 
								var itemsByName = []  ;
								for(var i =0 ; i<len ; i++){
									if(lodash.includes(items[i].name,name)){
										itemsByName.push(items[i]);
									}
								}
								response.writeHead(200, {'Content-Type': 'text/plain'});
								response.write(JSON.stringify(itemsByName));
								response.end();
							}	
						});

						}
						else {
							console.log("inside getProjects");
							fs.readFile(__dirname + '/data.json','utf8', function (err, data) {	
							console.log("here get projects")
							if (err) 
								console.log(err);
							else{

								response.writeHead(200, {'Content-Type': 'text/plain'});
								response.write(data);
								response.end();
							}	
						});
					}
					break; 
		
	}
	
}).listen(8080);