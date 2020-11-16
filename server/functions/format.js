const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

function formatPost(post, content = false) {
  const fpost = {
    id: post._id,
    name: post.name,
    title: post.title,
    cover: imageUrl(post.cover.name, post.cover._id, { h: 1080 }),
    ratings: '0/5 (0)',
    views: 1,
    user: {
      id: post.user._id,
      username: post.user.username,
      name: post.user.name,
      rating: '0/5 (0)',
      posts: 2,
      date: post.user.date,
    },
    date: post.date,
  };
  if (content) {
    fpost.content = post.content;
  }
  return fpost;
}
function saveImage(image) {
  return new Promise((res, rej) => {
    try {
      const ext = path.extname(image.path);
      if (!['png', 'jpg', 'jpeg'].includes(ext.substr(1))) {
        rej('Invalid image type.');
      }
      let fileName = ranStr() + ext;
      let filePath = path.join(__dirname, '..', 'storage', fileName);
      do {
        fileName = ranStr() + ext;
        filePath = path.join(__dirname, '..', 'storage', fileName);
      } while (fs.existsSync(filePath));
      if (image.size > 5242880) {
        rej({ status: 413, message: 'File is too large.' });
      }
      sharp(image.path).toFile(filePath, (err) => {
        if (err) {
          console.log(err);
          rej({ status: 500, message: 'Invalid media.' });
        }
      });
      res(fileName);
    } catch (error) {
      rej(error);
    }
  });
}
function imageUrl(file, id, options = { h: 0, w: 0 }) {
  const ext = path.extname(file).substr(1);
  const h = ~~options.h;
  const w = ~~options.w;
  let query = '';
  if (h && w) {
    query = `?h=${h}&w=${w}`;
  } else if (h && !w) {
    query = `?h=${h}`;
  } else if (!h && w) {
    query = `?w=${w}`;
  }
  return `/media/i/${id}.${ext}${query}`;
}
function ranStr(length = 32) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
  let str = '';
  let i;
  for (i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

module.exports = {
  formatPost,
  imageUrl,
  ranStr,
  saveImage,
};
