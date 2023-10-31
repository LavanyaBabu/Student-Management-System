// index.js
const express = require('express');
const api = require('./api');

const app = express();

app.use(express.json()); // Body parser middleware

// API Routes
app.use('/api', api);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
