import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';
import { useGoogleLogin } from '@react-oauth/google';
import { loadClient } from '../lib/sheets'; // Importa la biblioteca

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleGoogleLoginSuccess = async (tokenResponse) => {
        const { code } = tokenResponse;
        try {
            const response = await fetch('/api/exchange-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            const data = await response.json();
            const { access_token } = data;
            // Usar el token de acceso para cargar el cliente
            loadClient(access_token, '1MVKpqtcpIeiEuQxbyBMBsyixTLGWh08h1HmA9tDu5J8', 'Sheet1!C2:D1000');
            router.push('/catalog');
        } catch (error) {
            console.error('Error exchanging code for token', error);
        }
    };

    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: handleGoogleLoginSuccess,
        onError: (errorResponse) => {
            console.error('Login failed:', errorResponse);
        },
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await router.push('/catalog');
    };

    return (
        <div className={styles.loginContainer}>
            <Head>
                <title>Login</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@400;600&display=swap" rel="stylesheet"/>
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
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.btnContainer}>
                    <a href="/" className={styles.goBackBtn}>Go back</a>
                </div>
                <button type="button" onClick={() => login()}>Login with Google</button>
            </form>
        </div>
    );
}