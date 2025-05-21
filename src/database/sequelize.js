// database/index.js

const { Sequelize } = require("sequelize");

// Cria uma instância do Sequelize com sua URL do PostgreSQL (.env)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Mude para true se quiser ver os logs das queries
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL conectado com Sequelize");
  } catch (error) {
    console.error("Erro na conexão com PostgreSQL:", error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB,
};
