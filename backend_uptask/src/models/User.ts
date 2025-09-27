import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    token: {
        type: String,
        required: true,
        trim: true
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});
const User = mongoose.model("User", UserSchema);
export default User;