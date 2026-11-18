import { Schema, model, Types } from 'mongoose'

interface IService {
    salonId: Types.ObjectId;
    name:string;
    price:number;
    duration:number;
    category:string;
}

const serviceSchema = new Schema<IService>({
    salonId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
     name: {
            type: String,
            required: true,
            trim: true
        },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
},
{
    timestamps: true,
}
);

export const Service = model<IService>("Service", serviceSchema);