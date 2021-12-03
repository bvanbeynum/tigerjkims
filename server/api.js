import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.get("/robots.txt", (request, response) => {
	response.send(
		"User-Agent: *\r\n" +
		"Allow: *"
	);
});

router.post("/sendmail", (request, response) => {
	let dateFormat = new Date();
	dateFormat = dateFormat.getMonth() + "/" + dateFormat.getDate() + "/" + dateFormat.getFullYear() + " " + dateFormat.getHours() + ":" + dateFormat.getMinutes();
	
	const service = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			type: "OAuth2",
			clientId: "743032936512-vpikma7crc8dssoah9bv1la06s2sl4a2.apps.googleusercontent.com",
			clientSecret: "EGD193Mwf6kO798wdP9Bq7lf"
		}
	});
	
	const options = {
		from: "\"Website inquiry\" <bvanbeynum@gmail.com>",
		replyTo: "tigerjkimstkd@gmail.com",
		to: "tigerjkimstkd@gmail.com",
		subject: dateFormat + ": New Website Inquiry",
		generateTextFromHTML: true,
		html: "<p><b>There was a new website inquiry sent at " + dateFormat + "</b></p>" +
			"<p>" +
			"Name: " + request.body.name + "<br>" +
			"Email: " + request.body.email + "<br>" +
			"Phone: " + request.body.phone + "<br>" +
			"Comments: " + request.body.comments +
			"</p>",
		auth: {
			user: "bvanbeynum@gmail.com",
			refreshToken: "1//04K4dB_Z_X1rQCgYIARAAGAQSNwF-L9Irhjcc5YawPcBGv-zZuBiZHm2-s3bgPEJf6VQm6b9eTs7E4iuRbUij6-tzAVYi_3ZXbVU",
			accessToken: "ya29.a0AfH6SMCf0nD3px4QPS-MABYUSpsEEPPdOGAJkvCfOE5eMiuBIUPw-EWunj6wsbEXtJthE16v02r6VWhdcjOaUEmqGFQsD7iEZR26h4B8Lzfh-NAw2OjpfApxfjNz5NEv-JAT6kBTA4J7G2rntClDhTxanW-6_s2y528",
			expires: 3460
		}
	};

	service.sendMail(options, (error) => {
		if (error) {
			console.log(error);
			response.send("error");
			return;
		}
		else {
			response.send("ok");
		}
	});
});

export default router;
