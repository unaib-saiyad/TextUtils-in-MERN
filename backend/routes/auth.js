const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


JWT_SECRET = 'RS256' ;
// POST resquest to creat a user at: "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be of of 5 characters!...').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User email already exists!..." });
        }
        const salt = bcrypt.genSaltSync(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        };
        var token = jwt.sign(data, JWT_SECRET);
        res.json({ status: true, message: "user created successfully...", token: token});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Some error occured!..."});
    }
});


// POST resquest to creat a user at: "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password can not be empty!...').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({ email: email });
        if(!user){
            return res.status(400).json({error: "Credentials does not match!..."});
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return res.status(400).json({error: "Credentials does not match!..."});
        }
        const data = {
            user: {
                id: user.id
            }
        };
        var token = jwt.sign(data, JWT_SECRET);
        res.json({ status: true, message: "user login successfully...", token: token});

    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Some error occured!..."});
    }
});


// POST resquest to creat a user at: "/api/auth/getuser"
router.post('/fetchuser', fetchuser, async (req, res) => {
    try{
        const userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        res.json({ status: true, message: "user found successfully...", user: user});

    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Some error occured!..."});
    }
});



module.exports = router;