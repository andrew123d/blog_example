const express = require('express');
const router = express.Router();
const Cat = require('../modules/categories')



router.get('/', (req, res, next) => {

    Cat.getAll((err, category) => {
        if(err){
            return res.json({success: false, err: err})
        }

        res.json({success: true, result: category})
    })
  
});


router.get('/:catId', (req, res, next) => {
    let catId = req.params.catId; 

    Cat.getOneCat(catId, (err, category) => {
        if(err){
            return res.json({success: false, err: err})
        }

        res.json({success: true, result: category})
    })
  
});

router.post('/add', (req, res, next) => {

    let newCat = new Cat({
        title: req.body.title,
        orderBy: req.body.orderBy
    }); 

    Cat.addNewCat(newCat, (err, category) => {
        if(err){
            return res.json({success: false, err: err})
        }

        res.json({success: true, result: category})
    })
  
});

router.put('/edit/:catId', (req, res, next) => {
    let catId = req.params.catId; 
    let editedCat = {
        title: req.body.title,
        orderBy: req.body.orderBy 
    }

    Cat.editCat(catId, editedCat, (err, category) => {
        if(err){
            return res.json({success: false, err: err})
        }

        res.json({success: true, result: category})
    })
}); 

router.delete('/delete_cat/:catId', (req, res, next) => {
    let catId = req.params.catId; 

    Cat.removeCat(catId, (err, category) => {
        if(err){
            return res.json({success: false, err: err})
        }

        res.json({success: true, result: category})
    }); 
}); 

module.exports = router;