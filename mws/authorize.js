const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorize = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

      if (!user) {
        throw new Error();
      }

      if (!roles.includes(user.role)) {
        return res.status(403).send({ error: 'Access denied.' });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate.' });
    }
  };
};

module.exports = authorize;
