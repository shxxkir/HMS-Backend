const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
    roomNo:{
        type: String,
        ref: 'Room',
        required: true
    },
    patientName:{
        type: String,
        ref: 'Patient',
        required: true,
        unique: true
    },
    nurseName:{
        type: String,
        ref: 'Staff',
        required: true
    },
    disease:{
        type: String,
        required: true
    },
    admitDate: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Ward', wardSchema);
