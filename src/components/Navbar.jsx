import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
						<i className="fas fa-address-book me-2"></i>
						Contact Agenda
					</span>
				</Link>
				<div className="ml-auto">
					<Link to="/add-contact">
						<button className="btn btn-success">
							<i className="fas fa-plus me-2"></i>
							Add Contact
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};