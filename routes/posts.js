const express = require('express');
const router = express.Router();
const Posts = require('../modules/posts')



router.get('/', (req, res, next) => {
  Posts.getAllPosts((err, posts) => {
    if(err){
        return res.json({success: false, err: err});
    }
    res.json({success: true, result: posts});

  })
});

router.get('/:catId', (req, res, next) => {
    let catId = req.params.catId; 
    Posts.getAllPostsFromCat(catId, (err, posts) => {
      if(err){
          return res.json({success: false, err: err});
      }
      res.json({success: true, result: posts});
  
    })
  });

  router.get('/post/:postId', (req, res, next) => {
    let postId = req.params.postId; 
    Posts.getSinglePost(postId, (err, posts) => {
      if(err){
          return res.json({success: false, err: err});
      }
      res.json({success: true, result: posts});
  
    })
  });

router.post('/add_post', (req, res, next) => {
    let newPost = new Posts({
        title: req.body.title, 
        description_full: req.body.description_full,
        description_short: req.body.description_short,
        category: req.body.category
    }); 

    Posts.addNewPost(newPost, (err, post) => {
        if(err){
            return res.json({success: false, err: err});
        }
        res.json({success: true, result: post});
    })
});

router.put('/edit_post/:postId', (req, res, next) => {
    let postId = req.params.postId; 
    let editedPost = {
        title: req.body.title, 
        description_full: req.body.description_full,
        description_short: req.body.description_short,
        category: req.body.category 
    }

    Posts.editPost(postId, editedPost, (err, post) => {
        if(err){
            return res.json({success: false, err: err});
        }
        res.json({success: true, result: post});
    })
}); 

router.delete('/delete_post/:postId', (req, res, next) => {
    let postId = req.params.postId; 

    Posts.removePost(postId, (err, post) => {
        if(err){
            return res.json({success: false, err: err});
        }
        res.json({success: true, result: post}); 
    })
})




module.exports = router;