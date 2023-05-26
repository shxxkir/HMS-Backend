const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNo:{
       type: String,
       required: true,
       unique: true
    },
    roomType:{
        type: String,
        required: true,
    },
    roomStatus:{
        type: String,
        required: true
    },
    floorNo: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Room',roomSchema);
