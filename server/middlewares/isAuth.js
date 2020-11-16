const { verifyLogin } = require('../functions/token');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = verifyLogin(token);
    if (user.expires < Date.now()) {
      res.status(401).json({ message: 'Authentication failed.' });
    } else {
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Authentication failed.' });
  }
};
