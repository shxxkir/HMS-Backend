const Ward = require('../models/ward');
const Patient = require('../models/patient');
const Room = require('../models/room');
const Nurse = require('../models/staff');

exports.create = async (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { roomNo, patientName, nurseName, disease, admitDate } = req.body;

    const patient = await Patient.findOne({name: patientName});
    const nurse = await Nurse.findOne({name: nurseName});
    const room = await Room.findOne({roomNo: roomNo});

    if(!patient){
        return res.send(`There's no such a patient named '${patientName}'`)
    }

    else if(!nurse){
        return res.send(`There's no such a nurse named '${nurseName}'`)
    }

    else if(nurse && nurse.role != "Nurse"){
        return res.send(`There's no such a nurse named '${nurseName}'`)
    }

    else if(!room){
        return res.send(`Room Number '${roomNo}' is not added to the database.`)
    }

    else if(room && room.roomStatus == "Booked"){
        return res.send(`Room Number '${roomNo}' is currently unavailable. Please select another room.`)
    }

    const ward = new Ward({
        roomNo: room.roomNo,
        patientName: patient.name,
        nurseName: nurse.name,
        disease,
        admitDate
    })

    await ward
        .save()
        .then(() => {
            res.status(201).send({message : "Patient Added to the Ward Successfully"})
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Some error occurred while adding patient to the ward"
            });
        });
}

exports.findAll = async (req,res) => {
    const searchTerm = req.query.search;
    let ward

    try {
        if (searchTerm) {
            ward = await Ward.find({
            $or: [
                { roomNo: { $regex: searchTerm, $options: 'i' } },
                { patientName: { $regex: searchTerm, $options: 'i' } },
                { nurseName: { $regex: searchTerm, $options: 'i' } },
                { disease: { $regex: searchTerm, $options: 'i' } }
            ],
            })
        }
        else{
            ward = await Ward.find()   
        }

        res.send(ward)
    } catch (err) {
        res.status(500).send({ message : err.message || "Error Occurred while retrieving ward details" })
    }
}

exports.update = async (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    await Ward.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update ward details with ${id}`})
            }else{
                res.status(201).send({message : "Ward details updated successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error occurred while updating ward details"})
        })
}

exports.delete = async (req,res) => {
    const id = req.params.id;

    await Ward.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete ward details with ${id}. Maybe id is incorrect`})
            }
            else{
                res.status(201).send({message : "Ward details deleted successfully"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message : `Error deleting ward details with id = ${id}`});
        })
}