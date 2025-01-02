const dotenv = require('dotenv');

dotenv.config();

const config = {
  dotEnv: {
    DB_URI: process.env.DB_URI,
    PORT: process.env.PORT,
  },
};

module.exports = config;