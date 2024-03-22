const express = require('express');

const app = express();
const PORT = 80;

// Designate the public folder as serving static resources
// app.use(express.static('static'));
// app.use(express.urlencoded({extended: true}));

/** FRONTEND ROUTES */

// const html_dir = __dirname + '/templates/';

// app.get('/', (req, res) => {
//   res.sendFile(`${html_dir}feed.html`);
// });

// app.get('/feed', (req, res) => {
//   res.sendFile(`${html_dir}feed.html`);
// });

// app.get('/profile', (req, res) => {
//   res.sendFile(`${html_dir}profile.html`);
// });

// app.get('/login', (req,  res) => {
//   res.sendFile(`${html_dir}login.html`);
// });

// const APIRouter = require('./src/routes');

const routes = require('./src/FrontEndRoutes');
app.use(routes);


// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

