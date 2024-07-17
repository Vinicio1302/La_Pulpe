import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { code } = req.body;
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI;

        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            });

            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: error.response.data });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}