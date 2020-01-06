const express = require('express');
const { getSheet } = require('./sheetsApi');
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.get('/', (req, res) => {
  res.json({hello: 'world'});
});

app.get('/:sheet', async (req, res) => {
  const data = await getSheet(req.params.sheet);
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});