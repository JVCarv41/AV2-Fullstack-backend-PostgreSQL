const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTRO
const register = async (name, email, password) => {
  // Verifica se o e-mail já existe
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    console.log("Erro: Email já está em uso");
    throw new Error('Email já está em uso');
  }

  // Cria novo usuário com hash aplicado no hook
  const newUser = await User.create({ name, email, password });

  // Remove senha do retorno
  const { password: _, ...userWithoutPassword } = newUser.get({ plain: true });
  return userWithoutPassword;
};

// LOGIN
const login = async (email, password) => {
  // Busca usuário incluindo a senha usando scope
  const user = await User.scope('withPassword').findOne({ where: { email } });
  if (!user) {
    console.log("Erro: Email ou senha inválidos");
    throw new Error('Email ou senha inválidos');
  }

  // Compara senha
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Erro: Email ou senha inválidos");
    throw new Error('Email ou senha inválidos');
  }

  // Gera token JWT (note que id no Sequelize é 'id', não '_id')
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};

module.exports = {
  register,
  login,
};
