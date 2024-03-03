const express = require('express');

const app = express();
const PORT = 3000;

// Designate the public folder as serving static resources
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

/** FRONTEND ROUTES */

const html_dir = __dirname + '/templates/';

app.get('/', (req, res) => {
  res.sendFile(`${html_dir}index.html`);
});

app.get('/error', (req, res) => {
  res.sendFile(`${html_dir}error.html`);
});

const APIRouter = require('./src/routes');

app.use('/api', APIRouter);


// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

