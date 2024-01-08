const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async(req, res) => {
    const userList = await User.find().select('-hashPassword');
    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
})
router.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id).select('-hashPassword');
    if (!user) {
        res.status(500).json({ success: false })
    }
    res.send(user);
})



router.post('/register', async(req, res) => {

    //temporary using postman
    const user = await new User({
        name: req.body.names,
        email: req.body.email,
        password: req.body.password,
        hashPassword: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        // isAdmin: req.body.isAdmin,
        // streetAdress1: req.body.streetAdress1,
        // streetAdress2: req.body.streetAdress2,
        // zip: req.body.zip,
        // city: req.body.city,
        // country: req.body.country,
    })

    user.save().then((createdUser) => {
        res.status(201).json(createdUser)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// router.post('/verify',async(req,res)=>{
//     //const otp = Math.floor(Math.random() * (999999-100000))+100000;
//     const otp = 123456;

//     const user = await User.findOne({
//         email: req.body.email
//     });
//     if (!user) {

//         return res.send('User Not Found')
//     }
//     const resOtp= req.body.code;
//     if(otp==resOtp){

//         user.emailVerified = true;
//         return res.send(user.emailVerified);
//     }else{
//         return res.send('User Not Found')
//     }
// })

router.post('/login/', async(req, res) => {
    const key = process.env.Oxkey;

    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {

        return res.send('User Not Found')
    }
    if (user && bcrypt.compareSync(req.body.password, user.hashPassword)) {

        const token = jwt.sign({
                userId: user.id
            },
            key, {
                expiresIn: '1d'
            })

        res.status(200).send({
            user: user.email,
            token: token,
            phone: user.phone,
            city: user.city,
            emailVerified: user.emailVerified
        })
    } else {

        res.send('Password Incorrect');
    }
})










module.exports = router;