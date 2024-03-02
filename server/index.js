import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import errorHandler from './middleware/errorHandler.js';
const app = express();

/* ENVIRONMENT CONFIGURATION */
dotenv.config();

/* DATABASE SETTINGS */
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to database!!!');
    } catch (error) {
        throw error;
    }
};

/* MONGODB CONNECTED */
mongoose.connection.on('connected', () => {
    console.log('MongoDb Connected!!');
});

/* DATABASE DISCONNECTION */
mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected!!!');
});

/* MIDDLEWARES */ 
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

/* ERROR HANDLING MIDDLEWARE */
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    connect();
    console.log(`Connected to server in port http://localhost:${process.env.PORT}`);
});