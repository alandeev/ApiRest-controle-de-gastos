const mongoose = require('../database');

const accountSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require: true
    },
    username:{
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    money:{
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const mondelAccount = mongoose.model('account', accountSchema);

module.exports = mondelAccount;