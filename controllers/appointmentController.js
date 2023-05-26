const Appointment = require('../models/appointment');
const Patient = require('../models/patient');
const Doctor = require('../models/staff');

exports.create = async (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { appNo,patientName,doctorName,dateTime,venue } = req.body;

    const patient = await Patient.findOne({name: patientName});
    const doctor = await Doctor.findOne({name: doctorName});

    if(!patient){
        return res.send(`There's no such a patient named '${patientName}'`)
    }

    else if(!doctor){
        return res.send(`There's no such a doctor named '${doctorName}'`)
    }

    else if(doctor && doctor.role != "Doctor"){
        return res.send(`There's no such a doctor named '${doctorName}'`)
    }

    else{
        const appointment = new Appointment({
            appNo,
            patientName: patient.name,
            doctorName: doctor.name,
            dateTime,
            venue
        })
    
        await appointment
            .save()
            .then(() => {
                res.status(201).send({message : "Appointment Added Successfully"})
            })
            .catch(err =>{
                res.status(500).send({message: err.message || "Some error occurred while adding appointment details"
                });
            });
    }
}

exports.findAll = async (req,res) => {
    const searchTerm = req.query.search;
    let staff

    try {
        if (searchTerm) {
            staff = await Appointment.find({
            $or: [
                { patientName: { $regex: searchTerm, $options: 'i' } },
                { doctorName: { $regex: searchTerm, $options: 'i' } }
            ],
            })
        }
        else{
            staff = await Appointment.find()   
        }

        res.send(staff)
    } catch (err) {
        res.status(500).send({ message : err.message || "Error Occurred while retrieving appointment information" })
    }
}

exports.update = async (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    await Appointment.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update appointment details with ${id}. Maybe appointment not found!`})
            }else{
                res.status(201).send({message : "Appointment details updated successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error occurred while updating appointment information"})
        })
}

exports.delete = async (req,res) => {
    const id = req.params.id;

    await Appointment.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete appointment with ${id}. Maybe id is incorrect`})
            }
            else{
                res.status(201).send({message : "Appointment details deleted successfully"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message : `Error deleting appointment details with id = ${id}`});
        })
}