const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json');

module.exports = ( req, res, next ) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: "No token provided" });

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: "Token malformated"});

    const [schema, token] = parts;

    if(!schema.match('Bearer'))
        return res.status(401).send({ error: "Token malformated" });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
            return res.status(401).send({ status: false, msg: "Token invalid" });
        
        req.userId = decoded.id;
        next();
    })

}