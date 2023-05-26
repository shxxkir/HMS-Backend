const Room = require('../models/room');

exports.createRoom = (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const {roomNo, roomType, roomStatus, floorNo} = req.body;

    const room = new Room({
        roomNo,
        roomType,
        roomStatus,
        floorNo
    })

    room
        .save()
        .then(() => {
            res.status(201).send({message : "Room Added Successfully"})
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Some error occurred while adding room"
            });
        });
}

exports.findAllRooms = async (req,res) => {
    const searchTerm = req.query.search;
    let room

    try {
        if (searchTerm) {
            room = await Room.find({
            $or: [
                { roomStatus: { $regex: searchTerm, $options: 'i' } },
                { roomType: { $regex: searchTerm, $options: 'i' } }
            ],
            })
        }
        else{
            room = await Room.find()   
        }

        res.send(room)
    } catch (err) {
        res.status(500).send({ message : err.message || "Error Occurred while retrieving room details" })
    }
}

exports.findOneRoom = (req,res) => {
    if(req.params.id){
        const id = req.params.id;

        Room.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Room not found with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving room with id " + id})
            })
    }
}

exports.updateRoom = (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Room.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update room with ${id}. Maybe room not found!`})
                
            }else{
                res.status(201).send({message : "Room details updated successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error occurred while updating room information"})
        })
}

exports.deleteRoom = (req,res) => {
    const id = req.params.id;

    Room.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete room with ${id}. Maybe id is incorrect`})
            }
            else{
                res.status(201).send({message : "Room details deleted successfully"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message : `Error deleting room with id = ${id}`});
        })
}

