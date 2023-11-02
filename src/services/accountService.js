const userService = require('./userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticate = async (username, password) => {
  try {
    const user = await userService.getUserByUsername(username);

    if (!user) {
      return { error: 'Usuário não encontrado' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { error: 'Senha incorreta' };
    }

    const token = jwt.sign({ username: user.username, role: user.role }, 
        'kl@tun1ct0v3r@t@', { expiresIn: '1h' });
    
    return { user, token };
  } catch (error) {
    throw error;
  }
};

module.exports = { authenticate };