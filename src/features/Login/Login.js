import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Login.module.css';
import { Link, useHistory } from 'react-router-dom';

import { logIn } from './LoginSlice';


export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();


    //login and if successful, redirect to workout page
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            if(res.status === 200) {
                dispatch(logIn());
                history.push('/workout');
            }
        });
    }


    return (
        <section className={styles.loginContainer}>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" required
                    onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" required
                    onChange={e => setPassword(e.target.value)} />
                <input type="submit" className={styles.submitButton} value="Log In" />
            </form>
            <p>Don't have an account? <Link to="/register">Register here.</Link></p>
        </section >
    );
}