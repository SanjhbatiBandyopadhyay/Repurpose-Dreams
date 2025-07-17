const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://xib48sanjhbatibandyopadhyay:Ahsas77ffuP-@cluster0.dgdtxbn.mongodb.net/formData?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(async () => {
  console.log("✅ Connected to MongoDB");

  const submissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  });

  const Submission = mongoose.model('Submission', submissionSchema);

  const doc = new Submission({
    name: "Test Entry",
    email: "test@example.com",
    message: "Force-create from test.js"
  });

  await doc.save();
  console.log("✅ Document inserted to MongoDB");
  process.exit(0);
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err);
  process.exit(1);
});
