import styles from './Header.module.css';
import { Link } from 'react-router-dom';


export const Header = () => {
    return (
        <header>
            <nav className={styles.mainNav}>
                <h1>LOGO</h1>
                <ul>
                    <li><Link to="/workout">Work out</Link></li>
                    <li><Link to="/history">History</Link></li>
                    <li><Link to="/exercises">Exercises</Link></li>
                    <li><Link to="/routines">Routines</Link></li>
                    <li><Link to="/howtouse">How to use</Link></li>
                </ul>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
        </header>
    );
}