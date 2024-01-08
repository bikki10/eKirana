const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/', async(req, res) => {
    const categoryList = await Category.find();
    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.send(categoryList);
})



router.get('/views', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})



router.get('/:id', async(req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).json({
            message: 'Category not found'
        })
    }
    return res.status(200).send(category);
})


router.post('/submitted', (req, res) => {

    //temporary using postman
    const category = new Category({
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,

    })

    category.save().then((createdCategory) => {
        res.status(201).json(createdCategory)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

router.put('/:id', async(req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    if (!category) {
        return res.status(404).json({
            message: 'invalid category ID'
        })
    }
    res.send(category);
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({
                success: true,
                message: 'Category deleted successfully'
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Invalid Category'
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            error: err
        })
    })
})




module.exports = router;