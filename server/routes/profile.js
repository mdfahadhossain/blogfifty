const router = require('express').Router();

const { checkHash, createHash } = require('../functions/token');
const { isvName, isvPassword } = require('../functions/regex');
const { isAuth, isSelf } = require('../middlewares');
const { deleteUser } = require('../functions/crud');
const { imageUrl } = require('../functions/format');
const { User } = require('../models');

router.get('/:username', isAuth, async (req, res) => {
  try {
    const { username } = req.params;
    const data = await User.findOne({ username }).populate('avatar', '_id name');
    // const ratings = await Rating.find({ user: data._id })
    const profile = {
      id: data._id,
      name: data.name,
      username: data.username,
      avatar: data.avatar ? imageUrl(data.avatar.name, data.avatar._id, { h: 100, w: 100 }) : '',
      ratings: [],
    };
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.put('/:username/name', isAuth, isSelf, async (req, res) => {
  try {
    const { username } = req.params;
    const { name } = req.body;
    if (!isvName(name)) {
      return res.status(403).status({ message: 'Invalid name.' });
    }
    await User.findOneAndUpdate({ username }, { $set: { name } });
    res.status(201).json({ message: 'Name has been changed.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.put('/:username/password', isAuth, isSelf, async (req, res) => {
  try {
    const { username } = req.params;
    const { oldPass, password, cpassword } = req.body;
    const user = await User.findOne({ username }).select('password');
    if (!isvPassword(oldPass) || !isvPassword(password)) {
      return res.status(403).status({ message: 'Invalid password.' });
    } else if (!checkHash(oldPass, user.password)) {
      return res.status(401).status({ message: 'Incorrect password.' });
    } else if (password !== cpassword) {
      return res.status(400).status({ message: 'Password did not match.' });
    } else {
      await User.findOneAndUpdate({ username }, { $set: { password: createHash(password) } });
      res.status(201).json({ message: 'Name has been changed.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.delete('/:username', isAuth, isSelf, async (req, res) => {
  try {
    await deleteUser(req.user.id);
    res.status(201).json({ message: 'User deleted.' });
  } catch (error) {
    console.log(error);
    res.cookie('token', null).status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
