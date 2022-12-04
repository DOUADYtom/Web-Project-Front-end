import { Link, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/AuthApiSlice';
import useAuth from '../hooks/useAuth';
import './../style/Header.css';

const Header = () => {

    const navigate = useNavigate();
    const { isLogged, name } = useAuth();
    const [sendLogout, {isLoading} ] = useSendLogoutMutation();

    let content = <button className="header-login" onClick={() => navigate("/login")}>Log in</button>;

    if (isLoading) {
        content = <p>Loading</p>;
    }

    const logOut = () => {
        console.log("log out");
        sendLogout();
    };

    if (isLogged) {
        content = (
            <div className="header-login">
                <div className="header-login-text">{name}</div>
                <div className="header-menu">
                    <div className="header-menu-element"><Link to="/mypage">My page</Link></div>
                    <div className="header-menu-element"><Link to="/account">My account</Link></div>
                    <div className="header-menu-element"><button onClick={() => logOut()}>Log out</button></div>
                </div>
            </div>
        )
    }

    return(
        <header className="header">
            <div className="header-container">
                <Link to="/">
                    <h1 className="header-title">Discover</h1>
                </Link>
                <Link to="/search" className="header-search">
                    Search
                </Link>
                {content}
            </div>
        </header>
    );
};

export default Header;