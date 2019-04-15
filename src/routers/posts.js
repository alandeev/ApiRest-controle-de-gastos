const express = require('express');
const validToken = require('../middlewares/validToken');
const modelLog = require('../database/models/log');
const modelAccount = require('../database/models/account');

const router = express.Router();

router.use(validToken);

function moreMoneyToUser(userMoney, value, res){
    return userMoney + value;
}

function lessMoneyToUser(userMoney, value, res){
    const result = userMoney - value;
    if(result <= 0)
        return res.status(400).send({ status: false, msg: "Do not have money to buy item" });

    return userMoney - value;
}
router.post('/add', async ( req, res ) =>{
    const { title, description, value, mode } = req.body;
    const user = req.userId;
    if(!title)
        return res.status(400).send({ status: false, msg: "Need parameter 'title'"});
    
    if(!description)
        return res.status(400).send({ status: false, msg: "Need parameter 'description'"});
    
    if(!value)
        return res.status(400).send({ status: false, msg: "Need parameter 'value'" });

    if(mode === '')
        return res.status(400).send({ status: false, msg: "Need parameter 'mode'" })
    
    const userInfo = await modelAccount.findOne({ _id: user }, (err, userfind) => {
        if(err)
            return res.status(400).send({ status: false, msg: "Error to request" });
        var callback = mode ? moreMoneyToUser : lessMoneyToUser;
        
        userfind.money = callback(userfind.money, value, res);
        userfind.save(async (err) => {
            if(err)
                return res.status(400).send({ status: false, msg: "Error to request 2" });
            try{
                var post = await modelLog.create({
                    title,
                    description,
                    value,
                    user,
                    mode
                });
        
                res.send({ user: userfind, post });
            }catch(err){
                res.send({status: false, msg:"Post error"});
            }
        });
    });
});

router.get('/getall', async ( req, res ) =>{
    const id = req.userId;
    const posts = await modelLog.find({user: id});

    res.send({ posts })
});

router.post('/getone', async ( req, res ) =>{
    var { post } = req.body;

    if(!post)
        return res.status(400).send({ status: false, msg: "You need send the post id" });

    post = await modelLog.findOne({ _id: post });

    if(!post)
        return res.status(400).send({ status: false, msg:"Don't have post with this 'id' " });

    res.send({ post })
});

router.post('/remove', async ( req, res ) =>{
    var { post } = req.body;

    if(!post)
        return res.status(400).send({ status: false, msg: "You need send the post id" });

    const postInfo = await modelLog.findOne({ _id: post })
    if(!postInfo)
        return res.status(400).send({ status: false, msg: "Post not found" });
    
    postInfo.remove((err, result) => {
        if(err)
            return res.status(400).send({ status: false, msg: "Failed to remove post" , result});
    
        return res.send({status: true, msg: "Post removed with success"});
    });
});





module.exports = app => app.use('/api/post', router);