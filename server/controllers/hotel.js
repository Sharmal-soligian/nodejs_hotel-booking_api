import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        /* GO TO NEXT MIDDLEWARE */
        next(error);
    }
};

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updateHotel) {
            return res.status(404).json({
                message: "Hotel Not Found"
            });
        }
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error);
    }
};

export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deletedHotel) {
            return res.status(404).json({
                message: "NO Hotel Found"
            });
        }
        res.status(200).json({
            message: "Hotel deleted Successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(400).json({
                message: `Hotel with this id: ${req.params.id} not found`,
            });
        }
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
};

export const getAllHotel = async (req, res, next) => {
    try {
        const hotels = await Hotel.find().sort({ createdAt: -1 });
        if (!hotels.length) {
            return res.status(404).json({
                message: "No Hotels Found",
            });
        }
        res.status(200).json({
            count: hotels.length,
            data: hotels,
        });
    } catch (error) {
        next(error);
    }
};
