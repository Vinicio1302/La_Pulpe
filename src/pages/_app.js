import '../styles/globals.css';
import Layout from '../components/Layout';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }) {
    return (
        <GoogleOAuthProvider clientId="500729203109-7415m07f0e3j4ccvck89j0teev6gohgg.apps.googleusercontent.com">
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </GoogleOAuthProvider>
    );
}

export default MyApp;
