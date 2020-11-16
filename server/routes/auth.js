const router = require('express').Router();

const { isvEmail, isvName, isvPassword, isvUsername } = require('../functions/regex');
const { checkHash, signLogin } = require('../functions/token');
const { createUser } = require('../functions/crud');
const { imageUrl } = require('../functions/format');
const { isAuth } = require('../middlewares');
const { User } = require('../models');

router.post('/auto', isAuth, async (req, res) => {
  try {
    const token = signLogin(req.user.id, req.user.username, req.user.email);
    const profile = await User.findById(req.user.id).select('-_id avatar name').populate('avatar', '_id name');
    res
      .cookie('token', token)
      .status(200)
      .json({
        id: req.user.id,
        name: profile.name,
        username: req.user.username,
        email: req.user.email,
        avatar: profile.avatar ? imageUrl(profile.avatar.name, profile.avatar._id, { h: 100 }) : '',
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});
router.post('/signin', async (req, res) => {
  try {
    const validate = validateSignin(req.body);
    if (validate) {
      res.status(403).json(validate);
    }
    const { user, password } = req.body;
    const auth = await User.findOne({ $or: [{ username: user }, { email: user }] })
      .select('_id name username email password avatar')
      .populate('avatar', '_id name');
    if (!auth) {
      res.status(403).json({ name: 'user', message: 'No user found.' });
    } else if (!checkHash(password, auth.password)) {
      res.status(403).json({ name: 'password', message: 'Incorrect password.' });
    } else {
      const token = signLogin(auth._id, auth.username, auth.email);
      res
        .cookie('token', token)
        .status(200)
        .json({
          id: auth._id,
          name: auth.name,
          username: auth.username,
          email: auth.email,
          avatar: user.avatar ? imageUrl(user.avatar.name, user.avatar._id, { h: 100 }) : '',
          token,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.post('/signup', async (req, res) => {
  try {
    const validate = validateSignup(req.body);
    if (validate) {
      res.status(403).json(validate);
    }
    const { name, username, email, password, date } = req.body;
    if (await User.exists({ username })) {
      res.status(400).json({ name: 'username', message: 'Username already taken.' });
    }
    if (await User.exists({ email })) {
      res.status(400).json({ name: 'email', message: 'Email is already in use.' });
    }
    const auth = await createUser(name, username, email, password, req.headers['user-agent'], req.ip, date);
    const token = signLogin(auth._id, auth.username, auth.email);
    res.cookie('token', token).status(200).json({
      id: auth._id,
      name: auth.name,
      username: auth.username,
      email: auth.email,
      avatar: '',
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.post('/forgot', async (req, res) => {
  try {
    const validate = validateForgot(req.body);
    if (validate) {
      res.status(403).json(validate);
    }
    res.status(200).json({ message: 'Not available.' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
function validateSignin(body) {
  const { user, password } = body;
  if (!isvUsername(user) && !isvEmail(user)) {
    return { name: 'username', message: 'Invalid username or email.' };
  } else if (!isvPassword(password)) {
    return { name: 'password', message: 'Invalid password.' };
  } else {
    return null;
  }
}
function validateSignup(body) {
  const { name, email, username, password, cpassword } = body;
  if (!isvName(name)) {
    return { name: 'name', message: 'Invalid name.' };
  } else if (!isvUsername(username)) {
    return { name: 'username', message: 'Invalid username.' };
  } else if (!isvEmail(email)) {
    return { name: 'email', message: 'Invalid email.' };
  } else if (!isvPassword(password)) {
    return { name: 'password', message: 'Invalid password.' };
  } else if (password !== cpassword) {
    return { name: 'cpassword', message: 'Password did not match.' };
  } else {
    return null;
  }
}
function validateForgot(body) {
  const { user } = body;
  if (!isvUsername(user) || !isvEmail(user)) {
    return { name: 'username', message: 'Invalid username or email.' };
  } else {
    return null;
  }
}

module.exports = router;
