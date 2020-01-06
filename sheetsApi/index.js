const { google } = require('googleapis');

const authorize = async (sheetsRequestFn) => {
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    'https://www.googleapis.com/auth/spreadsheets.readonly'
  );

  try {
    const response = await new Promise((resolve, reject) => {
      jwt.authorize(async (err, token) => {
        if (err) reject(err);
      
        resolve(await sheetsRequestFn(jwt));
      });
    });

    return response;
  } catch (err) {
    return null;
  }
};

const getSheetWithAuth = async (auth, sheet) => {
  const sheets = google.sheets({ version:'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: sheet
  });

  return response.data.values;
};

const getSheet = async (sheet) => {
  return await authorize(async (auth) => await getSheetWithAuth(auth, sheet));
};

module.exports = {
  getSheet
};