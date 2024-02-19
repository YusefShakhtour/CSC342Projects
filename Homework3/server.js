const express = require('express'); // Import our Express dependency
const multer = require('multer');
const upload = multer({dest: 'file_uploads/'});

const app = express(); // Create a new server instance
const PORT = 3000; // Port number we want to use of this server

const html_path = __dirname + '/templates/'; // HTML files folder

// Set up Middleware
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(html_path + 'form.html');
});

app.get('/success', (req, res) => {
  res.sendFile(html_path + 'success.html');
});

app.get('/error', (req, res) => {
    res.sendFile(html_path + 'error.html');
  });


// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));