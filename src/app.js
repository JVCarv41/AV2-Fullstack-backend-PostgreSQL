const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const { connectDB } = require('./database/sequelize'); // Import the connection function

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use((req, res, next) => {
  const originalUrl = req.apiGateway?.event?.url || req.originalUrl || req.url;
  req.url = originalUrl;
  console.log(`\nRequest: ${req.method} ${originalUrl}`);
  next();
});

// Initialize database connection
connectDB().then(() => {
  console.log('Database connection established');
}).catch(err => {
  console.error('Database connection failed', err);
});

// Routes
app.get('/api/test', (req, res) => {
  console.log("Test route succefully reached")
  res.json({ message: 'Test route is working!' });
});

app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

module.exports = app;