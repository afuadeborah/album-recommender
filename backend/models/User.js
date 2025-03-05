import mongoose from "mongoose";

// set up the user
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

export default mongoose.model('User', UserSchema);