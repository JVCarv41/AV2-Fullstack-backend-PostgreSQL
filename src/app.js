const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

// Import Sequelize instance
const { sequelize } = require('./database/sequelize'); // Your Sequelize init file

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

app.get('/api/test', (req, res) => {
  console.log('Test route handler reached');
  res.json({ message: 'Test route is working!' });
});

// Routes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

// Sync Sequelize and then start server (if you start server here)
const startServer = async () => {
  try {
    await sequelize.sync(); // Sync models to DB
    console.log('PostgreSQL & Sequelize connected and synced');
    // If you start your server here:
    // app.listen(process.env.PORT || 3000, () => {
    //   console.log('Server started');
    // });
  } catch (error) {
    console.error('Failed to sync Sequelize:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
