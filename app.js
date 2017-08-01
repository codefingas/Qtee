var express = require("express");
var nodemailer = require("nodemailer");
var app = express();
var bodyParser = require("body-parser");



var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.set("view engine", "ejs");

app.use("/assets", express.static("assets"));

app.get("/", function(req, res){
	res.sendFile(`${__dirname}/index.html`);
});

app.post("/page",urlencodedParser, function(req, res){
    res.render("subscribe");
	var data = req.body;
	var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: {
            user: 'udohezekiel34@gmail.com',
            pass: 'conven3ntgmail'
        }
    });
    var mailOptions = {
        from: '${data.email}',
        to: 'udohezekiel34@gmail.com, ${data.email}',
        subject: 'subscribe request',
        html: `Hello! a user has subscribe to recieve information of recent updates<br/>
				email: ${data.bottom}`,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent! ' + info.response);
        }
    });
});

app.post("/contact", function(req, res){
	res.sendFile(`${__dirname}/index.html`)
})

app.post("/index", urlencodedParser, function(req, res){
	res.render("contact-us", {data: req.body});
	var data = req.body;
	var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: {
            user: 'udohezekiel34@gmail.com',
            pass: 'conven3ntgmail'
        }
    });
    var mailOptions = {
        from: '${data.email}',
        to: 'udohezekiel34@gmail.com, ${data.email}',
        subject: 'PURCHASE request',
        html: `<!DOCTYPE html>
				<html>
				<head>
					<title>Node</title>
					<style type="text/css">
						body{
							background-color: skyblue;
							font-family: verdana;
							color: #fff;
							padding: 30px;
						}
						h1{
							font-size: 36px;
							letter-spacing: 2px;
							text-align: center;
						}
						p{
							font-size: 14px;
						}
					</style>
				</head>
				<body>
				<h1>Purchase Request</h1>
				<p>
					Hello!<br/>
					a Purchase request has been sent from :
				</p>
				name: ${data.name}<br/>
				phone number: ${data.phone}<br/>
				email: ${data.email}<br/>
				address: ${data.address}<br/>
				message: ${data.message}
				</p>
				<p>
					the details of the request is to buy the following items:
                    ${data.purchase_items}
				</p>

				</body>
				</html> `,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent! ' + info.response);
        }
    });
});


app.listen(9000, "127.0.0.1");
console.log("s3rv3r on!  port='9000'");