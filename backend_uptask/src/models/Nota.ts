import mongoose, {Schema, model, Types} from "mongoose";
import {INota} from "../types";

const noteSchema = new Schema<INota>({
    titulo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    contenido: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tarea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tarea",
        required: true
    }
}, {
    timestamps: true
});
export const Nota = mongoose.model<INota>("Nota", noteSchema)