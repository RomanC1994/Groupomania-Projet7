const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', auth, multer, postCtrl.findAllPosts);

router.get('/:userId', auth, multer, postCtrl.findUserPosts);

router.post('/', auth, multer, postCtrl.createPost);
  
router.get('/Detail/:id', auth, multer, postCtrl.getOnePost);

router.put('/:id', auth, multer, postCtrl.modifyPost);
  
router.delete('/:id', auth, multer, postCtrl.deletePost);

router.post('/:id/like', auth, postCtrl.ratePost);
  
module.exports = router;