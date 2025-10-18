const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRoutes);

// Basic health route
app.get('/', (req, res) => 
    res.send(path.join(__dirname, 'public', 'index.html')));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
});
