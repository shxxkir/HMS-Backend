const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appNo:{
        type: String,
        required: true,
        unique: true
    },
    patientName:{
        type: String,
        ref: 'Patient',
        required: true
    },
    doctorName:{
        type: String,
        ref: 'Doctor',
        required: true
    },
    dateTime:{
        type: Date,
        required: true
    },
    venue:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
