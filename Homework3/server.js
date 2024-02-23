const express = require('express'); // Import our Express dependency
const multer = require('multer');
const upload = multer({dest: '/static/uploads/'});

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

// app.get('/success', (req, res) => {
//   res.sendFile(html_path + 'success.html');
// });

// app.get('/error', (req, res) => {
//     res.sendFile(html_path + 'error.html');
//   });

app.post('/send', upload.single('myFile'), (req,res) => {
  try {
    if (req.body.expDate != "" && req.body.sendFirst != "" && req.body.sendLast != "" && req.body.recFirst != "" && 
        req.body.recLast != "" && req.body.message != "" &&  req.body.cardType != "" && req.body.cardNum != "" && 
        req.body.expDate != "" && req.body.ccv != "" && req.body.amount != "") {
          if (req.body.emailRad == "on") {
            if (req.body.email.checkValidity()) {
              res.sendFile(html_path + 'error.html');
            } 
          }
          else if (req.body.smsRad == "on") {
            if (req.body.phone.checkValidity() == false) {
              res.sendFile(html_path + 'error.html');
            } 
          }
      res.sendFile(html_path + 'success.html');
    }
    else {
      res.sendFile(html_path + 'error.html');
    }
  }
  catch(err) {
    res.sendFile(html_path + 'error.html');
  }
})


// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));