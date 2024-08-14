// testSheetsAPI.js
const { google } = require('googleapis');
const path = require('path');

async function testSheetsAPI() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(process.cwd(), 'credentials/service-account.json'), // Ajusta el path a tu archivo de cuenta de servicio
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const spreadsheetId = '1MVKpqtcpIeiEuQxbyBMBsyixTLGWh08h1HmA9tDu5J8'; // ID de tu hoja de cálculo
        const sheetName = 'User list'; // Nombre de la hoja

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!C2:D`, // Ajusta este rango según sea necesario hola
        });

        console.log('Response from Sheets API:', response.data);
    } catch (error) {
        console.error('Error during Sheets API test:', error);
    }
}

testSheetsAPI();
