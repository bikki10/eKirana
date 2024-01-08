const { Product } = require('../models/product');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');



router.get('/', async(req, res) => {
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
})
router.get('/views', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

router.get('/:id', async(req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    return res.status(200).send(product);
})

router.get('/pdf', (req, res) => {
    fs.readFile('C:/Users/diwas/Downloads/book-sample.pdf', (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }

        // encrypt PDF data
        //   const encryptedPdf = CryptoJS.AES.encrypt(data, 'password');

        // send encrypted PDF data as response
        res.set('Content-Type', 'application/octet-stream');
        res.send(data);
    });
});

router.post('/submitted', async(req, res) => {

    //temporary using postman
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(500).send('Invalid Category');
    //todo 1 populate the post req w/ model 
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
        price: req.body.price,
        description: req.body.description,
        richDescription: req.body.richDescription,
        author: req.body.author,
        category: req.body.category
    })

    product.save().then((createdProduct) => {
        res.status(201).json(createdProduct)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})




module.exports = router;