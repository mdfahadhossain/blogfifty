module.exports = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (req.user.username === username) {
      next();
    } else {
      res.status(401).json({ message: 'Authentication failed.' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed.' });
  }
};
