const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    nic:{
        type: Number,
        required: true,
        unique: true
    },
    dob:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    group: {
        type: String,
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

module.exports = mongoose.model('Patient', patientSchema);
