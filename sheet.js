const { google } = require('googleapis');

const dotenv = require('dotenv');
dotenv.config();

const sheetId = process.env.GOOGLE_SHEET_ID;
const apiKey = process.env.GOOGLE_API_KEY;

// Configuration de l'API Google Sheets
const auth = new google.auth.GoogleAuth({
    // Scopes d'autorisation requis pour accéder aux données de la feuille de calcul
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    credentials: {
        client_email: "20374093565-9712dc9pbarf6hgpiulh7uthpkgo4g37.apps.googleusercontent.com",
        private_key: "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",
        //api_key: apiKey
    },
});

// Création de l'API Google Sheets
const sheets = google.sheets({ version: 'v4', auth });

// Obtenir les données de la feuille de calcul
sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Sheet1', // Remplacez par le nom de votre feuille de calcul
}, (err, res) => {
    if (err) return console.log(`Une erreur s'est produite: ${err}`);

    // Les données de la feuille de calcul sont stockées dans l'objet "res"
    console.log(res.data.values);
});