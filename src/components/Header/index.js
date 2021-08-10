import { Link, useHistory } from 'react-router-dom';
import { routes } from '../../routes';
import './header.css';

export const Header = () => {
	const history = useHistory();

	const isActive = (path) =>
		history.location.pathname === path ? 'active' : '';

	return (
		<>
			<nav className='nav'>
				<p className='logo'>Convoy</p>
				<ul className='nav-list'>
					{routes.map((eachRoute) => (
						<li
							key={eachRoute.path}
							className={`nav-item ${isActive(eachRoute.path)}`}
						>
							<Link to={eachRoute.path}>{eachRoute.name}</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
};

export default Header;
