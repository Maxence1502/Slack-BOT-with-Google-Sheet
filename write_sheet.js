const { google } = require('googleapis');

const dotenv = require('dotenv');
dotenv.config();

const sheetId = process.env.GOOGLE_SHEET_ID;
const apiKey = process.env.GOOGLE_API_KEY;

const sheets = google.sheets({ version: 'v4', auth: apiKey });

let values = [
    ["test"]
]

sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: "Sheet1!H5",
    valueInputOption: 'RAW',
    resource: {
        values
    },
}, (err, res) => {
    if (err) return console.log(`Une erreur s'est produite: ${err}`);

    console.log("test")
    console.log(res.data);
});
