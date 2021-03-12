	var express = require('express');
	const { parse } = require('querystring');
	const PDFDocument = require('pdfkit');
	const blobStream = require('blob-stream');
	const { Readable } = require('stream');
	const fs = require('fs');
	const open =require('open');
	
	

	var app = express();
	 app.use(express.json({limit:'50mb'}));

	 
	app.use(
	  express.urlencoded({limit: '25mb'})
	)


	//app.use(bodyParser.json({ limit: "50mb" }))

	//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))


	// This responds with "Hello World" on the homepage
	app.get('/eSignDocument', function (req, res) {
	   console.log("Got a GET request for the homepage");
	   res.send('Hello GET');
	})

	// This responds a POST request for the homepage
	app.post('/eSignDocument', function (req, res) {
	   console.log("Got a POST request for the homepage");
		let filename = req.body.filename
		console.log("filename:"+filename);
		const FORM_URLENCODED = 'application/x-www-form-urlencoded';
		//if(req.headers['content-type'] === FORM_URLENCODED) {
			let body = '';
			req.on('data', chunk => {
				console.log("-------------->")
				body += chunk.toString();
			});
			req.on('end', () => {
				//console.log("Got a POST request for the homepage"+body);
				//var jsfile = new Buffer.concat(body).toString('base64');
				console.log('converted to base64');
				
					

				
				var doc = new PDFDocument();
				const stream = doc.pipe(blobStream());

			

				doc 
				  .text(body)
				  

			
				// end and display the document in the iframe to the right
				doc.end();
				open("www.google.com",{app: 'chrome'});
				stream.on('finish', function () {
					
					fs.readFile('index.html', 'utf8' , (err, data) => {
					
						if (err) throw err;						
						 open("www.google.com",{app: 'chrome'});
						console.log('Saved!');
					});				
					//res.write(doc);
					//res.end();
				//	iframe.src = stream.toBlobURL('application/pdf');
				 
				});
			  //res.header("Access-Control-Allow-Origin", "*");
			  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
			  //res.header('content-type', 'application/pdf');
			  //res.send(jsfile);
			});
		//res.send('Hello POST');


	})




	var server = app.listen(8081, function () {
	   var host = "127.0.0.1"
	   var port = server.address().port
	   
	   console.log("Example app listening at http://%s:%s", host, port)
	})
