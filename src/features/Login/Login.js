import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';


export const Login = () => {
    const handleSubmit = () => {
        fetch('http://localhost:8080/login', {

        });    
    }

    return (
        <section className={styles.loginContainer} action="/login" method="post">
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username"></input>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"></input>
                <input type="submit" className={styles.submitButton} value="Log In"/>
            </form>
            <p>Don't have an account? <Link to="/register">Register here.</Link></p>
        </section >
    );
}