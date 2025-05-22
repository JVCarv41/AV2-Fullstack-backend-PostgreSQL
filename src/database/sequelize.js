const { Sequelize } = require("sequelize");
require('pg');

// Environment detection
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';
const isTest = process.env.NODE_ENV === 'test';

const sequelizeConfig = {
  dialect: "postgres",
  logging: isTest ? false : (process.env.NODE_ENV === 'development' ? console.log : false),
  pool: {
    max: isProduction ? 10 : 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true, // Prevents Sequelize from pluralizing table names
    paranoid: false, // If you want soft deletion, set to true
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  retry: {
    max: isProduction ? 5 : 3,
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /SequelizeConnectionAcquireTimeoutError/
    ]
  }
};

// SSL configuration for different environments
if (isProduction || isVercel) {
  // Production/Vercel settings (Neon PostgreSQL)
  sequelizeConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    // Neon-specific optimizations
    application_name: "your-app-name",
    statement_timeout: 30000,
    idle_in_transaction_session_timeout: 10000
  };
} else {
  // Local development settings
  sequelizeConfig.dialectOptions = {
    ssl: false,
    connectTimeout: 10000 // Local connection timeout
  };
}

const sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeConfig);

// Connection test function
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
};

// Database synchronization with retry logic
const syncDatabase = async (attempt = 1) => {
  const maxAttempts = 3;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  try {
    if (isProduction) {
      // In production, we only check connection, don't sync
      console.log("🚀 Production environment - skipping automatic sync");
      return;
    }

    const syncOptions = {
      force: isTest, // Only force sync in test environment
      alter: !isProduction, // Safe alterations in non-production
      logging: console.log
    };

    console.log(`🔄 Syncing database (attempt ${attempt}/${maxAttempts})...`);
    await sequelize.sync(syncOptions);
    console.log("✅ Database synchronized successfully");
  } catch (error) {
    console.error(`❌ Database sync failed (attempt ${attempt}):`, error.message);
    
    if (attempt < maxAttempts) {
      await delay(2000 * attempt); // Exponential backoff
      return syncDatabase(attempt + 1);
    }
    
    throw new Error(`Failed to sync database after ${maxAttempts} attempts`);
  }
};

// Main connection function
const connectDB = async () => {
  try {
    // Test connection first
    if (!await testConnection()) {
      throw new Error("Initial connection test failed");
    }

    // Then sync database
    await syncDatabase();

    // Verify the Users table exists
    if (!isProduction) {
      const tableExists = await sequelize.getQueryInterface().showAllTables();
      if (!tableExists.includes('users')) {
        console.warn("⚠️ Users table not found. Consider running migrations.");
      }
    }

    console.log("🚀 Database ready");
  } catch (error) {
    console.error("💥 Database initialization failed:", error.message);
    if (isProduction) {
      process.exit(1); // Exit in production
    } else {
      console.log("⚠️ Continuing in development mode with potential database issues");
    }
  }
};

module.exports = {
  sequelize,
  connectDB,
  testConnection,
  syncDatabase
};