import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Index extends Component {
	maxNavScroll = 60;
	minNavScroll = 40;
	maxNavHeight = 100;
	maxLogoHeight = 70;

	constructor(props) {
		super(props);

		this.state = {
			navHeight: 100,
			logoHeight: 70
		}
	};

	componentDidMount() {
		window.addEventListener("scroll", this.onScroll);
	};

	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll);
	};

	onScroll = event => {
		const scrollTop = event.srcElement.body.scrollTop;

		this.setState({
			navHeight: scrollTop <= this.maxNavScroll ? this.maxNavHeight - scrollTop : this.minNavScroll,
			logoHeight: scrollTop <= this.maxNavScroll ? this.maxLogoHeight - ((scrollTop / this.maxNavScroll) * (this.maxLogoHeight - this.minNavScroll)) : this.minNavScroll
		});
	};

	render() { return (
		<div className="pageContent">
			
			<div className="nav" style={{ height: this.state.navHeight }}>
				<img className="logo" src="/media/logo.png" style={{ height: this.state.logoHeight }} />

				<div className="button">More Info</div>
			</div>

			<div className="content">
				<div className="panel facebook">
					<span>Facebook</span>
				</div>
				
				<div className="panel map">
					<span>Map</span>
				</div>
				
				<div className="panel trial">
				<span>Trial</span>
				</div>

				<div className="horizontalContainer">
					<div className="panel">
					<span>Little Tigers</span>
					</div>
					
					<div className="panel">
					<span>Kids</span>
					</div>
					
					<div className="panel">
					<span>Adults</span>
					</div>
					
					<div className="panel">
					<span>Families</span>
					</div>
				</div>
				
				<div className="panel">
				<span>About</span>
				</div>
				
				<div className="panel">
				<span>Reviews</span>
				</div>
			</div>
		</div>
	)}
}

ReactDOM.render(<Index />, document.getElementById("root"));