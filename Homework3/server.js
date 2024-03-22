const express = require('express'); // Import our Express dependency
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '/static/uploads')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
  }
});

const upload = multer({storage: storage});

const fs = require('fs');

const app = express(); // Create a new server instance
const PORT = 80; // Port number we want to use of this server

const html_path = __dirname + '/templates/'; // HTML files folder

// Set up Middleware
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

// Routes


app.post('/send', upload.single('file'), (req,res) => {
  try {

    if ((req.body.recFirst.toLowerCase() == "stuart") || (req.body.recFirst.toLowerCase() == "stu")) {
      if (req.body.recLast.toLowerCase() == "dent") {
        fs.unlink(req.file.path);
        res.sendFile(html_path + 'error.html');
      }
    }
    if (req.body.expDate != "" && req.body.sendFirst != "" && req.body.sendLast != "" && req.body.recFirst != "" && 
        req.body.recLast != "" && req.body.message != "" &&  req.body.cardType != "" && req.body.cardNum != "" && 
        req.body.expDate != "" && req.body.ccv != "" && req.body.amount != "") {
          if (req.body.notify.value == "email") {
              //Regex from https://emaillistvalidation.com/blog/email-validation-in-javascript-using-regular-expressions-the-ultimate-guide/#:~:text=A%20common%20and%20widely%20accepted,Z%5D%7B2%2C4%7D%24%2F%20.
            if ((RegExp) ("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$").test(req.body.email) == false) {
              res.sendFile(html_path + 'error.html');
            }
          }
          else if (req.body.notify.value == "sms") {
            if ((RegExp) ("[0-9]{10,10}").test(req.body.phone) == false) {
              res.sendFile(html_path + 'error.html');
            } 
          }
          if ((RegExp) ("[0-9]{16}").test(req.body.cardNum) == false) {
            res.sendFile(html_path + 'error.html');
          }
          else {
            let date = req.body.expDate;
            let split = date.split("-");
            let exp = new Date(split[0], split[1]);
            let today = new Date();
            if (exp < today) {
              res.sendFile(html_path + 'success.html');
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
});

app.get('/', (req, res) => {
  res.sendFile(html_path + 'form.html');
});


// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));