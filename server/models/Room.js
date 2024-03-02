import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: [{
        number: Number,
        unavailableDates: {type: [Date]}
    }],
},{ timestamps: true });

const Room = mongoose.model('Room', roomSchema);
export default Room;

/* POSTMAN BODY */

// {
//     "title": "My ROom",
//     "desc": "best room in the world",
//     "price": 200,
//     "maxPeople": 9,
//     "roomNumbers": [{"number": 201}, {"number": 202}]   
// }