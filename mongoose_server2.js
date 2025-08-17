require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ MongoDB Atlas connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Mongoose schema & model
const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);

// ✅ Define schema and model for orders (PAY.html)
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  customisation: String,
  payment: String,
  upi_id: String,
  timestamp: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Handle form submission with debug logging
app.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("📥 Form data received:", name, email, message);

    const newSubmission = new Submission({ name, email, message });
    const result = await newSubmission.save();

    console.log("✅ Document saved with ID:", result._id);
    res.send('<h2>Thank you! Your data has been submitted.</h2><a href="/">Go Back</a>');
  } catch (error) {
    console.error('❌ Error saving to MongoDB:', error);
    res.status(500).send('Server Error: Could not save your submission.');
  }
});
// ✅ Handle order submission from pay.html
app.post('/order', async (req, res) => {
  try {
    const { name, email, phone, address, customisation, payment, upi_id } = req.body;
    console.log("💳 Order received:", name, email, phone, address, customisation, payment, upi_id);

    const newOrder = new Order({ name, email, phone, address, customisation, payment, upi_id });
    const result = await newOrder.save();

    console.log("✅ Order saved with ID:", result._id);
    res.send('<h2>✅ Order placed successfully! Your data has been saved.</h2><a href="/">Go Back</a>');
  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).send('Server Error: Could not process your order.');
  }
});



// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
