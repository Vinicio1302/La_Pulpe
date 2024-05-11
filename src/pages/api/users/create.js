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

            // Cifrar la contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

