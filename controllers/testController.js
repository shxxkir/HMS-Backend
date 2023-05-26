const Test = require('../models/test');
const Patient = require('../models/patient');

exports.create = async (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { testID, testName, patientName, priority, status } = req.body;

    const patient = await Patient.findOne({name: patientName});

    if(!patient){
        return res.send(`There's no such a patient named '${patientName}'`)
    }

    const test = new Test({
        testID, 
        testName, 
        patientName: patient.name, 
        priority, 
        status
    })

    await test
        .save()
        .then(() => {
            res.status(201).send({message : "Test details added Successfully"})
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Some error occurred while adding test details"
            });
        });
}

exports.findAll = (req,res) => {
    Test.find()
        .then(test => {
            res.send(test)
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retrieving test details" })
        })
}

exports.update = (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Test.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update test details with ${id}`})
            }else{
                res.status(201).send({message : "Test details updated successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error occurred while updating test details"})
        })
}

exports.delete = (req,res) => {
    const id = req.params.id;

    Test.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete test details with ${id}. Maybe id is incorrect`})
            }
            else{
                res.status(201).send({message : "Test details deleted successfully"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message : `Error deleting test details with id = ${id}`});
        })
}