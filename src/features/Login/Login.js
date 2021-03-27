import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';


export const Login = () => {



    return (
        <section className={styles.loginContainer}>
            <form>
                <label>Username:</label>
                <input type="text"></input>
                <label>Password:</label>
                <input type="password"></input>
                <button>Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here.</Link></p>
        </section >
    );
}