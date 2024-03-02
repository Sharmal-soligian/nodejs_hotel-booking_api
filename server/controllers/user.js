import User from "../models/User.js";

export const createUser = async (req, res, next) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        /* GO TO NEXT MIDDLEWARE */
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updateUser) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                message: "NO User Found"
            });
        }
        res.status(200).json({
            message: "User deleted Successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                message: `User with this id: ${req.params.id} not found`,
            });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        if (!users.length) {
            return res.status(404).json({
                message: "No Users Found",
            });
        }
        res.status(200).json({
            count: users.length,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};
