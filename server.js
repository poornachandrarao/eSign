	var express = require('express');
	const { parse } = require('querystring');
	var opn = require('opn');
	var nodemailer = require('nodemailer');
	var cors = require('cors');
	var app = express();
	
	app.use(cors())
	app.use(express.json({limit:'50mb'}));	 
	app.use(
	  express.urlencoded({limit: '25mb'})
	)


	//app.use(bodyParser.json({ limit: "50mb" }))

	//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))


	// This responds with "Hello World" on the homepage
	app.get('/eSignDocument', function (req, res) {
		
	   console.log("Got a GET request for the homepage");
	   opn('http://localhost:3000/?fileName=abc.pdf');
		//es.send('Hello POST');
	})
	
	app.post('/eSignDocument', function (req, res) {
	   console.log("Got a POST request for the homepage");		
		var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = './public/files/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
         if (err) throw err;
         res.write('File uploaded and moved!');
         res.end();
		 opn('http://localhost:3000/?fileName='+files.filetoupload.name);
        });
	
	 });
	})
	
	
	app.post('/api/v1/contact', function (req, res) {
		var data = req.body;
		console.log("-->"+data.title);
		var smtpTransport = nodemailer.createTransport({
		service: 'smtp.gmail.com',
		port: 465,
		auth: {
		user: 'poorna.nemalipuri@gmail.com',
		pass: 'Ammarao@02'
		}
		});
		
		var mailOptions = {
			from: "poorna.nemalipuri@gmail.com",
			replyto: "poorna.nemalipuri@gmail.com",
			to: 'poornachandra.nemalipuri@zf.com',
			subject: data.title,
			html: `<p>Some tesxt</p>
			<p>Some tesxt</p>`,
			/*attachments: [
			{
			//filename: data.title + ".pdf",
			filename: "test.pdf",
			contentType:  'application/pdf',
			content:"sdfafsdafasdfasdf",  
			}
			]*/
			};
			smtpTransport.sendMail(mailOptions,
			(error, response) => {
			if (error) {
				console.log("-->error:"+error);
			res.status(400).send(error)
			} else {
			res.send('Success')
			}
			smtpTransport.close();
			}); 
	})





	var server = app.listen(8081, function () {
	   var host = "127.0.0.1"
	   var port = server.address().port
	   
	   console.log("Example app listening at http://%s:%s", host, port)
	})
