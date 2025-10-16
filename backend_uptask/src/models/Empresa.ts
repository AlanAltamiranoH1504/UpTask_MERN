import mongoose, {Schema, model} from "mongoose";
import {IEmpresa} from "../types";

const empresaSchema = new Schema<IEmpresa>({
    nombre: {
        type: String,
        required: true,
        unique: true,
        nullable: false
    },
    razon_social: {
        type: String,
        required: false,
        nullable: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
export const Empresa = model<IEmpresa>("Empresa", empresaSchema);

