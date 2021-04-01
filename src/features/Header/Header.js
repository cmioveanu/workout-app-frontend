import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logOut } from '../Login/LoginSlice';


export const Header = () => {
    const loggedIn = useSelector(state => state.login.loggedIn);
    const dispatch = useDispatch();


    //log out and redirect to login page
    const handleLogoutClick = () => {
        fetch('api/account/logout');
        dispatch(logOut());
    }


    return (
        <header>
            <nav className={styles.mainNav}>
                <Link to="/"><h1 id={styles.logo}>HIT <span>WORKOUT</span></h1></Link>

                {/* If not logged in, don't display the main menu */}
                {!loggedIn ? null :
                    <ul>
                        <li><Link to="/workout">Work out</Link></li>
                        <li><Link to="/history">History</Link></li>
                        <li><Link to="/exercises">Exercises</Link></li>
                        <li><Link to="/routines">Routines</Link></li>
                        <li><Link to="/howtouse">How to use</Link></li>
                    </ul>
                }
                <ul>
                    {
                        !loggedIn ? <li><Link to="/login">Login</Link></li> :
                            <li><Link to="/login" onClick={handleLogoutClick}>Logout</Link></li>
                    }
                    <li><Link to="/account">Account</Link></li>
                </ul>
            </nav>
        </header>
    );
}