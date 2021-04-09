import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { logOut } from '../Login/LoginSlice';


export const Header = () => {
    const loggedIn = useSelector(state => state.login.loggedIn);
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);


    //log out and redirect to login page
    const handleLogoutClick = () => {
        fetch('api/account/logout');
        dispatch(logOut());
        setMenuOpen(false);
    }


    const closeMenu = () => {
        setMenuOpen(false);
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
                            <li><Link to="/login" onClick={handleLogoutClick}>Log out</Link></li>
                    }
                    <li><Link to="/account">Account</Link></li>
                </ul>
                
                {/* Hamburger menu icon */}
                <svg
                    viewBox="0 0 100 80"
                    width="40"
                    height="40"
                    onClick={() => setMenuOpen(true)}
                >
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                </svg>
            </nav>



            {/* Mobile nav, only displayed for smaller devices */}
            {   !menuOpen ? null :
                <nav className={styles.mobileNav}>
                    <div className={styles.mobileNavInner}>
                        <button onClick={() => setMenuOpen(false)}>X</button>

                        <div className={styles.linksContainer}>
                            {/* If not logged in, don't display the main menu */}
                            {!loggedIn ? null :
                                <ul>
                                    <li><Link to="/workout" onClick={closeMenu}>Work out</Link></li>
                                    <li><Link to="/history" onClick={closeMenu}>History</Link></li>
                                    <li><Link to="/exercises" onClick={closeMenu}>Exercises</Link></li>
                                    <li><Link to="/routines" onClick={closeMenu}>Routines</Link></li>
                                    <li><Link to="/howtouse" onClick={closeMenu}>How to use</Link></li>
                                </ul>
                            }
                            <ul>
                                {
                                    !loggedIn ? <li><Link to="/login" onClick={closeMenu}>Login</Link></li> :
                                        <li><Link to="/login" onClick={handleLogoutClick}>Log out</Link></li>
                                }
                                <li><Link to="/account" onClick={closeMenu}>Account</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            }
        </header>
    );
}