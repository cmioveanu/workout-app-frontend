import { useEffect, useState } from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';


export const Register = () => {

    return (
        <section className={styles.registerContainer}>
            <form>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text"></input>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password"></input>
                <label htmlFor="passwordConfirm">Confirm Password:</label>
                <input id="passwordConfirm" type="password"></input>
                <button>Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Log in here.</Link></p>
        </section >
    );
}