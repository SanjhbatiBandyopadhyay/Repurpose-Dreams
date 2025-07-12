const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Handle form POST
app.post('/submit', (req, res) => {
  const formData = req.body;
  const entry = `${new Date().toISOString()} - Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}\n`;
  fs.appendFile('submissions.txt', entry, err => {
    if (err) return res.status(500).send('Error saving data.');
    res.send('<h2>Thank you! Your data has been submitted.</h2><a href="/">Go Back</a>');
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
