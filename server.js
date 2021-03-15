	var express = require('express');
	const { parse } = require('querystring');
	var opn = require('opn');
	var nodemailer = require('nodemailer');
	var cors = require('cors');
	//var bodyParser = require('body-parser')
	var url = require('url');
	const downloadsFolder = require('downloads-folder');
	var fs = require('fs');
	
	var app = express();
	
	app.use(cors())
	app.use(express.json({limit:'50mb'}));	 
	app.use(
	  express.urlencoded({limit: '25mb'})
	)
	//app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	//app.use(bodyParser.json())

	// This responds with "Hello World" on the homepage
	app.get('/eSignDocument', function (req, res) {
		var parts = url.parse(req.url, true);
		var query = parts.query;		
	   console.log("Got a GET request for the homepage");
	   opn('http://localhost:3000/?fileName=abc.pdf');
		//es.send('Hello POST');
	})
	
	app.post('/eSignDocument',  function (req, res) {
	   console.log("Got a POST request for the homepage");
	   var fileNameWithPath =req.query.fileName;
		//console.log(fileNameWithPath);		
		var n = fileNameWithPath.lastIndexOf("\\");
		var fileName=fileNameWithPath.substring(n+1,fileNameWithPath.length);
		var oldpath = fileNameWithPath;
        var newpath = './public/files/' + fileName;
		try {
		fs.rename(oldpath, newpath, function (err) {
         if (err) throw err;
         res.write('File uploaded and moved!');
         res.end();
		 opn('http://localhost:3000/?fileName='+fileName);
        });	
		}catch(e){
			 opn('http://localhost:3000/?fileName='+fileName);
		}			
	})
	
	
	app.post('/api/v1/contact', function (req, res) {
		var fileName=req.query.fileName;
		
		var fileNamewithPath =downloadsFolder()+"\\"+req.query.fileName;
		
		
		var smtpTransportNew = nodemailer.createTransport({
		  service: "gmail",
		  auth: {
			user: "rashminiprojects@gmail.com",
			pass: "Esign@123",
		  }
		});

		var mailOptions = {
		  from: "rashminiprojects@gmail.com",

		  to: "rashminiprojects@gmail.com,,poorna.nemalipuri@gmail.com",
		  subject: "Test email from esign ",
		  text: "Test email from esign",
		  attachments: [
			{
			  //filename: data.title + ".pdf",
			  filename: fileName,
			  contentType: "application/pdf",
			  path: fileNamewithPath,
			  
			},
		  ],
		};

		smtpTransportNew.sendMail(mailOptions, function(error, info) {
		  console.log("Email sent:@@@@@@@@@starts ");
		  if (error) {
			console.log("Email senterrrrrrrrrrrrrrrrrrrrrrrrrrrr ");
			console.log(error);
		  } else {
			console.log("Email sent: " + info.response);
		  }
		});
	})





	var server = app.listen(8081, function () {
	   var host = "127.0.0.1"
	   var port = server.address().port
	   
	   console.log("Example app listening at http://%s:%s", host, port)
	})
