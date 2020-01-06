const express = require('express');
const { getSheet } = require('./sheetsApi');
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.get('/:sheet', async (req, res) => {
  const dir = req.query.dir === 'COL' ? 'COL' : 'ROW'; 
  const data = await getSheet(req.params.sheet, dir);
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});