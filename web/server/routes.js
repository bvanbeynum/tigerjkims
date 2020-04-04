var path = require("path");
var nodemailer = require("nodemailer");
var xoauth2 = require("xoauth2");

var smtpTransport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		xoauth2: xoauth2.createXOAuth2Generator({
			user: "tigerjkimstkd@gmail.com",
			clientId: "88133876132-5o9cr71hcvhiac62rjki67q9228dr3tr.apps.googleusercontent.com",
			clientSecret: "bJOc8STaIqP8hzOZ_xwUCDox",
			refreshToken: "1/zF49zWr9MpVhlltrCPybnHBtVhnTNFO6vdwnX30S6kE",
			accessToken: "ya29.GltfB-kxcQiS2H_MURFw4OMTW0pYRBbYqm3mdJE4w0XVGRCTEYK1GRPWGv3EdwKJx1tVKtm-r4yhdYp2SEZoB0aZbMqFonfPF5MbWKrPRepDJRbjH7EFVAVOMzVt"
		})
	}
});

module.exports = function (app) {
	
	// Pages   =======================================================================
	
	app.get("/robots.txt", function (request, response) {
		response.send(
			"User-Agent: *\r\n" +
			"Allow: *"
		);
	});
	
	app.get("/sitemap.xml", function(request, response) {
		response.sendFile("sitemap.xml", { root: path.join(__dirname, "../client/media") });
	});
	
	app.get("/favicon.ico", function(request, response) {
		response.sendFile("favicon.ico", { root: path.join(__dirname, "../client/media") });
	});
	
	app.get("/", function (request, response) {
		response.sendFile("index.html", { root: path.join(__dirname, "../client") });
	});
	
	app.get("/*.*", function (request, response) {
		var file = request.path.substring(request.path.indexOf("/") + 1);
		
		response.sendFile(file, { root: path.join(__dirname, "../client") });
	});
	
	app.post("/sendmail", function (request, response) {
		var dateFormat = new Date();
		dateFormat = dateFormat.getMonth() + "/" + dateFormat.getDate() + "/" + dateFormat.getYear() + " " + dateFormat.getHours() + ":" + dateFormat.getMinutes();
		
		var mailOptions = {
			from: "\"Website inquiry\" <tigerjkimstkd@gmail.com>",
			to: "tigerjkimstkd@gmail.com",
			subject: dateFormat + ": New Website Inquiry",
			generateTextFromHTML: true,
			html: "<p><b>There was a new website inquiry sent at " + dateFormat + "</b></p>" +
				"<p>" +
				"Name: " + request.body.name + "<br>" +
				"Email: " + request.body.email + "<br>" +
				"Phone: " + request.body.phone + "<br>" +
				"Comments: " + request.body.comments +
				"</p>"
		};
		
		smtpTransport.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(error);
				response.send("error");
			}
			else {
				response.send("ok");
			}
		});
	});

};
