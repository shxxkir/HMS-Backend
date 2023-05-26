const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    sID:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    nic:{
        type: Number,
        required: true,
        unique: true
    },
    role:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    contact:{
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Staff', staffSchema);
