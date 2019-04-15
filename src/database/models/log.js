const mongoose = require('../database');

const logSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        require: true
    },
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    value:{
        type: Number,
        require: true
    },
    mode:{
        type: Boolean,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const logModel = mongoose.model('logs', logSchema);

module.exports = logModel;