import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({
                message: 'User Not Found'
            });
        }

        /* CHECK PASSWORD */
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Invalid Password'
            });
        }

        /* TOKEN GENERATION */
        const token = await jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

        const { password, isAdmin, ...otherDetails } = user._doc;

        res.cookie("access_token", token, { httpOnly: true }).status(200).json({
            message: 'Login successfull',
            ...otherDetails
        });
    } catch (error) {
        next(error);
    }
}