const { google } = require('googleapis');

const dotenv = require('dotenv');
dotenv.config();

const sheetId = process.env.GOOGLE_SHEET_ID;
const apiKey = process.env.GOOGLE_API_KEY;

// Création de l'API Google Sheets
const sheets = google.sheets({ version: 'v4', auth: apiKey });

// Obtenir les données de la feuille de calcul
sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: ['Sheet1!B3:B','Sheet1!C3:C','Sheet1!D2:Z2','Sheet1!D3:Z'],
}, (err, res) => {
    if (err) return console.log(`Une erreur s'est produite: ${err}`);

    const metrics = res.data.valueRanges[0].values.map(row => row[0]);
    const owners = res.data.valueRanges[1].values.map(row => row[0]);
    const dates = res.data.valueRanges[2].values[0];
    const content = res.data.valueRanges[3].values;

    /*console.log('Metrics :', metrics);
    console.log('Owners :', owners);
    console.log('Dates :', dates);
    console.log('Contenu :', content);*/

    const now = new Date(); // Date actuelle
    now.setHours(0,0,0,0);
    let indexDate = -1;

    dates.forEach((date, currentIndex) => {
        const [day, month, year] = date.split('/'); // On récupère le jour, le mois et l'année de chaque date dans le tableau
        const dateObj = new Date(year, month - 1, day); // On crée un objet Date pour chaque date dans le tableau

        if (dateObj.getTime() === (now.getTime() + 86400000)) { // 86400000 millisecondes = 1 jour
            indexDate = currentIndex;
            console.log(`${date} est la date de demain !`);
        }
    });

    if (indexDate !== -1) {
        metrics.forEach((metric, currentIndex) => {
            let ligneData = content[currentIndex];
            let caseFilled = false;

            if (ligneData.length > indexDate) {
                if (ligneData[indexDate] !== "") {
                    caseFilled = true;
                }
            }

            if (!caseFilled) {
                console.log(owners[currentIndex] + " n'a pas rempli la métrique '" + metrics[currentIndex] + "' :(")
            }
        })
    }
});
