const express = require('express');
const { connect } = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

connect('string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Connected to database.'))
  .catch(console.log);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, '..', 'build')));

const profileRoutes = require('./routes/profile');
const imageRoutes = require('./routes/image');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

app.use('/profile', profileRoutes);
app.use('/media', imageRoutes);
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.use((req, res) => {
  res.status(405).json('Method is not allowed.');
});
const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
