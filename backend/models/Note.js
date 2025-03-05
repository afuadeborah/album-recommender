import mongoose from "mongoose";

// set up how we want each note to be defined
const NoteSchema = new mongoose.Schema({
    artist: String,
    album: String,
    note: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }}, { timestamps: true }
);

// model name, schema
// _id is added by default
export default mongoose.model('Note', NoteSchema);