const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middlewares/validateUser');

router.post('/register', validateRegister, async (req, res) => {
  console.log('Route de registro de usuario');
  const { name, email, password } = req.body;

  try {
    const user = await authController.register(name, email, password);
    res.status(201).json({ message: 'Usuario cadastrado com sucesso', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', validateLogin, async (req, res) => {
  console.log('Route de login de usuario');
  const { email, password } = req.body;

  try {
    const token = await authController.login(email, password);
    res.status(200).json({ message: 'Login com sucesso', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
