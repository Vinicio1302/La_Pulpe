// src/lib/sheets.js
import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

async function getSheetData() {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = '1MVKpqtcpIeiEuQxbyBMBsyixTLGWh08h1HmA9tDu5J8';
    const range = 'User list!C:D';
    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });

    return response.data.values;
}

export { getSheetData };

