const router = require('express').Router();
const multiparty = require('connect-multiparty')();

const { formatPost, saveImage } = require('../functions/format');
const { createPost, createPhoto } = require('../functions/crud');
const { isAuth } = require('../middlewares');
const { Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const data = await Post.paginate(
      {},
      {
        populate: [{ path: 'cover', select: '_id name' }, { path: 'user', select: '_id name username date' }, { path: 'rating' }],
        offset: 1,
        sort: { date: -1 },
      }
    );
    const posts = [];
    for (const post of data.docs) {
      posts.push(formatPost(post));
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.get('/featured', async (req, res) => {
  try {
    const data = await Post.paginate(
      {},
      {
        populate: [{ path: 'cover', select: '_id name' }, { path: 'user', select: '_id name username date' }, { path: 'rating' }],
        offset: 0,
        sort: { date: -1 },
      }
    );
    res.status(200).json(formatPost(data.docs[0]));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.get('/related', async (req, res) => {
  try {
    const { exception } = req.query;
    const data = await Post.paginate(
      { $nor: [{ name: exception }] },
      {
        populate: [{ path: 'cover', select: '_id name' }, { path: 'user', select: '_id name username date' }, { path: 'rating' }],
        offset: 0,
        sort: { date: -1 },
      }
    );
    const posts = [];
    for (const post of data.docs) {
      posts.push(formatPost(post));
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.post('/', isAuth, multiparty, async (req, res) => {
  try {
    const { category, title, url, body, date } = req.body;
    const { cover } = req.files;
    const fileName = await saveImage(cover);
    const photo = await createPhoto(fileName, req.user.id, cover.type, title, date);
    const post = await createPost(url, photo._id, req.user.id, title, body, category, date);
    res.status(201).json(post.name);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong.' });
  }
});
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const data = await Post.findOne({ name }).populate('cover', '_id name').populate('user', '_id name username date').populate('rating');
    res.status(200).json(formatPost(data, true));
  } catch (error) {
    res.status(404).json({ message: 'No post found.' });
  }
});

module.exports = router;
