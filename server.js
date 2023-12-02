const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Use body-parser to parse the body of HTTP requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Store manually generated unique codes (you can use a database for a more scalable solution)
const uniqueCodes = new Set();

// Generate a new unique code
function generateUniqueCode() {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    return code;
}

// Endpoint to generate and return a new unique code
app.post('/generateUniqueCode', (req, res) => {
    const newCode = generateUniqueCode();
    uniqueCodes.add(newCode);
    res.json({ code: newCode });
});

// Endpoint to verify a unique code
app.post('/verifyUniqueCode', (req, res) => {
    const { code } = req.body;
    const isValid = uniqueCodes.has(code);
    res.json({ isValid });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
