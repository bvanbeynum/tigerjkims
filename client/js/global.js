(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-77874811-1', 'auto');
ga('send', 'pageview');

$("form").submit(function (event) {
	var message = {
		name: "", 
		email: "", 
		phone: "", 
		comments: ""
	};
	
	console.log("Form Submitted");
	this[this.length - 1].disabled = true;
	
	message.name = this[0].value;
	message.email = this[1].value;
	message.phone = this[2].value;
	
	if (this.length == 5) {
		message.comments = this[3].value;
	}
	
	$.ajax({
		type: "POST",
		url: "/sendmail",
		data: message
	})
	.done(function (data) {
		$("form").each(function (index) { this.style.display = "none" });
		
		if (data == "error") {
			$(".submitError").each(function (index) { this.style.display = "block" });
		}
		else {
			$(".submitOk").each(function (index) { this.style.display = "block" });
		}
	});
	
	event.preventDefault();
});
