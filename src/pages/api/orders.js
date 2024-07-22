import { google } from 'googleapis';
import path from 'path';

async function authenticateSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(process.cwd(), 'credentials/service-account.json'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return await auth.getClient();
}

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    const { username, newPoints, itemName, itemPoints } = req.body; // Añade itemName y itemCost

    try {
        const auth = await authenticateSheets();
        const sheets = google.sheets({ version: 'v4', auth });

        const spreadsheetId = '1MVKpqtcpIeiEuQxbyBMBsyixTLGWh08h1HmA9tDu5J8';

        // Actualizar puntos del usuario
        const pointsRange = 'Points per user!A2:C';
        const pointsResponse = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: pointsRange,
        });

        const rows = pointsResponse.data.values;
        if (!rows || rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No data found in spreadsheet' });
        }

        const rowIndex = rows.findIndex(row => row[1] === username);
        if (rowIndex === -1) {
            return res.status(404).json({ success: false, message: 'User not found ' + username });
        }

        const rowNumber = rowIndex + 2; // Ajuste para encabezado y 0-indexing

        // Actualizar puntos del usuario
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Points per user!C${rowNumber}`,
            valueInputOption: 'RAW',
            resource: {
                values: [[newPoints]]
            },
        });

        // Agregar la orden a la hoja "orders"
        const ordersRange = 'orders!A:E'; // Rango para agregar datos en la hoja "orders"
        const currentDate = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
        const orderValues = [[username, itemPoints, itemName, currentDate, false]];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: ordersRange,
            valueInputOption: 'RAW',
            resource: {
                values: orderValues,
            },
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error during operation:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
