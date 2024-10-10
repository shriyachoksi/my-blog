import {Link} from 'react-router-dom';
const NavBar =() =>{
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/articles">Articles</Link></li>
                {/* Add more links as needed */}     
            </ul>
        </nav>
    )
}

export default NavBar;