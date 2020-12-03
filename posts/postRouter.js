const express = require('express');

const Post = require('./postDb');

const router = express.Router();

const validatePostId = async (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  try {
    const post = await Post.getById(id)
    if(!post) {
      res.status(404).json({ message: 'There is no post in the database with that id' })
    }
    else {
      req.post = post;
      next()
    }
  } catch (error) {
      res.status(500).json({ message: 'Error retieving the post' });
    }
}

router.get('/', (req, res) => {
  Post.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving the posts'});
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Post.getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving the post'});
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Post.remove(id)
    .then(post => {
      res.status(204).json(post);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error deleting the post'});
    })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const changes = req.body;
  console.log(changes);
  Post.update(id, changes)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error updating the post'});
    })
});

// custom middleware





module.exports = router;
