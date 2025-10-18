import mongoose, {model} from "mongoose";
import {Schema} from "mongoose";
import {IRol} from "../types";

const rolSchema = new Schema<IRol>({
    nombre: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        required: true
    }
}, {
    timestamps: true
});
export const Rol = model<IRol>("Rol", rolSchema);