import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await dbConnect();  // Asegura la conexión a la base de datos

    if (req.method === 'POST') {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Buscar al usuario por el nombre de usuario
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Comparar las contraseñas usando bcrypt
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            res.status(200).json({ message: 'Login successful', user: { username: user.username } });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}