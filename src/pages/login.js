import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/login.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login submitted for', username, 'with password', password);
    };

    return (
        <div className={styles.loginContainer}>
            <Head>
                <title>Login</title>
                {/* Importa la fuente deseada aquí */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@400;600&display=swap"
                      rel="stylesheet"/>
            </Head>
            <div className={styles.loginImageContainer}>
                <img src="/lapulpe.png" alt="lapulpe" className={styles.loginImage} />
            </div>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log In</button>
                <div className={styles.btnContainer}>
                    <a href="/" className={styles.goBackBtn}>Go back</a>
                </div>
            </form>
        </div>
    );
}

