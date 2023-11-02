const mongoose = require('mongoose');
const config = require('../../customConfig');

const connectDB = async () => {
  try {
    const databaseURL = config.databaseURL;

    await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao banco de dados');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

module.exports = connectDB;
