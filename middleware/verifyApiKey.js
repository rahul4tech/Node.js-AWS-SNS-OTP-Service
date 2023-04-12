const dotenv = require('dotenv').config();


// get api keys from environment variables as its comma separated and trim the spaces
const apiKeys = process.env.API_KEYS.split(',').map(key => key.trim());

// Define a middleware function to verify API key
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKeys.includes(apiKey)) return res.status(401).send('Unauthorized access!');
  next();
};

module.exports = verifyApiKey;