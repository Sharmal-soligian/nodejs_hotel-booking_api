import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            /* INSERT THE SAVEDROOM ID INSIDE ROOMS IN HOTEL */
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } }, { new: true });
        } catch (error) {
            next(error);
        }

        res.status(201).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updateRoom) {
            return res.status(404).json({
                message: "Room Not Found"
            });
        }
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error);
    }
};

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            return res.status(404).json({
                message: "NO Room Found"
            });
        }

        try {
            /* PULL THE SAVEDROOM ID INSIDE ROOMS IN HOTEL */
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } }, { new: true });
        } catch (error) {
            next(error);
        }
        res.status(200).json({
            message: "Room deleted Successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(400).json({
                message: `Room with this id: ${req.params.id} not found`,
            });
        }
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const getAllRoom = async (req, res, next) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 });
        if (!rooms.length) {
            return res.status(404).json({
                message: "No Rooms Found",
            });
        }
        res.status(200).json({
            count: rooms.length,
            data: rooms,
        });
    } catch (error) {
        next(error);
    }
};
