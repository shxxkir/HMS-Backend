const Patient = require('../models/patient');

//Create and save new patient
exports.create = async (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { name, nic, dob, gender, group, contact } = req.body;

    // new patient
    const patient = new Patient({
        name,
        nic,
        dob,
        gender,
        group,
        contact
    })

    // save patient in the database
    await patient
        .save()
        .then(() => {
            res.status(201).send({message : "Patient Registered Successfully"})
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Some error occurred while registering the patient"
            });
        });
}

//Retrieve and return all patients
exports.findAll = async (req,res) => {
    const searchTerm = req.query.search;
    let patient

    try {
        if (searchTerm) {
            patient = await Patient.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } }
            ],
            })
        }
        else{
            patient = await Patient.find()   
        }

        res.send(patient)
    } catch (err) {
        res.status(500).send({ message : err.message || "Error Occurred while retrieving patient information" })
    }
}

//Retrieve and return a single patient
exports.findOne = async (req,res) => {
    if(req.params.id){
        const id = req.params.id;

        await Patient.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Patient not found with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving patient with id " + id})
            })
    }
}

//Update a patient by patient id
exports.update = async (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    await Patient.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update patient with ${id}. Maybe patient not found!`})
            }else{
                res.status(201).send({message : "Patient details updated successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error occurred while updating patient information"})
        })
}

//Delete a patient by patient id
exports.delete = async (req,res) => {
    const id = req.params.id;

    await Patient.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete patient with ${id}. Maybe id is incorrect`})
            }
            else{
                res.status(201).send({message : "Patient details deleted successfully"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message : `Error deleting patient with id = ${id}`});
        })
}