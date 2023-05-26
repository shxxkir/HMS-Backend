const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    testID:{
        type:String,
        required: true,
        unique: true
    },

    testName:{
        type:String,
        required: true
    },

    patientName:{
        type:String,
        ref: 'Patient',
        required: true
    },

    priority:{
        type:String,
        required: true
    },

    status:{
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Test', testSchema);