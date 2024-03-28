require('dotenv').config();
const TOKEN_COOKIE_NAME = "cookieToken";
// In a real application, you will never hard-code this secret and you will
// definitely never commit it to version control, ever

const API_SECRET = process.env.API_SECRET_KEY;

const { Buffer } = require('buffer');

function base64urlEncode(string) {
    return Buffer.from(string, 'utf8').toString('base64url');
}

function base64urlDecode(string) {
    return Buffer.from(string, 'base64url').toString('utf8');
}

exports.TokenMiddleware = (req, res, next) => {
  // We will look for the token in two places:
  // 1. A cookie in case of a browser
  // 2. The Authorization header in case of a different client
  let token = null;
  if(!req.cookies[TOKEN_COOKIE_NAME]) {
    //No cookie, so let's check Authorization header
    const authHeader = req.get('Authorization');
    if(authHeader && authHeader.startsWith("Bearer ")) {
      //Format should be "Bearer token" but we only need the token
      token = authHeader.split(" ")[1].trim();
    }
  }
  else { //We do have a cookie with a token
    token = req.cookies[TOKEN_COOKIE_NAME]; //Get session Id from cookie
  }

  if(!token) { // If we don't have a token
    res.status(401).json({error: 'Not authenticated'});
    return;
  }

  //If we've made it this far, we have a token. We need to validate it

  try {
    // const decoded = jwt.verify(token, API_SECRET);  //Needs to change to verify based on algorithm I make
    const encodedHeader = token.split(".")[0];
    const encodedData = token.split(".")[1];
    const signature = token.split(".")[2];

    const header = JSON.parse(base64urlDecode(encodedHeader).toString());
    const data = JSON.parse(base64urlDecode(encodedData).toString());

    const tokenBody = encodedHeader + '.' + encodedData;

    // Calculate the expected signature
    const crypto = require('crypto');

    const expectedSignature = crypto.createHmac('sha256', API_SECRET)
      .update(tokenBody)
      .digest('base64');

    if (signature !== expectedSignature) {
      res.status(401).json({error: 'Not authenticated'});
      return;
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (data.exp < currentTimestamp) {
      res.status(401).json({error: 'Not authenticated'});
      return;
    }

    req.user = data.user;
    console.log(req.user);
    next(); //Make sure we call the next middleware
  }
  catch(err) { //Token is invalid
    res.status(401).json({error: 'Not authenticated'});
    return;
  }
}


exports.generateToken = (req, res, user) => {
  
  let header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  let data = {
    user: user,
    // Use the exp registered claim to expire token in 1 hour
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }

  let encodedHeader = base64urlEncode(JSON.stringify(header));
  let encodedData = base64urlEncode(JSON.stringify(data));

  let encodedToken = encodedHeader + '.' + encodedData;

  const crypto = require('crypto');
  let signature = crypto.createHmac('sha256', API_SECRET)
    .update(encodedToken)
    .digest('base64');

  let token = encodedToken + '.' + signature;

  // const token = jwt.sign(data, API_SECRET); //Come up with my own algorithm to create token

  //send token in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 1000 //This session expires in 2 minutes.. but token expires in 1 hour!
  });
};


exports.removeToken = (req, res) => {
  //send session ID in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000 //A date in the past
  });

}
