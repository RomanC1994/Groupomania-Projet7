const Post = require('../models/post');
const fs = require('fs');
const { timeStamp } = require('console');
const jwt = require('jsonwebtoken');
const TOKEN = process.env.TOKEN;

exports.createPost = (req, res, next) => {
    const post = new Post({
        userId: jwt.verify(req.headers.authorization.split(' ')[1], TOKEN).userId,
        pseudo: req.body.pseudo,
        title: req.body.title,
        description: req.body.description,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        time: req.body.time,
        likes: 0,
        usersLiked: [],
    });
    post.save()
      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id})
  .then(post => {
    if (post.userId === jwt.verify(req.headers.authorization.split(' ')[1], TOKEN).userId || jwt.verify(req.headers.authorization.split(' ')[1], TOKEN).isAdmin === 'yes') {
      const postObject = req.file ?
      {
        ...req.body,
        userId: jwt.verify(req.headers.authorization.split(' ')[1], TOKEN).userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        usersLiked: [],
        usersDisliked: [],
      }
      :
      { ...req.body,
        userId: jwt.verify(req.headers.authorization.split(' ')[1], TOKEN).userId,
        usersLiked: [],
        usersDisliked: [],
      }
      Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ error }));
      }
      else { console.log('Accès non autorisé') }
  })
  .catch(error => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
        .then(post => {
          if (post.userId === jwt.verify(req.headers.authorization.split(' ')[1], TOKEN).userId || jwt.verify(req.headers.authorization.split(' ')[1], TOKEN).isAdmin === 'yes') {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
          }
          else { console.log('Accès non autorisé') }
        })
        .catch(error => res.status(500).json({ error }));
  };

  exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
      .then(post => res.status(200).json(post))
      .catch(error => res.status(404).json({ error }));
  };

  exports.findUserPosts = (req, res, next) => {
    Post.find({userId: req.params.userId})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
  };

exports.findAllPosts = (req, res, next) => {
    Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
  };

exports.ratePost = (req, res, next) => {
  let userId = jwt.verify(req.body.userId, TOKEN).userId;
  let postId = req.params.id;

      Post.findOne({ _id: postId }) 
          .then((post) => {
              if(!post.usersLiked.includes(userId)) {
                  Post.updateOne(
                      { _id: postId },
                      {
                          $inc: {likes: 1},
                          $push: {usersLiked: userId}
                      }
                  )
                  .then(() => res.status(201).json({ message: 'Vous avez aimé ce post!'}))
                  .catch((error) => res.status(400).json({ error }));
              }
              if(post.usersLiked.includes(userId)) {
                Post.updateOne(
                    { _id: postId },
                    {
                        $inc: {likes: -1},
                        $pull: {usersLiked: userId}
                    }
                )
                .then(() => res.status(201).json({ message: 'Votre avez retiré votre Like'}))
                .catch((error) => res.status(400).json({ error }));
            }
          })
      .catch((error) => res.status(400).json({ error }));
  
};