import { Link, useNavigate } from 'react-router-dom';
import './../style/Header.css';

const Header = () => {

    const navigate = useNavigate();

    return(
        <header className="header">
            <div className="header-container">
                <Link to="/">
                    <h1 className="header-title">Discover</h1>
                </Link>
                <Link to="/search" className="header-search">
                    Search
                </Link>
                <button className="header-login" onClick={() => navigate("/login")}>Log in</button>
            </div>
        </header>
    );
};

export default Header;