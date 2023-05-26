const Staff = require('../models/staff');

exports.create = async (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { sID, name, nic, role, age, contact } = req.body;

    // new staff
    const staff = new Staff({
        sID,
        name,
        nic,
        role,
        age,
        contact
    })

    // save staff in the database
    await staff
        .save()
        .then(() => {
            res.status(201).send({message : "Staff Registered Successfully"})
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Some error occurred while registering the staff"
            });
        });
}

exports.findAll = async (req,res) => {
    const searchTerm = req.query.search;
    let staff

    try {
        if (searchTerm) {
            staff = await Staff.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { role: { $regex: searchTerm, $options: 'i' } }
            ],
            })
        }
        else{
            staff = await Staff.find()   
        }

        res.send(staff)
    } catch (err) {
        res.status(500).send({ message : err.message || "Error Occurred while retrieving staff information" })
    }
}

exports.update = async (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    await Staff.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update staff with ${id}. Maybe staff not found!`})
            }else{
                res.status(201).send({message : "Staff details updated successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error occurred while updating staff information"})
        })
}

exports.delete = async (req,res) => {
    const id = req.params.id;

    await Staff.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete staff with ${id}. Maybe id is incorrect`})
            }
            else{
                res.status(201).send({message : "Staff details deleted successfully"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message : `Error deleting staff with id = ${id}`});
        })
}