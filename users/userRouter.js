const express = require('express');

const User = require('./userDb');
const Post = require('./../posts/postDb');

const router = express.Router();

const validateUserId = async (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  try {
    const user = await User.getById(id)
    if(!user) {
      res.status(404).json({ message: 'There is no user in the database with that id' })
    }
    else {
      req.user = user;
      next()
    }
  } catch (error) {
      res.status(500).json({ message: 'Error retieving the user' });
    }
} 

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body) {
    res.status(400).json({ message: "missing user data" })
  }
  if(!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  }
  else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body) {
    res.status(400).json({ message: "missing post data" });
  }
  if(!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  }
  else {
    next();
  }
}

router.post('/', validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error creating the user'});
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const postInfo = { ...req.body, user_id: req.params.id};
  Post.insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error creating the post'});
    })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving the users'});
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  User.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving the posts'});
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  User.remove(id)
    .then(user => {
      res.status(204).json(user)
    })
    .catch(() => {
      res.status(500).json({ message: 'Error removing the user'});
    })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const changes = req.body;
  User.update(id, changes)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error updating the user'});
    })
});

//custom middleware

  







module.exports = router;
