import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { unsetLocalStorage, getLocalStorage } from '../../services/authService';

function Nav() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.isAuthenticated);
    if(getLocalStorage() && !auth) {
        dispatch(authActions.login());
    }

    
    const logoutHandler = () => {
        unsetLocalStorage();
        dispatch(authActions.logout());
    }
    


    return (
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0 me-n3">
                    <Link to="/" className="nav-item nav-link ">Home </Link>
                    <Link to="/employees" className="nav-item nav-link ">Employees </Link>
                    {!auth && <Link to="/login" className="nav-item nav-link ">Login </Link>}
                    {auth && <Link to="" onClick={logoutHandler} className="nav-item nav-link ">Logout </Link>}
                </div>
            </div>
        </nav>
    );
}
export default Nav;
