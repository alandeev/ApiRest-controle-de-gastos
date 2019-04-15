const express = require('express');
const modelAccount = require('../database/models/account')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const router = express.Router();

const secretKey = authConfig.secret;

async function getToken(params){
    return await jwt.sign(params, secretKey, {
        expiresIn: 500
    })
}

router.post('/auth', async ( req, res ) => {
    const { username } = req.body;

    if(!username)
        return res.status(400).send({ status: false, msg: "Need parameter 'username' in json" });

    const user = await modelAccount.findOne({ username });
    
    if(!user)
        return res.status(401).send({ status: true,  msg: "User not found" });

    const token  = await getToken({
        id: user.id,
        username: user.username, 
        fullname: user.fullname}
    );
    res.send({ status: true, msg: "You were connected with success" , token: `Bearer ${token}` });
    
});

router.post('/register', async ( req, res ) => {
    const { username } = req.body;

    if(!username)
        return res.status(400).send({ status: false, msg: "Need parameter 'username' in json" });

    if(await modelAccount.findOne({ username }))
        return res.status(400).send({ status: false, msg: "User already exists" });
    try{
        var user = await modelAccount.create( req.body );  

        const token  = await getToken({
            id: user.id,
            username: user.username, 
            fullname: user.fullname
        });

        res.send({ status: true, msg: "You were registrated with success" , token: `Bearer ${token}` })

    }catch(err){
        res.status(400).send({ status: false, msg: 'Registration failed' });
    }
});


module.exports = app => app.use('/api', router);