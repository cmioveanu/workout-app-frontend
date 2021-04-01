import { Link } from 'react-router-dom';

import styles from './LandingPage.module.css';
import background from '../../_images/workingOut.jpg';


export const LandingPage = () => {

    return (
        <div className={styles.landingPageContainer}>
            <section id={styles.mainImage}>
                <img src={background} />
            </section>
            <section className={styles.textContainer}>
                <h2>Maximum intensity. <br /><span>Minimum time.</span></h2>
               <p><em>Complete fitness in just 15 minutes a week.</em></p>
               <button><Link to="/login">Login</Link></button>
               <button><Link to="/register">Register</Link></button>
            </section >
        </div>
    );
}