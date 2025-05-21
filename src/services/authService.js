const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Serviço para registrar novo usuário
const register = async (name, email, password) => {
  const user = await User.create({ name, email, password });
  const { password: _, ...userWithoutPassword } = user.get({ plain: true });
  return userWithoutPassword;
};

// Serviço para login
const login = async (email, password) => {
  const user = await User.scope('withPassword').findOne({ where: { email } });
  if (!user) throw new Error('Usuário não encontrado');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Senha inválida');

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Serviço para obter dados do usuário pelo ID
const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuário não encontrado');
  return user.get({ plain: true });
};

module.exports = { register, login, getUserById };
