const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ MongoDB connection
mongoose.connect(
  'mongodb+srv://xib48sanjhbatibandyopadhyay:Ahsas77ffuP-@cluster0.dgdtxbn.mongodb.net/formData?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Define schema and model
const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newSubmission = new Submission({ name, email, message });
    await newSubmission.save();
    res.send('<h2>Thank you! Your data has been submitted.</h2><a href="/">Go Back</a>');
  } catch (error) {
    console.error('❌ Error saving to MongoDB:', error);
    res.status(500).send('Server Error: Could not save your submission.');
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
