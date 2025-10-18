import mongoose, {Types} from "mongoose";
import {IUsuario} from "../types";
const {Schema} = mongoose;

const UserSchema = new Schema<IUsuario>({
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
        default: null,
        trim: true
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        required: true
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rol",
        required: true
    }
}, {timestamps: true});
const User = mongoose.model<IUsuario>("User", UserSchema);
export default User;