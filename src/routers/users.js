const express = require('express');
const validToken = require('../middlewares/validToken');
const modelAccount = require('../database/models/account')
const modelLog = require('../database/models/log');

const router = express.Router();

router.use(validToken);

router.get('/getinfo', async( req, res ) => {
    const id = req.userId;

    const user = await modelAccount.findOne({ _id: id });
    const posts = await modelLog.find({ user: id });
    res.send({ status: true, user, posts });
});


module.exports = app => app.use('/api/user', router);