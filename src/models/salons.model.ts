import { Schema, model } from "mongoose"


interface ISalon {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const salonSchema = new Schema<ISalon>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type:String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
},
{
    timestamps: true,
}
);

export const  Salon = model<ISalon>("Salon", salonSchema);