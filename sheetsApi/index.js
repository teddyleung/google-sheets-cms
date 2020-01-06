const { google } = require('googleapis');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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

const getValues = async (auth) => {
  const sheets = google.sheets({ version:'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: 'users'
  });

  return response.data;
};

const run = async () => {
  console.log(await authorize(getValues));
};

run();