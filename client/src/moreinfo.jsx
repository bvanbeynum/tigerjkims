import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./global.css";

const MoreInfo = (props) => {
	
	const [ isComplete, setIsComplete ] = useState(false);
	const [ isError, setIsError ] = useState(false);
	const [ name, setName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ phone, setPhone ] = useState("");
	const [ comments, setComments ] = useState("");

	const submitForm = () => {

		const message = {
			name: name,
			email: email,
			phone: phone,
			comments: comments
		};

		fetch("/api/sendmail", { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify(message) })
			.then(response => response.text())
			.then(data => {

				if (data === "error") {
					setIsError(true);
				}
				else {
					setIsComplete(true);
				}

			})
	}

	return (
		<div>
		{
		isComplete ?
			<div className="submitComplete">
				<img src="/media/check.png" />
				<p>
					Thank you for your submission
				</p>
			</div>
		: ""
		}
		
		{
		isError ?
			<div className="submitComplete">
				<img src="/media/exclamation.png" />
				<p>
					Sorry, there was an error submitting
				</p>
			</div>
		: ""
		}
		
		{
		!isComplete && !isError ?
			<div>
				<div className="form-group">
					<input type="text" className="form-control" placeholder="Name" value={ name } onChange={ event => { setName(event.target.value) } } />
				</div>
				
				<div className="form-group">
					<input type="email" className="form-control" placeholder="Email Address" value={ email } onChange={ event => { setEmail(event.target.value) } } />
				</div>
				
				<div className="form-group">
					<input type="text" className="form-control" placeholder="Phone Number" value={ phone } onChange={ event => { setPhone(event.target.value) } } />
				</div>
				
				<div className="form-group">
					<textarea className="form-control" rows="3" placeholder="Comments" value={ comments } onChange={ event => { setComments(event.target.value) } }></textarea>
				</div>
				
				<button type="button" className="btn btn-default" onClick={ () => { submitForm() } }>Submit</button>
			</div>
		: ""
		}
		</div>
	);

};

ReactDOM.render(<MoreInfo />, document.getElementById("moreinfo"));
